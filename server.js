const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db')
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');


// connect database
connectDB();

// Init Middleware
app.use(express.json({
  extended: false
}));
// app.get('/', (req, res) => res.send('API Running'));


// Then pass them to cors:
app.use(cors());

// Define Routes 

app.use('/api/users', require('./routes/api/users', 'Access-Control-Allow-Headers', '*'));
app.use('/api/auth', require('./routes/api/auth', 'Access-Control-Allow-Headers', '*'));
app.use('/api/profile', require('./routes/api/profile', 'Access-Control-Allow-Headers', '*'));
app.use('/api/posts', require('./routes/api/posts', 'Access-Control-Allow-Headers', '*'));
app.use(helmet());
app.use(morgan('tiny'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))