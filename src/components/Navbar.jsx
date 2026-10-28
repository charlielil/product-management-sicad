import React from 'react';

function Navbar({ searchTerm, setSearchTerm, onScrollToProducts, cartCount }) {
  return (
    <nav className="top-navbar">
      <div className="nav-left">
        <span className="nav-link active" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</span>
        <span className="nav-link" onClick={onScrollToProducts}>Products</span>
      </div>
      <div className="nav-right">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search for products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="cart-icon-btn" title="Cart" style={{ position: 'relative', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-10px',
              background: '#f59e0b',
              color: '#000',
              fontSize: '11px',
              fontWeight: 'bold',
              borderRadius: '50%',
              padding: '2px 6px',
              minWidth: '18px',
              textAlign: 'center'
            }}>
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;