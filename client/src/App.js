import "./App.css";
import AddHostel from "./pages/hostel/AddHostel";
import Hostels from "./pages/hostel/Hostels";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-hostel" element={<AddHostel />} />
      </Routes>
    </div>
  );
}

export default App;
