import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RequestForm from "./components/RequestForm";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm px-4">
        <span className="navbar-brand">🌾 AgriTech Services</span>
        <div className="ms-auto">
          <Link className="btn btn-outline-light me-2" to="/">
            Request Service
          </Link>
          <Link className="btn btn-light" to="/dashboard">
            Dashboard
          </Link>
        </div>
      </nav>


      <Routes>
        <Route path="/" element={<RequestForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;