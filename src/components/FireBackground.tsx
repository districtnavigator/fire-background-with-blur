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
      { r: 10, g: 10, b: 10 },
      { r: 20, g: 5, b: 5 },
      { r: 40, g: 10, b: 5 },
      { r: 70, g: 15, b: 5 },
      { r: 100, g: 25, b: 5 },
      { r: 140, g: 40, b: 5 },
      { r: 180, g: 60, b: 10 },
      { r: 220, g: 90, b: 15 },
      { r: 255, g: 120, b: 20 },
      { r: 255, g: 150, b: 30 },
      { r: 255, g: 180, b: 50 },
      { r: 255, g: 210, b: 80 },
      { r: 255, g: 230, b: 120 },
      { r: 255, g: 245, b: 170 },
      { r: 255, g: 255, b: 220 },
      { r: 255, g: 255, b: 255 }
    ]

    const spreadFire = (src: number) => {
      const pixel = firePixels[src]
      if (pixel === 0) {
        firePixels[src - width] = 0
      } else {
        const randIdx = Math.round(Math.random() * 3.0) & 3
        const dst = src - randIdx + 1
        const decay = Math.floor(Math.random() * 2)
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
    const animate = () => {
      updateFire()
      renderFire()
      animationId = requestAnimationFrame(animate)
    }

    animate()

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
