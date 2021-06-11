const { Note } = require("../models/note.model")

const { extend } = require("lodash")

async function createNote(req, res){
    try {
        const { noteData } = req.body
        noteData.userId = req.userId
        const newNote = await Note.create(noteData);
        const savedNote = await newNote.save()
        res.status(200).json({ success: true, message: "Note created", savedNote })
    } catch (error) {
        res.status(400).json({ success: false, message: "error creating note", errorMessage: error.message })
    }
}

async function getNoteFromParam(req, res, next, id){
    try {
        const note = await Note.findById(id)
        if(!note){
            res.status(400).json({ success: false, message: "error retrieving note" })
        }
        req.note = note
        next()
    } catch (error) {
        res.status(400).json({ success: false, message: "error retrieving note", errorMessage: error.message })
    }
}

function sendNoteDetails(req, res){
    const { note } = req
    res.status(200).json({ success: true, note })
}

async function updateNote(req, res){
    try {
        const { noteUpdate } = req.body
        let { note } = req
        note = extend(note, noteUpdate)
        note = await note.save()
        res.status(200).json({ success: true, message: "Note updated", note })
    } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "error updating note", errorMessage: error.message });
    }
}

async function deleteNote(req, res){
    try {
        const { noteId } = req.body
        const deletedNote = await Note.findByIdAndDelete(noteId)
        res.status(200).json({ success: true, message: "note deleted" })
    } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "error deleting note", errorMessage: error.message });
    }
}

module.exports = { createNote, getNoteFromParam, updateNote, deleteNote, sendNoteDetails }