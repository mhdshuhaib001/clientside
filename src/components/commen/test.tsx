import React, { useEffect, useState } from 'react';
import { useAddAddressMutation, useGetAddressQuery ,useUpdateAddressMutation,useDeleteAddressMutation} from '../../services/apis/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { Address } from '../../interface/userTypes/apiTypes';
import { toast } from 'react-hot-toast';
interface AddressFormProps {
  isEdit: boolean;
  address: Address;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function AddressBook(): JSX.Element {
  const [addAddress] = useAddAddressMutation();   
  const [updateAddress] = useUpdateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation(); 
  
  const userId = useSelector((state: RootState) => state.User._id);
  const { data: address, isLoading ,refetch} = useGetAddressQuery(userId);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);

  const initialAddressState: Address = {
    fullName: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    userId: userId,
    _id: ''
  };

  const [newAddress, setNewAddress] = useState<Address>(initialAddressState);
useEffect(() => {
  refetch();
}, [refetch]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
  
    if (isEditDialogOpen && currentAddress) {
      setCurrentAddress(prevAddress => {
        if (prevAddress === null) return null;
        return { ...prevAddress, [name]: value };
      });
    } else {
      setNewAddress(prevAddress => ({ ...prevAddress, [name]: value }));
    }
  };
  
  

  const handleAddAddress = async (): Promise<void> => {
    try {
      const response = await addAddress({ address: newAddress }).unwrap();
      console.log(response);
      setNewAddress(initialAddressState);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Failed to add address: ', error);
    }
  };

  const handleEditAddress = async (): Promise<void> => {
    if (currentAddress && currentAddress._id) {
      try {
        await updateAddress({ id: currentAddress._id, address: currentAddress }).unwrap();
        setIsEditDialogOpen(false);  
      } catch (error) {
        console.error('Failed to update address: ', error);
      }
    }
  };
  

  const handleDeleteAddress = async (id: string): Promise<void> => {
    try {
     const response = await deleteAddress(id).unwrap();
     toast.success('Address deleted successfully');
     console.log(response);
    } catch (error) {
      console.error('Failed to delete address: ', error);
    }
  };

  const openEditDialog = (address: Address): void => {
    setCurrentAddress(address);
    setIsEditDialogOpen(true);
  };

  const AddressForm: React.FC<AddressFormProps> = ({ address, onChange }) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Full Name"
          className="mt-1 block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
          value={address.fullName}
          onChange={onChange}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Phone Number"
          className="mt-1 block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
          value={address.phoneNumber}
          onChange={onChange}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">Street Address</label>
        <input
          type="text"
          id="streetAddress"
          name="streetAddress"
          placeholder="Street Address"
          className="mt-1 block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
          value={address.streetAddress}
          onChange={onChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            className="mt-1 block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
            value={address.city}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province / Region</label>
          <input
            type="text"
            id="state"
            name="state"
            placeholder="State / Province / Region"
            className="mt-1 block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
            value={address.state}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal / Zip Code</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="Postal / Zip Code"
            className="mt-1 block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
            value={address.postalCode}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
          <select
            id="country"
            name="country"
            className="mt-1 block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
            value={address.country}
            onChange={onChange}
          >
            <option value="">Select a country</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Japan">Japan</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f1f1df] p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-amber-200">
        <div className="px-4 py-5 sm:px-6 border-b border-amber-200">
          <h2 className="text-2xl font-bold text-center text-gray-800">Address Book</h2>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            {/* Render addresses here */}
            {isLoading ? (
              <p>Loading...</p>
            ) : address && address.length > 0 ? (
              address.map((addr: Address) => (
                <div key={addr._id} className="border p-4 rounded-md shadow">
                  <h3 className="font-semibold">{addr.fullName}</h3>
                  <p>{addr.phoneNumber}</p>
                  <p>{addr.streetAddress}</p>
                  <p>{addr.city}, {addr.state} {addr.postalCode}, {addr.country}</p>
                  <button onClick={() => openEditDialog(addr)} className="text-blue-600">Edit</button>
                  <button onClick={() => handleDeleteAddress(addr._id?? '')} className="text-red-600 ml-4">Delete</button>
                </div>
              ))
            ) : (
              <p>No addresses found.</p>
            )}
          </div>
        </div>
        <div className="px-4 py-4 sm:px-6 bg-amber-50">
          <button
            onClick={() => setIsAddDialogOpen(true)}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#975f26] hover:bg-[#7a4d1e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-300"
          >
            Add New Address
          </button>
        </div>
      </div>

      {/* Modal for adding a new address */}
      {isAddDialogOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Add New Address
                </h3>
                <div className="mt-2">
                  <AddressForm isEdit={false} address={newAddress} onChange={handleInputChange} />
                </div>
              </div>
              <div className="bg-amber-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#975f26] text-base font-medium text-white hover:bg-[#7a4d1e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-300"
                  onClick={handleAddAddress}
                >
                  Save Address
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-amber-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-amber-700 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-300"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for editing an address */}
      {isEditDialogOpen && currentAddress && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Edit Address
                </h3>
                <div className="mt-2">
                  <AddressForm isEdit={true} address={currentAddress} onChange={handleInputChange} />
                </div>
              </div>
              <div className="bg-amber-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#975f26] text-base font-medium text-white hover:bg-[#7a4d1e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-300"
                  onClick={handleEditAddress}
                >
                  Update Address
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-amber-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-amber-700 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-300"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}