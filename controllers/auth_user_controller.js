const { default: mongoose } = require("mongoose");
const User = require('../models/user_model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { request } = require("express")

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

        const user = new User({
            username,
            email,
            password: await bcrypt.hash(password, 10),
            roles: roles || ['user'],
            business,
            img
        })

        await user.save()

        return res.status(200).send({ message: "User created successfully", user })

    } catch (error) {
        res.status(500).send({message: "Signup failed, some error occured", error})
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: "User Not found." })
        }

        const passwordIsValid = bcrypt.compare(
            req.body.password,
            user.password
        )

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Login Credentials"
            })
        }

        const access_token = jwt.sign(
            { user_id: user._id, user_email: user.email },
            process.env.JWT_SECRET_KEY,
            {
                algorithm: 'HS256',
                expiresIn: "5h"
            })

        res.status(200).send({ id: user._id, email: user.email, token: access_token })

    } catch (err) {
        res.status(500).send("Login failed")
    }
}

