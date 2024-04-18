import { Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import Management from "../pages/Management";
import Weddings from "../pages/Weddings";
import Halls from "../pages/Halls";
import Menu from "../pages/Menu";
import Services from "../pages/WeddingServices";
import Payment from "../pages/Payment";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/management" element={<Management />} />
      <Route path="/management/weddings" element={<Weddings />} />
      <Route path="/management/halls" element={<Halls />} />
      <Route path="/management/menu" element={<Menu />} />
      <Route path="/management/services" element={<Services />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
};

export default RoutesConfig;
