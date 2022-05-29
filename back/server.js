const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const groupRoutes = require('../back/routes/groupRoutes');
const accountRoutes = require('../back/routes/accountsRoutes');
const billsRoutes = require('../back/routes/billsRoutes');
const { PORT } = require('./config');
const userRoutes = require('../back/routes/userRoutes');

const app = express();

// MiddleWare
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.json('Up and running!'));

app.use('/api', userRoutes);
app.use('/api', accountRoutes);
app.use('/api', billsRoutes);
app.use('/api', groupRoutes);

// 404 route
app.all('*', (req, res) => {
  res.status(404).json({
    err: 'Something is not working!',
  });
});

app.listen(PORT, () => console.log('server is up and running, PORT', PORT));
