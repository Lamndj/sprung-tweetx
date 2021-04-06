import React, { useState } from "react";

// FIREBASE
import { auth, db } from "../../firebase";

// COMPONENTS
import Button from "../Button/Button";
import Navbar from "../Navbar/Navbar";

// MATERIAL UI
import IconButton from "@material-ui/core/IconButton";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// CSS
import "./Login.css";

function Login() {
  const [currentUserStatus, setcurrentUserStatus] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setPassword(event.target.value);
  };

  const PasswordField = () => {
    return (
      <FormControl variant="filled">
        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
        <FilledInput
          id="filled-adornment-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    );
  };

  const handleRegistrationToggle = () => {
    setcurrentUserStatus(currentUserStatus === "login" ? "register" : "login");
  };

  const handleLogin = () => {
    const body = {
      email,
      password,
    };
    console.log(body);
    auth.signInWithEmailAndPassword(body.email, body.password).catch((err) => {
      alert(err.message);
    });
  };

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert("Passwords must be same!");
    } else {
      // CONTINUE WITH SIGNUP
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          return db
            .collection("users")
            .doc(user.user.uid)
            .set({
              name: name,
              email: email,
            })
            .then(() => {
              return user.user.updateProfile({
                displayName: name,
              });
            });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <div className="login">
      <Navbar loginScreen={true} />
      <div className="login__body">
        <div className="login__body__form">
          <Button
            title={currentUserStatus === "login" ? "Create Account" : "Login"}
            type="secondary"
            onClick={handleRegistrationToggle}
          />
          <div className="login__body__formBody">
            <h3>
              {currentUserStatus === "login" ? "Login" : "Create Account"}
            </h3>
            {currentUserStatus === "register" && (
              <TextField
                label="Name"
                variant="filled"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <TextField
              label="Email"
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {PasswordField("password")}
            {currentUserStatus === "register" && (
              <TextField
                label="Confirm Password"
                variant="filled"
                type="password"
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
            )}
            <div className="login__body__formbody__actions">
              {currentUserStatus === "login" ? <p>Forgot Password</p> : <p></p>}
              <Button
                title={currentUserStatus === "login" ? "Login" : "Sign Up"}
                type="primary"
                onClick={
                  currentUserStatus === "login" ? handleLogin : handleSignup
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
