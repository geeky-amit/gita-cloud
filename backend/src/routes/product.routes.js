const { Router } = require("express");
const {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductById
} = require("../controllers/product.controllers");

const router = Router();

router.route("/createProduct").post(createProduct);
router.route("/getProduct").get(getProduct);
router.route("/getProduct/:id").get(getProductById);
router.route("/updateProduct/:id").patch(updateProduct);
router.route("/deleteProduct/:id").delete(deleteProduct);

module.exports = router;
