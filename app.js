require('dotenv').config();

const express = require('express');
const app = express();

const db = require('./src/config/db')
db()

require('./src/config/googleStrategy')

const session = require('express-session')
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false,
}))

const passport = require('passport');
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/auth', require('./src/routes/authRoutes'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});