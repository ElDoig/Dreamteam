import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Player } from '../data/players'

type Props = { players: Player[]; onSelect: (id: string) => void; reducedMotion: boolean }

export function Squad({ players, onSelect, reducedMotion }: Props) {
  return (
    <section className="squad-section" id="plantilla" aria-labelledby="squad-title">
      <div className="section-topline"><span>02 / LA PLANTILLA</span><span>CUPO ACTUAL: 03</span></div>
      <div className="squad-intro">
        <p className="eyebrow">NUESTROS ELEGIDOS</p>
        <h2 id="squad-title">TRES NOMBRES.<br /><em>UNA IDEA.</em></h2>
        <p>El plan original contemplaba once. La historia decidió empezar por tres.</p>
      </div>
      <div className="squad-list">
        {players.map((player, index) => (
          <motion.button
            className="squad-row"
            key={player.id}
            type="button"
            onClick={() => onSelect(player.id)}
            initial={reducedMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: .3 }}
            transition={{ duration: .6, delay: index * .09 }}
            aria-label={`Presentar a ${player.name}`}
          >
            <span className="squad-number">{String(player.number).padStart(2, '0')}</span>
            <span className="squad-name">{player.name}</span>
            <span className="squad-role">{player.position} / {player.nickname}</span>
            <ArrowUpRight size={22} strokeWidth={1.25} aria-hidden="true" />
          </motion.button>
        ))}
      </div>
      <div className="squad-postscript"><span>FORMACIÓN 1 — 1 — 1</span><span>Sistema táctico en fase experimental.</span></div>
    </section>
  )
}
