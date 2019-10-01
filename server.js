const express = require('express');
const connectDB = require('./config/db')
const app = express();

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');



var corsOptions = {
  origin: 'http://www.legacyteams.net',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// connect database
connectDB();

// Init Middleware
app.use(express.json({
  extended: false
}));
app.use(cors());

// app.get('/', (req, res) => res.send('API Running'));
// Define Routes 
app.use('/api/users', cors(corsOptions), require('./routes/api/users'));
app.use('/api/auth', cors(corsOptions), require('./routes/api/auth'));
app.use('/api/profile', cors(corsOptions), require('./routes/api/profile'));
app.use('/api/posts', cors(corsOptions), require('./routes/api/posts'));
app.use(helmet());
app.use(morgan('tiny'));
require('./startup/prod')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))