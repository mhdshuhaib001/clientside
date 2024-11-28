export default function SellGuidens() {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-12">How To Bid</h1>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200" />
          
          {/* Timeline items */}
          <div className="space-y-12">
            {/* Registration */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between">
              <div className="flex-1 w-full md:w-5/12 mb-4 md:mb-0">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">How To</div>
                  <h3 className="text-xl font-semibold mb-2">Registration</h3>
                  <p className="text-gray-600">
                    Create, place your listing structure, payment terms and add any additional charges. Specifying when a payment schedule will be issued as well as your accepted.
                  </p>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8">
                <div className="w-4 h-4 rounded-full bg-primary border-4 border-white" />
              </div>
              <div className="flex-1 w-full md:w-5/12" />
            </div>
  
            {/* Browse Listings */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between">
              <div className="flex-1 w-full md:w-5/12 md:text-right order-1 md:order-none" />
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8">
                <div className="w-4 h-4 rounded-full bg-primary border-4 border-white" />
              </div>
              <div className="flex-1 w-full md:w-5/12 mb-4 md:mb-0">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">How To</div>
                  <h3 className="text-xl font-semibold mb-2">Browse Listings</h3>
                  <p className="text-gray-600">
                    Create, place your listing structure, payment terms and add any additional charges. Specifying when a payment schedule will be issued as well as your accepted.
                  </p>
                </div>
              </div>
            </div>
  
            {/* Place Bids */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between">
              <div className="flex-1 w-full md:w-5/12 mb-4 md:mb-0">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">How To</div>
                  <h3 className="text-xl font-semibold mb-2">Place Bids</h3>
                  <p className="text-gray-600">
                    Create, place your listing structure, payment terms and add any additional charges. Specifying when a payment schedule will be issued as well as your accepted.
                  </p>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8">
                <div className="w-4 h-4 rounded-full bg-primary border-4 border-white" />
              </div>
              <div className="flex-1 w-full md:w-5/12" />
            </div>
  
            {/* Winning the Auction */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between">
              <div className="flex-1 w-full md:w-5/12 md:text-right order-1 md:order-none" />
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8">
                <div className="w-4 h-4 rounded-full bg-primary border-4 border-white" />
              </div>
              <div className="flex-1 w-full md:w-5/12 mb-4 md:mb-0">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">How To</div>
                  <h3 className="text-xl font-semibold mb-2">Winning the Auction</h3>
                  <p className="text-gray-600">
                    Create, place your listing structure, payment terms and add any additional charges. Specifying when a payment schedule will be issued as well as your accepted.
                  </p>
                </div>
              </div>
            </div>
  
            {/* Payment and Shipping */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between">
              <div className="flex-1 w-full md:w-5/12 mb-4 md:mb-0">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">How To</div>
                  <h3 className="text-xl font-semibold mb-2">Payment and Shipping</h3>
                  <p className="text-gray-600">
                    Create, place your listing structure, payment terms and add any additional charges. Specifying when a payment schedule will be issued as well as your accepted.
                  </p>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8">
                <div className="w-4 h-4 rounded-full bg-primary border-4 border-white" />
              </div>
              <div className="flex-1 w-full md:w-5/12" />
            </div>
          </div>
  
          {/* Guidelines Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">Guidelines For Bidding</h2>
            <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src="/placeholder.svg?height=400&width=800" 
                alt="Bidding Guidelines"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }