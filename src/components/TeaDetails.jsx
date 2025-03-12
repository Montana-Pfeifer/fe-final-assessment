import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTeas, subscribeCustomer } from "../api/api";

const TeaDetails = ({ userData }) => {
  const { id } = useParams();
  const [tea, setTea] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getTeas().then((teas) => {
      const selectedTea = teas.find((t) => t.id === id);
      setTea(selectedTea);
    });
  }, [id]);

  const handleSubscribe = () => {
    if (!userData) {
      setMessage("Please log in to subscribe.");
      return;
    }

    subscribeCustomer(userData.id, id)
      .then(() => setMessage(`Successfully subscribed to ${tea.attributes.title}!`))
      .catch(() => setMessage("Failed to subscribe."));
  };

  if (!tea) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{tea.attributes.title}</h2>
      <p>{tea.attributes.description}</p>
      <p>Best brewed at {tea.attributes.temperature}°F for {tea.attributes.brew_time}.</p>
      <button onClick={handleSubscribe}>Subscribe</button>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TeaDetails;
