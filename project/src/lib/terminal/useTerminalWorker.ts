import { useEffect, useState } from 'react';
import { wrap } from 'comlink';
import type { TerminalWorker } from './terminal.worker';

export function useTerminalWorker() {
  const [worker, setWorker] = useState<Worker | null>(null);
  const [terminal, setTerminal] = useState<TerminalWorker | null>(null);
  const [output, setOutput] = useState<string>('');

  useEffect(() => {
    const w = new Worker(
      new URL('./terminal.worker.ts', import.meta.url),
      { type: 'module' }
    );
    
    const wrappedWorker = wrap<TerminalWorker>(w);
    
    setWorker(w);
    setTerminal(wrappedWorker as unknown as TerminalWorker);

    return () => w.terminate();
  }, []);

  const sendCommand = async (command: string) => {
    if (!terminal) return;
    
    try {
      const result = await terminal.executeCommand(command);
      setOutput(result);
    } catch (error) {
      console.error('Failed to execute command:', error);
      setOutput('Command execution failed');
    }
  };

  return { sendCommand, output };
}