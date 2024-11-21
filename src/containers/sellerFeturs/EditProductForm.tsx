// import React, { useState, ChangeEvent, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store/Store';
// import { useGetProductQuery, useUpdateProductMutation } from '../../services/apis/sellerApi';
// import { Upload } from 'lucide-react';
// import { productListingSchema } from '../../utils/hooks/ProductValidation';
// import { Field, Formik, Form, ErrorMessage } from 'formik';
// import toast from 'react-hot-toast';
// import { DatePicker } from '@nextui-org/react';
// import { useNavigate, useParams } from 'react-router-dom';
// import ImageEditModal from '../../components/Seller/EditImageComponent';

// const ProductEditForm: React.FC = () => {
//   const { productId } = useParams<{ productId: string }>();
//   const sellerId = useSelector((state: RootState) => state.Seller.sellerId);
//   const navigate = useNavigate();
//   const { data: productData, isLoading: isFetchingProduct } = useGetProductQuery(productId!);
//   const [editProduct, { isLoading: isEditProductLoading }] = useUpdateProductMutation();
//   const [previewSources, setPreviewSources] = useState<string[]>([]);
//   const [errMsg, setErrMsg] = useState('');
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [croppedImage, setCroppedImage] = useState<string | null>(null);

//   // Initial form values
//   const initialValues = {
//     itemTitle: '',
//     category: '',
//     description: '',
//     condition: '',
//     auctionFormat: '',
//     reservePrice: null,
//     shippingType: '',
//     shippingCost: null,
//     handlingTime: '',
//     returnPolicy: '',
//     auctionStartDateTime: null,
//     auctionEndDateTime: null,
//     images: [],
//   };

//   useEffect(() => {
//     if (productData) {
//       const {
//         itemTitle,
//         category,
//         description,
//         condition,
//         auctionFormat,
//         reservePrice,
//         shippingType,
//         shippingCost,
//         handlingTime,
//         returnPolicy,
//         auctionStartDateTime,
//         auctionEndDateTime,
//         images,
//       } = productData;

//       initialValues.itemTitle = itemTitle;
//       initialValues.category = category;
//       initialValues.description = description;
//       initialValues.condition = condition;
//       initialValues.auctionFormat = auctionFormat;
//       initialValues.reservePrice = reservePrice;
//       initialValues.shippingType = shippingType;
//       initialValues.shippingCost = shippingCost;
//       initialValues.handlingTime = handlingTime;
//       initialValues.returnPolicy = returnPolicy;
//       initialValues.auctionStartDateTime = auctionStartDateTime;
//       initialValues.auctionEndDateTime = auctionEndDateTime;
//       setPreviewSources(images); // Set preview sources based on images from fetched data
//     }
//   }, [productData]);

//   const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
//     const files = e.target.files;
//     if (files) {
//       const fileArray = Array.from(files);

//       // Generate base64 strings and previews
//       const previewPromises = fileArray.map((file) => {
//         return new Promise<string>((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onloadend = () => resolve(reader.result as string);
//           reader.onerror = reject;
//           reader.readAsDataURL(file);
//         });
//       });

//       Promise.all(previewPromises)
//         .then((previews) => {
//           setPreviewSources(previews);
//           setFieldValue('images', previews);
//         })
//         .catch(() => {
//           setErrMsg('Failed to read file(s).');
//         });
//     }
//   };

//   const handleRemoveImage = (index: number) => {
//     setPreviewSources((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleImageClick = (src: string) => {
//     setSelectedImage(src);
//     setModalOpen(true);
//   };

//   // const handleCropImage = (cropped: string | null) => {
//   //   if (cropped) {
//   //     setCroppedImage(cropped);
//   //     setPreviewSources((prev) =>
//   //       prev.map((image) => (image === selectedImage ? cropped : image))
//   //     );
//   //   }
//   //   setModalOpen(false);
//   // };

