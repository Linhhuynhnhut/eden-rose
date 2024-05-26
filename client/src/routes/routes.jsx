import { Route, Routes } from "react-router-dom";
import React from 'react';
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import Management from "../pages/Management";
import Weddings from "../pages/Weddings";
import NewWedding from "../pages/NewWedding";
import Halls from "../pages/Halls";
import Menu from "../pages/Menu";
import Services from "../pages/WeddingServices";
import Payment from "../pages/Payment";
import Setting from "../pages/Setting/Setting"


const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/management" element={<Management />} />
      <Route path="/management/new-wedding" element={<NewWedding />} />
      <Route path="/management/weddings" element={<Weddings />} />
      <Route path="/management/halls" element={<Halls />} />
      <Route path="/management/menu" element={<Menu />} />
      <Route path="/management/services" element={<Services />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/" exact element={<HomePage />} />
    </Routes>
  );
};

export default RoutesConfig;
