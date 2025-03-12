import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTeas, subscribeCustomer } from "../api/api";

const Dashboard = ({ userData }) => {
  const [teas, setTeas] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getTeas().then(setTeas);
  }, []);

  const handleSubscribe = (teaId) => {
    subscribeCustomer(userData.id, teaId)
      .then(() => setMessage("Subscribed successfully!"))
      .catch(() => setMessage("Failed to subscribe."));
  };

  return (
    <div className="container">
      <h2>Welcome, {userData.attributes.first_name}!</h2>
      <h3>Available Teas</h3>
      {message && <p className="message">{message}</p>}
      <ul>
        {teas.map((tea) => (
          <li key={tea.id}>
            {tea.attributes.title}
            <button onClick={() => handleSubscribe(tea.id)}>Subscribe</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/subscriptions")}>View My Subscriptions</button>
    </div>
  );
};

export default Dashboard;
