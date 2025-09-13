
# 🍅 Tomato 

Tomato is a food delivery website created using MERN (MongoDB, Express, React, Node.js) stack. It features both user and admin panels, allowing users to create accounts, log in securely with JWT, add/remove items to their cart and make payments via Stripe. Admins can add/remove items displayed, list all items and manage all orders.

## 🖥️ Demo 
![](example.gif)


## ✨ Features
 
- Secure JWT authentication & bcrypt passwords
- User registration & login/logout
- User & admin panels 
- Add to cart & place orders functionality  
- Stripe payment integration   
- Order & product management 
- Role-Based Access & Authenticated REST APIs
- Interactive Alerts & Notifications

## 🛠️ Tech Stack

- **Frontend:** React  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Authentication:** JWT  
- **Payments:** Stripe  

## 🚀 Installation / Setup

1. Clone the repository.
2. Install frontend dependencies: `cd frontend` and then `npm install`.
3. Install admin dependencies: `cd admin` and then `npm install`.
4. Setup the environment variables:
- `/backend` : `MONGO_URI`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, `FRONTEND_URL`,`PORT`;
- `/frontend` : `VITE_API_URL`;
- `/admin` : `VITE_API_URL`;
5. Start the servers. Open a terminal for each folder:
- `cd backend` and then `npm run server`;
- `cd frontend` and then `npm run server`;
- `cd admin` and then `npm run server`;
