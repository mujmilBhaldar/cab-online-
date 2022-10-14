const router = require("express").Router();
const CustomerCtrl = require("../controllers/customer.controller");
const authorize = require("../helpers/middlewares/authorize");
router.post("/", authorize(["admin", "customer"]), CustomerCtrl.createCustomer);
router.put(
  "/:id",
  authorize(["admin", "customer"]),
  CustomerCtrl.updateCustomer
);
router.delete("/:id", authorize(["admin"]), CustomerCtrl.deleteCustomer);
router.get(
  "/one",
  authorize(["admin", "customer"]),
  CustomerCtrl.getSingleCustomer
);
router.get("/", authorize(["admin"]), CustomerCtrl.getAllCustomers);

module.exports = router;
