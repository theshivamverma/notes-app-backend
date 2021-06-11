const express = require("express");
const router = express.Router();

const {
  isAuthenticated,
} = require("../middlewares/isAuthenticated.middleware");
const {
  getUserFromDB,
  sendUser,
  addNoteForUser,
  removeNoteForUser,
  pinNote,
  unpinNote,
  addTag,
  removeTag,
} = require("../controllers/user.controller");

router.use(isAuthenticated);

router.use(getUserFromDB);

router.route("/userdetail").get(sendUser);
router.route("/add-new-note").post(addNoteForUser);
router.route("/remove-note").post(removeNoteForUser);
router.route("/pin-note").post(pinNote);
router.route("/unpin-note").post(unpinNote);
router.route("/add-tag").post(addTag);
router.route("/remove-tag").post(removeTag);

module.exports = router
