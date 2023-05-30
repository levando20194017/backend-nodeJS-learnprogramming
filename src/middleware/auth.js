export const auth = (req, res, next) => {
    // Kiểm tra xem user có đăng nhập hay không
    console.log(req.session.user);
    if (!req.session.user) {
        return res.status(401).json({
            message: "Bạn cần đăng nhập để thực hiện chức năng này",
        });
    }

    // Kiểm tra xem user có phải là admin hay không
    if (req.session.user.role == false) {
        return res.status(403).json({
            message: "Bạn không có quyền thực hiện chức năng này",
        });
    }

    // Nếu user đăng nhập và là admin, cho phép tiếp tục thực hiện
    next();
};