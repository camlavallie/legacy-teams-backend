const express = require('express');
const connectDB = require('./config/db')
const app = express();
const Cors = require("cors");
const helmet = require('helmet');
const morgan = require('morgan');


// connect database
connectDB();

// Init Middleware
app.use(express.json({
  extended: false
}));

// app.get('/', (req, res) => res.send('API Running'));

// Define Routes 
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use(helmet());
app.use(morgan('tiny'));
require('./startup/prod')(app);
app.use(Cors());
require('./startup/cors')(app);

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))