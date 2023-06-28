import likePostService from '../services/likePostService'
let handleGetAllLikes = async (req, res) => {
    let id = req.query.id; // ALL, id
    //postID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters",
            like: []
        })
    }
    let likes = await likePostService.getAllLikes(id);
    return res.status(200).json({
        errCode: 0,
        message: 'Ok',
        likes
    })
}
let handleCreateIsLiked = async (req, res) => {
    let message = await likePostService.createIsLiked(req.body);
    console.log(message);
    return res.status(200).json({
        errCode: message.errCode,
        message: message.message
    })
}

module.exports = {
    handleGetAllLikes: handleGetAllLikes,
    handleCreateIsLiked: handleCreateIsLiked,
}