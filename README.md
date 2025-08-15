# Vinit Pawar - Portfolio Website

A modern, responsive portfolio website built with React and Node.js, featuring dynamic skills management through an admin panel.

## 🚀 Features

### Frontend

- **Modern React 19** with functional components and hooks
- **Responsive Design** with SCSS styling
- **Interactive Animations** using React Simple Animate
- **Particle.js Background** on home page
- **Dynamic Skills Display** with progress bars
- **Admin Panel** for content management

### Backend

- **Node.js + Express.js** RESTful API
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** for admin access
- **CRUD Operations** for skills management
- **Secure Password Hashing** with bcrypt

## 🛠️ Tech Stack

### Frontend

- React 19.0.0
- React Router DOM 7.1.5
- React Icons 5.4.0
- React Simple Animate 3.5.3
- React TSParticles 2.12.2
- RC Progress 4.0.0
- Axios
- SCSS/Sass

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd react-app
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Environment Configuration

#### Backend (.env file in backend folder)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_EMAIL=admin@vinitpawar.com
ADMIN_PASSWORD=admin123
```

**Note:** Replace the JWT_SECRET with a strong, unique secret key for production.

### 5. Database Setup

#### Option A: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. The database will be created automatically when you first run the application

#### Option B: MongoDB Atlas

1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Replace `MONGODB_URI` in the .env file

### 6. Initialize Admin User

```bash
cd backend
npm run dev
```

Then make a POST request to initialize the admin user:

```bash
curl -X POST http://localhost:5000/api/auth/init-admin
```

Or visit: `http://localhost:5000/api/auth/init-admin` in your browser

### 7. Seed Initial Skills Data

```bash
cd backend
npm run seed
```

### 8. Start the Application

#### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend

```bash
# From the root directory
npm start
```

The application will be available at:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 🔐 Admin Access

### Default Credentials

- **Email:** admin@vinitpawar.com
- **Password:** admin123

### Access Admin Panel

1. Navigate to http://localhost:3000/admin/login
2. Use the default credentials above
3. Or click the "ADMIN" link in the navigation bar

### Admin Features

- **Add New Skills** with name, percentage, and category
- **Edit Existing Skills** - modify name, percentage, or category
- **Delete Skills** with confirmation
- **View All Skills** in a grid layout
- **Secure Logout** functionality

## 📁 Project Structure

```
react-app/
├── src/
│   ├── components/
│   │   ├── navBar/           # Navigation component
│   │   └── pageHeaderContainer/  # Page header component
│   ├── containers/
│   │   ├── admin/           # Admin panel components
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLogin.scss
│   │   │   └── AdminDashboard.scss
│   │   ├── about/           # About page
│   │   ├── contact/         # Contact page
│   │   ├── home/            # Home page
│   │   ├── portfolio/       # Portfolio page
│   │   ├── resume/          # Resume page
│   │   └── skills/          # Skills page (now dynamic)
│   ├── services/
│   │   └── api.js           # API service functions
│   └── utils.js/
│       └── particles.js     # Particle configuration
├── backend/
│   ├── models/
│   │   ├── User.js          # User model for admin
│   │   └── Skill.js         # Skill model
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── skills.js        # Skills CRUD routes
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── server.js            # Main server file
│   ├── seedData.js          # Database seeding script
│   └── config.env           # Environment variables
└── package.json
```

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/init-admin` - Initialize admin user

### Skills (Public)

- `GET /api/skills` - Get all active skills (grouped by category)

### Skills (Protected - Admin Only)

- `GET /api/skills/admin` - Get all skills for admin
- `POST /api/skills` - Create new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill
- `PUT /api/skills/reorder` - Reorder skills

## 🎨 Customization

### Adding New Skill Categories

1. Update the `category` enum in `backend/models/Skill.js`
2. Add the new category to the admin form in `AdminDashboard.jsx`

### Styling Changes

- Main styles: `src/App.scss`
- Component styles: Individual `.scss` files in each component folder
- Theme colors: Update CSS variables in your main stylesheet

### Content Updates

- **Skills:** Use the admin panel
- **Other content:** Edit the respective component files

## 🚀 Deployment

### Frontend (React App)

```bash
npm run build
```

Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)

### Backend (Node.js)

1. Set up environment variables on your hosting platform
2. Deploy to services like:
   - Heroku
   - Railway
   - DigitalOcean
   - AWS

### Database

- Use MongoDB Atlas for cloud database
- Update the `MONGODB_URI` in your production environment

## 🔒 Security Notes

1. **Change Default Credentials:** Update admin email/password in production
2. **Strong JWT Secret:** Use a complex, unique JWT secret
3. **Environment Variables:** Never commit sensitive data to version control
4. **HTTPS:** Use HTTPS in production
5. **Rate Limiting:** Consider adding rate limiting for production

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network access for cloud databases

2. **CORS Errors**

   - Backend CORS is configured for development
   - Update CORS settings for production domains

3. **Admin Login Issues**

   - Ensure admin user is initialized
   - Check credentials
   - Verify JWT secret is set

4. **Skills Not Loading**
   - Check backend server is running
   - Verify API endpoint is accessible
   - Check browser console for errors

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Vinit Pawar**

- Email: vinitpawar8305@gmail.com
- Location: Bangalore, India
- Full-Stack Developer

---

**Happy Coding! 🚀**
