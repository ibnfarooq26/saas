const mongoose = require("mongoose");

const { Schema } = mongoose;
const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    // password: {
    //   type: String,
    // },
    password: {
      type: String,
      required: true,
      // validate: [isEmail, "must have valid email"],
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

//Creating Model
const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = { Customer, CustomerSchema };
