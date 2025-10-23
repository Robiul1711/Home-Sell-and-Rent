import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  X,
  Search,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Info,
  MapPin,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ComparableModal from "./ComparableModal";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Updated Property Data
const properties = [
  {
    id: 1,
    title: "Bronx River Parkway Property",
    address: "321 Bronx River Pkwy, Bronx, NY",
    currentValue: 1250000,
    projectedValue: 1580000,
    growth: 26.4,
    investmentFactors: [
      "Strong population growth in surrounding area",
      "Major infrastructure development planned nearby",
      "Excellent public transportation access",
      "Tax incentives available through 2028",
    ],
    aiInsight:
      "This property shows strong potential due to upcoming subway expansion and gentrification trends in the neighborhood.",
    riskIndicators: {
      propertyTaxes: "High",
      floodRisk: "Low",
      marketVolatility: "Medium",
    },
    position: [40.8419, -73.8772],
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Brooklyn Modern Loft",
    address: "456 Brooklyn Bridge Way, Brooklyn, NY",
    currentValue: 1850000,
    projectedValue: 2100000,
    growth: 13.5,
    investmentFactors: [
      "High rental demand in downtown area",
      "Near tech and creative industries hub",
      "Improved metro connectivity planned",
    ],
    aiInsight:
      "Great short-term rental potential due to increasing tourist influx and remote working professionals.",
    riskIndicators: {
      propertyTaxes: "Medium",
      floodRisk: "Low",
      marketVolatility: "Low",
    },
    position: [40.7061, -73.9969],
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
  },
];

