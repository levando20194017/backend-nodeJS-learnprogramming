import db from '../models/index'
let getAllLikes = (postID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let likes = '';
            if (postID && postID !== 'ALL') {
                likes = await db.LikePosts.findAll({
                    where: { postID: postID },
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
            let isLiked = await db.LikePosts.findOne({
                where: { postID: data.postID, userID: data.userID }
            })
            console.log(isLiked);
            if (isLiked) {
                await db.LikePosts.destroy({
                    where: { postID: data.postID, userID: data.userID }
                });
                resolve({
                    errCode: 1,
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