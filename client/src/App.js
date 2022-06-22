import "./App.css";
import AddHostel from "./pages/hostel/AddHostel";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import Header from "./components/Header/Header";
import ViewHostel from "./pages/hostel/ViewHostel";
import UpdateHostel from "./pages/hostel/UpdateHostel";
import SearchPage from "./pages/hostel/SearchPage";
import { useEffect, useState } from "react";
import { PrivateRoute, LoginPrivateRoute } from "./components/PrivateRoute";
import ManageHostels from "./pages/hostel/hostelManagement/ManageHostels";
import Location from "./components/Location";

function App() {
  const [token, setToken] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setSuccess(localStorage.getItem("success"));
  }, [token]);

  return (
    // <store.Provider store>
    <div className="App">
      {/* <Hostels /> */}
      <Header success={success} />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/manage-hostel"
          element={
            <PrivateRoute token={token}>
              <ManageHostels />
            </PrivateRoute>
          }
        />
        <Route path="/update-hostel" element={<UpdateHostel />} />

        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />

        <Route
          path="/View-hostel"
          element={
            <LoginPrivateRoute token={token}>
              <ViewHostel />
            </LoginPrivateRoute>
          }
        />
        <Route path="/search-page" element={<SearchPage />} />
        <Route path="/location" element={<Location />} />
      </Routes>
    </div>
    // </store.Provider>
  );
}

export default App;
