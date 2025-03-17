import mongoose from 'mongoose'

//db connection
mongoose.connect(`mongodb+srv://admin-priyanshu:${process.env.MONGODB_PASSWORD}@cluster0.koard.mongodb.net/paytmapp`)
.then(()=>console.log("connected"))
.catch((e)=>console.log(e))

//user schema
const User = mongoose.model('User', {
  firstName: String,
  lastName: String,
  username: String,
  password: String
})

const Account = mongoose.model('Account', {
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
})

export { User, Account }