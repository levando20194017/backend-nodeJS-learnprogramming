import db from '../models/index'
let getAllLikes = (commentID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let likes = await db.LikeComments.count({
                where: { commentID: commentID },
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
            let isLiked = await db.LikeComments.findOne({
                where: { userID: data.userID }
            })
            if (isLiked) {
                await db.LikeComments.destroy({
                    where: { userID: data.userID }
                });
                resolve({
                    errCode: 0,
                    message: "not like"
                })
            } else {
                await db.LikeComments.create({
                    commentID: data.commentID,
                    userID: data.userID
                })
                resolve({
                    errCode: 0,
                    message: "liked this comment",
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