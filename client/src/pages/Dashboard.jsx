import { useEffect, useState } from "react";
import { getMyProducts } from "../api/product";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import PostProduct from "../components/PostProduct";
import RequestList from "../components/RequestList";

import "../styles/auth.css";

const NAV_ITEMS = [
  { id: "products", label: "My Listings", icon: "⊞" },
  { id: "requests", label: "Requests", icon: "◈" },
];

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("products");
  const [showPost, setShowPost] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const loadProducts = async () => {
    try {
      const res = await getMyProducts();
      setProducts(res.data);
    } catch {
      setProducts([]);
    }
  };

  useEffect(() => { loadProducts(); }, []);
  useEffect(() => { setView("products"); }, [location.pathname]);

  const available = products.filter(p => p.status === "AVAILABLE").length;
  const sold = products.filter(p => p.status === "SOLD").length;
  const rented = products.filter(p => p.status === "RENTED").length;

  return (
    <div className="page db-layout">
      {/* Background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* ── LEFT SIDEBAR ── */}
      <aside className="db-sidebar">
        <div className="db-sidebar-inner">
          {/* Avatar / Identity block */}
          <div className="db-identity">
            <div className="db-avatar">M</div>
            <div>
              <p className="db-identity-name">My Store</p>
              <p className="db-identity-sub">Seller Dashboard</p>
            </div>
          </div>

          {/* Sidebar nav */}
          <nav className="db-nav">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                className={`db-nav-item ${view === item.id ? "active" : ""}`}
                onClick={() => setView(item.id)}
              >
                <span className="db-nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Divider */}
          <div className="db-divider" />

          {/* Quick links */}
          <p className="db-section-label">Quick Access</p>
          <button className="db-nav-item" onClick={() => navigate("/chat")}>
            <span className="db-nav-icon">💬</span> My Chats
          </button>
          <button className="db-nav-item" onClick={() => navigate("/my-buys")}>
            <span className="db-nav-icon">🛍️</span> My Purchases
          </button>
          <button className="db-nav-item" onClick={() => navigate("/wishlist")}>
            <span className="db-nav-icon">♡</span> Wishlist
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="db-main">

        {/* Stats strip */}
        <div className="db-stats-strip">
          <div className="db-stat">
            <span className="db-stat-num">{products.length}</span>
            <span className="db-stat-label">Total Listed</span>
          </div>
          <div className="db-stat-divider" />
          <div className="db-stat">
            <span className="db-stat-num" style={{ color: "#34d399" }}>{available}</span>
            <span className="db-stat-label">Available</span>
          </div>
          <div className="db-stat-divider" />
          <div className="db-stat">
            <span className="db-stat-num" style={{ color: "#fb7eb8" }}>{sold}</span>
            <span className="db-stat-label">Sold</span>
          </div>
          <div className="db-stat-divider" />
          <div className="db-stat">
            <span className="db-stat-num" style={{ color: "#22d3ee" }}>{rented}</span>
            <span className="db-stat-label">Rented Out</span>
          </div>
          <div className="db-stat-actions">
            <button className="db-post-trigger" onClick={() => setShowPost(v => !v)}>
              {showPost ? "✕ Close" : "+ New Listing"}
            </button>
          </div>
        </div>

        {/* Post product panel (collapsible) */}
        {showPost && view === "products" && (
          <div className="db-post-panel">
            <PostProduct onPosted={() => { loadProducts(); setShowPost(false); }} />
          </div>
        )}

        {/* ── REQUESTS VIEW ── */}
        {view === "requests" && (
          <div className="db-section-card">
            <div className="db-section-header">
              <h2 className="db-section-title">Incoming Requests</h2>
              <p className="db-section-sub">Review and respond to buy/rent requests from buyers.</p>
            </div>
            <RequestList onDone={() => setView("products")} />
          </div>
        )}

        {/* ── LISTINGS VIEW ── */}
        {view === "products" && (
          <div className="db-section-card">
            <div className="db-section-header">
              <h2 className="db-section-title">My Listings</h2>
              <p className="db-section-sub">All products you've posted for sale or rent.</p>
            </div>

            {products.length === 0 ? (
              <div className="db-empty">
                <div className="db-empty-icon">⊞</div>
                <p className="db-empty-title">No listings yet</p>
                <p className="db-empty-sub">Click "New Listing" above to post your first product.</p>
              </div>
            ) : (
              <div className="product-grid">
                {products.map(p => (
                  <ProductCard key={p._id} product={p} isOwner onRemoved={loadProducts} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;