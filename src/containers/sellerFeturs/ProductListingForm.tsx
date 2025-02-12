import React, { useState, ChangeEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { useAddProductMutation, useUpdateProductMutation } from '../../services/apis/sellerApi';
import { Upload } from 'lucide-react';
import { productListingSchema } from '../../utils/hooks/ProductValidation';
import { Field, Formik, Form, ErrorMessage, FieldProps } from 'formik';
import toast from 'react-hot-toast';
import { DatePicker } from '@nextui-org/react';
import {
  CalendarDate,
  CalendarDateTime,
  ZonedDateTime,
  getLocalTimeZone,
  today,
} from '@internationalized/date';
import { useNavigate, useParams } from 'react-router-dom';
import ImageEditModal from '../../components/Seller/EditImageComponent';
import { useFetchCategoriesQuery } from '../../services/apis/userApi';
import { useGetProductQuery } from '../../services/apis/productApi';

interface FormValues {
  itemTitle: string;
  categoryId: string;
  description: string;
  condition: string;
  auctionFormat: string;
  reservePrice: string;
  shippingType: string;
  shippingCost: string;
  handlingTime: string;
  auctionStartDateTime: any;
  auctionEndDateTime: any;
  images: File[];
}

const ProductListingForm: React.FC = () => {
  const { productId } = useParams<{ productId?: string }>();

  const { data: productDetails } = useGetProductQuery(productId, {
    skip: !productId,
  });
  console.log(productDetails, 'this si the productDetails');
  const { data: categories } = useFetchCategoriesQuery();
  const sellerId = useSelector((state: RootState) => state.Seller.sellerId);
  const [auctionFormat, setAuctionFormat] = useState('');
  const navigate = useNavigate();
  const [addProduct, { isLoading: isAddProductLoading }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdateProductLoading }] = useUpdateProductMutation();
  const [previewSource, setPreviewSource] = useState<string[]>([]);
  // const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  // const [errMsg, setErrMsg] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  // const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [initialValues, setInitialValue] = useState<FormValues>({
    itemTitle: '',
    categoryId: '',
    description: '',
    condition: '',
    auctionFormat: '',
    reservePrice: '',
    shippingType: '',
    shippingCost: '',
    handlingTime: '',
    auctionStartDateTime: null,
    auctionEndDateTime: null,
    images: [],
  });
  
  const compareDates = (date1: CalendarDateTime, date2: CalendarDateTime): number => {
    if (date1.year !== date2.year) return date1.year - date2.year;
    if (date1.month !== date2.month) return date1.month - date2.month;
    if (date1.day !== date2.day) return date1.day - date2.day;
    if (date1.hour !== date2.hour) return date1.hour - date2.hour;
    if (date1.minute !== date2.minute) return date1.minute - date2.minute;
    return date1.second - date2.second;
  };

  const handleStartDateChange = (
    date: CalendarDate | CalendarDateTime | ZonedDateTime | null,
    field: FieldProps['field'],
  ) => {
    if (date) {
      field.onChange({
        target: {
          name: field.name,
          value:
            date instanceof CalendarDateTime
              ? date
              : new CalendarDateTime(date.year, date.month, date.day, 0, 0, 0),
        },
      });
    }
  };

  const handleEndDateChange = (
    date: CalendarDate | CalendarDateTime | ZonedDateTime | null,
    field: FieldProps['field'],
  ) => {
    if (date) {
      field.onChange({
        target: {
          name: field.name,
          value:
            date instanceof CalendarDateTime
              ? date
              : new CalendarDateTime(date.year, date.month, date.day, 0, 0, 0),
        },
      });
    }
  };

  useEffect(() => {
    if (!productDetails) {
      return;
    }

    // Extract image URLs from productDetails
    const imageUrls: string[] = productDetails.images.filter(
      (image: any): image is string => typeof image === 'string',
    );
    setPreviewSource(imageUrls);

    const initialData: FormValues = {
      itemTitle: productDetails.itemTitle || '',
      categoryId: productDetails.categoryId || productDetails.category || '',
      description: productDetails.description || '',
      condition: productDetails.condition || '',
      auctionFormat: productDetails.auctionFormat || '',
      reservePrice: productDetails.reservePrice?.toString() || '',
      shippingType: productDetails.shippingType || '',
      shippingCost: productDetails.shippingCost?.toString() || '',
      handlingTime: productDetails.handlingTime || '',
      auctionStartDateTime:
        productDetails.auctionStartDateTime &&
        new CalendarDateTime(
          new Date(productDetails.auctionStartDateTime).getUTCFullYear(),
          new Date(productDetails.auctionStartDateTime).getUTCMonth() + 1,
          new Date(productDetails.auctionStartDateTime).getUTCDate(),
          new Date(productDetails.auctionStartDateTime).getUTCHours(),
          new Date(productDetails.auctionStartDateTime).getUTCMinutes(),
          new Date(productDetails.auctionStartDateTime).getUTCSeconds(),
        ),
      auctionEndDateTime:
        productDetails.auctionEndDateTime &&
        new CalendarDateTime(
          new Date(productDetails.auctionEndDateTime).getUTCFullYear(),
          new Date(productDetails.auctionEndDateTime).getUTCMonth() + 1,
          new Date(productDetails.auctionEndDateTime).getUTCDate(),
          new Date(productDetails.auctionEndDateTime).getUTCHours(),
          new Date(productDetails.auctionEndDateTime).getUTCMinutes(),
          new Date(productDetails.auctionEndDateTime).getUTCSeconds(),
        ),
      images: [],
    };

    setInitialValue(initialData);
  }, [productDetails]);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    const files = e.target.files;
    if (files) {
      const newFilesArray: File[] = Array.from(files);
      const newUrls: string[] = newFilesArray.map((file) => URL.createObjectURL(file));

      setPreviewSource((prev) => [...prev, ...newUrls]);
      setFieldValue('images', newFilesArray);
    }
  };

  const handleRemoveImage = (index: number) => {
    setPreviewSource((prev: any) => prev.filter((_: any, i: number) => i !== index));
  };

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setModalOpen(true);
  };

  const handleCropImage = (cropped: string | null) => {
    if (cropped) {
      // setCroppedImage(cropped);
      setPreviewSource((prev: any) =>
        prev.map((image: string | null) => (image === selectedImage ? cropped : image)),
      );
    }
    setModalOpen(false);
  };

  const handleSubmit = async (values: FormValues) => {
    console.log('Submitting form with values:', values);

    try {
      if (values.auctionFormat === 'auction') {
        if (!values.auctionStartDateTime || !values.auctionEndDateTime) {
          toast.error('Please select both start and end dates.');
          return;
        }
        if (compareDates(values.auctionEndDateTime, values.auctionStartDateTime) <= 0) {
          toast.error('End date must be after start date.');
          return;
        }
      }
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key === 'images' && Array.isArray(value)) {
          value.forEach((file) => formData.append('images', file));
        } else if (key === 'auctionStartDateTime' || key === 'auctionEndDateTime') {
          if (value) {
            const dateTimeString = `${value.year}-${String(value.month).padStart(2, '0')}-${String(value.day).padStart(2, '0')}T${String(value.hour).padStart(2, '0')}:${String(value.minute).padStart(2, '0')}:${String(value.second).padStart(2, '0')}`;
            formData.append(key, dateTimeString);
          }
        } else {
          formData.append(key, value);
        }
      });
      formData.append('sellerId', sellerId);
      if (productId) {
        formData.append('productId', productId);
        await updateProduct({ productId, formData }).unwrap();
        toast.success('Product updated successfully!');
        toast.success('Product updated successfully!');
      } else {
        await addProduct(formData).unwrap();
        toast.success('Product listing submitted successfully!');
      }

      setTimeout(() => {
        navigate('/profile/seller/product-management');
      }, 1000);
    } catch (err) {
      console.error('Failed to submit product listing:', err);
      toast.error('Failed to submit product listing.');
    }
  };

  return (
    <div className="mt-10 p-5 shadow-md bg-white m-0">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Pro Seller Tips</h3>
        <ul className="list-disc list-inside text-blue-700 text-sm">
          <li>A compelling title increases visibility by 50%</li>
          <li>High-quality images can boost buyer interest</li>
          <li>Detailed descriptions build trust with potential buyers</li>
        </ul>
      </div>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={productListingSchema}
        onSubmit={(values) => {
          console.log('Formik onSubmit triggered');
          handleSubmit(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            {/* Item Details */}
            <div className="border border-gray-300 p-4 bg-white rounded-md mb-8">
              <h2 className="text-lg font-semibold mb-4">Item Details</h2>

              <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
                <div className="w-full md:w-2/3">
                  <label className="block text-gray-700 text-sm mb-2">Item Title:</label>
                  <Field name="itemTitle">
                    {({ field }: { field: any }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          💡 Tip: Include brand, key features, and condition
                        </p>
                      </>
                    )}
                  </Field>
                  <ErrorMessage name="itemTitle" component="div" className="text-red-500" />
                </div>

                <div className="w-full md:w-1/3">
                  <label className="block text-gray-700 text-sm mb-2">Category:</label>
                  <Field
                    as="select"
                    name="categoryId"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select a Category</option>
                    {categories?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="category" component="div" className="text-red-500" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2">Description:</label>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={4}
                />
                <ErrorMessage name="description" component="div" className="text-red-500" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2">Condition:</label>
                <Field
                  as="textarea"
                  name="condition"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={4}
                />
                <ErrorMessage name="condition" component="div" className="text-red-500" />
              </div>

              <div className="mb-4 flex flex-col md:flex-row">
                {/* Upload box and preview side by side */}
                <div className="w-full md:w-1/2 mr-4">
                  <label className="block text-gray-700 text-sm mb-2">Images:</label>
                  <div className="flex items-center justify-start w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-400" size={48} />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        name="images"
                        multiple
                        aria-label="Upload product images"
                        onChange={(e) => handleFileInputChange(e, setFieldValue)}
                      />
                    </label>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    Upload images by clicking or dragging files here.
                  </p>
                </div>

                {/* Preview section next to upload */}
                <div className="w-full md:w-1/2 flex flex-wrap gap-4 mt-4 md:mt-0">
                  {previewSource.length > 0 ? (
                    previewSource.map((preview: string, index: number) => (
                      <div
                        key={index}
                        className="relative w-44 h-44 cursor-pointer"
                        onClick={() => handleImageClick(preview)}
                      >
                        <img
                          src={preview}
                          alt={`Image preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-md"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(index);
                          }}
                          className="absolute top-0 right-0 text-black rounded-full p-1 bg-white shadow"
                          title="Remove image"
                        >
                          &times;
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No images available for preview.</p>
                  )}
                </div>
              </div>
            </div>
            {/* Auction Details */}
            <div className="border border-gray-300 p-4 bg-white rounded-md mb-8">
              <h2 className="text-lg font-semibold mb-4">Auction Details</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mb-4">
                <h4 className="font-semibold text-yellow-800 mb-2">🏆 Auction Strategy</h4>
                <p className="text-yellow-700 text-sm">
                  Choose wisely: • Auction: Creates excitement and potential for higher prices • Buy
                  It Now: Guarantees a sale at your set price
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2">Auction Format:</label>
                    <Field
                      as="select"
                      name="auctionFormat"
                      aria-label="Select auction format"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={auctionFormat || ''}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        const selectedValue = e.target.value as 'auction' | 'buy-it-now';
                        setAuctionFormat(selectedValue);
                        setFieldValue('auctionFormat', selectedValue);
                        if (selectedValue === 'buy-it-now') {
                          setFieldValue('auctionStartDateTime', null);
                          setFieldValue('auctionEndDateTime', null);
                        }
                      }}
                    >
                      <option value="">Select Auction Format</option>
                      <option value="auction">Auction</option>
                      <option value="buy-it-now">Buy It Now</option>
                    </Field>

                    <ErrorMessage name="auctionFormat" component="div" className="text-red-500" />
                  </div>

                  {auctionFormat === 'auction' && (
                    <div className="mb-4 space-y-4">
                      <div>
                        <label id="start-date-label" className="block text-gray-700 text-sm mb-2">
                          Auction Start Date & Time:
                        </label>
                        <Field name="auctionStartDateTime">
                          {({ field }: FieldProps) => (
                            <DatePicker
                              className="w-full"
                              value={field.value}
                              onChange={(date) => handleStartDateChange(date, field)}
                              isRequired
                              hideTimeZone
                              aria-labelledby="start-date-label"
                              aria-label="Select auction start date and time"
                              minValue={today(getLocalTimeZone())}
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="auctionStartDateTime"
                          component="div"
                          className="text-red-500"
                        />
                      </div>

                      <div>
                        <label id="end-date-label" className="block text-gray-700 text-sm mb-2">
                          Auction End Date & Time:
                        </label>
                        <Field name="auctionEndDateTime">
                          {({ field }: FieldProps) => (
                            <DatePicker
                              className="w-full"
                              value={field.value}
                              onChange={(date) => handleEndDateChange(date, field)}
                              isRequired
                              minValue={today(getLocalTimeZone())}
                              aria-labelledby="end-date-label"
                              aria-label="Select auction end date and time"
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="auctionEndDateTime"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>
                  )}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2">Reserve Price:</label>
                    <Field
                      name="reservePrice"
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="reservePrice" component="div" className="text-red-500" />
                  </div>
                </div>

                {/* Summary Area on the right */}
                {/* <div className="md:col-span-1 flex justify-center mt-6">
                  <div className="w-80 h-40 p-3 border border-gray-300 rounded-md bg-gray-50 flex flex-col justify-center items-start">
                    <h3 className="text-lg font-semibold mb-2">Auction Summary</h3>
                    <p className="mb-1">
                      <strong>Auction Format:</strong>{' '}
                      {auctionFormat ? auctionFormat.replace('-', ' ') : 'Not selected'}
                    </p>
                    {auctionFormat === 'auction' ? (
                      <>
                        <p className="mb-1">
                          <strong>Start:</strong>{' '}
                          <Field name="auctionStartDateTime" component="span" />
                        </p>
                        <p className="mb-1">
                          <strong>Duration:</strong>{' '}
                          <Field name="auctionDuration" component="span" />
                        </p>
                      </>
                    ) : (
                      <p className="mb-1 text-gray-500">Buy It Now.</p>
                    )}
                    <p className="mb-1">
                      <strong>Reserve:</strong> <Field name="reservePrice" component="span" />
                    </p>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Shipping Details */}
            <div className="border border-gray-300 p-4 bg-white rounded-md mb-8">
              <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm mb-2">Shipping Type:</label>
                  <Field
                    as="select"
                    name="shippingType"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Shipping Type</option>
                    <option value="standard">Standard</option>
                    <option value="expedited">Expedited</option>
                  </Field>
                  <ErrorMessage name="shippingType" component="div" className="text-red-500" />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm mb-2">Shipping Cost:</label>
                  <Field
                    name="shippingCost"
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="shippingCost" component="div" className="text-red-500" />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm mb-2">Handling Time:</label>
                  <Field
                    as="select"
                    name="handlingTime"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Handling Time</option>
                    <option value="immediate">Immediate</option>
                    <option value="3_business_days">3 Business Days</option>
                    <option value="standard">Standard</option>
                  </Field>
                  <ErrorMessage name="handlingTime" component="div" className="text-red-500" />
                </div>

                {/* <div className="mb-4">
                  <label className="block text-gray-700 text-sm mb-2">Return Policy:</label>
                  <Field
                    as="select"
                    name="returnPolicy"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Return Policy</option>
                    <option value="5_days">5 Days</option>
                    <option value="10_days">10 Days</option>
                    <option value="14_days">14 Days</option>
                  </Field>
                  <ErrorMessage name="returnPolicy" component="div" className="text-red-500" />
                </div> */}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className={`w-full bg-gray-900 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center ${isAddProductLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                // disabled={isAddProductLoading}
              >
                {isAddProductLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12c0-4.418 3.582-8 8-8 1.516 0 2.934.447 4.118 1.207L15.118 8.82A6.001 6.001 0 0012 6c-3.314 0-6 2.686-6 6 0 1.172.373 2.253.936 3.177l-1.103 1.372A7.958 7.958 0 014 12z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ImageEditModal
        imageSrc={selectedImage}
        isOpen={isModalOpen}
        onClose={() => {
          setSelectedImage(null);
          setModalOpen(false);
        }}
        onCropped={handleCropImage}
      />
    </div>
  );
};

export default ProductListingForm;
