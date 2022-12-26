const mongoose = require("mongoose")

const ClassSchema = mongoose.Schema({
    StudentCount: Number
})

const Class = new mongoose.model("Class", ClassSchema)

module.exports = Class;