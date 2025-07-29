# Environment Variables Setup

This project uses environment variables for sensitive configuration. Follow these steps to set up your environment:

## 1. Create .env file

Create a `.env` file in the root directory of the backend project with the following content:

```env
# Database Configuration
DB_URL=jdbc:mysql://127.0.0.1:3306/trading
DB_USERNAME=root
DB_PASSWORD=your_actual_password

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
```

## 2. Update Values

Replace the placeholder values with your actual credentials:

### Database
- `DB_URL`: Your MySQL database URL
- `DB_USERNAME`: Your MySQL username
- `DB_PASSWORD`: Your MySQL password

### Payment Gateways
- `RAZORPAY_API_KEY`: Your Razorpay API key
- `RAZORPAY_KEY_SECRET`: Your Razorpay secret key
- `STRIPE_API_KEY`: Your Stripe API key
- `STRIPE_KEY_SECRET`: Your Stripe secret key

### Email (Gmail)
- `MAIL_USERNAME`: Your Gmail address
- `MAIL_PASSWORD`: Your Gmail app password (not regular password)

## 3. Gmail App Password Setup

To use Gmail SMTP, you need to create an App Password:

1. Go to your Google Account settings
2. Enable 2-Step Verification if not already enabled
3. Go to Security → App passwords
4. Generate a new app password for "Mail"
5. Use this app password in `MAIL_PASSWORD`

## 4. Security Notes

- **Never commit the `.env` file to version control**
- The `.env` file is already in `.gitignore`
- Use different credentials for development and production
- Keep your API keys and secrets secure

## 5. Default Values

The `application.properties` file includes default values as fallbacks, but it's recommended to set up proper environment variables for security.

## 6. Testing

After setting up the `.env` file, restart your Spring Boot application to load the new environment variables. 