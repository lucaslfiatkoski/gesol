import { useState } from "react";

interface Project {
  id: number;
  title: string;
  location: string;
  power: string;
  savings: string;
  imageUrl: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Sistema 11,4 kWp",
    location: "São João do Triunfo, PR",
    power: "11.4 kW",
    savings: "R$ 1.500/mês",
    imageUrl: "/projects/projeto1.jpg",
    description: "20 módulos de 570W com inversor de 8kW",
  },
  {
    id: 2,
    title: "Sistema 15,3 kWp",
    location: "Paraná, PR",
    power: "15.3 kW",
    savings: "R$ 2.100/mês",
    imageUrl: "/projects/projeto2.jpg",
    description: "Sistema solar de alta potência com máxima eficiência",
  },
  {
    id: 3,
    title: "Sistema 17,1 kWp",
    location: "Paraná, PR",
    power: "17.1 kW",
    savings: "R$ 2.400/mês",
    imageUrl: "/projects/projeto3.jpg",
    description: "Telhado transformado em usina de energia limpa",
  },
  {
    id: 4,
    title: "Sistema 12,5 kWp",
    location: "São Mateus, PR",
    power: "12.5 kW",
    savings: "R$ 1.750/mês",
    imageUrl: "/projects/projeto4.jpg",
    description: "22 módulos de 570W com inversor de 10kW",
  },
  {
    id: 5,
    title: "Sistema 14 Módulos",
    location: "Paraná, PR",
    power: "7.98 kW",
    savings: "R$ 1.100/mês",
    imageUrl: "/projects/projeto5.jpg",
    description: "14 módulos fotovoltaicos com inversor de 7kW",
  },
  {
    id: 6,
    title: "Sistema Completo",
    location: "Paraná, PR",
    power: "Variável",
    savings: "Conforme projeto",
    imageUrl: "/projects/projeto6.jpg",
    description: "Solução completa de energia solar personalizada",
  },
];

export default function ProjectGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const currentProject = projects[currentIndex];

  return (
    <div className="w-auto py-8">
      {/* Main Image Container */}
      <div className="flex justify-center px-4">
        <div 
          onClick={nextSlide}
          className="group relative overflow-hidden rounded-2xl shadow-2xl w-auto cursor-pointer"
          style={{ aspectRatio: "16/16", maxWidth: "100%", height: "auto" }}
        >
          {/* Background Image */}
          <img
            src={currentProject.imageUrl}
            alt={currentProject.title}
            className="w-auto h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
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

