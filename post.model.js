const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  comments: [
    {
      name: { type: String },
      content: { type: String },
    },
  ],
});

const Post = model("post", postSchema);
module.exports = { Post };
