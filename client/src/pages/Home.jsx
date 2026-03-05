import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="page">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <section className="hero">
        <h1>Campus Marketplace</h1>
        <p>
          Buy, sell, and rent products with verified college users in one clean
          and trusted space built for campus life.
        </p>

        {user && (
          <div className="hero-buttons">
            <Link to="/buy" className="btn primary">
              Explore Buy Listings
            </Link>
            <Link to="/rent" className="btn secondary">
              Explore Rent Listings
            </Link>
          </div>
        )}
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Verified Members</h3>
          <p>
            Access is restricted to verified student emails, keeping the
            marketplace focused and trusted.
          </p>
        </div>

        <div className="feature-card">
          <h3>Secure Negotiation</h3>
          <p>
            Built-in chat keeps buyer and seller conversations in one place for
            quicker decisions.
          </p>
        </div>

        <div className="feature-card">
          <h3>Buy and Rent Modes</h3>
          <p>
            Post items for direct sale or daily rental with simple status
            tracking and request handling.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
