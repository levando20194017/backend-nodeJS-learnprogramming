import db from '../models/index'
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);
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
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                //compare password
                let user = await db.User.findOne({
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.message = "Ok";
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = "Wrong password";
                    }

                } else {
                    userData.errCode = 2;
                    userData.message = `User is'nt found`

                }
            } else {
                //return error
                userData.errCode = 1;
                userData.message = `Your email is'nt exist in your system. Please try another email`;
                resolve(userData);

            }
            resolve(userData);
        } catch (e) {
            reject(e)
        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}
let checkUserPassword = (userId, userPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user && user.password === userPassword) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId == 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkEmail = await checkUserEmail(data.email);
            if (checkEmail === true) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already exist, please try another email'
                })
            } else {
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
                resolve({
                    errCode: 0,
                    message: "Ok",

                });
            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await db.User.destroy({
                    where: { id: userId }
                });
                resolve({
                    errCode: 0,
                    message: "User is deleted"
                })
            } else {
                resolve({
                    errCode: 2,
                    message: "User is'nt exist"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: "Missing required parameters!"
                })
            }

            let hashPasswordFormBcrypt = await hashUserPassword(data.password);
            let checkEmail = await checkUserEmail(data.email);
            if (checkEmail === false) {
                let user = await db.User.findOne({
                    where: { id: data.id },
                    raw: false
                });
                if (user) {
                    user.email = data.email || user.email
                    user.password = hashPasswordFormBcrypt || user.password
                    user.fullName = data.fullName || user.fullName
                    user.address = data.address || user.address
                    user.phoneNumber = data.phoneNumber || user.phoneNumber
                    user.img_url = data.img_url || user.img_url
                    user.gender = (data.gender === '1') ? true : false

                    await user.save();
                    resolve({
                        errCode: 0,
                        message: "Update user success!"
                    })
                } else {
                    resolve({
                        errCode: 1,
                        message: 'User not found!'
                    })
                }
            } else {
                resolve({
                    errCode: 3,
                    message: "Email is already exist"
                })
            }
        } catch (e) {
            reject(e);
        }
    });
};

let handleEditProfile = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: "Missing required parameters!"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            });
            if (user) {
                let checkEmail = await checkUserEmail(data.email);
                if (user.email === data.email || checkEmail === false) {
                    user.email = data.email || user.email
                    user.fullName = data.fullName || user.fullName
                    user.address = data.address || user.address
                    user.phoneNumber = data.phoneNumber || user.phoneNumber
                    user.img_url = data.img_url || user.img_url
                    user.gender = data.gender

                    await user.save();
                    resolve({
                        errCode: 0,
                        message: "Update user success!"
                    })
                } else {
                    resolve({
                        errCode: 3,
                        message: "Email is already exist"
                    })
                }
            } else {
                resolve({
                    errCode: 1,
                    message: 'User not found!'
                })
            }
        } catch (e) {
            reject(e);
        }
    });
};
let handleChangePassword = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: "Missing required parameters!"
                })
            }
            let hashNewPasswordFormBcrypt = await hashUserPassword(data.newPassword);
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            });
            if (user) {
                const isMatch = await bcrypt.compare(data.curPassword, user.password);
                if (isMatch) {
                    user.password = hashNewPasswordFormBcrypt
                    await user.save();
                    resolve({
                        errCode: 0,
                        message: "You have successfully changed your password!"
                    })
                } else {
                    resolve({
                        errCode: 1,
                        message: "You have entered the wrong current password!"
                    })
                }
            } else {
                resolve({
                    errCode: 3,
                    message: "User don't exist!"
                })
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    handleEditProfile: handleEditProfile,
    handleChangePassword: handleChangePassword
}