import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./Join";
import After from "./pages/member/After";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>HOME</h1>} />
        <Route path="/join" element={<Join />} />
        <Route path="/member/kko" element={<After />} />
        <Route path="/login" element={<h1>로그인</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
