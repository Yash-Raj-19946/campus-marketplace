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
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <h2 style={{ marginBottom: "28px" }}>My Wishlist ❤️</h2>

      {products.length === 0 ? (
        <p className="empty-text">No items in wishlist</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isOwner={false}     // 🔥 IMPORTANT
              wishlistMode        // 🔥 shows "Remove from Wishlist"
              onRemoved={loadWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
