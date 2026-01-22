import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IbacoPage.css";
import illustration from "./Images/brindadoodle.jpeg";

const IbacoPage = () => {
  const navigate = useNavigate();

  const [showDialog, setShowDialog] = useState(false);
  const [revealSurprise, setRevealSurprise] = useState(false);

  const handleButtonClick = () => {
    setShowDialog(true);
    setRevealSurprise(false);

    setTimeout(() => {
      setRevealSurprise(true);
    }, 1800);
  };

  const handleFinalBack = () => {
    setShowDialog(false);
    navigate("/letter");
  };

  return (
    <div className="ibaco-page">
      {/* LEFT CARD */}
      <div className="quote-card">

        <h1 className="headline">
          Proof That I’d Get You Ibaco Anywhere.
        </h1>

        <p className="subtext">
          I couldn’t hand you Ibaco in person,
          so I hacked the system and delivered it digitally—
          zero calories, 100% me being obsessed with you.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-section">
        <div className="illustration-wrap">
          <img src={illustration} alt="Ibaco Illustration" />
        </div>

        <button className="back-btn" onClick={handleButtonClick}>
          Go back to scratch cards
        </button>
      </div>

      {/* DIALOG */}
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            {!revealSurprise ? (
              <p className="dialog-text wait">Wait a minute…</p>
            ) : (
              <>
                <p className="dialog-text">
                  This is not just a virtual ice cream.
                  <br /><br />
                  There is real ice cream that I ordered for you.
                  <br />
                  It’s already waiting in your fridge.
                  <br /><br />
                  Finish this surprise,
                  <br />
                  then go have it. 🍨💗
                </p>

                <button className="dialog-btn" onClick={handleFinalBack}>
                  Now go back
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IbacoPage;
