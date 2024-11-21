import { CheckCircle, Package } from "lucide-react"
import React from "react"
import { useNavigate } from "react-router-dom"
export default function Success() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4 font-serif">
      <div className="w-full max-w-2xl bg-amber-100 border-8 border-double border-amber-900 p-8 shadow-lg">
        <div className="text-center space-y-6">
          <div className="border-b-4 border-amber-900 pb-4">
            <h1 className="text-4xl font-bold tracking-tight text-amber-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Auction Gems
            </h1>
            <p className="text-sm mt-2 text-amber-700">Est. 1892</p>
          </div>
          
          <div className="py-4 px-6 bg-amber-200 inline-block transform rotate-1">
            <h2 className="text-2xl font-bold text-amber-900">Extra! Extra!</h2>
            <p className="text-lg font-semibold mt-2">Payment Successfully Processed!</p>
          </div>

          <CheckCircle className="mx-auto h-16 w-16 text-amber-900" />
          
          <div className="space-y-4 text-amber-900">
            <p className="text-xl">
              Dear Esteemed Bidder,
            </p>
            <p>
              {/* We are pleased to announce that your payment of <span className="font-bold">$1,250.00</span> has been successfully processed for your winning bid. */}
            </p>
            {/* <p className="text-sm">
              Order Reference: <span className="font-mono font-bold">AUC-12345</span>
            </p> */}
          </div>

          <div className="flex justify-center space-x-6 mt-8">
            <button onClick={()=>navigate('/profile/orders')} className="flex items-center px-4 py-2 bg-amber-900 text-amber-100 hover:bg-amber-800 transition-colors">
              {/* <Printer className="mr-2 h-4 w-4" /> */}
             Home
            </button>
            <button onClick={()=>navigate('/')} className="flex items-center px-4 py-2 bg-amber-900 text-amber-100 hover:bg-amber-800 transition-colors">
              <Package className="mr-2 h-4 w-4" />
              Track Shipment
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute top-4 left-4 right-4 text-center">
        <h2 className="text-3xl font-bold text-amber-900" style={{ fontFamily: 'Playfair Display, serif' }}>
          Timeless Treasures Auction House
        </h2>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 text-center text-amber-700 text-sm">
        <p>This is not a legal document. For official records, please refer to your emailed receipt.</p>
      </div>
    </div>
  )
}