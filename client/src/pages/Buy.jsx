import { useEffect, useState } from "react";
import { getBuyProducts } from "../api/product";
import ProductCard from "../components/ProductCard";
import "../styles/auth.css";

const Buy = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBuyProducts()
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard">
      <h1 className="page-title">Buy Products</h1>
      <p className="page-subtitle">Items available for purchase</p>

      {loading ? (
        <p className="empty-text">Loading products...</p>
      ) : (
        <div className="product-grid">
          {products.length === 0 ? (
            <p className="empty-text">No products available</p>
          ) : (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Buy;
