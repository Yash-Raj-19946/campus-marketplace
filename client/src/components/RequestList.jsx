import {
  getSellerRequests,
  confirmRequest,
  sellerCancelRequest,
} from "../api/request";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { accessChat } from "../api/chat";

const RequestList = ({ onDone }) => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const loadRequests = async () => {
    const res = await getSellerRequests();
    setRequests(res.data);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  // ✅ CONFIRM → SWITCH TO DASHBOARD PRODUCTS
  const handleConfirm = async (requestId) => {
    try {
      await confirmRequest(requestId);
      onDone(); // 🔥 THIS IS THE FIX
    } catch {
      alert("Failed to confirm request");
    }
  };

  // ✅ CANCEL → SWITCH TO DASHBOARD PRODUCTS
  const handleCancel = async (requestId) => {
    try {
      await sellerCancelRequest(requestId);
      onDone(); // 🔥 THIS IS THE FIX
    } catch {
      alert("Failed to cancel request");
    }
  };

  // CHAT WITH BUYER
  const chatWithBuyer = async (buyerId, productId) => {
    const res = await accessChat(buyerId, productId);
    navigate(`/chat/${res.data._id}`);
  };

  return (
    <div className="requests-wrapper">
      <h2 className="section-title">Incoming Requests</h2>

      {requests.length === 0 ? (
        <p className="empty-text">No requests right now.</p>
      ) : (
        <div className="request-grid">
          {requests.map((r) => (
            <div key={r._id} className="request-card">
              <div className="request-info">
                <h4>{r.product.title}</h4>
                <p>
                  <strong>{r.type.toUpperCase()}</strong> request from
                </p>
                <span className="buyer-email">{r.buyer.email}</span>

                {r.type === "rent" && (
                  <div className="rent-details">
                    <p><strong>From:</strong> {new Date(r.rentFrom).toLocaleDateString()}</p>
                    <p><strong>To:</strong> {new Date(r.rentTo).toLocaleDateString()}</p>
                    <p><strong>Days:</strong> {r.totalDays}</p>
                    <p><strong>Total:</strong> ₹{r.totalPrice}</p>
                  </div>
                )}
              </div>

              <div className="request-actions">
                <button
                  className="btn-chat"
                  onClick={() =>
                    chatWithBuyer(r.buyer._id, r.product._id)
                  }
                >
                  💬 Chat with Buyer
                </button>

                <button
                  className="btn-confirm"
                  onClick={() => handleConfirm(r._id)}
                >
                  Confirm
                </button>

                <button
                  className="btn-cancel"
                  onClick={() => handleCancel(r._id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestList;
