const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
//const { createHandler } = require('graphql-http/lib/use/express');
//const { buildSchema } = require('graphql');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'power2Destroy', {
    dialect: 'postgres'
});

const port = process.env.PORT || 9000;
const app = express();
const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})
const resolvers = require('./resolvers')

const {makeExecutableSchema} = require('graphql-tools')
const schema = makeExecutableSchema({typeDefs, resolvers})

app.use(bodyParser.json(), cors());

const  {graphiqlExpress,graphqlExpress} = require('apollo-server-express')
app.use('/graphql',graphqlExpress({schema}))
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))

/* this code is for express-graphql server
const schema = buildSchema(`
    type Query {
        test: String
    }
`);

const root = {
    test() {
        return "Hello World"
    },
};

app.all(
    '/graphql',
    createHandler({
        schema: schema,
        rootValue: root,
    }),
);
*/

app.listen(
    port, () => console.info(
       `Server started on port ${port}`
    )
);

const connectToDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to db has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
};

connectToDb();