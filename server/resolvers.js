const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { Upload } = require('graphql-upload');
const moment = require('moment');
// const APP_SECRET = 'GraphQL-is-aw3some';
const { APP_SECRET, getUserID } = require('./util');
const { create } = require('domain');
const { error, info } = require('console');
const { ApolloError } = require('apollo-server');

const { existsSync, mkdirSync, unlinkSync, createWriteStream } = require('fs');
const { saveImage } = require('./savefile');


module.exports = {
  Query: {
    userPosts: async (root, args, context, info) => {
      const user = await getUserID(context)

      const oneUser = await prisma.user.findUnique({
        where: {
          id: user.id
        }
      })
      return oneUser
    },
    users: () => prisma.user.findMany(),
    posts: () => prisma.post.findMany(),
    comments: () => prisma.comment.findMany(),
    loggedInUser: async (_, __, context, ___) => {
      return getUserID(context);
    }

  },
  Mutation: {
    singUp: async (root, { password, avatar, ...data }, context) => {
      const isEmailExists = await prisma.user.findUnique({ where: { email: data.email } });
      if (isEmailExists) throw new Error("User already exists with this email...");
      const hashpassword = bcrypt.hashSync(password, 10)
      data.password = hashpassword
      if (avatar && typeof avatar === 'object') {
        data.avatar = await saveImage(avatar);
      }

      const user = await prisma.user.create({ data })

      const token = jwt.sign({ userId: user.id }, APP_SECRET)

      return {
        token,
        user

      }
    },
    login: async (root, data, context, info) => {
      const user = await prisma.user.findUnique({
        where: { email: data.email }
      })
      if (!user) throw new Error('No such user found')

      const isPasswordMatched = bcrypt.compareSync(data.password, user.password)
      if (!isPasswordMatched) throw new Error('Password Mismatched');

      const token = jwt.sign({ userId: user.id }, APP_SECRET)

      // 3
      return {
        token,
        user
      }

    },

    createPost: async (root, { picture, ...data }, context, info) => {
      const user = await getUserID(context)

      data.picture = await new Promise((resolve, reject) => {
        return picture.then(({ createReadStream, ...rest }) => {
          const id = Math.random().toString(32).substr(7);
          const filename = `${id}-${rest.filename}`;
          if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
          createReadStream()
            .pipe(fs.createWriteStream(path.join('./uploads', filename)))
            .on('error', (error) => reject(new Error(error.message)))
            .on('finish', () => resolve(filename));
        })
      })

      data.user = {
        connect: {
          id: user.id
        }
      }
      return prisma.post.create({ data })
    },
    deletePost: async (root, { id }, context, info) => {
      const user = await getUserID(context);
      const post = await prisma.post.findUnique({ where: { id } });
      if (!post) throw new ApolloError("Post not found...");

      if (post.userId !== user.id) {
        throw new ApolloError("Post doesn't belong to you...")
      }

      await prisma.post.delete({ where: { id } });
     
      // deleting if old file is given
      if (existsSync(`./uploads/${post.picture}`)) unlinkSync(`./uploads/${post.picture}`);

      return `Post deleted$ {id} Successfully...`
    },
    updateProfile: async (root, { avatar, ...data }, context) => {
      const user = await getUserID(context);
      console.log(user)
      const isEmailDuplicate = await prisma.user.findFirst({
        where: { email: data.email, NOT: { id: user.id } }
      })
      if (isEmailDuplicate) throw new Error('Email already exists')
      if (avatar && typeof avatar === 'object') {
        data.avatar = await saveImage(avatar, user.avatar || false);
      }
      const updateData = await prisma.user.update({
        where: { id: user.id },
        data
      })

      return updateData



    },
    updatePost: async (root, { picture, id, ...data }, context, info) => {
      await getUserID(context);
      const post = await prisma.post.findUnique({ where: { id } });
      if (picture && typeof picture === 'object') {
        data.picture = await saveImage(picture, post.picture || false);
      }

      return prisma.post.update({
        where: { id },
        data
      })
    },
    createComment: async (root, { postId, ...data }, context, info) => {
      const user = await getUserID(context);
      const post = await prisma.post.findUnique({ where: { id: postId } });
      data.postId = post.id
      data.userId = user.id

      return prisma.comment.create({ data })
    },
    deleteComment: async (root, { deleteId }, context, info) => {
      const user = await getUserID(context);
      const comment = await prisma.comment.findUnique({ where: { id: deleteId } })
      if (!comment) throw new Error('Comment not Found');
      if (comment.userId !== user.id) throw new ApolloError("This isn't your comment...")

      await prisma.comment.delete({ where: { id: deleteId } });
      return "Comment id delete Successfully"
    }

  },
  User: {
    posts: async (root, args, context, info) => {

      return prisma.post.findMany({ where: { userId: root.id } })
    }
  },
  Post: {
    user: async (root, args, context, info) => {
      return prisma.user.findUnique({ where: { id: root.userId } })
    }
  },
  Comment: {
    user: async (root, args, context, info) => {
      return prisma.user.findUnique({ where: { id: root.userId } })
    },
    post: async (root, args, context, info) => {
      return prisma.post.findUnique({ where: { id: root.postId } })
    }
  }
}