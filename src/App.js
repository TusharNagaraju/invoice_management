// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';         // ✅ Import the welcome page
import Home from './pages/Home';
import InvoiceDetail from './pages/InvoiceDetail';
import CreateInvoice from './pages/CreateInvoice';
import EditInvoice from './pages/EditInvoice';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />     {/* ✅ Show welcome page at root */}
        <Route path="/home" element={<Home />} />        {/* 🏠 Move home to /home */}
        <Route path="/invoice/:id" element={<InvoiceDetail />} />
        <Route path="/invoice/edit/:id" element={<EditInvoice />} />
        <Route path="/create" element={<CreateInvoice />} />
      </Routes>
    </Router>
  );
};

export default App;