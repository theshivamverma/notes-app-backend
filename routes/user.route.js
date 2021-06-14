const express = require("express");
const router = express.Router();

const {
  isAuthenticated,
} = require("../middlewares/isAuthenticated.middleware");
const {
  getUserFromDB,
  sendUser,
  addTag,
  removeTag,
} = require("../controllers/user.controller");

router.use(isAuthenticated);

router.use(getUserFromDB);

router.route("/userdetail").get(sendUser);
router.route("/add-tag").post(addTag);
router.route("/remove-tag").post(removeTag);

module.exports = router
