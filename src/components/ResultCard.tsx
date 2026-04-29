import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type ProfileType = 'AGG' | 'CTRL' | 'TACT' | 'ADAPT' | 'ENG';

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  duration: number;
  emoji: string;
}

interface ResultCardProps {
  profile: ProfileType;
  deckName: string;
  deckDescription: string;
  profileDescription: string;
  onPlayAgain: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({
  profile,
  deckName,
  deckDescription,
  profileDescription,
  onPlayAgain
}) => {
  // Estado para partículas de confete
  const [particles, setParticles] = useState<Particle[]>([]);

  // Gera partículas de confete ao montar o componente
  useEffect(() => {
    const emojis = ['🎉', '⭐', '✨', '🎊', '🎈', '🔥'];
    const newParticles: Particle[] = Array.from({ length: 40 }).map(() => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      rotation: Math.random() * 720,
      duration: 2 + Math.random() * 3,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }));
    setParticles(newParticles);
  }, []);

  // Mapeia perfil para ícone/emoji temático
  const getProfileIcon = (profile: ProfileType): string => {
    const icons: Record<ProfileType, string> = {
      AGG: '🔥',
      CTRL: '🛡️',
      TACT: '🧠',
      ADAPT: '🌪️',
      ENG: '⚡'
    };
    return icons[profile];
  };

  return (
    <motion.div
      className="relative max-w-lg mx-auto p-8 md:p-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl text-white backdrop-blur-sm"
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, bounce: 0.4 }}
    >
      {/* Efeito de confete opcional (sempre ativado ao montar) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute text-2xl md:text-3xl"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            initial={{ opacity: 1, scale: 1, rotate: 0 }}
            animate={{
              top: '130%',
              opacity: 0,
              scale: 0,
              rotate: p.rotation,
            }}
            transition={{ duration: p.duration, ease: 'linear' }}
          >
            {p.emoji}
          </motion.span>
        ))}
      </div>

      {/* Ícone/imagem placeholder do deck/perfil */}
      <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 md:mb-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl md:text-5xl shadow-2xl border-4 border-white/30">
        {getProfileIcon(profile)}
      </div>

      {/* Nome do perfil em destaque */}
      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-widest text-center mb-4 md:mb-6 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-2xl">
        {profile}
      </h1>

      {/* Nome e descrição do deck */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4 drop-shadow-lg">
        {deckName}
      </h2>
      <p className="text-lg md:text-xl text-center mb-6 md:mb-8 opacity-90 leading-relaxed px-4">
        {deckDescription}
      </p>

      {/* Descrição da personalidade */}
      <div className="text-base md:text-lg leading-relaxed text-center mb-8 md:mb-12 max-w-md mx-auto px-4 opacity-95">
        {profileDescription}
      </div>

      {/* Botão para jogar novamente */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onPlayAgain}
        className="block mx-auto px-8 md:px-12 py-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 hover:from-yellow-300 hover:via-orange-300 hover:to-red-300 text-xl md:text-2xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-0 focus:outline-none focus:ring-4 focus:ring-yellow-300"
      >
        Jogar Novamente
      </motion.button>
    </motion.div>
  );
};

export default ResultCard;
