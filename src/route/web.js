import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import courseController from "../controller/courseController";
import lessonController from "../controller/lessonController";
import videoController from "../controller/videoController";
import postController from "../controller/postController";
import commentController from "../controller/commentController";
import likePostController from "../controller/likePostController";
import likeCommentController from "../controller/likeCommentController";
import enrollmentController from "../controller/enrollmentController";
import progressController from "../controller/progressController"
import { auth } from "../middleware/auth";

// const auth = (req, res, next) => {
//     // Kiểm tra xem user có đăng nhập hay không
//     console.log(req.session.user);
//     if (!req.session.user) {
//         return res.status(401).json({
//             message: "Bạn cần đăng nhập để thực hiện chức năng này",
//         });
//     }

//     // Kiểm tra xem user có phải là admin hay không
//     if (req.session.user.role == false) {
//         return res.status(403).json({
//             message: "Bạn không có quyền thực hiện chức năng này",
//         });
//     }

//     // Nếu user đăng nhập và là admin, cho phép tiếp tục thực hiện
//     next();
// };
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/about', homeController.getAboutpage)
    router.get('/crud', homeController.getCRUD)
    router.get('/get-crud', homeController.displayGetCRUD);
    router.post('/post-crud', homeController.postCRUD)
    router.get('/edit-crud', homeController.displayEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/login', userController.handleLogin)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.put('/api/edit-profile', userController.handleEditInfor)
    router.put('/api/user-changepassword', userController.userChangePassword)
    router.delete('/api/delete-user', auth, userController.handleDeleteUser)

    router.get('/api/get-all-courses', courseController.handleGetAllCourses)
    router.post('/api/create-new-course', auth, courseController.handleCreateNewCourse)
    router.delete('/api/delete-course', auth, courseController.handleDeleteCourse)
    router.put('/api/edit-course', auth, courseController.handleEditCourse)

    router.get('/api/get-all-lessons', lessonController.handleGetAllLessons)
    router.post('/api/create-new-lesson', auth, lessonController.handleCreateNewLesson)
    router.put('/api/edit-lesson', auth, lessonController.handleEditLesson)
    router.delete('/api/delete-lesson', auth, lessonController.handleDeleteLesson)

    router.get('/api/get-all-videos', videoController.handleGetAllVideos)
    router.post('/api/create-new-video', auth, videoController.handleCreateNewVideo)
    router.put('/api/edit-video', auth, videoController.handleEditVideo)
    router.delete('/api/delete-video', auth, videoController.handleDeleteVideo)

    router.get('/api/get-all-posts', postController.handleGetAllPosts)
    router.post('/api/post/add', postController.handleCreateNewPost)
    router.delete('/api/post/delete', postController.handleDeletePost)
    router.put('/api/post/edit', postController.handleEditPost)

    router.get('/api/get-all-comments', commentController.handleGetAllComments)
    router.post('/api/comment/add', commentController.handleCreateNewComment)
    router.delete('/api/comment/delete', commentController.handleDeleteComment)
    router.put('/api/comment/edit', commentController.handleEditComment)

    router.get('/api/post/get-all-likes', likePostController.handleGetAllLikes)
    router.post('/api/post/isliked', likePostController.handleCreateIsLiked)

    router.get('/api/comment/get-all-likes', likeCommentController.handleGetAllLikes)
    router.post('/api/comment/isliked', likeCommentController.handleCreateIsLiked)

    router.post('/api/course/register', enrollmentController.handleRegisterCourse)
    router.get('/api/get-all-usersRegisterCourse', enrollmentController.handleGetAllUsersRegisterCourse)

    router.post('/api/progress/create-progress-course', progressController.handleCreateProgressOfCourse)
    router.get('/api/progress/get-progress-course', progressController.handleGetProgress)
    return app.use("/", router)
}

module.exports = initWebRoutes;