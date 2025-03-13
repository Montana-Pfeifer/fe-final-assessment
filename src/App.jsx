import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/dashboard";
import SubscriptionList from "./components/SubscriptionList";
import SubscriptionDetails from "./components/SubscriptionDetails";
import TeasList from "./components/TeasList";
import CustomersList from "./components/CustomersList";

function App() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  if (!userData) {
    return <Login setUserData={setUserData} />;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Dashboard userData={userData} setUserData={setUserData} />} />
        <Route path="/subscriptions" element={<SubscriptionList userData={userData} />} />
        <Route path="/subscriptions/:id" element={<SubscriptionDetails userData={userData} />} />
        <Route path="/teas" element={<TeasList userId={userData?.id} />} />
        <Route path="/customers" element={<CustomersList userData={userData} />} />
      </Routes>
    </div>
  );
}

export default App;
