import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const MyBuys = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <section className="dashboard">
        {/* Page header */}
        <div className="mybuys-header">
          <span className="mybuys-eyebrow">Transaction History</span>
          <h1 className="page-title">My Purchases</h1>
          <p className="page-subtitle">View everything you've bought or rented on the platform.</p>
        </div>

        {/* Choice cards */}
        <div className="mybuys-grid">

          <button className="mybuys-card" onClick={() => navigate("/my-buys/bought")}>
            <div className="mybuys-card-icon bought-icon">🛍️</div>
            <div className="mybuys-card-body">
              <h3 className="mybuys-card-title">Bought Products</h3>
              <p className="mybuys-card-desc">Items you've permanently purchased from sellers.</p>
            </div>
            <span className="mybuys-card-arrow">→</span>
          </button>

          <button className="mybuys-card" onClick={() => navigate("/my-buys/rented")}>
            <div className="mybuys-card-icon rented-icon">📦</div>
            <div className="mybuys-card-body">
              <h3 className="mybuys-card-title">Rented Products</h3>
              <p className="mybuys-card-desc">Items you've rented — active, past, and upcoming.</p>
            </div>
            <span className="mybuys-card-arrow">→</span>
          </button>

        </div>
      </section>
    </div>
  );
};

export default MyBuys;