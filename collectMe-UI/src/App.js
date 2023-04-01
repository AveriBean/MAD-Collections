import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
// import AboutUs from "./components/AboutUs";
import NavBar from "./components/NavBar"
import NotFound from "./components/NotFound";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="container-fluid">
      <Router>
        <NavBar />
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<AboutUs />} /> */}
          {/* <Route path="/items" element={<Items />} /> */}
          {/* <Route path="/items/:id" element={<Item />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
