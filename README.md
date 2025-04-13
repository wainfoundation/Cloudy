# ☁️ Cloudypi.xyz

A modern web application for cloud-based Pi services.

## Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your configuration

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend will be available at http://localhost:5000

### Frontend Setup
1. From the root directory, install http-server globally:
   ```bash
   npm install -g http-server
   ```

2. Start the frontend server:
   ```bash
   http-server . -p 8080
   ```

The frontend will be available at http://localhost:8080

## Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- More endpoints documented in the backend

## License

This project is licensed under the ISC License.

**Cloudy.xyz** is a decentralized digital product marketplace built exclusively for the **Pi Network** community.  
It enables creators to upload, showcase, and sell digital goods — such as templates, design assets, eBooks, and tools — with payments powered 100% by Pi.

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
