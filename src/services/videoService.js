import db from '../models/index'
const ytdl = require('ytdl-core');

let getAllVideos = (lessonId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let videos = '';
            if (lessonId == 'ALL') {
                videos = await db.Videos.findAll();
            }
            if (lessonId && lessonId !== 'ALL') {
                videos = await db.Videos.findAll({
                    where: { lessonID: lessonId },
                })
            }
            resolve(videos);
        } catch (e) {
            reject(e);
        }
    })
}
let createNewVideo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Videos.create({
                lessonID: data.lessonID,
                title: data.title,
                description: data.description,
                video_url: data.video_url,
                orderBy: data.orderBy
            })
            resolve({
                errCode: 0,
                message: "Add new video success",
            });
        } catch (e) {
            reject(e)
        }
    })
}
let updateVideoData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: "Missing required parameters!"
                })
            }
            let video = await db.Videos.findOne({
                where: { id: data.id },
                raw: false
            });
            if (video) {
                video.title = data.title || video.title
                video.description = data.description || video.description
                video.video_url = data.video_url || video.video_url
                video.orderBy = data.orderBy || video.orderBy

                await video.save();
                resolve({
                    errCode: 0,
                    message: "Update video success!"
                })
            } else {
                resolve({
                    errCode: 1,
                    message: 'Video not found!'
                })
            }
        } catch (e) {
            reject(e);
        }
    });
};
let deleteVideo = (videoId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let video = db.Videos.findOne({
                where: { id: videoId }
            })
            if (video) {
                await db.Videos.destroy({
                    where: { id: videoId }
                });
                resolve({
                    errCode: 0,
                    message: "Video is deleted"
                })
            } else {
                resolve({
                    errCode: 2,
                    message: "Video is'nt exist"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    getAllVideos: getAllVideos,
    createNewVideo: createNewVideo,
    updateVideoData: updateVideoData,
    deleteVideo: deleteVideo
}