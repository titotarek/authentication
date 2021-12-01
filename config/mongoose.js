const mongoose = require('mongoose')


const db = "mongodb+srv://test:test1234@tarek.etrlz.mongodb.net/login?retryWrites=true&w=majority"
mongoose.connect(db)
.then(result => console.log("db concocted"))
.catch(err => console.log(err))
