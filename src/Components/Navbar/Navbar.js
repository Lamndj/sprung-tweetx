import React from "react";

// CSS
import "./Navbar.css";

function Navbar({ loginScreen, handleCurrentSection, active }) {
  return (
    <div className={`navbar ${!loginScreen && "navbar__shadow"}`}>
      <h3 className="navbar__logo">TweetX</h3>
      {!loginScreen && (
        <>
          <ul className="navbar__list">
            <li
              className={`navbar__list__element ${
                active === "feed" && "active"
              }`}
              onClick={() => handleCurrentSection("feed")}
            >
              Feed
            </li>
            <li
              className={`navbar__list__element ${
                active === "users" && "active"
              }`}
              onClick={() => handleCurrentSection("users")}
            >
              Users
            </li>
            <li
              className={`navbar__list__element ${
                active === "profile" && "active"
              }`}
              onClick={() => handleCurrentSection("profile")}
            >
              Profile
            </li>
          </ul>
        </>
      )}
    </div>
  );
}

export default Navbar;
