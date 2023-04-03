import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AuthContext from "./contexts/AuthContext";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import ItemForm from "./components/ItemForm";
import { refresh } from "./services/authService";
import Items from "./components/Items";
import Upload from "./components/Upload";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    refresh().then(login).catch();
  }, []);

  function login(userArg) {
    setUser(userArg);
    localStorage.setItem("BG_JWT", userArg.jwt);
  }

  function logout() {
    setUser();
    localStorage.removeItem("BG_JWT");
  }

  const auth = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={auth}>
      <div className="container-fluid">
        <Router>
          <NavBar />
          <SideBar />
          <Routes>
            <Route path="/upload" element={<Upload />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add" element={<ItemForm />} />
            {/* <Route path="/about" element={<AboutUs />} /> */}
            <Route path="/items" element={<Items />} />
            {/* <Route path="/items/:id" element={<Item />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
