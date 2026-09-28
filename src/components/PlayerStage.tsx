import { motion } from 'framer-motion'
import type { Player } from '../data/players'
import type { VideoPhase } from '../hooks/usePlayerVideo'
import type { RefObject } from 'react'

type Props = {
  player: Player
  phase: VideoPhase
  videoRef: RefObject<HTMLVideoElement | null>
  reducedMotion: boolean
  selectionNonce: number
}

export function PlayerStage({ player, phase, videoRef, reducedMotion, selectionNonce }: Props) {
  const visible = phase === 'revealing' || phase === 'playing' || phase === 'settled'

  return (
    <div className="player-stage" aria-hidden="true">
      <div className="stage-atmosphere" />
      <div className="stage-number">{String(player.number).padStart(2, '0')}</div>
      <motion.div
        className="video-frame"
        animate={{ opacity: visible ? 1 : 0, filter: visible ? 'blur(0px)' : 'blur(14px)', scale: visible ? 1 : 1.015 }}
        transition={{ duration: reducedMotion ? 0 : 0.62, ease: [0.2, 0.65, 0.25, 1] }}
      >
        <video
          key={`${player.id}-${selectionNonce}`}
          ref={videoRef}
          className="player-video"
          src={player.introVideo}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
        />
        {player.finalImage && phase === 'settled' && <img className="final-image" src={player.finalImage} alt="" />}
      </motion.div>
      <div className="stage-vignette" />
      <div className="stage-scanlines" />
      <div className="stage-grain" />
    </div>
  )
}
