const { Note } = require("../models/note.model");
const { User } = require("../models/user.model");

const { extend } = require("lodash");

async function createNote(req, res) {
  try {
    const { noteData } = req.body;
    noteData.userId = req.userId;
    const newNote = await Note.create(noteData);
    const savedNote = await newNote.save();
    const noteId = savedNote._id;
    const { user } = req;
    user.notes.push(noteId);
    let savedUser = await user.save();
    res
      .status(200)
      .json({ success: true, message: "Note added", noteId, savedUser });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "error creating note",
        errorMessage: error.message,
      });
  }
}

async function getNoteFromParam(req, res, next, id) {
  try {
    const note = await Note.findById(id);
    if (!note) {
      res
        .status(400)
        .json({ success: false, message: "error retrieving note" });
    }
    req.note = note;
    next();
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "error retrieving note",
        errorMessage: error.message,
      });
  }
}

function sendNoteDetails(req, res) {
  const { note } = req;
  res.status(200).json({ success: true, note });
}

async function updateNote(req, res) {
  try {
    const { noteUpdate } = req.body;
    let { note } = req;
    note = extend(note, noteUpdate);
    note = await note.save();
    res.status(200).json({ success: true, message: "Note updated", note });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "error updating note",
        errorMessage: error.message,
      });
  }
}

async function deleteNote(req, res) {
  try {
    const { noteId } = req.body;
    const deletedNote = await Note.findByIdAndDelete(noteId);
    const { user } = req;
    user.notes.pull(noteId);
    let savedUser = await user.save();
    res
      .status(200)
      .json({ success: true, message: "Note deleted", noteId });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "error deleting note",
        errorMessage: error.message,
      });
  }
}

async function pinNote(req, res) {
  try {
    const { note } = req;
    note.pinned = true;
    const savedNote = await note.save();
    const noteId = savedNote._id;
    res
      .status(200)
      .json({ success: true, message: "Note pinned", noteId });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "error pinning note",
        errorMessage: error.message,
      });
  }
}

async function unpinNote(req, res) {
  try {
    const { note } = req;
    note.pinned = false;
    const savedNote = await note.save();
    const noteId = savedNote._id;
    res
      .status(200)
      .json({ success: true, message: "Note unpinned", noteId });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error unpinning note",
      errorMessage: error.message,
    });
  }
}

module.exports = {
  createNote,
  getNoteFromParam,
  updateNote,
  deleteNote,
  sendNoteDetails,
  pinNote,
  unpinNote
};
