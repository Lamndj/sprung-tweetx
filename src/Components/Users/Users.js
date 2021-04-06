import React from "react";

// COMPONENTS
import UserCard from "../UserCard/UserCard";

// CSS
import "./Users.css";

function Users({ allUsers, currentUser }) {
  return (
    <div className="users">
      {allUsers.map((user) => {
        if (user.id !== currentUser.id)
          return (
            <UserCard key={user.id} userData={user} currentUser={currentUser} />
          );
        else return null;
      })}
    </div>
  );
}

export default Users;
