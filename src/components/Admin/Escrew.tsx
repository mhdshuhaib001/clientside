import React, { useState } from 'react';
import { useGetEscrowPaymentsQuery } from '../../services/apis/adminApi';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function EscrowPaymentsAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchType, setSearchType] = useState<'all' | 'seller' | 'buyer'>('all');

  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

  const { data, isLoading, error } = useGetEscrowPaymentsQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === 'all' ? undefined : statusFilter,
    searchTerm: searchTerm,
    searchType: searchType,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });

  const escrowPayments = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const summary = data?.summary || {
    totalAmount: 0,
    platformFee: 0,
    sellerEarnings: 0,
    count: 0,
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const renderPagination = () => (
    <div className="flex justify-between items-center mt-4">
      <div>
        <label htmlFor="items-per-page" className="mr-2">
          Items per page:
        </label>
        <select
          id="items-per-page"
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[10, 25, 50, 100].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded bg-gray-200 disabled:opacity-50 flex items-center"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex space-x-1">
          {/* Show first page */}
          {currentPage > 3 && (
            <button
              onClick={() => handlePageChange(1)}
              className="px-3 py-1 rounded bg-gray-100 text-gray-700"
            >
              1
            </button>
          )}
          {currentPage > 3 && <span className="px-2 py-1">...</span>}

          {/* Generate page buttons */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1,
            )
            .map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {page}
              </button>
            ))}

          {currentPage < totalPages - 2 && <span className="px-2 py-1">...</span>}
          {currentPage < totalPages - 2 && (
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-3 py-1 rounded bg-gray-100 text-gray-700"
            >
              {totalPages}
            </button>
          )}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded bg-gray-200 disabled:opacity-50 flex items-center"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Escrow Payments Admin</h1>

      {typeof summary === 'object' && summary !== null ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Total Amount</h2>
            <p className="text-2xl font-bold">${summary.totalAmount.toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Total Platform Fee</h2>
            <p className="text-2xl font-bold">${summary.platformFee.toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Total Seller Earnings</h2>
            <p className="text-2xl font-bold">${summary.sellerEarnings.toFixed(2)}</p>
          </div>
        </div>
      ) : (
        <p>Summary data is not available.</p>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0">
        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <label htmlFor="status-filter" className="mr-2">
            Status:
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            <option value="all">All</option>
            <option value="held">Held</option>
            <option value="released">Released</option>
            <option value="disputed">Disputed</option>
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="flex items-center space-x-2">
          <div>
            <label htmlFor="startDate" className="mr-2">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateRangeChange}
              className="border rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="mr-2">
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateRangeChange}
              className="border rounded px-2 py-1"
            />
          </div>
        </div>

        {/* Search Input */}
        <div className="flex items-center space-x-2">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as 'all' | 'seller' | 'buyer')}
            className="border rounded px-2 py-1"
          >
            <option value="all">All</option>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>
          <input
            type="text"
            placeholder={`Search ${searchType === 'all' ? 'Order ID, Seller, or Buyer' : searchType === 'seller' ? 'Seller Name' : 'Buyer Name'}`}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1 w-full md:w-auto"
          />
        </div>
      </div>

      {/* Escrow Payments Table */}
      {isLoading ? (
        <p className="text-center">Loading escrow payments...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error loading payments</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Buyer Name</th>
                  <th className="px-4 py-2 text-left">Seller Name</th>
                  <th className="px-4 py-2 text-left">Total Amount</th>
                  <th className="px-4 py-2 text-left">Platform Fee</th>
                  <th className="px-4 py-2 text-left">Seller Earnings</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Release Date</th>
                </tr>
              </thead>
              <tbody>
                {escrowPayments.map((payment) => (
                  <tr key={payment._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">
                      {payment.orderId && payment.orderId._id
                        ? payment.orderId._id.toString().slice(0, 10)
                        : 'N/A'}
                    </td>
                    <td className="px-4 py-2">{payment.buyerId.name.toString()}</td>
                    <td className="px-4 py-2">{payment.sellerId.companyName.toString()}</td>
                    <td className="px-4 py-2">${payment.totalAmount.toFixed(2)}</td>
                    <td className="px-4 py-2">${payment.platformFee.toFixed(2)}</td>
                    <td className="px-4 py-2">${payment.sellerEarnings.toFixed(2)}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold  
                        ${
                          payment.status === 'held'
                            ? 'bg-yellow-200 text-yellow-800'
                            : payment.status === 'released'
                              ? 'bg-green-200 text-green-800'
                              : 'bg-red-200 text-red-800'
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {payment.releaseDate
                        ? new Date(payment.releaseDate).toLocaleDateString()
                        : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {renderPagination()}
        </>
      )}
    </div>
  );
}
