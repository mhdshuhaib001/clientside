import * as Yup from 'yup';
import { CalendarDateTime } from '@internationalized/date';

export const productListingSchema = Yup.object().shape({
  itemTitle: Yup.string()
    .max(80, 'Title cannot exceed 80 characters')
    .required('Item Title is required'),
  
  categoryId: Yup.string()
    .required('Category is required'),
  
  description: Yup.string()
    .required('Description is required'),
  
  condition: Yup.string()
    .required('Condition is required'),
  
  auctionFormat: Yup.string()
    .oneOf(['auction', 'buy-it-now'], 'Invalid auction format')
    .required('Auction Format is required'),
  
  reservePrice: Yup.string()
    .test('is-valid-price', 'Reserve Price must be a valid number', function(value) {
      if (!value) return true;
      const number = Number(value);
      return !isNaN(number);
    })
    .test('is-required-for-buy-it-now', 'Reserve Price is required for Buy It Now', function(value) {
      const { auctionFormat } = this.parent;
      if (auctionFormat === 'buy-it-now') {
        return Boolean(value) && Number(value) > 0;
      }
      return true;
    }),
  
  shippingType: Yup.string()
    .required('Shipping Type is required'),
  
  shippingCost: Yup.string()
    .required('Shipping Cost is required')
    .test('is-valid-cost', 'Shipping Cost must be a valid number', function(value) {
      if (!value) return true;
      const number = Number(value);
      return !isNaN(number) && number >= 0;
    }),
  
  handlingTime: Yup.string()
    .required('Handling Time is required'),
  
  images: Yup.array()
    .min(1, 'At least one image is required')
    .max(5, 'Maximum 5 images allowed'),
  
  auctionStartDateTime: Yup.mixed()
    .test('is-required-for-auction', 'Start date is required for auction', function(value) {
      const { auctionFormat } = this.parent;
      if (auctionFormat === 'auction') {
        return value instanceof CalendarDateTime;
      }
      return true;
    }),
  
  auctionEndDateTime: Yup.mixed()
    .test('is-required-for-auction', 'End date is required for auction', function(value) {
      const { auctionFormat } = this.parent;
      if (auctionFormat === 'auction') {
        return value instanceof CalendarDateTime;
      }
      return true;
    })
    .test('is-after-start', 'End date must be after start date', function(value) {
      const { auctionFormat, auctionStartDateTime } = this.parent;
      if (auctionFormat === 'auction' && value instanceof CalendarDateTime && auctionStartDateTime instanceof CalendarDateTime) {
        return value.compare(auctionStartDateTime) > 0;
      }
      return true;
    })
});
