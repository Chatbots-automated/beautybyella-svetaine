import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { Search, SlidersHorizontal, X, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCartStore } from '../store/cartStore';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number | null;
  imageurl: string;
  category: string;
  stock: number;
  isNew?: boolean;
  isTopSeller?: boolean;
  hasDiscount?: boolean;
  oldPrice?: number;
}

interface QuickViewProduct extends Product {
  isOpen: boolean;
}

const ITEMS_PER_PAGE = 12;

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState<QuickViewProduct | null>(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  const { addItem, items } = useCartStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (sortOrder) {
      filtered.sort((a, b) => {
        if (!a.price) return 1;
        if (!b.price) return -1;
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchQuery, selectedCategory, sortOrder]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) throw error;

      if (data) {
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Klaida gaunant produktus:', error);
      setError(error instanceof Error ? error.message : 'Nepavyko gauti produktų');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (product.price !== null && product.stock > 0) {
      const cartItem = items.find(item => item.id === product.id);
      const currentQuantity = cartItem?.quantity || 0;
      
      if (currentQuantity < product.stock) {
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          imageurl: product.imageurl,
        });
      }
    }
  };

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const ProductBadges: React.FC<{ product: Product }> = ({ product }) => {
    const cartItem = items.find(item => item.id === product.id);
    const remainingStock = product.stock - (cartItem?.quantity || 0);

    return (
      <div className="absolute top-2 left-2 flex flex-col gap-1">
        {product.isNew && (
          <span className="bg-accent text-white px-2 py-1 rounded-full text-xs font-medium">
            Naujas
          </span>
        )}
        {product.isTopSeller && (
          <span className="bg-yellow-400 text-white px-2 py-1 rounded-full text-xs font-medium">
            Top
          </span>
        )}
        {product.hasDiscount && (
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Akcija
          </span>
        )}
        {remainingStock === 0 && (
          <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Išparduota
          </span>
        )}
        {remainingStock > 0 && remainingStock < 5 && (
          <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Liko {remainingStock} vnt.
          </span>
        )}
      </div>
    );
  };

  const FilterMenu = () => (
    <Dialog
      open={isFilterMenuOpen}
      onClose={() => setIsFilterMenuOpen(false)}
      className="relative z-50 lg:hidden"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-end justify-center p-4 sm:items-center">
        <Dialog.Panel className="mx-auto w-full max-w-sm rounded-t-2xl sm:rounded-2xl bg-white p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Filtrai</h3>
            <button onClick={() => setIsFilterMenuOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Kategorija</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              >
                <option value="">Visos kategorijos</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Rūšiuoti</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc' | '')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              >
                <option value="">Rūšiuoti pagal kainą</option>
                <option value="asc">Nuo pigiausių</option>
                <option value="desc">Nuo brangiausių</option>
              </select>
            </div>
            
            <button
              onClick={() => setIsFilterMenuOpen(false)}
              className="w-full btn-primary mt-4"
            >
              Pritaikyti
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 shadow-soft animate-pulse"
          >
            <div className="aspect-[3/4] bg-gray-200 rounded-xl mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Klaida kraunant produktus: {error}</p>
        <button 
          onClick={() => {
            setError(null);
            setLoading(true);
            fetchProducts();
          }}
          className="btn-primary"
        >
          Bandyti dar kartą
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Ieškoti produktų..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-accent"
            />
          </div>
          
          <button
            onClick={() => setIsFilterMenuOpen(true)}
            className="lg:hidden p-2 border border-gray-200 rounded-full"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        <div className="hidden lg:flex gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-accent"
          >
            <option value="">Visos kategorijos</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc' | '')}
            className="px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-accent"
          >
            <option value="">Rūšiuoti pagal kainą</option>
            <option value="asc">Nuo pigiausių</option>
            <option value="desc">Nuo brangiausių</option>
          </select>
        </div>
      </div>

      <FilterMenu />

      {paginatedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-secondary">Produktų nerasta.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => {
              const cartItem = items.find(item => item.id === product.id);
              const remainingStock = product.stock - (cartItem?.quantity || 0);

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-shadow duration-300"
                >
                  <div 
                    className="aspect-[3/4] relative overflow-hidden cursor-pointer"
                    onClick={() => setQuickViewProduct({ ...product, isOpen: true })}
                  >
                    <img
                      src={product.imageurl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <ProductBadges product={product} />
                  </div>
                  <div className="p-4 sm:p-6">
                    <span className="text-xs font-medium text-accent uppercase tracking-wider mb-2 inline-block">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-lg mb-2">{product.name}</h3>
                    <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        {product.hasDiscount && product.oldPrice && (
                          <span className="text-sm text-gray-400 line-through mr-2">
                            €{product.oldPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-lg font-serif">
                          {product.price !== null && product.price !== undefined
                            ? `€${product.price.toFixed(2)}`
                            : 'Kaina nenurodyta'}
                        </span>
                      </div>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className={`text-sm font-medium ${
                          remainingStock > 0
                            ? 'text-accent hover:text-accent-dark'
                            : 'text-gray-400 cursor-not-allowed'
                        } transition-colors`}
                        disabled={remainingStock === 0}
                      >
                        {remainingStock > 0 ? 'Į krepšelį' : 'Išparduota'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2 flex-wrap">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded-full ${
                    currentPage === index + 1
                      ? 'bg-accent text-white'
                      : 'bg-white text-text-primary hover:bg-accent/10'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {quickViewProduct && (
          <Dialog
            open={quickViewProduct.isOpen}
            onClose={() => setQuickViewProduct(null)}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-2xl p-4 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                  <Dialog.Title className="text-xl sm:text-2xl font-serif">
                    {quickViewProduct.name}
                  </Dialog.Title>
                  <button
                    onClick={() => setQuickViewProduct(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <img
                      src={quickViewProduct.imageurl}
                      alt={quickViewProduct.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <ProductBadges product={quickViewProduct} />
                  </div>
                  
                  <div>
                    <p className="text-text-secondary mb-4">
                      {quickViewProduct.description}
                    </p>
                    
                    <div className="mb-4">
                      {quickViewProduct.hasDiscount && quickViewProduct.oldPrice && (
                        <span className="text-sm text-gray-400 line-through mr-2">
                          €{quickViewProduct.oldPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-2xl font-serif">
                        {quickViewProduct.price !== null && quickViewProduct.price !== undefined
                          ? `€${quickViewProduct.price.toFixed(2)}`
                          : 'Kaina nenurodyta'}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => {
                        handleAddToCart(quickViewProduct);
                        setQuickViewProduct(null);
                      }}
                      className={`w-full ${
                        quickViewProduct.stock > 0 
                          ? 'btn-primary' 
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed px-6 py-3 rounded-full'
                      }`}
                      disabled={quickViewProduct.stock === 0}
                    >
                      {quickViewProduct.stock > 0 ? 'Į krepšelį' : 'Išparduota'}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductGrid;