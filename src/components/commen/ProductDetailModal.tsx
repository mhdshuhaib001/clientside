import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image } from "@nextui-org/react"

interface ProductDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    auctionStartDateTime: string
    auctionEndDateTime: string
    itemTitle: string
    description: string
    reservePrice: string
    images: string[]
    // Add other necessary fields
  }
}

export default function ProductDetailsModal({ isOpen, onClose, product }: ProductDetailsModalProps) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{product.itemTitle}</ModalHeader>
            <ModalBody>
              <Image
                src={product.images[0]}
                alt={product.itemTitle}
                className="object-cover w-full h-48 rounded-lg"
              />
              <p className="text-sm text-gray-700"><span className="font-semibold">Description:</span> {product.description}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Reserve Price:</span> ${product.reservePrice}</p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Auction Start:</span> {new Date(product.auctionStartDateTime).toLocaleString()}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Auction End:</span> {new Date(product.auctionEndDateTime).toLocaleString()}
              </p>
              {/* Add more product details as needed */}
            </ModalBody>
            <ModalFooter>
              <Button color="warning" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}