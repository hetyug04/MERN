import {BadRequestError, UnauthenticatedError} from "../errorPackage/index.js"
import Post from '../models/Post.js'
import User from "../models/User.js"

const post = async(req, res, next) =>{
    const {author, title, body, userId} = req.body
    const initialPost = {
        userId : userId,
        author : author,
        title : title,
        body : body,
    }
    try {
        const post = await Post.create(initialPost)
        console.log('posted')
    } catch (error) {
        next(error)
    }
}
const updatePost = async(req, res) =>{
    try {
        const {title, body, _id} = req.body
        const editPost = await Post.findOneAndUpdate({_id:_id}, {title: title, body: body})
        res.send(editPost)
    } catch (error) {
        console.log(error)
    }
}
const getAllPosts = async(req, res) =>{
    try {
        const allPosts = await Post.find({})
        res.send(allPosts)
    } catch (error) {
        next(error)
    }
}
const getPost = async(req, res, next) =>{
    try {
        const {id} = req.body
        const post = await Post.findOne({_id: id})
        res.send(post)
    } catch (error) {
        next(error)
    }
}
const deletePost = async(req, res, next) =>{
    try {
        const {_id} = req.body
        const deletePost = await Post.deleteOne({data:{ _id:_id}})
        console.log('deleted')
    } catch (error) {
        next(error)
    }
}

export {post, updatePost, getAllPosts, getPost, deletePost}