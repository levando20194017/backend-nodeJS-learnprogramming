import enrollmentService from '../services/enrollmentService'

let handleRegisterCourse = async (req, res) => {
    let message = await enrollmentService.registerCourse(req.body);
    console.log(message);
    return res.status(200).json(message)
}
let handleGetAllUsersRegisterCourse = async (req, res) => {
    let id = req.query.id; // ALL, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters",
            course: []
        })
    }
    let usersOfRegister = await enrollmentService.getUsersRegisterCourse(id);
    return res.status(200).json({
        errCode: 0,
        message: 'Ok',
        usersOfRegister
    })
}

module.exports = {
    handleRegisterCourse: handleRegisterCourse,
    handleGetAllUsersRegisterCourse: handleGetAllUsersRegisterCourse
}