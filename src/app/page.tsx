'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Trophy, Share2, Star, Users, Sparkles } from 'lucide-react'
import PuzzleBoard from '@/components/PuzzleBoard'
import Sidebar from '@/components/Sidebar'
import DifficultySelector from '@/components/DifficultySelector'
import Timer from '@/components/Timer'
import CompletionModal from '@/components/CompletionModal'
import Confetti from '@/components/Confetti'

export default function Home() {
  const [difficulty, setDifficulty] = useState(4)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentImage, setCurrentImage] = useState('https://images.unsplash.com/photo-1618690669547-0d9e23b6b494')

  const handleStart = () => {
    setIsPlaying(true)
    setIsCompleted(false)
    setTimeElapsed(0)
    setShowConfetti(false)
  }

  const handleComplete = useCallback(() => {
    setIsCompleted(true)
    setIsPlaying(false)
    setShowConfetti(true)
    
    // Hide confetti after 5 seconds
    setTimeout(() => setShowConfetti(false), 5000)
  }, [])

  const handleReset = () => {
    setIsPlaying(false)
    setIsCompleted(false)
    setTimeElapsed(0)
    setShowConfetti(false)
  }

  const handleShare = () => {
    const text = `🧩 Just completed a ${difficulty}x${difficulty} porcupine puzzle in ${Math.floor(timeElapsed / 60)}:${(timeElapsed % 60).toString().padStart(2, '0')}! Can you beat my time?`
    
    if (navigator.share) {
      navigator.share({
        title: 'Porcupine Puzzle Paradise',
        text: text,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(text + ' ' + window.location.href)
      alert('Copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen p-4">
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-bark-800 mb-4">
            <Sparkles className="inline-block w-8 h-8 mr-2 text-earth-500" />
            Porcupine Puzzle Paradise
            <Sparkles className="inline-block w-8 h-8 ml-2 text-earth-500" />
          </h1>
          <p className="text-bark-600 text-lg max-w-2xl mx-auto">
            Challenge yourself with adorable porcupine puzzles! Drag, drop, and solve your way to victory.
          </p>
        </motion.header>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Controls and Puzzle */}
          <div className="lg:col-span-3 space-y-6">
            {/* Controls */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <DifficultySelector 
                    difficulty={difficulty} 
                    onDifficultyChange={setDifficulty}
                    disabled={isPlaying}
                  />
                  
                  {!isPlaying && !isCompleted && (
                    <button onClick={handleStart} className="btn-primary">
                      Start Puzzle
                    </button>
                  )}
                  
                  {(isPlaying || isCompleted) && (
                    <button onClick={handleReset} className="btn-secondary">
                      Reset
                    </button>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  <Timer 
                    isActive={isPlaying} 
                    time={timeElapsed}
                    onTick={setTimeElapsed}
                  />
                  
                  {isCompleted && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={handleShare}
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
            
            {/* Puzzle Board */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <PuzzleBoard
                imageUrl={currentImage}
                difficulty={difficulty}
                isActive={isPlaying}
                onComplete={handleComplete}
              />
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <Sidebar onImageSelect={setCurrentImage} />
          </motion.div>
        </div>
      </div>
      
      {/* Completion Modal */}
      <CompletionModal
        isOpen={isCompleted}
        timeElapsed={timeElapsed}
        difficulty={difficulty}
        onShare={handleShare}
        onPlayAgain={handleReset}
      />
    </div>
  )
}