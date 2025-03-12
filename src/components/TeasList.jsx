import { useState, useEffect } from "react";
import { getTeas } from "../api/api";

const TeasList = () => {
  const [teas, setTeas] = useState([]);

  useEffect(() => {
    getTeas().then(setTeas);
  }, []);

  return (
    <div className="container">
      <h2>Available Teas</h2>
      <ul>
        {teas.map((tea) => (
          <li key={tea.id}>{tea.attributes.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeasList;
