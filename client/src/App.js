import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Auth/Signup";
import Header from "./components/Header/Header";
import ViewHostel from "./pages/hostel/ViewHostel";
import UpdateHostel from "./pages/hostel/UpdateHostel";
import SearchPage from "./pages/hostel/SearchPage";
import { useState } from "react";

import { PrivateRoute, LoginPrivateRoute } from "./components/PrivateRoute";
import ManageHostels from "./pages/hostel/hostelManagement/ManageHostels";

import { Provider } from "react-redux";

import store from "./store";

import LoginRedux from "./pages/Auth/LoginRedux";
import Reset from "./pages/Auth/Reset";
import NewPassword from "./pages/Auth/NewPassword";

function App() {
  const [token, setToken] = useState();
  const [success, setSuccess] = useState();

  return (
    <Provider store={store}>
      <div className="App bg-[#f1f5f9]">
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
          <Route path="/Login" element={<LoginRedux />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/reset/:token" element={<NewPassword />} />

          <Route
            path="/View-hostel"
            element={
              <LoginPrivateRoute token={token}>
                <ViewHostel />
              </LoginPrivateRoute>
            }
          />
          <Route path="/search-page" element={<SearchPage />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
