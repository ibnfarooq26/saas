const { dbConnect } = require("./dbConnect");
const mongoose = require("mongoose");
const { CustomerSchema } = require("./models/Customer");
const url = process.env.DB_BASE_URI;
let db;

// const Customer = mongoose.model("Customer", CustomerSchema);

const getTenantDB = async (tenantId) => {
  const dbName = `tenant-${tenantId}`;
  db = db ? db : await dbConnect(url);
  let tenantDb = db.useDb(dbName, { useCache: true });
  return tenantDb;
};

const getCustomerModel = async (tenantId) => {
  const tenantDb = await getTenantDB(tenantId);
  return tenantDb.model("Customer", CustomerSchema);
};

module.exports = {
  getCustomerModel,
};
