import db from '../models/index'
let getAllLikes = (postID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let likes = await db.LikePosts.count({
                where: { postID: postID },
            });

            resolve(likes);
        } catch (e) {
            reject(e);
        }
    })
}
let createIsLiked = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isLiked = await db.LikePosts.findOne({
                where: { userID: data.userID }
            })
            if (isLiked) {
                await db.LikePosts.destroy({
                    where: { userID: data.userID }
                });
                resolve({
                    errCode: 0,
                    message: "not like"
                })
            } else {
                await db.LikePosts.create({
                    postID: data.postID,
                    userID: data.userID
                })
                resolve({
                    errCode: 0,
                    message: "liked this post",
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllLikes: getAllLikes,
    createIsLiked: createIsLiked,
}