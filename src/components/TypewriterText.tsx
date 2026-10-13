import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 22,
  className = '',
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // If reduced motion is enabled, show full text immediately
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplayedText(text);
      setIsDone(true);
      if (onComplete) onComplete();
      return;
    }

    setDisplayedText('');
    setIsDone(false);

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsDone(true);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  const handleSkip = () => {
    setDisplayedText(text);
    setIsDone(true);
    if (onComplete) onComplete();
  };

  return (
    <span
      onClick={handleSkip}
      title={isDone ? undefined : 'Нажмите, чтобы показать сразу'}
      className={`inline-block cursor-pointer select-none ${className}`}
    >
      {displayedText}
      {!isDone && (
        <span className="inline-block w-2 h-4 ml-1 bg-cyan-400 animate-cursor-blink vertical-middle" />
      )}
    </span>
  );
};
