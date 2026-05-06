import React, { useState, useEffect } from 'react';

export default function App() {
  const [step, setStep] = useState(1); // 1: Timer, 2: Message, 3: Poème & Galerie
  const [timeLeft, setTimeLeft] = useState({ h: "00", m: "00", s: "00" });
  const [hearts, setHearts] = useState([]);

  // Chemins de tes 17 images dans src/assets/image-react/
  const images = Array.from({ length: 17 }).map((_, i) => {
    return i === 0 ? `/src/assets/image-react/image.jpeg` : `/src/assets/image-react/image-${i}.jpeg`;
  });

  useEffect(() => {
    // CIBLE : Minuit pile à Maurice (UTC+4)
    const targetDate = new Date('2026-05-07T00:00:00+04:00').getTime();

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
    const newHearts = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      delay: Math.random() * 5 + "s",
      size: Math.random() * 25 + 15 + "px",
      duration: Math.random() * 3 + 2 + "s"
    }));
    setHearts(newHearts);
  };

  return (
    <div style={containerStyle}>
      {/* PLUIE DE COEURS GLOBALE */}
      {step >= 2 && hearts.map(h => (
        <span key={h.id} className="falling-heart" style={{ 
          left: h.left, 
          animationDelay: h.delay, 
          animationDuration: h.duration,
          fontSize: h.size 
        }}>❤️</span>
      ))}

      {/* ETAPE 1 : LE COMPTE À REBOURS */}
      {step === 1 && (
        <div style={boxStyle}>
          <p style={{ letterSpacing: '8px', opacity: 0.7, fontSize: '0.9rem', marginBottom: '20px' }}>
            NOTRE HISTOIRE CONTINUE DANS
          </p>
          <div style={timerTextStyle}>
            {timeLeft.h}<span style={unitLabel}>H</span> : {timeLeft.m}<span style={unitLabel}>M</span> : {timeLeft.s}<span style={unitLabel}>S</span>
          </div>
          <p style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.5 }}>HEURE DE MAURICE</p>
        </div>
      )}

      {/* ETAPE 2 : LE MESSAGE FLASH */}
      {step === 2 && (
        <div style={{ textAlign: 'center', zIndex: 100, animation: 'fadeIn 1.2s ease-out', padding: '20px' }}>
          <h1 style={titleStyle}>JOYEUX 4 ANS ! ❤️</h1>
          <p style={{ fontSize: '1.4rem', marginBottom: '40px' }}>
            Chaque seconde à tes côtés est un cadeau.
          </p>
          <button onClick={() => setStep(3)} style={buttonStyle}>
            Découvrir nos souvenirs ✨
          </button>
        </div>
      )}

      {/* ETAPE 3 : POÈME ET GALERIE */}
      {step === 3 && (
        <div style={galleryPageStyle}>
          <div style={poemBoxStyle}>
            <h2 style={{ marginBottom: '25px', color: '#ff4d4d' }}>À ma complice,</h2>
            <p style={poemTextStyle}>
              Quatre années à t'aimer, à rire et à grandir,<br/>
              Quatre années de bonheur que je ne peux finir.<br/>
              De nos premiers instants aux rêves de demain,<br/>
              Je ne lâche jamais la douceur de ta main.
            </p>
          </div>

          <div style={gridStyle}>
            {images.map((img, idx) => (
              <div key={idx} className="photo-frame">
                <img 
                  src={img} 
                  alt="Souvenir" 
                  style={imgStyle} 
                  onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                />
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
        .falling-heart { position: absolute; top: -10%; z-index: 50; animation: fall linear infinite; }
        
        .photo-frame { 
          background: white; padding: 12px; padding-bottom: 35px; 
          box-shadow: 0 15px 30px rgba(0,0,0,0.4); 
          transform: rotate(${Math.random() * 8 - 4}deg);
          transition: transform 0.4s;
          animation: fadeIn 0.8s ease-out both;
        }
        .photo-frame:hover { transform: scale(1.05) rotate(0deg); z-index: 100; }
        
        @keyframes fadeIn { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
      `}</style>
    </div>
  );
}

// STYLES OBJET
const containerStyle = {
  minHeight: '100vh', width: '100vw',
  background: 'radial-gradient(circle, #ff2d2d 0%, #800000 70%, #220000 100%)',
  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
  overflowY: 'auto', padding: '60px 0', fontFamily: 'serif'
};

const boxStyle = {
  background: 'rgba(0, 0, 0, 0.25)', padding: '50px', borderRadius: '40px',
  backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)',
  textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
};

const timerTextStyle = { fontSize: '4.5rem', fontWeight: 'bold', fontFamily: 'monospace' };
const unitLabel = { fontSize: '1rem', marginLeft: '5px', opacity: 0.5 };

const titleStyle = { fontSize: '4rem', fontWeight: '900', marginBottom: '20px' };

const buttonStyle = {
  padding: '15px 40px', fontSize: '1.2rem', borderRadius: '30px', border: 'none',
  background: 'white', color: '#800000', fontWeight: 'bold', cursor: 'pointer'
};

const galleryPageStyle = { width: '90%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center' };

const poemBoxStyle = {
  textAlign: 'center', background: 'rgba(0,0,0,0.5)', padding: '40px',
  borderRadius: '25px', marginBottom: '50px', backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.1)'
};

const poemTextStyle = { fontSize: '1.3rem', fontStyle: 'italic', lineHeight: '1.8' };

const gridStyle = {
  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '30px', width: '100%', paddingBottom: '50px'
};

const imgStyle = { width: '100%', height: '240px', objectFit: 'cover' };