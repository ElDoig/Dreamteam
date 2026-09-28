export type PlayerPosition = 'POR' | 'MCO' | 'DEL'

export type Player = {
  id: string
  name: string
  shortName: string
  position: PlayerPosition
  role: string
  number: number
  nickname: string
  quote: string
  pitchX: number
  pitchY: number
  introVideo: string
  finalImage?: string
  stats: { label: string; value: number }[]
  theme: { accent: string; glow: string }
}

export const players: Player[] = [
  {
    id: 'carlos',
    name: 'Carlos Doig',
    shortName: 'Carlos',
    position: 'POR',
    role: 'Arquero',
    number: 1,
    nickname: 'El último muro',
    quote: 'Hasta aquí llegaste.',
    pitchX: 50,
    pitchY: 81,
    introVideo: '/assets/players/carlos-intro.mp4',
    stats: [
      { label: 'Reflejos', value: 94 },
      { label: 'Manos', value: 90 },
      { label: 'Salidas', value: 72 },
      { label: 'Juego con pies', value: 79 },
      { label: 'Drama', value: 100 },
    ],
    theme: { accent: '#8cc6f3', glow: '140, 198, 243' },
  },
  {
    id: 'sebastian',
    name: 'Sebastián Amaya',
    shortName: 'Sebastián',
    position: 'MCO',
    role: 'Mediocampista ofensivo',
    number: 10,
    nickname: 'El cerebro',
    quote: 'Ve el pase antes que todos.',
    pitchX: 50,
    pitchY: 49,
    introVideo: '/assets/players/sebastian-intro.mp4',
    stats: [
      { label: 'Pase', value: 94 },
      { label: 'Visión', value: 96 },
      { label: 'Regate', value: 89 },
      { label: 'Tiro', value: 84 },
      { label: 'Creatividad', value: 99 },
    ],
    theme: { accent: '#79d8e8', glow: '121, 216, 232' },
  },
  {
    id: 'lenner',
    name: 'Lenner Amaya',
    shortName: 'Lenner',
    position: 'DEL',
    role: 'Delantero',
    number: 9,
    nickname: 'El hombre gol',
    quote: 'Una oportunidad. Un problema.',
    pitchX: 50,
    pitchY: 18,
    introVideo: '/assets/players/lenner-intro.mp4',
    stats: [
      { label: 'Definición', value: 96 },
      { label: 'Posicionamiento', value: 94 },
      { label: 'Tiro', value: 91 },
      { label: 'Físico', value: 86 },
      { label: 'Celebración', value: 100 },
    ],
    theme: { accent: '#94a9ff', glow: '148, 169, 255' },
  },
]
