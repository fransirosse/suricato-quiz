import { create } from 'zustand';

interface QuizStore {
  currentQuestion: number;
  userAnswers: string[];
  totalScores: number;
  experienceLevel: string;
  resultProfile: string;

  setExperienceLevel: (level: string) => void;
  recordAnswer: (answer: string) => void;
  goToNextQuestion: () => void;
  calculateResult: () => void;
  resetQuiz: () => void;
}

const useQuizStore = create<QuizStore>((set, get) => ({
  currentQuestion: 0,
  userAnswers: [],
  totalScores: 0,
  experienceLevel: '',
  resultProfile: '',

  // Define o nível de experiência do usuário
  setExperienceLevel: (level: string) => set({ experienceLevel: level }),

  // Registra a resposta do usuário e incrementa a pontuação (1 ponto por resposta, simples)
  recordAnswer: (answer: string) => {
    const currentTotal = get().totalScores + 1;
    set({
      userAnswers: [...get().userAnswers, answer],
      totalScores: currentTotal
    });
  },

  // Avança para a próxima pergunta
  goToNextQuestion: () => {
    set({ currentQuestion: get().currentQuestion + 1 });
  },

  // Calcula o perfil de resultado baseado na pontuação total
  calculateResult: () => {
    const total = get().totalScores;
    let profile = '';
    if (total >= 8) {
      profile = 'Avançado';
    } else if (total >= 5) {
      profile = 'Intermediário';
    } else {
      profile = 'Iniciante';
    }
    set({ resultProfile: profile });
  },

  // Reseta o quiz para o estado inicial (mantém experienceLevel)
  resetQuiz: () => {
    set({
      currentQuestion: 0,
      userAnswers: [],
      totalScores: 0,
      resultProfile: '',
    });
  },
}));

export default useQuizStore;