//   const handleSubmit = async (values: any) => {
//     try {
//       const dataToSend = { ...values, sellerId, productId }; // Include productId for editing
//       await editProduct(dataToSend).unwrap();
//       toast.success('Product listing updated successfully!');
//       setTimeout(() => {
//         navigate('/profile/seller/product-management');
//       }, 1000);
//       setErrMsg('');
//     } catch (err) {
//       console.error('Failed to submit product listing:', err);
//       toast.error('Failed to submit product listing.');
//     }
//   };

//   if (isFetchingProduct) {
//     return <div>Loading product details...</div>; // Loading state
//   }

//   return (
//     <div className="mt-10 p-5 shadow-md bg-white m-0">
//       <Formik
//         initialValues={initialValues}
//         validationSchema={productListingSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ setFieldValue, values }) => ( // Added `values` here
//           <Form>
//             {/* Item Details */}
//             <div className="border border-gray-300 p-4 bg-white rounded-md mb-8">
//               <h2 className="text-lg font-semibold mb-4">Item Details</h2>

//               <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
//                 <div className="w-full md:w-2/3">
//                   <label className="block text-gray-700 text-sm mb-2">Item Title:</label>
//                   <Field name="itemTitle">
//                     {({ field }: any) => (
//                       <input
//                         {...field}
//                         type="text"
//                         className="w-full p-2 border border-gray-300 rounded-md"
//                       />
//                     )}
//                   </Field>
//                   <ErrorMessage name="itemTitle" component="div" className="text-red-500" />
//                 </div>

//                 <div className="w-full md:w-1/3">
//                   <label className="block text-gray-700 text-sm mb-2">Category:</label>
//                   <Field
//                     as="select"
//                     name="category"
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                   >
//                     <option value="">Select a Category</option>
//                     <option value="art">Art</option>
//                     <option value="electronics">Electronics</option>
//                     <option value="antiques">Antiques</option>
//                   </Field>
//                   <ErrorMessage name="category" component="div" className="text-red-500" />
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm mb-2">Description:</label>
//                 <Field
//                   as="textarea"
//                   name="description"
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                   rows={4}
//                 />
//                 <ErrorMessage name="description" component="div" className="text-red-500" />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm mb-2">Condition:</label>
//                 <Field
//                   as="textarea"
//                   name="condition"
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                   rows={4}
//                 />
//                 <ErrorMessage name="condition" component="div" className="text-red-500" />
//               </div>

//               <div className="mb-4 flex flex-col md:flex-row">
//                 {/* Upload box and preview side by side */}
//                 <div className="w-full md:w-1/2 mr-4">
//                   <label className="block text-gray-700 text-sm mb-2">Images:</label>
//                   <div className="flex items-center justify-start w-full">
//                     <label
//                       htmlFor="dropzone-file"
//                       className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
//                     >
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <Upload className="mb-3 h-10 w-10 text-gray-400" />
//                         <p className="mb-2 text-sm text-gray-500">
//                           <span className="font-semibold">Click to upload</span> or drag and drop
//                         </p>
//                         <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
//                       </div>
//                       <input
//                         id="dropzone-file"
//                         type="file"
//                         multiple
//                         accept="image/*"
//                         onChange={(e) => handleFileInputChange(e, setFieldValue)}
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                   {errMsg && <div className="text-red-500">{errMsg}</div>}
//                 </div>
//                 <div className="w-full md:w-1/2">
//                   <h3 className="text-md font-semibold mb-2">Image Preview:</h3>
//                   <div className="grid grid-cols-2 gap-2">
//                     {previewSources.map((src, index) => (
//                       <div key={index} className="relative">
//                         <img
//                           src={src}
//                           alt={`Preview ${index}`}
//                           className="h-32 w-full object-cover rounded-md cursor-pointer"
//                           onClick={() => handleImageClick(src)}
//                         />
//                         <button
//                           type="button"
//                           className="absolute top-1 right-1 text-red-500"
//                           onClick={() => handleRemoveImage(index)}
//                         >
//                           &times;
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Auction Details */}
//             <div className="border border-gray-300 p-4 bg-white rounded-md mb-8">
//               <h2 className="text-lg font-semibold mb-4">Auction Details</h2>

