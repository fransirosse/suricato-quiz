'use client';

import { useEffect, useState } from 'react';

type ProfileType = 'AGG' | 'CTRL' | 'TACT' | 'ADAPT' | 'ENG';

type ScoreMap = {
  AGG: number;
  CTRL: number;
  TACT: number;
  ADAPT: number;
  ENG: number;
};

type Question = {
  text: string;
  options: {
    text: string;
    scores: Partial<ScoreMap>;
  }[];
};

const RESET_SECONDS = 90;

const baseQuestions: Question[] = [
  {
    text: 'Quando você precisa resolver algo importante, qual abordagem mais combina com você?',
    options: [
      { text: 'Tomo uma decisão rápida e sigo em frente', scores: { AGG: 2 } },
      { text: 'Analiso brevemente antes de decidir', scores: { TACT: 1, CTRL: 1 } },
      { text: 'Organizo um plano antes de agir', scores: { ENG: 2 } },
      { text: 'Prefiro observar melhor antes de agir', scores: { CTRL: 2 } },
    ],
  },
  {
    text: 'Em situações de pressão, você tende a:',
    options: [
      { text: 'Agir imediatamente para resolver', scores: { AGG: 2 } },
      { text: 'Agir com cautela, avaliando riscos', scores: { ADAPT: 2 } },
      { text: 'Parar para analisar antes de agir', scores: { CTRL: 2 } },
      { text: 'Evitar agir até ter mais segurança', scores: { ENG: 1, CTRL: 1 } },
    ],
  },
  {
    text: 'Sobre a forma como você se organiza:',
    options: [
      { text: 'Costumo agir de forma mais impulsiva', scores: { AGG: 2 } },
      { text: 'Me adapto conforme a situação', scores: { ADAPT: 2 } },
      { text: 'Tento manter alguma organização', scores: { TACT: 2 } },
      { text: 'Prefiro tudo bem estruturado', scores: { ENG: 2 } },
    ],
  },
  {
    text: 'Quando algo não sai como esperado, você:',
    options: [
      { text: 'Muda rapidamente de estratégia', scores: { AGG: 1, ADAPT: 1 } },
      { text: 'Ajusta o que for necessário e continua', scores: { ADAPT: 2 } },
      { text: 'Reavalia com calma antes de agir', scores: { CTRL: 2 } },
      { text: 'Prefere evitar erros com planejamento prévio', scores: { ENG: 2 } },
    ],
  },
];

const adaptiveQuestions = {
  NEVER: [
    {
      text: 'Qual dessas formas mais combina com você?',
      options: [
        { text: 'Resolver rapidamente', scores: { AGG: 2 } },
        { text: 'Manter controle da situação', scores: { CTRL: 2 } },
        { text: 'Encontrar soluções inteligentes', scores: { TACT: 2 } },
        { text: 'Fazer tudo funcionar bem', scores: { ENG: 2 } },
      ],
    },
    {
      text: 'Em um desafio novo, você prefere:',
      options: [
        { text: 'Começar e aprender fazendo', scores: { AGG: 2 } },
        { text: 'Esperar o momento certo', scores: { CTRL: 2 } },
        { text: 'Explorar possibilidades', scores: { TACT: 2 } },
        { text: 'Planejar antes de agir', scores: { ENG: 2 } },
      ],
    },
  ],
  MID: [
    {
      text: 'Em jogos, você tende a:',
      options: [
        { text: 'Partir para ação', scores: { AGG: 2 } },
        { text: 'Controlar o ritmo', scores: { CTRL: 2 } },
        { text: 'Esperar o melhor momento', scores: { TACT: 2 } },
        { text: 'Planejar suas jogadas', scores: { ENG: 2 } },
      ],
    },
    {
      text: 'Você prefere jogos que:',
      options: [
        { text: 'São rápidos e dinâmicos', scores: { AGG: 2 } },
        { text: 'Permitem adaptação', scores: { ADAPT: 2 } },
        { text: 'Valorizam estratégia', scores: { TACT: 2 } },
        { text: 'Evoluem ao longo do tempo', scores: { ENG: 2 } },
      ],
    },
  ],
  PRO: [
    {
      text: 'Qual estilo mais te atrai?',
      options: [
        { text: 'Pressão desde o início', scores: { AGG: 2 } },
        { text: 'Controle do jogo', scores: { CTRL: 2 } },
        { text: 'Punir erros do adversário', scores: { TACT: 2 } },
        { text: 'Sinergia e construção', scores: { ENG: 2 } },
      ],
    },
    {
      text: 'Como você define seu estilo?',
      options: [
        { text: 'Agressivo', scores: { AGG: 2 } },
        { text: 'Controlador', scores: { CTRL: 2 } },
        { text: 'Técnico', scores: { TACT: 2 } },
        { text: 'Estruturado', scores: { ENG: 2 } },
      ],
    },
  ],
};

