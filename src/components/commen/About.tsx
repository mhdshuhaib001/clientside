import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, DollarSign, Users, Shield, ArrowRight, Star } from 'lucide-react'

interface FeatureCardProps {
    icon: React.ElementType; 
    title: string;
    description: string;
  }

  interface ProcessStepProps {
    number: string;
    title: string;
    description: string;
  }
  
  const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
    <motion.div 
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    whileHover={{ y: -5 }}
  >
    <Icon className="text-amber-500 w-12 h-12 mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description }) => (
    <motion.div 
    className="flex items-start space-x-4"
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold">
      {number}
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
)

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <motion.header 
        className="bg-amber-800 text-white py-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Vintage Meets Modern
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Empowering sellers and delighting collectors in the world of timeless treasures
          </motion.p>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-16">
        <section className="mb-20">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Unique Approach
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={ShoppingBag} 
              title="Seller-Driven Platform" 
              description="We put the power in the hands of our sellers, allowing them to curate and present their own vintage collections."
            />
            <FeatureCard 
              icon={DollarSign} 
              title="Transparent Pricing" 
              description="Our platform fee is clear and straightforward, ensuring sellers know exactly what to expect."
            />
            <FeatureCard 
              icon={Users} 
              title="Community-Focused" 
              description="We foster a vibrant community of vintage enthusiasts, collectors, and sellers from around the world."
            />
          </div>
        </section>

        <section className="mb-20">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <ProcessStep 
                number="1" 
                title="List Your Items" 
                description="Easily upload your vintage treasures with detailed descriptions and high-quality images."
              />
              <ProcessStep 
                number="2" 
                title="Set Your Terms" 
                description="Choose your starting price, auction duration, and any special conditions for the sale."
              />
              <ProcessStep 
                number="3" 
                title="Engage with Buyers" 
                description="Respond to inquiries and build excitement around your auctions."
              />
              <ProcessStep 
                number="4" 
                title="Secure the Sale" 
                description="Finalize the transaction and arrange shipping with our streamlined process."
              />
            </div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img 
                src="/placeholder.svg?height=400&width=600" 
                alt="Vintage items collage" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-amber-500 text-white p-4 rounded-lg shadow-lg">
                <p className="text-2xl font-bold">10%</p>
                <p className="text-sm">Platform Fee</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mb-20">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Why Sellers Choose Us
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-lg"
              whileHover={{ y: -5 }}
            >
              <Star className="text-amber-500 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Global Reach</h3>
              <p className="text-gray-600">Connect with buyers from around the world, expanding your market beyond local boundaries.</p>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-lg"
              whileHover={{ y: -5 }}
            >
              <Shield className="text-amber-500 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Secure Transactions</h3>
              <p className="text-gray-600">Our platform ensures safe and protected transactions for both buyers and sellers.</p>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-lg"
              whileHover={{ y: -5 }}
            >
              <Users className="text-amber-500 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Seller Community</h3>
              <p className="text-gray-600">Join a network of passionate sellers, share insights, and grow your vintage business.</p>
            </motion.div>
          </div>
        </section>

        <motion.section 
          className="text-center bg-amber-100 py-16 rounded-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Ready to Start Selling?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of vintage enthusiasts and turn your passion into profit.
          </p>
          <motion.a 
            href="#" 
            className="inline-flex items-center px-8 py-3 bg-amber-600 text-white rounded-full text-lg font-semibold hover:bg-amber-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started <ArrowRight className="ml-2" />
          </motion.a>
        </motion.section>
      </main>

      <footer className="bg-gray-800 text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-4">&copy; 2023 Your Auction Platform Name. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-amber-400 transition duration-300">Terms of Service</a>
            <a href="#" className="hover:text-amber-400 transition duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-amber-400 transition duration-300">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
}