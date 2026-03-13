'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PuzzlePiece from './PuzzlePiece'

interface PuzzleBoardProps {
  imageUrl: string
  difficulty: number
  isActive: boolean
  onComplete: () => void
}

interface PieceData {
  id: number
  correctPosition: { x: number; y: number }
  currentPosition: { x: number; y: number }
  isCorrect: boolean
  imageSection: string
}

export default function PuzzleBoard({ imageUrl, difficulty, isActive, onComplete }: PuzzleBoardProps) {
  const [pieces, setPieces] = useState<PieceData[]>([])
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const pieceSize = 80

  const generatePieces = useCallback(() => {
    const newPieces: PieceData[] = []
    const totalPieces = difficulty * difficulty
    
    for (let i = 0; i < totalPieces; i++) {
      const row = Math.floor(i / difficulty)
      const col = i % difficulty
      
      // Shuffle pieces randomly
      const shuffledPositions = Array.from({ length: totalPieces }, (_, idx) => {
        const shuffledRow = Math.floor(idx / difficulty)
        const shuffledCol = idx % difficulty
        return { x: shuffledCol, y: shuffledRow }
      })
      
      // Fisher-Yates shuffle
      for (let j = shuffledPositions.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1))
        ;[shuffledPositions[j], shuffledPositions[k]] = [shuffledPositions[k], shuffledPositions[j]]
      }
      
      newPieces.push({
        id: i,
        correctPosition: { x: col, y: row },
        currentPosition: shuffledPositions[i],
        isCorrect: false,
        imageSection: `${(col * 100) / (difficulty - 1)}% ${(row * 100) / (difficulty - 1)}%`
      })
    }
    
    setPieces(newPieces)
  }, [difficulty])

  useEffect(() => {
    generatePieces()
  }, [generatePieces, imageUrl])

  const handleDragStart = (pieceId: number) => {
    if (!isActive) return
    setDraggedPiece(pieceId)
  }

  const handleDragEnd = () => {
    setDraggedPiece(null)
  }

  const handleDrop = (targetPosition: { x: number; y: number }) => {
    if (draggedPiece === null || !isActive) return

    setPieces(prev => {
      const newPieces = [...prev]
      const draggedPieceIndex = newPieces.findIndex(p => p.id === draggedPiece)
      const targetPieceIndex = newPieces.findIndex(p => 
        p.currentPosition.x === targetPosition.x && p.currentPosition.y === targetPosition.y
      )

      if (draggedPieceIndex === -1) return prev

      if (targetPieceIndex !== -1 && targetPieceIndex !== draggedPieceIndex) {
        // Swap positions
        const draggedCurrentPos = newPieces[draggedPieceIndex].currentPosition
        newPieces[draggedPieceIndex].currentPosition = newPieces[targetPieceIndex].currentPosition
        newPieces[targetPieceIndex].currentPosition = draggedCurrentPos
      } else {
        // Move to empty position
        newPieces[draggedPieceIndex].currentPosition = targetPosition
      }

      // Check if pieces are in correct positions
      newPieces.forEach(piece => {
        piece.isCorrect = 
          piece.currentPosition.x === piece.correctPosition.x &&
          piece.currentPosition.y === piece.correctPosition.y
      })

      // Check if puzzle is complete
      const isComplete = newPieces.every(piece => piece.isCorrect)
      if (isComplete) {
        setTimeout(onComplete, 500)
      }

      return newPieces
    })
  }

  const renderDropZones = () => {
    const zones = []
    for (let row = 0; row < difficulty; row++) {
      for (let col = 0; col < difficulty; col++) {
        const hasPiece = pieces.some(p => p.currentPosition.x === col && p.currentPosition.y === row)
        
        zones.push(
          <div
            key={`zone-${row}-${col}`}
            className={`drop-zone ${!hasPiece ? 'border-dashed' : 'border-transparent'}`}
            style={{
              width: pieceSize,
              height: pieceSize,
              position: 'absolute',
              left: col * (pieceSize + 4),
              top: row * (pieceSize + 4),
            }}
            onDragOver={(e) => {
              e.preventDefault()
              e.currentTarget.classList.add('drag-over')
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove('drag-over')
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.currentTarget.classList.remove('drag-over')
              if (!hasPiece) {
                handleDrop({ x: col, y: row })
              }
            }}
          />
        )
      }
    }
    return zones
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex justify-center">
        <div 
          ref={boardRef}
          className="relative bg-bark-100 rounded-xl p-4 shadow-inner"
          style={{
            width: difficulty * (pieceSize + 4) + 24,
            height: difficulty * (pieceSize + 4) + 24,
          }}
        >
          {/* Drop zones */}
          {renderDropZones()}
          
          {/* Puzzle pieces */}
          <AnimatePresence>
            {pieces.map(piece => (
              <PuzzlePiece
                key={piece.id}
                piece={piece}
                imageUrl={imageUrl}
                size={pieceSize}
                difficulty={difficulty}
                isDragging={draggedPiece === piece.id}
                onDragStart={() => handleDragStart(piece.id)}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}
                disabled={!isActive}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}