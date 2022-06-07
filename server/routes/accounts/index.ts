import express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //TODO: return all accounts
    res.status(501).json({ message: "get all accounts..." });
});

export default router;