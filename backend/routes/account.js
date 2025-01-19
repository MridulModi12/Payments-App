const express = require('express')
const authMiddleware = require('../middleware')
const { Account } = require('../db')
const accountRouter = express.Router()
const zod = require('zod')
const mongoose = require('mongoose')

const transferBodySchema = zod.object({
  to: zod.string(),
  amount: zod.number().positive().finite()
})

accountRouter.get('/balance', authMiddleware, async (req, res) => {
  const user_account = await Account.findOne({
    userId: req.userId    
  })
  res.status(200).json({
    balance: user_account.balance
  })
})

accountRouter.post('/transfer', authMiddleware, async (req, res) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    
    //zod validation of req body
    const { success } = transferBodySchema.safeParse(req.body)  
    if(!success) {
      return res.status(400).json({ message: "Invalid account id or amount" })
    }

    const { to, amount } = req.body
    
    //checking if user whom to transfer exists
    const toUserAccount = await Account.findOne({ userId: to }).session(session)
    if(!toUserAccount) {
      return res.status(400).json({ message: "Invalid account" })
    }

    //checking for sufficient balance of user transferring
    const fromUserAccount = await Account.findOne({ userId: req.userId }).session(session)
    if(!fromUserAccount || fromUserAccount.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" })
    }
    
    //decreasing sender's balance
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session)

    //increasing receiver's balance
    await Account.updateOne({ userId: to },{ $inc: { balance: amount } }).session(session)

    await session.commitTransaction()
    res.status(200).json({ message: "Transfer successful" })
  }
  catch(err) {
    if(session.inTransaction()) {
      await session.abortTransaction()
    }
    console.error("Transaction failed: ", err)
    return res.status(500).json({
      message: "Transaction failed due to a technical issue. Please try again later."
    })
  } finally {
    await session.endSession()
  }
})

module.exports = accountRouter


//Testing concurrent transactions:-

// async function transfer(req) {
//   try {
//     const session = await mongoose.startSession()
//     session.startTransaction()
//     const { to, amount } = req.body
//     //zod validation of req body
//     const { success } = transferBodySchema.safeParse(req.body)
//     if(!success) {
//       console.log("Invalid account id or amount")
//       return
//     }

//     //checking for sufficient balance
//     const fromUserAccount = await Account.findOne({ userId: req.userId }).session(session)
//     if(!fromUserAccount.balance || fromUserAccount.balance < amount) {
//       await session.abortTransaction()
//       console.log("Insufficient balance")
//       return
//     }
    
//     //decreasing sender's balance
//     await Account.updateOne({
//       userId: req.userId
//     },{
//       $inc: { balance: -amount }
//     }).session(session)

//     //increasing receiver's balance
//     await Account.updateOne({
//       userId: to
//     },{
//       $inc: { balance: amount }
//     }).session(session)

//     await session.commitTransaction()
//     console.log("done")
//   } 
//   catch(err) {
//     console.log("Transaction failed! Please try again.")
//   }
// }

// transfer({
//   userId: "65ac44e10ab2ec750ca666a5",
//   body: {
//     to: "65ac44e40ab2ec750ca666aa",
//     amount: 100
//   }
// })

// transfer({
//   userId: "65ac44e10ab2ec750ca666a5",
//   body: {
//     to: "65ac44e40ab2ec750ca666aa",
//     amount: 100
//   }
// })
