import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListEmployeeComponent from "./component/ListEmployeComponent";
import HeaderComponent from "./component/HeaderComponent";
import FooterComponent from "./component/FooterComponent";
import CreateEmployeeComponent from "./component/CreateEmployeeComponent";
import ViewEmployeeComponent from "./component/ViewEmployeeComponent";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route path="/" element={<ListEmployeeComponent />} />
            <Route path="/employees" element={<ListEmployeeComponent />} />
            <Route
              path="/add-employee/:id"
              element={<CreateEmployeeComponent />}
            />
            <Route
              path="/view-employee"
              element={<ViewEmployeeComponent />}
            />
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
