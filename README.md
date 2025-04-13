# CloudyPi Game Platform

A gaming platform that integrates with the Pi Network for cryptocurrency rewards.

## Features

- HTML5 game platform
- Pi Network integration for cryptocurrency rewards
- Ad integration for additional rewards
- User authentication and profile management
- MongoDB database for data persistence

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Pi Network account and API credentials

## Setup

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

3. Configure environment variables:
- Copy `.env.example` to `.env` in the backend directory
- Update the following variables in `.env`:
  - `MONGODB_URI`: Your MongoDB connection string
  - `PI_NETWORK_API_KEY`: Your Pi Network API key
  - `JWT_SECRET`: A secure secret for JWT token generation
  - Other configuration variables as needed

4. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in a new terminal)
cd frontend
npm run dev
```

## Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `PI_NETWORK_API_URL`: Pi Network API URL
- `PI_NETWORK_API_KEY`: Pi Network API key
- `JWT_SECRET`: Secret for JWT token generation
- `JWT_EXPIRES_IN`: JWT token expiration time
- `CORS_ORIGIN`: Allowed CORS origin

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

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
