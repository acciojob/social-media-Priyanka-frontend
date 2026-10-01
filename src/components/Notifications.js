import React, { useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState(null);

  const handleRefresh = () => {
    setNotifications([
      {
        id: 1,
        message: "You have a new friend request.",
      },
      {
        id: 2,
        message: "Your post received a new reaction.",
      },
    ]);
  };

  return (
    <section className="notificationsList">
      <button
        className="button"
        onClick={handleRefresh}
      >
        Refresh Notifications
      </button>

      {notifications && (
        <div>
          {notifications.map((notification) => (
            <p key={notification.id}>
              {notification.message}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}

export default Notifications;

