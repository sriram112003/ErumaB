import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FullLetter.css";
import song from "./song.mp3";

export default function LetterGlassPage() {

  const navigate = useNavigate();

  const signatureRef = useRef(null);
  const audioRef = useRef(null);

  const [fadeOut, setFadeOut] = useState(false);


  /* ✨ Signature Reveal */
  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("signature-visible");
        }
      },
      { threshold: 0.6 }
    );

    if (signatureRef.current) {
      observer.observe(signatureRef.current);
    }

    return () => observer.disconnect();

  }, []);



  /* 🎵 Cinematic Audio */
 useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  let unlockHandler;

  const tryPlay = async () => {
    try {
      audio.playbackRate = 0.92;
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
    audio.pause();
    audio.currentTime = 0;

    if (unlockHandler) {
      window.removeEventListener("pointerdown", unlockHandler);
    }
  };
}, []);

  /* 🌙 CTA Click → Fade → Navigate */
  const handleClosure = () => {

    if (fadeOut) return;

    // lock scrolling
    document.body.style.overflow = "hidden";

    // tiny human delay (feels less robotic)
    setTimeout(() => {
      setFadeOut(true);
    }, 120);

    setTimeout(() => {
      navigate("/closure");
    }, 2700);
  };



  return (
    <div className={`glass-page ${fadeOut ? "page-fade-out" : ""}`}>

      {/* 🎵 Music */}
<audio ref={audioRef} src={song} loop preload="auto" />

      <div className="glass-wrapper">
        <div className="glass-letter">

          <h1 className="letter-title">
            The Year That Became Us
          </h1>

          <div className="letter-body">

           <p>Happy one year to us, and I say that with a heart so full it almost doesn’t fit inside these words.</p>

<p>I’ve rewritten this in my mind more times than I can count. Every version felt incomplete, because how do you compress something this alive, this breathing, this deeply felt into sentences? Still, I’m here, trying, because a bond like this deserves to be spoken out loud, even if language trembles while carrying it.</p>

<p>It still shakes me to think how easily you could have been just another passing name in my timeline. One missed moment. One delayed reply. One small shift in fate, and I would have lived this entire year without knowing what your presence feels like. That thought doesn’t just surprise me, it frightens me. Because what we built didn’t just add to my life, it revived parts of it.</p>

<p class="accent">You didn’t arrive like noise.<br/>You arrived like calm.</p>

<p>Not as a dramatic turning point, but as a steady light. Gentle. Patient. Unforced. You never pushed your way into my world. You showed up consistently until my heart opened the door on its own. Your care was never loud, it was repetitive, reliable, real. A simple check-in. A soft concern. A “did you eat?” that carried more love than paragraphs from others.</p>

<p>Those small gestures, you may never fully know, reached places in me that were still bruised, still grieving, still pretending to be strong because they had forgotten what support feels like.</p>

<p>When you found me, I wasn’t open, I was surviving. I had mastered the art of functioning without leaning, smiling without sharing, speaking without revealing. After losing the one place I once called safe, I had folded my emotions into silence.</p>

<p class="accent">And then you came, not as a savior, not as a solution, but as relief.</p>

<p class="stacked">
You stayed.<br/>
Quietly.<br/>
Steadily.<br/>
Without performance.<br/>
Without condition.
</p>

<p>You sat beside my storms instead of trying to silence them. You never treated my heaviness like inconvenience. You never rushed my healing like it was a deadline. You understood something rare, that some wounds don’t need fixing hands, only faithful company. That kind of presence is not common. It is not ordinary. It is sacred.</p>

<p>Talking to you never felt like time spent, it felt like weight dissolving. Hours slipped by unnoticed. Nights softened around our conversations. I brought you the unedited version of my mind, the spirals, the sadness, the strange humor, the fragile hopes, and you never flinched. You listened like my words had value. You answered like my feelings had legitimacy. That changed me in ways I’m still discovering.</p>

<p>And when you trusted me with your own breaking moments, your tired edges, your stress, your vulnerable pauses, I held them carefully. Not out of responsibility, but reverence. Being someone you could be real with felt like a privilege I never once took lightly.</p>

<p>We were never a perfect straight road. We had sharp turns. Misread tones. Emotional collisions. Silences that stretched too long. But what makes this bond extraordinary to me is this. When things hurt, we didn’t choose escape. We chose repair. We chose honesty. We chose to come back and sit at the same table again.</p>

<p class="emphasis">
That is not convenience.<br/>
That is not habit.<br/>
That is heart-level commitment.
</p>

<p class="emphasis">
Hear me clearly. Slowly. Deeply.
</p>

<p class="emphasis">
I carry zero regret for anything that is “us.”<br/>
Not a fragment. Not a shadow. Not a trace.
</p>

<p>I don’t regret the nights that dissolved into morning light, the calls where sleep waited politely between our sentences, the tears you trusted me enough to show, the laughter that made no sense to the outside world, the arguments that proved we cared enough to feel, the silences that still held connection, the ordinary days that became extraordinary because you were in them.</p>

<p>If time offered me a rewind, every joy, every ache, every uncertain step, I would walk into it again without hesitation. I would still choose you. Still stay. Still feel. Still risk. Because what you gave me cannot be measured in moments, only in transformation.</p>

<p>You brought warmth back into a heart that had grown used to winter. You made care feel consistent instead of temporary. You made connection feel safe instead of fragile. You reminded me I am seen.</p>

<p>No matter what the future writes, distance, change, new chapters, unfamiliar roads, one truth will not move.</p>

<p class="accent">
You are permanently written into my gratitude.<br/>
Into my healing.<br/>
Into the quiet prayers I don’t say out loud.
</p>

<p>If I stand beside you in the years ahead, I will celebrate you openly. If life places miles between us, I will celebrate you quietly. But I will always celebrate you.</p>

<p>One year later, my heart speaks without hesitation.</p>

<p class="accent">
What we share is rare to me.<br/>
What we built is sacred to me.<br/>
And you, you are not replaceable in my story.
</p>

<p>Hold this close, even on a distant day, even in a loud season, even if time rearranges everything around us. You were never “just” part of my life. You were a turning of it.</p>

<p>If someday memory is all that connects us, it will still glow. If someday silence replaces our long talks, it will still be filled with thankfulness. If someday we stand in separate worlds, my heart will still recognize yours without introduction.</p>

<p>You are not a phase I passed through. You are a mark I carry.</p>

<p>Loving this bond with you has been one of the purest privileges of my life. And even if life had given me only this one year and nothing beyond it, I would still bow my head with sincerity and say, it was worth everything.</p>

<p class="closing">
Thank you for staying.<br/>
Thank you for seeing me.<br/>
Thank you for choosing me in the small, daily ways that matter most.
</p>

<p>Happy one year, to us, to what we built, and to the quiet miracle of you.</p>

<p ref={signatureRef} className="signature">
  Beyond words, beyond time, beyond every mile between us.
Yours, with all my heart.
  
</p>
            {/* CTA */}
            <p className="text-cta" onClick={handleClosure}>
              when you're ready… →
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
