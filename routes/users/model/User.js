const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
   },
   email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   totalPoints: {
      type: String,
      default: 0,
   },
   wins: {
      type: String,
      default: 0,
   },
   losses: {
      type: String,
      default: 0,
   }
})

module.exports = mongoose.model("user", UserSchema);