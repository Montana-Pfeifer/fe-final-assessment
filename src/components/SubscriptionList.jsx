import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubscriptions, cancelSubscription, getTeas } from "../api/api";

const SubscriptionsList = ({ userData }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [allTeas, setAllTeas] = useState([]); 
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getSubscriptions()
      .then((data) => {
        if (!data) {
          console.error("No subscription data received.");
          return;
        }
        setSubscriptions(data);
      })
      .catch((err) => console.error("Error fetching subscriptions:", err));

    getTeas()
      .then((data) => {
        if (!data) {
          console.error("No tea data received.");
          return;
        }
        setAllTeas(data);
      })
      .catch((err) => console.error("Error fetching teas:", err));
  }, []);

  const getTeaTitle = (teaId) => {
    const tea = allTeas.find((t) => t.id === teaId);
    return tea ? tea.attributes.title : "Unknown Tea";
  };

  const handleUnsubscribe = (subscriptionId, teaId) => {
    cancelSubscription(subscriptionId, teaId)
      .then(() => {
        setSubscriptions((prevSubs) =>
          prevSubs.map((sub) =>
            sub.id === subscriptionId
              ? {
                  ...sub,
                  relationships: {
                    ...sub.relationships,
                    teas: {
                      data: sub.relationships.teas.data.filter((tea) => tea.id !== teaId),
                    },
                  },
                }
              : sub
          )
        );
        setMessage("Unsubscribed successfully.");
      })
      .catch(() => setMessage("Failed to unsubscribe."));
  };

  return (
    <div className="container">
      <h2>Your Subscriptions</h2>
      {message && <p className="message">{message}</p>}
      {subscriptions.length === 0 ? (
        <p>You have no active subscriptions.</p>
      ) : (
        <div className="subscription-list">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="subscription-item">
              <h3>{sub.attributes?.title || "Untitled Subscription"}</h3>
              <ul>
                {sub.relationships.teas.data.length > 0 ? (
                  sub.relationships.teas.data.map((tea) => (
                    <li key={tea.id} className="tea-item">
                      {getTeaTitle(tea.id)}
                      <button onClick={() => handleUnsubscribe(sub.id, tea.id)}>❌</button>
                    </li>
                  ))
                ) : (
                  <p>No teas in this subscription.</p>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
};

export default SubscriptionsList;
