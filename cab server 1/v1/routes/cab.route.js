const router = require("express").Router();
const path = require("path");
const {
  addCab,
  deleteCab,
  getAllCabs,
  getOneCab,
  updateCab,
} = require("../controllers/cab.controller");
const validateCab = require("../helpers/middlewares/validation/cabValidation");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/cab");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("avatar"), validateCab, addCab);
router.put("/:id", upload.single("avatar"), updateCab);
router.delete("/:id", deleteCab);
router.get("/:id", getOneCab);
router.get("/", getAllCabs);

module.exports = router;
