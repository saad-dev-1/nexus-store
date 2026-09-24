import { Routes, Route } from "react-router-dom";
import AnnouncementBar from "./components/announcementbar";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import WhatsAppButton from "./components/whatsappbutton";
import CartDrawer from "./components/cartdrawer";

import Home from "./pages/home";
import Shop from "./pages/shop";
import Product from "./pages/product";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import About from "./pages/about";
import Contact from "./pages/contact";
import NotFound from "./pages/notfound";

function App() {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </div>
  );
}

export default App;