import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LetterPage.css";
import envelopeImg from "./let.jpg";
import heartImg from "./heart.jpg";

export default function Letter() {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    if (!opened) setOpened(true);
  };

  return (
    <div className="letter-page">
      <h1 className="letter-title">
        A little something lives inside
      </h1>

      <div className="envelope-wrap">
        <img
          src={envelopeImg}
          alt="envelope"
          className="center-image"
        />

        {/* Heart seal */}
        <img
          src={heartImg}
          alt="heart"
          className={`heart-image ${opened ? "heart-clicked" : ""}`}
          onClick={handleOpen}
        />

        {/* Rising paper */}
        <div className={`paper ${opened ? "paper-rise" : ""}`}>
          <p className="paper-text">
            A letter waits for you…
          </p>

          <button
            className="read-btn"
            onClick={() => navigate("/full-letter")}
          >
            Read the letter
          </button>
        </div>
      </div>
    </div>
  );
}
