import express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    //TODO register accounts
    res.status(501).json({ message: "register account" });
});

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;


})

export default router;