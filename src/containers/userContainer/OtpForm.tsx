import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface OtpFormProps {
  errors: any;
  touched: any;
  timer: number;
  handleResendOtp: () => void;
  isOtpLoading: boolean;
}

const OtpForm: React.FC<OtpFormProps> = ({
  errors,
  touched,
  timer,
  handleResendOtp,
 
}) => {
  return (
    <>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-sans  mb-2"
          htmlFor="otp"
        >
          Otp Send to your email check now
        </label>
        <Field name="otp">
          {({ field, form }: { field: any; form: any }) => (
            <input
              id="otp"
              {...field}
              placeholder="Enter OTP"
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                // Allow only numeric values
                if (/^[0-9]*$/.test(e.target.value)) {
                  form.setFieldValue(field.name, e.target.value);
                }
              }}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.otp && touched.otp ? 'border-red-500' : ''}`}
            />
          )}
        </Field>

        <ErrorMessage
          name="otp"
          component="p"
          className="text-red-500 text-xs italic"
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        {timer > 0 ? (
          <p className="text-gray-500 text-sm">
            Resend OTP in {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}
            {timer % 60}
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResendOtp}
            className={`text-blue-500 hover:underline`}
          >
            Resend OTP
          </button>
        )}
      </div>
    </>
  );
};

export default OtpForm;
