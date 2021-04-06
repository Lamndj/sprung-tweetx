import React, { useState, useEffect } from "react";

// FIREBASE
import { auth } from "./firebase";

// COMPONENTS
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";

// CSS
import "./App.css";

function App() {
  const [currentLoggedInUser, setcurrentLoggedInUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setcurrentLoggedInUser(authUser);
      } else {
        setcurrentLoggedInUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="app">
      {currentLoggedInUser ? (
        <Dashboard currentLoggedInUserID={currentLoggedInUser.uid} />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
