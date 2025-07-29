# 🚀 Full Stack Trading Platform

A comprehensive cryptocurrency trading platform built with Spring Boot backend and React frontend, featuring real-time market data, secure authentication, wallet management, and payment processing.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Security Features](#-security-features)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based Authentication** - Secure token-based authentication
- **Two-Factor Authentication (2FA)** - Enhanced security with OTP verification
- **Password Reset** - Email-based password recovery
- **Role-based Access Control** - User and Admin roles
- **CORS Configuration** - Secure cross-origin requests

### 💰 Trading & Finance
- **Real-time Cryptocurrency Data** - Live market prices and trends
- **Buy/Sell Orders** - Complete trading functionality
- **Portfolio Management** - Track your investments
- **Watchlist** - Monitor favorite cryptocurrencies
- **Transaction History** - Complete audit trail

### 🏦 Wallet & Payments
- **Digital Wallet** - Secure balance management
- **Payment Processing** - Razorpay and Stripe integration
- **Withdrawal System** - Secure fund withdrawal
- **Transaction Tracking** - Real-time transaction updates

### 📊 Analytics & Charts
- **Interactive Charts** - ApexCharts integration
- **Market Analytics** - Price trends and analysis
- **Portfolio Performance** - Investment tracking
- **Real-time Updates** - Live market data

### 👨‍💼 Admin Features
- **User Management** - Admin controls for user accounts
- **Order Management** - Monitor and manage trading orders
- **Withdrawal Processing** - Approve/reject withdrawal requests
- **Payment Oversight** - Monitor payment transactions

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 3.5.0
- **Security**: Spring Security with JWT
- **Database**: PostgreSQL with JPA/Hibernate
- **Build Tool**: Maven
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: SMTP integration
- **Payment**: Razorpay & Stripe APIs

### Frontend
- **Framework**: React 19.1.0
- **Build Tool**: Vite
- **State Management**: Redux with Redux Thunk
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Charts**: ApexCharts
- **HTTP Client**: Axios
- **UI Components**: Radix UI

## 📁 Project Structure

```
Full_Stack_Trading/
├── trading_backend/                 # Spring Boot Backend
│   ├── src/main/java/com/project/trading/
│   │   ├── config/                  # Configuration classes
│   │   ├── controller/              # REST API controllers
│   │   ├── domain/                  # Enums and constants
│   │   ├── model/                   # Entity classes
│   │   ├── repository/              # Data access layer
│   │   ├── request/                 # Request DTOs
│   │   ├── response/                # Response DTOs
│   │   ├── service/                 # Business logic layer
│   │   └── utils/                   # Utility classes
│   ├── src/main/resources/
│   │   └── application.properties   # Application configuration
│   └── pom.xml                     # Maven dependencies
├── trading-react/                   # React Frontend
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   ├── pages/                   # Application pages
│   │   ├── State/                   # Redux store and actions
│   │   └── utils/                   # Utility functions
│   ├── package.json                 # Node.js dependencies
│   └── vite.config.js              # Vite configuration
└── .vscode/                        # VS Code configuration
```

## ⚙️ Prerequisites

Before running this application, make sure you have the following installed:

- **Java 21** or higher
- **Node.js 18** or higher
- **PostgreSQL**
- **Maven 3.6+**
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Full_Stack_Trading
```

### 2. Backend Setup

```bash
cd trading_backend
```

#### Create Environment File
Create a `.env` file in the `trading_backend` directory:

```bash
# Database Configuration

DB_URL=jdbc:postgresql://localhost:5432/trading
DB_USERNAME=root
DB_PASSWORD=your_postgresql_password

# Payment Gateway Configuration
RAZORPAY_API_KEY=your_razorpay_api_key
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
STRIPE_API_KEY=your_stripe_api_key
STRIPE_KEY_SECRET=your_stripe_secret_key

# Email Configuration (Gmail SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

#### Build and Run Backend

```bash
# Install dependencies
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8091`

### 3. Frontend Setup

```bash
cd trading-react
```

#### Install Dependencies

```bash
npm install
```

#### Start Development Server

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## ⚙️ Configuration

### Database Setup

1. **Create PostgreSQL Database**
```sql
CREATE DATABASE trading;
```

2. **Update Database Configuration**
Edit the `.env` file with your PostgreSQL credentials.

### Email Configuration

For Gmail SMTP:
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password
3. Use the App Password in the `MAIL_PASSWORD` field

### Payment Gateway Setup

#### Razorpay
1. Create a Razorpay account
2. Get your API keys from the dashboard
3. Update `RAZORPAY_API_KEY` and `RAZORPAY_KEY_SECRET`

#### Stripe
1. Create a Stripe account
2. Get your API keys from the dashboard
3. Update `STRIPE_API_KEY` and `STRIPE_KEY_SECRET`

## 📖 Usage

### 1. User Registration
- Navigate to `/register`
- Fill in your details
- Verify your email (if configured)

### 2. User Login
- Navigate to `/login`
- Enter your credentials
- Complete 2FA if enabled

### 3. Trading
- Browse cryptocurrencies on the home page
- Add coins to your watchlist
- Place buy/sell orders
- Monitor your portfolio

### 4. Wallet Management
- Deposit funds through payment gateways
- View transaction history
- Request withdrawals

## 🔌 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | User registration |
| POST | `/auth/login` | User login |
| POST | `/auth/forgot-password` | Password reset request |
| POST | `/auth/two-factor/otp/{otp}` | 2FA verification |

### Trading Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/coins` | Get cryptocurrency list |
| GET | `/api/coins/{id}` | Get specific coin details |
| POST | `/api/orders` | Create trading order |
| GET | `/api/orders` | Get user orders |

### Wallet Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wallet` | Get wallet balance |
| POST | `/api/wallet/deposit` | Add funds to wallet |
| GET | `/api/wallet/transactions` | Get transaction history |

### Payment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payment` | Process payment |
| POST | `/api/withdrawal/{amount}` | Request withdrawal |
| GET | `/api/withdrawal/history` | Get withdrawal history |

## 🔐 Security Features

### Authentication
- **JWT Tokens**: Secure token-based authentication
- **Password Encryption**: BCrypt password hashing
- **Session Management**: Stateless session handling

### Authorization
- **Role-based Access**: USER and ADMIN roles
- **Protected Routes**: API endpoint protection
- **CORS Configuration**: Secure cross-origin requests

### Two-Factor Authentication
- **OTP Generation**: Time-based one-time passwords
- **Email Delivery**: Secure OTP delivery
- **Verification**: Multi-step authentication

### Data Protection
- **Input Validation**: Request parameter validation
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Output encoding

## 🧪 Testing

### Backend Testing
```bash
cd trading_backend
mvn test
```

### Frontend Testing
```bash
cd trading-react
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Build the JAR file:
```bash
mvn clean package
```

2. Run the JAR:
```bash
java -jar target/trading-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
1. Build for production:
```bash
npm run build
```

2. Deploy the `dist` folder to your web server

## 🤝 Contributing

1. **Fork the repository**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 🤝 Contributing / Reporting Issues

If you find any bugs or issues, feel free to:

1. **Check the documentation** provided above.
2. **Search existing issues** to avoid duplicates.
3. **Create a new issue** with clear and detailed information.
4. **Raise a Pull Request (PR)** if you have a fix or improvement.
5. **Contact me directly** if you'd like to discuss the issue or need support.

## 🙏 Acknowledgments

- **Spring Boot** – for powering the backend with a robust and scalable framework
- **React.js** – for building a responsive and dynamic frontend
- **Tailwind CSS** – for fast and flexible UI styling
- **ApexCharts** – for creating interactive and real-time data visualizations
- **Razorpay** & **Stripe** – for secure and reliable payment integration

---

🚀 **Live Project:** [https://tradecrypto25.netlify.app/](https://tradecrypto25.netlify.app/)

⭐ **Star this repository** if you find it helpful!

⚠️ **Disclaimer:** This is a demo cryptocurrency trading platform. For production use, please ensure full compliance with financial regulations and implement necessary security and validation measures.
