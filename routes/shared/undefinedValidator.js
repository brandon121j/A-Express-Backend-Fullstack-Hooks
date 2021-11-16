function undefinedValidator(req, res, next) {
    let body = req.body;

    if (Object.keys(body).length === 0 || body === undefined) {
        return res.status(500).json({
            message: "FAILURE",
            error: "Please complete form"
        })
    } else {
        next();
    }
}

module.exports = { undefinedValidator }