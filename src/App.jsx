import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Success from './components/Success';

function App() {
  return (
    <Router>
      <Routes>
        {/* Giriş sayfası */}
        <Route path="/" element={<Login />} />

        {/* Başarıyla giriş yapıldığında yönlendirilir */}
        <Route path="/main" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
