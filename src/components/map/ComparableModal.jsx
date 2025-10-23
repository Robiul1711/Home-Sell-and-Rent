import React, { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';

const ComparableModal = ({ setShowComparable }) => {
  const [activeTab, setActiveTab] = useState('sales');
  const [selectedRadius, setSelectedRadius] = useState('2 mi');
  const [sortBy, setSortBy] = useState('Newest');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [exportType, setExportType] = useState('pdf');
  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const salesData = [
    {
      address: '417 Blozelown Road, New York, NY 10018',
      salePrice: '$480,000',
      date: 'Aug 17, 2026',
      sqFt: '1200',
      pricePerSqFt: '$400'
    },
    {
      address: '417 Blozelown Road, New York, NY 10018',
      salePrice: '$480,000',
      date: 'Aug 17, 2026',
      sqFt: '1200',
      pricePerSqFt: '$400'
    },
    {
      address: '417 Blozelown Road, New York, NY 10018',
      salePrice: '$480,000',
      date: 'Aug 17, 2026',
      sqFt: '1200',
      pricePerSqFt: '$400'
    }
  ];

  const rentalData = [
    {
      address: '417 Blozelown Road, New York, NY 10018',
      type: 'Apartment',
      monthlyRent: '$2,200',
      lastLease: 'Aug 23, 2026',
      estimatedPrice: '$480,000',
      yield: '5.4%'
    },
    {
      address: '417 Blozelown Road, New York, NY 10018',
      type: 'Villa',
      monthlyRent: '$2,200',
      lastLease: 'Aug 23, 2026',
      estimatedPrice: '$480,000',
      yield: '5.4%'
    },
    {
      address: '417 Blozelown Road, New York, NY 10018',
      type: 'Apartment',
      monthlyRent: '$2,200',
      lastLease: 'Aug 23, 2026',
      estimatedPrice: '$480,000',
      yield: '5.6%'
    }
  ];

  const handleExport = () => {
    if (exportType === 'pdf') {
      alert('Generating PDF Report...');
    } else {
      alert('Generating CSV Data...');
    }
    setShowExportModal(false);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent from ${contactForm.fullName}`);
    setContactForm({ fullName: '', email: '', message: '' });
    setShowContactModal(false);
  };

  return (
    <>
      <div className="fixed top-24 right-6 flex items-center justify-center z-50 p-4">
        <div className="w-full max-w-2xl rounded-lg overflow-hidden shadow-2xl bg-gray-800/95">
          {/* Header */}
          <div className="p-5 pb-4">
            <div className="flex items-center justify-between mb-6">
              <button className="flex items-center text-white text-sm hover:text-gray-200 transition">
                <div className="flex items-center gap-1 border border-white rounded-full px-2 py-0.5">
                  <ArrowLeft className="w-3 h-3" />
                  <span className="text-xs">Back To Index</span>
                </div>
              </button>
              <button
                onClick={() => setShowComparable(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-white text-lg font-semibold mb-4">Comparable</h2>

            {/* Filters Row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-white text-sm">Radius:</span>
                {['0.5mi', '1 mi', '2 mi'].map((radius) => (
                  <button
                    key={radius}
                    onClick={() => setSelectedRadius(radius)}
                    className={`px-4 py-1.5 rounded text-sm font-medium transition ${
                      selectedRadius === radius
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-600 bg-opacity-60 text-white hover:bg-opacity-80'
                    }`}
                  >
                    {radius}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-white text-sm">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-600 bg-opacity-60 text-white px-3 py-1.5 rounded text-sm border-none outline-none cursor-pointer"
                >
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => setActiveTab('sales')}
                className={`py-2.5 rounded font-medium text-sm transition ${
                  activeTab === 'sales'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-600 bg-opacity-40 text-white border border-gray-400 hover:bg-opacity-60'
                }`}
              >
                Sales Comparable
              </button>
              <button
                onClick={() => setActiveTab('rental')}
                className={`py-2.5 rounded font-medium text-sm transition ${
                  activeTab === 'rental'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-600 bg-opacity-40 text-white border border-gray-400 hover:bg-opacity-60'
                }`}
              >
                Rental Yields
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mb-4">
              {activeTab === 'sales' ? (
                <table className="w-full text-white text-sm">
                  <thead>
                    <tr className="border-b border-gray-400">
                      <th className="text-left py-2 px-2 font-medium">Address</th>
                      <th className="text-left py-2 px-2 font-medium">Sale Price</th>
                      <th className="text-left py-2 px-2 font-medium">Date</th>
                      <th className="text-left py-2 px-2 font-medium">Sq Ft</th>
                      <th className="text-left py-2 px-2 font-medium">$/sqft</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-500 hover:bg-white hover:bg-opacity-10 transition">
                        <td className="py-3 px-2">{item.address}</td>
                        <td className="py-3 px-2">{item.salePrice}</td>
                        <td className="py-3 px-2">{item.date}</td>
                        <td className="py-3 px-2">{item.sqFt}</td>
                        <td className="py-3 px-2">{item.pricePerSqFt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-white text-sm">
                  <thead>
                    <tr className="border-b border-gray-400">
                      <th className="text-left py-2 px-2 font-medium">Address</th>
                      <th className="text-left py-2 px-2 font-medium">Type</th>
                      <th className="text-left py-2 px-2 font-medium">Monthly Rent</th>
                      <th className="text-left py-2 px-2 font-medium">Last Lease</th>
                      <th className="text-left py-2 px-2 font-medium">Estimated Price</th>
                      <th className="text-left py-2 px-2 font-medium">Yield %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentalData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-500 hover:bg-white hover:bg-opacity-10 transition">
                        <td className="py-3 px-2">{item.address}</td>
                        <td className="py-3 px-2">{item.type}</td>
                        <td className="py-3 px-2">{item.monthlyRent}</td>
                        <td className="py-3 px-2">{item.lastLease}</td>
                        <td className="py-3 px-2">{item.estimatedPrice}</td>
                        <td className="py-3 px-2">{item.yield}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setShowExportModal(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-semibold transition"
              >
                Export
              </button>
              <button 
                onClick={() => setShowContactModal(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-semibold transition"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0  flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Export Comparable</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={exportType === 'pdf'}
                  onChange={() => setExportType('pdf')}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700 group-hover:text-gray-900">PDF Report</span>
              </label>
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={exportType === 'csv'}
                  onChange={() => setExportType('csv')}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700 group-hover:text-gray-900">CSV Data</span>
              </label>
            </div>

            <button
              onClick={handleExport}
              className="w-full bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition shadow-sm"
            >
              Generate Export
            </button>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0  flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Contact Us !</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Farhan Bhai"
                  value={contactForm.fullName}
                  onChange={(e) => setContactForm({...contactForm, fullName: e.target.value})}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Enter your message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  required
                  rows="4"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition shadow-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ComparableModal;