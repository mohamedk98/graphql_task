const { ApolloServer, gql } = require("apollo-server");

/**Database mockup */
let posts = [
  {
    id: "1",
    title: "The Awakening",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
  },
  {
    id: "2",
    title: "City of Glass",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
  },
];

/**Schema */
const typeDefs = gql`
  type Post {
    id: String
    title: String
    text: String
  }

  type Query {
    posts: [Post]
  }
`;

/**Resolvers */
const resolvers = {
  Query: {
    posts: () => posts,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(() => {
  console.log("Graphql server is working");
});
