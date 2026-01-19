import { useState } from "react";
import { postProduct } from "../api/product";
import "../styles/auth.css";

const PostProduct = ({ onPosted }) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    type: "buy",
  });

  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!image) {
      setError("❌ Please select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("type", data.type);
      formData.append("image", image);

      await postProduct(formData);

      setSuccess("✅ Product posted successfully!");
      setData({ title: "", description: "", price: "", type: "buy" });
      setImage(null);

      onPosted && onPosted();
    } catch (err) {
      setError(err.response?.data?.msg || "❌ Product was not posted.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="post-product-box" onSubmit={submit}>
        {/* 🔹 FIRST ROW */}
        <div className="post-row">
          <input
            className="post-input"
            placeholder="Title"
            value={data.title}
            onChange={(e) =>
              setData({ ...data, title: e.target.value })
            }
          />

          <input
            className="post-input"
            placeholder="Price"
            value={data.price}
            onChange={(e) =>
              setData({ ...data, price: e.target.value })
            }
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* 🔹 DESCRIPTION FULL LINE */}
        <textarea
          className="post-textarea"
          placeholder="Product description (condition, usage, details)"
          value={data.description}
          onChange={(e) =>
            setData({ ...data, description: e.target.value })
          }
        />

        {/* 🔹 TYPE + POST */}
        <div className="post-footer">
          <select
            className="post-select"
            value={data.type}
            onChange={(e) =>
              setData({ ...data, type: e.target.value })
            }
          >
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>

          <button className="post-btn" disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>

      {success && <p className="success-text">{success}</p>}
      {error && <p className="error-text">{error}</p>}
    </>
  );
};

export default PostProduct;
