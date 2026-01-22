import ScratchCard from "./ScratchCard.jsx";
import "./ScratchPage.css";
import { useNavigate } from "react-router-dom";

import img1 from "./Images/Flower.png";
import img2 from "./Images/Promise.png";
import img3 from "./Images/ib.jpeg";

const ScratchPage = () => {
  const navigate = useNavigate();
   const NextPage = () => {

    setTimeout(() => {
      navigate("/memories");
    }, 1500);
  };

  return (
    <div className="scratch-page">
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

      <ScratchCard image={img3} 
      onReveal={() => navigate("/ibaco")}
      />
      <button className="next-btn"  onClick={NextPage}>
        
       
        Next Page
      </button>

    </div>
  );
};

export default ScratchPage;
