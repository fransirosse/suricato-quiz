import React from 'react';
import { motion } from 'framer-motion';

// Interface para as props do componente
interface QuestionCardProps {
  question: string;
  options: string[];
  onSelectOption: (option: string) => void;
  isLoading: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.3 } 
  },
} as const;

// Componente QuestionCard para exibir uma pergunta do quiz
const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  onSelectOption,
  isLoading,
}) => {
  return (
    <motion.div
      // Card principal com sombra e bordas arredondadas
      className="bg-white shadow-2xl rounded-3xl p-6 md:p-8 lg:p-10 max-w-4xl mx-auto border border-gray-100 backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Título da pergunta com animação de fade-in */}
      <motion.h2 
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-8 text-center leading-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {question}
      </motion.h2>

      {/* Container das opções com stagger animation */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {options.map((option, index) => (
          <motion.button
            // Botão de opção com gradiente, hover e active states
            key={`${option}-${index}`}
            className={`group w-full py-4 md:py-5 px-6 text-lg md:text-xl font-semibold rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md flex items-center justify-center gap-3 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 active:from-indigo-700 active:via-purple-700 active:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50`}
            onClick={() => onSelectOption(option)}
            disabled={isLoading}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {isLoading ? (
              // Spinner de loading simples com Tailwind
              <div className="w-6 h-6 md:w-7 md:h-7 border-3 border-white/80 border-t-transparent rounded-full animate-spin shrink-0" />
            ) : (
              // Ícone de seta para feedback visual
              <span className="text-lg md:text-xl shrink-0 transition-transform group-hover:translate-x-1">▶️</span>
            )}
            <span>{option}</span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default QuestionCard;
