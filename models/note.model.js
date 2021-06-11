const mongoose = require("mongoose")

const { Schema } = mongoose

const NoteSchema = new Schema({
  title: {
    type: String,
    required: "title is required",
  },
  noteText: {
    type: String,
    required: "note text is required",
  },
  tag: {
    type: String,
    required: "tag is required",
  },
  bgColor: {
    type: String,
    required: "bgColor is required",
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

const Note = mongoose.model("Note", NoteSchema)

module.exports = { Note }