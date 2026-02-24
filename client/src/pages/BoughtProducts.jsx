import { useNavigate } from "react-router-dom";
import MyProductHistory from "../components/MyProductHistory";
import "../styles/auth.css";

const BoughtProducts = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <section className="dashboard">
        {/* Breadcrumb */}
        <button className="history-back" onClick={() => navigate("/my-buys")}>
          ← Back to Purchases
        </button>

        {/* Header block */}
        <div className="history-page-header">
          <div className="history-icon-badge bought-badge">🛍️</div>
          <div>
            <span className="mybuys-eyebrow">Purchase History</span>
            <h1 className="page-title">Bought Products</h1>
            <p className="page-subtitle">Items you've permanently purchased from sellers.</p>
          </div>
        </div>

        {/* Content panel */}
        <div className="history-panel">
          <MyProductHistory type="buy" />
        </div>
      </section>
    </div>
  );
};

export default BoughtProducts;