const mongoose = require("mongoose");
const brcypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  mobile: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
    default: "user",
  },
  cart: {
    type: Array,
    default: [],
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Hashing password before store to DB
userSchema.pre("save", async function (next) {
  const salt = await brcypt.genSaltSync(10);
  this.password = await brcypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function (EnteredPassword) {
  return await brcypt.compare(EnteredPassword, this.password);
};
module.exports = mongoose.model("User", userSchema);
