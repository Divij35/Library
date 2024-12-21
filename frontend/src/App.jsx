import React, { Suspense, useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Books from "./pages/Books";
import About from "./pages/About";
import Home from "./pages/Home";
import Loading from "./components/Loading";
import Detail from "./pages/Detail";
import { FavoritesProvider } from "./context/FavoritesContext";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <FavoritesProvider>
      <Navbar />
      <ScrollToTop/>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Books" element={<Books />} />
          {/* <Route path="/About" element={<About />} /> */}
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </Suspense>

    </FavoritesProvider>
  );
};

export default App;
