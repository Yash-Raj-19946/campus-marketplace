import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../api/product";
import { requestBuy, requestRent } from "../api/request";
import "../styles/auth.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p className="empty-text">Loading...</p>;

  return (
    <div className="page">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <section className="dashboard">
        <h1 className="page-title">Product Details</h1>

        <div className="post-product-box" style={{ textAlign: "left" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(240px, 380px) 1fr",
              gap: "24px",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                borderRadius: "18px",
                aspectRatio: "1 / 1",
                objectFit: "cover",
              }}
            />

            <div>
              <h2 style={{ marginBottom: "10px" }}>{product.title}</h2>
              <p style={{ marginBottom: "12px", color: "var(--text-muted)" }}>
                {product.description}
              </p>
              <p style={{ marginBottom: "14px", color: "var(--cyan-300)" }}>
                Rs {product.price}
              </p>

              {product.status === "AVAILABLE" && (
                <>
                  {product.type === "buy" ? (
                    <button
                      className="btn-primary"
                      onClick={() => requestBuy(product._id)}
                    >
                      Request to Buy
                    </button>
                  ) : (
                    <button
                      className="btn-primary"
                      onClick={() => requestRent(product._id)}
                    >
                      Request to Rent
                    </button>
                  )}
                </>
              )}

              {product.status === "IN_NEGOTIATION" && (
                <p style={{ marginTop: "14px" }}>Currently under negotiation</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
