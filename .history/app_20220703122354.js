const { ApolloServer, gql } = require("apollo-server");

/**Database mockup */
let posts = [
  {
    id:"1",
    title: "The Awakening",
    author: "lorem",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

/**Schema */
const typeDefs = gql`
  type Post {
    id: String
    title:String
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

server.listen().then(()=>{
    console.log("Graphql server is working")
});
