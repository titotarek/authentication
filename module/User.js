const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const { isEmail } =  require('validator')

const userSchema = new Schema({
	email:{
      type: String,
      required:[true, "please Enter your a emile"],
      unique:true,
      lowercase:true,
      validate : [isEmail, "please Enter A valid emile "]
   },
   password:{
      type: String,
      required:[true, "please Enter your a password"],
      minlength:[6 , "minimum  password lenth is 6 characters "]
   }
},{timestamps:true})



// fire a function before the document be saved to db

userSchema.pre('save', async function(next){
   const salt = await bcrypt.genSalt()
   this.password = await bcrypt.hash(this.password, salt)
   next()
})



// statice method to log in 
userSchema.statics.login = async function(email,password){
const user =  await this.findOne({email})
   if(user){
      const auth = await  bcrypt.compare(password, user.password)
      if(auth){
          return user
      }

      throw Error('incorrect password')
   }
   throw Error('incorrect Email')
      
   
}



// fire a function after the document be saved to db
// userSchema.post('save', function (doc, next) {
//    console.log('new user was created & saved' , doc)
// next()
// })








const User = mongoose.model('user', userSchema)
module.exports =  User