import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: string; // Ex: 'animate__fadeInUp', 'animate__fadeInLeft'
  delay?: string; // Ex: '0.2s'
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className = "", 
  animation = "animate__fadeInUp",
  delay = "0s"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Quando o elemento entra na tela (10% visível)
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Opcional: Parar de observar após a primeira animação
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  // Adiciona a classe animate__animated apenas quando visível para disparar a animação
  // opacity-0 inicial garante que o elemento não apareça antes da animação
  const classes = isVisible 
    ? `animate__animated ${animation} ${className}` 
    : `opacity-0 ${className}`;

  return (
    <div ref={ref} className={classes} style={{ animationDelay: delay }}>
      {children}
    </div>
  );
};