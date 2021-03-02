// const { ApolloServer } = require('apollo-server');
// const typeDefs = require('./typeDefs');
// const resolvers = require('./resolvers');


// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req, res }) => ({ req, res })
// })
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

const fs = require('fs');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const PORT = 4000;

const app = express();

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req, res }) => ({ req, res }) });
server.applyMiddleware({ app, path: '/graphql' });

app.get('/images/:filename', (req, res) => {
  const { filename } = req.params;
  console.log(`./uploads/${filename}`)
  if (!fs.existsSync(`./uploads/${filename}`)) return res.status(404).send('Image not found...')
  return res.status(200).download(`./uploads/${filename}`)
})

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)