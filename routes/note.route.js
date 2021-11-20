const express = require("express");

const router = express.Router();

const {
  isAuthenticated,
} = require("../middlewares/isAuthenticated.middleware");

const {
  createNote,
  getNoteFromParam,
  updateNote,
  deleteNote,
  sendNoteDetails,
  pinNote,
  unpinNote,
} = require("../controllers/note.controller");

const { getUserFromDB } = require("../controllers/user.controller")

router.use(isAuthenticated);
router.use(getUserFromDB);

router.route("/create").post(createNote);
router.param("noteId", getNoteFromParam);
router.route("/:noteId").get(sendNoteDetails);
router.route("/:noteId/pin").get(pinNote);
router.route("/:noteId/unpin").get(unpinNote);
router.route("/:noteId/update").post(updateNote);
router.route("/delete").post(deleteNote);

module.exports = router;
