import { useNavigate } from "react-router-dom";
import { accessChat } from "../api/chat";

const RentRequest = ({ product }) => {
  const navigate = useNavigate();

  const openChat = async () => {
    try {
      const ownerId =
        typeof product.owner === "object"
          ? product.owner._id
          : product.owner;

      const res = await accessChat(ownerId);
      navigate(`/chat/${res.data._id}`);
    } catch (err) {
      console.error("RentRequest chat error:", err);
      alert("Failed to open chat");
    }
  };

  return (
    <button className="post-btn" onClick={openChat}>
      Request Rent
    </button>
  );
};

export default RentRequest;
