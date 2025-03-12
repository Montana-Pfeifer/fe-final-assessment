import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import SubscriptionList from "./components/SubscriptionList";
import SubscriptionDetails from "./components/SubscriptionDetails";
import TeasList from "./components/TeasList";
import CustomersList from "./components/CustomersList";

function App() {
  const [userData, setUserData] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login setUserData={setUserData} />} />
        <Route path="/subscriptions" element={<SubscriptionList userData={userData} />} />
        <Route path="/subscriptions/:id" element={<SubscriptionDetails userData={userData} />} />
        <Route path="/teas" element={<TeasList />} />
        <Route path="/customers" element={<CustomersList />} />
      </Routes>
    </div>
  );
}

export default App;
