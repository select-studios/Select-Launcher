import express = require("express");
import * as uuid from "uuid";
import User from "../../models/user";
const router = express.Router();

router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    const newUser = new User({ username, password, icon: "", id: uuid.v4() });
    await newUser.save();

    res.status(200).json({ newUser });
  } else {
    res.status(400).json({ message: "please include a username and password" });
  }
});

router.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  const user = await User.findOne({ username });

  if (username && password) {
    if (user) {
      if (password === user.password) {
        res.status(200).json(user);
      }
    } else {
      console.log(username);
      console.log(password);
      res
        .status(404)
        .json({ message: "The username or password was incorrect" });
    }
  } else {
    console.log(username);
    console.log(password);

    res
      .status(400)
      .json({ message: "The username or password wasn't provided" });
  }
});

export default router;
