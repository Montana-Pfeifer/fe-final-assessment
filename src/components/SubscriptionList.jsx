import { useEffect, useState } from "react";
import { getSubscriptions } from "../api/api";

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    getSubscriptions().then(setSubscriptions);
  }, []);

  return (
    <div className="container">
      <h2>Tea Subscriptions</h2>
      <ul>
        {subscriptions.map((sub) => (
          <li key={sub.id}>{sub.attributes.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionList;
