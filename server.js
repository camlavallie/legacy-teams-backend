const express = require('express');
const connectDB = require('./config/db')
const app = express();

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


// connect database
connectDB();

// Init Middleware
app.use(express.json({
  extended: false
}));
app.use(cors());
// app.get('/', (req, res) => res.send('API Running'));

// Define Routes 
app.use('/api/users', cors(), require('./routes/api/users'));
app.use('/api/auth', cors(), require('./routes/api/auth'));
app.use('/api/profile', cors(), require('./routes/api/profile'));
app.use('/api/posts', cors(), require('./routes/api/posts'));
app.use(helmet());
app.use(morgan('tiny'));
require('./startup/prod')(app);

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))