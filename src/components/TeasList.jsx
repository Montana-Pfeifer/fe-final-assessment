import { useEffect, useState } from "react";
import { getTeas, getSubscriptions, subscribeCustomer } from "../api/api";

const TeasList = ({ userId }) => {
  const [teas, setTeas] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getTeas().then(setTeas);
    getSubscriptions().then(setSubscriptions);
  }, []);

  const handleSubscribe = (teaId) => {
    if (!userId) {
      setMessage("Please log in to subscribe.");
      return;
    }

    if (!selectedSubscription) {
      setMessage("Please select a subscription first.");
      return;
    }

    subscribeCustomer(userId, selectedSubscription)
      .then(() => setMessage(`Successfully added tea to your subscription!`))
      .catch(() => setMessage("Failed to subscribe. Try again!"));
  };

  return (
    <div className="container">
      <h2>Available Teas</h2>
      {message && <p className="message">{message}</p>}

      <label>Select Subscription: </label>
      <select
        value={selectedSubscription}
        onChange={(e) => setSelectedSubscription(e.target.value)}
      >
        <option value="">-- Choose a Subscription --</option>
        {subscriptions.map((sub) => (
          <option key={sub.id} value={sub.id}>
            {sub.attributes.title}
          </option>
        ))}
      </select>

      <ul className="tea-list">
        {teas.map((tea) => (
          <li key={tea.id} className="tea-item">
            {tea.attributes.title}
            <button onClick={() => handleSubscribe(tea.id)}>Subscribe</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeasList;
