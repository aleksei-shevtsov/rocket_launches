import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="detail/:id" element={<Detail />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
