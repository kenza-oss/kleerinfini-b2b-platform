import React, { useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Import your images - Make sure these paths are correct!
import image30 from "../assets/image30.jpg";
import image31 from "../assets/image31.jpg";
import image3 from "../assets/image3.jpeg";

// Receive searchTerm and other filter props from the parent (Products.jsx)
const ProductGrid = ({ searchTerm, selectedRegion, selectedCategory, selectedCertification }) => {
  const [products, setProducts] = useState([]); // All products fetched from API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Existing states for dropdown and sidebar filters (some might be redundant now if controlled by SearchSection)
  const [selectedDropdownCategory, setSelectedDropdownCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');

  // State to manage which sidebar checkboxes are checked
  const [sidebarFilters, setSidebarFilters] = useState({
    categories: [], // e.g., ['Agroalimentaire']
    brands: [],
    features: [],
    sizes: []
  });

  // State for expanding/collapsing product descriptions
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const toggleDescription = (productId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  // Map for product images - customize as needed based on your product data
  const imageMap = {
    'image1': image30, // If your product data has 'images': ['image1', ...]
    'image2': image31,
    'image3': image3,
    'Agroalimentaire': image30, // Example: Map 'Agroalimentaire' category to a specific image
    'Food': image31,
    'Electronics': image3,
    'default': [image30, image31, image3] // Fallback if no specific image is found
  };

  const getProductImage = (product, index) => {
    // Priority: product.images array (first item) -> product.image_category -> specific category image -> default
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      const imageIdentifier = product.images[0];
      if (imageMap[imageIdentifier]) {
        return imageMap[imageIdentifier];
      }
    }
    if (product.image_category && imageMap[product.image_category]) {
      return imageMap[product.image_category];
    }
    // Check if the product's category_name has a direct image map
    if (product.category_name && imageMap[product.category_name]) {
      return imageMap[product.category_name];
    }

    const defaultImages = imageMap.default;
    return defaultImages[index % defaultImages.length]; // Cycle through default images
  };

  // --- START OF CHANGE ---
  // Define your API base URL using the Vite environment variable
  // Ensure that process.env.VITE_API_URL is correctly defined in your .env file
  // and that you've restarted your development server after creating/modifying it.
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  // --- END OF CHANGE ---

  // Fetch products from API on component mount
  useEffect(() => {
    console.log("Fetching products from API...");
    
    axios.get(`${API_BASE_URL}api/products/`) 
  
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
        console.log("API Products fetched:", res.data); // Log all fetched products
        res.data.forEach(p => {
           
            console.log(`Product ID: ${p.id}, Name: ${p.name}, Category Name (from API):`, p.category_name);
            console.log(`Product ID: ${p.id}, Name: ${p.name}, Raw 'category' field (expected undefined):`, p.category);
        });
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs only once on mount

  // Handler for sidebar checkbox filters
  const handleSidebarFilter = (filterType, value) => {
    setSidebarFilters(prev => {
      const newFilterValues = prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value) // Remove if already selected
        : [...prev[filterType], value]; // Add if not selected
      console.log(`Sidebar Filter Changed: ${filterType}, Value: ${value}, New Selected:`, newFilterValues);
      return {
        ...prev,
        [filterType]: newFilterValues
      };
    });
    setCurrentPage(1); // Reset page to 1 when filters change
  };

  // Clears all filters (both search bar and sidebar/dropdown)
  const clearAllFilters = () => {
    // Clear dropdown filters (if used)
    setSelectedDropdownCategory('All');
    setSelectedBrand('All');
    setSelectedPrice('All');
    setSelectedRating('All');
    // Clear sidebar filters
    setSidebarFilters({
      categories: [],
      brands: [],
      features: [],
      sizes: []
    });
    setCurrentPage(1); // Reset page
    // Note: To clear the search bar input, you would need to pass a setter
    // from Products.jsx down to SearchSection.jsx as well.
  };

  // --- Filter Options Data for Sidebar Checkboxes ---
  const sidebarOptions = {
    // IMPORTANT: Ensure 'Agroalimentaire' (and other categories) here
    // EXACTLY match the 'category_name' string values from your Django API
    categories: ['Agroalimentaire','Produits laitiers', 'Fruits', 'Vegetables', 'Grains', 'Electronics', 'Food', 'Fashion', 'Agriculture', 'Health', 'Home', 'Sports', 'Automotive', 'Industrial', 'General'],
    brands: ['BrandA', 'BrandB', 'BrandC', 'BrandD', 'BrandE'], // Example brands
    features: ['Eco-Friendly', 'Organic', 'Handmade', 'Smart Technology', 'Sustainable', 'Waterproof', 'BIO', 'ISO', 'HALAL'], // Added certifications here
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'] // Example sizes
  };

  // --- Product Filtering Logic (combining all filters) ---
  const filteredProducts = products.filter(product => {
    let passedFilters = true; // Assume product passes until a filter fails

    console.log(`--- Filtering Product: ${product.name} (ID: ${product.id}) ---`);
    console.log("Current Search Term (from SearchSection):", searchTerm);
    console.log("Current Selected Region (from SearchSection):", selectedRegion);
    console.log("Current Selected Category (from SearchSection):", selectedCategory);
    console.log("Current Selected Certification (from SearchSection):", selectedCertification);
    console.log("Current Sidebar Filters (ProductGrid):", sidebarFilters);

    // 1. Apply global search term from SearchSection (product name)
    if (searchTerm) {
      if (!product.name || !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        console.log(`   - Failed Search Term: Product name "${product.name}" doesn't include "${searchTerm}"`);
        passedFilters = false;
      }
    }
    if (!passedFilters) return false;

    // 2. Apply Region filter from SearchSection
    if (selectedRegion) {
        if (!product.region_org || product.region_org.toLowerCase() !== selectedRegion.toLowerCase()) {
            console.log(`   - Failed Region: Product region "${product.region_org}" !== "${selectedRegion}"`);
            passedFilters = false;
        }
    }
    if (!passedFilters) return false;

    // 3. Apply Category filter from SearchSection (Dropdown in SearchBar)
    if (selectedCategory) {
        // CHANGED: Accessing product.category_name
        const productCategoryValue = product.category_name;
        if (!productCategoryValue || productCategoryValue.toLowerCase() !== selectedCategory.toLowerCase()) {
            console.log(`   - Failed SearchSection Category: Product category_name "${productCategoryValue}" !== "${selectedCategory}"`);
            passedFilters = false;
        }
    }
    if (!passedFilters) return false;

    // 4. Apply Certification filter from SearchSection (Dropdown in SearchBar)
    if (selectedCertification) {
        if (!product.features || !Array.isArray(product.features) || !product.features.some(feature => feature.toLowerCase() === selectedCertification.toLowerCase())) {
            console.log(`   - Failed Certification: Product features "${(product.features || []).join(', ')}" doesn't include "${selectedCertification}"`);
            passedFilters = false;
        }
    }
    if (!passedFilters) return false;

    // 5. Apply Sidebar Categories Filter (Checkbox selection) - THIS IS THE PRIMARY FOCUS
    if (sidebarFilters.categories.length > 0) {
      // CHANGED: Accessing product.category_name and trimming
      const productCategoryValue = (product.category_name)?.trim();

      console.log(`   - Sidebar Category Check: Product Category is "${productCategoryValue}", Selected Sidebar Categories are:`, sidebarFilters.categories);

      const isCategoryMatch = sidebarFilters.categories.some(filterCat => {
          const trimmedFilterCat = filterCat.trim(); // Trim sidebar filter option too
          const match = productCategoryValue && productCategoryValue.toLowerCase() === trimmedFilterCat.toLowerCase();
          if (match) {
            console.log(`     - Category Match Found! Product "${product.name}" category "${productCategoryValue}" matches selected "${trimmedFilterCat}"`);
          }
          return match;
      });

      if (!isCategoryMatch) {
        console.log(`   - Failed Sidebar Category: Product "${product.name}" category "${productCategoryValue}" did not match any selected sidebar categories.`);
        passedFilters = false;
      }
    }
    if (!passedFilters) return false;

    // 6. Apply Sidebar Brands Filter
    if (sidebarFilters.brands.length > 0) {
      if (!product.brand || !sidebarFilters.brands.some(filterBrand =>
          (product.brand || '').toLowerCase() === filterBrand.toLowerCase()
      )) {
        console.log(`   - Failed Sidebar Brand: Product brand "${product.brand}" did not match any selected sidebar brands.`);
        passedFilters = false;
      }
    }
    if (!passedFilters) return false;

    // 7. Apply Sidebar Features Filter (e.g., Eco-Friendly, Organic, or Certifications if distinct)
    if (sidebarFilters.features.length > 0) {
      const productFeatures = product.features || []; // Ensure it's an array
      const hasAllSelectedFeatures = sidebarFilters.features.every(filterFeature =>
        productFeatures.some(prodFeature => (prodFeature || '').toLowerCase() === filterFeature.toLowerCase())
      );
      if (!hasAllSelectedFeatures) {
        console.log(`   - Failed Sidebar Features: Product features "${productFeatures.join(', ')}" did not contain all selected sidebar features.`);
        passedFilters = false;
      }
    }
    if (!passedFilters) return false;

    // 8. Apply Sidebar Sizes Filter
    if (sidebarFilters.sizes.length > 0) {
      const productSizes = product.sizes || []; // Ensure it's an array
      const hasAnySelectedSize = sidebarFilters.sizes.some(filterSize =>
        productSizes.some(prodSize => (prodSize || '').toLowerCase() === filterSize.toLowerCase())
      );
      if (!hasAnySelectedSize) {
        console.log(`   - Failed Sidebar Sizes: Product sizes "${productSizes.join(', ')}" did not contain any selected sidebar sizes.`);
        passedFilters = false;
      }
    }
    if (!passedFilters) return false;

    // (Optional) Existing Dropdown filters for ProductGrid itself (if uncommented in main JSX)
    if (selectedDropdownCategory !== 'All') {
      // CHANGED: Accessing product.category_name
      const productCategoryValue = product.category_name;
      if (productCategoryValue && productCategoryValue.toLowerCase() !== selectedDropdownCategory.toLowerCase()) {
        console.log(`   - Failed Dropdown Category (internal): Product category_name "${productCategoryValue}" !== "${selectedDropdownCategory}"`);
        passedFilters = false;
      }
    }
    if (!passedFilters) return false;

    if (selectedPrice !== 'All') {
      const price = Number(product.prix_indicatif || product.price || 0);
      switch (selectedPrice) {
        case '$0-$25': if (price > 25) passedFilters = false; break;
        case '$25-$50': if (price < 25 || price > 50) passedFilters = false; break;
        case '$50-$100': if (price < 50 || price > 100) passedFilters = false; break;
        case '$100-$250': if (price < 100 || price > 250) passedFilters = false; break;
        case '$250+': if (price < 250) passedFilters = false; break;
        default: break;
      }
      if (!passedFilters) console.log(`   - Failed Price Filter: Product price ${price} not in range ${selectedPrice}`);
    }
    if (!passedFilters) return false;

    if (selectedRating !== 'All') {
      const minRating = parseFloat(selectedRating.split('+')[0]);
      if ((product.rating || 0) < minRating) {
        console.log(`   - Failed Rating Filter: Product rating ${product.rating} < ${minRating}`);
        passedFilters = false;
      }
    }
    if (!passedFilters) return false;

    console.log(`--- Product ${product.name} (ID: ${product.id}) PASSED ALL FILTERS ---`);
    return passedFilters; // Product passes all active filters
  });

  // Pagination logic
  const totalPagesFiltered = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  };

  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    const pageNumbers = [];
    if (totalPagesFiltered <= maxVisiblePages) {
      for (let i = 1; i <= totalPagesFiltered; i++) pageNumbers.push(i);
    } else {
      const half = Math.floor(maxVisiblePages / 2);
      let start = Math.max(currentPage - half, 1);
      let end = Math.min(start + maxVisiblePages - 1, totalPagesFiltered);
      if (end - start < maxVisiblePages - 1) start = Math.max(end - maxVisiblePages + 1, 1);
      for (let i = start; i <= end; i++) pageNumbers.push(i);
    }
    return pageNumbers;
  };

  // Star Rating Component
  const StarRating = ({ rating = 0, reviewCount = 0 }) => (
    <div className="flex items-center gap-1 mb-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={`${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">{reviewCount} reviews</span>
    </div>
  );

  // Pagination Component
  const Pagination = () => {
    if (totalPagesFiltered <= 1) return null;
    const pageNumbers = getPageNumbers();

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <ChevronLeft size={16} className="mr-1" /> Previous
        </button>

        {pageNumbers[0] > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              1
            </button>
            {pageNumbers[0] > 2 && <span className="px-2 text-gray-500">...</span>}
          </>
        )}

        {pageNumbers.map(num => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`px-3 py-2 text-sm font-medium rounded-lg ${
              currentPage === num
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {num}
          </button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPagesFiltered && (
          <>
            <span className="px-2 text-gray-500">...</span>
            <button
              onClick={() => handlePageChange(totalPagesFiltered)}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {totalPagesFiltered}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPagesFiltered}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
            currentPage === totalPagesFiltered
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Next <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    );
  };

  // Dropdown Filter Component (currently not used in main JSX for simplicity, SearchSection handles main dropdowns)
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

  // Checkbox Section Component for Sidebar Filters
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

  // Loading and Error States
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-[#f5f2eb] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-[#f5f2eb] min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <p className="mt-2">Make sure your Django server is running and accessible at the configured API URL.</p>
        </div>
      </div>
    );
  }

  // If there are no products *after* filtering
  if (filteredProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-[#f5f2eb] min-h-screen">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
          <button
            onClick={clearAllFilters}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#f5f2eb] min-h-screen flex gap-8">
      {/* Sidebar Filter Section */}
      <div className="w-64 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-6"> {/* Added sticky for better UX */}
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        {/* Checkbox Sections for Sidebar */}
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

      {/* Main Product Display Area */}
      <div className="flex-1">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
          </p>
          <p className="text-sm text-gray-500">Page {currentPage} of {totalPagesFiltered}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product, index) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="w-full h-48 mb-4 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={getProductImage(product, startIndex + index)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log(`Image error for ${product.name}, using fallback to ${image30}`);
                    e.target.src = image30; // Fallback to a specific default image
                  }}
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                  {product.name}
                </h3>
                <StarRating rating={product.rating || 4.5} reviewCount={product.views || 0} />

                <p className="text-sm text-gray-700">
                  {expandedDescriptions[product.id]
                    ? product.desc_longue
                    : `${product.desc_longue?.slice(0, 100) || ''}...`}
                  {product.desc_longue && product.desc_longue.length > 100 && (
                    <button
                      onClick={() => toggleDescription(product.id)}
                      className="ml-1 text-blue-600 hover:underline text-sm"
                    >
                      {expandedDescriptions[product.id] ? 'Lire moins' : 'Lire plus'}
                    </button>
                  )}
                </p>

                {/* Displaying product details */}
                {product.delai_production && <p className="text-sm text-gray-700"><strong>Délai production:</strong> {product.delai_production}</p>}
                {typeof product.est_pret === 'boolean' && <p className="text-sm text-gray-700"><strong>Prêt:</strong> {product.est_pret ? "Oui" : "Non"}</p>}
                {product.region_org && <p className="text-sm text-gray-700"><strong>Région:</strong> {product.region_org}</p>}
                {product.langue_du_product && <p className="text-sm text-gray-700"><strong>Langue:</strong> {product.langue_du_product}</p>}
                {/* CHANGED: Displaying product.category_name */}
                {product.category_name && <p className="text-sm text-gray-700">
                  <strong>Catégorie:</strong> {product.category_name}
                </p>}
                {product.brand && <p className="text-sm text-gray-700"><strong>Marque:</strong> {product.brand}</p>}
                {product.features && product.features.length > 0 && <p className="text-sm text-gray-700"><strong>Caractéristiques:</strong> {product.features.join(', ')}</p>}
                {product.sizes && product.sizes.length > 0 && <p className="text-sm text-gray-700"><strong>Tailles:</strong> {product.sizes.join(', ')}</p>}

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ${Number(product.prix_indicatif || product.price || 0).toFixed(2)}
                  </span>
                  <button className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors font-medium">
                    Quick Buy
                  </button>
                </div>
                <Link
                  to={`/product/${product.id}`} // This is crucial: uses the actual product.id
                  className="hover:underline text-blue-600 text-sm inline-block"
                > Voir plus
                </Link>
              </div>
            </div>
          ))}
        </div>

        <Pagination />
      </div>
    </div>
  );
};

export default ProductGrid;
