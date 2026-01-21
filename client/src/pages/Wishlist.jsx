import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/wishlist")
      .then((res) => setProducts(res.data))
      .catch(() => alert("Failed to load wishlist"));
  }, []);

  return (
    <div className="page">
      <h2>My Wishlist ❤️</h2>

      {products.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isOwner={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
