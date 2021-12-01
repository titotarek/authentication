// const cookieParser = require('cookie-parser')

const User = require('../module/User')
const jwt = require('jsonwebtoken')



// handelErrors
const handelErrors = (err) => {
console.log(err.message, err.code)
let errors = {email: '' , password:''}

if(err.message === 'incorrect Email'){
   errors.email = 'that email is Not registered'
}

if(err.message === 'incorrect Email'){
   errors.password = 'that password incorrect'
}
// duplicate errors
if(err.code === 11000){
   errors.email = 'that email is already registered';
   return errors;
}


// validator error
if(err.message.includes('user validation failed')){
   // console.log(err.errors, 'comes from handle error function: err.errors')
   Object.values(err.errors).forEach(({properties}) => {
      // console.log(properties, 'comes from handle errors: properties ----------------------------')
      errors[properties.path] = properties.message
   })
   // console.log(errors, '++++++++++++++++++++++++++++++++++++++')
}
// console.log(errors, 'comes from HandleErrors function')
return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) =>{
   return jwt.sign({id}, 'Node Auth Tutorial', {
      expiresIn:maxAge
   })
}


const getHomePage = (req, res) => {
	res.render('homePage')
}


const smoothiesPage = (req, res) => {
   res.render('smoothies')
}


const signup_get = (req, res) => {
   res.render('signup')
}

const login_get = (req, res) => {
   res.render('login')
}


const login_post = async  (req, res) => {
   const {email, password } = req.body
   try {
      const user = await User.login(email, password) 
      // console.log(email, password)
      const token =  createToken(user._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000} )
//  console.log(user)
    res.status(200).json({user: user._id})

   }
   catch (err){
  const errors =  handelErrors(err)  
   res.status(400).json({errors})

   }
   }






const signup_post =  async (req, res) => {
   const {email, password} = req.body
   
   // console.log(email, password)
   // res.send('login')
   try{
    const user = await User.create({email,password}) 
    const token =  createToken(user._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000} )
    res.status(201).json({user: user._id})

 }
 catch (err){
  const errors =  handelErrors(err)
  res.status(400).json({errors})
   }
}   


// cookies function//////////




const logOut_get = (req,res) => {
   res.cookie('jwt', '' ,{maxAge : 1})
res.redirect('/')
}


module.exports = {
	getHomePage,
   smoothiesPage,
   signup_get,
   login_get,
   signup_post,
   login_post,
   logOut_get

   // setCookies,
   // redCookies
}


















// const setCookies = (req,res) => {
//    res.cookie('newUser', false)
//    res.cookie('car', true,{maxAge:1000*60*60*24, httpOnly: true})

//    res.send('hello you  get a cookies')
// }


// const redCookies = (req,res) => {
//   const cookie =  req.cookies;
//   console.log(cookie.car)
//   res.json(cookie)
// }