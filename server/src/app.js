const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
const teamRoutes = require('./routes/teamRoutes');
const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api', router);
app.use('/api/teams', teamRoutes);
app.get('/', (req, res) => res.json({ status: 'ok' }));

module.exports = app;