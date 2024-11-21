import React, { useEffect, useState } from 'react';
import { useUpdateProfileMutation, useFetchUserByIdQuery } from '../../services/apis/userApi';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { RootState } from '../../store/Store';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const state = [
  { title: 'Auction Attend', value: 280 },
  { title: 'Auction Win', value: 50 },
  { title: 'Cancel Auction', value: 25 },
];

const biddingSummary = [
  {
    id: '12584885465',
    name: 'Porcelain',
    amount: '$1800',
    status: 'Winning',
    date: 'June 25, 2024',
  },
  {
    id: '12584885482',
    name: 'Old Clocks',
    amount: '$1900',
    status: 'Winning',
    date: 'June 13, 2024',
  },
  {
    id: '12584885536',
    name: 'Manuscripts',
    amount: '$2000',
    status: 'Cancel',
    date: 'June 2, 2024',
  },

];

const UserDashBoard: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const userId = useSelector((state: RootState) => state.User._id);
  const { data: userData } = useFetchUserByIdQuery(userId);
  const totalPages = Math.ceil(biddingSummary.length / itemsPerPage);
  const [updateProfile, { isLoading: updateLoading }] = useUpdateProfileMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => { 
    if (userData && userData.profileImage) {
      setImagePreview(userData.profileImage); 
    }
  }, [userData]);
  
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    profileImage: Yup.mixed().when('imagePreview', (imagePreview: any | null, schema: any) => {
      return imagePreview
        ? schema.notRequired() 
        : schema.required('A file is required');
    }),
  });
  
  const handleProfileSubmit = async (values: any) => {
    const formData = new FormData();
  
    formData.append('userId', userId);
    formData.append('name', values.name);
  
    if (values.profileImage) {
      formData.append('image', values.profileImage);
    }
  
    try {
      const response = await updateProfile(formData).unwrap();
      console.log(response,'this is the resoinse')
      if (response) {
        setImagePreview(URL.createObjectURL(values.profileImage));
        
        onClose();
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      toast.error('Error updating profile. Please try again.');
      console.error('Error updating profile:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-main-bg p-4 sm:p-6 lg:p-8">
      {/* Profile Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-amber-200 mb-6">
        <div className="p-6 sm:p-8 border-b border-amber-200 relative">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img
              src={imagePreview || 'default_image_url'}
              alt="profile"
              className="w-20 h-20 rounded-full border-full border-2 border-amber-200"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-semibold text-gray-800">Hi,{userData?.name}</h1>
              <p className="text-gray-600">
                You have completed 10 auctions in the last month. Start your auction today!
              </p>
            </div>
          </div>

          <button
            onClick={onOpen}
            className="bg-[#975f26] text-white py-1 px-3 rounded-md hover:bg-[#3663f21] focus:outline-none transition duration-300 absolute bottom-4 right-4"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats Table */}
      <div className="m-3 grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 sm:p-8 bg-[#f1f1df] border-50 border-b border-amber-200">
        {state.map((state) => (
          <div
            key={state.title}
            className="bg-white p-4 rounded-lg shadow-sm text-center border border-amber-100 hover:border-amber-300 transition-colors duration-300"
          >
            <h2 className="text-3xl font-bold text-amber-600">{state.title}</h2>
            <p className="text-gray-600 font-semibold text-lg">{state.value}</p>
          </div>
        ))}
      </div>

      <div className="p-6 sm:p-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Bidding Summary</h2>
        <div className="overflow-x-auto overflow-hidden">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-amber-50">
              <tr>
                <th className="px-4 py-2">Auction ID</th>
                <th className="px-4 py-2">Product name</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Auction Date</th>
              </tr>
            </thead>
            <tbody>
              {biddingSummary
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b border-amber-100 hover:bg-amber-50 transition-colors duration-300"
                  >
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2 font-medium text-gray-900">{item.name}</td>
                    <td className="px-4 py-2">{item.amount}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${item.status === 'Winning' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{item.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${currentPage === page ? 'bg-amber-200' : 'bg-white text-gray-600 hover:bg-amber-100'} transition-colors duration-300`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Update Modal Component */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Update Profile</ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={{
                    name: userData?.name,
                    profileImage: null,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleProfileSubmit}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="profileImage">
                          Profile Image:
                        </label>
                        {imagePreview && (
                          <div className="mb-4 text-center">
                            <img
                              src={imagePreview}
                              alt="Profile Preview"
                              className="w-32 h-32 object-cover rounded-full border border-amber-200"
                            />
                          </div>
                        )}
                        <input
                          type="file"
                          id="profileImage"
                          accept="image/*"
                          onChange={(event) => {
                            const file = event.currentTarget.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setImagePreview(reader.result as string);
                                setFieldValue('profileImage', file);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1"
                        />
                        <ErrorMessage
                          name="profileImage"
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="name">
                          Name:
                        </label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full border-amber-200 text-amber-600"
                        disabled={updateLoading}
                      >
                        {updateLoading ? 'Saving...' : 'Save Profile'}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserDashBoard;
