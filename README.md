# CloudyPi

A cloud storage platform integrated with Pi Network, allowing users to store and manage their files securely using Pi cryptocurrency.

## Features

- Pi Network Authentication
- Secure File Storage
- File Sharing
- Project Management
- Real-time Collaboration
- Template System

## Tech Stack

- **Frontend**: HTML, CSS (Bootstrap), JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Pi Network SDK
- **File Storage**: Local storage (configurable for cloud storage)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Pi Network Developer Account

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cloudypi.git
cd cloudypi
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
MONGO_URI=mongodb://localhost:27017/cloudy
PORT=3000
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
cloudypi/
├── public/
│   ├── images/
│   │   └── logo.svg
│   │   └── login.html
│   └── signup.html
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Project.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── projects.js
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/authenticate` - Authenticate with Pi Network
- `GET /api/auth/profile` - Get user profile

### Projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/collaborators` - Add collaborator

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Pi Network for their SDK and documentation
- The open-source community for inspiration and tools

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
