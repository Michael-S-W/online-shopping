import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router";
import Shop from "./components/Shop";
import Home from "./components/Home";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import Register from "./components/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/shop/:categoryId?" element={<Shop />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
