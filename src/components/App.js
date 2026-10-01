import React, { useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from "react-router-dom";

import Posts from "./Posts";
import PostDetails from "./PostDetails";
import Users from "./Users";
import Notifications from "./Notifications";
import "./../styles/App.css"

const initialUsers = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Priya",
  },
  {
    id: 3,
    name: "Alex",
  },
];

const initialPosts = [
  {
    id: 1,
    title: "Welcome to GenZ",
    author: "John",
    content: "Welcome to our social media application!",
    reactions: [0, 0, 0, 0, 0],
  },
];

function App() {
  const [posts, setPosts] = useState(initialPosts);

  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar">
          <Link to="/">Posts</Link>
          <Link to="/users">Users</Link>
          <Link to="/notifications">Notifications</Link>
        </nav>

        <Switch>
          <Route exact path="/">
            <Posts
              posts={posts}
              setPosts={setPosts}
              users={initialUsers}
            />
          </Route>

          <Route path="/posts/:postId">
            <PostDetails
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
            <Notifications />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

