import React from "react";
import Button from "@material-ui/core/Button";

// CSS
import "./Button.css";

function GlobalButton({ title, type, onClick }) {
  return (
    <Button
      onClick={onClick}
      size="medium"
      className={`global__button ${type}`}
    >
      {title}
    </Button>
  );
}

export default GlobalButton;
