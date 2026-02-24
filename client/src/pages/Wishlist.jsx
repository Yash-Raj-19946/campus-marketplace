import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import "../styles/auth.css";

const Wishlist = () => {
  const [products, setProducts] = useState([]);

  const loadWishlist = async () => {
    try {
      const res = await API.get("/wishlist");
      setProducts(res.data);
    } catch (err) {
      console.error("Wishlist load error:", err);
      alert("Failed to load wishlist");
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  return (
    <div className="page">
      {/* 🔥 THEME BLOBS (same as Dashboard) */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <section className="dashboard">
        {/* 🔹 TITLE */}
        <h1 style={{ marginBottom: "14px" }}>
          My Wishlist ❤️
        </h1>

        {/* 🔹 SUBTITLE */}
        <p style={{ marginBottom: "36px" }}>
          Products you’ve saved for later.
        </p>

        {products.length === 0 ? (
          <p className="empty-text">
            No items in your wishlist yet 🤍
          </p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
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
