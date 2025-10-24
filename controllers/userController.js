const asyncHandler = require("express-async-handler")
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// @desc Register a user
// @route POST /api/users/register
// @access public

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body
    if(!username || !email || !password ) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const availableUser = await User.findOne({email})
    if(availableUser) {
        res.status(400)
        throw new Error("user already registered")
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    // console.log(hashedPassword)
    
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    })
    // console.log(`User created ${newUser}`)
    if (newUser) {
        res.status(201).json({_id:newUser.id,email:newUser.email})
    } else {
        res.status(400)
        throw new Error("User data is not valid")
    }
    res.status(200).json({message: "User registered"})
})

// @desc login a user
// @route POST /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {   
    const {email, password} = req.body
    if(!email || !password ) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({email})
    // compare password with hashed password
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id : user.id
            }
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
        )
        res.status(200).json({accessToken})
    } else {
        res.status(401)
        throw new Error("email or password is not valid")
    }
    res.status(200).json({message: "User logged in"})
})

// @desc get current user info
// @route GET /api/users/:id
// @access private

const currentUser = asyncHandler (async(req, res)=> {
    res.status(200).json(req.user) 
})


module.exports = { 
    registerUser, loginUser, currentUser
}