import { useNavigate } from "react-router-dom";
import MyProductHistory from "../components/MyProductHistory";
import "../styles/auth.css";

const RentedProducts = () => {
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
          <div className="history-icon-badge rented-badge">📦</div>
          <div>
            <span className="mybuys-eyebrow">Rental History</span>
            <h1 className="page-title">Rented Products</h1>
            <p className="page-subtitle">Products you are currently renting or have rented before.</p>
          </div>
        </div>

        {/* Content panel */}
        <div className="history-panel">
          <MyProductHistory type="rent" />
        </div>
      </section>
    </div>
  );
};

export default RentedProducts;