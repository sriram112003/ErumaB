import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import "./ScratchCard.css";

const ScratchCard = ({ image, onReveal }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let drawing = false;
    let lastPoint = null;

    const setupCanvas = () => {
      const w = img.clientWidth;
      const h = img.clientHeight;
      if (!w || !h) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* 🌸 PINK FOIL BASE */
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "#fdecef");
      gradient.addColorStop(0.3, "#f7c8d8");
      gradient.addColorStop(0.6, "#fbe1ea");
      gradient.addColorStop(1, "#e6a9bd");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      /* 🌸 PINK FOIL NOISE */
      for (let i = 0; i < 1400; i++) {
        ctx.fillStyle = `rgba(255,220,230,${Math.random() * 0.35})`;
        ctx.fillRect(
          Math.random() * w,
          Math.random() * h,
          1,
          1
        );
      }

      ctx.globalCompositeOperation = "destination-out";
    };

    const getPos = (e) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const scratch = (x, y) => {
      if (!lastPoint) lastPoint = { x, y };

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 42;

      /* 🌸 PINK SCRATCH GLOW */
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(255,170,200,0.6)";
      ctx.strokeStyle = "rgba(0,0,0,0.85)";

      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      lastPoint = { x, y };
    };

    const checkReveal = () => {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let cleared = 0;

      for (let i = 3; i < data.length; i += 4) {
        if (data[i] === 0) cleared++;
      }

      const percent = (cleared / (canvas.width * canvas.height)) * 100;

      if (percent > 38 && !revealed) {
        setRevealed(true);
        fireConfetti();
        setTimeout(() => onReveal?.(), 700);
      }
    };

    const fireConfetti = () => {
      const r = containerRef.current.getBoundingClientRect();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: {
          x: (r.left + r.width / 2) / window.innerWidth,
          y: (r.top + r.height / 2) / window.innerHeight,
        },
      });
    };

    const down = (e) => {
      if (revealed) return;
      drawing = true;
      scratch(...Object.values(getPos(e)));
    };

    const move = (e) => {
      if (!drawing || revealed) return;
      scratch(...Object.values(getPos(e)));
    };

    const up = () => {
      drawing = false;
      lastPoint = null;
      ctx.shadowBlur = 0;
      checkReveal();
    };

    if (img.complete) setupCanvas();
    else img.onload = setupCanvas;

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);

    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [revealed, onReveal]);

  return (
    <div ref={containerRef} className="scratch-card">
      <img
        ref={imageRef}
        src={image}
        alt="Hidden"
        className="scratch-image"
        draggable={false}
      />

      <canvas
        ref={canvasRef}
        className={`scratch-canvas ${revealed ? "hidden" : ""}`}
      />
    </div>
  );
};

export default ScratchCard;
  