import * as Yup from 'yup';

export const productListingSchema = Yup.object().shape({
  itemTitle: Yup.string()
    .max(80, 'Title cannot exceed 80 characters')
    .required('Item Title is required'),  categoryId: Yup.string().required('Category is required'),
  description: Yup.string().required('Description is required'),
  condition: Yup.string().required('Condition is required'),
  auctionFormat: Yup.string().required('Auction Format is required'),

  // Simple if-else check for reservePrice based on auctionFormat
  reservePrice: Yup.number()
    .nullable()
    .test('is-required', 'Reserve Price is required', function (value:any) {
      const auctionFormat = this.parent.auctionFormat;
      if (auctionFormat === 'buy-it-now') {
        return value !== undefined && value > 0;
      }
      return true;
    }),

  shippingType: Yup.string().required('Shipping Type is required'),
  shippingCost: Yup.number()
    .required('Shipping Cost is required')
    .positive('Shipping Cost must be a positive number'),
  handlingTime: Yup.string().required('Handling Time is required'),
  // returnPolicy: Yup.string().required('Return Policy is required'),
  images: Yup.array()
    .min(5, 'At least 5 images are required')
    .max(5, 'No more than 5 images allowed'),
  // Simple if-else check for auction dates based on auctionFormat
  auctionStartDateTime: Yup.date()
    .nullable()
    .test('is-required', 'Start date is required', function (value) {
      const auctionFormat = this.parent.auctionFormat;
      if (auctionFormat === 'auction') {
        return value !== null;
      }
      return true; 
    }),

  auctionEndDateTime: Yup.date()
    .nullable()
    .test('is-required', 'End date is required', function (value:any) {
      const auctionFormat = this.parent.auctionFormat;
      const auctionStartDateTime = this.parent.auctionStartDateTime;
      if (auctionFormat === 'auction') {
        return value !== null && value > auctionStartDateTime;
      }
      return true; 
    }),
  });


  // import * as Yup from 'yup';

  // export const productListingSchema = Yup.object().shape({
  //   itemTitle: Yup.string().required('Item Title is required'),
  //   category: Yup.string().required('Category is required'),
  //   description: Yup.string().required('Description is required'),
  //   condition: Yup.string().required('Condition is required'),
  //   auctionFormat: Yup.string().required('Auction Format is required'),
    
  //   reservePrice: Yup.number().when('auctionFormat', {
  //     is: 'buy-it-now',
  //     then: (schema) => schema.required('Reserve Price is required for buy-it-now format'),
  //   }),

  //   shippingType: Yup.string().required('Shipping Type is required'),
  //   shippingCost: Yup.number().required('Shipping Cost is required'),
  //   handlingTime: Yup.string().required('Handling Time is required'),
  //   returnPolicy: Yup.string().required('Return Policy is required'),
  //   images: Yup.array().min(1, 'At least one image is required'),

  //   auctionStartDateTime: Yup.date().when('auctionFormat', {
  //     is: 'auction',
  //     then: (schema) => schema.required('Start date is required for auction format'),
  //   }),

  //   auctionEndDateTime: Yup.date().when('auctionFormat', {
  //     is: 'auction',
  //     then: (schema) => schema.required('End date is required for auction format'),
  //   }),
  // });
