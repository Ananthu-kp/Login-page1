const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require('body-parser');
const session = require('express-session');


const router = require('./router');

// Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// View engine setup
app.set('view engine', 'ejs');
app.set("views", path.resolve(__dirname, 'views'));

// Serve static assets
app.use("/static", express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Session setup
const SESSION_SECRET = 'your-secret-key';

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));


// Routes
app.use('/route', router);

app.get('/', (req, res) => {
    console.log("Server is working");
    res.render('base', { title: 'Login System' });
});

// Server setup
const PORT =process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
