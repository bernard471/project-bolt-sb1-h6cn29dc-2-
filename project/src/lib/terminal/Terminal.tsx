import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { useTerminalWorker } from './useTerminalWorker';
import './styles.css';
import 'xterm/css/xterm.css';

interface TerminalProps {
  onCommand?: (command: string) => void;
  className?: string;
}

export const Terminal: React.FC<TerminalProps> = ({ onCommand, className }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const { sendCommand } = useTerminalWorker();
  
  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      theme: {
        background: '#1a1b26',
        foreground: '#a9b1d6',
        cursor: '#c0caf5'
      }
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.loadAddon(new WebLinksAddon());

    term.open(terminalRef.current);
    fitAddon.fit();

    term.write('$ ');

    let currentLine = '';
    term.onKey(({ key, domEvent }) => {
      const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

      if (domEvent.keyCode === 13) { // Enter
        term.write('\r\n');
        if (currentLine.trim()) {
          sendCommand(currentLine);
          onCommand?.(currentLine);
        }
        currentLine = '';
        term.write('$ ');
      } else if (domEvent.keyCode === 8) { // Backspace
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          term.write('\b \b');
        }
      } else if (printable) {
        currentLine += key;
        term.write(key);
      }
    });

    const resizeObserver = new ResizeObserver(() => fitAddon.fit());
    resizeObserver.observe(terminalRef.current);

    return () => {
      term.dispose();
      resizeObserver.disconnect();
    };
  }, [onCommand, sendCommand]);

  return (
    <div 
      ref={terminalRef} 
      className={`h-full min-h-[300px] bg-[#1a1b26] rounded-lg ${className}`}
    />
  );
};