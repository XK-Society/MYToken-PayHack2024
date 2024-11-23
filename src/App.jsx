import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Loyalty from "./pages/Loyalty";
import Defi from "./pages/Defi";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loyalty" element={<Loyalty />} />
          <Route path="/defi" element={<Defi />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}