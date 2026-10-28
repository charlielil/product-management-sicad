import React, { useState } from 'react';

function AddProduct({ isOpen, onClose, onAddProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Brandy',
    price: '',
    stock: '',
    rating: '4.9',
    image: '',
    description: '',
    specifications: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    onAddProduct({
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock) || 10,
      rating: parseFloat(formData.rating) || 4.9,
      image: formData.image || '/photodesgn.jpg',
      description: formData.description || 'Premium quality drink.',
      specifications: formData.specifications || 'Standard specifications.'
    });

    setFormData({
      name: '',
      category: 'Brandy',
      price: '',
      stock: '',
      rating: '4.9',
      image: '',
      description: '',
      specifications: ''
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input 
              type="text" 
              name="name" 
              required 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="e.g. Hennessy VSOP"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Brandy">Brandy</option>
              <option value="Whiskey">Whiskey</option>
              <option value="Wine">Wine</option>
              <option value="Rum">Rum</option>
              <option value="Beer">Beer</option>
              <option value="Vodka">Vodka</option>
              <option value="Sparkling">Sparkling</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (₱)</label>
              <input 
                type="number" 
                name="price" 
                required 
                value={formData.price} 
                onChange={handleChange} 
                placeholder="0"
              />
            </div>
            <div className="form-group">
              <label>Quantity (Stock)</label>
              <input 
                type="number" 
                name="stock" 
                value={formData.stock} 
                onChange={handleChange} 
                placeholder="10"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Rating (1-5)</label>
              <input 
                type="text" 
                name="rating" 
                value={formData.rating} 
                onChange={handleChange} 
                placeholder="4.9"
              />
            </div>
            <div className="form-group">
              <label>Image File Path / URL</label>
              <input 
                type="text" 
                name="image" 
                value={formData.image} 
                onChange={handleChange} 
                placeholder="Paste image URL here..."
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
              rows="2"
              placeholder="Brief description..."
            ></textarea>
          </div>

          <div className="form-group">
            <label>Specifications</label>
            <input 
              type="text" 
              name="specifications" 
              value={formData.specifications} 
              onChange={handleChange} 
              placeholder="Specs..."
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            {/* Kulay berde na rin ang Save Product button dito */}
            <button 
              type="submit" 
              style={{
                background: '#10b981',
                color: 'white',
                fontWeight: 'bold',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;