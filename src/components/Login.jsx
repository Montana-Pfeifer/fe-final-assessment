import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers, getCustomerById, createCustomer } from "../api/api";

function Login({ setUserData }) {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [customers, setCustomers] = useState([]);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCustomers().then(setCustomers);
  }, []);

  function fetchCustomer() {
    const foundCustomer = customers.find((cust) => cust.attributes.email === email);
    if (!foundCustomer) {
      setMessage(`Customer ${email} not found`);
    } else {
      getCustomerById(foundCustomer.id).then((data) => {
        if (data) {
          setUserData(data);
          navigate("/dashboard");
        }
      });
    }
  }

  function handleCreateCustomer() {
    if (email.trim() && firstName.trim() && lastName.trim() && address.trim()) {
      createCustomer(firstName, lastName, email, address).then((data) => {
        if (data) {
          setMessage(`Account created for ${data.attributes.email}`);
          setCustomers([...customers, data]);
          setIsCreatingAccount(false);
        } else {
          setMessage("Error creating account.");
        }
      });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isCreatingAccount) {
      handleCreateCustomer();
    } else {
      fetchCustomer();
    }
  };

  return (
    <main className="container">
      <h2>{isCreatingAccount ? "Create Account" : "Login"}</h2>
      {message && <p className="error-message">{message}</p>}
      
      <form onSubmit={handleSubmit}>
        {isCreatingAccount && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </>
        )}
        
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <button type="submit">{isCreatingAccount ? "Create Account" : "Login"}</button>
      </form>
      
      <button 
        type="button" 
        onClick={() => setIsCreatingAccount(!isCreatingAccount)}
      >
        {isCreatingAccount ? "Back to Login" : "Create Account"}
      </button>
    </main>
  );
}

export default Login;
