import React, { useState } from 'react';
import { Star, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpeg";
import image4 from "../assets/image4.jpeg";
import image5 from "../assets/image5.jpeg";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import image8 from "../assets/image8.jpeg";
import image9 from "../assets/image9.jpeg";
import image10 from "../assets/image10.jpeg";
import image11 from "../assets/image11.jpeg";
import image12 from "../assets/image12.jpeg";
import image20 from "../assets/image20.jpeg";
import image21 from "../assets/image21.jpeg";
import image22 from "../assets/image22.jpeg";
import image23 from "../assets/image23.jpeg";
import image24 from "../assets/image24.jpeg";
import { Link } from "react-router-dom";
const ProductGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  // NEW: Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [sidebarFilters, setSidebarFilters] = useState({
    categories: [],
    brands: [],
    features: [],
    sizes: []
  });

  // EXTENDED: More products using your images
  const products = [
    {
      id: 1,
      title: "Smart Agriculture Sensor Kit",
      subtitle: "IoT soil monitoring system",
      image: image4,
      rating: 4.5,
      reviewCount: 6152,
      price: 149.99,
      category: "Technology",
      brand: "TechCorp",
      features: ["Smart Technology", "Premium Quality"]
    },
    {
      id: 2,
      title: "Organic Quinoa Protein Bars",
      subtitle: "Gluten-free superfood bars",
      image: image5,
      rating: 4.5,
      reviewCount: 4943,
      price: 24.99,
      category: "Food & Beverages",
      brand: "FreshFoods",
      features: ["Organic", "Eco-Friendly"]
    },
    {
      id: 3,
      title: "Sustainable Cotton T-Shirt",
      subtitle: "Eco-friendly organic cotton",
      image: image20,
      rating: 4.5,
      reviewCount: 1163,
      price: 29.99,
      category: "Clothing & Fashion",
      brand: "StyleWear",
      features: ["Sustainable", "Organic"]
    },
    {
      id: 4,
      title: "Vertical Farming System",
      subtitle: "Hydroponic growing tower",
      image: image12,
      rating: 4.5,
      reviewCount: 892,
      price: 399.99,
      category: "Agriculture",
      brand: "AgriTech",
      features: ["Smart Technology", "Sustainable"]
    },
    {
      id: 5,
      title: "Natural Face Serum",
      subtitle: "Organic botanical formula",
      image: image1,
      rating: 4.5,
      reviewCount: 2156,
      price: 45.99,
      category: "Health & Beauty",
      brand: "BeautyPro",
      features: ["Organic", "Premium Quality"]
    },
    {
      id: 6,
      title: "Solar Garden Lights",
      subtitle: "LED outdoor lighting system",
      image: image21,
      rating: 4.5,
      reviewCount: 3421,
      price: 89.99,
      category: "Home & Garden",
      brand: "HomeEssentials",
      features: ["Eco-Friendly", "Smart Technology"]
    },
    {
      id: 7,
      title: "Fitness Tracker Watch",
      subtitle: "Advanced health monitoring",
      image: image24,
      rating: 4.3,
      reviewCount: 2890,
      price: 199.99,
      category: "Sports & Outdoors",
      brand: "SportMax",
      features: ["Smart Technology", "Premium Quality"]
    },
    {
      id: 8,
      title: "Electric Car Charger",
      subtitle: "Fast charging station",
      image: image5,
      rating: 4.7,
      reviewCount: 1567,
      price: 899.99,
      category: "Automotive",
      brand: "AutoParts",
      features: ["Smart Technology", "Premium Quality"]
    },
    {
      id: 9,
      title: "Industrial 3D Printer",
      subtitle: "Professional grade printing",
      image: image7,
      rating: 4.6,
      reviewCount: 789,
      price: 2499.99,
      category: "Industrial",
      brand: "IndustrialSupply",
      features: ["Premium Quality", "Award Winning"]
    },
    // NEW PRODUCTS ADDED
    {
      id: 10,
      title: "Wireless Bluetooth Headphones",
      subtitle: "Premium audio experience",
      image: image2,
      rating: 4.4,
      reviewCount: 3521,
      price: 79.99,
      category: "Technology",
      brand: "TechCorp",
      features: ["Smart Technology", "Premium Quality"]
    },
    {
      id: 11,
      title: "Organic Green Tea Blend",
      subtitle: "Antioxidant rich herbal tea",
      image: image3,
      rating: 4.6,
      reviewCount: 2847,
      price: 19.99,
      category: "Food & Beverages",
      brand: "FreshFoods",
      features: ["Organic", "Premium Quality"]
    },
    {
      id: 12,
      title: "Bamboo Yoga Mat",
      subtitle: "Eco-friendly exercise mat",
      image: image6,
      rating: 4.3,
      reviewCount: 1892,
      price: 59.99,
      category: "Sports & Outdoors",
      brand: "SportMax",
      features: ["Sustainable", "Eco-Friendly"]
    },
    {
      id: 13,
      title: "Smart Home Hub",
      subtitle: "Central control system",
      image: image8,
      rating: 4.5,
      reviewCount: 4156,
      price: 249.99,
      category: "Technology",
      brand: "TechCorp",
      features: ["Smart Technology", "Premium Quality"]
    },
    {
      id: 14,
      title: "Organic Skincare Kit",
      subtitle: "Natural beauty routine",
      image: image9,
      rating: 4.7,
      reviewCount: 3267,
      price: 89.99,
      category: "Health & Beauty",
      brand: "BeautyPro",
      features: ["Organic", "Premium Quality"]
    },
    {
      id: 15,
      title: "Eco-Friendly Water Bottle",
      subtitle: "Stainless steel design",
      image: image10,
      rating: 4.4,
      reviewCount: 2641,
      price: 34.99,
      category: "Home & Garden",
      brand: "HomeEssentials",
      features: ["Eco-Friendly", "Sustainable"]
    },
    {
      id: 16,
      title: "Designer Jacket",
      subtitle: "Premium fashion wear",
      image: image11,
      rating: 4.6,
      reviewCount: 1574,
      price: 199.99,
      category: "Clothing & Fashion",
      brand: "StyleWear",
      features: ["Premium Quality", "Limited Edition"]
    },
    {
      id: 17,
      title: "Smart Garden Sprinkler",
      subtitle: "Automated irrigation system",
      image: image22,
      rating: 4.5,
      reviewCount: 2189,
      price: 129.99,
      category: "Agriculture",
      brand: "AgriTech",
      features: ["Smart Technology", "Eco-Friendly"]
    },
    {
      id: 18,
      title: "Professional Camera Lens",
      subtitle: "High-quality photography",
      image: image23,
      rating: 4.8,
      reviewCount: 987,
      price: 599.99,
      category: "Technology",
      brand: "TechCorp",
      features: ["Premium Quality", "Award Winning"]
    }
  ];

  const dropdownFilters = {
    categories: ['All', 'Technology', 'Food & Beverages', 'Clothing & Fashion', 'Agriculture', 'Health & Beauty', 'Home & Garden', 'Sports & Outdoors', 'Automotive', 'Industrial'],
    brands: ['All', 'TechCorp', 'FreshFoods', 'StyleWear', 'AgriTech', 'BeautyPro', 'HomeEssentials', 'SportMax', 'AutoParts', 'IndustrialSupply'],
    priceRanges: ['All', '$0-$25', '$25-$50', '$50-$100', '$100-$250', '$250+'],
    ratings: ['All', '4+ Stars', '3+ Stars', '2+ Stars', '1+ Stars']
  };

  const sidebarOptions = {
    categories: ['Electronics', 'Organic Food', 'Sustainable Fashion', 'Smart Agriculture', 'Natural Beauty', 'Eco-Friendly', 'Premium Quality', 'Handmade'],
    brands: ['EcoTech', 'OrganicFarms', 'GreenFashion', 'SmartAgri', 'NaturalGlow', 'PureLiving', 'CraftMasters', 'Innovation Labs'],
    features: ['Eco-Friendly', 'Organic', 'Handmade', 'Smart Technology', 'Sustainable', 'Premium Quality', 'Limited Edition', 'Award Winning'],
    sizes: ['Small', 'Medium', 'Large', 'XL', 'One Size', 'Customizable']
  };

  const handleSidebarFilter = (filterType, value) => {
    setSidebarFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
    // NEW: Reset to page 1 when filtering
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSelectedPrice('All');
    setSelectedRating('All');
    setSidebarFilters({
      categories: [],
      brands: [],
      features: [],
      sizes: []
    });
    // NEW: Reset to page 1 when clearing filters
    setCurrentPage(1);
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    // Category filter
    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;
    }

    // Price filter
    if (selectedPrice !== 'All') {
      const price = product.price;
      switch (selectedPrice) {
        case '$0-$25':
          if (price > 25) return false;
          break;
        case '$25-$50':
          if (price < 25 || price > 50) return false;
          break;
        case '$50-$100':
          if (price < 50 || price > 100) return false;
          break;
        case '$100-$250':
          if (price < 100 || price > 250) return false;
          break;
        case '$250+':
          if (price < 250) return false;
          break;
      }
    }

    // Rating filter
    if (selectedRating !== 'All') {
      const minRating = parseFloat(selectedRating.split('+')[0]);
      if (product.rating < minRating) return false;
    }

    return true;
  });

  // NEW: Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // NEW: Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(currentPage - halfVisible, 1);
      let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
      
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  // NEW: Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const DropdownFilter = ({ label, options, selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="relative z-20">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[200px]"
        >
          <span className="text-sm font-medium text-gray-700 truncate">{label}: {selected}</span>
          <ChevronDown size={16} className={`transition-transform ml-2 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const CheckboxSection = ({ title, options, selected, onToggle }) => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onToggle(title.toLowerCase(), option)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-3 text-sm text-gray-700 select-none">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
 
  const StarRating = ({ rating, reviewCount }) => {
    return (
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={`${
              i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">{reviewCount} reviews</span>
      </div>
    );
  };

  // NEW: Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = getPageNumbers();

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <ChevronLeft size={16} className="mr-1" />
          Previous
        </button>

        {/* Page numbers */}
        {pageNumbers[0] > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              1
            </button>
            {pageNumbers[0] > 2 && (
              <span className="px-2 text-gray-500">...</span>
            )}
          </>
        )}

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-3 py-2 text-sm font-medium rounded-lg ${
              currentPage === pageNumber
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="px-2 text-gray-500">...</span>
            )}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Next
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#f5f2eb] min-h-screen">
      {/* Sidebar */}
      <div className="flex gap-8">
        <div className="w-64 bg-white rounded-lg shadow-sm p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          {/* Render actual filters here */}
          <CheckboxSection
            title="Categories"
            options={sidebarOptions.categories}
            selected={sidebarFilters.categories}
            onToggle={handleSidebarFilter}
          />

          <CheckboxSection
            title="Brands"
            options={sidebarOptions.brands}
            selected={sidebarFilters.brands}
            onToggle={handleSidebarFilter}
          />

          <CheckboxSection
            title="Features"
            options={sidebarOptions.features}
            selected={sidebarFilters.features}
            onToggle={handleSidebarFilter}
          />

          <CheckboxSection
            title="Sizes"
            options={sidebarOptions.sizes}
            selected={sidebarFilters.sizes}
            onToggle={handleSidebarFilter}
          />

          <button
            onClick={clearAllFilters}
            className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
          >
            Clear All Filters
          </button>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {/* NEW: Results info */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
            </p>
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* CHANGED: Show currentProducts instead of products */}
            {currentProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                {/* Product Image - Fixed uniform sizing */}
                <div className="w-full h-48 mb-4 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                    {product.title}
                  </h3>
                  
                  <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                  
                  <p className="text-gray-600 text-sm">
                    {product.subtitle}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    
                    <button className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors font-medium">
                      Quick Buy
                    </button>
                  </div>
                     <Link to="/ProductDetails" className="hover:underline">Voir plus</Link>
                </div>
              </div>
            ))}
          </div>

          {/* NEW: Add Pagination */}
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
