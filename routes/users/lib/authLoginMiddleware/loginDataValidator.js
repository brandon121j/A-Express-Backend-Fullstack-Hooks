const { isEmail } = require('validator');

function loginDataValidator(req, res, next) {
    const { email } = req.body
    let errObj = {}

    if (!isEmail(email)) {
        errObj.email = "Please enter a valid email"
    }

    if (Object.keys(errObj).length > 0) {
        return res.status(500).json({
            message: "ERROR",
            error: errObj
        })
    } else {
        next()
    }
}

module.exports = { loginDataValidator }