import express from 'express'
import mongoose from 'mongoose'
import { authMiddleware } from '../middleware.js'
import { Account, User } from '../db.js'

const accountRouter = express.Router()

accountRouter.get('/balance', authMiddleware, async (req, res)=>{
  try {
    const account = await Account.findOne({
      accountId: req.userId
    })
    res.status(200).json({balance: account.balance})
  } catch (e) {
    return res.send(e.message)
  }
})


/*
{
  id,
  amount
}
*/
accountRouter.post('/transfer', authMiddleware, async (req, res)=>{
  const session = await mongoose.startSession()
  session.startTransaction()
  const { recieverId, amount } = req.body
  
  
  const senderId = req.userId
  if(senderId === recieverId){
    return res.json({msg: 'sender and reciever are same.'})
  }
  try {
    const recieverAccount = await Account.findOne({
      accountId: recieverId
    })
    if(!recieverAccount){
      return res.json({msg: 'No reciever found!'})
    }
    const userAccount = await Account.findOne({
      accountId: senderId
    })
    if(userAccount.balance < amount){
      await session.abortTransaction()
      return res.json({msg: 'low balance!'})
    }
    console.log(typeof(userAccount.balance));
    await Account.findOneAndUpdate({accountId: senderId}, {'$inc': {balance: -amount}}).session(session)
    await Account.findOneAndUpdate({accountId: recieverId}, {'$inc': {balance: amount}}).session(session)
    await session.commitTransaction()
    return res.send('transaction success!')
  } catch (e) {
    await session.abortTransaction()
    res.status(403).json({msg: e.message})
  }
})

export default accountRouter