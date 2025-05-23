import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router";
import Shop from "./pages/Shop";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import About from "./pages/About";
import { HashRouter } from "react-router";

function App() {
  return (
    <>
      <HashRouter>
        <div className="container">
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/shop/:categoryId?" element={<Shop />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Navbar />
      </HashRouter>
    </>
  );
}

export default App;
