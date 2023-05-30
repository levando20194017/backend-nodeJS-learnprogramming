import courseService from '../services/courseService'
let handleGetAllCourses = async (req, res) => {
    let id = req.query.id; // ALL, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters",
            course: []
        })
    }
    let courses = await courseService.getAllCourses(id);
    return res.status(200).json({
        errCode: 0,
        message: 'Ok',
        courses
    })
}
let handleCreateNewCourse = async (req, res) => {
    let message = await courseService.createNewCourse(req.body);
    console.log(message);
    return res.status(200).json(message)
}
let handleDeleteCourse = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters!"
        })
    }
    let message = await courseService.deleteCourse(req.body.id);
    return res.status(200).json(message)
}
let handleEditCourse = async (req, res) => {
    let data = req.body;
    let message = await courseService.updateCourseData(data)
    return res.status(200).json(message)
}
module.exports = {
    handleGetAllCourses: handleGetAllCourses,
    handleCreateNewCourse: handleCreateNewCourse,
    handleDeleteCourse: handleDeleteCourse,
    handleEditCourse: handleEditCourse
}