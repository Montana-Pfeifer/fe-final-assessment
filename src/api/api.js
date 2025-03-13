const API_URL = "http://localhost:3000/api/v1";

const handleResponse = (res) =>
  res.ok ? res.json().then((data) => data.data) : Promise.reject("Request failed");

const handleError = (action) => (err) => {
  console.error(`Error ${action}:`, err);
  return null;
};

export const getSubscriptions = () =>
  fetch(`${API_URL}/subscriptions`)
    .then(handleResponse)
    .catch(handleError("fetching subscriptions"));

export const getSubscriptionDetails = (id) =>
  fetch(`${API_URL}/subscriptions/${id}`)
    .then(handleResponse)
    .catch(handleError("fetching subscription details"));

export const cancelSubscription = (id) =>
  fetch(`${API_URL}/subscriptions/${id}`, { method: "DELETE" })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to cancel subscription");
    })
    .catch(handleError("canceling subscription"));

export const getTeas = () =>
  fetch(`${API_URL}/teas`)
    .then(handleResponse)
    .catch(handleError("fetching teas"));

export const getCustomers = () =>
  fetch(`${API_URL}/customers`)
    .then(handleResponse)
    .catch(handleError("fetching customers"));

export const getCustomerById = (id) =>
  fetch(`${API_URL}/customers/${id}`)
    .then(handleResponse)
    .catch(handleError(`fetching customer ${id}`));

export const createCustomer = (firstName, lastName, email, address) =>
  fetch(`${API_URL}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customer: { first_name: firstName, last_name: lastName, email, address },
    }),
  })
    .then(handleResponse)
    .catch(handleError("creating customer"));

  export const subscribeCustomer = (customerId, subscriptionId) => {
    return fetch(`${API_URL}/customer_subscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_subscription: {
          customer_id: customerId,
          subscription_id: subscriptionId,
          start_date: new Date().toISOString().split("T")[0],
          active: true,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => data.data)
      .catch((err) => console.error("Error subscribing to tea:", err));
    };
    

export const unsubscribeTea = (customerId, teaId) =>
  fetch(`${API_URL}/customer_subscriptions`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customer_id: customerId, tea_id: teaId }),
  })
    .then(handleResponse)
    .catch(handleError("unsubscribing from tea"));
