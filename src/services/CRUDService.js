import bcrypt from 'bcryptjs'
import db from '../models/index'

const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFormBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFormBcrypt,
                fullName: data.fullName,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                phoneNumber: data.phoneNumber,
                img_url: data.gender === '1' ? 'https://cdn2.iconfinder.com/data/icons/flat-style-svg-icons-part-1/512/user_man_male_profile_account-512.png' : 'https://cdn2.iconfinder.com/data/icons/peppyicons/512/women_blue-512.png',
                role: false
            })
            resolve('Create a new user succeed!');
        } catch (e) {
            reject(e);
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}
let getAllUsers = () => {
    return new Promise((resolve, reject) => {
        try {
            let users = db.User.findAll();
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}
let getUserInfoById = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            let user = db.User.findOne({
                where: { id: userId },
                raw: true,
            });
            if (user) {
                resolve(user);
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e);
        }
    })
}
let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.email = data.email;
                user.fullName = data.fullName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gener = data.gender === '1' ? true : false;
                await user.save();

                let allUser = db.User.findAll();
                resolve(allUser);
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    })
    // console.log(data);
}
let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            })
            await user.destroy();
            let allUser = await db.User.findAll();
            resolve(allUser);
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserInfoById: getUserInfoById,
    editUser: editUser,
    deleteUser: deleteUser,
}