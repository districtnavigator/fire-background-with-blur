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
      { r: 10, g: 0, b: 0 },
      { r: 18, g: 2, b: 0 },
      { r: 28, g: 4, b: 0 },
      { r: 40, g: 6, b: 0 },
      { r: 52, g: 10, b: 0 },
      { r: 65, g: 14, b: 0 },
      { r: 78, g: 18, b: 0 },
      { r: 90, g: 22, b: 2 },
      { r: 102, g: 28, b: 3 },
      { r: 115, g: 34, b: 4 },
      { r: 128, g: 40, b: 5 },
      { r: 140, g: 46, b: 6 },
      { r: 152, g: 52, b: 8 },
      { r: 165, g: 58, b: 10 },
      { r: 178, g: 64, b: 12 }
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
        
        const darkenFactor = 0.75
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
