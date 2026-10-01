import React, { useState } from "react";
import { Link } from "react-router-dom";

function Posts({ posts = [], setPosts, users = [] }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleAddPost = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      title: title,
      author: author,
      content: content,
      reactions: [0, 0, 0, 0, 0],
    };

    setPosts([...posts, newPost]);

    setTitle("");
    setAuthor("");
    setContent("");
  };

  const handleReaction = (postId, reactionIndex) => {
    // Fifth reaction must remain 0
    if (reactionIndex === 4) {
      return;
    }

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedReactions = [...post.reactions];

        updatedReactions[reactionIndex] += 1;

        return {
          ...post,
          reactions: updatedReactions,
        };
      }

      return post;
    });

    setPosts(updatedPosts);
  };

  return (
    <div>
      <h1>GenZ</h1>

      <form onSubmit={handleAddPost}>
        <input
          id="postTitle"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
        />

        <select
          id="postAuthor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="">Select Author</option>

          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>

        <textarea
          id="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post Content"
        />

        <button className="button" type="submit">
          Add Post
        </button>
      </form>

      <div className="posts-list">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>

            <p>Author: {post.author}</p>

            <p>{post.content}</p>

            <div className="reactions">
              {post.reactions.map((count, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    handleReaction(post.id, index)
                  }
                >
                  {count}
                </button>
              ))}
            </div>

            <Link
              className="button"
              to={`/posts/${post.id}`}
            >
              View Post
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;

