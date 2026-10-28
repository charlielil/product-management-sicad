import React from 'react';

function ProductCard({ product, onClick }) {
 
  const isLowStock = product?.stock !== undefined && Number(product.stock) < 5;

  return (
    <div 
      className={`product-card ${isLowStock ? 'low-stock' : ''}`} 
      onClick={onClick}
    >
      <div className="card-image-wrapper">
        {isLowStock && (
          <span className="low-stock-badge">LOW STOCK</span>
        )}
        <img src={product.image} alt={product.name} />
      </div>
      <div className="card-info">
        <h3>{product.name}</h3>
        <p className="price">₱{product.price ? product.price.toLocaleString() : 0}</p>
      </div>
    </div>
  );
}

export default ProductCard;