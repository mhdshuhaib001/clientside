import React, { useState, useEffect, MouseEvent } from 'react';
import { useFetchReportsQuery, useUpdateReportStatusMutation } from '../../services/apis/adminApi';
import { Button, Menu, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import toast from 'react-hot-toast';

interface Report {
  id: string;
  sellerId: string;
  sellerName: string;
  reportedBy: { _id: string; name: string };
  reason: string;
  details: string;
  status: 'pending' | 'resolved' | 'dismissed' | 'warning' | 'blocked';
  createdAt: string;
}

const SellerReportManagement = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved' | 'dismissed' | 'warning' | 'blocked'>('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;
  const [updateReportStatus] = useUpdateReportStatusMutation();
  const { data: reportDatas, isLoading, isError } = useFetchReportsQuery();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (!isLoading && !isError && reportDatas) {
      const mappedReports: Report[] = reportDatas.map((report: any) => ({
        id: report._id.toString(),
        sellerId: report.sellerId._id,
        sellerName: report.sellerId.companyName,
        reportedBy: { _id: report.reportedBy._id, name: report.reportedBy.name },
        reason: report.reason,
        details: report.details,
        status: report.status , 
        createdAt: report.createdAt,
      }));
      setReports(mappedReports);
    }
  }, [reportDatas, isLoading, isError]);
  
  const handleMenuOpen = (event: MouseEvent<HTMLElement>, report: Report) => {
    setSelectedReport(report);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedReport(null);
  };

  const handleAction = async (action: 'resolve' | 'dismiss' | 'warn' | 'block') => {
    if (!selectedReport) return;

    let newStatus: Report['status'];
    if (action === 'resolve') {
      newStatus = 'resolved';
    } else if (action === 'dismiss') {
      newStatus = 'dismissed';
    } else if (action === 'warn') {
      newStatus = 'warning';
    } else if (action === 'block') {
      newStatus = 'blocked';
    } else {
      newStatus = 'pending';
    }

    try {
      await updateReportStatus({ id: selectedReport.id, status: newStatus }).unwrap();
      setReports((prevReports) =>
        prevReports.map((r) => (r.id === selectedReport.id ? { ...r, status: newStatus } : r))
      );
      toast.success('Report updated successfully');
    } catch (error) {
      toast.error('Failed to update report status');
    }
    handleMenuClose();
  };

  const getStatusProps = (status: Report['status']) => {
    switch (status) {
      case 'resolved':
        return { color: 'success', label: 'Resolved' };
      case 'dismissed':
        return { color: 'secondary', label: 'Dismissed' };
      case 'warning':
        return { color: 'warning', label: 'Warning' };
      case 'blocked':
        return { color: 'error', label: 'Blocked' };
      case 'pending':
      default:
        return { color: 'primary', label: 'Pending' };
    }
  };

  // Filter reports based on the selected filter
  const filteredReports = reports.filter((report) =>
    filter === 'all' ? true : report.status === filter
  );

  // Pagination variables
  const totalReports = filteredReports.length;
  const totalPages = Math.ceil(totalReports / reportsPerPage);
  const startIndex = (currentPage - 1) * reportsPerPage;
  const endIndex = startIndex + reportsPerPage;
  const paginatedReports = filteredReports.slice(startIndex, endIndex);

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Seller Report Management</h1>
  
      {/* Filter Area */}
      <div className="mb-4 flex items-center">
        <FormControl variant="outlined" className="w-48">
          <InputLabel className="text-sm">Filter Status</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value as Report['status'] | 'all')}
            label="Filter Status"
            className="text-sm" // Smaller font size for the Select
          >
            {['all', 'pending', 'resolved', 'dismissed', 'warning', 'blocked'].map((status) => (
              <MenuItem key={status} value={status} className="text-sm"> {/* Smaller font size for MenuItem */}
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
  
      {/* Report Table */}
      <div className="overflow-x-auto mt-4"> {/* Add margin-top to create space between filter and table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">No</th>
              <th className="border px-4 py-2 text-left">Seller Name</th>
              <th className="border px-4 py-2 text-left">Reported By</th>
              <th className="border px-4 py-2 text-left">Reason</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Created At</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedReports.map((report, index) => {
              const { color, label } = getStatusProps(report.status);
              return (
                <tr key={report.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="border px-4 py-2">{startIndex + index + 1}</td>
                  <td className="border px-4 py-2">{report.sellerName}</td>
                  <td className="border px-4 py-2">{report.reportedBy.name}</td>
                  <td className="border px-4 py-2">{report.reason}</td>
                  <td className="border px-4 py-2">{label}</td>
                  <td className="border px-4 py-2">{new Date(report.createdAt).toLocaleString()}</td>
                  <td className="border px-4 py-2">
                    <Button
                      variant="contained"
                      color={color as any}
                      onClick={(e) => handleMenuOpen(e, report)}
                    >
                      {label}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedReport?.id === report.id)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleAction('warn')}>Warning</MenuItem>
                      <MenuItem onClick={() => handleAction('block')}>Block</MenuItem>
                      <MenuItem onClick={() => handleAction('resolve')}>Resolve</MenuItem>
                      <MenuItem onClick={() => handleAction('dismiss')}>Dismiss</MenuItem>
                    </Menu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  
      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(endIndex, totalReports)} of {totalReports} entries
        </p>
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default SellerReportManagement;
