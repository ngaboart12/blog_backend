const express = require('express')
const mongoose = require('mongoose')
const UserRoute = require('./routes/users')
const PostRoute = require('./routes/post')

mongoose.connect('mongodb+srv://ngabosevelin:sevelin123@cluster0.qhfzskb.mongodb.net/Blog?retryWrites=true&w=majority').then(()=>{
    const app = express()
    app.use(express.json())
    app.use('/api/auth',UserRoute)
    app.use('/api/post',PostRoute)
    app.listen(5000, (req,res)=>{
        console.log('Server Is running On port 5000')

    })
})