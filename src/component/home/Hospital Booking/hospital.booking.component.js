import React from "react";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import Hospitalbookingcomponent from "./hospitalbooking.component";



export default function Hospitalbooking() {
  
  return (
    <div>
      <Navbar></Navbar>
      <Hospitalbookingcomponent></Hospitalbookingcomponent>
      <Footer></Footer>
    </div>
  );
}
