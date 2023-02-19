const mongoose = require("mongoose");
const brcypt = require("bcrypt");
const crypto = require("crypto");
const { reset } = require("nodemon");

const userSchema = new mongoose.Schema(
  {
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
    refreshToken: {
      type: String,
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpire: {
      type: Date,
    },
  },
  { timeseries: true }
);

// Hashing password before store to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await brcypt.genSaltSync(10);
  this.password = await brcypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function (EnteredPassword) {
  return await brcypt.compare(EnteredPassword, this.password);
};

userSchema.methods.CreatePasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordChangedAt = Date.now() + 30 * 60 * 1000;
  return resetToken;
};
module.exports = mongoose.model("User", userSchema);
