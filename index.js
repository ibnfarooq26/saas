const express = require("express");
const { getTenantModel } = require("./adminDb");
const { getCustomerModel } = require("./tenantDb");

require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 4000;
const DB_BASE_URI = process.env.DB_BASE_URI;

app.use(express.json());
app.get("/createTenant", async (req, res) => {
  const { tenantName, password } = req.body;
  if (tenantName && password) {
    const tenantModel = await getTenantModel();
    const tenant = await tenantModel.findOne({ name: tenantName });
    if (!tenant) {
      const _tenant = await tenantModel.create({
        name: tenantName,
        password: password,
      });

      res.json({ _tenant });
    } else {
      res.send("tenant name already exists");
    }
  } else {
    res.send("invalid inputs");
  }
});

app.get("/createCustomer", async (req, res) => {
  const { tenantName, customerName, password, role } = req.body;
  if (tenantName && customerName && password && role) {
    const tenantModel = await getTenantModel();
    const tenant = await tenantModel.findOne({ name: tenantName });
    if (!tenant) {
      res.send("no such tenant");
      return;
    }

    const customerModel = await getCustomerModel(tenantName);

    const customer = await customerModel.findOne({ name: customerName });
    if (!customer) {
      const _customer = await customerModel.create({
        name: customerName,
        password: password,
        role: role,
      });

      res.json({ _customer });
    } else {
      res.send("customer name already exists");
    }
  } else res.send("invalid Inputs");
});

app.listen(PORT, () => {
  console.log("server is running at: ", PORT);
});
