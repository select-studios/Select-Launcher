"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get('/', (req, res) => {
    res.status(501).json({ message: "not implemented" });
});
exports.default = router;
//# sourceMappingURL=user.js.map