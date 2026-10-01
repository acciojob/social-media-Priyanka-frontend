import React, { useState } from "react";

function Users({ users = [], posts = [] }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const selectedUserPosts = selectedUser
    ? posts.filter(
        (post) => post.author === selectedUser.name
      )
    : [];

  return (
    <div>
      <h2>Users</h2>

      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => handleUserClick(user)}
          >
            {user.name}
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div>
          {selectedUserPosts.map((post) => (
            <div className="post" key={post.id}>
              <h2>{post.title}</h2>

              <p>Author: {post.author}</p>

              <p>{post.content}</p>

              <div className="reactions">
                {(post.reactions || [0, 0, 0, 0, 0]).map(
                  (count, index) => (
                    <button
                      key={index}
                      type="button"
                    >
                      {count}
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;




