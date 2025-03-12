import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSubscriptionDetails, cancelSubscription } from "../api/api";

const SubscriptionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    getSubscriptionDetails(id).then(setSubscription);
  }, [id]);

  const handleCancel = () => {
    cancelSubscription(id).then(() => navigate("/subscriptions"));
  };

  if (!subscription) return <p>Loading subscription details...</p>;

  return (
    <div className="container">
      <h2>{subscription.attributes.title}</h2>
      <h3>Customers Subscribed</h3>
      <ul>
        {subscription.relationships.customers.data.map((cust) => (
          <li key={cust.id}>{cust.attributes.email}</li>
        ))}
      </ul>
      <button onClick={handleCancel}>Cancel Subscription</button>
    </div>
  );
};

export default SubscriptionDetails;
