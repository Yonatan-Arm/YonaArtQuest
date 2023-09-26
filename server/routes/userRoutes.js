import express from "express";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";

import User from "../mongodb/models/user.js";

dotenv.config();
const router = express.Router();

router.route("/login").post(async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getByUsername(username);
    if (!user) return Promise.reject("Invalid name or password");
    const match = await bcrypt.compare(password, user.password);
    if (!match) return Promise.reject("Invalid name or password");
    delete user.password;
    return user;
  } catch (error) {
    res.status(401).send({ err: "Failed to Login" });
  }
});

// Signup user
router.route("/signup").post(async (req, res) => {
  try {
    const { name, password, _id, posts, credits } = req.body;
    const saltRounds = 10;
    if (!name || !password)return Promise.reject("name and password are required!");
    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      name,
      password:hash,
      posts,
      credits,
    });

    // const user = await authService.login(username, password);
    // req.session.user = user;
    // res.json(user);
  } catch (err) {
    res.status(500).send({ err: "Failed to signup" });
  }
});


async function getByUsername(username) {
  try {
    const collection = await dbService.getCollection("users");
    const user = await collection.findOne({ username });
    return user;
  } catch (err) {
    logger.error(`while finding user ${username}`, err);
    throw err;
  }
}

export default router;
