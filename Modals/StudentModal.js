const mongoose = require("mongoose")

const StudentSchema = mongoose.Schema({
    name: String,
    classId: { type: mongoose.Types.ObjectId, ref: "Class" }
})

const Student = new mongoose.model("students", StudentSchema)

module.exports = Student;