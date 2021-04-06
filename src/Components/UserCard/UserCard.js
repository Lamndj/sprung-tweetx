import React, { useEffect, useState } from "react";

// FIREBASE
import { db } from "../../firebase";

// COMPONENTS
import Button from "../Button/Button";

// CSS
import "./UserCard.css";

function UserCard({ userData, currentUser }) {
  const [followingStatus, setFollowingStatus] = useState(false);

  useEffect(() => {
    let _user = currentUser?.userData.following?.filter(
      (val) => val === userData?.id
    );
    if (_user && _user.length > 0) {
      setFollowingStatus(true);
    } else {
      setFollowingStatus(false);
    }
  }, [currentUser, userData]);

  const handleFollow = () => {
    switch (followingStatus) {
      case true: {
        // Already following
        break;
      }
      case false: {
        // Follow the user
        // Step 1 => Add user's id to logged in user's following list
        let _followingList = currentUser.userData.following
          ? [...currentUser.userData.following, userData.id]
          : [userData.id];
        db.collection("users").doc(currentUser.id).update({
          following: _followingList,
        });
        // Step 2 => Add logged in user's id to user's followers list
        let _followersList = userData.userData.followers
          ? [...userData.userData.followers, currentUser.id]
          : [currentUser.id];
        db.collection("users").doc(userData.id).update({
          followers: _followersList,
        });
        break;
      }
      default: {
      }
    }
  };

  return (
    <div className="userCard" key={userData.id}>
      {/* circular image */}
      <div className="userCard__img">
        <div></div>
      </div>

      {/* name and tweet content and time*/}
      <div className="userCard__userData">
        <div className="userCard__userData__header">
          <h3>{userData?.userData.name}</h3>
        </div>
        <div className="userCard__userData__message">
          <p>
            {"Following " +
              (userData?.userData?.followers?.length
                ? userData?.userData?.followers?.length
                : "0")}
          </p>
        </div>
      </div>

      {/* semi circle pink*/}
      <div className="userCard__action">
        <Button
          onClick={handleFollow}
          type={followingStatus ? "secondary" : "primary"}
          title={followingStatus ? "Following" : "Follow"}
        />
      </div>
    </div>
  );
}

export default UserCard;
