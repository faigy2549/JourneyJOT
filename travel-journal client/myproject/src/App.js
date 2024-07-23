import React, { useState,useEffect} from "react";
import { BrowserRouter} from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import MenuBar from "./components/MenuBar";

function App() {



  
  return (
      <BrowserRouter>
        <MenuBar />
        <AppRoutes/>
      </BrowserRouter>
  );
}

export default App;
