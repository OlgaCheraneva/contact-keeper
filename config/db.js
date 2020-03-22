const config = require('config');
const mongoose = require('mongoose');

const db = config.get('mongoURI');

const connectDB = () => {
    mongoose
        .connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(() => console.log('MongoDB is connected'))
        .catch((err) => {
            console.error(err.message);
            process.exit(1);
        });
};

module.exports = connectDB;
