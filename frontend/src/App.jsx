import React, { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Books from "./pages/Books";
import About from "./pages/About";
import Home from "./pages/Home";
import Loading from "./components/Loading";
import Detail from "./pages/Detail";
import { FavoritesProvider } from "./context/FavoritesContext";

const App = () => {
  return (
    <FavoritesProvider>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Books" element={<Books />} />
          {/* <Route path="/About" element={<About />} /> */}
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Suspense>
    </FavoritesProvider>
  );
};

export default App;
