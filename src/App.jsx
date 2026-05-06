import React, { useState, useEffect } from 'react';

export default function App() {
  const [step, setStep] = useState(1); // 1: Timer, 2: Message, 3: Poème & Galerie
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

 const images = Array.from({ length: 17 }).map((_, i) => {
  return {
    // On enlève /src/assets car le dossier est maintenant dans public
    src: i === 0 ? `/image-react/image.jpeg` : `/image-react/image-${i}.jpeg`,
    texte: fragmentsPoeme[i]
  };
});

  useEffect(() => {
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
      {step >= 2 && hearts.map(h => (
        <span key={h.id} className="falling-heart" style={{ 
          left: h.left, 
          animationDelay: h.delay, 
          animationDuration: h.duration,
          fontSize: h.size 
        }}>❤️</span>
      ))}

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
                  src={img.src} 
                  alt="Souvenir" 
                  style={imgStyle} 
                  onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                />
                {/* AJOUT DU TEXTE DU POÈME ICI */}
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
        .falling-heart { position: absolute; top: -10%; z-index: 50; animation: fall linear infinite; }
        
        .photo-frame { 
          background: white; padding: 12px; padding-bottom: 45px; 
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

// TES STYLES D'ORIGINE PRÉSERVÉS
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

// STYLE POUR TON TEXTE SOUS LA PHOTO
const textUnderImgStyle = {
  color: '#333',
  marginTop: '15px',
  fontSize: '0.9rem',
  fontStyle: 'italic',
  textAlign: 'center',
  lineHeight: '1.4',
  padding: '0 5px'
};