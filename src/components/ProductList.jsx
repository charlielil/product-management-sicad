import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ 
  products, 
  filteredProducts, 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  onOpenAddModal, 
  onSelectProduct, 
  onDeleteProduct 
}) {
  return (
    <div className="list-container">
      {/* FEATURED PRODUCTS */}
      <section className="section-block">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          {products.slice(0, 5).map(product => (
            <ProductCard 
              key={`feat-${product.id}`} 
              product={product} 
              onClick={() => onSelectProduct(product)} 
            />
          ))}
        </div>
      </section>

      {/* PRODUCT LIST SECTION WITH DROPDOWN AND ADD BUTTON */}
      <section className="section-block">
        <div className="list-header-row">
          <h2 className="section-title">Product List</h2>
          <div className="list-controls-right">
            <select 
              className="category-select" 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button className="add-new-btn" onClick={onOpenAddModal}>
              + Add New
            </button>
          </div>
        </div>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => onSelectProduct(product)} 
                onDelete={onDeleteProduct} 
              />
            ))
          ) : (
            <div className="no-products">Walang nahanap na produkto.</div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProductList;