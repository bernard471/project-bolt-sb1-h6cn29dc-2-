import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';

export function useVideoCall(sessionId: string) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  useEffect(() => {
    let peerConnection: RTCPeerConnection;

    const initializeCall = async () => {
      try {
        // Get local media stream
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        });
        setLocalStream(stream);

        // Initialize WebRTC peer connection
        peerConnection = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        // Add local stream tracks to peer connection
        stream.getTracks().forEach(track => {
          peerConnection.addTrack(track, stream);
        });

        // Handle incoming remote stream
        peerConnection.ontrack = (event) => {
          setRemoteStream(event.streams[0]);
        };

        // Subscribe to signaling channel
        const channel = supabase.channel(`call:${sessionId}`)
          .on('broadcast', { event: 'signal' }, ({ payload }) => {
            handleSignaling(payload);
          })
          .subscribe();

        return () => {
          channel.unsubscribe();
          cleanupCall();
        };
      } catch (error) {
        console.error('Failed to initialize call:', error);
      }
    };

    const handleSignaling = async (signal: any) => {
      try {
        if (signal.type === 'offer') {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          // Send answer through signaling channel
        } else if (signal.type === 'answer') {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
        } else if (signal.candidate) {
          await peerConnection.addIceCandidate(new RTCIceCandidate(signal));
        }
      } catch (error) {
        console.error('Signaling error:', error);
      }
    };

    const cleanupCall = () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (peerConnection) {
        peerConnection.close();
      }
    };

    initializeCall();
    return () => cleanupCall();
  }, [sessionId]);

  const toggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
  };

  return {
    localStream,
    remoteStream,
    isAudioEnabled,
    isVideoEnabled,
    toggleAudio,
    toggleVideo,
    endCall
  };
}