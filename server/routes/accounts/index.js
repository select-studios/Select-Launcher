"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get('/', (req, res) => {
    //TODO: return all accounts
    res.status(501).json({ message: "get all accounts..." });
});
exports.default = router;
//# sourceMappingURL=index.js.map