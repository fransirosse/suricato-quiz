export type Profile = 'AGG' | 'CTRL' | 'TACT' | 'ADAPT' | 'ENG';

export type AnswerScores = Record<Profile, number>;

export type UserAnswers = AnswerScores[];

export type TotalScores = Record<Profile, number>;

/**
 * Calcula os totais de pontos para cada perfil, somando as pontuações de todas as respostas do usuário.
 */
export function calculateScores(answers: UserAnswers): TotalScores {
  return answers.reduce((totals, answer) => {
    totals.AGG += answer.AGG;
    totals.CTRL += answer.CTRL;
    totals.TACT += answer.TACT;
    totals.ADAPT += answer.ADAPT;
    totals.ENG += answer.ENG;
    return totals;
  }, { AGG: 0, CTRL: 0, TACT: 0, ADAPT: 0, ENG: 0 } as TotalScores);
}

/**
 * Determina o perfil vencedor com base nos totais de pontos.
 * Em caso de empate, utiliza a função de desempate com perguntas específicas.
 */
export function determineProfile(scores: TotalScores, answers: UserAnswers): Profile {
  const profiles: Profile[] = ['AGG', 'CTRL', 'TACT', 'ADAPT', 'ENG'];
  const maxScore = Math.max(...profiles.map(p => scores[p]));
  let candidates = profiles.filter(p => scores[p] === maxScore);

  if (candidates.length === 1) {
    return candidates[0];
  }

  return resolveTie(candidates, answers);
}

/**
 * Resolve empates comparando as pontuações nas perguntas 1 (índice 0), 5 (índice 4) e 6 (índice 5),
 * em ordem. Mantém a ordem dos perfis para desempate final.
 */
export function resolveTie(candidates: Profile[], answers: UserAnswers): Profile {
  const tiebreakerIndices = [0, 4, 5]; // perguntas 1, 5, 6

  for (const qIdx of tiebreakerIndices) {
    const questionScores = answers[qIdx];
    const maxQScore = Math.max(...candidates.map(p => questionScores[p]));
    candidates = candidates.filter(p => questionScores[p] === maxQScore);
    if (candidates.length === 1) {
      return candidates[0];
    }
  }

  // Se ainda houver empate, retorna o primeiro na ordem dos perfis
  return candidates[0];
}