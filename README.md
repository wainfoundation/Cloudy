# CloudyPi - Pi Network Cloud Storage Platform

A decentralized cloud storage platform powered by Pi Network, allowing users to store, manage, and share files securely using Pi cryptocurrency.

## 🚀 Features

- 🔐 Pi Network Authentication
- 📁 Secure File Storage & Sharing
- 👥 Project Collaboration
- 📊 File Management Dashboard
- 🔄 Real-time Updates
- 📱 Mobile-Friendly Interface
- 💰 Pi Payment Integration
- 🎨 Template System

## 🛠️ Tech Stack

| Layer       | Technologies                |
|-------------|----------------------------|
| Frontend    | HTML, CSS (Bootstrap), JS  |
| Backend     | Node.js, Express          |
| Database    | MongoDB                   |
| Auth        | Pi Network SDK            |
| Storage     | Local/Cloud (configurable)|

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Pi Network Developer Account

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/cloudypi.git
cd cloudypi
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies (if using separate frontend)
cd ../frontend
npm install
```

3. **Configure environment variables**
```bash
# Create .env file in backend directory
cp .env.example .env

# Add your configuration
MONGO_URI=mongodb://localhost:27017/cloudypi
PORT=5000
```

4. **Start the development server**
```bash
# Start backend
cd backend
npm run dev

# Start frontend (if applicable)
cd ../frontend
npm run dev
```

5. **Access the application**
- Backend: http://localhost:5000
- Frontend: http://localhost:3000 (if separate)

## 📁 Project Structure

```
cloudypi/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Project.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── projects.js
│   │   └── index.js
│   ├── .env
│   └── package.json
├── public/
│   ├── images/
│   │   └── logo.svg
│   ├── login.html
│   └── signup.html
├── .gitignore
├── LICENSE
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/authenticate` - Pi Network authentication
- `GET /api/auth/profile` - Get user profile

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/collaborators` - Add collaborator

## 🔒 Security

- Pi Network authentication
- JWT token validation
- MongoDB data encryption
- CORS protection
- Rate limiting
- XSS protection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Pi Network for their SDK and documentation
- MongoDB for the database platform
- The open-source community

## 📞 Support

For support, email support@cloudypi.xyz or join our Discord community.

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
