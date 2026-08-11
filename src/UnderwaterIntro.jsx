import React, { useState, useEffect } from 'react'

export function UnderwaterIntro({ onComplete }) {
  const [shouldRender, setShouldRender] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    // 1. Verificar preferências de redução de movimento (Acessibilidade)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // 2. Verificar se já foi executado na sessão atual
    const hasSeenIntro = sessionStorage.getItem('hasSeenUnderwaterIntro')

    if (prefersReducedMotion || hasSeenIntro) {
      setShouldRender(false)
      if (onComplete) onComplete()
      return
    }

    // 3. Marcar como visto no sessionStorage
    sessionStorage.setItem('hasSeenUnderwaterIntro', 'true')

    // 4. Timer para iniciar o fade out suave assim que a água atinge o topo (2.2s)
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true)
    }, 2200)

    // 5. Timer para remover completamente o componente da árvore de renderização (2.7s)
    const removeTimer = setTimeout(() => {
      setShouldRender(false)
      if (onComplete) onComplete()
    }, 2700)

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(removeTimer)
    }
  }, [onComplete])

  if (!shouldRender) return null

  return (
    <div className={`underwater-intro-overlay ${isFadingOut ? 'fade-out' : ''}`}>
      {/* SVG Filter para criar a refração fluida/distorção aquática */}
      <svg className="intro-svg-filters" aria-hidden="true">
        <defs>
          <filter id="water-wave-distortion">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.03"
              numOctaves="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="4s"
                values="0.015 0.03; 0.025 0.05; 0.015 0.03"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Camada da massa d'água subindo */}
      <div className="water-rise-container">
        <div className="water-mass">
          {/* Superfície e refração de luz da borda */}
          <div className="water-surface-line" />
          <div className="water-caustics-glow" />
        </div>
      </div>
    </div>
  )
}