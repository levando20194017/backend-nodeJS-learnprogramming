import lessonService from '../services/lessonService'
let handleGetAllLessons = async (req, res) => {
    let id = req.query.id; // ALL, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters",
            lesson: []
        })
    }
    let lessons = await lessonService.getAllLessons(id);
    return res.status(200).json({
        errCode: 0,
        message: 'Ok',
        lessons
    })
}
let handleCreateNewLesson = async (req, res) => {
    let message = await lessonService.createNewLesson(req.body);
    console.log(message);
    return res.status(200).json(message)
}
let handleEditLesson = async (req, res) => {
    let data = req.body;
    let message = await lessonService.updateLessonData(data)
    return res.status(200).json(message)
}
let handleDeleteLesson = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters!"
        })
    }
    let message = await lessonService.deleteLesson(req.body.id);
    return res.status(200).json(message)
}
module.exports = {
    handleGetAllLessons: handleGetAllLessons,
    handleCreateNewLesson: handleCreateNewLesson,
    handleEditLesson: handleEditLesson,
    handleDeleteLesson: handleDeleteLesson
}