Frontend ☕️
```
This is the frontend for the Tea Subscription App, built with Vite + React. Users can browse teas, subscribe/unsubscribe from subscriptions, and manage their subscriptions.
```
🚀 Features
```
  User login & account creation

  Browse available teas & subscribe

  View and manage active subscriptions

  Unsubscribe from teas in a subscription

  Responsive & minimal UI
```
📦 Tech Stack
```
  Frontend: React, Vite, React Router

  State Management: useState, useEffect

  Backend: Rails API (connected to this frontend)

  Styling: Basic CSS
```
📥 Installation & Setup
```
  1️⃣ Clone the Repository

  git clone https://github.com/yourusername/tea-subscription-fe.git

  cd tea-subscription-fe

  2️⃣ Install Dependencies
 
  npm install

  3️⃣ Start the Development Server

  npm run dev

  The app should be running at:
  🔗 http://localhost:5173/
```
🔌 Connecting to Backend
```
  Ensure your backend is running:

  rails s
```
Backend should be running at:
🔗 http://localhost:3000/api/v1

🛠 API Endpoints (Frontend Uses)
```
Endpoint	Method	Description

  /api/v1/customers :	GET	Get all customers

  /api/v1/customers/:id	: GET	Get a single customer

  /api/v1/customers :	POST Create a new customer

  /api/v1/teas : 	GET	Get all teas

  /api/v1/subscriptions :	GET	Get all subscriptions

  /api/v1/subscriptions/:id  :	GET	Get details of a subscription

  /api/v1/customer_subscriptions :	POST	Subscribe a customer to a tea

  /api/v1/customer_subscriptions	: DELETE	Unsubscribe a customer from a tea
```
📂 Project Structure

```
src
 ├── /components
 │   ├── Login.jsx
 │   ├── Dashboard.jsx
 │   ├── TeasList.jsx
 │   ├── SubscriptionList.jsx
 │   ├── SubscriptionDetails.jsx
 │   ├── CustomersList.jsx
 │   ├── styles.css
 │
 ├── /api
 │   ├── api.js
 │
 ├── App.jsx
 ├── main.jsx
 ├── index.css
 ├── README.md
```

🛠 How to Use
```
1️⃣ Log In or Create an Account

Enter your first name, last name, email, and address.

Click Create Account to register.

If an account exists, click Login.

2️⃣ Explore Available Teas

View all available teas on the dashboard.

Click Subscribe next to any tea to subscribe.

3️⃣ View Your Subscriptions

Click "View My Subscriptions".

All subscribed teas will be displayed under each subscription type.

4️⃣ Unsubscribe from Teas

On the subscriptions page, click the ❌ button next to a tea to unsubscribe.
```
👨‍💻 Author

Montana Pfeifer

Github: https://github.com/Montana-Pfeifer

LinkedIn: https://www.linkedin.com/in/montanapfeifer/

