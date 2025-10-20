import { useEffect, useRef, useState } from "react";

interface ParallaxHeroProps {
  children: React.ReactNode;
  className?: string;
}

export default function ParallaxHero({ children, className = "" }: ParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;

        // Only calculate parallax if element is in viewport
        if (elementBottom > 0 && elementTop < window.innerHeight) {
          const scrolled = window.scrollY;
          const elementOffset = ref.current.offsetTop;
          setOffset((scrolled - elementOffset) * 0.5);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
    </div>
  );
}

