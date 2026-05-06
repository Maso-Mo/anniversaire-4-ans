import React, { useState, useEffect } from 'react';

export default function App() {
  const [step, setStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState({ h: "00", m: "00", s: "00" });
  const [hearts, setHearts] = useState([]);

  // Ton poème découpé en 17 parties
  const fragmentsPoeme = [
    "Je ne sais pas exactement quand tout a changé,",
    "Quand ton nom est devenu une habitude dans mes pensées,",
    "Quand ton absence a commencé à peser plus lourd que le silence.",
    "Ce que je sais, c’est qu’avec toi, rien n’est banal.",
    "Tu es entrée dans ma vie sans prévenir,",
    "Et tu as pris une place que je ne peux plus imaginer vide.",
    "Il y a des jours simples, où on parle de rien,",
    "Mais même dans ces moments-là, tout a plus de sens.",
    "Et il y a des jours compliqués, où tout semble fragile,",
    "Mais même là, je ne doute pas de nous.",
    "Parce que t’aimer, ce n’est pas juste un sentiment,",
    "C’est une décision que je prends encore, chaque jour, sans hésiter.",
    "Je ne te promets pas un conte parfait,",
    "Je ne te promets pas de ne jamais tomber,",
    "Mais je te promets de rester, même quand ce sera difficile.",
    "Tu es ce mélange rare, de douceur et de force,",
    "C’est toi que je choisis. Encore, et encore. ❤️"
  ];

  const images = Array.from({ length: 17 }).map((_, i) => ({
    src: i === 0 ? "/image-react/image.jpeg" : `/image-react/image-${i}.jpeg`,
    texte: fragmentsPoeme[i]
  }));

  useEffect(() => {
    // Pour le test : on définit la fin dans 10 secondes
    const targetDate = new Date().getTime() + 10000; 

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        setStep(2);
        generateHearts();
      } else {
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setTimeLeft({
          h: String(h).padStart(2, '0'),
          m: String(m).padStart(2, '0'),
          s: String(s).padStart(2, '0')
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const generateHearts = () => {
    const newHearts = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      delay: Math.random() * 5 + "s",
      size: Math.random() * 20 + 10 + "px",
      duration: Math.random() * 3 + 2 + "s"
    }));
    setHearts(newHearts);
  };

  return (
    <div style={containerStyle}>
      {step >= 2 && hearts.map(h => (
        <span key={h.id} className="falling-heart" style={{ 
          left: h.left, 
          animationDelay: h.delay, 
          animationDuration: h.duration,
          fontSize: h.size 
        }}>❤️</span>
      ))}

      {step === 1 && (
        <div style={boxStyle} className="responsive-box">
          <p style={{ letterSpacing: '4px', opacity: 0.7, fontSize: '0.8rem', marginBottom: '20px' }}>
            NOTRE HISTOIRE CONTINUE DANS
          </p>
          <div className="timer-text">
            {timeLeft.h}<span style={unitLabel}>H</span> : {timeLeft.m}<span style={unitLabel}>M</span> : {timeLeft.s}<span style={unitLabel}>S</span>
          </div>
          <p style={{ marginTop: '20px', fontSize: '0.7rem', opacity: 0.5 }}>HEURE DE MAURICE</p>
        </div>
      )}

      {step === 2 && (
        <div style={{ textAlign: 'center', zIndex: 100, padding: '20px' }}>
          <h1 className="title-responsive">JOYEUX 4 ANS ! ❤️</h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>Chaque seconde à tes côtés est un cadeau.</p>
          <button onClick={() => setStep(3)} style={buttonStyle}>Découvrir nos souvenirs ✨</button>
        </div>
      )}

      {step === 3 && (
        <div style={galleryPageStyle}>
          <div style={poemBoxStyle}>
            <h2 style={{ marginBottom: '15px', color: '#ff4d4d' }}>À ma complice,</h2>
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: '1.6' }}>
              Quatre années à t'aimer, à rire et à grandir...
            </p>
          </div>

          <div className="responsive-grid">
            {images.map((img, idx) => (
              <div key={idx} className="photo-frame">
                <img src={img.src} alt="Souvenir" style={imgStyle} onError={(e) => e.target.parentElement.style.display='none'} />
                <p style={textUnderImgStyle}>{img.texte}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fall { 
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; } 
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; } 
        }
        @keyframes heartbeat {
          0% { transform: scale(1); }
          15% { transform: scale(1.05); }
          30% { transform: scale(1); }
          45% { transform: scale(1.1); }
          60% { transform: scale(1); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(50px) rotate(10deg); }
          to { opacity: 1; transform: translateY(0) rotate(${Math.random() * 4 - 2}deg); }
        }

        .falling-heart { position: absolute; top: -10%; z-index: 50; animation: fall linear infinite; }
        
        .timer-text { 
          font-size: 2.5rem; 
          font-weight: bold; 
          font-family: monospace; 
          animation: heartbeat 1.5s infinite ease-in-out; /* Effet battement */
        }

        .responsive-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 30px;
          width: 100%;
          padding: 0 20px 50px 20px;
        }

        @media (min-width: 600px) { .responsive-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .responsive-grid { grid-template-columns: repeat(3, 1fr); } }

        .photo-frame { 
          background: white; padding: 10px; padding-bottom: 25px; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.5); 
          animation: slideIn 0.8s ease-out both; /* Entrée stylée */
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .photo-frame:hover { 
          transform: scale(1.05) rotate(0deg) !important; 
          z-index: 10; 
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }

        .title-responsive { 
          font-size: 2.5rem; 
          font-weight: 900;
          text-shadow: 0 0 15px rgba(255,255,255,0.3);
        }

        @media (min-width: 768px) {
          .title-responsive { font-size: 4rem; }
        }

        .responsive-box {
          width: 90%;
          max-width: 500px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}

// STYLES
const containerStyle = {
  minHeight: '100vh', width: '100vw',
  background: 'radial-gradient(circle, #ff2d2d 0%, #800000 70%, #220000 100%)',
  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
  overflowX: 'hidden', overflowY: 'auto', padding: '40px 0', fontFamily: 'serif'
};

const boxStyle = {
  background: 'rgba(0, 0, 0, 0.25)', padding: '40px 20px', borderRadius: '30px',
  backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)',
  textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
};

const unitLabel = { fontSize: '0.8rem', marginLeft: '3px', opacity: 0.5 };

const buttonStyle = {
  padding: '12px 30px', fontSize: '1rem', borderRadius: '25px', border: 'none',
  background: 'white', color: '#800000', fontWeight: 'bold', cursor: 'pointer'
};

const galleryPageStyle = { width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center' };

const poemBoxStyle = {
  textAlign: 'center', background: 'rgba(0,0,0,0.5)', padding: '30px 20px',
  borderRadius: '20px', marginBottom: '40px', width: '90%', border: '1px solid rgba(255,255,255,0.1)'
};

const imgStyle = { width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover' };

const textUnderImgStyle = {
  color: '#333', marginTop: '12px', fontSize: '0.85rem', fontStyle: 'italic', textAlign: 'center', padding: '0 5px'
};