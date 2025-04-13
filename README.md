# CloudyPi - Web3 Gaming Platform

A decentralized gaming platform powered by Pi Network, built with Next.js and Node.js.

## Features

- Pi Network Authentication
- Web3 Gaming Integration
- Digital Product Marketplace
- Creator Payouts
- User Rewards System
- Real-time Gaming Stats
- Achievement System

## Tech Stack

- Frontend: Next.js, TypeScript, TailwindCSS
- Backend: Node.js, Express, TypeScript
- Database: MongoDB
- Authentication: Pi Network SDK
- Payment Processing: Pi Network

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Pi Network Account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cloudypi.xyz.git
cd cloudypi.xyz
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
```bash
# Backend (.env)
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PI_NETWORK_API_KEY=your_pi_network_api_key

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_PI_NETWORK_API_URL=https://api.minepi.com
```

4. Start the development servers:
```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm run dev
```

## Deployment

1. Build the application:
```bash
# Build backend
cd backend
npm run build

# Build frontend
cd ../frontend
npm run build
```

2. Start production servers:
```bash
# Start backend
cd backend
npm start

# Start frontend
cd ../frontend
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://github.com/yourusername/cloudypi.xyz](https://github.com/yourusername/cloudypi.xyz)

---

## 🚀 Features

- 📦 Upload & sell digital products (PDFs, ZIPs, audio, etc.)
- 🔐 Pi Network–native authentication and wallet integration
- 🛍️ Creator storefronts with follower support
- 💾 Secure file delivery after purchase
- 📊 Sales and download analytics for creators
- 🌍 Web app optimized for Pi Browser

---

## 🔧 Tech Stack

| Layer       | Stack                         |
|-------------|-------------------------------|
| Frontend    | React / Next.js               |
| Backend     | Node.js + Express / Firebase  |
| Auth/Wallet | Pi SDK (Pi Network login)     |
| Database    | Firebase / MongoDB Atlas      |
| Storage     | Firebase Storage / IPFS       |
| Deployment  | Vercel + Render / Heroku      |

---
