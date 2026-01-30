# Learning Management / Job Application Platform (Full Stack)

A full-stack web application built using **React**, **Spring Boot**, and **PostgreSQL** that demonstrates real-world backend and frontend development practices, including authentication, role-based access control, and RESTful APIs.

This project was developed to gain hands-on experience with production-level systems and full-stack architecture.

---

## 🚀 Features

- User authentication and authorization (JWT-based)
- Role-based access control (Admin, User)
- Secure REST APIs built with Spring Boot
- Responsive frontend built with React
- PostgreSQL database with proper entity relationships
- Clean and modular code structure

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- HTML5, CSS3
- JavaScript (ES6+)

### Backend
- Java
- Spring Boot
- Spring Data JPA
- REST APIs
- JWT Authentication

### Database
- PostgreSQL

### Tools & Platforms
- Git & GitHub
- Postman
- IntelliJ IDEA
- VS Code

---

## 📂 Project Structure (Backend)

src/main/java
├── controller
├── service
├── repository
├── entity
├── dto
├── config
└── exception


---

## ⚙️ Setup Instructions

### Backend (Spring Boot)

1. Clone the repository
```bash
git clone https://github.com/Mohitrawal7/Adhikari-marg.git
```
2. Configure PostgreSQL in application.properties
```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/your_db
spring.datasource.username=postgres
spring.datasource.password=your_password
```
3. Run the application
```bash
mvn spring-boot:run
```
Frontend (React)
1. Navigate to frontend folder
```bash
cd frontend
```
2. Install dependencies
```bash
npm install
```
3. Start development server
```bash
npm start
```
## 🔐 Authentication & Roles

### Authentication
- JWT-based authentication
- Stateless session management
- Secure token-based access for protected APIs

### Roles & Authorization
- **ADMIN**
  - Manage users and system-level data
- **USER**
  - Access assigned features and personal resources
- Role-based access control using Spring Security

---

## 📌 Learning Outcomes

- Full-stack application development using React and Spring Boot
- REST API design and integration
- Database schema design and entity relationships
- Authentication and authorization implementation
- Real-world debugging and problem-solving experience

---

## 📈 Future Improvements

- Deployment using AWS / Docker
- File upload support using Cloudinary / AWS S3
- Improved UI and dashboard analytics
- Pagination, sorting, and advanced filtering

---

## 👨‍💻 Author

- **Mohit Rawal**
- GitHub: https://github.com/mohitrawal7
- Email: rawalmohit12@gmail.com
