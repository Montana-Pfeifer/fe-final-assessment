import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers} from "../api/api";


function Login({ setUserData }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCustomers().then(setCustomers);
  }, []);

  function fetchCustomer() {
    const foundCustomer = customers.find((cust) => cust.attributes.email === email);
    if (!foundCustomer) {
      setMessage(`Customer ${email} not found`);
    } else {
      fetch(`http://localhost:3000/api/v1/customers/${foundCustomer.id}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data.data);
          navigate("/subscriptions");
        })
        .catch(() => setMessage("Error logging in."));
    }
  }

  function handleCreateCustomer() {
    if (email.trim() && password.trim()) {
      createCustomer(email, password).then((data) => {
        if (data) {
          setMessage(`Account created for ${data.attributes.email}`);
          setCustomers([...customers, data]); // Update customer list
        } else {
          setMessage("Error creating account.");
        }
      });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.nativeEvent.submitter.name === "login") {
      fetchCustomer();
    } else if (event.nativeEvent.submitter.name === "create") {
      handleCreateCustomer();
    }
  };

  return (
    <main className="container">
      <h2>Login</h2>
      {message && <p className="error-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" name="create">Create Account</button>
        <button type="submit" name="login">Login</button>
      </form>
    </main>
  );
}

export default Login;
