import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { accessChat } from "../api/chat";
import { requestBuy, requestRent } from "../api/request";
import { takeDownProduct } from "../api/product";
import API from "../api/axios";
import "../styles/auth.css";

const ProductCard = ({
  product,
  isOwner,
  onRemoved,
  wishlistMode = false,
}) => {
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  /* RENT STATES */
  const [rentFrom, setRentFrom] = useState("");
  const [rentTo, setRentTo] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  /* STATUS FLAGS */
  const isRented = product.type === "rent" && product.status === "RENTED";
  const isSold = product.status === "SOLD";
  const isUnavailable = isRented || isSold;

  const availableAfter =
    isRented && product.rentTo
      ? new Date(product.rentTo).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
      : null;

  const today = new Date().toISOString().split("T")[0];
  const minEndDate = rentFrom || today;

  /* CHAT */
  const openChat = async () => {
    const receiverId =
      typeof product.owner === "object" ? product.owner._id : product.owner;
    const res = await accessChat(receiverId, product._id);
    navigate(`/chat/${res.data._id}`);
  };

  /* RENT CALC */
  const calculateRent = (from, to) => {
    if (!from || !to) return;
    const start = new Date(from);
    const end = new Date(to);
    if (end < start) return;
    const days = Math.ceil((end - start) / 86400000) + 1;
    setTotalDays(days);
    setTotalPrice(days * product.price);
  };

  /* CONFIRM */
  const confirmRequest = async () => {
    try {
      if (product.type === "rent") {
        if (!rentFrom || !rentTo || totalDays < 1) {
          alert("Select valid rent dates");
          return;
        }
        await requestRent(product._id, { rentFrom, rentTo, totalDays, totalPrice });
      } else {
        await requestBuy(product._id);
      }
      navigate("/dashboard");
    } catch {
      alert("Request failed");
    }
  };

  /* TAKE DOWN */
  const handleTakeDown = async () => {
    if (!window.confirm("Take down this product?")) return;
    await takeDownProduct(product._id);
    onRemoved && onRemoved();
  };

  /* WISHLIST */
  const addToWishlist = async () => {
    try {
      const res = await API.post("/wishlist", { productId: product._id });
      alert(res.data?.msg || "Added to wishlist 🤍");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to add to wishlist");
    }
  };

  const removeFromWishlist = async () => {
    try {
      await API.delete(`/wishlist/${product._id}`);
      onRemoved && onRemoved();
    } catch {
      alert("Failed to remove from wishlist");
    }
  };

  /* Status label */
  const statusLabel = isSold ? "Sold" : isRented ? "Rented" : "Available";
  const statusClass = isSold ? "status-sold" : isRented ? "status-rented" : "status-available";

  return (
    <>
      <div className={`product-card ${isUnavailable ? "pc-unavailable" : ""}`}>

        {/* ── IMAGE ── */}
        <div className="product-image-wrapper">
          <img src={product.image} alt={product.title} className="product-image" />

          {/* Type pill on image */}
          <span className={`pc-type-pill ${product.type === "rent" ? "type-rent" : "type-buy"}`}>
            {product.type === "rent" ? "Rent" : "Buy"}
          </span>

          {/* Unavailable overlay */}
          {isUnavailable && (
            <div className="pc-unavailable-overlay">
              <span>{statusLabel}</span>
            </div>
          )}
        </div>

        {/* ── BODY ── */}
        <div className="pc-body">
          <div className="pc-title-row">
            <h4 className="product-title">{product.title}</h4>
            <span className={`pc-status-dot ${statusClass}`} title={statusLabel} />
          </div>

          <p className="product-price">
            ₹ {product.price}
            {product.type === "rent" && <span className="pc-per-day"> / day</span>}
          </p>

          {isRented && availableAfter && (
            <p className="pc-avail-note">Available after <strong>{availableAfter}</strong></p>
          )}

          {/* Description trigger */}
          {product.description?.trim() && (
            <button className="pc-desc-btn" onClick={() => setShowDescription(true)}>
              View Description ↗
            </button>
          )}

          {/* ── OWNER CONTROLS ── */}
          {isOwner && product.status === "AVAILABLE" && (
            <button className="btn-cancel pc-full-btn" onClick={handleTakeDown}>
              Take Down Listing
            </button>
          )}

          {/* ── BUYER ACTIONS ── */}
          {!isOwner && !isUnavailable && (
            <>
              {!showConfirm ? (
                <div className="pc-action-group">
                  <button className="btn-primary pc-full-btn" onClick={() => setShowConfirm(true)}>
                    {product.type === "buy" ? "Buy Now" : "Rent Now"}
                  </button>

                  <div className="pc-secondary-row">
                    <button className="btn-chat" onClick={openChat}>💬 Chat</button>
                    {wishlistMode ? (
                      <button className="btn-cancel" onClick={removeFromWishlist}>✕ Remove</button>
                    ) : (
                      <button className="btn-chat" onClick={addToWishlist}>♡ Save</button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="pc-confirm-panel">
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
                          ₹{product.price} × {totalDays} days = <strong>₹{totalPrice}</strong>
                        </p>
                      )}
                    </div>
                  )}
                  <div className="confirm-row">
                    <button className="btn-cancel" onClick={() => setShowConfirm(false)}>Cancel</button>
                    <button className="btn-confirm" onClick={confirmRequest}>Confirm</button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Chat-only for buyer after unavailable check */}
          {!isOwner && isUnavailable && (
            <button className="btn-chat pc-full-btn" onClick={openChat}>💬 Chat with Seller</button>
          )}
        </div>
      </div>

      {/* ── DESCRIPTION MODAL ── */}
      {showDescription && (
        <div className="desc-overlay" onClick={() => setShowDescription(false)}>
          <div className="desc-modal" onClick={(e) => e.stopPropagation()}>
            <button className="desc-close" onClick={() => setShowDescription(false)}>✕</button>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;