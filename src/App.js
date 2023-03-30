import "./App.css";
import Spaceships from "./Components/Spaceships";

import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Spaceships />} />
      <Route path="/spaceships" element={<Spaceships />} />
    </Routes>
  );
}

export default App;
