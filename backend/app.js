const bodyParser = require('body-parser');
const cookieparser=require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const app = express();

// All routes Imports
const adminRoutes = require('./routes/admin');
const skillRoutes = require('./routes/skillRoutes');
const blogRoutes = require ("./routes/blogRoutes.js");
const projectRoutes =require ("./routes/projectRoutes.js");
const contactRoutes = require('./routes/contactRoutes');

// Database route or conection
const ConnectToDb=require('./Database/db.js');
ConnectToDb();


// Import required middleware
app.use(cors()); 
app.use(express.json());
app.use(cookieparser()); 
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); 

// Route handlers for different API modules
app.use('/api/admin', adminRoutes);
app.use('/api/contact/', contactRoutes); 
app.use("/api/blogs", blogRoutes); 
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);

// Default root route for testing or server status check
app.get('/', (req, res) => {
    res.send('Now this backend server is live have a good day'); 
});

module.exports = app;
