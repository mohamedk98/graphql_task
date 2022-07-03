const { ApolloServer, gql } = require("apollo-server");
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const books = [
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
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

/**Resolvers */
const resolvers = {
  Query: {
    books: () => books,
  },
};

server.listen().then(()=>{
    console.log("Graphql server is working")
});
