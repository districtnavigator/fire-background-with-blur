import { useEffect, useRef } from 'react'

interface FireBackgroundProps {
  className?: string
}

export function FireBackground({ className = '' }: FireBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const pixelSize = 8
    let width = Math.floor(window.innerWidth / pixelSize)
    let height = Math.floor(window.innerHeight / pixelSize)

    const resizeCanvas = () => {
      width = Math.floor(window.innerWidth / pixelSize)
      height = Math.floor(window.innerHeight / pixelSize)
      canvas.width = width
      canvas.height = height
    }

    resizeCanvas()

    const firePixels = new Uint8Array(width * height)
    
    for (let i = 0; i < width * height; i++) {
      firePixels[i] = 0
    }

    const fireColors = [
      { r: 5, g: 5, b: 5 },
      { r: 15, g: 0, b: 0 },
      { r: 25, g: 5, b: 0 },
      { r: 40, g: 8, b: 0 },
      { r: 60, g: 12, b: 0 },
      { r: 80, g: 18, b: 0 },
      { r: 100, g: 25, b: 0 },
      { r: 120, g: 35, b: 5 },
      { r: 140, g: 45, b: 5 },
      { r: 160, g: 55, b: 10 },
      { r: 180, g: 65, b: 10 },
      { r: 200, g: 75, b: 15 },
      { r: 220, g: 85, b: 15 },
      { r: 230, g: 95, b: 20 },
      { r: 240, g: 105, b: 25 },
      { r: 250, g: 115, b: 30 }
    ]

    const spreadFire = (src: number) => {
      const pixel = firePixels[src]
      if (pixel === 0) {
        firePixels[src - width] = 0
      } else {
        const randIdx = Math.round(Math.random() * 3.0) & 3
        const dst = src - randIdx + 1
        const decay = Math.random() < 0.3 ? 1 : 0
        firePixels[dst - width] = pixel - decay >= 0 ? pixel - decay : 0
      }
    }

    const updateFire = () => {
      for (let x = 0; x < width; x++) {
        const bottomIndex = (height - 1) * width + x
        firePixels[bottomIndex] = Math.random() > 0.5 ? 15 : 14
      }

      for (let y = 1; y < height; y++) {
        for (let x = 0; x < width; x++) {
          spreadFire(y * width + x)
        }
      }
    }

    const renderFire = () => {
      const imageData = ctx.createImageData(width, height)
      
      for (let i = 0; i < firePixels.length; i++) {
        const colorIndex = firePixels[i]
        const color = fireColors[colorIndex]
        
        imageData.data[i * 4] = color.r
        imageData.data[i * 4 + 1] = color.g
        imageData.data[i * 4 + 2] = color.b
        imageData.data[i * 4 + 3] = 255
      }

      ctx.putImageData(imageData, 0, 0)
    }

    let animationId: number
    let lastTime = 0
    const frameDelay = 1000 / 20
    
    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameDelay) {
        updateFire()
        renderFire()
        lastTime = currentTime
      }
      animationId = requestAnimationFrame(animate)
    }

    animate(0)

    const handleResize = () => {
      resizeCanvas()
      for (let i = 0; i < width * height; i++) {
        firePixels[i] = 0
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        imageRendering: 'pixelated',
        width: '100vw',
        height: '100vh'
      }}
    />
  )
}
