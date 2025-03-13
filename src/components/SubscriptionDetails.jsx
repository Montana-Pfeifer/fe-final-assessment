import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSubscriptionDetails, cancelSubscription } from "../api/api";

const SubscriptionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [teas, setTeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSubscriptionDetails(id)
      .then((data) => {
        if (!data) {
          setError("Subscription not found.");
        } else {
          setSubscription(data);
          setTeas(data.relationships?.teas?.data || []);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching subscription details.");
        setLoading(false);
      });
  }, [id]);

  const handleUnsubscribe = (teaId) => {
    cancelSubscription(subscription.id, teaId).then(() => {
      setTeas(teas.filter((tea) => tea.id !== teaId));
    });
  };

  if (loading) return <p>Loading subscription details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="container">
      <h2>{subscription.attributes?.title || "Untitled Subscription"}</h2>
      <p>Status: {subscription.attributes?.status || "Unknown"}</p>
      <p>Price: ${subscription.attributes?.price || "0.00"}</p>
      <p>Frequency: {subscription.attributes?.frequency || "Unknown"}</p>

      <h3>Teas in Subscription:</h3>
      <ul>
        {teas.length > 0 ? (
          teas.map((tea) => (
            <li key={tea.id}>
              {tea.attributes?.title || "Unknown Tea"}
              <button onClick={() => handleUnsubscribe(tea.id)}>Unsubscribe</button>
            </li>
          ))
        ) : (
          <p>No teas found.</p>
        )}
      </ul>

      <button onClick={() => navigate("/subscriptions")}>Back to Subscriptions</button>
    </div>
  );
};

export default SubscriptionDetails;

