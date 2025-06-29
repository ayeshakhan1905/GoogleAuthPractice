const passport = require('passport');

const router = require('express').Router();

router.get('/google' , passport.authenticate('google', {scope : ['profile']}))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: "/auth/error" }), (req, res) => {
    res.send(`
        <h2>Successfully logged in with Google ✅</h2>
        <form action="/auth/logout" method="GET">
            <button type="submit">Logout</button>
        </form>
    `);
});


router.get('/error', (req, res) => {
    res.send('Error logging in with Google');
});

router.get('/', (req, res) => {
    res.send(`
        <h2>Login with Google</h2>
        <a href="/auth/google" style="
            display: inline-block;
            padding: 8px 16px;
            background-color: #4285F4;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-family: Arial, sans-serif;
        ">Login with Google</a>
    `);
});


router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (!err) {
            return res.redirect('/auth');
        }
        console.error('Logout error:', err);
        res.status(500).send('Error logging out');
    });
});

module.exports = router;