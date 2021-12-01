const jwt = require('jsonwebtoken')
const User = require('../module/User')

const requireAuth = (req,res, next) => {
   const token = req.cookies.jwt

   if(token){

      jwt.verify(token, 'Node Auth Tutorial',(err,decodedToken) => {
         if(err){

            console.log(err.message)
      res.redirect('/login')
         }
         else{
            console.log(decodedToken)
            next()
         }
      })

   }else{
      res.redirect('/login')
   }
}

const  checkUser = (req ,res ,next) => {
   const token = req.cookies.jwt
   if(token){
      jwt.verify(token, 'Node Auth Tutorial' ,(err, decodedToken)=> {
         if(err){
            res.locals.user =  null
            next()
         }
         if(decodedToken){
            User.findById(decodedToken.id)
            .then((user) => {
               const {email, id} = user
               res.locals.user =  {email, id}
               next()
            })
         }
         

      }) 
   }
   else{
      res.locals.user =  null
      next()
   }
}

module.exports = {
   requireAuth ,
   checkUser

}