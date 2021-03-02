const jwt = require('jsonwebtoken');
const APP_SECRET = 'GraphQL-is-aw3some';

const { PrismaClient } = require('@prisma/client');
const { ApolloError } = require('apollo-server');
const prisma = new PrismaClient();

function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
}

async function getUserID({ req }) {
  // const { req } = context
  const { authorization } = req.headers
  if (!authorization) throw new Error('Not authenticated');

  const token = authorization.replace('Bearer ', '');
  if (!token) throw new Error('No token found');

  const decoded = getTokenPayload(token);
  if (!decoded || !('userId' in decoded)) throw new ApolloError("Payload was empty...");

  const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
  if (!user) throw new ApolloError("User not found...");

  return user;
}


module.exports = {
  APP_SECRET,
  getUserID
}
