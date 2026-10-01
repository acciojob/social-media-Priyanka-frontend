import React, { useState } from "react";

function Users({ users = [], posts = [] }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const userPosts = posts.filter(
    (post) => post.author === selectedUser
  );

  return (
    <div>
      <h2>Users</h2>

      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setSelectedUser(user.name)}
          >
            {user.name}
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div>
          {userPosts.map((post) => (
            <div className="post" key={post.id}>
              <h2>{post.title}</h2>
              <p>Author: {post.author}</p>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;

