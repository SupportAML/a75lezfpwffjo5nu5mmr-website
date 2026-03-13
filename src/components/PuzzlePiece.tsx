'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface PieceData {
  id: number
  correctPosition: { x: number; y: number }
  currentPosition: { x: number; y: number }
  isCorrect: boolean
  imageSection: string
}

interface PuzzlePieceProps {
  piece: PieceData
  imageUrl: string
  size: number
  difficulty: number
  isDragging: boolean
  onDragStart: () => void
  onDragEnd: () => void
  onDrop: (position: { x: number; y: number }) => void
  disabled: boolean
}

export default function PuzzlePiece({ 
  piece, 
  imageUrl, 
  size, 
  difficulty, 
  isDragging, 
  onDragStart, 
  onDragEnd, 
  onDrop, 
  disabled 
}: PuzzlePieceProps) {
  const [isHovered, setIsHovered] = useState(false)

  const pieceStyle = {
    width: size,
    height: size,
    position: 'absolute' as const,
    left: piece.currentPosition.x * (size + 4),
    top: piece.currentPosition.y * (size + 4),
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: `${difficulty * size}px ${difficulty * size}px`,
    backgroundPosition: `${-piece.correctPosition.x * size}px ${-piece.correctPosition.y * size}px`,
    backgroundRepeat: 'no-repeat',
  }

  return (
    <motion.div
      drag={!disabled}
      dragMomentum={false}
      dragElastic={0}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileDrag={{ scale: 1.1, rotate: 5, zIndex: 50 }}
      animate={{
        scale: piece.isCorrect ? 1.05 : 1,
        rotate: piece.isCorrect ? [0, 2, -2, 0] : 0,
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 20,
        rotate: { duration: 0.5 }
      }}
      className={`
        puzzle-piece cursor-pointer select-none
        ${isDragging ? 'dragging' : ''}
        ${piece.isCorrect ? 'correct border-forest-400 shadow-lg' : ''}
        ${disabled ? 'cursor-not-allowed opacity-75' : ''}
      `}
      style={pieceStyle}
      onDragStart={(event, info) => {
        if (disabled) return
        onDragStart()
      }}
      onDragEnd={(event, info) => {
        onDragEnd()
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Piece number overlay for debugging (can be removed) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
          {piece.id}
        </div>
      )}
      
      {/* Correct position indicator */}
      {piece.isCorrect && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-forest-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg"
        >
          ✓
        </motion.div>
      )}
      
      {/* Hover effect */}
      {isHovered && !disabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-earth-200/30 to-forest-200/30 rounded-lg"
        />
      )}
    </motion.div>
  )
}