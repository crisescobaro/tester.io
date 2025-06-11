"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ImageZoomModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
}

export function ImageZoomModal({ isOpen, onClose, imageSrc, imageAlt }: ImageZoomModalProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLImageElement>(null)

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEsc)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  // Reset zoom and position when modal opens
  useEffect(() => {
    if (isOpen) {
      setScale(1)
      setPosition({ x: 0, y: 0 })
    }
  }, [isOpen])

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (scale === 1) {
      setScale(2)
    } else {
      setScale(1)
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 4))
  }

  const handleZoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.5, 1)
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 })
      }
      return newScale
    })
  }

  const handleReset = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-zinc-900/80 backdrop-blur-2xl border border-zinc-700/50 rounded-3xl p-4 max-w-6xl max-h-[95vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="text-xl font-semibold text-white/90">{imageAlt}</h3>
              <button
                onClick={onClose}
                className="bg-zinc-800/80 hover:bg-zinc-700/80 text-white/80 hover:text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Image Container */}
            <div
              className="relative overflow-hidden rounded-2xl bg-zinc-800/30 flex items-center justify-center"
              style={{ height: "calc(95vh - 180px)" }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <motion.img
                ref={imageRef}
                src={imageSrc}
                alt={imageAlt}
                className={`object-contain max-h-full max-w-full select-none ${
                  scale > 1 ? "cursor-grab" : "cursor-zoom-in"
                } ${isDragging ? "cursor-grabbing" : ""}`}
                style={{
                  transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onDoubleClick={handleDoubleClick}
                onMouseDown={handleMouseDown}
                draggable={false}
              />

              {/* Zoom indicator */}
              {scale > 1 && (
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  {Math.round(scale * 100)}%
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-3 mt-4 p-2">
              <button
                onClick={handleZoomOut}
                disabled={scale <= 1}
                className="bg-zinc-800/80 hover:bg-zinc-700/80 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 backdrop-blur-sm"
              >
                <ZoomOut size={16} />
                Alejar
              </button>
              <button
                onClick={handleReset}
                className="bg-zinc-800/80 hover:bg-zinc-700/80 text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 backdrop-blur-sm"
              >
                <RotateCcw size={16} />
                Reset
              </button>
              <button
                onClick={handleZoomIn}
                disabled={scale >= 4}
                className="bg-zinc-800/80 hover:bg-zinc-700/80 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 backdrop-blur-sm"
              >
                <ZoomIn size={16} />
                Acercar
              </button>
            </div>

            {/* Instructions */}
            <div className="text-center mt-2">
              <p className="text-zinc-400 text-sm">Doble clic para zoom • Arrastra para mover cuando esté ampliado</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
