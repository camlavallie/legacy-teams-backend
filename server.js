const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

// connect database
connectDB();

// Init Middleware
app.use(express.json({
  extended: false
}));



// Then pass them to cors:sdfsdfsd
// Define Routes 
app.use(cors());
app.options('*', cors());
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use(helmet());
app.use(morgan('tiny'));





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

