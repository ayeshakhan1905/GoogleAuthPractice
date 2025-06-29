const passport = require('passport');

const router = require('express').Router();

router.get('/google' , passport.authenticate('google', {scope : ['profile']}))

router.get('/google/callback', passport.authenticate('google', {failureRedirect:"/auth/error"}), (req, res)=>{
    res.send('Sucessfully logged in with Google');
})

router.get('/error', (req, res) => {
    res.send('Error logging in with Google');
});

router.get('/',(req, res)=>{
   res.send(`<a href="/auth/google">Login with Google</a>`);
})

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.redirect('/auth');
        }
        res.send('Successfully logged out');
    });
});

module.exports = router;