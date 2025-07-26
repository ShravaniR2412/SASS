# 💇‍♀️ GlamEase - Salon & Skincare Platform

GlamEase is a full-stack web application that connects customers with salons, allowing them to explore and compare services, packages, and skincare products. It includes smart ML-based recommendations, service filtering, comparison features, and separate dashboards for salons and customers.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, SwiperJS
* **Backend:** Node.js, MongoDB Atlas
* **Authentication:** JWT Token-based Auth
* **Machine Learning:** FastAPI (Python), Apriori (mlxtend), TF-IDF + Cosine Similarity (sklearn)
* **APIs:** RESTful APIs for all CRUD and ML communication

---

## 🚀 Getting Started

### ⚙️ Prerequisites

* Node.js
* Python 3.x
* MongoDB Atlas account
* FastAPI dependencies installed



### 📦 Clone the Repository

```bash
git clone https://github.com/ShravaniR2412/SASS.git
cd SASS
```



### 🔹 Start the Frontend (React)

```bash
cd client
npm install
npm run dev
```



### 🔸 Start the Backend (Node)

```bash
cd server
node server.js
```



### 🧠 Start the ML Server (FastAPI)

```bash
cd fastapi-ml
python main.py
```

> Make sure FastAPI dependencies like `fastapi`, `uvicorn`, `scikit-learn`, and `mlxtend` are installed. If not:

```bash
pip install -r requirements.txt
```

---

## 🔑 Features

### 👥 Dual Login System

* Role-based dashboards for **Salons** and **Customers**
* Protected routes and JWT-based authentication/authorization



### 🛒 Product & Service Management

* Salons can add, edit, and delete services and packages
* Products stored in MongoDB and served through APIs



### 🤖 ML-Based Recommendations

* **Market Basket Analysis** using Apriori algorithm to show frequently booked-together services
* **Skin Type Product Suggestions** using TF-IDF + Cosine Similarity for smart product recommendations



### 🔍 Filtering & Comparison

* Users can filter salons/services based on location, price range, skin concern, etc.
* Comparison interface allows informed decision-making

---

## 📂 Folder Structure

```
glamease/
├── client/           # React frontend
├── server/           # Node.js backend
├── fastapi-ml/       # FastAPI ML models
└── README.md
```

---