//               <div className="mb-4 flex flex-col md:flex-row items-start gap-4">
//                 <div className="w-full md:w-1/3">
//                   <label className="block text-gray-700 text-sm mb-2">Auction Format:</label>
//                   <Field as="select" name="auctionFormat" className="w-full p-2 border border-gray-300 rounded-md">
//                     <option value="">Select Format</option>
//                     <option value="auction">Auction</option>
//                     <option value="buy-it-now">Buy It Now</option>
//                   </Field>
//                   <ErrorMessage name="auctionFormat" component="div" className="text-red-500" />
//                 </div>

//                 {values.auctionFormat === 'auction' && ( // Ensure `values` is correctly used here
//                   <>
//                     <div className="w-full md:w-1/3">
//                       <label className="block text-gray-700 text-sm mb-2">Reserve Price:</label>
//                       <Field
//                         name="reservePrice"
//                         type="number"
//                         className="w-full p-2 border border-gray-300 rounded-md"
//                       />
//                       <ErrorMessage name="reservePrice" component="div" className="text-red-500" />
//                     </div>

//                     <div className="w-full md:w-1/3">
//                       <label className="block text-gray-700 text-sm mb-2">Auction Start:</label>
//                       <DatePicker
//                         onChange={(date) => setFieldValue('auctionStartDateTime', date)}
//                         className="w-full p-2 border border-gray-300 rounded-md"
//                       />
//                       <ErrorMessage name="auctionStartDateTime" component="div" className="text-red-500" />
//                     </div>

//                     <div className="w-full md:w-1/3">
//                       <label className="block text-gray-700 text-sm mb-2">Auction End:</label>
//                       <DatePicker
//                         onChange={(date) => setFieldValue('auctionEndDateTime', date)}
//                         className="w-full p-2 border border-gray-300 rounded-md"
//                       />
//                       <ErrorMessage name="auctionEndDateTime" component="div" className="text-red-500" />
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Shipping Details */}
//             <div className="border border-gray-300 p-4 bg-white rounded-md mb-8">
//               <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>

//               <div className="mb-4 flex flex-col md:flex-row items-start gap-4">
//                 <div className="w-full md:w-1/3">
//                   <label className="block text-gray-700 text-sm mb-2">Shipping Type:</label>
//                   <Field as="select" name="shippingType" className="w-full p-2 border border-gray-300 rounded-md">
//                     <option value="">Select Shipping Type</option>
//                     <option value="standard">Standard</option>
//                     <option value="express">Express</option>
//                   </Field>
//                   <ErrorMessage name="shippingType" component="div" className="text-red-500" />
//                 </div>

//                 <div className="w-full md:w-1/3">
//                   <label className="block text-gray-700 text-sm mb-2">Shipping Cost:</label>
//                   <Field
//                     name="shippingCost"
//                     type="number"
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                   />
//                   <ErrorMessage name="shippingCost" component="div" className="text-red-500" />
//                 </div>

//                 <div className="w-full md:w-1/3">
//                   <label className="block text-gray-700 text-sm mb-2">Handling Time:</label>
//                   <Field
//                     name="handlingTime"
//                     type="text"
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                   />
//                   <ErrorMessage name="handlingTime" component="div" className="text-red-500" />
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm mb-2">Return Policy:</label>
//                 <Field
//                   as="textarea"
//                   name="returnPolicy"
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                   rows={4}
//                 />
//                 <ErrorMessage name="returnPolicy" component="div" className="text-red-500" />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//                 disabled={isEditProductLoading}
//               >
//                 {isEditProductLoading ? 'Updating...' : 'Update Product'}
//               </button>
//             </div>

//             {/* Image Cropper Modal */}
//             {/* <ImageEditModal
//               isOpen={isModalOpen}
//               onClose={() => setModalOpen(false)}
//               onCrop={handleCropImage}
//               selectedImage={selectedImage}
//             /> */}
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default ProductEditForm;
