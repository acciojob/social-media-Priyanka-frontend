import React, { useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useHistory,
  useParams,
} from "react-router-dom";
import "./../styles/App.css";

const initialUsers = [
  { id: 1, name: "John" },
  { id: 2, name: "Priya" },
  { id: 3, name: "Alex" },
];

const initialPosts = [
  {
    id: 1,
    title: "Welcome to GenZ",
    authorId: 1,
    author: "John",
    content: "This is the first post.",
    reactions: [0, 0, 0, 0, 0],
  },
  {
    id: 2,
    title: "React is awesome",
    authorId: 2,
    author: "Priya",
    content: "Learning React and React Router.",
    reactions: [0, 0, 0, 0, 0],
  },
  {
    id: 3,
    title: "Hello World",
    authorId: 3,
    author: "Alex",
    content: "Welcome everyone!",
    reactions: [0, 0, 0, 0, 0],
  },
];

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [notifications, setNotifications] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <h1>GenZ</h1>

        <nav>
          <Link to="/">Posts</Link>
          <Link to="/users">Users</Link>
          <Link to="/notifications">Notifications</Link>
        </nav>

        <Switch>
          <Route exact path="/">
            <Posts
              posts={posts}
              setPosts={setPosts}
            />
          </Route>

          <Route exact path="/users">
            <Users
              users={initialUsers}
              posts={posts}
            />
          </Route>

          <Route exact path="/notifications">
            <Notifications
              notifications={notifications}
              setNotifications={setNotifications}
            />
          </Route>

          <Route path="/posts/:postId">
  <PostDetails
    posts={posts}
    setPosts={setPosts}
  />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

/* =========================
   POSTS PAGE
========================= */

function Posts({ posts, setPosts }) {
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("1");
  const [content, setContent] = useState("");

  const submitPost = (event) => {
    event.preventDefault();

    const author = initialUsers.find(
      (user) => user.id === Number(authorId)
    );

    const newPost = {
      id: Date.now(),
      title,
      authorId: Number(authorId),
      author: author.name,
      content,
      reactions: [0, 0, 0, 0, 0],
    };

    setPosts((currentPosts) => [...currentPosts, newPost]);

    setTitle("");
    setAuthorId("1");
    setContent("");
  };

  return (
    <div>
      <h2>Posts</h2>

      <form onSubmit={submitPost}>
        <input
          id="postTitle"
          placeholder="Post Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <select
          id="postAuthor"
          value={authorId}
          onChange={(event) => setAuthorId(event.target.value)}
        >
          {initialUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <textarea
          id="postContent"
          placeholder="Post Content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />

        <button type="submit">Add Post</button>
      </form>

      <div className="posts-list">
        <h2>All Posts</h2>

        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            posts={posts}
            setPosts={setPosts}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================
   POST CARD
========================= */

function Post({ post, posts, setPosts }) {
  const history = useHistory();

  const reactToPost = (reactionIndex) => {
    // Fifth reaction intentionally does not change.
    if (reactionIndex === 4) {
      return;
    }

    setPosts(
      posts.map((item) => {
        if (item.id !== post.id) {
          return item;
        }

        const reactions = [...item.reactions];

        reactions[reactionIndex] += 1;

        return {
          ...item,
          reactions,
        };
      })
    );
  };

  return (
    <article className="post">
      <h3>{post.title}</h3>

      <p>Author: {post.author}</p>

      <p>{post.content}</p>

      <button
        className="button"
        onClick={() => history.push(`/posts/${post.id}`)}
      >
        View Post
      </button>

      <div className="reactions">
        {post.reactions.map((count, index) => (
          <button
            key={index}
            onClick={() => reactToPost(index)}
          >
            {count}
          </button>
        ))}
      </div>
    </article>
  );
}

/* =========================
   POST DETAILS
========================= */

function PostDetails({ posts, setPosts }) {
  const { postId } = useParams();

  const post = posts.find(
    (item) => item.id === Number(postId)
  );

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <PostDetailsContent
      post={post}
      posts={posts}
      setPosts={setPosts}
    />
  );
}

function PostDetailsContent({ post, posts, setPosts }) {
  const history = useHistory();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleEdit = () => {
    setTitle(post.title);
    setContent(post.content);
    setEditing(true);
  };

  const savePost = () => {
    const updatedPost = {
      ...post,
      title: title,
      content: content,
    };

    const updatedPosts = posts.map((item) => {
      if (item.id === post.id) {
        return updatedPost;
      }

      return item;
    });

    // Update the main posts state
    setPosts(updatedPosts);

    // Exit edit mode
    setEditing(false);

    // Go back to Posts page so Cypress can verify
    // the updated post in .posts-list
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
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />

          <textarea
            id="postContent"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />

          <button onClick={savePost}>
            Save
          </button>
        </>
      )}
    </div>
  );
}



/* =========================
   USERS PAGE
========================= */

function Users({ users, posts }) {
  return (
    <div>
      <h2>Users</h2>

      <ul>
        {users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            posts={posts}
          />
        ))}
      </ul>
    </div>
  );
}

function UserItem({ user, posts }) {
  const [showPosts, setShowPosts] = useState(false);

  const userPosts = posts.filter(
    (post) => post.authorId === user.id
  );

  return (
    <li>
      <button
        onClick={() => setShowPosts(!showPosts)}
      >
        {user.name}
      </button>

      {showPosts && (
        <div>
          {userPosts.map((post) => (
            <article
              className="post"
              key={post.id}
            >
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </article>
          ))}
        </div>
      )}
    </li>
  );
}

/* =========================
   NOTIFICATIONS
========================= */

function Notifications({
  notifications,
  setNotifications,
}) {
  const refreshNotifications = () => {
    setNotifications([
      {
        id: 1,
        text: "Someone reacted to your post.",
      },
      {
        id: 2,
        text: "You have a new notification.",
      },
    ]);
  };

  return (
    <div>
      <h2>Notifications</h2>

      <button
        className="button"
        onClick={refreshNotifications}
      >
        Refresh Notifications
      </button>

      <section className="notificationsList">
        {notifications.map((notification) => (
          <div key={notification.id}>
            {notification.text}
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;

