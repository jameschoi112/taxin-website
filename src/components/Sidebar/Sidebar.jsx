import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className={`fixed inset-0 z-50 ${isOpen ? 'visible' : 'invisible'}`}
      initial={false}
      animate={isOpen ? "visible" : "hidden"}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 backdrop-blur-sm bg-black/30"
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 }
        }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(false)}
      />
      <motion.div
        className="absolute right-0 top-0 w-80 h-full bg-gradient-to-br from-blue-900 via-blue-800 to-sky-900"
        variants={{
          visible: { x: 0 },
          hidden: { x: "100%" }
        }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="p-6 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center">
            <img src="/images/logo2.png" alt="택스인 로고" className="h-10 w-auto" />
            <h2 className="ml-3 text-xl font-bold text-white">세무법인 택스인</h2>
          </div>
          <motion.button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} />
          </motion.button>
        </div>

        <nav className="mt-6">
          <div className="px-3">
            {[
              { title: '회사 소개', href: '/company' },
              { title: '오시는 길', href: '/location' }
            ].map((item, index) => (
              <motion.a
                key={item.title}
                onClick={() => {
                  navigate(item.href);
                  setIsOpen(false);
                }}
                className="flex items-center px-4 py-4 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors mb-1 cursor-pointer"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-lg font-bold">{item.title}</span>
              </motion.a>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-white/10 bg-white/5">
          <p className="text-white/80 text-center">
            세무법인 택스인과 함께<br />
            더 나은 미래를 설계하세요
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;