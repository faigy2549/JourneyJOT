import * as React from "react";
import "./style sheets/FriendlyError.css"
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";



export const FriendlyError = ({
  message,
  link,
  linkText,
  blank = false,
}) => {
  const navigate = useNavigate();


  const handleClick = () => {
    if (linkText?.includes("information") && link) {
      !blank ? (window.location.href = link) : window.open(link, "_blank");
    } else {
      link && navigate(link)
      if (linkText === "Projects") {
        window.location.reload();
      }
    }
  };

  return (
    <div className="friendlyMessage">
      <div>
        <span
          className={
            message.includes("activity") ? "offer" : "errorMessage"
          }
        >
          {message}
        </span>
      </div>
      {link && link !== "" && (
        <div>
          <Button
            color="secondary"
            className="button"
            onClick={handleClick}
          >
            {linkText}
          </Button>
        </div>
      )}
    </div>
  );
};
