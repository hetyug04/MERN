import User from "../models/User.js"
import Post from '../models/Post.js'

const getUser = async(req, res, next) =>{
   try {
     const {userName} = req.body
     const getUser = await User.findOne({userName: userName})
     res.send(getUser)
   } catch (error) {
    next(error)
   }
}
const getUserPosts = async(req, res, next) =>{
    try {
        const {userName} = req.body
        const getUserPosts = await Post.find({author: userName})
        res.send(getUserPosts)
    } catch (error) {
        
    }
}
const getUserFriends = async(req, res, next) =>{
  try {
      const {userName} = req.body
      const getUserFriends = await User.findOne({userName: userName})
      const friends = getUserFriends.friends
      res.send(friends)
  } catch (error) {
      
  }
}
const addUserFriend = async(req, res, next) =>{
  try {
    const {friendAdd, userName} = req.body
    const addFriend = await User.updateOne({userName: userName}, {$addToSet: {friends: friendAdd}})
    res.send(addFriend)
  } catch (error) {
    next(error)
  }
}
const deleteUserFriend = async(req, res, next) =>{
  try {
    const {friendRemove, userName} = req.body
    const delFriend = await User.updateOne({userName: userName}, {$pull: {friends: friendRemove}})
    res.send(delFriend)
  } catch (error) {
    next(error)
  }
}
const checkFriend = async(req, res, next)=>{
  try {
    const {userName, friend} = req.body
    const isFound = await User.findOne({ userName: userName, friends: friend }).lean();
    if(isFound){
      res.send(true)
    }
    else{
      res.send(false)
    }
  } catch (error) {
    next(error)
  }
}
export {getUser, getUserPosts, addUserFriend, getUserFriends, deleteUserFriend, checkFriend}