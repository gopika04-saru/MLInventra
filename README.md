# 🧾 Inventory Management System

An efficient full-stack Inventory Management System for managing products, stock levels, and inquiries. Built with **React + Tailwind CSS** for the frontend and **Spring Boot + PostgreSQL (Neon)** for the backend.

> 📢 **Team Project** – Developed collaboratively by a group of passionate developers.


## 🧰 Project Description

This Inventory Management System allows administrators to manage inventory and customers to view products. Admins can add, update, or delete items, view low stock alerts, and monitor inventory stats through a dashboard.


## 🚀 Features

### 🔧 Admin Features
- Full CRUD for products
- Search and category filters
- Low stock highlighting (stock < 10)
- Dashboard with:
  - 📊 Total product count
  - ⚠️ Low stock count
  - 💰 Total inventory value
  - 🆕 Recent products

### 🛍️ Customer Features
- View all products
- Search and filter by category
- Stock visibility
- Inquiry form for each product

---

## 🖥️ Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Shadcn UI (Radix + Tailwind)
- Lucide Icons
- Axios

### Backend
- Java 17
- Spring Boot 3
- Spring Data JPA
- PostgreSQL (hosted on [Neon](https://neon.tech))


## 📁 Folder Structure

```
InventoryManagementSystem/
├── Frontend/
│ ├── components/
│ ├── pages/
│ └── app/
│ └── layout.tsx, page.tsx
│
├── Backend/
│ ├── src/
│ │ ├── controller/
│ │ ├── service/
│ │ ├── model/
│ │ ├── repository/
│ │ └── config/
│ ├── application.properties
│ └── Dockerfile
│
├── README.md
└── package.json / pom.xml
```


## 🔌 API Endpoints

### 📦 Product APIs

| Method | Endpoint                                  | Description                          |
|--------|-------------------------------------------|--------------------------------------|
| GET    | `/api/products`                           | Get all products                     |
| GET    | `/api/products/search?name={query}`       | Search products by name              |
| GET    | `/api/products/category/{category}`       | Filter products by category          |
| GET    | `/api/products/stock?level=low`           | Get low stock products               |
| GET    | `/api/products/stock?level=normal`        | Get normal stock products            |
| GET    | `/api/products/count`                     | Get total product count              |
| GET    | `/api/products/stock/low/count`           | Get count of low stock items         |
| GET    | `/api/products/total-value`               | Get total inventory value            |
| GET    | `/api/products/recent?limit=5`            | Get recent products                  |
| POST   | `/api/products`                           | Add new product                      |
| PUT    | `/api/products/{id}`                      | Edit product                         |
| DELETE | `/api/products/{id}`                      | Delete product                       |


## 🛢️ Database Configuration (Neon)

   In `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://<your-neon-db-host>/<your-db-name>
spring.datasource.username=<your-username>
spring.datasource.password=<your-password>
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```
    - 📝 You can get your Neon database connection details from https://neon.tech

## 📦 Frontend Dependencies

```bash
npm install react react-dom next tailwindcss axios lucide-react @radix-ui/react-icons shadcn/ui
```

## ⚙️ Backend Dependencies (pom.xml)

```xml
<dependencies>
  <dependency>org.springframework.boot:spring-boot-starter-web</dependency>
  <dependency>org.springframework.boot:spring-boot-starter-data-jpa</dependency>
  <dependency>org.postgresql:postgresql</dependency>
  <dependency>org.springframework.boot:spring-boot-starter-validation</dependency>
</dependencies>
```

## How to Run
### 🧷 Backend (Spring Boot)

```bash
cd Backend
./mvnw spring-boot:run
```

### 🎨 Frontend (Next.js)
```bash
cd Frontend
npm install
npm run dev
```

## 🎥 Demo Video

> 📽️ Watch the project in action below

[▶️ Click to watch demo video on Google Drive](https://drive.google.com/file/d/13ZxMRzOglOTrY6zOkbq9GeT03UXZFFZ-/view?usp=sharing)

> If it doesn't auto-play in your browser, download and play it manually.

## 👨‍💻 Developed By

- K Gopika Saranya                (kotakalagopika@gmail.com)

👏 Special thanks to everyone involved in planning, building, and testing this system.





