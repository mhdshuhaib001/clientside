import React, { useEffect, useState } from 'react';
import { useGetAddressQuery, useDeleteAddressMutation } from '../../services/apis/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { Address } from '../../interface/userTypes/apiTypes';
import { toast } from 'react-hot-toast';
import AddressForm from '../../containers/userContainer/AddressForm';

export default function AddressBook(): JSX.Element {
  const [deleteAddress] = useDeleteAddressMutation();
  const userId = useSelector((state: RootState) => state.User._id);
  const { data: addresses, isLoading, refetch } = useGetAddressQuery(userId);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDeleteAddress = async (id: string): Promise<void> => {
    try {
      await deleteAddress(id).unwrap();
      toast.success('Address deleted successfully');
    } catch (error) {
      console.error('Failed to delete address: ', error);
      toast.error('Failed to delete address');
    }
  };

  const openEditDialog = (address: Address): void => {
    setCurrentAddress(address);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f1f1df] p-4 sm:p-6 lg:p-8 font-serif">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-amber-200">
        <div className="px-4 py-5 sm:px-6 border-b border-amber-200">
          <h2 className="text-2xl font-bold text-center text-gray-800">Address Book</h2>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            {isLoading ? (
              <p>Loading addresses...</p>
            ) : (
              <>
                {addresses && addresses.length > 0 ? (
                  addresses.map((addr: Address) => (
                    <div key={addr._id} className="p-4 border-b border-amber-200">
                      <p>
                        <strong>Name:</strong> {addr.fullName}
                      </p>
                      <p>
                        <strong>Phone:</strong> {addr.phoneNumber}
                      </p>
                      <p>
                        <strong>Address:</strong> {addr.streetAddress}, {addr.city}, {addr.state},{' '}
                        {addr.postalCode}, {addr.country}
                      </p>
                      <div className="mt-2">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => openEditDialog(addr)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 ml-4"
                          onClick={() => handleDeleteAddress(addr._id ?? '')}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No addresses found.</p>
                )}

                <button
                  className="w-full mt-6 bg-amber-600 text-white rounded-md py-2 hover:bg-amber-700"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  Add New Address
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add Address Dialog */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md" />

          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative z-10">
            <button
              className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-lg"
              onClick={() => setIsAddDialogOpen(false)}
            >
              &times;
            </button>

            <h3 className="text-xl font-bold mb-4">Add New Address</h3>
            <AddressForm
              onSuccess={() => {
                setIsAddDialogOpen(false);
                toast.success('Address added successfully');
              }}
            />
            {/* <button
        className="text-red-600 hover:text-red-800 underline mt-4"
        onClick={() => setIsAddDialogOpen(false)}
      >
        Cancel
      </button> */}
          </div>
        </div>
      )}

      {/* Edit Address Dialog */}
      {isEditDialogOpen && currentAddress && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background blur effect */}
          <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md" />
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative z-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Edit Address</h3>
            <AddressForm
              address={currentAddress}
              onSuccess={() => {
                setIsEditDialogOpen(false);
                toast.success('Address updated successfully');
              }}
            />
            <button
              className="text-red-600 hover:text-red-800 underline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
