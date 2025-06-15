import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Box } from "@chakra-ui/react";
import Home from "./pages/Home";
import Record from "./pages/Record";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Box minH="80vh">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/record" element={<Record />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Box>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
