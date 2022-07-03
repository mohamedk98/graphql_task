const { ApolloServer, gql } = require("apollo-server");

/**Database mockup */
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

  type Author {
    name:String,
    books:[Book]
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

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

server.listen().then(()=>{
    console.log("Graphql server is working")
});
