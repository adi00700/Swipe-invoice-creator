import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import Invoice from "./pages/Invoice";
import InvoiceList from "./pages/InvoiceList";
import ProductsTab from "./components/ProductsTab"; // Adjusted import path for ProductsTab component

const App = () => {
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <Container>
        <Routes>
          <Route path="/" element={<InvoiceList />} />
          <Route path="/create" element={<><Invoice /><ProductsTab /></>} /> {/* Render ProductsTab alongside Invoice component */}
          <Route path="/create/:id" element={<><Invoice /><ProductsTab /></>} /> {/* Render ProductsTab alongside Invoice component */}
          <Route path="/edit/:id" element={<><Invoice /><ProductsTab /></>} /> {/* Render ProductsTab alongside Invoice component */}
        </Routes>
      </Container>
    </div>
  );
};

export default App;
