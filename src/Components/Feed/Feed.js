import React, { useState } from "react";

// FIREBASE
import { db } from "../../firebase";
import firebase from "firebase";

// COMPONENTS
import Button from "../Button/Button";
import TweetCard from "../TweetCard/TweetCard";

// MATERIAL UI
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

// CSS
import "./Feed.css";

function Feed({ feedTweets, currentLoggedInUserID }) {
  const [open, setopen] = useState(false);
  const [userTweet, setUserTweet] = useState("");

  const handleClose = () => {
    setopen(false);
  };

  const handleOpen = () => {
    setopen(true);
  };

  const handleTweetSubmit = () => {
    if (userTweet !== "") {
      db.collection("tweets")
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          tweet: userTweet,
          user: currentLoggedInUserID,
        })
        .then(() => {
          setUserTweet("");
          handleClose();
        });
    }
  };

  return (
    <div>
      {/* WRITE NEW TWEET MODAL */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"md"}
        fullWidth={true}
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="What's on your mind?"
            type="text"
            fullWidth
            value={userTweet}
            onChange={(e) => setUserTweet(e.target.value)}
            multiline
            rowsMax={10}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            title="Cancel"
            type="secondary"
          ></Button>
          <Button
            onClick={handleTweetSubmit}
            title="Submit"
            type="secondary"
          ></Button>
        </DialogActions>
      </Dialog>

      {/* BODY */}
      <div className="feed">
        <Button title="Write" type="primary" onClick={handleOpen} />
        <div className="feed__tweets__container">
          {feedTweets.map((tweet) => {
            return <TweetCard tweet={tweet} key={tweet.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Feed;
