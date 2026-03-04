const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Posture icon outline */}
      <div
        className="absolute animate-drift"
        style={{ top: "15%", left: "8%", animationDelay: "0s" }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" opacity="0.06">
          <circle cx="30" cy="12" r="6" stroke="white" strokeWidth="1.5" />
          <line x1="30" y1="18" x2="30" y2="38" stroke="white" strokeWidth="1.5" />
          <line x1="30" y1="24" x2="20" y2="32" stroke="white" strokeWidth="1.5" />
          <line x1="30" y1="24" x2="40" y2="32" stroke="white" strokeWidth="1.5" />
          <line x1="30" y1="38" x2="22" y2="50" stroke="white" strokeWidth="1.5" />
          <line x1="30" y1="38" x2="38" y2="50" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Pause symbol */}
      <div
        className="absolute animate-drift"
        style={{ top: "60%", right: "10%", animationDelay: "5s" }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.06">
          <rect x="12" y="8" width="5" height="24" rx="2" stroke="white" strokeWidth="1.5" />
          <rect x="23" y="8" width="5" height="24" rx="2" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Waveform */}
      <div
        className="absolute animate-drift"
        style={{ bottom: "20%", left: "15%", animationDelay: "10s" }}
      >
        <svg width="120" height="30" viewBox="0 0 120 30" fill="none" opacity="0.05">
          <path
            d="M0 15 Q10 5, 20 15 Q30 25, 40 15 Q50 5, 60 15 Q70 25, 80 15 Q90 5, 100 15 Q110 25, 120 15"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Circle */}
      <div
        className="absolute animate-drift"
        style={{ top: "35%", right: "20%", animationDelay: "7s" }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" opacity="0.05">
          <circle cx="25" cy="25" r="20" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      {/* Diamond */}
      <div
        className="absolute animate-drift"
        style={{ top: "75%", left: "70%", animationDelay: "12s" }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" opacity="0.06">
          <rect x="15" y="2" width="16" height="16" rx="2" stroke="white" strokeWidth="1" transform="rotate(45 15 10)" />
        </svg>
      </div>
    </div>
  );
};

export default FloatingElements;
