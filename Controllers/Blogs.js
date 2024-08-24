const Blogs = require("../Model/Blogs")

const getAllBlogs = async (req, res) => {
    const allBlogs = await Blogs.find();
    res.status(200).send(allBlogs);
}


const addBlog = (req, res) => {
    try {
        const newBlog = new Blogs(req.body);

        newBlog.save().then(()=>{
            res.status(200).send(newBlog);
        }).catch((e)=>{
            res.status(404).send(e);
        })
    } catch (error) {
        res.status(404).send(error);
    }
}


const editBlogs = async (req, res) => {
    try {
        const id = req.params.id;

        const updateBlog = await Blogs.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).send(updateBlog);
    } catch (error) {
        res.status(404).send(error);
        
    }
}

const deleteBlog = async (req, res) => {
    try {
        const id = req.params.id;

        const updateBlog = await Blogs.findByIdAndDelete(id);
        res.status(200).send(updateBlog);
    } catch (error) {
        res.status(404).send(error);
        
    }
}

const findBlog = async (req, res) => {
    try {
        const id = req.params.id;

        const updateBlog = await Blogs.findById(id);
        res.status(200).send(updateBlog);
    } catch (error) {
        res.status(404).send(error);
        
    }
}

module.exports = {
    getAllBlogs,
    addBlog,
    editBlogs,
    findBlog,
    deleteBlog
}