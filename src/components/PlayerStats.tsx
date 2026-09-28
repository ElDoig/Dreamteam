import { motion } from 'framer-motion'
import type { Player } from '../data/players'
import type { VideoPhase } from '../hooks/usePlayerVideo'

type Props = { player: Player; phase: VideoPhase; reducedMotion: boolean }

export function PlayerStats({ player, phase, reducedMotion }: Props) {
  const shown = phase === 'playing' || phase === 'settled'

  return (
    <motion.div className="stats" aria-label={`Estadísticas de ${player.name}`} animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 14 }} transition={{ duration: reducedMotion ? 0 : .45, delay: reducedMotion ? 0 : .1 }}>
      <div className="stats-heading"><span>PERFIL DE JUEGO</span><span>#{String(player.number).padStart(2, '0')} / 99</span></div>
      <div className="stats-grid" key={player.id}>
        {player.stats.map((stat, index) => (
          <div className="stat" key={stat.label}>
            <div className="stat-top"><span>{stat.label}</span><strong>{stat.value}</strong></div>
            <div className="stat-track"><motion.div className="stat-fill" initial={{ scaleX: 0 }} animate={{ scaleX: shown ? stat.value / 100 : 0 }} transition={{ duration: reducedMotion ? 0 : .8, delay: reducedMotion ? 0 : .2 + index * .09, ease: [0.22, 1, 0.36, 1] }} /></div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
