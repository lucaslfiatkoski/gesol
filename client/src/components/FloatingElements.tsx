export default function FloatingElements() {
  return (
    <>
      {/* Floating circles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Orange circle - top right */}
        <div
          className="absolute w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{
            top: "-100px",
            right: "-100px",
            animationDuration: "8s",
          }}
        />

        {/* Blue circle - bottom left */}
        <div
          className="absolute w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{
            bottom: "-100px",
            left: "-100px",
            animationDuration: "10s",
            animationDelay: "2s",
          }}
        />

        {/* Orange circle - middle */}
        <div
          className="absolute w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animationDuration: "12s",
            animationDelay: "4s",
          }}
        />
      </div>
    </>
  );
}

