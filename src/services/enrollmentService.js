import db from '../models/index'
let registerCourse = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.userID) {
                let isRegister = await db.Enrollments.findOne({
                    where: { userID: data.userID }
                })
                if (isRegister) {
                    resolve({
                        errCode: 1,
                        message: "You have already register this course"
                    })
                } else {
                    await db.Enrollments.create({
                        courseID: data.courseID,
                        userID: data.userID
                    })
                    resolve({
                        errCode: 0,
                        message: "register this course success",
                    });
                }
            } else {
                resolve({
                    errCode: 2,
                    message: "You need to login to perform this function",
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    registerCourse: registerCourse,
}