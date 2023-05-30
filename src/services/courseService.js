import db from '../models/index'
let getAllCourses = (courseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let courses = '';
            if (courseId == 'ALL') {
                courses = await db.Courses.findAll();
            }
            if (courseId && courseId !== 'ALL') {
                courses = await db.Courses.findOne({
                    where: { id: courseId },
                })
            }
            resolve(courses);
        } catch (e) {
            reject(e);
        }
    })
}
let createNewCourse = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Courses.create({
                title: data.title,
                description: data.description,
                img_url: data.img_url
            })
            resolve({
                errCode: 0,
                message: "Add new course success",
            });
        } catch (e) {
            reject(e)
        }
    })
}
let deleteCourse = (courseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let course = db.Courses.findOne({
                where: { id: courseId }
            })
            if (course) {
                await db.Courses.destroy({
                    where: { id: courseId }
                });
                resolve({
                    errCode: 0,
                    message: "Course is deleted"
                })
            } else {
                resolve({
                    errCode: 2,
                    message: "Course is'nt exist"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let updateCourseData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: "Missing required parameters!"
                })
            }
            let course = await db.Courses.findOne({
                where: { id: data.id },
                raw: false
            });
            if (course) {
                course.title = data.title || course.title
                course.description = data.description || course.description
                course.img_url = data.img_url || course.img_url

                await course.save();
                resolve({
                    errCode: 0,
                    message: "Update course success!"
                })
            } else {
                resolve({
                    errCode: 1,
                    message: 'Course not found!'
                })
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    getAllCourses: getAllCourses,
    createNewCourse: createNewCourse,
    deleteCourse: deleteCourse,
    updateCourseData: updateCourseData
}