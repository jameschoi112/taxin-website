import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [isRelatedSitesOpen, setIsRelatedSitesOpen] = useState(false);

  const handleNavigation = (path) => {
    // 1. 사이드바 닫기
    setIsOpen(false);

    // 2. 페이지 이동
    navigate(path);

    // 3. 스크롤을 최상단으로 이동
    window.scrollTo({
      top: 0,
      behavior: 'instant' // 즉시 이동
    });
  };

  const relatedSites = [
    {
      title: '국세청 홈택스',
      url: 'https://www.hometax.go.kr'
    },
    {
      title: '국세법령정보시스템',
      url: 'https://taxlaw.nts.go.kr'
    }
  ];

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
        className="absolute right-0 top-0 w-80 h-full bg-gradient-to-br from-blue-900/80 via-blue-800/80 to-sky-900/80 backdrop-blur-md"
        variants={{
          visible: { x: 0 },
          hidden: { x: "100%" }
        }}
        transition={{ type: "spring", damping: 20 }}
      >
        {/* Logo and Close button */}
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

        {/* Navigation */}
        <nav className="mt-6">
          <div className="px-3">
            {[
              { title: '회사소개', href: '/company' },
              { title: '주요세무쟁점', href: '/notice' },
              { title: '오시는 길', href: '/location' }
            ].map((item) => (
              <motion.a
                key={item.title}
                onClick={() => handleNavigation(item.href)}
                className="flex items-center px-4 py-4 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors mb-1 cursor-pointer"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-lg font-bold">{item.title}</span>
              </motion.a>
            ))}

            {/* Related Sites Dropdown */}
            <div className="mt-2">
              <motion.button
                onClick={() => setIsRelatedSitesOpen(!isRelatedSitesOpen)}
                className="w-full flex items-center justify-between px-4 py-4 text-yellow-300 hover:text-yellow-200 rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-lg font-bold">관련 사이트</span>
                {isRelatedSitesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </motion.button>

              <AnimatePresence>
                {isRelatedSitesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {relatedSites.map((site) => (
                      <motion.a
                        key={site.title}
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-8 py-3 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="text-base">{site.title}</span>
                        <ExternalLink size={16} className="ml-2 opacity-50" />
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>

        {/* Footer */}
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