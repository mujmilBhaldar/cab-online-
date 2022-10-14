const router = require("express").Router();
const {
  userLogin,
  validateToken,
  validateCustomerByMobile,
  passwordResetLink,
} = require("../controllers/auth.controller");
router.post("/", userLogin);
router.post("/validate-token", validateToken);
router.post("/password-reset", passwordResetLink);

module.exports = router;
