'use client'

import { useState, useEffect } from 'react'
import { RefreshCw, Zap, Heart, Star } from 'lucide-react'

const porcupineFacts = [
  "Porcupines are the third largest rodents in the world, after capybaras and beavers.",
  "A porcupine's quills are actually modified hairs that can grow up to 5 inches long.",
  "Baby porcupines are called porcupettes and are born with soft quills that harden within hours.",
  "Porcupines cannot shoot their quills, but they can release them easily when threatened.",
  "North American porcupines are excellent climbers and often sleep in trees.",
  "A single porcupine can have up to 30,000 quills covering their body.",
  "Porcupines are herbivores and love to eat tree bark, especially in winter.",
  "The word 'porcupine' comes from Latin meaning 'quill pig', though they're not related to pigs.",
  "Porcupine quills have tiny backward-facing barbs that make them difficult to remove.",
  "Some porcupines can live up to 20 years in the wild.",
  "Porcupines are excellent swimmers despite their spiky appearance.",
  "In winter, porcupines may share dens with other porcupines to stay warm.",
  "Porcupines have poor eyesight but excellent hearing and sense of smell.",
  "African porcupines are larger than their North American cousins and live in burrows.",
  "Porcupines make a variety of sounds including grunts, whines, and chattering noises.",
  "A porcupine's quills grow back if lost, similar to how human hair regrows.",
  "Porcupines have orange-colored teeth due to iron deposits that make them extra strong.",
  "Fisher cats are one of the few predators that successfully hunt porcupines.",
  "Porcupines are mostly nocturnal and do most of their foraging at night.",
  "Some cultures believe porcupine quills bring good luck and use them in traditional crafts."
]

export default function Home() {
  const [currentFact, setCurrentFact] = useState('')
  const [factIndex, setFactIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Initialize with a random fact
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * porcupineFacts.length)
    setFactIndex(randomIndex)
    setCurrentFact(porcupineFacts[randomIndex])
  }, [])

  const refreshFact = () => {
    setIsAnimating(true)
    
    setTimeout(() => {
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * porcupineFacts.length)
      } while (newIndex === factIndex && porcupineFacts.length > 1)
      
      setFactIndex(newIndex)
      setCurrentFact(porcupineFacts[newIndex])
      setIsAnimating(false)
    }, 250)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="porcupine-gradient text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="animate-bounce-gentle text-6xl mb-4">🦔</div>
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            Amazing Porcupine Facts
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover fascinating facts about these incredible spiky mammals!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Fact Card */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 fact-card border-l-8 border-orange-400">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Star className="text-yellow-500 fill-current" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Did You Know?</h2>
              </div>
              <button
                onClick={refreshFact}
                className="refresh-btn bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg"
                disabled={isAnimating}
                aria-label="Get new porcupine fact"
              >
                <RefreshCw size={24} className={isAnimating ? 'animate-spin' : ''} />
              </button>
            </div>
            
            <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {currentFact}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <Zap size={16} className="text-yellow-500" />
                  <span>Fact #{factIndex + 1} of {porcupineFacts.length}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Heart size={16} className="text-red-500" />
                  <span>Wildlife Wonder</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-gray-800">30,000</div>
            <div className="text-gray-600">Quills per porcupine</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl mb-2">📏</div>
            <div className="text-2xl font-bold text-gray-800">5 inches</div>
            <div className="text-gray-600">Max quill length</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl mb-2">⏰</div>
            <div className="text-2xl font-bold text-gray-800">20 years</div>
            <div className="text-gray-600">Lifespan in wild</div>
          </div>
        </div>

        {/* Fun Section */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">🌿 Nature's Marvel</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Porcupines are incredible examples of nature's ingenuity. Their quills are not just for defense – 
            they help with buoyancy when swimming and even assist in climbing!
          </p>
          <button
            onClick={refreshFact}
            className="bg-white text-green-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
          >
            Learn Another Fact! 🦔
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-400 mb-2">
            🦔 Porcupine Facts • Educational Wildlife Content
          </p>
          <p className="text-sm text-gray-500">
            Learning about wildlife helps us appreciate and protect our natural world.
          </p>
        </div>
      </footer>
    </main>
  )
}
