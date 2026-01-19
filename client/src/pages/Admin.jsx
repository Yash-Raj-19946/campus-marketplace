import AdminDashboard from "../components/AdminDashboard";
import CommissionTable from "../components/CommissionTable";

const Admin = () => {
  return (
    <div>
      <h2>Admin Panel</h2>

      <AdminDashboard />
      <CommissionTable />
    </div>
  );
};

export default Admin;
