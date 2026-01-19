import { useEffect, useState } from "react";
import { getCommissionData, markCommissionPaid } from "../api/admin";

const CommissionTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getCommissionData().then((res) => setData(res.data));
  }, []);

  return (
    <table>
      {data.map((t) => (
        <tr key={t._id}>
          <td>{t.product}</td>
          <td>₹{t.amount}</td>
          <td>
            {!t.paid && (
              <button onClick={() => markCommissionPaid(t._id)}>
                Mark Paid
              </button>
            )}
          </td>
        </tr>
      ))}
    </table>
  );
};

export default CommissionTable;
