const { ApolloServer, gql } = require("apollo-server");
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
    addComment(postId:String,name:String,content:String):String
  }
`;

/**Resolvers */
const resolvers = {
  Query: {
    posts: () => posts,
  },
  Mutation: {
    /**Create Post Function */
    createPost: (_, { title, text }) => {
      let newPost = {
        id: Math.floor(Math.random() * 100 + 1).toString(),
        title: title,
        text: text,
      };
      posts.push(newPost);
      return newPost;
    },
    /**Update Post Function */
    updatePost: (_, { id, title, text }) => {
      let postToBeUpdatedIndex = posts.findIndex((post) => post.id === id);
      let postsUpdates = { id: id, title: title, text: text };
      if (postToBeUpdatedIndex === -1) {
        return "There is no post available to update";
      }
      posts[postToBeUpdatedIndex] = postsUpdates;
      return "Update Successfully";
    },
    /**Delete Post Function */
    deletePost: (_, { id }) => {
      let postsAfterDeleteing = posts.filter((post) => post.id !== id);
      let postToBeDeletedIndex = posts.findIndex((post) => post.id === id);
      if (postToBeDeletedIndex === -1) {
        return "There is no post available to delete";
      }
      posts = postsAfterDeleteing;
      return "Deleted Successfully";
    },
    /**Add comment to certain post */
    addComment:(_,{postId,name,content}) =>{
      let postToBeCommentedIndex = posts.findIndex((post) => post.id === postId);
      let comment = { name,content };
      if (postToBeCommentedIndex === -1) {
        return "There is no post available to add comment";
      }
      posts[postToBeCommentedIndex].comments.push(comment)
      return "Comment Added Successfully"
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