const PropertyMap = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [exportType, setExportType] = useState('pdf');
  const [radiusFilter, setRadiusFilter] = useState('0.5mi');
  const [sortBy, setSortBy] = useState('newest');
  const [showComparable, setShowComparable] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const [filters, setFilters] = useState({
    location: '',
    priceMin: '',
    priceMax: '',
    propertyType: 'All Types'
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleApplyFilters = () => {
    console.log('Filters applied:', filters);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setFilters({
      location: '',
      priceMin: '',
      priceMax: '',
      propertyType: 'All Types'
    });
  };

  const handleExport = () => {
    if (exportType === 'pdf') {
      alert('Generating PDF report...');
    } else {
      alert('Generating CSV data...');
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent from ${contactForm.fullName}`);
    setContactForm({ fullName: '', email: '', message: '' });
    setShowContactModal(false);
  };

  return (
    <div className="relative w-full h-[90vh] flex flex-col">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden bg-white shadow-md z-20 px-4 py-3">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full flex items-center justify-between bg-blue-50 text-blue-600 px-4 py-3 rounded-lg font-medium"
        >
          <span className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </span>
          {isFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Filter Bar */}
      <div className={`
        bg-white shadow-md z-10 px-4 lg:px-6 py-4 transition-all duration-300 
        ${isFilterOpen ? 'block' : 'hidden lg:block'}
      `}>
        <div className="grid grid-cols-1 lg:flex gap-3 lg:items-end">
          <div className="grid grid-cols-2  md:grid-cols-4 lg:flex-1 gap-3 lg:gap-4">
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm text-gray-600 mb-1">Location</label>
              <input
                type="text"
                placeholder="All City"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                className="w-full px-3 py-2 text-sm lg:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm text-gray-600 mb-1">Price Min</label>
              <input
                type="text"
                placeholder="e.g. 200,000"
                value={filters.priceMin}
                onChange={(e) => setFilters({...filters, priceMin: e.target.value})}
                className="w-full px-3 py-2 text-sm lg:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm text-gray-600 mb-1">Price Max</label>
              <input
                type="text"
                placeholder="e.g. 500,000"
                value={filters.priceMax}
                onChange={(e) => setFilters({...filters, priceMax: e.target.value})}
                className="w-full px-3 py-2 text-sm lg:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm text-gray-600 mb-1">Property Type</label>
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
                className="w-full px-3 py-2 text-sm lg:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Types</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Condo</option>
                <option>Townhouse</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-2 mt-3 lg:mt-0">
            <button
              onClick={handleApplyFilters}
              className="flex-1 lg:flex-none px-4 lg:px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm lg:text-base"
            >
              Apply
            </button>
            <button
              onClick={handleResetFilters}
              className="flex-1 lg:flex-none px-4 lg:px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition text-sm lg:text-base"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          center={[40.758, -73.9855]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {properties.map((property) => (
            <Marker
              key={property.id}
              position={property.position}
              eventHandlers={{
                click: () => setSelectedProperty(property),
              }}
            >
              <Popup>
                <div className="text-center min-w-[200px]">
                  <h3 className="font-semibold text-sm mb-2">{property.title}</h3>
                  <p className="text-lg font-bold text-blue-600">
                    {formatPrice(property.currentValue)}
                  </p>
                  <button
                    onClick={() => setSelectedProperty(property)}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Property Details Modal - Responsive */}
        {selectedProperty && (
          <>
            {/* Desktop/Tablet Side Panel */}
            <div className="hidden md:block fixed top-20 right-2 lg:right-6 w-[90vw] max-w-[380px] bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl text-white z-[300] overflow-hidden border border-gray-700 max-h-[85vh] overflow-y-auto">
              {/* Header Image */}
              <div
                className="relative h-32 sm:h-40 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${selectedProperty.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-1.5 hover:bg-white/30 transition"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 space-y-4">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ask KOANO"
                    className="w-full px-4 py-2 bg-gray-700/60 rounded-md text-sm placeholder-gray-400 focus:outline-none"
                  />
                  <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300">
                    {selectedProperty.title}
                  </h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> {selectedProperty.address}
                  </p>
                </div>

                {/* Values */}
                <div>
                  <p className="text-xs text-gray-400 mb-1">Current Value</p>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {formatPrice(selectedProperty.currentValue)}
                  </h2>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between w-full gap-4">
                        <p className="text-xs text-gray-400">Projected Value</p>
                        <select
                          className="bg-gray-700/60 text-gray-300 text-xs rounded-md px-2 py-1 focus:outline-none cursor-pointer hover:bg-gray-700 transition"
                          defaultValue="10Y"
                        >
                          <option>10Y</option>
                          <option>5Y</option>
                          <option>1Y</option>
                        </select>
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-green-400 mt-1">
                        {formatPrice(selectedProperty.projectedValue)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-green-400 text-xs font-semibold ml-4">
                      <TrendingUp className="w-4 h-4" />
                      +{selectedProperty.growth}%
                    </div>
                  </div>
                </div>

                {/* Investment Factors */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">
                    Key Investment Factors
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-300">
                    {selectedProperty.investmentFactors.map(
                      (factor, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-[2px] flex-shrink-0" />
                          <span>{factor}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* AI Insight */}
                <div className="bg-gray-700/40 rounded-md p-3">
                  <h4 className="text-xs uppercase font-semibold flex items-center gap-1 mb-1">
                    <Info className="w-3.5 h-3.5 text-blue-400" /> AI Insight
                  </h4>
                  <p className="text-xs text-gray-300">
                    {selectedProperty.aiInsight}
                  </p>
                </div>

                {/* Risk Indicators */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" /> Risk
                    Indicators
                  </h4>
                  <div className="space-y-1 text-xs text-gray-300">
                    <div className="flex justify-between">
                      <span>Property Taxes</span>
                      <span>{selectedProperty.riskIndicators.propertyTaxes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flood Risk</span>
                      <span>{selectedProperty.riskIndicators.floodRisk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Market Volatility</span>
                      <span>
                        {selectedProperty.riskIndicators.marketVolatility}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2">
                    Last updated: December 15, 2024
                  </p>
                </div>

                {/* Compare Button */}
                <button 
                  onClick={() => {
                    setShowComparable(true);
                    setSelectedProperty(null);
                  }} 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2.5 rounded-md flex items-center justify-center gap-2 transition font-semibold"
                >
                  Compare Properties
                </button>
              </div>
            </div>

            {/* Mobile Bottom Sheet */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800/95 backdrop-blur-xl text-white z-[300] rounded-t-2xl border-t border-gray-700 max-h-[80vh] overflow-y-auto">
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
              </div>

              {/* Header Image */}
              <div
                className="relative h-32 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${selectedProperty.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-1.5 hover:bg-white/30 transition"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ask KOANO"
                    className="w-full px-4 py-2 bg-gray-700/60 rounded-md text-sm placeholder-gray-400 focus:outline-none"
                  />
                  <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300">
                    {selectedProperty.title}
                  </h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> {selectedProperty.address}
                  </p>
                </div>

                {/* Values */}
                <div>
                  <p className="text-xs text-gray-400 mb-1">Current Value</p>
                  <h2 className="text-xl font-bold text-white">
                    {formatPrice(selectedProperty.currentValue)}
                  </h2>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between w-full gap-4">
                        <p className="text-xs text-gray-400">Projected Value</p>
                        <select
                          className="bg-gray-700/60 text-gray-300 text-xs rounded-md px-2 py-1 focus:outline-none cursor-pointer hover:bg-gray-700 transition"
                          defaultValue="10Y"
                        >
                          <option>10Y</option>
                          <option>5Y</option>
                          <option>1Y</option>
                        </select>
                      </div>
                      <p className="text-lg font-bold text-green-400 mt-1">
                        {formatPrice(selectedProperty.projectedValue)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-green-400 text-xs font-semibold ml-4">
                      <TrendingUp className="w-4 h-4" />
                      +{selectedProperty.growth}%
                    </div>
                  </div>
                </div>

                {/* Investment Factors */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">
                    Key Investment Factors
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-300">
                    {selectedProperty.investmentFactors.map(
                      (factor, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-[2px] flex-shrink-0" />
                          <span>{factor}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* AI Insight */}
                <div className="bg-gray-700/40 rounded-md p-3">
                  <h4 className="text-xs uppercase font-semibold flex items-center gap-1 mb-1">
                    <Info className="w-3.5 h-3.5 text-blue-400" /> AI Insight
                  </h4>
                  <p className="text-xs text-gray-300">
                    {selectedProperty.aiInsight}
                  </p>
                </div>

                {/* Risk Indicators */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" /> Risk
                    Indicators
                  </h4>
                  <div className="space-y-1 text-xs text-gray-300">
                    <div className="flex justify-between">
                      <span>Property Taxes</span>
                      <span>{selectedProperty.riskIndicators.propertyTaxes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flood Risk</span>
                      <span>{selectedProperty.riskIndicators.floodRisk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Market Volatility</span>
                      <span>
                        {selectedProperty.riskIndicators.marketVolatility}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2">
                    Last updated: December 15, 2024
                  </p>
                </div>

                {/* Compare Button */}
                <button 
                  onClick={() => {
                    setShowComparable(true);
                    setSelectedProperty(null);
                  }} 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2.5 rounded-md flex items-center justify-center gap-2 transition font-semibold"
                >
                  Compare Properties
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Comparable Modal */}
      {showComparable && (
        <ComparableModal 
          showComparable={showComparable} 
          setShowComparable={setShowComparable} 
        />
      )}
    </div>
  );
};

export default PropertyMap;