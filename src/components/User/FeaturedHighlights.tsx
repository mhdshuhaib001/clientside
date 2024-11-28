import React from 'react'
import { ShoppingBag, Gavel, Shield, HelpCircle, Users, ClipboardList, UserPlus, UserCheck } from 'lucide-react'

const features = [
  { 
    icon: <ShoppingBag className="w-8 h-8 text-orange-500" />, 
    title: 'Smart Bidding Tools', 
    description: 'Set your maximum bid and let our system automatically bid for you, ensuring you never miss out on your desired items.' 
  },
  { 
    icon: <Gavel className="w-8 h-8 text-orange-500" />, 
    title: 'Live Auction Streaming', 
    description: 'Join real-time auctions from anywhere with our live streaming feature, complete with instant bidding capabilities.' 
  },
  { 
    icon: <Shield className="w-8 h-8 text-orange-500" />, 
    title: 'Secure Transactions', 
    description: 'Benefit from our encrypted payment system and escrow service that protects both buyers and sellers throughout the process.' 
  },
  { 
    icon: <HelpCircle className="w-8 h-8 text-orange-500" />, 
    title: '24/7 Support', 
    description: 'Access our dedicated support team anytime through live chat, email, or phone for assistance with your auctions.' 
  },
]

const stats = [
  { 
    icon: <Users className="w-6 h-6 text-gray-600" />, 
    value: '250k+', 
    label: 'Active Users', 
    subLabel: 'Monthly Participants' 
  },
  { 
    icon: <ClipboardList className="w-6 h-6 text-gray-600" />, 
    value: '15k+', 
    label: 'Live Auctions', 
    subLabel: 'Active Listings' 
  },
  { 
    icon: <UserPlus className="w-6 h-6 text-gray-600" />, 
    value: '$2.8M', 
    label: 'Total Sales', 
    subLabel: 'Monthly Volume' 
  },
  { 
    icon: <UserCheck className="w-6 h-6 text-gray-600" />, 
    value: '99.8%', 
    label: 'Success Rate', 
    subLabel: 'Completed Auctions' 
  },
]

export default function FeaturedHighlights() {
  return (
    <div className="bg-[#f5f0d0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Our Featured <span className="text-gray-500">Highlights.</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm font-medium mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.subLabel}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}