const mongoose = require("mongoose");

const { Schema } = mongoose;
const TenantSchema = new Schema(
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
  },
  { timestamps: true }
);

//Creating Model
const Tenant = mongoose.model("Tenant", TenantSchema);

module.exports = { Tenant, TenantSchema };
