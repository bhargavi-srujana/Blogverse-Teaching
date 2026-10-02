const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            readTime: req.body.readTime,
            image: req.body.image || "",
            author: user.fullName,
            authorId: user._id
        });
        user.posts.push(post._id);
        await user.save();

        res.status(201).json({
            message: "Post created successfully",
            post
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create post",
            error: error.message
        });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch posts",
            error: error.message
        });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch post",
            error: error.message
        });
    }
};

const updatePost = async (req, res) => {
    try {
        const { title, content, category, readTime, image } = req.body;
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content, category, readTime, image },
            {
                new: true,
                runValidators: true
            }
        );

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            message: "Post updated successfully",
            post
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update post",
            error: error.message
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete post",
            error: error.message
        });
    }
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
};
