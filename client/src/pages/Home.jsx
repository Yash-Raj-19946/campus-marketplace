import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext); // 🔥 check login state

  return (
    <div className="page">
      {/* Background blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      {/* HERO SECTION */}
      <section className="hero">
        <h1>College Buy & Rent Marketplace</h1>

        <p>
          Buy, sell, or rent items securely within your college campus.
          <br />
          No outsiders. No scams. Just students helping students.
        </p>

        {/* 🔥 SHOW BUTTONS ONLY AFTER LOGIN */}
        {user && (
          <div className="hero-buttons">
            <Link to="/buy" className="btn primary">
              Browse Buy Items
            </Link>
            <Link to="/rent" className="btn secondary">
              Browse Rent Items
            </Link>
          </div>
        )}
      </section>

      {/* FEATURES SECTION (VISIBLE TO ALL) */}
      <section className="features">
        <div className="feature-card">
          <h3>🔒 College-Only Access</h3>
          <p>
            Only verified college email users can buy, sell, or rent items.
            No outsiders allowed.
          </p>
        </div>

        <div className="feature-card">
          <h3>💬 Direct Chat</h3>
          <p>
            Chat directly with the product owner to negotiate price and
            finalize the deal.
          </p>
        </div>

        <div className="feature-card">
          <h3>🔁 Buy or Rent</h3>
          <p>
            Choose to buy permanently or rent items for a day, week,
            or longer.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
