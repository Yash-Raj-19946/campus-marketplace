import { useEffect, useState } from "react";
import { getRentProducts } from "../api/product";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/auth.css";

const Rent = () => {
  const [products, setProducts] = useState([]);
  const [params] = useSearchParams();
  const search = params.get("search") || "";

  useEffect(() => {
    getRentProducts(search).then((res) => {
      setProducts(res.data);
    });
  }, [search]);

  return (
    <div className="dashboard">
      <h1 className="page-title">Rent Products</h1>
      <p className="page-subtitle">Items available for rent</p>

      <div className="product-grid">
        {products.length === 0 ? (
          <p className="empty-text">No products available</p>
        ) : (
          products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))
        )}
      </div>
    </div>
  );
};

export default Rent;
