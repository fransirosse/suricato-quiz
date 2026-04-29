import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentQuestion, totalQuestions }) => {
  // Componente de barra de progresso para o quiz Pokémon TCG
  // Mostra 7 círculos representando as perguntas (0 a 6)
  // Círculos anteriores: preenchidos em vermelho (#DC143C) com ✓
  // Círculo atual: destacado com borda grossa vermelha e brilho
  // Círculos futuros: vazios com borda cinza
  // Linha de progresso animada crescendo da esquerda
  // Animações suaves com Framer Motion

  return (
    <div className="w-full h-14 relative">
      {/* Linha de fundo */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full -translate-y-1/2 z-0" />
      
      {/* Linha de progresso animada */}
      <motion.div 
        className="absolute top-1/2 left-0 h-1 bg-[#DC143C] rounded-full -translate-y-1/2 z-10 shadow-sm"
        initial={{ width: '0%' }}
        animate={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      
      {/* Container dos círculos */}
      <div className="flex items-center justify-between w-full h-full z-20 px-2">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const isCompleted = index < currentQuestion;
          const isCurrent = index === currentQuestion;
          const isFuture = index > currentQuestion;

          return (
            <motion.div
              key={index}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center shadow-lg
                transition-colors duration-300
                ${isCompleted 
                  ? 'bg-[#DC143C] text-white font-bold text-xl' 
                  : ''}
                ${isCurrent 
                  ? 'bg-white border-4 border-[#DC143C] ring-4 ring-[#DC143C]/50 shadow-2xl' 
                  : ''}
                ${isFuture 
                  ? 'bg-white border-2 border-gray-300 hover:border-gray-400 hover:shadow-md' 
                  : ''}
              `}
              animate={{
                scale: (isCompleted || isCurrent) ? 1.25 : 1,
                rotateY: isCurrent ? 360 : 0
              }}
              transition={{ 
                type: 'spring',
                stiffness: 500,
                damping: 20,
                rotateY: { duration: 0.8 }
              }}
            >
              {isCompleted && <span>✓</span>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
