import { motion, AnimatePresence } from "framer-motion";
import { useRef, useLayoutEffect } from "react";

const MonthCard = ({ data, side, isOpen, onClick }) => {
  const dotRef = useRef(null);
  const wasOpenRef = useRef(false);

  useLayoutEffect(() => {
    // Scroll ONLY when opening for the first time
    if (isOpen && !wasOpenRef.current) {
      dotRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  return (
    <motion.div
      className={`timeline-item ${side} tone-${data.tone}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* 🔑 FIXED ANCHOR */}
      <div
        ref={dotRef}
        className={`dot ${data.final && isOpen ? "final-dot" : ""}`}
      />

      <motion.div
        className={`card tone-${data.tone}`}
        onClick={onClick}
        animate={{
          scale: isOpen && data.final ? 1.06 : isOpen ? 1.02 : 1
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2>{data.month}</h2>
        <span>{data.teaser}</span>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="story-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                duration: 0.8,
                delay: data.final ? 0.4 : 0.15
              }}
            >
              <p>{data.story}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default MonthCard;
