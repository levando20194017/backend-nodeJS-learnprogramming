import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        // console.log(data);
        return res.render("homePage.ejs", {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e);
    }
}
let getAboutpage = (req, res) => {
    return res.render("test/about.ejs")
}
let getCRUD = (req, res) => {
    return res.render("crud.ejs")
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    return res.render("displayCRUD.ejs", {
        data: data
    })
}
let displayEditCRUD = async (req, res) => {
    let userID = req.query.id;
    if (userID) {
        let user = await CRUDService.getUserInfoById(userID);
        return res.render("displayEditCRUD.ejs", {
            user: user
        })
    } else {
        return res.send("user not found");
    }
}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('hello')
}
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDService.editUser(data);
    return res.render("displayCRUD.ejs", {
        data: allUser
    })
}
let deleteCRUD = async (req, res) => {
    let userID = req.query.id;
    if (userID) {
        let allUser = await CRUDService.deleteUser(userID)
        return res.render("displayCRUD.ejs", {
            data: allUser
        })
    }
}
module.exports = {
    getHomePage: getHomePage,
    getAboutpage: getAboutpage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    displayEditCRUD: displayEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}