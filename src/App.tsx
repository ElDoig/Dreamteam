import { useEffect, useRef, useState } from 'react'
import { ArrowDown, VolumeX } from 'lucide-react'
import { players } from './data/players'
import { useReducedMotion } from './hooks/useReducedMotion'
import { usePlayerVideo } from './hooks/usePlayerVideo'
import { PlayerStage } from './components/PlayerStage'
import { TacticalPitch } from './components/TacticalPitch'
import { PlayerIdentity } from './components/PlayerIdentity'
import { PlayerStats } from './components/PlayerStats'
import { Squad } from './sections/Squad'
import { Closing } from './sections/Closing'

function App() {
  const reducedMotion = useReducedMotion()
  const [introDone, setIntroDone] = useState(reducedMotion)
  const [activeId, setActiveId] = useState(players[0].id)
  const [selectionNonce, setSelectionNonce] = useState(0)
  const heroRef = useRef<HTMLElement>(null)
  const player = players.find(item => item.id === activeId) ?? players[0]
  const { videoRef, phase } = usePlayerVideo(player, introDone, reducedMotion, selectionNonce)

  useEffect(() => {
    if (reducedMotion) { setIntroDone(true); return }
    const timer = window.setTimeout(() => setIntroDone(true), 2050)
    return () => window.clearTimeout(timer)
  }, [reducedMotion])

  const selectPlayer = (id: string, returnToHero = false) => {
    setActiveId(id)
    setSelectionNonce(value => value + 1)
    if (returnToHero) heroRef.current?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' })
  }

  return (
    <div className="site-shell" style={{ '--player-accent': player.theme.accent, '--player-glow': player.theme.glow } as React.CSSProperties}>
      <div className={`opening ${introDone ? 'is-finished' : ''}`} aria-hidden="true">
        <div className="opening-mark">DT<span>®</span></div>
        <div className="opening-title">DREAM TEAM</div>
        <div className="opening-line" />
        <div className="opening-message">3 JUGADORES.<br />1 SUEÑO.</div>
      </div>

      <section className="hero" id="inicio" ref={heroRef} aria-label="Alineación interactiva Dream Team">
        <PlayerStage player={player} phase={phase} videoRef={videoRef} reducedMotion={reducedMotion} selectionNonce={selectionNonce} />

        <header className="site-header">
          <a className="brand" href="#inicio" aria-label="Dream Team, volver al inicio">
            <span className="brand-crest"><span>DT</span><i /></span>
            <span className="brand-copy"><strong>DREAM TEAM</strong><small>EST. 2026 · BOGOTÁ</small></span>
          </a>
          <div className="header-right"><span className="header-season">TEMPORADA / 26</span><span className="mute-label"><VolumeX size={13} strokeWidth={1.5} /> SIN SONIDO</span></div>
        </header>

        <div className="hero-meta hero-meta-left"><span>PLANTILLA</span><strong>03 / 11</strong></div>
        <div className="hero-meta hero-meta-right"><span>QUÍMICA</span><strong>INEXPLICABLE</strong></div>

        <div className="hero-topline"><span className="live-dot" /> ALINEACIÓN OFICIAL <span className="topline-rule" /> <span>001 / 003</span></div>

        <div className="pitch-wrap">
          <div className="pitch-overline">SELECCIONA UNA POSICIÓN <span>↓</span></div>
          <TacticalPitch players={players} activeId={activeId} onSelect={id => selectPlayer(id)} reducedMotion={reducedMotion} />
          <div className="pitch-under"><span>↑ ATAQUE</span><span>DEFENSA ↓</span></div>
        </div>

        <PlayerIdentity player={player} phase={phase} reducedMotion={reducedMotion} />
        <div className="hero-quote" key={player.id}><span>“{player.quote}”</span><i /></div>
        <PlayerStats player={player} phase={phase} reducedMotion={reducedMotion} />

        <div className="hero-bottom"><span>NO TENEMOS 11. PERO TENEMOS FE.</span><a href="#plantilla" aria-label="Ver la plantilla"><span>EXPLORAR PLANTILLA</span><ArrowDown size={15} /></a></div>
      </section>

      <Squad players={players} onSelect={id => selectPlayer(id, true)} reducedMotion={reducedMotion} />
      <Closing reducedMotion={reducedMotion} />
    </div>
  )
}

export default App
