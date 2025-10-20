import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappNumber = "5511999999999"; // Replace with actual WhatsApp number
  const whatsappMessage = "Olá! Gostaria de saber mais sobre os serviços da GESOL Energia Solar.";

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      title="Fale conosco no WhatsApp"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}

