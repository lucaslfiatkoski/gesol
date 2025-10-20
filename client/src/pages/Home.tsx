import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE } from "@/const";
import { useState } from "react";
import ContactForm from "@/components/ContactForm";
import BudgetCalculator from "@/components/BudgetCalculator";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProjectGallery from "@/components/ProjectGallery";
import Testimonials from "@/components/Testimonials";
import StatsCounter from "@/components/StatsCounter";
import { Menu, X, Sun, Zap, DollarSign, Leaf, ArrowRight } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";

export default function Home() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-lg border-b-4 border-gradient-to-r from-orange-500 to-blue-600">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/gesolLogo.png" alt="GESOL" className="max-h-30 w-auto" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {[
              { id: "home", label: "Início" },
              { id: "sobre", label: "Sobre" },
              { id: "projetos", label: "Projetos" },
              { id: "depoimentos", label: "Depoimentos" },
              { id: "calculadora", label: "Calculadora" },
              { id: "contato", label: "Contato" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-semibold transition-all duration-300 relative group ${
                  activeSection === item.id
                    ? "text-orange-600"
                    : "text-slate-700 hover:text-orange-600"
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-blue-600 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t-2 border-orange-200 py-4 px-4 space-y-3 animate-slideInDown">
            {[
              { id: "home", label: "Início" },
              { id: "sobre", label: "Sobre" },
              { id: "projetos", label: "Projetos" },
              { id: "depoimentos", label: "Depoimentos" },
              { id: "calculadora", label: "Calculadora" },
              { id: "contato", label: "Contato" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-slate-700 hover:text-orange-600 font-semibold py-2 px-4 rounded-lg hover:bg-orange-50 transition-all duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 md:py-32"
      >
        {/* Background decorations */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInLeft">
              <div className="inline-block mb-6 px-4 py-2 bg-orange-100 rounded-full">
                <span className="text-orange-700 font-semibold text-sm">
                  ⚡ Energia Solar Premium
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Energia Solar</span> para Sua Casa
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Reduza sua conta de energia em até 90% com painéis solares de alta eficiência. 
                Invista em energia limpa e sustentável com a GESOL.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => scrollToSection("calculadora")}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
                >
                  Calcular Economia
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  onClick={() => scrollToSection("contato")}
                  className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 rounded-lg font-bold text-lg transition-all duration-300"
                >
                  Fale Conosco
                </Button>
              </div>
            </div>

            <div className="animate-slideInRight relative">
              <div className="relative w-full h-96 md:h-full">
                <div className="absolute inset-0 gradient-orange-blue rounded-3xl shadow-2xl opacity-90" />
                <div className="absolute inset-4 bg-white rounded-3xl flex items-center justify-center">
                  <div className="text-center">
                    <Sun className="w-32 h-32 text-orange-500 mx-auto mb-4 animate-float" />
                    <p className="text-2xl font-bold text-slate-900">Energia Limpa</p>
                    <p className="text-slate-600">100% Renovável</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <StatsCounter />
        </div>
      </section>

      {/* Benefits Section */}
      <section id="sobre" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Por que escolher</span> a GESOL?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Somos especialistas em energia solar com mais de 10 anos de experiência
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-12 h-12" />}
              title="Economia Garantida"
              description="Reduza sua conta de energia em até 90% com nossos sistemas de alta eficiência."
              color="from-orange-400 to-orange-600"
              delay={0}
            />
            <FeatureCard
              icon={<DollarSign className="w-12 h-12" />}
              title="Retorno Rápido"
              description="Recupere seu investimento em 5-7 anos e aproveite 25+ anos de energia gratuita."
              color="from-green-400 to-green-600"
              delay={0.1}
            />
            <FeatureCard
              icon={<Leaf className="w-12 h-12" />}
              title="Sustentável"
              description="Contribua para um planeta mais limpo usando energia 100% renovável."
              color="from-blue-400 to-blue-600"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Projects Gallery Section */}
      <section id="projetos" className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Nossos Projetos</span> em Destaque
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Conheça algumas das instalações solares que realizamos com sucesso
            </p>
          </div>
          <ProjectGallery />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Depoimentos</span> de Clientes
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Veja o que nossos clientes satisfeitos dizem sobre a GESOL
            </p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculadora" className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Calcule Sua</span> Economia
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Descubra quanto você pode economizar com energia solar
            </p>
          </div>
          <BudgetCalculator />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="relative overflow-hidden py-20 md:py-32">
        {/* Background */}
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Entre em <span className="gradient-text">Contato</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Estamos prontos para ajudar você a fazer a transição para energia solar
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="animate-slideInLeft">
              <h3 className="text-3xl font-bold text-white mb-8">Informações de Contato</h3>
              <div className="space-y-6">
                <div className="glass rounded-lg p-6">
                  <p className="text-orange-300 font-semibold mb-2">📞 Telefone</p>
                  <p className="text-2xl text-white font-bold">(42) 99818-2498</p>
                </div>
                <div className="glass rounded-lg p-6">
                  <p className="text-orange-300 font-semibold mb-2">📧 Email</p>
                  <p className="text-xl text-white">contato@gesol.com.br</p>
                </div>
                <div className="glass rounded-lg p-6">
                  <p className="text-orange-300 font-semibold mb-2">📍 Endereço</p>
                  <p className="text-xl text-white">São João do Triunfo, PR</p>
                </div>
              </div>
            </div>

            <div className="animate-slideInRight">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t-4 border-gradient-to-r from-orange-500 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sun className="w-6 h-6 text-orange-500" />
                <span className="text-xl font-bold text-white">GESOL</span>
              </div>
              <p className="text-slate-500">Energia solar de qualidade para seu futuro</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-slate-500">
                <li><a href="#sobre" className="hover:text-orange-500 transition">Sobre</a></li>
                <li><a href="#projetos" className="hover:text-orange-500 transition">Projetos</a></li>
                <li><a href="#calculadora" className="hover:text-orange-500 transition">Calculadora</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Redes Sociais</h4>
              <p className="text-slate-500">Siga-nos nas redes sociais para atualizações</p>
              <div className="flex items-center gap-4 mt-4">
                <a href="https://www.facebook.com/gesolenergiasolar" className="hover:text-orange-500 transition">Facebook</a>
                <a href="https://www.instagram.com/gesolenergiasolar" className="hover:text-orange-500 transition">Instagram</a>
              </div>
            </div>
            
          </div>
          <div className="border-t border-slate-800 pt-8 text-center">
            <p>&copy; 2025 GESOL Energia Solar. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}

