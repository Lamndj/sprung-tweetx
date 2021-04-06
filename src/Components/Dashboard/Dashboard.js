import React, { useState, useEffect } from "react";

// FIREBASE
import { db } from "../../firebase";
import firebase from "firebase";

// COMPONENTS
import Navbar from "../Navbar/Navbar";

// CSS
import "./Dashboard.css";
import Feed from "../Feed/Feed";
import Users from "../Users/Users";
import Profile from "../Profile/Profile";

function Dashboard({ currentLoggedInUserID }) {
  const [feedTweets, setFeedTweets] = useState([]);
  const [userTweets, setuserTweets] = useState([]);
  const [allUsers, setallUsers] = useState([]);
  const [userFollowingList, setUserFollowingList] = useState([]);
  const [userFollowersList, setUserFollowersList] = useState([]);
  const [currentUser, setcurrentUser] = useState({});
  const [currentSection, setcurrentSection] = useState("feed");

  useEffect(() => {
    const getUserAndTweets = () => {
      // LOGGED IN USER
      db.collection("users")
        .doc(currentLoggedInUserID)
        .onSnapshot((snapshot) => {
          setcurrentUser({
            id: currentLoggedInUserID,
            userData: snapshot.data(),
          });
        });

      // USER'S TWEETS FOR PROFILE
      db.collection("tweets")
        .where("user", "==", currentLoggedInUserID)
        .orderBy("timestamp", "desc")
        .onSnapshot(async (snapshot) => {
          const data = await getTweetUsernames(snapshot);
          setuserTweets(data);
        });

      // ALL USERS
      db.collection("users").onSnapshot((snapshot) => {
        setallUsers(
          snapshot.docs.map((_val) => {
            return {
              id: _val.id,
              userData: _val.data(),
            };
          })
        );
      });

      // ALL FOLLOWERS FOR LOGGED IN USERS
      db.collection("users")
        .where("user", "==", currentLoggedInUserID)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setallUsers(
            snapshot.docs.map((_val) => {
              return {
                id: _val.id,
                userData: _val.data(),
              };
            })
          );
        });

      // ALL FOLLOWING FOR LOGGED IN USERS
      db.collection("users").onSnapshot((snapshot) => {
        setallUsers(
          snapshot.docs.map((_val) => {
            return {
              id: _val.id,
              userData: _val.data(),
            };
          })
        );
      });
    };

    getUserAndTweets();
  }, [currentLoggedInUserID]);

  useEffect(() => {
    // FEED TWEETS ACCORDING TO FOLLOWING
    if (
      currentUser.userData?.following &&
      currentUser.userData?.following.length > 0
    ) {
      // TWEETS
      db.collection("tweets")
        .where("user", "in", currentUser.userData.following)
        .orderBy("timestamp", "desc")
        .onSnapshot(async (snapshot) => {
          const data = await getTweetUsernames(snapshot);
          setFeedTweets(data);
        });
      // FOLLOWING USERS LIST
      db.collection("users")
        .where(
          firebase.firestore.FieldPath.documentId(),
          "in",
          currentUser.userData.following
        )
        .onSnapshot((snapshot) => {
          setUserFollowingList(
            snapshot.docs.map((val) => {
              return {
                id: val.id,
                userData: val.data(),
              };
            })
          );
        });
    } else {
      setFeedTweets([]);
      setUserFollowingList([]);
    }
  }, [currentUser]);

  useEffect(() => {
    // FOLLOWERS USERS LIST
    if (
      currentUser.userData?.followers &&
      currentUser.userData?.followers.length > 0
    ) {
      db.collection("users")
        .where(
          firebase.firestore.FieldPath.documentId(),
          "in",
          currentUser.userData.followers
        )
        .onSnapshot((snapshot) => {
          setUserFollowersList(
            snapshot.docs.map((val) => {
              return {
                id: val.id,
                userData: val.data(),
              };
            })
          );
        });
    } else {
      setUserFollowersList([]);
    }
  }, [currentUser]);

  const getTweetUsernames = (snapshot) => {
    const promises = snapshot.docs.map(async (doc) => {
      let _user = await db.collection("users").doc(doc.data().user).get();
      return {
        id: doc.id,
        tweet: doc.data(),
        name: _user.data().name,
      };
    });
    return Promise.all(promises);
  };

  const handleCurrentSection = (section) => {
    setcurrentSection(section);
  };

  return (
    <div>
      {/* NAVBAR */}
      <Navbar
        handleCurrentSection={handleCurrentSection}
        active={currentSection}
      />
      {/* <button onClick={handleLogout}>Log out</button> */}

      {/* BODY */}
      {currentSection === "feed" && (
        <Feed
          feedTweets={feedTweets}
          currentLoggedInUserID={currentLoggedInUserID}
        />
      )}
      {currentSection === "users" && (
        <Users allUsers={allUsers} currentUser={currentUser} />
      )}
      {currentSection === "profile" && (
        <Profile
          currentUser={currentUser}
          userTweets={userTweets}
          userFollowingList={userFollowingList}
          userFollowersList={userFollowersList}
        />
      )}
    </div>
  );
}

export default Dashboard;
