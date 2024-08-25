const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path')
const connectDb = require('./config/connectDb');




// dot env config
dotenv.config();

// database call
connectDb();

// rest object
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1/users', require('./routes/userRoute'));

// transaction routes
app.use('/api/v1/transactions', require('./routes/TransactionRoutes')); // Note the leading '/'

//static file
app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})


// port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
 