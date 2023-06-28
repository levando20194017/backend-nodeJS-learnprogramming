import db from '../models/index'
let getAllPosts = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let posts = '';
            if (userId == 'ALL') {
                posts = await db.Posts.findAll()
            }
            if (userId && userId !== 'ALL') {
                posts = await db.Posts.findAll({
                    where: { userID: userId },
                })
            }
            resolve(posts);
        } catch (e) {
            reject(e);
        }
    })
}
let createNewPost = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.userID) {
                await db.Posts.create({
                    userID: data.userID,
                    title: data.title,
                    content: data.content,
                    img_url: data.img_url,
                    date: data.date
                })
                resolve({
                    errCode: 0,
                    message: "Add new post success",
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "You need to login to perform this function",
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}
let deletePost = async (data) => {
    console.log(data);
    try {
        let post = await db.Posts.findOne({
            where: { id: data.postID }
        });
        if (post) {
            if (data.user.role === true || data.user.id === post.userID) {
                await db.Posts.destroy({
                    where: { id: data.postID }
                });
                return {
                    errCode: 0,
                    message: "Post is deleted"
                }
            } else {
                return {
                    errCode: 2,
                    message: "You don't have permission"
                }
            }
        } else {
            return {
                errCode: 3,
                message: "Post not found!"
            }
        }
    } catch (e) {
        throw e;
    }
}
let updatePostData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.postID || !data.user.id) {
                resolve({
                    errCode: 2,
                    message: "Missing required parameters!"
                })
            }
            let post = await db.Posts.findOne({
                where: { id: data.postID },
                raw: false
            });
            if (post) {
                if (data.user.role === true || data.user.id === post.userID) {
                    post.title = data.title || post.title
                    post.content = data.content || post.content
                    post.img_url = data.img_url || post.img_url
                    post.date = data.date || post.date

                    await post.save();
                    resolve({
                        errCode: 0,
                        message: "Update post success!"
                    })
                } else {
                    resolve({
                        errCode: 3,
                        message: "You don't have permission"
                    })
                }
            } else {
                resolve({
                    errCode: 1,
                    message: 'Post not found!'
                })
            }
        } catch (e) {
            reject(e);
        }
    });
}
module.exports = {
    getAllPosts: getAllPosts,
    createNewPost: createNewPost,
    deletePost: deletePost,
    updatePostData: updatePostData
}