import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./MemoryBook.css";
import { useNavigate } from "react-router-dom";
import laptopImage from "./Images/Laptop.jpeg";
import WA from "./Images/WA.jpg";
import April from "./Images/April.jpeg";
import May from "./Images/May.jpeg";
import June from "./Images/June.jpeg";
import July from "./Images/july.jpg";
import August from "./Images/August.jpeg";
import September from "./Images/Sept.jpg";
import October from "./Images/October.jpeg";
import November from "./Images/Nov.jpeg";
import December from "./Images/Dec.jpeg";
import song from "./Images/memories_C.mp3";


const memories = [
  {
    month: "February 2025",
    teaser: "Where everything learned how to begin.",
    story: `When we first met, it was simple—almost ordinary. An unexpected encounter during a laptop collection at Accenture. We spoke for a bit, nothing dramatic, and then we went our own ways. At that moment, I didn’t know it would stay with me.

Later that evening, you messaged me. Just to ask if everything was okay. Such a small question, said so gently. But in that question, I felt care. I felt noticed. And something inside me shifted.

It didn’t feel like falling for you. It felt like recognizing you. Like something familiar quietly finding its place.

That’s how it began for me—not with certainty, not with grand feelings, but with your concern. And somehow, that was enough.`,
    image: laptopImage,
    tone: "rose"
  },
  {
    month: "March 2025",
    teaser: "The month you became my safe place.",
story: `March is when you slowly became part of my everyday life. We spoke for hours: ten, sometimes twelve—and it never felt exhausting. It felt necessary. I told you about my happy days, my sad ones, and even the dark parts I rarely let anyone see. With you, I didn’t feel the need to hide.

We spoke about friends, family, and the stories that shaped us. You listened in a way that made me feel understood, not judged. Somewhere between those endless conversations, trust settled in quietly. March became the month our bond was defined, the moment I realized you felt like home.`,    
image: WA,
    tone: "sage"
  },
  {
    month: "April 2025",
    teaser: "When distance appeared, but leaving didn’t.",
story: `April is when I knew this was going to last. Your family was going through a lot then, especially with your brother, and I remember wanting to be there for you in whatever way I could. I hope I was there when you needed me, even if it was only through words and quiet reassurance.

By the end of April, life moved us to different cities, you to Bengaluru, me to Mumbai, for our internships. That’s when our long texts slowly turned into calls. Hearing your voice became important. It felt closer, more real. Even with the distance, we didn’t drift.

April taught me something simple and certain: this wasn’t about place. It was about choosing each other, even when life tried to separate us.`,    
image: April,
    tone: "sage"
  },
  {
    month: "May 2025",
    teaser: "The nights that felt like ours.",
story: `May is when you let me see the parts of you that you usually keep hidden. Your vulnerable side. The nights slowly became our time—quiet, unhurried, just us. We spoke for hours, sharing everything, until your voice softened and I knew you were about to fall asleep. Being there with you, even from far away, felt like the most peaceful place I could be.

We told each other everything then—every small detail of our days, every thought that crossed our minds. Nothing felt too trivial to share. Those were genuinely happy days, the kind I find myself longing for even now.

May wasn’t about big moments. It was about closeness. About comfort. About being there for each other in the simplest, truest way.`,    
    image: May,
    tone: "peach"
  },
  {
    month: "June 2025",
    teaser: "The month I realized how deeply you lived in me.",
story: `June is when I saw you break for the first time. That night you called and said something—something I wasn’t prepared for. And before I even understood it fully, I found myself crying. More than you. That scared me a little. Because that’s when I realized how much you meant to me, how deeply you had already found your place in my heart.

Those days that followed were heavy. Nights filled with consolation, long calls, and life talks that stretched until sleep finally found us. I tried to be there for you in every way I could. I don’t know if I did enough, but I hope you felt my presence, my care, my wanting to hold you together when things felt like they were falling apart.

And then, at the end of June, I came to see you. Finally. We spent the night roaming around Bengaluru like mad people—laughing, talking, forgetting time. After everything, that night felt like relief. Like proof.

June showed me love isn’t just about happy moments. It’s about staying when it hurts. And that month, I knew—I wasn’t going anywhere.`,    
image: June,
    tone: "sand"
  },
  {
    month: "July 2025",
    teaser: "A month of return, absence, and quiet strength.",
    story: `July is when we both came back home after our internships ended. On the outside, things looked settled, but inside, I was going through a lot. Too many things were happening in my life at once, and for the first time, I felt your absence a little more than I was ready for. Not in a dramatic way—just in the quiet moments when I wished you were closer.

This month holds a different kind of place in my heart. I grew closer and stronger with Preethi akka, and that support meant more to me than I can ever fully explain. July wasn’t easy, and maybe that’s why it stays with me. It was messy, uncertain, and heavy, but it shaped me.

I don’t know what else to say about July, except this: it mattered. It marked the beginning of those three months. A shift. A phase. Something that quietly prepared us for what was coming next.`,
    image: July,
    tone: "amber"
  },
  {
    month: "August 2025",
    teaser: "The month distance finally hurt.",
    story: `August… oh August. You felt far, not just in miles, but in ways I didn’t know how to explain. I missed you constantly. In quiet moments. In crowded ones. In the spaces where your presence used to be.

I kept holding on, tighter than I ever had before. Some days, it felt like I was gripping a rope in the dark, afraid of what would happen if I loosened my hand even a little. I don’t know if you felt the same distance I did. I don’t know if you knew how much I ached.

All I know is this—I missed you. Deeply. Endlessly.
And August will always be the month that taught me how much loving you could hurt.`,
    image: August,
    tone: "gold"
  },
  {
    month: "September 2025",
    teaser: "When hope stayed, even as everything felt fragile.",
    story: `September felt numb. Not loud, not chaotic, just heavy in a way that slowly drained me. It often felt like everything was about to fall apart, yet my heart kept believing it wouldn’t. I held onto that belief more than anything else.

I would bring it up to you, usually once a week, late at night. I’d fight, not because I wanted to hurt you, but because I was scared of losing us. Each time, I’d walk away with hope, thinking things would get better. And each time, they stayed the same. The disappointment didn’t come all at once—it arrived quietly, again and again.

I don’t know what else to say about September. It was a month of waiting, believing, and feeling tired all at once. A month where my heart refused to give up, even when it was hurting.`,
    image: September,
    tone: "olive"
  },
  {
    month: "October 2025",
    teaser: "When things slowly began to heal.",
    story: `October felt like a pause after a long ache. We both joined as FTEs, our first jobs and for a moment, it felt right to say cheers to us. A new beginning, earned and shared, even from different cities. You were back in Bengaluru, and I was still in Mumbai, but somehow the distance didn’t feel as heavy this time.

You started calling again, like the good old days. Hearing your voice brought a quiet sense of relief I didn’t know I needed so badly. Things weren’t perfect, but they were gentler. Lighter. And for the first time in a while, I felt like we were finding our way back to each other.

October didn’t fix everything. But it healed enough to let me breathe again.`,
    image: October,
    tone: "rust"
  },
  {
    month: "November 2025",
    teaser: "Healing, wrapped in small joys.",
    story: `November felt gentler than the months before it. My birthday came around, and for the first time, my girl gifted me something. It wasn’t just a gift—it felt like reassurance, like a quiet sign that we were finding our way back on track. The wounds were still there, but they were healing, slowly and honestly.

Around that time, I also became a little easier on myself. I was tired—tired of holding the rope so tightly, afraid of what might happen if I let go. So I loosened my grip. I passed the baton to you, trusting you to hold it for a while, because I didn’t have the strength to keep carrying everything alone anymore.

And then I came to meet you again, for the second time. We finally had our us time. We spoke about those past three months—the pain, the distance, the effort it took to stay. Saying it out loud made it lighter. Being with you made it feel possible.

November taught me that healing isn’t about holding on harder. Sometimes, it’s about trusting enough to let go—and believing the other person will stay.`,
    image: November,
    tone: "mocha"
  },
  {
    month: "December 2025",
    teaser: "When it started feeling like home again.",
    story: `December felt easier. Lighter. Like the weight I had been carrying for months was finally easing off. We weren’t rushing anything—we were slowly getting there, step by step, and that felt right.

I found myself opening up again, just like before. Talking without fear, sharing without overthinking. Being with you—emotionally, even from a distance—started to feel familiar in the best way. Safe. Warm.

December didn’t fix everything. It didn’t need to. It simply reminded me of what home feels like. And for the first time in a long while, I felt like I had found my way back there—with you.`,
    image: December,
    tone: "winter"
  },
  {
    month: "January 2026",
    teaser: "Proof that we lasted.",
    story: "Not perfect. But real.",
    image: December,
    tone: "smoke"
  },
  {
    month: "February 2026",
    teaser: "Where the beginning learned how to stay.",
    story:
      "A year later, we’re still here. Not because it was easy — but because it was worth choosing.",
    image: December,
    tone: "golden",
    final: true
  }
];

