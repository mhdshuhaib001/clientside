// import * as Yup from 'yup';

// export const categoryValidationSchema = (isEditMode: boolean) => 
//   Yup.object().shape({
//     name: Yup.string().required('Category name is required'),
//     image: isEditMode 
//       ? Yup.mixed().test('required', 'Category image is required', function (value) {
//           const { createError } = this; // Access the createError method
//           // Allow existing images or ensure a new image is uploaded
//           return (
//             value || // New image is provided
//             this.parent.imageUrl || // Existing image URL is available
//             createError({ message: 'Category image is required' }) // Error if neither is present
//           );
//         })
//       : Yup.mixed().required('Category image is required'), // Required when adding a new category
//     icon: Yup.mixed().nullable(), // Modify this based on your requirements
//   });


import * as Yup from 'yup';

export const categoryValidationSchema = () => 
  Yup.object().shape({
    name: Yup.string().required('Category name is required'),
    image: Yup.mixed().nullable(), 
    icon: Yup.mixed().nullable(),
  });
