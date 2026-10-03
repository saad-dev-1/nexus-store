import { Routes, Route } from "react-router-dom";
import AnnouncementBar from "./components/announcementbar";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import WhatsAppButton from "./components/whatsappbutton";
import CartDrawer from "./components/cartdrawer";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/authcontext";
import { CartProvider } from "./context/cartcontext";

import Home from "./pages/home";
import Shop from "./pages/shop";
import Product from "./pages/product";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import About from "./pages/about";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import Orders from "./pages/orders";
import OrderDetail from "./pages/order-detail";
import OrderSuccess from "./pages/order-success";
import OrderFailed from "./pages/order-failed";
import NotFound from "./pages/notfound";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-bg-primary flex flex-col">
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetail />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/order-failed" element={<OrderFailed />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;