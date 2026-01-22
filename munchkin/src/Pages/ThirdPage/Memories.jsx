import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./MemoryBook.css";

const memories = [
  {
    month: "February 2025",
    teaser: "Where everything learned how to begin.",
    story: "This was the month we stopped being careful and started being honest.",
    image: "/images/feb-2025.jpg",
    tone: "rose"
  },
  {
    month: "March 2025",
    teaser: "Quiet reassurances, loud meanings.",
    story: "We didn’t talk about forever. We just stayed.",
    image: "/images/mar-2025.jpg",
    tone: "sage"
  },
  {
    month: "April 2025",
    teaser: "Small moments, lasting weight.",
    story: "Nothing dramatic happened. And yet, everything mattered.",
    image: "/images/apr-2025.jpg",
    tone: "lavender"
  },
  {
    month: "May 2025",
    teaser: "When comfort became certainty.",
    story: "The chaos softened. The bond didn’t.",
    image: "/images/may-2025.jpg",
    tone: "peach"
  },
  {
    month: "June 2025",
    teaser: "Halfway to something deeper.",
    story: "Understanding replaced guessing.",
    image: "/images/jun-2025.jpg",
    tone: "sand"
  },
  {
    month: "July 2025",
    teaser: "Love, tested by time.",
    story: "Busy days. Tired nights. Still choosing each other.",
    image: "/images/jul-2025.jpg",
    tone: "amber"
  },
  {
    month: "August 2025",
    teaser: "When laughter returned easily.",
    story: "Comfort felt natural again.",
    image: "/images/aug-2025.jpg",
    tone: "gold"
  },
  {
    month: "September 2025",
    teaser: "Growing, separately. Staying, together.",
    story: "Independence strengthened us.",
    image: "/images/sep-2025.jpg",
    tone: "olive"
  },
  {
    month: "October 2025",
    teaser: "Unspoken understanding.",
    story: "A look said everything.",
    image: "/images/oct-2025.jpg",
    tone: "rust"
  },
  {
    month: "November 2025",
    teaser: "Gratitude disguised as love.",
    story: "Thankful without needing a reason.",
    image: "/images/nov-2025.jpg",
    tone: "mocha"
  },
  {
    month: "December 2025",
    teaser: "Ending the year, not the warmth.",
    story: "Love stayed steady.",
    image: "/images/dec-2025.jpg",
    tone: "winter"
  },
  {
    month: "January 2026",
    teaser: "Proof that we lasted.",
    story: "Not perfect. But real.",
    image: "/images/jan-2026.jpg",
    tone: "smoke"
  },
  {
    month: "February 2026",
    teaser: "Where the beginning learned how to stay.",
    story:
      "A year later, we’re still here. Not because it was easy — but because it was worth choosing.",
    image: "/images/feb-2026.jpg",
    tone: "golden",
    final: true
  }
];


const MemoryBook = () => {
  const [unlockedIndex, setUnlockedIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const finalRef = useRef(null);

  useEffect(() => {
    if (unlockedIndex === memories.length - 1) {
      finalRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [unlockedIndex]);

  const handleOpen = (index) => {
    if (index > unlockedIndex) return;

    setActiveIndex(index);
    if (index === unlockedIndex) {
      setUnlockedIndex(unlockedIndex + 1);
    }
  };

  return (
    <div className={`memory-book ${unlockedIndex === memories.length - 1 ? "final-mode" : ""}`}>
      <header className="header">
        <h1>Our First Year</h1>
        <p>Not measured in days. Measured in moments.</p>
      </header>

      <div className="timeline">
        {memories.map((item, index) => (
          <div key={index} ref={item.final ? finalRef : null}>
            <MonthCard
              data={item}
              side={index % 2 === 0 ? "left" : "right"}
              isOpen={activeIndex === index}
              onClick={() => handleOpen(index)}
            />
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>This wasn’t a year. It was a beginning that learned how to stay.</p>
      </footer>
    </div>
  );
};

const MonthCard = ({ data, side, isOpen, onClick }) => {
  return (
    <motion.div
      className={`timeline-item ${side}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className={`dot ${data.final && isOpen ? "final-dot" : ""}`} />

      <motion.div
        className="card"
        onClick={onClick}
        animate={{ scale: isOpen && data.final ? 1.08 : isOpen ? 1.03 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{data.month}</h2>
        <span>{data.teaser}</span>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="story-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: data.final ? 0.4 : 0.15 }}
            >
              {data.image && (
                <motion.img
                  src={data.image}
                  alt={data.month}
                  className={`memory-image ${data.final ? "final-image" : ""}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              )}
              <p>{data.story}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default MemoryBook;
