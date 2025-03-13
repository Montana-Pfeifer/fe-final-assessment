import { useState, useEffect } from "react";
import { getCustomers } from "../api/api";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers().then(setCustomers);
  }, []);

  return (
    <div className="container">
      <h2>Customers</h2>
      <ul>
        {customers.map((cust) => (
          <li key={cust.id}>{cust.attributes.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomersList;
