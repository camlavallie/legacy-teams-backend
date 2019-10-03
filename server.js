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
var whitelist = ['http://www.legacyteams.net', 'https://legacy-teams.herokuapp.com', 'http://localhost:3000', 'Access-Control-Allow-Headers', '*']
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
app.use(cors(corsOptions) );

// Define Routes 

app.use('/api/users', require('./routes/api/users', 'Access-Control-Allow-Headers', '*'));
app.use('/api/auth', require('./routes/api/auth', 'Access-Control-Allow-Headers', '*'));
app.use('/api/profile', require('./routes/api/profile', 'Access-Control-Allow-Headers', '*'));
app.use('/api/posts', require('./routes/api/posts', 'Access-Control-Allow-Headers', '*'));
app.use(helmet());
app.use(morgan('tiny'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))