const profileData = {
  AGG: {
    style: 'IMPACTO IMEDIATO',
    deck: 'Mega Lucario Ex',
    image: '/pokemon/lucario.png',
    color: 'from-blue-600 to-cyan-400',
    impact: 'Você não espera o jogo acontecer — você conduz o jogo.',
    text: [
      'Você é uma pessoa direta, objetiva e orientada à ação.',
      'Prefere tomar decisões rápidas, assumir o controle da situação e não depender de planos longos para avançar.',
      'Em vez de esperar, você faz acontecer.',
      'No jogo, isso se traduz em pressão constante, ritmo acelerado e domínio desde os primeiros movimentos.',
      'Esse deck foi feito para jogadores que gostam de intensidade.',
      'Ele permite ataques rápidos, decisões diretas e controle do ritmo da partida desde o início.',
      'Você não espera o jogo acontecer — você conduz o jogo.',
      'Ideal para quem gosta de partidas dinâmicas, decisões rápidas e sensação de controle imediato.',
    ],
  },
  CTRL: {
    style: 'CONTROLADOR DE RITMO',
    deck: 'Grimmsnarl Ex + Froslass',
    image: '/pokemon/grimmsnarl.png',
    color: 'from-purple-700 to-fuchsia-500',
    impact: 'Você não precisa correr — você conduz o jogo no seu ritmo.',
    text: [
      'Você prefere pensar antes de agir e tomar decisões com segurança.',
      'Não se deixa levar pela pressa — prefere entender o cenário e agir no momento certo.',
      'Você constrói vantagem com consistência e paciência.',
      'No jogo, isso se traduz em controle de mesa, desgaste progressivo e domínio estratégico da partida.',
      'Esse deck é focado em controle e pressão constante ao longo do tempo.',
      'Ele permite que você limite as opções do adversário e construa vantagem de forma gradual.',
      'Você não precisa correr — você conduz o jogo no seu ritmo.',
      'Ideal para quem gosta de estratégia, controle e vitórias construídas passo a passo.',
    ],
  },
  TACT: {
    style: 'ESTRATEGISTA',
    deck: 'Team Rocket’s Mewtwo Ex',
    image: '/pokemon/mewtwo.png',
    color: 'from-red-700 to-rose-500',
    impact: 'Você não vence pela força — você vence pela decisão certa.',
    text: [
      'Você valoriza inteligência, leitura de cenário e decisões bem calculadas.',
      'Prefere encontrar oportunidades e fazer jogadas que realmente mudam o rumo da partida.',
      'Você não joga no automático — você pensa o jogo.',
      'No jogo, isso se traduz em timing preciso, combinações e decisões que fazem diferença no momento certo.',
      'Esse deck recompensa leitura de jogo, estratégia e execução no momento ideal.',
      'Ele funciona melhor nas mãos de quem sabe observar, planejar e agir com precisão.',
      'Você não vence pela força — você vence pela decisão certa.',
      'Ideal para quem gosta de jogadas inteligentes e impacto estratégico.',
    ],
  },
  ADAPT: {
    style: 'ADAPTÁVEL',
    deck: 'Crustle + Kangaskhan + Ogerpon',
    image: '/pokemon/crustle.png',
    color: 'from-amber-700 to-yellow-500',
    impact: 'Você não precisa prever tudo — você sabe reagir.',
    text: [
      'Você não depende de um único plano para lidar com situações.',
      'Prefere segurança, flexibilidade e capacidade de ajuste conforme o cenário muda.',
      'Você se adapta — e isso te dá vantagem.',
      'No jogo, isso se traduz em resistência, versatilidade e múltiplas formas de responder ao adversário.',
      'Esse deck oferece estabilidade e opções durante toda a partida.',
      'Ele permite ajustes de estratégia conforme o jogo evolui, sem depender de uma única linha de ação.',
      'Você não precisa prever tudo — você sabe reagir.',
      'Ideal para quem valoriza consistência, segurança e flexibilidade.',
    ],
  },
  ENG: {
    style: 'CONSTRUTOR',
    deck: 'Festival Grounds + Dipplin',
    image: '/pokemon/dipplin.png',
    color: 'from-green-700 to-emerald-400',
    impact: 'Você não joga no impulso — você constrói o jogo.',
    text: [
      'Você gosta de organização, lógica e de ver tudo funcionando de forma eficiente.',
      'Prefere estruturar bem suas decisões e construir algo sólido ao longo do tempo.',
      'Para você, consistência é mais importante do que velocidade.',
      'No jogo, isso se traduz em sinergia, planejamento e evolução progressiva da partida.',
      'Esse deck funciona como uma estrutura bem organizada, onde cada peça tem um papel claro.',
      'Quando bem executado, ele se torna consistente, estável e difícil de parar.',
      'Você não joga no impulso — você constrói o jogo.',
      'Ideal para quem gosta de estratégia estruturada e funcionamento contínuo.',
    ],
  },
};

