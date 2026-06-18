# Luxuper

**Luxury Computer Peripherals**
Web Frameworks Capstone Project — BFD Web Development (2026)

---

## Overview

Luxuper is a full-stack ecommerce web application for a fictional luxury computer peripherals brand. It demonstrates a professional MVC architecture blending server-side rendering (SSR) for initial page loads with a REST API for dynamic client-side filtering.

**Tech stack:**
- Node.js + Express 5
- EJS templating (SSR)
- MySQL (via Docker)
- Vanilla JS `fetch()` for client-side filtering

---

## Project Structure

```
bfd-app/
├── docker/                  # Docker Compose and MySQL data
│   └── docker-compose.yml
├── public/                  # Static assets
│   ├── css/styles.css
│   ├── images/
│   └── js/load.js           # Client-side fetch + filtering
├── src/
│   ├── controllers/
│   │   ├── per.controller.js   # SSR page controllers
│   │   └── api.controller.js   # REST API controllers
│   ├── model/
│   │   └── db.connect.js       # MySQL connection pool
│   ├── routers/
│   │   └── router.js
│   ├── scripts/
│   │   ├── schema.sql          # Database schema
│   │   └── seed.sql            # Seed data
│   ├── services/
│   │   └── service.js          # Business logic / data access
│   ├── views/
│   │   ├── home.ejs
│   │   ├── products.ejs
│   │   ├── product.ejs
│   │   └── error.ejs
│   ├── app.js
│   └── server.js
└── .env
```

---

## Setup

### Prerequisites

- Node.js 18+
- Docker Desktop

### 1. Clone the repository

```bash
git clone <repo-url>
cd bfd-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file in the root base and fill in your values. **Do not commit your new .env values to version control.**

### 4. Start the database

```bash
cd docker
docker-compose up -d
```

### 5. Initialize the database

Connect your MySQL database and run the following scripts in order:

```
src/scripts/schema.sql
src/scripts/seed.sql
```

### 6. Start the server

```bash
npm run dev
```

---
## Authentication Flow

### 1. Create an account
Create an account by clicking "Register" in the nav bar.

### 2. Log in
Navigate to the login page via the navbar or redirects on the registration page.

### 3. Log out when finished

---

## SSR Routes
**PUBLIC**

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Landing / home page |
| GET | `/products` | Full product catalog (server-side rendered) |
| GET | `/products/:id` | Individual product detail page |
| GET | `/login` | Login page |
| GET | `/register` | Registration page |

The `/products` page is server-side rendered on initial load — all product data is fetched from the database and injected into the EJS template before the page is sent to the client.

---

## PRODUCTS API
**PROTECTED**

Base URL: `/api`

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/status` | Health check |
| GET | `/api/products` | Returns all products as JSON, supports filtering |
| GET | `/api/products/:id` | Returns a single product by ID as JSON |

### GET /api/products — Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `name` | string | Filter by product name (partial match, space-separated keywords) | `?name=wireless` |
| `category` | string | Filter by product type, comma-separated for multiple | `?category=Mice` |
| `minPrice` | number | Minimum price (inclusive) | `?minPrice=50` |
| `maxPrice` | number | Maximum price (inclusive) | `?maxPrice=200` |
| `sort` | string | Sort field: `price`, `-price`, `name`, `-name` | `?sort=-price` |

Parameters can be combined:

```
GET /api/products?category=Mice&maxPrice=50&sort=price
```

**Response format:**

```json
{
  "count": 3,
  "products": [
    {
      "id": 1,
      "productName": "Luxuper M-A - Compact Mouse",
      "productDesc": "...",
      "productType": "Mice",
      "producePrice": "17.99",
      "image_url": "images/..."
    }
  ]
}
```

### CART
**PROTECTED**

Base URL: `/api/cart`

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/cart/items` | Adds item to cart |
| DELETE | `/api/cart/items/:productId` | Deletes item in cart by specified ID |
| POST | `/api/products/clear` | Clears all items in cart  |

---

## How Filtering Works

Luxuper uses a hybrid SSR + REST architecture:

1. When a user visits `/products`, the page is fully server-side rendered with all products from the database.
2. When the user interacts with the search or filter controls, `load.js` intercepts the form submission and fires a `fetch()` call to `/api/products` with the appropriate query parameters.
3. The API responds with filtered JSON, and `load.js` re-renders the product grid client-side — no full page reload.

This gives the best of both worlds: fast initial load with SSR, and responsive filtering without page refreshes.

---
## Session-based Cart

Cart data and contents are stored in a server-side session state:
```
req.session.cart
```
---

## Product Categories

- Mice
- Keyboard
- Mousepad
- Bundles
- Headphones
- Microphone
- Webcam