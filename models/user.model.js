const mongoose = require("mongoose");

const { Schema } = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: "name is required"
    },
    username: {
        type: String,
        required: "username is required"
    },
    email: {
        type: String,
        required: "email is required"
    },
    password: {
        type: String,
        required: "password is required"
    },
    notes: [ { type: Schema.Types.ObjectId, ref: "Note" } ],
    pinned: [String],
    tags: [String]
}, { timestamps: true })

const User = mongoose.model("User", UserSchema)

module.exports = { User }