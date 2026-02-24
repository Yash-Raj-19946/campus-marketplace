import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import "../styles/auth.css";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    setLoading(true);
    try {
      const res = await API.get("/wishlist");
      setProducts(res.data);
    } catch (err) {
      console.error("Wishlist load error:", err);
      alert("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadWishlist(); }, []);

  return (
    <div className="page">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <section className="dashboard">

        {/* ── Header ── */}
        <div className="wishlist-header">
          <div className="wishlist-header-left">
            <span className="mybuys-eyebrow">Saved Items</span>
            <h1 className="page-title">My Wishlist</h1>
            <p className="page-subtitle">Products you've saved to revisit later.</p>
          </div>
          {products.length > 0 && (
            <div className="wishlist-count-badge">
              {products.length}
              <span>item{products.length !== 1 ? "s" : ""}</span>
            </div>
          )}
        </div>

        {/* ── Content ── */}
        {loading ? (
          <div className="db-empty">
            <div className="db-empty-icon" style={{ animation: "spin 1s linear infinite" }}>◌</div>
            <p className="db-empty-sub">Loading your wishlist…</p>
          </div>
        ) : products.length === 0 ? (
          <div className="db-empty">
            <div className="db-empty-icon">♡</div>
            <p className="db-empty-title">Nothing saved yet</p>
            <p className="db-empty-sub">Browse products and tap the wishlist button to save items here.</p>
          </div>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard
                key={product._id}
                product={product}
                isOwner={false}
                wishlistMode
                onRemoved={loadWishlist}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Wishlist;