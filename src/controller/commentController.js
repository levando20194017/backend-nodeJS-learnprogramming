import commentService from '../services/commentService'
let handleGetAllComments = async (req, res) => {
    let id = req.query.id; // ALL, id
    //id của bài viết
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters",
            comment: []
        })
    }
    let comments = await commentService.getAllComments(id);
    return res.status(200).json({
        errCode: 0,
        message: 'Ok',
        comments
    })
}
let handleCreateNewComment = async (req, res) => {
    let message = await commentService.createNewComment(req.body);
    console.log(message);
    return res.status(200).json(message)
}
let handleDeleteComment = async (req, res) => {
    let data = req.body;
    let message = await commentService.deleteComment(data);
    return res.status(200).json(message)
}
let handleEditComment = async (req, res) => {
    let data = req.body;
    let message = await commentService.updateCommentData(data)
    return res.status(200).json(message)
}
module.exports = {
    handleGetAllComments: handleGetAllComments,
    handleCreateNewComment: handleCreateNewComment,
    handleDeleteComment: handleDeleteComment,
    handleEditComment: handleEditComment
}