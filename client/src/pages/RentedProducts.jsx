import MyProductHistory from "../components/MyProductHistory";
import "../styles/auth.css";

const RentedProducts = () => {
  return (
    <div className="page">
      {/* 🔮 THEME BLOBS */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <section className="dashboard">
        <h1 className="page-title">Rented Products</h1>
        <p className="page-subtitle">
          Products you are currently renting or have rented before.
        </p>

        {/* 🧊 GLASS CONTAINER */}
        <div
          style={{
            marginTop: "40px",
            padding: "30px",
            borderRadius: "26px",
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(18px)",
            boxShadow: "0 35px 90px rgba(139,92,246,0.25)",
          }}
        >
          <MyProductHistory type="rent" />
        </div>
      </section>
    </div>
  );
};

export default RentedProducts;
