import { motion } from 'framer-motion'

export function Closing({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section className="closing-section" aria-label="Cierre Dream Team">
      <div className="closing-orbit" aria-hidden="true" />
      <motion.div className="closing-content" initial={reducedMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .8 }}>
        <p className="eyebrow">TEMPORADA 2026</p>
        <h2>DREAM<br /><span>TEAM</span></h2>
        <p className="closing-count">3 JUGADORES. <span>8 FICHAJES PENDIENTES.</span></p>
        <p className="closing-last">Esto recién empieza.</p>
      </motion.div>
    </section>
  )
}
