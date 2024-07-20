const { default: mongoose } = require("mongoose");
const User = require('../models/user_model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



exports.signup = async (req, res) => {
    const { username, email, password, roles, business,img } = req.body

    try {
        if (!(email && password && username)) {
            return res.status(400).send("User registration failed. Try Again")
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }

        // const salt = await bcrypt.genSalt(4);
        // const pwd = await bcrypt.hash(password, salt)
        console.log(password)
        const user = new User({
            username,
            email,
            password: password,
            roles: roles || ['user'],
            business,
            img
        })

        console.log(user)
        await user.save()

        return res.status(200).send({ message: "User created successfully", user })

    } catch (error) {
        res.status(500).send({message: "Signup failed, some error occured", error})
    }
}

exports.login = async (req, res) => {
    try {
        const { password, email} = req.body

        if (!(email && password)) {
            return res.status(400).send({message: "All inputs are required"});
        }

        const user = await User.findOne({ email });
         console.log(user)
        if (!user) {
            return res.status(404).send({ message: "User Not found." })
        }
        // const hashPass = /^\$2y\$/.test(user.password) ? '$2a$' + user.password.slice(4) : user.password;
        console.log(password, user.password)

        // const passwordIsValid = await bcrypt.compare(
        //     password,
        //     hashPass
        // )

        // if (!passwordIsValid) {
        //     return res.status(401).send({
        //         accessToken: null,
        //         message: "Invalid Login Credentials"
        //     })
        // }

        if(password == user.password){
            return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Login Credentials"
                    })
        }

        const access_token = jwt.sign(
            { user_id: user._id, user: user.username },
            process.env.JWT_SECRET_KEY,
            {
                algorithm: 'HS256',
                expiresIn: "5h"
            })

        res.status(200).send({ id: user._id, user: user.username, token: access_token })

    } catch (err) {
        res.status(500).send("Login failed")
    }
}