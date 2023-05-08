require('dotenv').config();
const mongoose = require('mongoose');
const dbURL = process.env.DB_URL;

const connect = async () => {
    await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongodb Connected")
        }).catch(e => {
            console.log(e)
            // create log in database
        })
}

module.exports = connect
