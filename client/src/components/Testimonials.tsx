import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Carlos Silva",
    role: "Empresário",
    text: "A GESOL transformou minha conta de energia. Em apenas 6 meses, já recuperei parte do investimento. Excelente atendimento e qualidade!",
    rating: 5,
    image: "CS",
    color: "from-orange-400 to-orange-600",
  },
  {
    id: 2,
    name: "Maria Santos",
    role: "Médica",
    text: "Processo muito simples e profissional. A equipe foi atenciosa do início ao fim. Recomendo para todos os amigos!",
    rating: 5,
    image: "MS",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 3,
    name: "João Oliveira",
    role: "Advogado",
    text: "Melhor decisão que tomei para minha casa. Economia real, energia limpa e ainda ajudo o meio ambiente. Muito satisfeito!",
    rating: 5,
    image: "JO",
    color: "from-purple-400 to-purple-600",
  },
  {
    id: 4,
    name: "Ana Costa",
    role: "Professora",
    text: "A calculadora da GESOL foi muito útil para tomar a decisão. Agora minha conta caiu 85%. Recomendo muito!",
    rating: 5,
    image: "AC",
    color: "from-pink-400 to-pink-600",
  },
  {
    id: 5,
    name: "Roberto Ferreira",
    role: "Empresário",
    text: "Profissionalismo impecável. O sistema está funcionando perfeitamente. Já estou pensando em expandir para outras propriedades.",
    rating: 5,
    image: "RF",
    color: "from-green-400 to-green-600",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setAutoPlay(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="w-full">
      {/* Main Testimonial Card */}
      <div className="flex justify-center px-4">
        <div 
          onClick={nextSlide}
          className="group bg-white rounded-2xl shadow-xl hover-lift p-8 md:p-12 border-t-4 border-gradient-to-r from-orange-500 to-blue-600 hover:shadow-2xl transition-all duration-300 w-full max-w-2xl cursor-pointer"
        >
          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          {/* Text */}
          <p className="text-gray-700 mb-8 italic text-lg leading-relaxed flex-grow">
            "{currentTestimonial.text}"
          </p>

          {/* Author */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
            <div
              className={`w-14 h-14 rounded-full bg-gradient-to-br ${currentTestimonial.color} flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0`}
            >
              {currentTestimonial.image}
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">{currentTestimonial.name}</p>
              <p className="text-sm text-gray-600">{currentTestimonial.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setAutoPlay(false);
            }}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-gradient-to-r from-orange-500 to-blue-600 w-8"
                : "bg-gray-300 w-3 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

