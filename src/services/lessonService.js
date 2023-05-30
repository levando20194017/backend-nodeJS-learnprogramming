import db from '../models/index'
let getAllLessons = (courseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lessons = '';
            if (courseId == 'ALL') {
                lessons = await db.Lessons.findAll();
            }
            if (courseId && courseId !== 'ALL') {
                lessons = await db.Lessons.findAll({
                    where: { courseID: courseId },
                })
            }
            resolve(lessons);
        } catch (e) {
            reject(e);
        }
    })
}
let createNewLesson = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Lessons.create({
                courseID: data.courseID,
                title: data.title,
                description: data.description,
                orderBy: data.orderBy
            })
            resolve({
                errCode: 0,
                message: "Add new lesson success",
            });
        } catch (e) {
            reject(e)
        }
    })
}
let updateLessonData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: "Missing required parameters!"
                })
            }
            let lesson = await db.Lessons.findOne({
                where: { id: data.id },
                raw: false
            });
            if (lesson) {
                lesson.title = data.title || lesson.title
                lesson.description = data.description || lesson.description
                lesson.orderBy = data.orderBy || lesson.orderBy

                await lesson.save();
                resolve({
                    errCode: 0,
                    message: "Update lesson success!"
                })
            } else {
                resolve({
                    errCode: 1,
                    message: 'Lesson not found!'
                })
            }
        } catch (e) {
            reject(e);
        }
    });
};
let deleteLesson = (lessonId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lesson = db.Lessons.findOne({
                where: { id: lessonId }
            })
            if (lesson) {
                await db.Lessons.destroy({
                    where: { id: lessonId }
                });
                resolve({
                    errCode: 0,
                    message: "Lesson is deleted"
                })
            } else {
                resolve({
                    errCode: 2,
                    message: "Lesson is'nt exist"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    getAllLessons: getAllLessons,
    createNewLesson: createNewLesson,
    updateLessonData: updateLessonData,
    deleteLesson: deleteLesson
}