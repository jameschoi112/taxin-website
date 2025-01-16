import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Company from './components/Company';
import Location from './components/Location';
import Login from './components/Admin/Login';
import Dashboard from './components/Admin/Dashboard';
import Notice from './components/Notice';
import AdminNotices from './components/Admin/AdminNotices';
import NoticeDetail from './components/Notice/NoticeDetail';
import AdminConsultations from './components/Admin/AdminConsultations';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/location" element={<Location />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/tax-info" element={<div>세무정보 페이지 (준비중)</div>} />
      <Route path="/admin/settings" element={<div>설정 페이지 (준비중)</div>} />
      <Route path="/notice" element={<Notice />} />
      <Route path="/notice/:id" element={<NoticeDetail />} />
      <Route path="/admin/notices" element={<AdminNotices />} />
      <Route path="/admin/consultations" element={<AdminConsultations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;