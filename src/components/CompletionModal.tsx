'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Clock, Share2, RotateCcw, Star } from 'lucide-react'

interface CompletionModalProps {
  isOpen: boolean
  timeElapsed: number
  difficulty: number
  onShare: () => void
  onPlayAgain: () => void
}

export default function CompletionModal({
  isOpen,
  timeElapsed,
  difficulty,
  onShare,
  onPlayAgain
}: CompletionModalProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyLabel = (diff: number) => {
    switch (diff) {
      case 3: return 'Easy'
      case 4: return 'Medium'
      case 5: return 'Hard'
      case 6: return 'Expert'
      default: return 'Custom'
    }
  }

  const getPerformanceRating = () => {
    const totalPieces = difficulty * difficulty
    const timePerPiece = timeElapsed / totalPieces
    
    if (timePerPiece < 10) return { rating: 'Incredible!', stars: 5, color: 'text-yellow-500' }
    if (timePerPiece < 20) return { rating: 'Excellent!', stars: 4, color: 'text-earth-500' }
    if (timePerPiece < 30) return { rating: 'Great!', stars: 3, color: 'text-forest-500' }
    if (timePerPiece < 45) return { rating: 'Good!', stars: 2, color: 'text-bark-500' }
    return { rating: 'Nice try!', stars: 1, color: 'text-bark-400' }
  }

  const performance = getPerformanceRating()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onPlayAgain}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotateY: -90 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-panel p-8 max-w-md w-full text-center">
              {/* Celebration Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-earth-400 to-earth-600 rounded-full flex items-center justify-center"
              >
                <Trophy className="w-10 h-10 text-white" />
              </motion.div>
              
              {/* Title */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-bark-800 mb-2"
              >
                Puzzle Complete!
              </motion.h2>
              
              {/* Performance Rating */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                <p className={`text-xl font-semibold mb-2 ${performance.color}`}>
                  {performance.rating}
                </p>
                
                <div className="flex justify-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div
                      key={star}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + star * 0.1 }}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= performance.stars
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-bark-300'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Stats */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 gap-4 mb-6 p-4 bg-bark-50 rounded-xl"
              >
                <div className="text-center">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-bark-600" />
                  <p className="text-sm text-bark-600">Time</p>
                  <p className="font-bold text-bark-800">{formatTime(timeElapsed)}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-5 h-5 mx-auto mb-1 bg-earth-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{difficulty * difficulty}</span>
                  </div>
                  <p className="text-sm text-bark-600">Difficulty</p>
                  <p className="font-bold text-bark-800">{getDifficultyLabel(difficulty)}</p>
                </div>
              </motion.div>
              
              {/* Actions */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex gap-3"
              >
                <button
                  onClick={onShare}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-medium transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                
                <button
                  onClick={onPlayAgain}
                  className="flex-1 flex items-center justify-center gap-2 btn-primary"
                >
                  <RotateCcw className="w-4 h-4" />
                  Play Again
                </button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}