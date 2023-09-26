import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  credits: { type: Number, required: true },
  posts: { type: Array, required: true },
});


const UserSchema = mongoose.model("User", User);

export default UserSchema;
