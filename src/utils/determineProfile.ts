interface Scores {
    AGG: number;
    CTRL: number;
    TACT: number;
    ADAPT: number;
    ENG: number;
  }
  
  interface Profile {
    sigla: 'AGG' | 'CTRL' | 'TACT' | 'ADAPT' | 'ENG';
    nomeCompleto: string;
    descricaoPersonalidade: string;
    deckRecomendado: string;
    descricaoDeck: string;
  }
  
  export function determineProfile(scores: Scores, profiles: Profile[]): Profile {
    // Determina o perfil vencedor com base nas pontuações fornecidas
    // Encontra a pontuação máxima entre todos os perfis
    const maxScore = Math.max(...Object.values(scores));
  
    // Filtra os perfis que possuem a pontuação máxima
    const candidates = profiles.filter(profile => scores[profile.sigla] === maxScore);
  
    // Se houver apenas um candidato, retorna ele
    if (candidates.length === 1) {
      return candidates[0];
    }
  
    // Em caso de empate, aplica desempate pela ordem de prioridade:
    // AGG > CTRL > TACT > ADAPT > ENG
    const ordemDesempate: Record<string, number> = {
      AGG: 0,
      CTRL: 1,
      TACT: 2,
      ADAPT: 3,
      ENG: 4,
    };
  
    // Ordena os candidatos pela ordem de desempate e seleciona o primeiro
    const vencedor = candidates.sort((a, b) => ordemDesempate[a.sigla] - ordemDesempate[b.sigla])[0];
  
    return vencedor;
  }
  