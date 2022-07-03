const { DataSource } = require("apollo-datasource");
const { Post } = require("./post.model");
const { uuid } = require("uuidv4");
class PostsApi extends DataSource {
  /**Initlaizing the custom datasource (mandatory) */
  initialize(config) {
    this.context = config.context;
  }
  /**Get all posts */
  async getPosts() {
    return Post.find();
  }
  /**Create a single post and return the new post */
  async createPost({ title, text }) {
    const post = new Post({
      id: uuid(),
      title,
      text,
      comments: [],
    });
    return await post.save();
  }
  /**update a single post and return success or failure message */
  async updatePost({ id, title, text }) {
    const postToBeUpdated = await Post.findOneAndUpdate(
      { id },
      { title: title, text: text },
      { new: true }
    );
    if (!postToBeUpdated) {
      return "There is no post with this ID";
    }
    return "Post Updated Successfully";
  }
  /**delete a single post and return success or failure message */
  async deletePost(id) {
    const postToBeUpdated = await Post.findOneAndRemove(id);
    if (!postToBeUpdated) {
      return "There is no post with this ID";
    }
    return "Post Deleted Successfully";
  }

  /**delete a single post and return success or failure message */
  async addComment({ postId, name, content }) {
    const postToBeUpdated = await Post.findOneAndUpdate(
      { id: postId },
      { $push: { comments: { name, content } } },
      { new: true }
    );
    if (!postToBeUpdated) {
      return "There is no post with this ID";
    }
    return "Comment Added Successfully";
  }
}

module.exports = PostsApi;
