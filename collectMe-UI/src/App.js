import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cancel from "./pages/Cancel";
import Store from "./pages/Store";
import Success from "./pages/Success";
// import "bootstrap/dist/css/bootstrap.min.css";

import AuthContext from "./contexts/AuthContext";
// import AboutUs from "./components/AboutUs";
import CartProvider from "./contexts/CartContext";
import CategoryItem from "./components/CategoryItem";
import Category from "./components/Category";
import Comment from "./components/Comment";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ItemForm from "./components/ItemForm";
import Items from "./components/Items";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import { refresh } from "./services/authService";
import SideBar from "./components/SideBar";
import UserForm from "./components/UserForm";
import Upload from "./components/Upload";
import ItemView from "./components/ItemView";
import ConfirmDelete from "./components/ConfirmDelete";
import ConfirmUserDelete from "./components/ConfirmUserDelete"

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
      <CartProvider>
        <div className="container-fluid parent">
          <Router>
            <NavBar className="div1" />
            <SideBar className="div2" />
            <Routes className="div4">
              <Route path="/upload" element={<Upload />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/add/:itemId" element={<ItemForm />} />
              <Route path="/add" element={<ItemForm />} />
              <Route path="/delete/:itemId" element={<ConfirmDelete />} />
              <Route path="/categories" element={<Category />} />
              <Route path="/category/:categoryId" element={<CategoryItem />} />
              <Route path="/view/item/:itemId" element={<ItemView />} />
              <Route path="/categories/category/:categoryId" element={<CategoryItem />} />
              {/* <Route path="/about" element={<AboutUs />} /> */}
              <Route path="/items" element={<Items />} />
              {/* <Route path="/items/:id" element={<Item />} /> */}
              <Route path="/createUser" element={<UserForm />} />
              <Route path="/store" element={<Store />} />
              <Route path="/store/success" element={<Success />} />
              <Route path="/store/cancel" element={<Cancel />} />
              <Route path="/editUser/:userId" element={<UserForm />} />
              <Route path="/deleteUser/:userId" element={<ConfirmUserDelete />} />
              <Route path="/viewProfile/:userId" element={<Profile />} />
              <Route path="/Comment" element={<Comment />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer className="div3" />
          </Router>
        </div>
      </CartProvider>
    </AuthContext.Provider>
  );
}

export default App;
