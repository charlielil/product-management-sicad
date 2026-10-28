import React, { useState, useRef, useMemo } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import { initialProducts } from './data/products';
import './App.css';

function App() {
  const [products, setProducts] = useState(Array.isArray(initialProducts) ? initialProducts : []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Cart state para masundan ang mga dinagdag na item
  const [cartItems, setCartItems] = useState([]);

  const productListRef = useRef(null);

  const categories = useMemo(
    () => ['All', ...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);

      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const scrollToProducts = () => {
    productListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleOpenProductDetail = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const handleIncreaseQty = () => {
    setQuantity((prevQty) => Number(prevQty) + 1);
  };

  const handleDecreaseQty = () => {
    setQuantity((prevQty) => Math.max(1, Number(prevQty) - 1));
  };

  // Function para maidagdag sa cart state ang item kasama ang quantity nito
  const handleAddToCart = () => {
    if (!selectedProduct) return;

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.id === selectedProduct.id);
      if (existingItemIndex > -1) {
        const updated = [...prevItems];
        updated[existingItemIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevItems, { ...selectedProduct, quantity }];
      }
    });

    alert(`${quantity}x ${selectedProduct.name} added to cart!`);
    setSelectedProduct(null);
  };

  // Bilang ng kabuuang item sa cart para lumabas sa icon badge
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Check kung ang produkto o kasalukuyang quantity ay mababa sa 5 para sa low stock indicator
  const isModalLowStock = selectedProduct && (
    (selectedProduct.stock !== undefined && Number(selectedProduct.stock) < 5) || quantity < 5
  );

  return (
    <div className="app-container">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onScrollToProducts={scrollToProducts}
        cartCount={totalCartCount}
      />

      <main className="main-content">
        <Sidebar onShopNow={scrollToProducts} />

        <div ref={productListRef}>
          <ProductList
            products={products}
            filteredProducts={filteredProducts}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onSelectProduct={handleOpenProductDetail}
            onDeleteProduct={(id) => setProducts(products.filter(p => p.id !== id))}
          />
        </div>
      </main>

      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="modal-detail-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-detail-grid">
              <div className="modal-img-container" style={{ position: 'relative' }}>
                {isModalLowStock && (
                  <span className="low-stock-badge">LOW STOCK</span>
                )}
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>

              <div className="modal-detail-info">
                <h2>{selectedProduct.name}</h2>
                <p className="modal-cat">
                  Category: <span>[{selectedProduct.category}]</span> ⭐ {selectedProduct.rating || '4.3'}
                </p>
                <p className="modal-desc">{selectedProduct.description}</p>
                {selectedProduct.specifications && (
                  <p className="modal-specs">{selectedProduct.specifications}</p>
                )}

                <p className="modal-price">₱{selectedProduct.price ? Number(selectedProduct.price).toLocaleString() : 0}</p>

                <div className="quantity-section">
                  <label>Quantity:</label>
                  <div className="qty-controls">
                    <button type="button" onClick={handleDecreaseQty}>-</button>
                    <span>{quantity}</span>
                    <button type="button" onClick={handleIncreaseQty}>+</button>
                  </div>
                </div>

                <div className="subtotal-display">
                  Subtotal: <strong>₱{((selectedProduct.price || 0) * quantity).toLocaleString()}</strong>
                </div>

                <div className="modal-action-buttons">
                  <button
                    className="add-cart-btn"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="close-modal-btn"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <AddProduct
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}

export default App;