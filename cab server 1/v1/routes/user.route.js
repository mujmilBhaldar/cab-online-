const router = require("express").Router();
const UserCtrl = require("../controllers/user.controller");
const authorize = require("../helpers/middlewares/authorize");

router.post("/", authorize(["admin"]), UserCtrl.createUser);
router.put("/:id", authorize(["admin"]), UserCtrl.updateUser);
router.delete("/:id", authorize(["admin"]), UserCtrl.deleteUser);
router.get(
  "/:id",
  authorize(["admin", "stockist", "manager"]),
  UserCtrl.getSingleUser
);
router.get("/", authorize(["admin"]), UserCtrl.getAllUser);

module.exports = router;
