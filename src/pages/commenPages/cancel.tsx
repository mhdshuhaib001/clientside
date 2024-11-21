import { XCircle, RefreshCcw, HelpCircle } from "lucide-react"
import React from "react"
export default function Cancel() {
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4 font-serif">
      <div className="w-full max-w-md bg-white border-4 border-amber-900 p-6 shadow-lg">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-amber-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Timeless Treasures
          </h1>
          
          <XCircle className="mx-auto h-12 w-12 text-red-600" />
          
          <h2 className="text-xl font-bold text-amber-900">Payment Canceled</h2>
          
          <p className="text-amber-800">
            We regret to inform you that your payment of <span className="font-bold">$1,250.00</span> for order <span className="font-mono font-bold">AUC-12345</span> has been canceled.
          </p>

          <div className="flex justify-center space-x-4 mt-6">
            <button className="flex items-center px-3 py-2 bg-amber-700 text-amber-100 hover:bg-amber-800 transition-colors text-sm rounded">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Retry
            </button>
            <button className="flex items-center px-3 py-2 bg-amber-200 text-amber-900 hover:bg-amber-300 transition-colors text-sm rounded">
              <HelpCircle className="mr-2 h-4 w-4" />
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}