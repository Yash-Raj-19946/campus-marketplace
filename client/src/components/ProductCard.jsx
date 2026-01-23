import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { accessChat } from "../api/chat";
import { requestBuy, requestRent } from "../api/request";
import { takeDownProduct } from "../api/product";
import API from "../api/axios";
import "../styles/auth.css";

const ProductCard = ({ product, isOwner, onRemoved }) => {
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
      ? new Date(product.rentTo).toLocaleDateString()
      : null;

  const today = new Date().toISOString().split("T")[0];
  const minEndDate = rentFrom || today;

  /* CHAT */
  const openChat = async () => {
    const receiverId =
      typeof product.owner === "object"
        ? product.owner._id
        : product.owner;

    const res = await accessChat(receiverId, product._id);
    navigate(`/chat/${res.data._id}`);
  };

  /* RENT CALCULATION */
  const calculateRent = (from, to) => {
    if (!from || !to) return;

    const start = new Date(from);
    const end = new Date(to);
    if (end < start) return;

    const days = Math.ceil((end - start) / 86400000) + 1;
    setTotalDays(days);
    setTotalPrice(days * product.price);
  };

  /* CONFIRM BUY / RENT */
  const confirmRequest = async () => {
    try {
      if (product.type === "rent") {
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
      } else {
        await requestBuy(product._id);
      }

      navigate("/dashboard");
    } catch (err) {
      alert("Request failed");
    }
  };

  /* SELLER TAKE DOWN */
  const handleTakeDown = async () => {
    if (!window.confirm("Take down this product?")) return;
    await takeDownProduct(product._id);
    onRemoved && onRemoved();
  };

  /* ❤️ ADD TO WISHLIST */
  const addToWishlist = async () => {
    try {
      const res = await API.post("/wishlist", {
        productId: product._id,
      });

      alert(res.data?.msg || "Added to wishlist 🤍");
    } catch (err) {
      console.error("Wishlist error:", err.response || err);

      alert(
        err.response?.data?.msg ||
          "Please login again or try later"
      );
    }
  };

  return (
    <div
      className="product-card"
      style={{ opacity: isUnavailable ? 0.45 : 1 }}
    >
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </div>

      <h4 className="product-title">{product.title}</h4>

      <p className="product-price">
        ₹ {product.price}
        {product.type === "rent" && <span> / day</span>}
      </p>

      <span className="product-status">{product.status}</span>

      {isRented && (
        <p style={{ fontSize: "13px", marginTop: "6px" }}>
          Available after <strong>{availableAfter}</strong>
        </p>
      )}

      {/* DESCRIPTION */}
      {product.description?.trim() && (
        <>
          <button
            className="btn-chat"
            style={{ width: "100%" }}
            onClick={() => setShowDescription(true)}
          >
            View Description
          </button>

          {showDescription && (
            <div className="description-modal">
              <div className="description-box">
                <button
                  className="close-btn"
                  onClick={() => setShowDescription(false)}
                >
                  ✕
                </button>
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>
            </div>
          )}
        </>
      )}

      {/* SELLER CONTROLS */}
      {isOwner && product.status === "AVAILABLE" && (
        <button className="btn-cancel" onClick={handleTakeDown}>
          Take Down
        </button>
      )}

      {/* BUYER ACTIONS */}
      {!isOwner && !isUnavailable && (
        <>
          {!showConfirm ? (
            <>
              <button
                className="btn-primary"
                onClick={() => setShowConfirm(true)}
              >
                Request {product.type === "buy" ? "Buy" : "Rent"}
              </button>

              <button className="btn-chat" onClick={addToWishlist}>
                🤍 Add to Wishlist
              </button>
            </>
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
                      ₹{product.price}/day × {totalDays} ={" "}
                      <strong>₹{totalPrice}</strong>
                    </p>
                  )}
                </div>
              )}

              <div className="confirm-row">
                <button
                  className="btn-cancel"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn-confirm"
                  onClick={confirmRequest}
                >
                  Confirm
                </button>
              </div>
            </>
          )}
        </>
      )}

      {!isOwner && (
        <button className="btn-chat" onClick={openChat}>
          💬 Chat with Seller
        </button>
      )}
    </div>
  );
};

export default ProductCard;
