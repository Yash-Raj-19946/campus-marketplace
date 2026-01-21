import { useEffect, useState } from "react";
import { getMyProducts } from "../api/product";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import PostProduct from "../components/PostProduct";
import RequestList from "../components/RequestList";

import "../styles/auth.css";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("products");
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

  useEffect(() => {
    loadProducts();
  }, []);

  // 🔥 RESET VIEW AFTER REDIRECT
  useEffect(() => {
    setView("products");
  }, [location.pathname]);

  return (
    <div className="page">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <section className="dashboard">
        <h1 style={{ marginBottom: "14px" }}>My Dashboard</h1>
        <p style={{ marginBottom: "36px" }}>
          Post products, manage listings, and handle requests.
        </p>

        {/* 🔹 TOP ACTION BUTTONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "22px",
            marginBottom: "60px",
            flexWrap: "wrap",
          }}
        >
          <button className="post-btn" onClick={() => navigate("/chat")}>
            My Chats
          </button>

          <button className="post-btn" onClick={() => setView("requests")}>
            Requests
          </button>

          <button className="post-btn" onClick={() => navigate("/my-buys")}>
            My Buys
          </button>

          {/* 🔥 NEW WISHLIST BUTTON */}
          <button
            className="post-btn"
            onClick={() => navigate("/wishlist")}
          >
            Wishlist 🤍
          </button>
        </div>

        {/* 🔁 REQUESTS */}
        {view === "requests" && (
          <RequestList onDone={() => setView("products")} />
        )}

        {/* 🔁 MY PRODUCTS */}
        {view === "products" && (
          <>
            <div className="dashboard-section">
              <PostProduct onPosted={loadProducts} />
            </div>

            <h2 className="section-title">My Products</h2>

            {products.length === 0 ? (
              <p className="empty-text">No products posted yet.</p>
            ) : (
              <div className="product-grid">
                {products.map((p) => (
                  <ProductCard
                    key={p._id}
                    product={p}
                    isOwner
                    onRemoved={loadProducts}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