export default function Home() {
  const [screen, setScreen] = useState<'intro' | 'decks' | 'rules' | 'level' | 'quiz' | 'loading' | 'result'>('intro');
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<'NEVER' | 'MID' | 'PRO' | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(RESET_SECONDS);
  const [scores, setScores] = useState<ScoreMap>({
    AGG: 0,
    CTRL: 0,
    TACT: 0,
    ADAPT: 0,
    ENG: 0,
  });

  const questions = mode ? [...baseQuestions, ...adaptiveQuestions[mode]] : [];
  const totalQuestions = questions.length;
  const progress = totalQuestions ? ((step + 1) / totalQuestions) * 100 : 0;

  function restart() {
    setScreen('intro');
    setStep(0);
    setMode(null);
    setSecondsLeft(RESET_SECONDS);
    setScores({
      AGG: 0,
      CTRL: 0,
      TACT: 0,
      ADAPT: 0,
      ENG: 0,
    });
  }

  useEffect(() => {
    if (screen === 'intro') {
      setSecondsLeft(RESET_SECONDS);
      return;
    }

    let remaining = RESET_SECONDS;
    setSecondsLeft(remaining);

    const interval = setInterval(() => {
      remaining -= 1;
      setSecondsLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        restart();
      }
    }, 1000);

    const resetTimer = () => {
      remaining = RESET_SECONDS;
      setSecondsLeft(RESET_SECONDS);
    };

    window.addEventListener('pointerdown', resetTimer);
    window.addEventListener('keydown', resetTimer);

    return () => {
      clearInterval(interval);
      window.removeEventListener('pointerdown', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [screen, step, mode]);

  function addScore(option: { text: string; scores: Partial<ScoreMap> }) {
    const updated = { ...scores };

    Object.entries(option.scores).forEach(([key, value]) => {
      updated[key as ProfileType] += value ?? 0;
    });

    setScores(updated);

    if (step + 1 >= questions.length) {
      setScreen('loading');

      setTimeout(() => {
        setScreen('result');
      }, 2300);
    } else {
      setStep(step + 1);
    }
  }

  function getResult(): ProfileType {
    const order: ProfileType[] = ['AGG', 'CTRL', 'TACT', 'ADAPT', 'ENG'];

    return order.reduce((winner, current) => {
      return scores[current] > scores[winner] ? current : winner;
    }, 'AGG');
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex justify-center">
      <section className="min-h-screen w-full max-w-6xl bg-zinc-950">
        {screen !== 'intro' && (
          <header className="flex items-center justify-between px-8 py-4 border-b border-white/10">
            <div className="flex items-center gap-4">
              <img
                src="/logo-suricato-experience.png"
                alt="Suricato TCG Experience"
                className="h-10 w-auto object-contain bg-white p-1 rounded-md"
              />

              <div>
                <p className="text-xs tracking-[0.35em] text-yellow-300 font-semibold">
                  EXPERIÊNCIA SURICATO
                </p>
                <h1 className="text-xl font-bold">Descubra seu Deck</h1>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-zinc-500">reinício automático em</p>
              <p className="text-lg font-black text-yellow-300">{secondsLeft}s</p>
            </div>
          </header>
        )}

        {screen === 'intro' && (
          <div className="flex min-h-screen flex-col items-center justify-center text-center px-10 py-12">
            <img
              src="/logo-suricato-experience.png"
              alt="Suricato TCG Experience"
              className="h-56 md:h-72 w-auto object-contain mb-10 bg-white p-2 rounded-lg"
            />

            <h2 className="text-4xl md:text-5xl font-black leading-tight max-w-5xl">
              <span className="whitespace-nowrap">Não é você que escolhe o deck...</span>
              <br />
              <span className="text-yellow-300">É o deck que escolhe você!</span>
            </h2>

            <p className="mt-8 text-xl text-zinc-300 max-w-2xl">
              Responda algumas perguntas rápidas e descubra qual deck combina com seu estilo.
            </p>

            <button
              onClick={() => setScreen('decks')}
              className="mt-12 rounded-full bg-yellow-300 px-12 py-5 text-xl font-black text-zinc-950 shadow-lg shadow-yellow-300/20 active:scale-95 transition hover:scale-105 hover:shadow-yellow-300/40"
            >
              Começar experiência
            </button>
          </div>
        )}

        {screen === 'decks' && (
          <div className="px-10 py-12 max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-black text-center">
              Confira quais são os decks disponíveis
            </h2>

            <p className="text-center text-zinc-400 mt-3">
              Cada deck tem um estilo diferente de jogo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              {[
                'Mega Lucario Ex',
                'Grimmsnarl Ex + Froslass',
                'Team Rocket’s Mewtwo Ex',
                'Crustle + Kangaskhan + Ogerpon',
                'Festival Grounds + Dipplin',
              ].map((deck) => (
                <div
                  key={deck}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-lg font-bold text-center flex items-center justify-center min-h-[78px] cursor-default select-none"
                >
                  {deck}
                </div>
              ))}
            </div>

            <p className="text-xs text-zinc-500 mt-8 text-center max-w-3xl mx-auto">
              As decklists são desenvolvidas pela equipe da Suricato TCG e podem sofrer variações conforme disponibilidade de mercado, atualizações do jogo e comportamentos nos eventos locais, regionais e mundiais.
            </p>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => setScreen('rules')}
                className="rounded-full bg-yellow-300 px-10 py-4 text-lg font-black text-zinc-950 active:scale-95 transition hover:scale-105 hover:shadow-lg hover:shadow-yellow-300/40"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {screen === 'rules' && (
          <div className="flex flex-col items-center justify-center text-center px-10 py-20 min-h-[calc(100vh-73px)] max-w-5xl mx-auto">
            <h2 className="text-4xl font-black">Como funciona</h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 transition hover:border-yellow-300/40 hover:bg-white/10">
                <p className="text-3xl text-yellow-300 font-black">1</p>
                <p className="mt-3 font-bold">Você responde</p>
                <p className="text-sm text-zinc-400 mt-2">Perguntas rápidas sobre seu estilo</p>
              </div>

              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 transition hover:border-yellow-300/40 hover:bg-white/10">
                <p className="text-3xl text-yellow-300 font-black">2</p>
                <p className="mt-3 font-bold">O sistema calcula</p>
                <p className="text-sm text-zinc-400 mt-2">O resultado é definido automaticamente</p>
              </div>

              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 transition hover:border-yellow-300/40 hover:bg-white/10">
                <p className="text-3xl text-yellow-300 font-black">3</p>
                <p className="mt-3 font-bold">Você recebe</p>
                <p className="text-sm text-zinc-400 mt-2">O deck indicado pelo seu perfil</p>
              </div>
            </div>

            <p className="mt-10 text-zinc-300 max-w-2xl">
              Não é possível escolher o deck dentro da experiência. Caso queira outro resultado, é possível realizar uma nova experiência ou adquirir um deck específico diretamente na loja.
            </p>

            <button
              onClick={() => setScreen('level')}
              className="mt-10 rounded-full bg-yellow-300 px-10 py-4 text-lg font-black text-zinc-950 active:scale-95 transition hover:scale-105 hover:shadow-lg hover:shadow-yellow-300/40"
            >
              Entendi
            </button>
          </div>
        )}

        {screen === 'level' && (
          <div className="flex flex-col items-center justify-center px-10 py-16 min-h-[calc(100vh-73px)] max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-black text-center">
              Você já teve contato com jogos de cartas?
            </h2>
            <p className="text-zinc-400 mt-3 text-center">
              Pokémon, Yu-Gi-Oh, Magic ou outros jogos parecidos
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 w-full max-w-3xl">
              {[
                { label: 'Nunca joguei', value: 'NEVER' as const },
                { label: 'Já joguei algumas vezes', value: 'MID' as const },
                { label: 'Jogo ocasionalmente', value: 'MID' as const },
                { label: 'Jogo com frequência', value: 'PRO' as const },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setMode(item.value);
                    setScreen('quiz');
                  }}
                  className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center text-lg font-bold active:scale-95 transition hover:bg-yellow-300 hover:text-zinc-950 hover:scale-[1.02] hover:shadow-lg hover:shadow-yellow-300/20 flex items-center justify-center min-h-[96px]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {screen === 'quiz' && mode && (
          <div className="px-10 py-12 min-h-[calc(100vh-73px)] flex flex-col max-w-5xl mx-auto text-center">
            <div>
              <div className="flex justify-between text-sm text-zinc-400 mb-3">
                <span>Pergunta {step + 1} de {totalQuestions}</span>
                <span>{Math.round(progress)}%</span>
              </div>

              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-yellow-300 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <h2 className="text-4xl font-black leading-tight max-w-4xl mx-auto text-center">
                {questions[step].text}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 w-full max-w-4xl">
                {questions[step].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => addScore(option)}
                    className="rounded-2xl border border-white/10 bg-white/5 hover:bg-yellow-300 hover:text-zinc-950 p-6 text-center text-lg font-bold min-h-[96px] active:scale-95 transition hover:scale-[1.02] hover:shadow-lg hover:shadow-yellow-300/20 flex items-center justify-center w-full whitespace-normal"
                  >
                    <span className="block w-full text-center">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {screen === 'loading' && (
          <div className="px-10 py-12 min-h-[calc(100vh-73px)] flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
            <div className="relative flex items-center justify-center">
              <div className="absolute h-64 w-64 rounded-full bg-yellow-300/20 blur-3xl animate-pulse" />
              <div className="relative h-28 w-28 rounded-full border-4 border-yellow-300/30 border-t-yellow-300 animate-spin" />
            </div>

            <h2 className="mt-12 text-4xl font-black text-yellow-300">
              Seu deck está sendo escolhido...
            </h2>

            <p className="mt-4 text-lg text-zinc-300 max-w-xl">
              Estamos analisando seu estilo, suas decisões e a melhor combinação para a sua jornada.
            </p>
          </div>
        )}

        {screen === 'result' && (
          <div className="px-10 py-12 min-h-[calc(100vh-73px)] flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
            {(() => {
              const result = getResult();
              const data = profileData[result];

              return (
                <>
                  <div className="relative flex items-center justify-center animate-pulse">
                    <div className={`absolute rounded-full bg-gradient-to-r ${data.color} w-52 h-52 blur-2xl opacity-40`} />
                    <div className={`relative rounded-full bg-gradient-to-r ${data.color} w-40 h-40 flex items-center justify-center shadow-2xl overflow-hidden ring-4 ring-white/10`}>
                      <img
                        src={data.image}
                        alt={data.deck}
                        className="h-36 w-36 object-contain drop-shadow-[0_0_18px_rgba(255,255,255,0.45)]"
                      />
                    </div>
                  </div>

                  <p className="mt-8 text-sm tracking-[0.35em] text-yellow-300 font-semibold">
                    SEU ESTILO É
                  </p>

                  <h2 className="text-5xl font-black mt-3 drop-shadow-[0_0_18px_rgba(250,204,21,0.20)]">
                    {data.style}
                  </h2>

                  <p className="mt-5 max-w-3xl text-2xl font-black text-yellow-300 leading-snug">
                    {data.impact}
                  </p>

                  <div className={`mt-8 rounded-[2rem] border border-white/10 bg-gradient-to-br ${data.color} p-[2px] max-w-3xl w-full shadow-2xl`}>
                    <div className="rounded-[1.85rem] bg-zinc-950/95 p-8">
                      <p className="text-zinc-400 text-sm">Você recebeu</p>
                      <h3 className="text-4xl font-black text-white mt-2">
                        {data.deck}
                      </h3>
                      <p className="mt-3 text-sm text-yellow-300 font-semibold">
                        Deck definido pelo seu perfil
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 max-w-3xl space-y-3 text-zinc-300 text-lg leading-relaxed">
                    {data.text.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <p className="text-zinc-400 mt-8">
                    Mostre esta tela para um atendente e retire o seu deck.
                  </p>

                  <button
                    onClick={restart}
                    className="mt-8 rounded-full border border-white/20 px-8 py-3 text-sm font-bold text-zinc-300 active:scale-95 transition hover:border-yellow-300/40 hover:text-yellow-300 hover:shadow-lg hover:shadow-yellow-300/10"
                  >
                    Reiniciar experiência
                  </button>
                </>
              );
            })()}
          </div>
        )}
      </section>
    </main>
  );
}