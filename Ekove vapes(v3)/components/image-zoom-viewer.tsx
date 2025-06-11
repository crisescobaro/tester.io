"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"

interface ImageZoomViewerProps {
  src: string
  alt: string
  className?: string
}

export function ImageZoomViewer({ src, alt, className = "" }: ImageZoomViewerProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !imageRef.current) return

    const container = containerRef.current.getBoundingClientRect()
    const image = imageRef.current.getBoundingClientRect()

    // Calcular posición del mouse relativa al contenedor
    const x = e.clientX - container.left
    const y = e.clientY - container.top

    // Calcular porcentajes
    const xPercent = (x / container.width) * 100
    const yPercent = (y / container.height) * 100

    setMousePosition({ x, y })

    // Calcular posición de la imagen ampliada
    const moveX = (xPercent - 50) * -2
    const moveY = (yPercent - 50) * -2

    setImagePosition({ x: moveX, y: moveY })
  }

  const handleMouseEnter = () => {
    setIsZoomed(true)
  }

  const handleMouseLeave = () => {
    setIsZoomed(false)
  }

  const handleDoubleClick = () => {
    setIsZoomed(!isZoomed)
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="relative w-full h-full cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onDoubleClick={handleDoubleClick}
      >
        <img
          ref={imageRef}
          src={src || "/placeholder.svg"}
          alt={alt}
          className="w-full h-full object-contain transition-transform duration-200"
          style={{
            transform: isZoomed ? `scale(2.5) translate(${imagePosition.x}px, ${imagePosition.y}px)` : "scale(1)",
          }}
        />

        {/* Lupa indicadora */}
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute pointer-events-none border-2 border-white/50 bg-white/10 backdrop-blur-sm rounded-full"
            style={{
              width: "120px",
              height: "120px",
              left: mousePosition.x - 60,
              top: mousePosition.y - 60,
              boxShadow: "0 0 0 2px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(255,255,255,0.3)",
            }}
          >
            <div className="absolute inset-2 border border-white/30 rounded-full" />
            <div className="absolute inset-4 border border-white/20 rounded-full" />
          </motion.div>
        )}

        {/* Instrucciones */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm">
          {isZoomed
            ? "Mueve el mouse para explorar • Doble clic para alejar"
            : "Pasa el mouse para zoom • Doble clic para acercar"}
        </div>
      </div>
    </div>
  )
}
