import React, { useState, useEffect, useRef } from "react";
import "./HeartParachute.css";
import { useNavigate } from "react-router-dom";
import parachuteHeart from "./heartpara.png";
import bgMusic from "./bgsong.mp3";
// Polaroid images
import img1 from "./Images/1.jpeg";
import img3 from "./Images/13.jpeg";
import img4 from "./Images/12.jpeg";
import img2 from "./Images/2.jpeg";
import img5 from "./Images/15.jpeg";
import img6 from "./Images/16.jpeg";
import img7 from "./Images/7.jpeg";
import img8 from "./Images/8.jpeg";
import img9 from "./Images/9.jpeg";
import img10 from "./Images/10.jpeg";
import img11 from "./Images/11.jpeg";


const FirstPage = () => {
  const [opened, setOpened] = useState(false); // 🎁 gate
  const [openLetter, setOpenLetter] = useState(false);
  const audioRef = useRef(null);

  /* 🎈 Mouse parallax (only after reveal) */
  useEffect(() => {
    if (!opened) return;

    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;

      document.documentElement.style.setProperty("--mx", `${x}px`);
      document.documentElement.style.setProperty("--my", `${y}px`);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [opened]);
const navigate = useNavigate();

  /* 🎵 Start music on gift open (browser-safe) */
  const openGift = () => {
    setOpened(true);

    if (audioRef.current) {
      audioRef.current.volume = 0.65;
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="mail-page">
      {/* 🎵 Background music */}
      <audio ref={audioRef} src={bgMusic} loop />

      {/* 🎁 GIFT GATE */}
      {!opened && (
        <div className="gift-backdrop">
          <div className="gift-box" onClick={openGift}>
            <div className="gift-icon">🎁</div>
            <p className="gift-text">Tap to open</p>
          </div>
        </div>
      )}

      {/* EVERYTHING BELOW IS HIDDEN UNTIL GIFT OPENS */}
      {opened && (
        <>
          <div className="particles" />

          {/* 🖼️ Polaroid wall */}
          <div className={`polaroid-wall ${openLetter ? "paused" : ""}`}>
            <div className="string row row-1">
              <div className="polaroid"><img src={img1} alt="" /></div>
              <div className="polaroid"><img src={img3} alt="" /></div>
              <div className="polaroid"><img src={img7} alt="" /></div>
              <div className="polaroid"><img src={img8} alt="" /></div>
              <div className="polaroid"><img src={img2} alt="" /></div>
            </div>

            <div className="string row row-2">
              <div className="polaroid"><img src={img4} alt="" /></div>
              <div className="polaroid"><img src={img5} alt="" /></div>
              <div className="polaroid"><img src={img6} alt="" /></div>
              <div className="polaroid"><img src={img9} alt="" /></div>
              <div className="polaroid"><img src={img10} alt="" /></div>
              <div className="polaroid"><img src={img11} alt="" /></div>
            </div>
          </div>

          {/* 💌 Center */}
          <div className="mail-content">
            <div className="center-highlight">
              <div
                className="heart-balloon clickable"
                onClick={() => setOpenLetter(true)}
              >
                <img src={parachuteHeart} alt="" className="parachute-heart" />
                <div className="balloon-hint">This heart is carrying a secret…</div>
              </div>

              <h1 className="mail-text">
                Hey Eruma,
                <br />
                <span className="sub-line">Happy One Year to us !</span>
              </h1>
            </div>
          </div>
        </>
      )}

      {/* 💖 Letter Modal */}
      {openLetter && (
        <div className="modal-backdrop" onClick={() => setOpenLetter(false)}>
          <div
            className="letter-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>My Eruma,</h2>
            <p>
              Somewhere between ordinary days and quiet nights,
              you became my favorite constant.
              What waits ahead is made of quiet moments
              and feelings we never learned how to name.
              Are you ready to step into them?
            </p>
            <p className="signature">— Yours, Eruma 💗</p>
            <button
  onClick={() => {
    setOpenLetter(false);
    navigate("/scratch");
  }}
>
  Let's Go
</button>

          </div>
        </div>
      )}
    </div>
  );
};

export default FirstPage;
