import db from '../models/index'
let getProgressOfCourse = (userID, courseID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let progress = '';
            if (courseID && userID) {
                progress = await db.Progresses.findAll({
                    where: { courseID: courseID, userID: userID },
                })
            }
            resolve(progress);
        } catch (e) {
            reject(e);
        }
    })
}
let createProgressOfCourse = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.userID && data.courseID && data.videoID) {
                let isCompletedVideo = await db.Progresses.findOne({
                    where: { courseID: data.courseID, userID: data.userID, videoID: data.videoID }
                })
                if (isCompletedVideo) {
                    resolve({
                        errCode: 2,
                        message: "You have finished learning the video already",
                    });
                } else {
                    await db.Progresses.create({
                        userID: data.userID,
                        courseID: data.courseID,
                        videoID: data.videoID,
                        completionPercentage: data.completionPercent,
                        total_time: data.totalTime,
                        completed_time: data.completed_time
                    })
                    resolve({
                        errCode: 0,
                        message: "Finished learning the video",
                    });
                }
            } else {
                resolve({
                    errCode: 1,
                    message: "Missing required paramater",
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getProgressOfCourse: getProgressOfCourse,
    createProgressOfCourse: createProgressOfCourse,
}