# 📝 Notes App

A modern, full-stack notes application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to create, organize, and manage their notes with a beautiful and intuitive interface.

## ✨ Features

### 🔐 Authentication
- User registration and login system
- JWT-based authentication
- Secure password handling
- Protected routes

### 📝 Note Management
- Create, edit, and delete notes
- Rich text content support
- Note pinning functionality
- Search and filter notes
- Tag-based organization
- Responsive note cards

### 🎨 User Interface
- Modern, responsive design
- Beautiful gradient themes
- Smooth animations and transitions
- Mobile-first approach
- Intuitive navigation

### 🔍 Search & Organization
- Real-time search functionality
- Clear search results
- Organized note display
- Pinned notes priority

## 🚀 Tech Stack

### Frontend
- **React.js** - User interface library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Modal** - Modal components

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Notes App/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   └── assets/         # Images and static files
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Node.js backend application
│   ├── modals/             # Database models
│   ├── index.js            # Main server file
│   ├── utilities.js        # Helper functions
│   └── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Naveen0030/Notes_App.git
   cd Notes_App
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_jwt_secret_key
   PORT=8000
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:8000`

### Frontend Setup

1. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Configuration**
   Create a `.env.local` file in the frontend directory:
   ```env
   VITE_BASE_URL=http://localhost:8000
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173`

## 🌐 API Endpoints

### Authentication
- `POST /create-account` - User registration
- `POST /login` - User login
- `GET /get-user` - Get user information

### Notes
- `GET /get-all-notes` - Fetch all user notes
- `POST /create-note` - Create a new note
- `PUT /update-note/:id` - Update existing note
- `DELETE /delete-note/:id` - Delete a note
- `PUT /update-note-pinned/:id` - Toggle note pin status
- `GET /search-notes` - Search notes by query

## 🎯 Key Features Explained

### Smart Navigation
- **Logo Click Behavior**: 
  - Authenticated users → Dashboard
  - Non-authenticated users → Home page

### Empty State Handling
- **No Notes**: Displays helpful empty state with action button
- **Create First Note**: Prominent button to start note creation
- **Getting Started Tips**: Helpful guidance for new users

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Grid Layout**: Responsive note grid (1-4 columns based on screen size)
- **Touch Friendly**: Large touch targets and smooth interactions

## 🔧 Development

### Available Scripts

**Backend:**
- `npm start` - Start development server with nodemon

**Frontend:**
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Structure
- **Components**: Reusable UI components with props
- **Pages**: Main application views
- **Utils**: Helper functions and configurations
- **Models**: MongoDB schemas and models

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Ensure MongoDB connection is accessible
3. Deploy to platforms like Heroku, Railway, or Render

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to platforms like Vercel, Netlify, or GitHub Pages
3. Update `VITE_BASE_URL` to point to your deployed backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)


## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by popular note-taking applications
- Designed for optimal user experience

---

**Happy Note-Taking! 📝✨**
