import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { accessChat } from "../api/chat";
import { requestBuy, requestRent } from "../api/request";
import "../styles/auth.css";

const ProductCard = ({ product, isOwner }) => {
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  /* RENT STATES */
  const [rentFrom, setRentFrom] = useState("");
  const [rentTo, setRentTo] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  /* 🔥 RENTED LOGIC */
  const isRented = product.type === "rent" && product.status === "RENTED";

  const availableAfter =
    isRented && product.rentTo
      ? new Date(
          new Date(product.rentTo).getTime() + 24 * 60 * 60 * 1000
        ).toLocaleDateString()
      : null;

  const today = new Date().toISOString().split("T")[0];

  const minEndDate = rentFrom
    ? new Date(new Date(rentFrom).getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    : today;

  /* CHAT */
  const openChat = async () => {
    try {
      const receiverId =
        typeof product.owner === "object"
          ? product.owner._id
          : product.owner;

      const res = await accessChat(receiverId, product._id);
      navigate(`/chat/${res.data._id}`);
    } catch {
      alert("Failed to open chat");
    }
  };

  /* RENT CALCULATION */
  const calculateRent = (from, to) => {
    if (!from || !to) {
      setTotalDays(0);
      setTotalPrice(0);
      return;
    }

    const start = new Date(from);
    const end = new Date(to);
    if (end < start) return;

    const days =
      Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    setTotalDays(days);
    setTotalPrice(days * product.price);
  };

  /* CONFIRM BUY / RENT */
  const confirmRequest = async () => {
    try {
      if (product.type === "buy") {
        await requestBuy(product._id);
      } else {
        if (!rentFrom || !rentTo || totalDays < 1) {
          alert("Select valid rent dates");
          return;
        }

        await requestRent(product._id, {
          rentFrom,
          rentTo,
          totalDays,
          totalPrice,
        });
      }

      setRequestSent(true);
      setShowConfirm(false);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Request failed");
    }
  };

  const cancelRequest = () => {
    setShowConfirm(false);
    navigate("/dashboard");
  };

  return (
    <div
      className="product-card"
      style={{
        opacity: isRented ? 0.45 : 1,
        pointerEvents: isRented ? "none" : "auto",
      }}
    >
      {/* IMAGE */}
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </div>

      {/* BASIC INFO */}
      <h4 className="product-title">{product.title}</h4>

      <p className="product-price">
        ₹ {product.price}
        {product.type === "rent" && <span> / day</span>}
      </p>

      <span className="product-status">{product.status}</span>

      {/* RENTED INFO */}
      {isRented && (
        <p
          style={{
            marginTop: "6px",
            fontSize: "13px",
            color: "#374151",
            fontWeight: 500,
          }}
        >
          Available for rent after <strong>{availableAfter}</strong>
        </p>
      )}

      {/* DESCRIPTION */}
      {product.description?.trim() && (
        <div style={{ marginTop: "8px" }}>
          <button
            className="btn-chat"
            style={{ width: "100%" }}
            onClick={() => setShowDescription(!showDescription)}
          >
            {showDescription ? "Hide Description" : "View Description"}
          </button>

          {showDescription && (
            <div
              style={{
                marginTop: "10px",
                padding: "14px",
                borderRadius: "14px",
                background: "rgba(99,102,241,0.12)",
                color: "#1f2937",
                fontSize: "14px",
                lineHeight: "1.6",
              }}
            >
              {product.description}
            </div>
          )}
        </div>
      )}

      {/* BUYER ACTIONS (DISABLED WHEN RENTED) */}
      {!isOwner && !isRented && (
        <div className="buyer-actions">
          {!requestSent && (
            <>
              {!showConfirm ? (
                <button
                  className="btn-primary"
                  onClick={() => setShowConfirm(true)}
                >
                  Request {product.type === "buy" ? "Buy" : "Rent"}
                </button>
              ) : (
                <>
                  {product.type === "rent" && (
                    <div className="rent-box">
                      <label>
                        From
                        <input
                          type="date"
                          min={today}
                          value={rentFrom}
                          onChange={(e) => {
                            setRentFrom(e.target.value);
                            calculateRent(e.target.value, rentTo);
                          }}
                        />
                      </label>

                      <label>
                        To
                        <input
                          type="date"
                          min={minEndDate}
                          value={rentTo}
                          onChange={(e) => {
                            setRentTo(e.target.value);
                            calculateRent(rentFrom, e.target.value);
                          }}
                        />
                      </label>

                      {totalDays > 0 && (
                        <p className="rent-price">
                          ₹{product.price}/day × {totalDays} days ={" "}
                          <strong>₹{totalPrice}</strong>
                        </p>
                      )}
                    </div>
                  )}

                  <div className="confirm-row">
                    <button className="btn-cancel" onClick={cancelRequest}>
                      Cancel
                    </button>
                    <button className="btn-confirm" onClick={confirmRequest}>
                      Confirm {product.type === "buy" ? "Buy" : "Rent"}
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}

      {/* CHAT ALWAYS CLICKABLE */}
      {!isOwner && (
        <button
          className="btn-chat"
          onClick={openChat}
          style={{ pointerEvents: "auto", opacity: 1 }}
        >
          💬 Chat with Seller
        </button>
      )}
    </div>
  );
};

export default ProductCard;
