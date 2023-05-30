import videoService from '../services/videoService'
let handleGetAllVideos = async (req, res) => {
    let id = req.query.id; // ALL, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters",
            video: []
        })
    }
    let videos = await videoService.getAllVideos(id);
    return res.status(200).json({
        errCode: 0,
        message: 'Ok',
        videos
    })
}
let handleCreateNewVideo = async (req, res) => {
    let message = await videoService.createNewVideo(req.body);
    console.log(message);
    return res.status(200).json(message)
}
let handleEditVideo = async (req, res) => {
    let data = req.body;
    let message = await videoService.updateVideoData(data)
    return res.status(200).json(message)
}
let handleDeleteVideo = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters!"
        })
    }
    let message = await videoService.deleteVideo(req.body.id);
    return res.status(200).json(message)
}
module.exports = {
    handleGetAllVideos: handleGetAllVideos,
    handleCreateNewVideo: handleCreateNewVideo,
    handleEditVideo: handleEditVideo,
    handleDeleteVideo: handleDeleteVideo
}