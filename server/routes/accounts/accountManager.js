"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.post('/register', (req, res) => {
    //TODO register accounts
    res.status(501).json({ message: "register account" });
});
router.post('/login', (req, res) => {
    //TODO login
    res.status(501).json({ message: "login" });
});
exports.default = router;
//# sourceMappingURL=accountManager.js.map