const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/Users');

async function createUser(req, res) {
    const { firstName, lastName, email, username, password } = req.body;
    try {
        let salt = await bcrypt.genSalt(10);
        let hashed = await bcrypt.hash(password, salt);
        const createdUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashed
        });
        let savedUser = await createdUser.save();
        res.json({ message: "SUCCESS", savedUser })
    } catch(e) {
        console.log(e)
    }
}

const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        let foundUser = await User.findOne({ email: email });

        if (!foundUser) {
            return res.status(500).json({
                message: "ERROR",
                error: "Invalid login credentials"
            });
        } else {
            let comparedPassword = await bcrypt.compare(password, foundUser.password);

            if (!comparedPassword) {
                return res.status(500).json({
                    message: "ERROR",
                    error: "Invalid login credentials"
                });
            } else {
                let jwtToken = jwt.sign(
                    {
                        email: foundUser.email,
                        username: foundUser.username
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "24h"}
                );

                res.json({ message: "SUCCESS", payload: jwtToken })
            }
        } 
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    createUser,
    login
}