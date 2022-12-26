const router = require("express").Router()
const Class = require("../Modals/ClassModal")
const Student = require("../Modals/StudentModal")

// Test Case 1 - Create a new Classs
router.post("/v1/myClass", async (req, res) => {
    try {

        const newClass = new Class({ StudentCount: req.body.StudentCount })
        await newClass.save()
        res.status(201).json(newClass)
    } catch (error) {
        res.status(500).json("error")
    }
})

// Test Case 2 - Register a new student to class
router.post("/v1/myClass/:myClassId/students", async (req, res) => {
    try {
        const { myClassId } = req.params
        console.log(myClassId);
        const newStudent = new Student({
            name: req.body.name,
            classId: myClassId
        })
        await newStudent.save()
        res.status(201).json({ studentId: newStudent._id })
    } catch (error) {
        res.status(500).json("error")
    }
})

// Test Case 3 - List out all classes
router.get("/v1/myClass", async (req, res) => {
    try {
        const allClasses = await Class.find()
        res.status(200).json({ classes: allClasses })
    } catch (error) {
        res.status(500).json("error")
    }
})

// Test Case 4 - Get a specific class
router.get("/v1/myClass/:myClassId", async (req, res) => {
    try {
        const { myClassId } = req.params
        const getClass = await Class.find({ _id: myClassId })
        res.status(200).json(getClass)
    } catch (error) {
        res.status(404).json({
            error: "There is no class at that id"
        }
        )
    }
})

// Test Case 5 - Get all students in a specific class
router.get("/v1/myClass/:myClassId/students", async (req, res) => {
    try {
        const { myClassId } = req.params
        const StudentsById = await Student.find({ classId: myClassId })
        res.status(200).json(StudentsById)
    } catch (error) {
        res.status(404).json({
            error: "There are no students at this class"
        }
        )
    }
})

// Test Case 6 - Get one student details
router.get("/v1/myClass/:myClassId/students/:studentId", async (req, res) => {
    try {
        const { myClassId, studentId } = req.params
        const student = await Student.find({
            $and: [
                { _id: { $eq: studentId } },
                { classId: { $eq: myClassId } }
            ]
        })
        if (student.length) {
            return res.status(200).json(student)
        } else {
            res.status(404).json({
                error: "There are no students at this class"
            }
            )
        }

    } catch (error) {
        res.status(404).json({
            error: "There are no students at this class"
        }
        )
    }
})

// Test Case 7 - update student information
router.put("/v1/myClass/:myClassId/students/:studentId", async (req, res) => {
    try {
        const { myClassId, studentId } = req.params
        const student = await Student.findOneAndUpdate({ _id: studentId }, { name: req.body.name })
        res.status(204).json()
    } catch (error) {
        res.status(404).json({
            error: "There are no students at this class"
        }
        )
    }
})

//Test Case 8 - Delete a specified class 
router.delete("/v1/myClass/:myClassId", async (req, res) => {
    try {
        const { myClassId } = req.params
        const deleteStuents = await Student.deleteMany({ classId: myClassId })
        const deleted = await Class.deleteOne({ _id: myClassId })
        if (deleted.deletedCount) {
            return res.status(204).json()
        } else {

            res.status(404).json({
                error: "There is no task at that id"
            }
            )
        }
    } catch (error) {
        res.status(404).json({
            error: "There is no task at that id"
        }
        )
    }
})


// Test Case 9 - Delete a student
router.delete("/v1/myClass/:myClassId/students/:studentId", async (req, res) => {
    try {
        const { myClassId, studentId } = req.params
        console.log(myClassId, studentId);
        const student = await Student.deleteOne({
            $and: [
                { _id: { $eq: studentId } },
                { classId: { $eq: myClassId } }
            ]
        })
        if (student.deletedCount) {
            return res.status(204).json()
        } else {

            res.status(404).json({
                error: "There is no task at that id"
            }
            )
        }
    } catch (error) {
        res.status(404).json({
            error: "There is no task at that id"
        }
        )
    }
})


module.exports = router