import { motion } from 'framer-motion'
import { ShoppingBag, DollarSign, Users, Shield, Lock } from 'lucide-react'
import Header from '../User/Header'
import Footer from '../User/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Header/>
      {/* <motion.header 
        className="bg-amber-800 text-white py-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Auction Platform</h1>
          <p className="text-xl">Connecting Sellers and Buyers in the World of Vintage Treasures</p>
        </div>
      </motion.header> */}

      <main className="container mx-auto px-4 py-16">
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-amber-900">Our Story</h2>
          <p className="text-lg text-gray-700 mb-4">
            Welcome to our unique auction platform, where we bring together passionate sellers and eager buyers in the fascinating world of vintage items. Our journey began with a simple idea: to create a space where sellers could directly connect with collectors and enthusiasts, all while ensuring a fair and transparent auction process.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Unlike traditional auction houses, we've put the power in the hands of our sellers. They are the heart of our platform, curating and presenting their own collections of timeless treasures. Our role is to provide the technology, security, and support to make these transactions smooth and enjoyable for everyone involved.
          </p>
        </motion.section>

        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-amber-900">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-amber-800 flex items-center">
                <ShoppingBag className="mr-2" /> For Sellers
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Create an account and set up your seller profile</li>
                <li>Add your vintage items with detailed descriptions and starting prices</li>
                <li>Set auction durations and any special terms</li>
                <li>Interact with potential buyers through our messaging system</li>
                <li>Receive bids and finalize sales</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-amber-800 flex items-center">
                <Users className="mr-2" /> For Buyers
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Browse a wide variety of vintage items from different sellers</li>
                <li>Create a wishlist and set up alerts for items you're interested in</li>
                <li>Place bids on auctions</li>
                <li>Communicate with sellers for additional information</li>
                <li>Win auctions and arrange payment and shipping with the seller</li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-amber-900">Our Platform Fee</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg text-gray-700 mb-4">
              To maintain and improve our platform, we charge a small fee on successful transactions. This fee is calculated as a percentage of the final sale price and is deducted from the seller's earnings.
            </p>
            <div className="flex items-center justify-center bg-amber-100 p-4 rounded-lg">
              <DollarSign className="text-amber-600 mr-2" size={24} />
              <span className="text-2xl font-bold text-amber-800">Current Platform Fee: 5%</span>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              This fee covers the costs of running the platform, including secure payment processing, customer support, and continuous improvements to our services.
            </p>
          </div>
        </motion.section>

        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-amber-900">Secure Payments with Escrow</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Lock className="text-amber-600 mr-4" size={48} />
              <h3 className="text-2xl font-semibold text-amber-800">Escrow Protection</h3>
            </div>
            <p className="text-lg text-gray-700 mb-4">
              We use an escrow system to ensure secure and fair transactions for both buyers and sellers. Here's how it works:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
              <li>When a buyer wins an auction, they send the payment to our secure escrow service.</li>
              <li>We hold the funds securely while the seller ships the item to the buyer.</li>
              <li>Once the buyer receives and approves the item, we release the funds to the seller.</li>
              <li>If any issues arise, our support team helps resolve them before the funds are released.</li>
            </ol>
            <p className="text-lg text-gray-700">
              This system protects both parties: buyers only pay for items they receive and approve, while sellers are assured they will receive payment for delivered goods.
            </p>
          </div>
        </motion.section>

        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-amber-900">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Shield className="mx-auto text-amber-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-amber-800">Secure Transactions</h3>
              <p className="text-gray-700">We ensure safe and secure transactions for both buyers and sellers.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Users className="mx-auto text-amber-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-amber-800">Vibrant Community</h3>
              <p className="text-gray-700">Join a passionate community of vintage enthusiasts and collectors.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <ShoppingBag className="mx-auto text-amber-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-amber-800">Unique Items</h3>
              <p className="text-gray-700">Discover one-of-a-kind vintage treasures from sellers worldwide.</p>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-amber-900">Join Our Community</h2>
          <p className="text-lg text-gray-700 mb-8">
            Whether you're a seller looking to share your vintage collection or a buyer searching for that perfect piece, we invite you to join our growing community of auction enthusiasts.
          </p>
          <div className="space-x-4">
            <a href="/profile/seller" className="bg-amber-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-amber-700 transition duration-300">
              Start Selling
            </a>
            <a href="/auction-items" className="bg-amber-100 text-amber-800 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-amber-200 transition duration-300">
              Explore Auctions
            </a>
          </div>
        </motion.section>
      </main>
 <Footer/>
    </div>
  )
}