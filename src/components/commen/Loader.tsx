import React, { useEffect, useState } from 'react'
import { Gavel } from 'lucide-react'

export default function Loader() {
  const [isRaised, setIsRaised] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRaised(prev => !prev)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50">
      <div className="relative w-32 h-32 mb-6">
        <div className="absolute inset-0 border-4 border-amber-800 rounded-full opacity-25 animate-ping"></div>
        <div className="absolute inset-0 border-4 border-amber-800 rounded-full"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Gavel
            size={48}
            className={`text-amber-800 transition-transform duration-300 ${
              isRaised ? 'transform -rotate-45 translate-y-[-4px]' : ''
            }`}
          />
        </div>
      </div>
      <h2 className="text-3xl font-serif text-amber-800 mb-2">Auction in Progress</h2>
      <p className="text-xl font-serif text-amber-600">
        {isRaised ? "Going Once..." : "Going Twice..."}
      </p>
      <div className="mt-6 flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          ></div>
        ))}
      </div>
    </div>
  )
}