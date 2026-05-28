import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Search from "./pages/Search";
import Checkout from "./pages/Checkout";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import Favourites from "./pages/Favourites";
import Offers from "./pages/Offers";
import Menu from "./pages/Menu";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import Invite from "./pages/Invite";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import Faqs from "./pages/Faqs";
import Cancellation from "./pages/Cancellation";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/search" element={<Search />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/help" element={<Help />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/restaurant/:slug" element={<RestaurantDetails />} />
      <Route path="/invite" element={<Invite />} />
      <Route path="/about" element={<About />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/cancellation" element={<Cancellation />} />
    </Routes>
  );
};

export default App;
