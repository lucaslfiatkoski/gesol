import { useEffect, useRef, useState } from "react";
import { Zap, Users, TrendingUp, Leaf } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const stats: Stat[] = [
  {
    icon: <Zap className="w-8 h-8" />,
    label: "Energia Gerada",
    value: 1250,
    suffix: "MWh/ano",
    color: "from-orange-400 to-orange-600",
  },
  {
    icon: <Users className="w-8 h-8" />,
    label: "Clientes Satisfeitos",
    value: 1450,
    suffix: "+",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    label: "Economia Gerada",
    value: 280,
    suffix: "Mil R$",
    color: "from-green-400 to-green-600",
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    label: "CO₂ Evitado",
    value: 1580,
    suffix: "ton",
    color: "from-emerald-400 to-emerald-600",
  },
];

interface CounterProps {
  target: number;
  duration: number;
}

function Counter({ target, duration }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(target * progress));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          animate();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [target, duration]);

  return <div ref={ref}>{count}</div>;
}

export default function StatsCounter() {
  return (
    <div className="w-full py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="animate-fadeInUp group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-8 text-white shadow-lg hover-lift relative overflow-hidden`}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8" />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                    {stat.icon}
                  </div>
                  <div className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    {stat.suffix}
                  </div>
                </div>

                <div className="mb-2">
                  <div className="text-4xl md:text-5xl font-bold">
                    <Counter target={stat.value} duration={2000} />
                  </div>
                </div>

                <p className="text-white/90 font-medium">{stat.label}</p>

                {/* Animated line */}
                <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white/60 rounded-full" style={{ width: "60%" }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

