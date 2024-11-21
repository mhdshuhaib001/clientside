import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import SignupValidation from '../../validations/signupValidation';
import { useSignupMutation, useSendOtpMutation } from '../../services/apis/userApi';
import { AuthResponse } from '../../interface/userTypes/apiTypes';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import OtpForm from './OtpForm';

const SignupForm: React.FC<{
  onSignup: (data: AuthResponse) => void;
  isOtpStep: boolean;
  setIsOtpStep: (step: boolean) => void;
}> = ({ onSignup, setIsOtpStep, isOtpStep }) => {
  const { validationSchema } = SignupValidation(isOtpStep);
  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();
  const [sendOtp, { isLoading: isOtpLoading }] = useSendOtpMutation();
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [passwordStrength, setPasswordStrength] = useState({
    hasUppercase: false,
    hasSpecialChar: false,
    isLongEnough: false,
  });
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isOtpResendAllowed, setIsOtpResendAllowed] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;

    if (isOtpStep && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setIsOtpResendAllowed(true);
            clearInterval(intervalId);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      setIsOtpResendAllowed(false);
      if (intervalId) clearInterval(intervalId);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isOtpStep, timer]);

  const handlePasswordChange = (password: string) => {
    setPasswordStrength({
      hasUppercase: /[A-Z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      isLongEnough: password.length >= 8,
    }); 
    setShowPasswordStrength(password.length > 0);
  };

  const handleSendOtp = async (email: string) => {
    try {
      await sendOtp({ email, otp: 0 }).unwrap();
      setIsOtpStep(true);
      setTimer(60);
      setFormError(null);
    } catch (err: any) {
      console.error('Failed to send OTP:', err);
      if (err && err.data && err.data.message) {
        toast.error(err.data.message);
      }
    }
  };

  const handleResendOtp = async (email: string) => {
    try {
      await sendOtp({ email, otp: 0 }).unwrap();
      toast.success('OTP resent successfully!');
      setTimer(60);
    } catch (err: any) {
      console.error('Failed to resend OTP:', err);
      if (err.data.message) {
        toast.error(err.data.message);
      }
    }
  };

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
    otp?: string;
  }) => {
    if (isOtpStep) {
      try {
        const result = await signup(values).unwrap();
        onSignup(result as AuthResponse);
        navigate('/');
        setFormError(null);
      } catch (err: any) {
        console.error('Signup failed:', err);
        setFormError(err.data.message || 'Signup failed');
      }
    } else {
      handleSendOtp(values.email);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        otp: '',
        isOtpStep: false,
      }}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleChange, values }) => (
        <Form>
          {!isOtpStep ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name && touched.name ? 'border-red-500' : ''}`}
                />
                <ErrorMessage name="name" component="p" className="text-red-500 text-xs italic" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email && touched.email ? 'border-red-500' : ''}`}
                />
                <ErrorMessage name="email" component="p" className="text-red-500 text-xs italic" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <Field
                  type={showPassword ? 'text':'password'}
                  id="password"
                  name="password"
                  placeholder="Your password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    handlePasswordChange(e.target.value);
                  }}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password && touched.password ? 'border-red-500' : ''}`}
                />

                <button onClick={()=>setShowPassword(!showPassword)} className='absolute right-2 top-3 text-gray-600'>{showPassword ? 'Hide':'Show'}</button>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-xs italic"
                />

                {showPasswordStrength && (
                  <div className="mt-2">
                    <p
                      className={`text-xs ${passwordStrength.isLongEnough ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {passwordStrength.isLongEnough ? '✓' : '✗'} At least 8 characters
                    </p>
                    <p
                      className={`text-xs ${passwordStrength.hasUppercase ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {passwordStrength.hasUppercase ? '✓' : '✗'} One uppercase letter
                    </p>
                    <p
                      className={`text-xs ${passwordStrength.hasSpecialChar ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {passwordStrength.hasSpecialChar ? '✓' : '✗'} One special character
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <OtpForm
              errors={errors}
              touched={touched}
              timer={timer}
              handleResendOtp={() => handleResendOtp(values.email)}
              isOtpLoading={isOtpLoading}
            />
          )}
          {formError && <div className="text-red-500 text-xs italic mb-4">{formError}</div>}

          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className={`w-full bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center ${isOtpLoading || isSignupLoading || isOtpResendAllowed ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isOtpLoading || isSignupLoading || isOtpResendAllowed}
            >
              {isOtpLoading || isSignupLoading ? (
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
                  signup...
                </span>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
