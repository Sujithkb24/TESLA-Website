require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const teamRoutes = require('./routes/teamRoutes');

const app = express();


app.use(cors({
    origin: "*",  
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization"
}));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


connectDB();


app.use('/api/teams', teamRoutes);

app.get('/', (req, res) => {
  res.json({
    message: '✅ Server is running!',
    endpoints: {
      POST: '/api/teams/register - Register new team',
      GET: '/api/teams - Get all teams',
      GET: '/api/teams/:id - Get team by ID',
      PUT: '/api/teams/:id - Update team',
      DELETE: '/api/teams/:id - Delete team'
    }
  });
});


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(`Base URL: http://localhost:${PORT}`);
});
