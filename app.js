const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const PostsApi = require("./datasource");
/**Database mockup */
let posts = [
  {
    id: "1",
    title: "The Awakening",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    comments: [{ name: "Ahmed", content: "Great Post" }],
  },
  {
    id: "2",
    title: "City of Glass",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    comments: [{ name: "Mohamed", content: "Give it 5" }],
  },
];

/**Schema */
const typeDefs = gql`
  # Post Schema
  type Post {
    id: String
    title: String
    text: String
    comments: [Comment]
  }

  #Comment Schema
  type Comment {
    name: String
    content: String
  }

  type Query {
    posts: [Post]
  }
  # here we define the schema of the resolvers with its data types and parameters
  type Mutation {
    createPost(title: String, text: String): Post # The : indicate the return type of thsi function
    updatePost(id: String, title: String, text: String): String
    deletePost(id: String): String
    addComment(postId: String, name: String, content: String): String
  }
`;

/**Resolvers */
const resolvers = {
  Query: {
    posts: (_, __, { dataSources }) => {
      return dataSources.postsApi.getPosts();
    },
  },
  Mutation: {
    /**Create Post Function */
    createPost: async (_, { title, text }, { dataSources }) => {
      return dataSources.postsApi.createPost({ title, text });
    },
    /**Update Post Function */
    updatePost: (_, { id, title, text }, { dataSources }) => {
      return dataSources.postsApi.updatePost({ id, title, text });
    },
    /**Delete Post Function */
    deletePost: (_, { id }, { dataSources }) => {
      return dataSources.postsApi.deletePost(id);
    },
    /**Add comment to certain post */
    addComment: (_, { postId, name, content }, { dataSources }) => {
      return dataSources.postsApi.addComment({ postId, name, content });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      postsApi: new PostsApi(),
    };
  },
});

server.listen().then(() => {
  console.log("Graphql server is working");
  mongoose
    .connect("mongodb://localhost:27017") // Localhost mongodb
    .then(() => {
      console.log("Mongodb connected succesfully");
    })
    .catch((error) => {
      console.log(error);
    });
});
