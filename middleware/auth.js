
exports.authenticate = (req, res, next) => {
    console.log("auth token");
    if (req.originalUrl.indexOf("/v1/") > -1) {
        if (!req.token) {
            const message = 'auth_request_required_front_error1'
            return res.status(405).json({ success: false, message });
        }
        else {
            next();
        }
    }
}
