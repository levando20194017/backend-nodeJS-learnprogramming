import progressService from '../services/progressService'
let handleGetProgress = async (req, res) => {
    let id = req.query.id; // ALL, id
    let name = req.query.name
    if (!id || !name) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters",
            progress: []
        })
    }
    let progress = await progressService.getProgressOfCourse(id, name);
    return res.status(200).json({
        errCode: 0,
        message: 'Ok',
        progress
    })
}
let handleCreateProgressOfCourse = async (req, res) => {
    let message = await progressService.createProgressOfCourse(req.body);
    console.log(message);
    return res.status(200).json(message)
}
module.exports = {
    handleGetProgress: handleGetProgress,
    handleCreateProgressOfCourse: handleCreateProgressOfCourse
}