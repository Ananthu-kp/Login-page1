const express = require("express");
const router = express.Router();

const verify = {
    email: "user@gmail.com",
    password: "user123"
};

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === verify.email && password === verify.password) {
        req.session.user = email; 
        res.redirect('/route/dashboard')
    } else {
        console.log("Login failed. Invalid username or password.");
        res.render('base', { title: 'Login System', errorMessage: 'Incorrect username or password' });
    }
});

//route for dashboard
router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user });
    } else {
        res.send("Unauthorized User");
    }
});

//route for logout
router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
            res.send("Error");
        } else {
            res.redirect('/');
        }
    });
});


module.exports = router;
