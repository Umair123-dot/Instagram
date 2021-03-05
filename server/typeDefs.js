const { gql } = require('apollo-server-express');

module.exports = gql`
type User{
  id:Int!
  name:String!
  email:String!
  password:String!
  gender:Gender!
  avatar:String
  phone: String
  dateOfBirth:String!
  posts:[Post!]
  comments:[Comment!]
}
type Post{
  id:Int!
  picture:String
  content:String!
  user:User!
  comments:[Comment!]
}
type Comment{
  id:Int!
  content:String!
  createdAt:String!
  user:User!
  post: Post!  
}
type Authpayload{
  token:String!
  user:User!
}
enum Gender{
  Male
  Female
}
type Query{
  users:[User!]
  posts:[Post!]
  comments(postId: Int!):[Comment!]
  loggedInUser: User!
  userPosts:User!
  
}
type Mutation{
  
  singUp(name:String!,email:String!,password:String!gender:String!,avatar:Upload, phone: String!,dateOfBirth:String!):Authpayload!
  login(email:String!,password:String!):Authpayload!
 
  updateProfile(name:String,avatar:Upload,email:String,password:String,phone:String):User!
  createPost(picture:Upload!,content:String!):Post!
  
  deletePost(id:Int!):String! 
  updatePost(id:Int!,picture:Upload!,content:String!):Post!
  
  #For comment Mutation
  createComment(postId: Int!,content:String!):Comment!
  deleteComment(deleteId:Int!):Authpayload!





  



  
}

type Subscription{
  _:Boolean
}
`;