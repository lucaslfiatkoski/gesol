import React, { useState } from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay?: number;
}

export default function FeatureCard({
  icon,
  title,
  description,
  color,
  delay = 0,
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="animate-fadeInUp group"
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`bg-gradient-to-br ${color} rounded-2xl p-8 text-white shadow-lg hover-lift h-full relative overflow-hidden transition-all duration-500`}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8 group-hover:scale-150 transition-transform duration-500" />

        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/30 transition-all duration-500" />

        {/* Content */}
        <div className="relative z-10">
          <div className="mb-4 bg-white/20 w-16 h-16 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-3 group-hover:translate-x-1 transition-transform duration-300">
            {title}
          </h3>
          <p className="text-white/90 leading-relaxed group-hover:text-white transition-colors duration-300">
            {description}
          </p>

          {/* Animated line */}
          <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/60 rounded-full transition-all duration-500"
              style={{ width: isHovered ? "100%" : "60%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

