import React, { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useForgetPasswordMutation } from '../../services/apis/userApi';
import toast from 'react-hot-toast';
import {  useNavigate, useParams } from 'react-router-dom';
const ForgetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], "Passwords don't match")
    .required('Required'),
});

const ForgetPassword = () => {
  const [status, setStatus] = useState<{ error?: string; success?: string }>({});
  const { token } = useParams();
  const [forgetPassword] = useForgetPasswordMutation();
const navigate = useNavigate()

  const handleSubmit = async (values: { newPassword: string }, { setSubmitting }: any) => {
    if (token) {
      try {
        console.log('his is befor the submit')
        const response = await forgetPassword({
          token,
          newPassword: values.newPassword,
        }).unwrap();
        console.log('API response:', response); 
        setStatus({ success: "Password reset successful!" });
        toast.success('Password change successful');
      navigate('/registration')
      } catch (error) {
        setStatus({ error: "Failed to reset password. Please try again." });
        toast.error('Password reset failed');
      } finally {
        setSubmitting(false);
      }
    } else {
      setStatus({ error: "No valid token found." });
      setSubmitting(false);
    }
  };
  

  return (
    <Formik
      initialValues={{
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={ForgetPasswordSchema}
      onSubmit={handleSubmit}    >
      {(formik) => {
        return (
          <form onSubmit={formik.handleSubmit} className="w-full max-w-md mx-auto p-4 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

            {/* New Password Field */}
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-2">
                New Password:
              </label>
              <Field
                type="password"
                id="newPassword"
                name="newPassword"
                className="w-full px-3 py-2 border rounded-md"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">
                Confirm New Password:
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-3 py-2 border rounded-md"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Success/Error Messages */}
            {status?.error && (
              <div className="text-red-500 text-sm mb-4">{status.error}</div>
            )}

            {status?.success && (
              <div className="text-green-500 text-sm mb-4">{status.success}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-black text-white px-2 py-2 rounded-md hover:bg-gray-700"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Submitting...' : 'Submit'}
            </button>

            {/* Show global error */}
            {status?.error && (
              <div className="text-red-500 text-sm mt-4">
                {status.error || 'An error occurred.'}
              </div>
            )}
          </form>
        );
      }}
    </Formik>
  );
};

export default ForgetPassword;


