import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  BellIcon,
  DocumentTextIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import { logout } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: '대시보드', icon: HomeIcon, path: '/admin/dashboard' },
    { name: '공지사항', icon: BellIcon, path: '/admin/notices' },
    { name: '세무일정', icon: DocumentTextIcon, path: '/admin/schedules' },
    { name: '상담 신청 내역', icon: ChatBubbleLeftIcon, path: '/admin/consultations' },
    { name: '자료실', icon: ChatBubbleLeftIcon, path: '/admin/resources' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const NavItem = ({ item }) => (
    <Link
      to={item.path}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        location.pathname === item.path
          ? 'bg-blue-500 text-white'
          : 'text-white/60 hover:bg-white/10'
      }`}
    >
      <item.icon className="w-6 h-6" />
      <span>{item.name}</span>
    </Link>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/10 text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-slate-800/50 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-200 ease-in-out z-50 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6">
          <img
            src="/images/logo2.png"
            alt="택스인 로고"
            className="h-8"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="px-3 py-4 space-y-2">
          {menuItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-white/60 hover:bg-white/10 transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            <span>로그아웃</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;