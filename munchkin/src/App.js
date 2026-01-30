import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FirstPage from "./Pages/FirstPage/FirstPage";
import LetterPage from "./Pages/SecondPage/ScratchPage.jsx";
import Coupon from "./Pages/SecondPage/Coupon.jsx";
import BouquetPage from "./Pages/SecondPage/Boquet.jsx";
import IbacoPage from "./Pages/SecondPage/IbacoPage.jsx";
import MemoryBook from "./Pages/ThirdPage/Memories.jsx";
import Scrapbook from "./Pages/Scrapbook/Scrapbook.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/scratch" element={<LetterPage />} />
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/bouquet" element={<BouquetPage />} />
        <Route path="/ibaco" element={<IbacoPage />} />
        <Route path="/memories" element={<MemoryBook />} />
        <Route path="/scrapbook" element={<Scrapbook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
