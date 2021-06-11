const express = require("express")

const router = express.Router()

const { isAuthenticated } = require("../middlewares/isAuthenticated.middleware")

const { createNote, getNoteFromParam, updateNote, deleteNote, sendNoteDetails } = require("../controllers/note.controller")

router.use(isAuthenticated)

router.route("/create").post(createNote)
router.param("noteId", getNoteFromParam)
router.route("/:noteId").get(sendNoteDetails)
router.route("/:noteId/update").post(updateNote)
router.route("/delete").post(deleteNote)

module.exports = router