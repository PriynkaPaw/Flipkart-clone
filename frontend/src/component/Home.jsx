import Header from "./Header";
import React from "react";
import Carousel from "./Carousel";
import Cart from "./Cart";
import Footer from "./Footer";
import Header1 from "../MComponent/header/Header";
function Home() {
  return (
    <div>
      {/* <Nav /> */}
      <Header1 />
      <Header />
      <Carousel />
      <Cart />
      <Cart />
      <Footer />
    </div>
  );
}

export default Home;
