import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Header = ({ setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className={`fixed top-0 w-full z-50 ${
            isScrolled ? 'bg-blue-900/80 backdrop-blur-sm shadow-xl' : 'bg-transparent'
          }`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 2.5,
              ease: "easeInOut"
            }
          }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="container mx-auto px-6 py-6 flex justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 2.5,
                ease: "easeInOut",
                delay: 0.2
              }
            }}
          >
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleNavigation('/')}
            >
              <img src="/images/logo2.png" alt="택스인 로고" className="h-12 w-auto" />
              <h1 className="ml-4 text-xl font-bold text-white tracking-tight">세무법인 택스인</h1>
            </div>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu size={28} />
            </button>
          </motion.div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;