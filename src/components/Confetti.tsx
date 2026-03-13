'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Confetti() {
  const [pieces, setPieces] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([])

  useEffect(() => {
    const colors = ['#f39c12', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f1c40f']
    const newPieces = []
    
    for (let i = 0; i < 50; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2
      })
    }
    
    setPieces(newPieces)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: piece.color,
            left: `${piece.x}%`,
            top: '-20px'
          }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{
            y: [0, 1200],
            rotate: [0, 720],
            opacity: [1, 0.8, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: piece.delay,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  )
}
