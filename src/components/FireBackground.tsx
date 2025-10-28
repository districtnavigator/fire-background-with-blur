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
      { r: 3, g: 3, b: 3 },
      { r: 12, g: 0, b: 0 },
      { r: 22, g: 2, b: 0 },
      { r: 35, g: 4, b: 0 },
      { r: 50, g: 5, b: 0 },
      { r: 65, g: 8, b: 0 },
      { r: 80, g: 12, b: 0 },
      { r: 95, g: 16, b: 0 },
      { r: 110, g: 20, b: 0 },
      { r: 125, g: 24, b: 0 },
      { r: 138, g: 28, b: 0 },
      { r: 150, g: 32, b: 0 },
      { r: 160, g: 36, b: 2 },
      { r: 170, g: 40, b: 3 },
      { r: 180, g: 44, b: 4 },
      { r: 190, g: 48, b: 5 }
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
        
        const darkenFactor = 0.5
        imageData.data[i * 4] = Math.floor(color.r * darkenFactor)
        imageData.data[i * 4 + 1] = Math.floor(color.g * darkenFactor)
        imageData.data[i * 4 + 2] = Math.floor(color.b * darkenFactor)
        imageData.data[i * 4 + 3] = 255
      }

      ctx.putImageData(imageData, 0, 0)
      ctx.filter = 'blur(2px)'
      ctx.drawImage(canvas, 0, 0)
      ctx.filter = 'none'
    }

    let animationId: number
    let lastTime = 0
    const frameDelay = 1000 / 12
    
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
