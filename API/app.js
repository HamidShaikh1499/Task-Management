require('dotenv').config();

const express = require('express');
const cors = require('cors');

const router = require('./src/index');
const errorHandler = require('./src/errorHandler/errorHandler');
const pageNotFound = require('./src/errorHandler/pageNotFound');

// project-imports
const dbConnection = require('./src/dbConfig/dbConnection');

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// connect to mongodb
dbConnection();

app.use('/api/', router);

// Common Exception handler 
app.use(pageNotFound);
app.use(errorHandler);

app.listen(process.env.APP_PORT, () => {
    console.log("Api is running on port 5000.");
});
