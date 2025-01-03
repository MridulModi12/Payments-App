const express = require('express')
const userRouter = express.Router()
const zod = require('zod')
const jwt = require('jsonwebtoken')
const { User } = require('../db')
const authMiddleware = require('../middleware')


const signUpSchema = zod.object({
    username: zod.string().email({message: "Invalid email address"}),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6).max(15)
})
const signInSchema = zod.object({
    username: zod.string().email({message: "Invalid email address"}),
    password: zod.string().min(6).max(15)
})
const updateSchema = zod.object({
    password: zod.string().optional().min(6).max(15),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})


userRouter.post('/signup', async (req, res) => {
    //doing zod validation
    const result = signUpSchema.safeParse(req.body)
    //handling incorrect inputs
    if(!result.success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    //handling already taken email case
    const existingUser = User.findOne({username: req.body.username})
    if(existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    //creating document for the user in 'User' model
    const userDoc = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })
    //signing and returning the jwt
    const userId = userDoc._id
    const token = jwt.sign({
        userId
    }, process.env.jwtSecret)

    res.status(200).json({
        message: "User created successfully",
        token: token
    });
})


userRouter.post('/signin', async (req, res) => {
    //zod validation
    const { success } = signInSchema.safeParse(req.body)
    if(!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const existingUser = User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    //returning jwt if user exists in db and his password is correct
    if(existingUser) {   
        const token = jwt.sign({
            userId: existingUser._id
        }, process.env.jwtSecret)

        return res.status(200).json({
            token: token
        })
    }
    
    res.status(411).json({
        message: "Error while logging in"
    })
})


userRouter.put('/', authMiddleware, async (req, res) => {
    const { success } = updateSchema.safeParse(req.body)
    if(!success) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    //updating with the help of the userId encoded in the token sent by the user, and decoded by authMiddleware
    await User.updateOne({_id: req.userId}, req.body)
    res.status(200).json({
        message: "Updated successfully"
    })
})


userRouter.get('/bulk', async (req, res) => {
    const filter = req.query.filter || ""
    const users = await User.find({
        $or: [{
            firstName: {"$regex": filter}
        },{
            lastName: {"$regex": filter}
        }]
    })
    res.status(200).json({
        users: users.map((user) => ({              //wrapping the object in () to avoid writing return, otherwise the curly braces would be interpreted as the braces we can put to show the body of a fn, in which case a return statement mus be given. We are avoiding it by putting () outsid of braces, so an implicit return us assumed by arrow fn
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = userRouter