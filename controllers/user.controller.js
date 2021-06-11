const { User } = require("../models/user.model");

async function getUserFromDB(req, res, next) {
  try {
    const id = req.userId;
    const user = await User.findById(id).populate({
      path: "notes",
      model: "Note"
    })
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error retrieiving user from db",
      errorMessage: error.message,
    });
  }
}

function sendUser(req, res) {
  try {
    const { user } = req;
    if(user){
      user.password = undefined;
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error retrieiving user from db",
      errorMessage: error.message,
    });
  }
}

async function addNoteForUser(req, res) {
  try {
    const { noteId } = req.body;
    const { user } = req;
    user.notes.push(noteId);
    let savedUser = await user.save();
    res.status(200).json({ success: true, message: "Note added", savedUser });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error adding note",
      errorMessage: error.message,
    });
  }
}

async function removeNoteForUser(req, res) {
  try {
    const { noteId } = req.body;
    const { user } = req;
    user.notes.pull(noteId);
    const savedUser = await user.save();
    res.status(200).json({ success: true, message: "Note deleted", savedUser });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error removing note",
      errorMessage: error.message,
    });
  }
}

async function pinNote(req, res) {
  try {
    const { noteId } = req.body;
    const { user } = req;
    user.pinned.push(noteId);
    const savedUser = await user.save();
    res.status(200).json({ success: true, message: "Note pinned", savedUser });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error pinning note",
      errorMessage: error.message,
    });
  }
}

async function unpinNote(req, res) {
  try {
    const { noteId } = req.body;
    const { user } = req;
    user.pinned.pull(noteId);
    const savedUser = await user.save();
    res
      .status(200)
      .json({ success: true, message: "Note unpinned", savedUser });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error unpinning note",
      errorMessage: error.message,
    });
  }
}

async function addTag(req, res) {
  try {
    const { tagName } = req.body;
    const { user } = req;
    user.tags.push(tagName);
    const savedUser = await user.save();
    res.status(200).json({ success: true, message: "tag added", savedUser });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error adding tag",
      errorMessage: error.message,
    });
  }
}

async function removeTag(req, res) {
  try {
    const { tagName } = req.body;
    const { user } = req;
    user.tags.pull(tagName);
    const savedUser = await user.save();
    res.status(200).json({ success: true, message: "tag removed", savedUser });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error removing tag",
      errorMessage: error.message,
    });
  }
}

module.exports = {
  getUserFromDB,
  sendUser,
  addNoteForUser,
  removeNoteForUser,
  pinNote,
  unpinNote,
  addTag,
  removeTag
};
