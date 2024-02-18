const mongoose  = require('mongoose')

const PostSchema = mongoose.Schema({
    title: { type: String,required: true },
    content: { type: String,required:true },
    author_id: {
         type: mongoose.Schema.Types.ObjectId ,
         ref: "users"
    }
}, {timestamps: true})

module.exports = mongoose.model("Posts", PostSchema)