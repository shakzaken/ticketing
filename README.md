# Ticketing App

## 📌 Project Overview
This project is a **microservices-based ticketing application** that allows users to buy and manage event tickets.  
It follows a distributed architecture with multiple services, each handling a specific domain:

- **Authentication Service** – manages user signup, login, and authentication.
- **Ticketing Service** – handles creation, updating, and listing of tickets.
- **Orders Service** – manages ticket orders and enforces business rules.
- **Payments Service** – integrates payments for ticket purchases.
- **Expiration Service** – monitors and automatically cancels expired orders.

The services communicate asynchronously using **Apache Kafka** for event-driven communication, ensuring scalability and resilience.  
Data persistence is handled via **MongoDB** 
The app is designed with **Node.js, Express, and TypeScript** for robust backend development.

---

## 🛠️ Technologies Used
- **Node.js + Express + TypeScript** – main backend framework for building services.
- **Apache Kafka** – message broker for event-driven microservices communication.
- **MongoDB** – NoSQL database for storing tickets, users, and orders.
- **Redis** – in-memory data store used for managing order expiration.
- **Microservices Architecture** – each domain runs as an independent service.
- **Docker / Kubernetes (if configured)** – containerization and orchestration for deploying services at scale.
- **JWT (JSON Web Tokens)** – for secure authentication and service-to-service communication.

---

## 🔌 API Overview
The system exposes RESTful APIs for each service. Below are the main endpoints:

### 🔑 Authentication Service
- `POST /api/users/register` → Register a new user
- `POST /api/users/login` → Login an existing user
- `POST /api/users/signout` → Logout user
- `POST /api/users/current-user` → Get details of the currently authenticated user

### 🎟 Ticketing Service
- `POST /api/tickets` → Create a new ticket
- `PUT /api/tickets/:id` → Update an existing ticket
- `GET /api/tickets/:id` → Fetch ticket details
- `GET /api/tickets` → List all tickets

### 📦 Orders Service
- `POST /api/orders` → Create a new order
- `GET /api/orders` → List all orders for the current user
- `GET /api/orders/:id` → Get details of a specific order

### 💳 Payments Service
- `POST /api/payments` → Make a payment for an order

### ⏰ Expiration Service
- Automatically listens to order creation events via Kafka
- Cancels orders after a specified expiration time (handled internally, no direct API endpoint)

---

## 🚀 Getting Started
1. Clone the repo:
   ```bash
   git clone https://github.com/shakzaken/ticketing.git
   cd ticketing

2. Install dependencies:
   ```bash
   npm install
   
3. Run services (via Docker/Kubernetes or individually with Node):
    ```bash
   npm start

📚 Notes

- Each service runs independently and communicates via Kafka.
- Environment variables (DB connections, Kafka config, JWT secret, etc.) must be configured before running.
- Designed to be cloud-ready and horizontally scalable.