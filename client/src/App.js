import "./App.css";
import AddHostel from "./pages/hostel/AddHostel";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import Header from "./components/Header/Header"
import ViewHostel from "./pages/hostel/ViewHostel";

function App() {
  return (
    <div className="App">
      {/* <Hostels /> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-hostel" element={<AddHostel />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/View-hostel" element={<ViewHostel />} />

      </Routes>
    </div>
  );
}

export default App;
