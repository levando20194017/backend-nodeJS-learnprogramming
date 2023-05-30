import enrollmentService from '../services/enrollmentService'

let handleRegisterCourse = async (req, res) => {
    req.body.userID = req.session.user.id;
    let message = await enrollmentService.registerCourse(req.body);
    console.log(message);
    return res.status(200).json(message)
}

module.exports = {
    handleRegisterCourse: handleRegisterCourse
}