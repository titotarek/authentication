const express = require('express')
const controller = require('../controllers/controller')
const {requireAuth , checkUser}  =  require('../middleware/authMiddleWare')
router = express.Router()


router.get('*', checkUser)
router.get('/',controller.getHomePage )
router.get('/smoothies',requireAuth,controller.smoothiesPage)

// log out  router
router.get('/logout',controller.logOut_get)




router.get('/signup',controller.signup_get)
router.get('/login',controller.login_get)

router.post('/signup',controller.signup_post)
router.post('/login',controller.login_post)


// router.get('/set-cookies',controller.setCookies )
// router.get('/red-cookies',controller.redCookies )





module.exports = router
