# MYToken by XK Society - Payhack 2024

## Overview
MYToken is a comprehensive financial management platform tailored for Malaysian users, integrating traditional banking, investments, and blockchain technology. The platform provides real-time portfolio tracking, AI-powered financial advice, and secure cryptocurrency staking capabilities.

## 🚀 Features

### Core Features
- **Unified Dashboard**
  - Multi-account portfolio tracking
  - Real-time financial overview
  - Historical performance analytics
  - Customizable widgets

### 📊 Investment Tracking
- KWSP/EPF balance monitoring
- ASB investment tracking
- Bursa Malaysia stocks
- Cryptocurrency holdings
- Gold & Silver investments

### 🏦 Banking Integration
- Multiple bank account aggregation
- Transaction categorization
- Bill payment tracking
- Loan management (PTPTN, Car loans, etc.)

### ⛓️ Blockchain Features
- Ethereum staking (5% APY)
- Instant MYR conversion
- Automated rewards distribution
- Real-time exchange rates

### 🤖 AI Advisory
- Personalized investment recommendations
- Risk assessment
- Market trend analysis
- Multi-language support (EN/BM)

### 🛡️ Security Features
- Credit risk assessment
- Fraud detection system
- Real-time transaction monitoring
- Multi-factor authentication

## 🛠️ Technology Stack

### Frontend
```bash
- React + Vite
- Tailwind CSS
- Recharts
- Web3.js
- Anthropic Claude AI SDK
```

### Backend
```bash
- Node.js
- Express
- MongoDB
- Web3
```

### Security
```bash
- JWT Authentication
- Encryption at rest
- SSL/TLS
- Fraud detection algorithms
```

## 📦 Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/mytoken.git
cd mytoken
```

2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables
```bash
# Frontend (.env)
VITE_AI_AGENT=your_claude_api_key
VITE_API_URL=http://localhost:5000

# Backend (.env)
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Run the application
```bash
# Run frontend (development)
npm run dev

# Run backend
npm start
```

## 🌐 API Documentation

### Authentication
```typescript
POST /api/auth/register
POST /api/auth/login
GET /api/auth/verify
```

### Portfolio Management
```typescript
GET /api/portfolio
POST /api/portfolio/update
GET /api/portfolio/history
```

### Investment Tracking
```typescript
GET /api/investments
POST /api/investments/add
GET /api/investments/performance
```

### Banking Integration
```typescript
GET /api/banking/accounts
GET /api/banking/transactions
POST /api/banking/link
```

### Staking Operations
```typescript
POST /api/staking/stake
POST /api/staking/unstake
GET /api/staking/rewards
```

## 🔒 Security Measures

### Data Protection
- End-to-end encryption
- Secure credential storage
- Regular security audits
- PDPA compliance

### Fraud Prevention
- Real-time transaction monitoring
- Behavioral analysis
- Device fingerprinting
- Location validation

## 📊 Project Structure
```
mytoken/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── data/
│   └── public/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/
└── docs/
```

## 🤝 Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments
- Bank Negara Malaysia for financial data
- Anthropic for AI capabilities
- Malaysian banking partners
- Open-source community
