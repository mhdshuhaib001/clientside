import React, { useState } from 'react';
import { useAddReportMutation } from '../../services/apis/adminApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import toast from 'react-hot-toast';
interface ReportFormProps {
  onClose: () => void;
  sellerId: string | undefined;
}

export const ReportForm: React.FC<ReportFormProps> = ({ onClose, sellerId }) => {
  const [reportReason, setReportReason] = useState<string>('');
  const [additionalDetails, setAdditionalDetails] = useState<string>('');
  const [addReport] = useAddReportMutation();
  const userId = useSelector((state: RootState) => state.User._id);
  const handleReportSeller = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addReport({
        reason: reportReason,
        details: additionalDetails,
        reportedBy: userId,
        sellerId,
      }).unwrap();

      toast.success('Report added successfully');
      console.log('Report submitted successfully:', response);
      onClose();
    } catch (error: any) {
      console.error('Failed to submit report:', error);

      if (error?.data?.message === 'Access denied: No valid authorization token provided') {
        toast.error('You dont have accsess');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleReportSeller}>
      <div className="mb-4">
        <label htmlFor="reportReason" className="block text-sm font-medium text-gray-700 mb-1">
          Reason for Report
        </label>
        <div className="overflow-y-auto max-h-24">
          <select
            id="reportReason"
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-100 hover:bg-amber-50"
          >
            <option value="">Select a reason</option>
            <option>Counterfeit or Fake Item</option>
            <option>Misleading or Inaccurate Description</option>
            <option>Unresponsive or Poor Communication</option>
            <option>Unfulfilled Promises or Non-delivery</option>
            <option>Excessive Shipping Charges</option>
            <option>Payment Fraud or Suspicious Activity</option>
            <option>Inappropriate Content</option>
            <option>Harassment or Unethical Behavior</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="reportDetails" className="block text-sm font-medium text-gray-700 mb-1">
          Additional Details
        </label>
        <textarea
          id="reportDetails"
          rows={4}
          value={additionalDetails}
          onChange={(e) => setAdditionalDetails(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="Please provide more information about your report..."
        ></textarea>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Submit Report
        </button>
      </div>
    </form>
  );
};
