import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const MonthCard = ({ data, side, locked, onUnlock }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (locked) return;
    setOpen(!open);
    if (!open) onUnlock();
  };

  return (
    <motion.div
      className={`timeline-item ${side} tone-${data.tone} ${locked ? "locked" : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className={`dot ${data.final && open ? "final-dot" : ""}`} />

      <motion.div
        className={`card tone-${data.tone}`}
        onClick={handleClick}
        whileHover={!locked ? { y: -4 } : {}}
        animate={{
          scale: open && data.final ? 1.06 : open ? 1.02 : 1
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2>{data.month}</h2>
        <span>{data.teaser}</span>

        <AnimatePresence>
          {open && (
            <motion.div
              className="story open"
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

        {locked && <div className="lock-overlay">Locked</div>}
      </motion.div>
    </motion.div>
  );
};
export default MonthCard;