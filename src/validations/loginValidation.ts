import * as Yup from 'yup';

export const LoginValidation = () => {
  const loginValidationScema = Yup.object({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Password must be exactly 8 characters long')
      .required('Required'),
  });

  return { loginValidationScema };
};
