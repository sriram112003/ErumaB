import ScratchCard from "./ScratchCard.jsx";
import "./ScratchPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import img1 from "./Images/Flower.png";
import img2 from "./Images/Promise.png";
import img3 from "./Images/ib.jpeg";
import song from "./Images/bells.mp3";

const ScratchPage = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  /* 🎵 AUDIO AUTO START */
  useEffect(() => {
    const tryPlay = async () => {
      try {
        audioRef.current.playbackRate = 0.95; // adjust mood tempo
        await audioRef.current.play();
      } catch {
        const unlock = () => {
          audioRef.current.play();
          window.removeEventListener("click", unlock);
        };
        window.addEventListener("click", unlock);
      }
    };

    tryPlay();

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const NextPage = () => {
    setTimeout(() => {
      navigate("/memories");
    }, 1500);
  };

  return (
    <div className="scratch-page">

      {/* 🎵 Background Music */}
      <audio ref={audioRef} src={song} loop />

      <div className="scratch-title">
        <h1>A Room of Little Surprises</h1>
        <p>Some moments are meant to be discovered.</p>
      </div>

      {/* Cinematic background layers */}
      <div className="bg-aurora" />
      <div className="bg-particles" />
      <div className="bg-light-sweep" />
      <div className="bg-vignette" />

      <ScratchCard
        image={img2}
        onReveal={() => navigate("/coupon")}
      />

      <ScratchCard
        image={img1}
        onReveal={() => navigate("/bouquet")}
      />

      <ScratchCard
        image={img3}
        onReveal={() => navigate("/ibaco")}
      />

      <button className="next-btn" onClick={NextPage}>
        Next Page
      </button>

    </div>
  );
};

export default ScratchPage;
