import express from 'express'
import { userSignInSchema,updateSchema, userSignUpSchema } from '../schema/index.js' 
import { User, Account } from '../db.js'
import * as jose from 'jose'
import bcrypt from 'bcryptjs'
import { authMiddleware } from '../middleware.js'

const userRouter = express.Router()

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET)

userRouter.post("/signup", async (req, res) => {
  const body = req.body
  const {success} = userSignUpSchema.safeParse(body)
  if(!success){
    res.json({msg: 'wrong inputs'})
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);
  try {
    const findUser = await User.findOne({
      username: body.username,
      password: hashedPassword
    })
    if(findUser){
      res.send({msg: 'user already exists! please sign in'})
      return;
    }
    const user = new User({
      firstName: body.firstName,
      lastName: body.lastName,
      username: body.username,
      password: hashedPassword
    })
    const status = await user.save()
    const accountCreated = await Account.create({
      accountId: status.id,
      balance: Math.floor(1 + Math.random()*1000)
    })
    if(!accountCreated){
      return res.status(403).json({msg: 'account creation failed'})
    }
    
    const token = await new jose.SignJWT({ id: status.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secretKey)
    
    return res.send({token: token})
  } catch (e) {
    res.send({err: e})
    return;
  }
})

userRouter.post("/signin", async (req, res) => {
  const body = req.body
  const {success} = userSignInSchema.safeParse(body)
  if(!success){
    res.json({msg: 'wrong inputs'})
    return;
  }
  try {
    const user = await User.findOne({username: body.username})
    const checkPassword = await bcrypt.compare(body.password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ err: 'Invalid credentials' })
    }
    
    const token = await new jose.SignJWT({ id: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secretKey)
    
    return res.send({token})
  } catch (e) {
    res.send({err: 'sign in failed! try again'})
    return;
  }
})

userRouter.put("/", authMiddleware,async (req, res)=>{
  const userId = req.userId
  const body = req.body
  const {success} = updateSchema.safeParse(body)
  if(!success){
    res.status(403).json({msg: 'wrong inputs'})
    return;
  }
  try {
    await User.findByIdAndUpdate(userId, body)
  } catch (e) {
    res.status(403).json({err: 'failed to update! try again'})
    return;
  }
  res.status(200).json({msg: 'update success!'})
})

userRouter.get('/bulk',async (req, res)=>{
  const filter = req.query.filter || ""
  console.log(filter);
  
  try {
    const users = await User.find({
      $or: [
        {
          firstName: {'$regex': filter}
        },
        {
          lastName: {'$regex': filter}
        }
      ]
    })
    return res.json(users.map(user=>(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        _id: user.id
      }
    )))
  } catch (e) {
    return res.status(403).json({})
  }
})
userRouter.get('/username', authMiddleware, async (req, res)=>{
  const user = await User.findById(req.userId)
  res.status(200).json({firstName: user.firstName, username: user.username})
})
userRouter.get('/:id', async (req, res)=>{
  const id = req.params.id
  try {
    const user = await User.findById(id)
    return res.status(200).json({firstName: user.firstName})
  } catch (e) {
    return res.send({err: e.message})
  }
})

export default userRouter