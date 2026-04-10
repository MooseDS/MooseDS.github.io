'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  speed?: number;
  className?: string;
}

export function TypingAnimation({ text, speed = 80, className = '' }: Props) {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText('');
      return;
    }

    let index = 0;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        timeoutId = setTimeout(type, speed);
      }
    };

    type();

    return () => clearTimeout(timeoutId);
  }, [isVisible, text, speed]);

  return (
    <span ref={elementRef} className={className}>
      <span className="typing-text">{displayedText}</span>
      <span className="animate-pulse">|</span>
    </span>
  );
}
