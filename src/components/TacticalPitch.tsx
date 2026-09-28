import { motion } from 'framer-motion'
import type { Player } from '../data/players'

type Props = {
  players: Player[]
  activeId: string
  onSelect: (id: string) => void
  reducedMotion: boolean
}

export function TacticalPitch({ players, activeId, onSelect, reducedMotion }: Props) {
  const active = players.find(player => player.id === activeId) ?? players[0]

  return (
    <div className="pitch-panel">
      <div className="pitch-caption"><span>MAPA TÁCTICO</span><span>DT / 001</span></div>
      <div className="pitch-surface" role="group" aria-label="Seleccionar jugador en la cancha">
        <svg className="pitch-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="pitch-line" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#9ddacb" stopOpacity=".45" /><stop offset="1" stopColor="#9ddacb" stopOpacity=".15" /></linearGradient>
            <linearGradient id="selection-line" x1="0" x2="0" y1="1" y2="0"><stop stopColor="#9bddeb" stopOpacity="0" /><stop offset="1" stopColor="#b7eaff" stopOpacity=".75" /></linearGradient>
          </defs>
          <rect x="8" y="4" width="84" height="92" fill="none" stroke="url(#pitch-line)" strokeWidth=".5" />
          <path d="M8 50H92 M37 4V17H63V4 M37 96V83H63V96 M45 4V9H55V4 M45 96V91H55V96" fill="none" stroke="url(#pitch-line)" strokeWidth=".5" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="url(#pitch-line)" strokeWidth=".5" />
          <circle cx="50" cy="50" r=".8" fill="#9ddacb" fillOpacity=".5" />
          <path d="M39 17 A11 11 0 0 0 61 17 M39 83 A11 11 0 0 1 61 83" fill="none" stroke="url(#pitch-line)" strokeWidth=".5" />
          <motion.path
            d={`M50 97 L${active.pitchX} ${active.pitchY}`}
            stroke="url(#selection-line)"
            strokeWidth=".55"
            fill="none"
            strokeDasharray="2 2"
            animate={{ d: `M50 97 L${active.pitchX} ${active.pitchY}` }}
            transition={{ duration: reducedMotion ? 0 : 0.5, ease: 'easeInOut' }}
          />
        </svg>
        <div className="pitch-center-glow" style={{ left: `${active.pitchX}%`, top: `${active.pitchY}%` }} />
        {players.map(player => {
          const selected = player.id === activeId
          return (
            <button
              className={`pitch-marker ${selected ? 'is-active' : ''}`}
              style={{ left: `${player.pitchX}%`, top: `${player.pitchY}%` }}
              key={player.id}
              type="button"
              aria-label={`Seleccionar a ${player.name}, ${player.position}`}
              aria-pressed={selected}
              onClick={() => onSelect(player.id)}
            >
              <span className="marker-ring" />
              <span className="marker-core">{player.position}</span>
              <span className="marker-number">{String(player.number).padStart(2, '0')}</span>
            </button>
          )
        })}
      </div>
      <div className="pitch-footer"><span>FORMACIÓN</span><strong>1 — 1 — 1</strong></div>
    </div>
  )
}
