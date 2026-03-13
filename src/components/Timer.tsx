'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

interface TimerProps {
  isActive: boolean
  time: number
  onTick: (time: number) => void
}

export default function Timer({ isActive, time, onTick }: TimerProps) {
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isActive) {
      interval = setInterval(() => {
        onTick(time + 1)
      }, 1000)
    } else if (!isActive && time !== 0) {
      if (interval) clearInterval(interval)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time, onTick])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md border border-white/20"
    >
      <motion.div
        animate={isActive ? { rotate: 360 } : { rotate: 0 }}
        transition={{
          duration: isActive ? 2 : 0,
          repeat: isActive ? Infinity : 0,
          ease: 'linear'
        }}
      >
        <Clock className="w-4 h-4 text-bark-600" />
      </motion.div>
      
      <span className="font-mono font-semibold text-bark-800">
        {formatTime(time)}
      </span>
      
      {isActive && (
        <motion.div
          className="w-2 h-2 bg-forest-500 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.div>
  )
}