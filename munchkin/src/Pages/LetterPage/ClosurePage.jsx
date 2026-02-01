import React, { useEffect, useState } from "react";
import "./Closure.css";

export default function ClosurePage() {

  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [showMicro, setShowMicro] = useState(false);
  const [afterglow, setAfterglow] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setShowLine1(true), 800);
    const t2 = setTimeout(() => setShowLine2(true), 2600);
    const t3 = setTimeout(() => setShowFinal(true), 4800);
    const t4 = setTimeout(() => setShowMicro(true), 7000);
    const t5 = setTimeout(() => setAfterglow(true), 18000);
    clearTimeout(t5);


    return () => {
      document.body.style.overflow = "auto";
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
  <div className={`closure-page ${afterglow ? "afterglow" : ""}`}>

      {/* 🌑 atmospheric background */}
      <div className="closure-atmosphere" />
      <div className="closure-noise" />
    <div className="world-dim"></div>
    <div className="final-dim"></div>


      {/* ✨ text */}
    <div className={`closure-content ${afterglow ? "afterglow" : ""}`}>

        <p className={`closure-line ${showLine1 ? "show" : ""}`}>
          In a world full of temporary things…
          <br/>
          <span className="highlight">
            you became my constant.
          </span>
        </p>

        <p className={`closure-line ${showLine2 ? "show" : ""}`}>
          Some people become memories.<br/>
          Some become lessons.<br/>
          <span className="highlight">
            You became home.
          </span>
        </p>

        <p className={`closure-final ${showFinal ? "show" : ""}`}>
          I’m really glad it was you.
        </p>

        <p className={`closure-micro ${showMicro ? "show" : ""}`}>
          Life got better when you walked into it.
        </p>

      </div>
    </div>
  );
}
