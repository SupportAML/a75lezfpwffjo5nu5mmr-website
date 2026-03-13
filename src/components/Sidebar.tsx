'use client'

import { motion } from 'framer-motion'
import { Trophy, Clock, Star, Users, Calendar } from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
  onImageSelect: (imageUrl: string) => void
}

const featuredImages = [
  {
    url: 'https://images.unsplash.com/photo-1618690669547-0d9e23b6b494',
    title: 'Curious Porcupine',
    difficulty: 'Medium'
  },
  {
    url: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7',
    title: 'Forest Friend',
    difficulty: 'Hard'
  },
  {
    url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee',
    title: 'Sleepy Spike',
    difficulty: 'Easy'
  },
  {
    url: 'https://images.unsplash.com/photo-1574870111867-089ad4a5a6dd',
    title: 'Adventure Time',
    difficulty: 'Expert'
  }
]

const leaderboard = [
  { name: 'PuzzleMaster99', time: '2:34', pieces: 25, avatar: '🦔' },
  { name: 'QuillQueen', time: '3:12', pieces: 16, avatar: '👑' },
  { name: 'SpikeySolver', time: '3:45', pieces: 25, avatar: '⭐' },
  { name: 'NeedleNinja', time: '4:01', pieces: 16, avatar: '🥷' },
  { name: 'PorcupinePro', time: '4:23', pieces: 9, avatar: '🏆' },
]

const previousWinners = [
  { name: 'PuzzleChamp', week: 'Week 47', image: '🏅' },
  { name: 'SpeedSolver', week: 'Week 46', image: '🥇' },
  { name: 'QuillMaster', week: 'Week 45', image: '⚡' },
]

export default function Sidebar({ onImageSelect }: SidebarProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  const handleImageSelect = (index: number, url: string) => {
    setSelectedImage(index)
    onImageSelect(url)
  }

  return (
    <div className="space-y-6">
      {/* Featured This Week */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-panel p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-earth-600" />
          <h3 className="font-bold text-bark-800">This Week's Featured</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {featuredImages.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative cursor-pointer rounded-lg overflow-hidden shadow-md
                ${selectedImage === index ? 'ring-2 ring-earth-500' : ''}
              `}
              onClick={() => handleImageSelect(index, image.url)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-20 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-1 left-2 text-white text-xs font-medium">
                {image.title}
              </div>
              <div className={`
                absolute top-1 right-1 text-xs px-1.5 py-0.5 rounded font-medium
                ${image.difficulty === 'Easy' ? 'bg-forest-500' :
                  image.difficulty === 'Medium' ? 'bg-earth-500' :
                  image.difficulty === 'Hard' ? 'bg-orange-500' : 'bg-red-500'}
                text-white
              `}>
                {image.difficulty}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Leaderboard */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-earth-600" />
          <h3 className="font-bold text-bark-800">Leaderboard</h3>
        </div>
        
        <div className="space-y-2">
          {leaderboard.map((player, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`
                flex items-center gap-3 p-2 rounded-lg transition-colors
                ${index === 0 ? 'bg-gradient-to-r from-yellow-100 to-earth-100' :
                  index === 1 ? 'bg-gradient-to-r from-gray-100 to-bark-100' :
                  index === 2 ? 'bg-gradient-to-r from-orange-100 to-earth-100' :
                  'hover:bg-bark-50'}
              `}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{player.avatar}</span>
                <div className="text-sm font-medium text-bark-700">
                  #{index + 1}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="font-medium text-bark-800 truncate">
                  {player.name}
                </div>
                <div className="flex items-center gap-2 text-xs text-bark-600">
                  <Clock className="w-3 h-3" />
                  {player.time}
                  <span>•</span>
                  {player.pieces}pc
                </div>
              </div>
              
              {index < 3 && (
                <div className="text-lg">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 btn-secondary text-sm"
        >
          View Full Leaderboard
        </motion.button>
      </motion.div>

      {/* Previous Winners */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-earth-600" />
          <h3 className="font-bold text-bark-800">Previous Winners</h3>
        </div>
        
        <div className="space-y-3">
          {previousWinners.map((winner, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-earth-50 to-forest-50 rounded-lg"
            >
              <div className="text-2xl">{winner.image}</div>
              <div>
                <div className="font-medium text-bark-800">{winner.name}</div>
                <div className="text-sm text-bark-600">{winner.week}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Community Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-panel p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-earth-600" />
          <h3 className="font-bold text-bark-800">Community</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-earth-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-earth-700">2,847</div>
            <div className="text-sm text-bark-600">Players Online</div>
          </div>
          <div className="bg-forest-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-forest-700">15,692</div>
            <div className="text-sm text-bark-600">Puzzles Solved</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}