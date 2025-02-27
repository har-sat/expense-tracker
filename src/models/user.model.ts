import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is a required field"],
      trim: true,
      match: [
        /^[a-zA-Z][a-zA-Z0-9\-_]{0,19}$/,
        "username must be shorter than 20 characters and can only contain a-z 0-9 - and _",
      ],
    },
    email: {
      type: String,
      required: [true, "email is a required field"],
      unique: [true, "email is already is use"],
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "email is invalid",
      ],
    },
    password: {
      type: String,
      required: [true, "password is a required field"],
      minLength: [8, "password must be longer than 7 characters"],
      match: [
        /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/,
        "password must contain an uppercase, special character and a number",
      ],
    },
    budget: {
      type: Number,
      default: 0.0,
      min: [0, "budget can't be less than 0"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
