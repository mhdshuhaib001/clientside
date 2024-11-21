import React from 'react';
import { Address } from '../../interface/userTypes/apiTypes';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from '../../services/apis/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
interface AddressFormProps {
  address?: Address; 
  onSuccess: () => void; 
}

const AddressForm: React.FC<AddressFormProps> = ({ address, onSuccess }) => {

  const userId = useSelector((state: RootState) => state.User._id);
console.log(address?._id,'address');
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    phoneNumber: Yup.string()
      .required('Phone Number is required')
      .matches(/^[0-9]+$/, 'Phone Number must be numeric'),
    streetAddress: Yup.string().required('Street Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    postalCode: Yup.string()
      .required('Postal / Zip Code is required')
      .matches(/^[0-9]+$/, 'Postal / Zip Code must be numeric'),
    country: Yup.string().required('Country is required'),
  });
  const formik = useFormik({
    initialValues: address ? {
      _id: address._id || '',
      userId: userId, 
      fullName: address.fullName,
      phoneNumber: address.phoneNumber,
      streetAddress: address.streetAddress,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
    } : {
      _id: '',
      userId: userId,
      fullName: '',
      phoneNumber: '',
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: Address) => {
      try {
        if (address) {
          await updateAddress({ id: address._id , address: values }).unwrap();
        } else {
          console.log(values, 'values address');

          await addAddress({ address: values }).unwrap(); 
        }
        onSuccess();
      } catch (error) {
        console.error('Error submitting address:', error);
        alert('There was an error updating the address. Please try again.');
      }
    },
  });

  const [addAddress] = useAddAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();

  // const handleSubmit = async (values: Address) => {
  //   try {
  //     if (address) {
  //       await updateAddress({ id: address._id, address: values }).unwrap();
  //     } else {
  //       console.log(values, 'values address');
  //       await addAddress({ address: values }).unwrap(); 
  //     }
  //     onSuccess();
  //   } catch (error) {
  //     console.error('Error submitting address:', error);
  //     alert('There was an error updating the address. Please try again.');
  //   }
  // };
  

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {/* Full Name */}
      <div className="space-y-2">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Full Name"
          className={`mt-1 block w-full rounded-md border-amber-200 shadow-sm 
            ${formik.errors.fullName && formik.touched.fullName ? 'border-red-500' : ''} 
            focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50`}
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.fullName && formik.touched.fullName && (
          <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
        )}
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Phone Number"
          className={`mt-1 block w-full rounded-md border-amber-200 shadow-sm 
            ${formik.errors.phoneNumber && formik.touched.phoneNumber ? 'border-red-500' : ''} 
            focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50`}
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.phoneNumber && formik.touched.phoneNumber && (
          <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
        )}
      </div>

      {/* Street Address */}
      <div className="space-y-2">
        <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">Street Address</label>
        <input
          type="text"
          id="streetAddress"
          name="streetAddress"
          placeholder="Street Address"
          className={`mt-1 block w-full rounded-md border-amber-200 shadow-sm 
            ${formik.errors.streetAddress && formik.touched.streetAddress ? 'border-red-500' : ''} 
            focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50`}
          value={formik.values.streetAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.streetAddress && formik.touched.streetAddress && (
          <div className="text-red-500 text-sm">{formik.errors.streetAddress}</div>
        )}
      </div>

      {/* City and State */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            className={`mt-1 block w-full rounded-md border-amber-200 shadow-sm 
              ${formik.errors.city && formik.touched.city ? 'border-red-500' : ''} 
              focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50`}
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.city && formik.touched.city && (
            <div className="text-red-500 text-sm">{formik.errors.city}</div>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province / Region</label>
          <input
            type="text"
            id="state"
            name="state"
            placeholder="State / Province / Region"
            className={`mt-1 block w-full rounded-md border-amber-200 shadow-sm 
              ${formik.errors.state && formik.touched.state ? 'border-red-500' : ''} 
              focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50`}
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.state && formik.touched.state && (
            <div className="text-red-500 text-sm">{formik.errors.state}</div>
          )}
        </div>
      </div>

      {/* Postal Code and Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal / Zip Code</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="Postal / Zip Code"
            className={`mt-1 block w-full rounded-md border-amber-200 shadow-sm 
              ${formik.errors.postalCode && formik.touched.postalCode ? 'border-red-500' : ''} 
              focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50`}
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.postalCode && formik.touched.postalCode && (
            <div className="text-red-500 text-sm">{formik.errors.postalCode}</div>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
          <select
            id="country"
            name="country"
            className={`mt-1 block w-full rounded-md border-amber-200 shadow-sm 
              ${formik.errors.country && formik.touched.country ? 'border-red-500' : ''} 
              focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50`}
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
          {formik.errors.country && formik.touched.country && (
            <div className="text-red-500 text-sm">{formik.errors.country}</div>
          )}
        </div>
      </div>

      <button
  type="submit"
  className={`mt-4 w-full py-2 rounded-md 
    ${address ? 'bg-amber-800 text-amber-900' : 'bg-amber-200 text-amber-900'} 
    border border-amber-800 hover:bg-amber-50`}
>
  {address ? 'Update Address' : 'Add Address'}
</button>

    </form>
  );
};

export default AddressForm;