const MemoryBook = () => {
  const [unlockedIndex, setUnlockedIndex] = useState(0);
  const [openIndexes, setOpenIndexes] = useState([]);
  const itemRefs = useRef([]);
  const audioRef = useRef(null);

  const navigate = useNavigate();

  /* 🎵 AUDIO AUTO START */
  useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  let unlock;

  const tryPlay = async () => {
    try {
      audio.playbackRate = 0.9;
      await audio.play();
    } catch {
      unlock = () => {
        audio.play().catch(() => {});
        window.removeEventListener("click", unlock);
      };

      window.addEventListener("click", unlock);
    }
  };

  tryPlay();

  return () => {
    audio.pause();
    audio.currentTime = 0;

    if (unlock) {
      window.removeEventListener("click", unlock);
    }
  };
}, []);


  const handleOpen = (index) => {
    if (index > unlockedIndex) return;

    setOpenIndexes(prev =>
      prev.includes(index) ? prev : [...prev, index]
    );

    const el = itemRefs.current[index];
    if (el) {
      const y =
        el.getBoundingClientRect().top +
        window.scrollY -
        window.innerHeight / 2 +
        el.offsetHeight / 2;

      window.scrollTo({ top: y, behavior: "smooth" });
    }

    if (index === unlockedIndex) {
      setUnlockedIndex(prev => prev + 1);
    }
  };

  return (
    <div className={`memory-book ${unlockedIndex === memories.length - 1 ? "final-mode" : ""}`}>

      {/* 🎵 Background Music */}
      <audio ref={audioRef} src={song} loop />

      <header className="header">
        <h1>Where We Stayed</h1>
        <p>A year of choosing each other, again and again.</p>
      </header>

      <div className="timeline">
        {memories.map((item, index) => (
          <div key={index} ref={el => (itemRefs.current[index] = el)}>
            <MonthCard
              data={item}
              side={index % 2 === 0 ? "left" : "right"}
              isOpen={openIndexes.includes(index)}
              onClick={() => handleOpen(index)}
            />
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>This wasn’t a year. It was a beginning that learned how to stay.</p>

        <button
          className="photo-dump-btn"
          onClick={() => navigate("/scrapbook")}
        >
          Ready for Photo Dump ?
        </button>
      </footer>
    </div>
  );
};

/* ============================= */
/* MONTH CARD */
/* ============================= */

const MonthCard = ({ data, side, isOpen, onClick }) => {
  return (
    <motion.div
      className={`timeline-item ${side} tone-${data.tone}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className={`dot ${data.final && isOpen ? "final-dot" : ""}`} />

      <motion.div
        className={`card tone-${data.tone}`}
        onClick={onClick}
        animate={{ scale: isOpen ? 1.03 : 1 }}
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
            >
              {data.image && (
                <img
                  src={data.image}
                  alt={data.month}
                  className="memory-image"
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




