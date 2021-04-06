import React from "react";

// COMPONENTS
import TweetCard from "../TweetCard/TweetCard";
import UserCard from "../UserCard/UserCard";

// MATERIAL UI
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// CSS
import "./Profile.css";

function Profile({
  userTweets,
  currentUser,
  userFollowingList,
  userFollowersList,
}) {
  const [currentProfileSection, setcurrentProfileSection] = React.useState(
    "posts"
  );

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setcurrentProfileSection(newValue);
  };

  return (
    <div className="profile">
      {/* PROFILE HEADER */}
      <div className="profile__header">
        {/* Card */}
        <div className="profile__header__card">
          <div className="profile__header__card__img">
            <div></div>
          </div>
          {/* name and tweet content and time*/}
          <div className="profile__header__card__userData">
            <div className="profile__header__card__userData__header">
              <h3>{currentUser?.userData?.name}</h3>
            </div>
            <div className="profile__header__card__userData__message">
              <p>
                {"Posts: " + (userTweets?.length > 0 ? userTweets?.length : 0)}
              </p>
              <p>
                {"Followers: " +
                  (currentUser?.userData?.followers?.length
                    ? currentUser?.userData?.followers?.length
                    : 0)}
              </p>
              <p>
                {"Following: " +
                  (currentUser?.userData?.following?.length
                    ? currentUser?.userData?.following?.length
                    : 0)}
              </p>
            </div>
          </div>
        </div>

        {/* tabs */}
        <Paper className="profile__header__tabsContainer" square>
          <Tabs
            value={currentProfileSection}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
            className="profile__header__tabs"
          >
            <Tab label="Posts" value="posts" />
            <Tab label="Followers" value="followers" />
            <Tab label="Following" value="following" />
          </Tabs>
        </Paper>
      </div>

      {/* PROFILE BODY ACCORDING TO SELECTED TAB */}
      {currentProfileSection === "posts" && (
        <div className="profile__tweets__container">
          {userTweets.map((tweet) => {
            return <TweetCard tweet={tweet} key={tweet.id} />;
          })}
        </div>
      )}
      {currentProfileSection === "following" && (
        <div className="profile__following__container">
          {userFollowingList.map((user) => {
            return (
              <UserCard
                key={user.id}
                userData={user}
                currentUser={currentUser}
              />
            );
          })}
        </div>
      )}
      {currentProfileSection === "followers" && (
        <div className="profile__following__container">
          {userFollowersList.map((user) => {
            return (
              <UserCard
                key={user.id}
                userData={user}
                currentUser={currentUser}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Profile;
