import React, { useEffect, useState } from "react";
import "./Closure.css";

export default function ClosurePage() {

  const [showPrelude, setShowPrelude] = useState(false);
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [showMicro, setShowMicro] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [blackout, setBlackout] = useState(false);
  const [chapter, setChapter] = useState(false);
  const [chapterTwo, setChapterTwo] = useState(false);

  useEffect(() => {

    document.body.style.overflow = "hidden";

    const t0 = setTimeout(() => setShowPrelude(true), 400);
    const t1 = setTimeout(() => setShowLine1(true), 2000);
    const t2 = setTimeout(() => setShowLine2(true), 4200);
    const t3 = setTimeout(() => setShowFinal(true), 6800);
    const t4 = setTimeout(() => setShowMicro(true), 9200);
    const t5 = setTimeout(() => setShowEnd(true), 12500);
    const t6 = setTimeout(() => setBlackout(true), 17000);
    const t7 = setTimeout(() => setChapter(true), 19500);
    const t8 = setTimeout(() => setChapterTwo(true), 21500);

    return () => {
      document.body.style.overflow = "auto";

      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(t8);
    };

  }, []);

  return (
    <div className="closure-page">

      {/* Atmosphere */}
      <div className="closure-atmosphere" />
      <div className="closure-noise" />

      {/* TEXT */}
      <div className="closure-content">

        <p className={`closure-prelude ${showPrelude ? "show" : ""}`}>
          A year passed.<br/>
          And somehow… we are still here.
        </p>

        <p className={`closure-line ${showLine1 ? "show" : ""}`}>
          In a life where so much kept changing…<br/>
          <span className="highlight">
            you stayed.
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
          Of all the paths life could have taken…<br/>
          I’m grateful it led me to you.
        </p>

        <p className={`closure-micro ${showMicro ? "show" : ""}`}>
          You arrived quietly… and changed everything.
        </p>

        <p className={`closure-end ${showEnd ? "show" : ""}`}>
          This is where our little story rests…<br/>
          but not where it ends.
        </p>

      </div>

      {/* FULL BLACKOUT */}
      <div className={`true-black ${blackout ? "visible" : ""}`} />

      {/* FINAL CARD */}
      <div className={`chapter-one ${chapter ? "visible" : ""}`}>
        <div style={{ textAlign: "center" }}>
          <div style={{ textDecoration: "line-through", opacity: 0.6 }}>
            End of Chapter One.
          </div>

          <div
            style={{
              marginTop: "18px",
              fontSize: "22px",
              letterSpacing: "1.4px",
              opacity: chapterTwo ? 1 : 0,
              transform: chapterTwo ? "translateY(0)" : "translateY(12px)",
              transition: "all 2.2s cubic-bezier(.22,1,.36,1)"
            }}
          >
            Chapter Two…
          </div>
        </div>
      </div>

    </div>
  );
}
