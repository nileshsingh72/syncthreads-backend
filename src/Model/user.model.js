const { model, Schema } = require("mongoose");
const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const userModel = new model("user", userSchema);
module.exports = { userModel };
