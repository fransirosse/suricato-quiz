interface Scores {
    AGG: number;
    CTRL: number;
    TACT: number;
    ADAPT: number;
    ENG: number;
  }
  
  interface Option {
    score: Scores;
  }
  
  interface Question {
    options: Option[];
  }
  
  /**
   * Calcula os scores totais (AGG, CTRL, TACT, ADAPT, ENG) baseado nas respostas do usuário
   * e nos dados das perguntas.
   * @param responses Array de índices das opções escolhidas para cada pergunta (ex: [0, 1, 2]).
   * @param questions Array de objetos de perguntas, cada uma com um array de opções contendo scores.
   * @returns Objeto com os totais acumulados de cada score.
   */
  export function calculateScores(responses: number[], questions: Question[]): Scores {
    // Inicializa os totais em zero
    const totalScores: Scores = {
      AGG: 0,
      CTRL: 0,
      TACT: 0,
      ADAPT: 0,
      ENG: 0
    };
  
    // Percorre as respostas e acumula scores
    for (let i = 0; i < Math.min(responses.length, questions.length); i++) {
      const optionIndex = responses[i];
      const question = questions[i];
  
      // Verifica se a pergunta e a opção existem
      if (question && question.options[optionIndex]) {
        const optionScore = question.options[optionIndex].score;
  
        // Acumula cada score
        totalScores.AGG += optionScore.AGG;
        totalScores.CTRL += optionScore.CTRL;
        totalScores.TACT += optionScore.TACT;
        totalScores.ADAPT += optionScore.ADAPT;
        totalScores.ENG += optionScore.ENG;
      }
    }
  
    return totalScores;
  }
  