
import  { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function ErrorPage() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleGoBack = () => {
    navigate(-1);
    }

  const handleGoHome = () => {
    navigate('/');
    }

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className={`max-w-lg w-full space-y-8 text-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="space-y-4">
          <h1 className="text-7xl font-extrabold text-amber-800 font-serif animate-fade-in">404</h1>
          <h2 className="text-3xl font-bold text-amber-700 font-serif animate-slide-up">Lot Not Found</h2>
          <p className="text-xl text-amber-600 font-serif animate-slide-up delay-300">
            Oh dear! We dont have this page.
          </p>
        </div>
        <div className="mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <button
            onClick={handleGoBack}
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
          >
            Go Back
          </button>
          <button
            onClick={handleGoHome}
            className="w-full sm:w-auto px-6 py-3 border-2 border-amber-700 text-base font-medium rounded-md text-white bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-300 ease-in-out animate-fade-in delay-700"
          >
            Return to Auction 
          </button>
        </div>
        {/* <div className="mt-12 animate-fade-in delay-1000">
          <p className="text-sm text-amber-600 font-serif">
            If you believe this is a mistake, please contact our auctioneers at{' '}
            <a href="mailto:auctioneers@vintagetreasures.com" className="underline hover:text-amber-800 transition duration-300">
              auctioneers@vintagetreasures.com
            </a>
          </p>
        </div> */}
        <div className="mt-16 animate-fade-in delay-1000">
          <div className="border-t-2 border-amber-200 pt-8">
            <p className="text-base text-amber-500 font-serif">
              © {new Date().getFullYear()} Vintage Treasures Auction House. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 border-4 border-amber-300 rounded-full animate-spin-slow opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-amber-400 rounded-full animate-spin-slow opacity-30"></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-amber-200 rounded-full animate-float opacity-30"></div>
        <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-amber-300 rounded-full animate-float delay-1000 opacity-30"></div>
      </div>
    </div>
  )
}