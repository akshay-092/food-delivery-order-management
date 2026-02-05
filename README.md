# 🍕 Food Delivery Order Management


## 🚀 Key Features

- **🍔 Interactive Menu**: Browse a variety of food items with detailed descriptions and pricing.
- **🛒 Dynamic Cart**: Add/remove items and manage quantities with real-time total calculation.
- **📝 Seamless Checkout**: A clean, intuitive form for delivery details and order confirmation.
- **📡 Live Order Tracking**: Real-time updates on your order status (Received → Preparing → Out for Delivery → Delivered).
- **🕒 Order History**: Access your past orders and their details.
- **🧪 Unit Testing**: Comprehensive test coverage using Jest and React Testing Library.

---

## ⌨️ Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Ensure you have **Node.js (v18.0.0 or higher)** and **npm** installed.

### 1. Clone the Repository

```bash
git clone https://github.com/akshay-092/food-delivery-order-management
cd food-delivery-order-management
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 4. Run Tests

To execute the test suite:

```bash
npm test
```

For watch mode:

```bash
npm run test:watch
```

---

## 📁 Project Structure

```text
src/
├── app/            # Next.js App Router (Pages & API routes)
├── components/     # Reusable UI components (Cart, Menu, Checkout, etc.)
├── types/          # TypeScript interface and type definitions
├── utils/          # Helper functions and utilities
└── __tests__/      # Unit and integration tests
```