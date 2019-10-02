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
// Set up a whitelist and check against it:
var whitelist = ['http://www.legacyteams.net']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Then pass them to cors:
app.use(cors(corsOptions));

// Define Routes 
app.use('/api/users', cors(corsOptions), require('./routes/api/users'));
app.use('/api/auth', cors(corsOptions), require('./routes/api/auth'));
app.use('/api/profile', cors(corsOptions), require('./routes/api/profile'));
app.use('/api/posts', cors(corsOptions), require('./routes/api/posts'));
app.use(helmet());
app.use(morgan('tiny'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))