import { motion } from 'framer-motion'
import type { Player } from '../data/players'
import type { VideoPhase } from '../hooks/usePlayerVideo'

type Props = { player: Player; phase: VideoPhase; reducedMotion: boolean }

export function PlayerIdentity({ player, phase, reducedMotion }: Props) {
  const shown = phase === 'revealing' || phase === 'playing' || phase === 'settled'
  const [first, ...last] = player.name.toLocaleUpperCase('es').split(' ')
  return (
    <div className="identity" aria-live="polite">
      <motion.div className="identity-kicker" animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 12 }} transition={{ delay: reducedMotion ? 0 : 0.28 }}>
        <span className="identity-rule" />
        <span>JUGADOR / {String(player.number).padStart(2, '0')}</span>
      </motion.div>
      <div className="identity-main" key={player.id}>
        <motion.h1
          className="identity-name"
          initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
          animate={{ opacity: shown ? 1 : 0, clipPath: shown ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
          transition={{ duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>{first}</span><span>{last.join(' ')}</span>
        </motion.h1>
      </div>
      <motion.div className="identity-details" animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 12 }} transition={{ delay: reducedMotion ? 0 : 0.68, duration: .45 }}>
        <div className="identity-position"><strong>{player.position}</strong><span>{player.role}</span></div>
        <div className="identity-nickname">{player.nickname}</div>
      </motion.div>
    </div>
  )
}
