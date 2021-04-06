import React, { useState, useEffect } from "react";

// CSS
import "./TweetCard.css";

function TweetCard({ tweet, key }) {
  const [time, setTime] = useState("");
  const [timeText, setTimeText] = useState("");

  useEffect(() => {
    if (tweet?.tweet) {
      let _time = new Date(tweet.tweet?.timestamp?.seconds * 1000);
      let _current_time = new Date();
      let difference = _current_time - _time;

      var diffDays = Math.floor(difference / 86400000); // days
      var diffHrs = Math.floor((difference % 86400000) / 3600000); // hours
      var diffMins = Math.round(((difference % 86400000) % 3600000) / 60000); // minutes
      setTime(diffDays > 0 ? diffDays : diffHrs > 0 ? diffHrs : diffMins);
      setTimeText(diffDays > 0 ? "days" : diffHrs > 0 ? "hours" : "minutes");
    }
  }, [tweet]);

  return (
    <div className="tweetCard" id={key}>
      {/* circular image */}
      <div className="tweetCard__img">
        <div></div>
      </div>

      {/* name and tweet content and time*/}
      <div className="tweetCard__userData">
        <div className="tweetCard__userData__header">
          <h3>{tweet?.name}</h3>
          <p>{time + " " + timeText + " ago"}</p>
        </div>
        <div className="tweetCard__userData__message">
          <p>{tweet?.tweet?.tweet}</p>
        </div>
      </div>

      {/* semi circle pink*/}
      <div className="tweetCard__pinkCircle"></div>
    </div>
  );
}

export default TweetCard;
