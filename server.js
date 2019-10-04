const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db')

const app = express();

// connect database
connectDB();

// Init Middleware
app.use(express.json({extended: false}));
// app.get('/', (req, res) => res.send('API Running'));


// Then pass them to cors:

// Define Routes 
app.use(cors());
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.use(helmet());
app.use(morgan('tiny'));
require('./startup/prod')(app);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))