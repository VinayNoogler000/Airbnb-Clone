# RentEase - Property Rental Platform for Modern Travelers

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/VinayNoogler000/RentEase/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/VinayNoogler000/RentEase)](https://github.com/VinayNoogler000/RentEase/issues)
[![GitHub stars](https://img.shields.io/github/stars/VinayNoogler000/RentEase)](https://github.com/VinayNoogler000/RentEase/stargazers)

<!-- Frontend -->
[![EJS](https://img.shields.io/badge/ejs-%23B6CC6A.svg?style=for-the-badge&logo=ejs&logoColor=brown)](https://ejs.co/)
[![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
<!-- [![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/) -->

<!-- Backend -->
[![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![Passport](https://img.shields.io/badge/passport-%23000000.svg?style=for-the-badge&logo=passport&logoColor=white)](http://www.passportjs.org/)
[![Multer](https://img.shields.io/badge/multer-%23008080.svg?style=for-the-badge&logo=multer&logoColor=white)](https://www.npmjs.com/package/multer)

<!-- Third-Party APIs/Services -->
[![Cloudinary](https://img.shields.io/badge/Cloudinary-%231563FF.svg?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![MapBox](https://img.shields.io/badge/mapbox-%23000000.svg?style=for-the-badge&logo=mapbox&logoColor=white)](https://www.mapbox.com/)

<!-- Database -->
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## 📖 Overview

RentEase is a full-stack property rental platform that enables users to list, browse, and book (planned) properties worldwide. Built with the MERN stack and enhanced with features like secure authentication, interactive maps, and cloud-based image management, it provides a seamless experience for both property owners and travelers.

## 🎥 Demo

![RentEase-Preview](https://github.com/VinayNoogler000/RentEase/blob/main/public/preview.png?raw=true)

## 🛠 Technologies Used

### Frontend
- **EJS**: Template engine for server-side rendering
- **Bootstrap**: Frontend framework for responsive design
- **React.js**: Frontend library for building the user interface (planned)

### Backend
- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Web application framework for building the server and API endpoints
- **Passport.js**: Authentication middleware for user management
- **Express-Session**: Session middleware for Express.js
- **Method-Override**: Middleware for HTTP method override
- **Multer**: Middleware for handling multipart/form-data

### Third-Party APIs/Services
- **Cloudinary**: Cloud service for image storage and delivery
- **Mapbox**: Location services and interactive maps

### Database
- **MongoDB**: NoSQL database for storing property listings, user data, and reviews
- **Mongoose**: MongoDB object modeling tool

## 📚 Learnings

1. **Middlewares**: In Express app, functions executed between receiving client requests and sending responses. They handle request processing, authentication, and error handling through the `app.use()` method.

2. **Authentication & Authorization**: Implemented user authentication (identity verification) and authorization (permission management) using `Passport.js` strategies.

3. **Session Management**: Implemented session-based authentication using `Express-Session` for maintaining user state across requests.

4. **MVC Architecture**: Organized code following the Model-View-Controller pattern:
   - Models: Database schemas and business logic
   - Views: EJS templates for rendering
   - Controllers: Handle HTTP-Client-requests and sending server-responses

5. **Cloud Integration**: 
   - Implemented Cloudinary for image storage and processing
   - Integrated Mapbox for location services and interactive mapping
   - Utilized geocoding for property location visualization

6. **Security Best Practices**:
   - Implemented secure password hashing
   - Protected routes with authentication middleware
   - Handled user sessions securely

7. **Database Operations**:
   - CRUD operations with MongoDB
   - Data relationships and references
   - Query optimization and indexing

8. **Error Handling**:
   - Implemented global error handlers
   - Async/await error management
   - User-friendly error messages

## 📝 To-Do

- [✅] Enhance search with filters
- [✅] Add user reviews and ratings
- [ - ] Implement social authentication (Google, Facebook)
- [ - ] Add payment gateway integration
- [ - ] Add real-time messaging
- [ - ] Implement booking system
- [ - ] Optimize performance
- [ - ] Add email notifications

## 💬 Seeking Feedback & Improvements

I would love to hear your feedback on this project! If you have suggestions for performance improvements or ideas for new features, please feel free to open an issue on the [GitHub repository](https://github.com/VinayNoogler000/Instagram-Clone/issues).

## 🐛 Found a Bug? Have a Feature Suggestion?

If you find a bug or have a feature suggestion, please open an issue [here](https://github.com/VinayNoogler000/Instagram-Clone/issues) with a clear description and steps to reproduce. Your input means a lot to me, as it helps me grow and become a more powerful software developer engineer.

## 📋 Prerequisites for Local Development

- Node.js (Latest LTS Version)
- MongoDB
- NPM
- Git
- Basic knowledge of JavaScript and Web Development

## ⚙️ Setup Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/VinayNoogler000/RentEase.git
   ```

2. Install dependencies:
   ```bash
   cd RentEase
   npm install --force
   ```

3. Configure environment variables by creating a `.env` file in the root directory with following variables:
   ```bash
   # Server Configuration
   PORT=8080
   NODE_ENV=development

   # Session Configuration
   SESSION_SECRET=your_session_secret_key

   # Cloudinary Configuration
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret

   # Mapbox Configuration
   MAP_TOKEN=your_mapbox_api_token

   # MongoDB Configuration
   ATLASDB_URL=your_mongodb_connection_string
   ```
   You'll need to:
      * Create a MongoDB Atlas account and get your database connection string
      * Set up a Cloudinary account for image storage
      * Get a Mapbox API token for maps and geocoding
      * Generate a random session secret key 

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
rentease/
├── controllers/    # Route controllers
├── middleware/     # Custom middlewares
├── models/         # Database models
├── public/         # Static files (CSS & JS)
├── routes/         # Express routes
├── utils/          # Utility functions
├── views/          # EJS templates
├── app.js          # Application entry point
├── cloudConfig.js  # Cloudinary configuration file
└── schema.js       # JOI schema for server-side validation
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🗓️ What My Daily Life Looks Like?

As of now, the latest version of this README file, I've started the revison of `React.js`, will be building atleast 3-5 major Projects using this framework with other modern tech to strengthen my fundamentals, and, finally, become a MERN-Stack Web Developer.

This project/website is my 1st self-made Full-Stack Web Development project, which I'm really proud of, and the idea plus prototype of this project was given by my mentor, [Ms. Shradha Khapra](https://www.linkedin.com/in/shradhakhapra/).

My end-goal in this project is to make it a full-fledge software-solution, just like AirBnb, allowing me to learn a lot about modern-development practices and building software-solutions, which will be used by people to rent properties worldwide, and I will be using this project as a portfolio piece to showcase my skills to potential employers. 

After building a few `React.js` projects, I will be continuing to work in this `RentEase` project or some other passion projects, where I'll be building at least 2 or more real-world Full-Stack (MERN) projects to hone my skills, and secure a Full-Stack Web Developer job.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/VinayNoogler000/RentEase/blob/main/LICENSE.txt) file for details.

## 📞 Contact

**Vinay Tambey**
- LinkedIn: [Vinay Tambey](https://www.linkedin.com/in/vinaytambey)
- Email: [vinaytambey000@gmail.com](mailto:vinaytambey000@gmail.com)
- Twitter/X: [@VinayNoogler000](https://x.com/VinayNoogler000)
- GitHub: [@VinayNoogler000](https://github.com/VinayNoogler000)

## 📊 Project Status

Active development - Features being added regularly.

## 💼 Support

Give a ⭐️ if this project helped you!

---

Made with ❤️ by [Vinay Tambey](https://github.com/VinayNoogler000)