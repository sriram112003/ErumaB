import React, { useState, useRef, useEffect } from "react";
import "./Coupon.css";
import { useNavigate } from "react-router-dom";
import song from "./Images/Dandelions.mp3";

const promises = [
  "Tap gently.\nThese are promises — not meant to be rushed.",

  "I promise you endless hugs - given truly, whenever you need them.",
  "I promise to be a safe place for your rants, your storms, and your unfiltered truths - without judgement.",
  "I promise laughter that finds us unexpectedly, even on ordinary days.",
  "I promise to show up - even on the days I don’t have all the answers.",
  "I promise to hold your hand through the messy parts, not just the beautiful ones.",
  "I promise effort, honesty, and growth — not perfection.",
  "I promise that one day, we’ll sit somewhere quiet, doing nothing - and it will be enough.",
  "I promise that whenever you feel low, I’ll bring bad jokes, good company, and myself - always.",
  "I promise to be a place you can rest, not a place you have to perform.",

  "That’s all of them.\nBut I’ll keep choosing you — every day."
];

const Coupon = () => {
  const [current, setCurrent] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const audioRef = useRef(null);
  const navigate = useNavigate();
  const total = promises.length;

  /* 🎵 AUDIO AUTO START */
  useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  let unlockHandler = null;

  const tryPlay = async () => {
    try {
      audio.playbackRate = 0.95; // vibe calibrated
      await audio.play();
    } catch {
      unlockHandler = () => {
        audio.play().catch(() => {});
        window.removeEventListener("pointerdown", unlockHandler);
      };

      window.addEventListener("pointerdown", unlockHandler);
    }
  };

  tryPlay();

  return () => {
    audio.pause();
    audio.currentTime = 0;

    if (unlockHandler) {
      window.removeEventListener("pointerdown", unlockHandler);
    }
  };
}, []);


  const advance = () => {
    if (current < total - 1) {
      setCurrent(prev => prev + 1);
    }
  };

  const confirmReturn = () => {
    setShowDialog(false);
    setShowLoading(true);

    setTimeout(() => {
      navigate("/scratch");
    }, 3000);
  };

  return (
    <div className="coupon-page">

      {/* 🎵 Background Music */}
      <audio ref={audioRef} src={song} loop />

      {/* Background layers */}
      <div className="promise-motif" />
      <div className="promise-lines" />

      <div className="promise-hearts">
        <span />
        <span />
      </div>

      <div className="coupon-layout">

        {/* LEFT */}
        <div className="coupon-left glass-panel">
          <h1>Promises, sealed</h1>
          <p>
            These aren’t coupons. <br />
            They’re pieces of me, folded carefully. <br />
            Take them one by one.
          </p>
        </div>

        {/* RIGHT */}
        <div className="promise-area">
          <div className="promise-stack">
            {promises.map((text, i) => {
              const offset = i - current;
              const isTop = i === current;
              const isFinal = i === total - 1;

              return (
                <div
                  key={i}
                  className={`promise-card ${isFinal ? "final" : ""}`}
                  onClick={isTop && !isFinal ? advance : undefined}
                  style={{
                    transform: `
                      translateY(${offset * 12}px)
                      rotate(${offset * -1.2}deg)
                      scale(${1 - Math.abs(offset) * 0.03})
                    `,
                    opacity: offset < -1 ? 0 : 1,
                    zIndex: total - Math.abs(offset),
                    pointerEvents: isTop || isFinal ? "auto" : "none"
                  }}
                >
                  <p>{text}</p>

                  {i === 0 && (
                    <span className="hint">tap the card 🤍</span>
                  )}

                  {isFinal && (
                    <button
                      className="restart-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDialog(true);
                      }}
                    >
                      <span className="btn-main">← Go Back </span>
                      <span className="btn-sub">to the Scratch Cards</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* DIALOG */}
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <p className="dialog-text">
              These weren’t promises made to impress. <br />
              They were made to stay — on easy days and difficult ones. <br /><br />
              If I keep showing up like this,  
              will you meet me there too? <br /><br />
              You’ve got only one option — yes.
            </p>
            <center>
              <button className="restart-btn" onClick={confirmReturn}>
                <span className="btn-main">Yes</span>
                <span className="btn-sub">let’s continue</span>
              </button>
            </center>
          </div>
        </div>
      )}

      {/* LOADING */}
      {showLoading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <div className="loading-dots">
              <span />
              <span />
              <span />
            </div>
            <p>
              Just a moment… <br />
              Are you ready for the next scratch card?
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coupon;
