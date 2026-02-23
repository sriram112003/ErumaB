import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Scrapbook.css";

/* ============================= */
/* IMPORT COVER IMAGES */
/* ============================= */

import MainCover from "./Images/Cover.png";
import CuteCover from "./Images/Cover1.jpeg";
import SelfieCover from "./Images/SelfieCover.png";
import UsCover from "./Images/Together.png";
import end from "./Images/End.jpeg";
import song from "./Images/Photograph.mp3";

/* ============================= */
/* CAPTIONS PER IMAGE FILE */
/* ============================= */

const captions = {
  Cute: {
    1: "that cuteness",
    2: "yellow days",
    3: "soft moments",
    4: "just you",
    5: "thumbs up",
    6: "happy you",
    7: "tired days",
    8: "lazy you",
    9: "lovely days",
    10: "silly faces",
    11: "pookie",
    12: "cute uhh",
    13: "soft smiles",
    14: "simple joy",
    15: "pretty you",
    16: "funnily cute"
  },

  Selfie: {
    1: "mirror check",
    2: "casual vibes",
    3: "soft flex",
    4: "selfie snaps",
    5: "that glow",
    6: "pure chaos",
    7: "cozy look",
    8: "unbothered",
    9: "vibe check",
    10: "self love",
    11: "casual slay",
    12: "Sassy you",
    13: "daily mood",
    14: "soft focus",
    15: "reflection",
    16: "just you"
  },

  Us: {
    1: "us, just being us",
    2: "always",
    3: "memories catching up",
    4: "pure chaos",
    5: "together",
    6: "our place",
    7: "forever",
    8: "still us"
  }
};

/* ============================= */
/* CHAPTER CONFIG */
/* ============================= */

const chapters = [
  {
    title: "Cute uhhh",
    path: "Images/Cute",
    imageCount: 16,
    coverImage: CuteCover
  },
  {
    title: "Mirror selfies",
    path: "Images/Selfie",
    imageCount: 16,
    coverImage: SelfieCover
  },
  {
    title: "Together us",
    path: "Images/Us",
    imageCount: 8,
    coverImage: UsCover
  }
];

/* ============================= */
/* UTILS */
/* ============================= */

function chunk(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

/* ============================= */
/* BUILD PAGES */
/* ============================= */

const pages = [
  { type: "cover" },

  ...chapters.flatMap(chapter => {
    const folderName = chapter.path.split("/").pop();

    const images = Array.from(
      { length: chapter.imageCount },
      (_, i) => ({
        src: `/${chapter.path}/${i + 1}.jpeg`,
        caption: captions[folderName]?.[i + 1] || "♡ us ♡"
      })
    );

    return [
      { type: "chapter-cover", image: chapter.coverImage },

      ...chunk(images, 4).map(group => ({
        type: "photos",
        images: group
      }))
    ];
  }),

  { type: "end-cover", image: end }
];

/* ============================= */
/* COMPONENT */
/* ============================= */

export default function Scrapbook() {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  /* 🎵 Autoplay with graceful fallback */
  useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  let unlockHandler;

  const tryPlay = async () => {
    try {
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
    if (unlockHandler) {
      window.removeEventListener("pointerdown", unlockHandler);
    }
  };
}, []);


  return (
    <div className="wrapper">

      {/* Background Music */}
      <audio ref={audioRef} src={song} loop />

      <div className={`book ${currentPage === 0 ? "closed" : "open"}`}>
        {pages.map((page, index) => {
          const isCover = index === 0;

          return (
            <div
              key={index}
              className={`page
                ${isCover ? "cover-page" : ""}
                ${page.type === "chapter-cover" ? "chapter-cover" : ""}
                ${page.type === "end-cover" ? "end-cover" : ""}
                ${index < currentPage ? "flipped" : ""}
              `}
              style={{ zIndex: pages.length - index }}
            >
              <div className="book__page-front">
                {renderPage(page)}
              </div>

              {!isCover && <div className="book__page-back" />}
            </div>
          );
        })}
      </div>

      {/* Controls */}

      <div className="controls">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(p => p - 1)}
        >
          ◀ Prev
        </button>

        <button
          disabled={currentPage === pages.length - 1}
          onClick={() => setCurrentPage(p => p + 1)}
        >
          Next ▶
        </button>
      </div>

      {/* Floating Letter Button */}

      {currentPage === pages.length - 1 && (
        <button
          className="letter-float-btn"
          onClick={() => navigate("/letter")}
        >
          ✉ Open Letter
        </button>
      )}

    </div>
  );
}

/* ============================= */
/* RENDER PAGE */
/* ============================= */

function renderPage(page) {
  if (page.type === "cover") {
    return (
      <div className="cover-content">
        <img src={MainCover} alt="" className="cover-image" />
      </div>
    );
  }

  if (page.type === "chapter-cover") {
    return (
      <div className="cover-content">
        <img src={page.image} alt="" className="cover-image" />
      </div>
    );
  }

  if (page.type === "photos") {
    return (
      <div className="grid">
        {page.images.map((item, i) => (
          <div className="photo" key={i}>
            <img src={item.src} alt="" />
            <div className="photo-caption">{item.caption}</div>
          </div>
        ))}
      </div>
    );
  }

  if (page.type === "end-cover") {
    return (
      <div className="cover-content">
        <img src={page.image} alt="" className="cover-image" />
      </div>
    );
  }

  return null;
}
