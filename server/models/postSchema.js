const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.ObjectId


const postSchema = new mongoose.Schema({
    content: {
        type: {},
        required : true
    },
    userId :{
        type : ObjectId,
        ref : "user"
    },
    image: {
        url: String,
        public_id : String
    },
    likes:{
        type: ObjectId,
        ref : 'user'

    },
    comments :{
        text : String,
        created : {type : Date, default: Date.now},
        userId :{
            type : ObjectId,
            ref : 'user'
        } 
    }
},{
    timestamps :true
}

)



const Post = mongoose.model('Post', postSchema);

module.exports = Post;