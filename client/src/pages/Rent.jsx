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
    <div className="page">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <section className="dashboard">
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
      </section>
    </div>
  );
};

export default Rent;
