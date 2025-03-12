const API_URL = "http://localhost:3000/api/v1";

// 🔹 Get all subscriptions
export const getSubscriptions = () => {
  return fetch(`${API_URL}/subscriptions`)
    .then((res) => res.json())
    .then((data) => data.data)
    .catch((err) => console.error("Error fetching subscriptions:", err));
};

export const getSubscriptionDetails = (id) => {
  return fetch(`${API_URL}/subscriptions/${id}`)
    .then((res) => res.json())
    .then((data) => data.data)
    .catch((err) => console.error("Error fetching subscription:", err));
};

export const cancelSubscription = (id) => {
  return fetch(`${API_URL}/subscriptions/${id}`, { method: "DELETE" })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to cancel subscription");
    })
    .catch((err) => console.error("Error canceling subscription:", err));
};

export const getTeas = () => {
  return fetch(`${API_URL}/teas`)
    .then((res) => res.json())
    .then((data) => data.data)
    .catch((err) => console.error("Error fetching teas:", err));
};

export const getCustomers = () => {
  return fetch(`${API_URL}/customers`)
    .then((res) => res.json())
    .then((data) => data.data)
    .catch((err) => console.error("Error fetching customers:", err));
};

export const subscribeCustomer = (customerId, subscriptionId) => {
  return fetch(`${API_URL}/customer_subscriptions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customer_id: customerId, subscription_id: subscriptionId }),
  })
    .then((res) => res.json())
    .then((data) => data.data)
    .catch((err) => console.error("Error subscribing customer:", err));
};
