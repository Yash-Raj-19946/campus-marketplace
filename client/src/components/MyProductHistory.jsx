import { useEffect, useState } from "react";
import { getMyHistory } from "../api/request";
import { accessChat } from "../api/chat";
import { useNavigate } from "react-router-dom";

const MyProductHistory = ({ type }) => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyHistory()
      .then((res) => setHistory(res.data || []))
      .catch(() => setHistory([]));
  }, []);

  const openChatWithSeller = async (sellerId, productId) => {
    try {
      const res = await accessChat(sellerId, productId);
      navigate(`/chat/${res.data._id}`);
    } catch {
      alert("Failed to open chat");
    }
  };

  const filtered = history.filter(
    (h) => h.type === type && h.product !== null
  );

  /* ── Empty State ── */
  if (filtered.length === 0) {
    return (
      <div className="db-empty" style={{ padding: "70px 20px" }}>
        <div className="db-empty-icon">{type === "rent" ? "📦" : "🛍️"}</div>
        <p className="db-empty-title">
          No {type === "rent" ? "rentals" : "purchases"} yet
        </p>
        <p className="db-empty-sub">
          Once you {type === "rent" ? "rent" : "buy"} something, it will appear here.
        </p>
      </div>
    );
  }

  /* ── Product Grid ── */
  return (
    <div className="product-grid">
      {filtered.map((r) => (
        <div key={r._id} className="history-card">

          {/* Image */}
          <div className="history-img-wrap">
            <img
              src={r.product.image}
              alt={r.product.title}
              className="history-img"
            />
            {/* Type badge */}
            <span className={`history-type-badge ${type === "rent" ? "badge-rent" : "badge-buy"}`}>
              {type === "rent" ? "Rental" : "Purchase"}
            </span>
          </div>

          {/* Body */}
          <div className="history-body">
            <h3 className="history-title">{r.product.title}</h3>

            {type === "buy" ? (
              <>
                <p className="history-price">₹ {r.product.price}</p>
                <div className="history-meta-row">
                  <span className="history-meta-label">Purchased on</span>
                  <span className="history-meta-value">
                    {new Date(r.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </span>
                </div>
                <div className="history-status-pill sold">✓ Completed</div>
              </>
            ) : (
              <>
                <p className="history-price">₹ {r.product.price} <span className="history-per-day">/ day</span></p>

                <div className="history-total-row">
                  <span>Total paid</span>
                  <strong>₹ {r.totalPrice}</strong>
                </div>

                <div className="history-date-range">
                  <div className="history-date-block">
                    <span className="history-meta-label">From</span>
                    <span className="history-meta-value">
                      {new Date(r.rentFrom).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short"
                      })}
                    </span>
                  </div>
                  <div className="history-date-arrow">→</div>
                  <div className="history-date-block">
                    <span className="history-meta-label">Until</span>
                    <span className="history-meta-value">
                      {new Date(r.rentTo).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short"
                      })}
                    </span>
                  </div>
                </div>

                <button
                  className="history-chat-btn"
                  onClick={() => openChatWithSeller(r.seller, r.product._id)}
                >
                  💬 Message Seller
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyProductHistory;