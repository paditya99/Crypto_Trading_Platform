# Trading Backend Application

A comprehensive cryptocurrency trading platform backend built with Spring Boot, providing secure authentication, wallet management, order processing, and payment integration.

## 🚀 Features

### Core Features
- **User Authentication & Authorization** - JWT-based secure authentication with role-based access control
- **Cryptocurrency Trading** - Buy/sell orders with real-time market data
- **Wallet Management** - Digital wallet with transaction history and balance tracking
- **Payment Processing** - Integrated payment gateway for deposits and withdrawals
- **Asset Management** - Portfolio tracking and asset allocation
- **Watchlist** - Track favorite cryptocurrencies and market movements
- **Two-Factor Authentication** - Enhanced security with 2FA support

### Admin Features
- **User Management** - Admin controls for user accounts
- **Order Management** - Monitor and manage trading orders
- **Withdrawal Processing** - Approve/reject withdrawal requests
- **Payment Oversight** - Monitor payment transactions

## 🛠️ Tech Stack

- **Framework**: Spring Boot
- **Security**: Spring Security with JWT
- **Database**: JPA/Hibernate
- **Build Tool**: Maven
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Integrated email notifications
- **Architecture**: RESTful API with MVC pattern

## 📁 Project Structure

```
src/main/java/com/project/trading/
├── config/           # Configuration classes (JWT, App Config)
├── controller/       # REST API controllers
├── domain/          # Enums and constants
├── model/           # Entity classes
├── repository/      # Data access layer
├── request/         # Request DTOs
├── response/        # Response DTOs
├── service/         # Business logic layer
└── utils/           # Utility classes
```

## 🔧 Key Components

### Controllers
- `AuthController` - User authentication and registration
- `UserController` - User profile management
- `OrderController` - Trading order operations
- `WalletController` - Wallet operations and transactions
- `PaymentController` - Payment processing
- `WithdrawalController` - Withdrawal requests and processing
- `CoinController` - Cryptocurrency data management
- `AssetController` - Portfolio and asset management
- `WatchListController` - Watchlist management

### Services
- **User Management**: Registration, authentication, profile management
- **Trading Engine**: Order processing, market operations
- **Payment System**: Deposits, withdrawals, payment gateway integration
- **Wallet System**: Balance management, transaction history
- **Security**: JWT token management, 2FA, password reset
- **Communication**: Email notifications and alerts

## 🔐 Security Features

- JWT-based authentication
- Password encryption
- Two-factor authentication (2FA)
- Secure password reset mechanism
- Role-based access control (USER/ADMIN)
- Request validation and sanitization

## 📊 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/forgot-password` - Password reset request

### Trading
- `POST /api/orders` - Create trading order
- `GET /api/orders` - Get user orders
- `GET /api/coins` - Get cryptocurrency data

### Wallet
- `GET /api/wallet` - Get wallet balance
- `POST /api/wallet/deposit` - Add funds
- `GET /api/wallet/transactions` - Transaction history

### Payments & Withdrawals
- `POST /api/payment` - Process payment
- `POST /api/withdrawal/{amount}` - Request withdrawal
- `GET /api/withdrawal/history` - Withdrawal history

## 🚀 Getting Started

### Prerequisites
- Java 11 or higher
- Maven 3.6+
- Database (MySQL/PostgreSQL)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trading
   ```

2. **Configure application properties**
   ```bash
   # Update src/main/resources/application.properties
   # Configure database connection, JWT secret, email settings
   ```

3. **Build the project**
   ```bash
   ./mvnw clean install
   ```

4. **Run the application**
   ```bash
   ./mvnw spring-boot:run
   ```

The application will start on `http://localhost:8080`

## 🔧 Configuration

Update `application.properties` with your configuration:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/trading_db
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT Configuration
jwt.secret=your_jwt_secret
jwt.expiration=86400000

# Email Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email
spring.mail.password=your_password
```

## 📱 Usage

1. **Register a new user** via `/auth/signup`
2. **Login** to receive JWT token via `/auth/signin`
3. **Include JWT token** in Authorization header for protected endpoints
4. **Start trading** by creating orders, managing wallet, and tracking portfolio

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


**⚠️ Note**: This is a backend API application. For complete functionality, integrate with a frontend application or use API testing tools like Postman. 