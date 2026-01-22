import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./BouquetPage.css";
import bouquetImg from "./Images/Flower.png";

const flowerData = {
  rose: {
    name: "You became my calm without even trying.",
    points: [
      "In a life full of noise and unanswered questions, you felt like stillness. Talking to you slowed my thoughts, steadied my heart, and made the world feel less overwhelming."
    ]
  },
  daisy: {
    name: "You saw me when I felt unseen.",
    points: [
      "When I didn’t know how to ask for care, you offered it anyway—through small check-ins, quiet concern, and the simple act of remembering me."
    ]
  },
  ranunculus: {
    name: "You made space for my pain without being afraid of it.",
    points: [
      "You never treated my grief like something uncomfortable or inconvenient. You let it exist between us, and by doing so, you helped me breathe through it."
    ]
  },
  dahlia: {
    name: "You felt like home in human form.",
    points: [
      "Not loud, not dramatic—just familiar, safe, and grounding. Being with you felt like returning to a place where I didn’t have to explain myself."
    ]
  },
  tulip: {
    name: "You changed me in ways I’ll always carry.",
    points: [
      "Because of you, I learned how connection can heal, how kindness can rebuild, and how love can exist quietly—without conditions or expectations."
    ]
  }
};

export default function BouquetPage() {
  const navigate = useNavigate();

  const [activeFlower, setActiveFlower] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const [pathData, setPathData] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  const svgRef = useRef(null);
  const dialogRef = useRef(null);

  const markerRefs = {
    rose: useRef(),
    daisy: useRef(),
    ranunculus: useRef(),
    dahlia: useRef(),
    tulip: useRef()
  };

  /* =========================
     FLOWER REVEAL (NO LOADER)
  ========================= */
  const handleFlowerClick = (key) => {
    setHasStarted(true);
    setActiveFlower(key);

    requestAnimationFrame(() => {
      const marker = markerRefs[key].current;
      const dialog = dialogRef.current;
      const svg = svgRef.current;

      if (!marker || !dialog || !svg) return;

      const m = marker.getBoundingClientRect();
      const d = dialog.getBoundingClientRect();
      const s = svg.getBoundingClientRect();

      const startX = m.left + m.width / 2 - s.left;
      const startY = m.top + m.height / 2 - s.top;

      const endX = d.left - s.left;
      const endY = d.top + d.height / 2 - s.top;

      const c1X = startX + 120;
      const c1Y = startY;
      const c2X = endX - 120;
      const c2Y = endY;

      setPathData(
        `M ${startX} ${startY}
         C ${c1X} ${c1Y},
           ${c2X} ${c2Y},
           ${endX} ${endY}`
      );

      setEndPoint({ x: endX, y: endY });
    });
  };

  /* =========================
     BACK TO LETTER (WITH LOADER)
  ========================= */
  const handleBackToLetter = () => {
    setShowLoading(true);

    setTimeout(() => {
      navigate("/letter");
    }, 1500);
  };

  return (
    <div className="bouquet-page">

      {/* LOADING OVERLAY — ONLY FOR BACK BUTTON */}
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

      {/* SVG STRING */}
      <svg
        ref={svgRef}
        className="string-layer"
        width="100%"
        height="100%"
        viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
        preserveAspectRatio="none"
      >
        {pathData && (
          <>
            <path d={pathData} className="string-path" />
            <path d={pathData} className="string-pulse" />
            {endPoint && (
              <circle
                cx={endPoint.x}
                cy={endPoint.y}
                r="6"
                className="spark"
              />
            )}
          </>
        )}
      </svg>

      {/* LEFT */}
      <div className="bouquet-left">
        <img src={bouquetImg} alt="Bouquet" className="bouquet-img" />

        <button ref={markerRefs.rose} className="marker rose" onClick={() => handleFlowerClick("rose")} />
        <button ref={markerRefs.daisy} className="marker daisy" onClick={() => handleFlowerClick("daisy")} />
        <button ref={markerRefs.ranunculus} className="marker ranunculus" onClick={() => handleFlowerClick("ranunculus")} />
        <button ref={markerRefs.dahlia} className="marker dahlia" onClick={() => handleFlowerClick("dahlia")} />
        <button ref={markerRefs.tulip} className="marker tulip" onClick={() => handleFlowerClick("tulip")} />
      </div>

      {/* RIGHT */}
      <div className="bouquet-right">

        {/* HEADER */}
        <div className={`right-header ${hasStarted ? "pinned" : ""}`}>
          <h1 className="intro-title">
            Tadaaaa ✨  
            <br />
            Here is your virtual bouquet
          </h1>

          {!hasStarted && (
            <>
              <p className="intro-subtitle">
                Here are five reasons that come to the top of my mind
                <br />
                why you’re one of my favourite people 💛
              </p>
              <p className="intro-subtitleA">(tap a flower to see more)</p>
            </>
          )}
        </div>

        {/* DIALOG */}
        {activeFlower && (
          <div ref={dialogRef} className="dialog-box">
            <h2>{flowerData[activeFlower].name}</h2>
            <ul>
              {flowerData[activeFlower].points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        )}

        {/* BACK BUTTON */}
        <button
          className="back-button"
          onClick={handleBackToLetter}
        >
          ← Back to the Scratch Cards
        </button>

      </div>
    </div>
  );
}
