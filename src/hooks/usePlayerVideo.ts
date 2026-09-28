import { useLayoutEffect, useRef, useState } from 'react'
import type { Player } from '../data/players'

export type VideoPhase = 'idle' | 'loading' | 'revealing' | 'playing' | 'settled'

export function usePlayerVideo(player: Player, enabled: boolean, reducedMotion: boolean, selectionNonce: number) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [phase, setPhase] = useState<VideoPhase>('idle')

  useLayoutEffect(() => {
    const video = videoRef.current
    if (!enabled || !video) {
      setPhase('idle')
      return
    }

    let cancelled = false
    let started = false
    let revealTimer: number | undefined
    let startTimer: number | undefined
    setPhase('loading')
    video.pause()
    video.currentTime = 0
    video.muted = true

    const handleEnded = () => {
      if (!cancelled) setPhase('settled')
    }
    const handlePlaying = () => {
      if (cancelled) return
      setPhase('revealing')
      revealTimer = window.setTimeout(() => {
        if (!cancelled) setPhase('playing')
      }, 650)
    }
    const handleError = () => {
      if (!cancelled) setPhase('settled')
    }
    const handleReady = () => {
      if (cancelled || started) return
      started = true
      if (reducedMotion) {
        video.addEventListener('seeked', () => { if (!cancelled) setPhase('settled') }, { once: true })
        video.currentTime = Math.max(0, video.duration - 0.06)
        return
      }
      startTimer = window.setTimeout(() => {
        if (!cancelled) video.play().catch(handleError)
      }, 320)
    }

    video.addEventListener('canplay', handleReady)
    video.addEventListener('playing', handlePlaying)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('error', handleError)
    video.load()
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) handleReady()

    return () => {
      cancelled = true
      window.clearTimeout(startTimer)
      window.clearTimeout(revealTimer)
      video.removeEventListener('canplay', handleReady)
      video.removeEventListener('playing', handlePlaying)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('error', handleError)
      video.pause()
      video.currentTime = 0
    }
  }, [player.id, enabled, reducedMotion, selectionNonce])

  return { videoRef, phase }
}
