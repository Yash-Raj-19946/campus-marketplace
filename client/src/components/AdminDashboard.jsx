import { useEffect, useState } from "react";
import { getAdminStats } from "../api/admin";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getAdminStats().then((res) => setStats(res.data));
  }, []);

  if (!stats) return null;

  return (
    <div>
      <h3>Total Sales: {stats.sales}</h3>
      <h3>Commission Due: ₹{stats.commission}</h3>
    </div>
  );
};

export default AdminDashboard;
