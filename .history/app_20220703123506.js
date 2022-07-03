const { ApolloServer, gql } = require("apollo-server");

/**Database mockup */
let posts = [
  {
    id: "1",
    title: "The Awakening",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
  },
  {
    id: "2",
    title: "City of Glass",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
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

  type Mutation{
    createPost(title:String,text:String):Post,
    updatePost(id:String,title:String,text:String):Post,
    deletePost(id:String):String

  }
`;

/**Resolvers */
const resolvers = {
  Query: {
    posts: () => posts,
  },
  Mutation: {
    createPost:()=>{
      let newPost = {id:posts[-1].id+1,title:posts.title,text:posts.text}
      posts.push(newPost)
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(() => {
  console.log("Graphql server is working");
});
