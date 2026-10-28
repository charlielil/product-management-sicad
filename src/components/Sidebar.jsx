import React from 'react';

function Sidebar({ onShopNow }) {
  return (
    <div className="hero-section">
      <div className="hero-text-content">
        <h1>Upgrade Your Spirits</h1>
        <p>Latest drinks, better life. Find the best liquor & wine at the best prices.</p>
        <button className="shop-now-btn" onClick={onShopNow}>
          Shop Now →
        </button>
      </div>
      <div className="hero-image-card">
        <img src="/photodesgn.jpg" alt="Liquor Store" />
      </div>
    </div>
  );
}

export default Sidebar;