'use client'

import { motion } from 'framer-motion'
import { Zap, Target, Flame, Crown } from 'lucide-react'

interface DifficultySelectorProps {
  difficulty: number
  onDifficultyChange: (difficulty: number) => void
  disabled?: boolean
}

const difficulties = [
  { value: 3, label: 'Easy', icon: Zap, color: 'forest', pieces: 9 },
  { value: 4, label: 'Medium', icon: Target, color: 'earth', pieces: 16 },
  { value: 5, label: 'Hard', icon: Flame, color: 'orange', pieces: 25 },
  { value: 6, label: 'Expert', icon: Crown, color: 'red', pieces: 36 },
]

export default function DifficultySelector({ 
  difficulty, 
  onDifficultyChange, 
  disabled = false 
}: DifficultySelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-bark-700 mr-2">Difficulty:</span>
      
      <div className="flex gap-2">
        {difficulties.map((diff) => {
          const Icon = diff.icon
          const isSelected = difficulty === diff.value
          
          return (
            <motion.button
              key={diff.value}
              whileHover={{ scale: disabled ? 1 : 1.05 }}
              whileTap={{ scale: disabled ? 1 : 0.95 }}
              onClick={() => !disabled && onDifficultyChange(diff.value)}
              disabled={disabled}
              className={`
                relative flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm
                transition-all duration-200 border-2
                ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                ${
                  isSelected
                    ? diff.color === 'forest'
                      ? 'bg-forest-500 border-forest-500 text-white shadow-lg'
                      : diff.color === 'earth'
                      ? 'bg-earth-500 border-earth-500 text-white shadow-lg'
                      : diff.color === 'orange'
                      ? 'bg-orange-500 border-orange-500 text-white shadow-lg'
                      : 'bg-red-500 border-red-500 text-white shadow-lg'
                    : 'bg-white border-bark-200 text-bark-700 hover:bg-bark-50'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{diff.label}</span>
              
              {/* Pieces count tooltip */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-bark-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {diff.pieces} pieces
              </div>
              
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  layoutId="difficulty-indicator"
                  className="absolute inset-0 border-2 border-white/30 rounded-lg"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}