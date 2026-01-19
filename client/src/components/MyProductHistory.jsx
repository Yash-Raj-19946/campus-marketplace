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

  /* ================= EMPTY STATE ================= */
  if (filtered.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px 20px",
          color: "#6b7280",
        }}
      >
        <h2 style={{ fontSize: "1.6rem", marginBottom: "10px" }}>
          No {type === "rent" ? "rented" : "bought"} products yet
        </h2>
        <p style={{ fontSize: "1rem" }}>
          Once you {type === "rent" ? "rent" : "buy"} something, it will appear
          here.
        </p>
      </div>
    );
  }

  /* ================= PRODUCT GRID ================= */
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "28px",
        marginTop: "30px",
      }}
    >
      {filtered.map((r) => (
        <div
          key={r._id}
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "16px",
            boxShadow: "0 20px 45px rgba(0,0,0,0.12)",
            display: "flex",
            flexDirection: "column",
            transition: "transform 0.25s ease",
          }}
        >
          {/* IMAGE */}
          <div
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              borderRadius: "14px",
              overflow: "hidden",
              marginBottom: "12px",
            }}
          >
            <img
              src={r.product.image}
              alt={r.product.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* TITLE */}
          <h3
            style={{
              fontSize: "1.05rem",
              fontWeight: "700",
              marginBottom: "6px",
            }}
          >
            {r.product.title}
          </h3>

          {/* BUY / RENT INFO */}
          {type === "buy" ? (
            <>
              <p style={{ color: "#4f46e5", fontWeight: "600" }}>
                ₹ {r.product.price}
              </p>
              <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                Purchased on{" "}
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </>
          ) : (
            <>
              <p style={{ fontWeight: "600", color: "#4f46e5" }}>
                ₹ {r.product.price} / day
              </p>
              <p>Total: ₹ {r.totalPrice}</p>
              <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                {new Date(r.rentFrom).toLocaleDateString()} →{" "}
                {new Date(r.rentTo).toLocaleDateString()}
              </p>

              {/* CHAT */}
              <button
                onClick={() =>
                  openChatWithSeller(r.seller, r.product._id)
                }
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  background: "#f9fafb",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                💬 Chat with Seller
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyProductHistory;
