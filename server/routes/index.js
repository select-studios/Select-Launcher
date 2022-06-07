"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get('/', (req, res) => {
    res.status(200).json({ message: "TODO" });
});
exports.default = router;
//# sourceMappingURL=index.js.map