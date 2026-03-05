import AdminDashboard from "../components/AdminDashboard";
import CommissionTable from "../components/CommissionTable";
import "../styles/auth.css";

const Admin = () => {
  return (
    <div className="page">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <section className="dashboard">
        <h1 className="page-title">Admin Panel</h1>
        <p className="page-subtitle">
          Platform overview and commission controls
        </p>

        <div className="post-product-box" style={{ marginBottom: "24px" }}>
          <AdminDashboard />
        </div>

        <div className="post-product-box">
          <CommissionTable />
        </div>
      </section>
    </div>
  );
};

export default Admin;
