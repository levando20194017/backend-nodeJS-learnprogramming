import db from '../models/index'
let getAllLikes = (commentID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let likes = '';
            if (commentID && commentID !== 'ALL') {
                likes = await db.LikeComments.findAll({
                    where: { commentID: commentID },
                });
                resolve(likes);
            }
        } catch (e) {
            reject(e);
        }
    })
}
let createIsLiked = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isLiked = await db.LikeComments.findOne({
                where: { commentID: data.commentID, userID: data.userID }
            })
            if (isLiked) {
                await db.LikeComments.destroy({
                    where: { commentID: data.commentID, userID: data.userID }
                });
                resolve({
                    errCode: 1,
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