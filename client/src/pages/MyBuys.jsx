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
        <h1>My Buys</h1>
        <p>View products you have bought or rented.</p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          <button
            className="post-btn"
            onClick={() => navigate("/my-buys/bought")}
          >
            Bought Products
          </button>

          <button
            className="post-btn"
            onClick={() => navigate("/my-buys/rented")}
          >
            Rented Products
          </button>
        </div>
      </section>
    </div>
  );
};

export default MyBuys;
