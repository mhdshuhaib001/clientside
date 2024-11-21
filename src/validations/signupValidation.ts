import * as Yup from 'yup';

const SignupValidation = (isOtpStep: boolean) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .required('Password is required'),
    otp: Yup.string().test('otp-required', 'OTP is required', function (value) {
      return !isOtpStep || (!!value && value.length > 0);
    }),
  });

  return { validationSchema };
};

export default SignupValidation;
