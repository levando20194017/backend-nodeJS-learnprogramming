import userService from '../services/userService';
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    //check email exist
    //check password
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
    let userData = await userService.handleUserLogin(email, password);
    if (userData.errCode === 0) {
        req.session.user = userData.user;
        // console.log(req.session.user)
    }
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })
}
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; // ALL, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters",
            user: []
        })
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        message: 'Ok',
        users
    })
}
let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message)
}
let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data)
    return res.status(200).json(message)
}

let handleEditInfor = async (req, res) => {
    let data = req.body;
    let userData = await userService.handleEditProfile(data)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message
    })
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters!"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message)
}
let userChangePassword = async (req, res) => {
    let data = req.body;
    let userData = await userService.handleChangePassword(data)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message
    })
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    handleEditInfor: handleEditInfor,
    userChangePassword: userChangePassword
}