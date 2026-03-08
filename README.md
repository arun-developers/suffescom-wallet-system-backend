# suffescom-wallet-system-backend
Backend service for a wallet management system that handles user wallets, deposits, withdrawals, and transaction processing using Node.js and MongoDB.

# Suffescom Wallet System - Backend

## Overview

The **Suffescom Wallet System Backend** is a RESTful API built using **Node.js, Express, and MongoDB** to manage digital wallet operations.
It allows users to maintain wallet balances, request withdrawals, and track transaction history.

The system also uses **Redis and BullMQ** for background job processing to handle withdrawal requests asynchronously and efficiently.

---

## Features

* User wallet creation and balance management
* Add wallet balance
* Withdrawal request processing
* Background job processing using queues
* Transaction logging
* RESTful API architecture
* Scalable and modular backend structure

---

## Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB (Mongoose)**
* **Redis**
* **BullMQ**
* **Axios**
* **dotenv**

---

## Project Structure

```
src/
│
├── config/          # Database and Redis configuration
├── controllers/     # API controllers
├── models/          # Mongoose schemas
├── routes/          # API routes
├── services/        # Business logic
├── workers/         # Queue workers
├── queues/          # BullMQ queue configuration
└── app.js           # Application entry point
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/suffescom-wallet-system-backend.git
```

### 2. Navigate to project directory

```bash
cd suffescom-wallet-system-backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Setup environment variables

Create a `.env` file in the root directory.

```
PORT=8080
MONGO_URI=your_mongodb_connection
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

### 5. Start the server

```bash
npm run dev
```

---

## API Endpoints

### Wallet

| Method | Endpoint                       | Description           |
| ------ | -------------------------------| --------------------- |
| POST   | /api/user/create-user          | Create user wallet    |
| POST   | /api/wallet/add-wallet-balance | Add balance to wallet |
| GET    | /api/wallet/wallet-balance     | Get wallet balance    | 
| GET    | /api/wallet/transactions       | Get transactions      | 

### Withdrawal

| Method | Endpoint                                       | Description             |
| ------ | ---------------------------------------------- | ----------------------- |
| POST   | /api/withdrawal/withdrawal-wallet-balance      | Request withdrawal      |

---

## Queue Processing

Withdrawal requests are pushed to a **BullMQ queue**, where a worker processes the request asynchronously to update wallet balances and transaction logs.

---

## Future Improvements

* Authentication and authorization (JWT)
* Admin dashboard APIs
* Rate limiting
* Webhook notifications for withdrawal status
* Unit and integration testing

---

## Author

**Arun Singh**

Backend Developer | Node.js | MongoDB
