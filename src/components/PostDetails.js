import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

function PostDetails({ posts, setPosts }) {
  const { postId } = useParams();
  const history = useHistory();

  const post = posts.find(
    (item) => String(item.id) === String(postId)
  );

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(
    post ? post.title : ""
  );
  const [content, setContent] = useState(
    post ? post.content : ""
  );

  if (!post) {
    return <h2>Post not found</h2>;
  }

  const handleEdit = () => {
    setTitle(post.title);
    setContent(post.content);
    setEditing(true);
  };

  const handleSave = () => {
    const updatedPosts = posts.map((item) => {
      if (String(item.id) === String(postId)) {
        return {
          ...item,
          title: title,
          content: content,
        };
      }

      return item;
    });

    setPosts(updatedPosts);

    history.push("/");
  };

  return (
    <div className="post">
      {!editing ? (
        <>
          <h2>{post.title}</h2>

          <p>Author: {post.author}</p>

          <p>{post.content}</p>

          <button
            className="button"
            onClick={handleEdit}
          >
            Edit
          </button>
        </>
      ) : (
        <>
          <input
            id="postTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            id="postContent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            className="button"
            onClick={handleSave}
          >
            Save
          </button>
        </>
      )}
    </div>
  );
}

export default PostDetails;

