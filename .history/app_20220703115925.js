const { ApolloServer, gql } = require("apollo-server");

/**Database mockup */
const posts = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

/**Schema */
const typeDefs = gql`
  type Post {
    id: Number
    title:String
    text: String
  }
  

  type Query {
    Posts: [Post]
  }
`;

/**Resolvers */
const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

server.listen().then(()=>{
    console.log("Graphql server is working")
});
