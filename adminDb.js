const { dbConnect } = require("./dbConnect");
const mongoose = require("mongoose");
require("dotenv").config();
const { TenantSchema } = require("./models/Tenants");
const url = `${process.env.DB_BASE_URI}/adminDb`;
let db;

// const tenantModel = mongoose.model("tenants", tenantSchema);

const getDb = async () => {
  return db ? db : await dbConnect(url);
};

const getTenantModel = async () => {
  const adminDb = await getDb();
  return adminDb.model("tenants", TenantSchema);
};

module.exports = {
  getTenantModel,
};
