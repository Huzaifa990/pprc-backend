const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    uploadedOn: {
        type: Date,
        default: new Date()
    },

    liked: {
        type: Number,
        default: 0
    }, 

    comments: {
        userName: {
            type: String
        },

        comment: {
            type: String
        }
    }
})

const Blogs = new mongoose.model("blogs", blogsSchema);
module.exports = Blogs;