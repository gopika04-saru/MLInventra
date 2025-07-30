# 🧾 MLInventra – Intelligent Inventory Management System

An enhanced full-stack Inventory Management System with AI-powered features like **automatic price prediction** and **priority-based inquiry handling**. Built using **Next.js + Tailwind CSS** for the frontend, **Spring Boot + PostgreSQL (Neon)** for the backend, and **Flask + scikit-learn** for machine learning.

## 👉 Access the live project here:
🌐 Frontend URL: https://ml-inventra-git-main-gopikas-projects-386830c9.vercel.app

## 🧰 Project Description

MLInventra allows administrators to manage inventory while empowering users to suggest new products and raise inquiries. The system uses machine learning models to:

- Predict prices for new products (admin or user-suggested)

- Automatically classify customer inquiries by priority (High / Medium / Low)

Admins have full control over the inventory, including approval of user-suggested products, which are assigned ML-generated prices.


## 🚀 Features

### 🔧 Admin Features
- Full CRUD for products
- Search and category filters
- Low stock highlighting (stock < 10)
- Dashboard with:
  - Total product count
  - Low stock count
  - Total inventory value
  - Recent products

### 🛍️ Customer Features
- View all products
- Search and filter by category
- Stock visibility
- Inquiry form for each product

---

### AI & ML Features
#### Price Prediction
- Predicts product price based on product name and category.

- Implemented using LinearRegression and TfidfVectorizer.

#### Priority Detection
- Classifies inquiry messages into High, Medium, or Low priority.

- Uses logistic regression and natural language text classification.

##### 🔗 ML Server: Flask app deployed on Render
- 🔗 /predict-price – Predicts price
- 🔗 /predict-priority – Classifies inquiries


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
├── ml-model/ 
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

## 📦 Technologies Used

- **Backend**: Java, Spring Boot, PostgreSQL  
- **Frontend**: React.js  
- **Other Tools**: Postman, IntelliJ, Git, GitHub Actions

## Contributing

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes:

   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:

   ```bash
   git push origin feature-branch
   ```
5. Open a pull request.

## 🚀 Project Deployment – Iventory Management System

This section provides a complete guide to deploying the project using **Render**, **Neon.tech**, and **Versel**.

## 🧠 Backend Deployment – Spring Boot + Render

###  1. Build the JAR File

```bash
./mvnw clean package
```

 This generates:
  `target/ims-deploy-0.0.1-SNAPSHOT.jar`

### 2. Create Dockerfile in project root

```Dockerfile
# Stage 1: Build with Maven
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run with JDK
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/ims-deploy-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/ims-deploy-0.0.1-SNAPSHOT.jar"]
```

### 3. Set Environment Variables in PowerShell (temporary)

```bash
$env:DB_URL="jdbc:postgresql://your-neon-url"
$env:DB_USERNAME="your-neon-username"
$env:DB_PASSWORD="your-password"
$env:FRONTEND_URL="https://ml-inventra-git-main-gopikas-projects-386830c9.vercel.app"
```

### 4. Build Docker Image

```bash
docker build -t ims-deploy .
```

### 5. Tag the Docker Image

```bash
docker tag queue-backend gopikasaranya/ims-deploy:v1
```

### 6. Push Image to Docker Hub

```bash
docker push gopikasaranya/ims-deploy:v1
```

> 📝 Make sure the repo exists on Docker Hub:  
> [https://hub.docker.com/repository/docker/gopikasaranya/ims-deploy](https://hub.docker.com/repository/docker/gopikasaranya/ims-deploy)

---

### 7. Set up PostgreSQL on Neon.tech

- Go to: https://neon.tech
- Create a project (e.g., `jolly-rain`)
- Create a database (e.g., `queue-db`)
- Copy connection string like:
  
  ```
  jdbc:postgresql://ep-xxxxxxx.neon.tech/queue-db
  ```

### 8. Deploy Backend on Render

- Go to: https://render.com
- Click **New > Web Service**
- Select **Docker** as deployment method
- Connect DockerHub image:  
  `gopikasaranya/ims-deploy:v1`
- Add the following **Environment Variables**:

```
DB_URL=jdbc:postgresql://<neon-db-url>
DB_USERNAME=<your_neon_username>
DB_PASSWORD=<your_neon_password>
FRONTEND_URL=https://ml-inventra-git-main-gopikas-projects-386830c9.vercel.app
```

- Click **Deploy Web Service**


## 🎨 Frontend Deployment – React + Netlify

### 1. Build the React App

```bash
npm run build
```

## 🚀 2. Deploy to Vercel

To deploy the frontend on [Vercel](https://vercel.com), follow these steps:

### Step-by-Step Instructions

1. Go to [https://vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **“Add New Project”**.
3. Import your GitHub repository (make sure your frontend code is already pushed).
4. When prompted:
   - **Framework Preset**: `React` (or `Next.js` if you're using it)
   - **Root Directory**:  
     ```
     frontend/
     ```
   - **Build Command**:  
     ```
     npm run build
     ```
   - **Output Directory**:  
     ```
     build
     ```
5. Set up the required **Environment Variables** (if your frontend communicates with the backend):

```
REACT_APP_BACKEND_URL=https://mlinventra.onrender.com
```

- Click **Deploy Site**

## 🌐 Live Project URLs

| Service       | URL                                                                                                                                               |
|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| 🔙 Backend    | [https://mlinventra.onrender.com](https://mlinventra.onrender.com)                                                                               |
| 🔙 Ml-Model   | [https://ml-model-vvvi.onrender.com](https://ml-model-vvvi.onrender.com)                                                                   |           
| 🌐 Frontend   | [https://ml-inventra-git-main-gopikas-projects-386830c9.vercel.app](https://ml-inventra-git-main-gopikas-projects-386830c9.vercel.app)           |
| 🧮 Database   | [https://console.neon.tech/app/projects/wild-block-34721367/branches/br-mute-sea-adio2e3i](https://console.neon.tech/app/projects/wild-block-34721367/branches/br-mute-sea-adio2e3i)      |
 

## 👨‍💻 Developed By

- K Gopika Saranya                (kotakalagopika@gmail.com)





