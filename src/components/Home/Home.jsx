import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleCall = () => {
    window.location.href = 'tel:031-206-7676';
  };

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2 }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.5 }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 1.2 }
    }
  };

  const shapeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, delay: 2 }
    }
  };

  const scrollIndicatorVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 1, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      delay: 3
    }
  }
};

const scrollTextVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 1, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      delay: 3
    }
  }
};

  return (
    <div className="relative min-h-screen bg-slate-100">
      {/* Header */}
      <motion.header
        className="absolute w-full z-50 bg-transparent"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={headerVariants}
      >
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/images/logo2.png" alt="택스인 로고" className="h-12 w-auto" />
            <h1 className="ml-4 text-xl font-bold text-white tracking-tight">세무법인 택스인</h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.header>

      {/* Hero Section with Animations */}
<div className="relative h-[85vh] overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/images/hero-bg.jpg"
      alt="배경"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/50" />
  </div>

  {/* Animated Content */}
  <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
    <motion.h2
      className="text-xl md:text-6xl font-bold text-white mb-6"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={titleVariants}
    >
      TaxIn, your trusted partner in excellence
    </motion.h2>

    <motion.p
      className="text-xl md:text-2xl font-bold text-white mb-12"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={subtitleVariants}
    >
      신뢰와 전문성으로 <br />한 차원 높은 서비스를 제공하는 택스인
    </motion.p>

    {/* Decorative Shapes */}
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={shapeVariants}
    >
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-sky-400/20 rounded-full blur-xl" />
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-white/20 rounded-full blur-xl" />
    </motion.div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
      <motion.p
        className="text-white text-sm font-light tracking-widest mb-2"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={scrollTextVariants}
      >
        SCROLL
      </motion.p>
      <motion.div
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={scrollIndicatorVariants}
      >
        <ChevronDown className="text-white w-6 h-6" />
      </motion.div>
    </div>
  </div>
</div>

      {/* Services Section */}
      <section className="py-24 relative min-h-[600px] overflow-hidden">
        {/* Background Image with Blur Effect */}
        <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
          <img
            src="/images/service-bg.jpg"
            alt="background"
            loading="lazy"
            className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
            style={{
              filter: 'blur(8px)',
              opacity: '0.15'
            }}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-white to-slate-50 opacity-90" />

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Services
          </h2>
          <p className="text-xl text-gray-600 mb-16">세무법인 택스인에서 제공하는 서비스입니다.</p>
          <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
            <motion.div
              className="group bg-blue-900 bg-opacity-100 rounded-lg p-4 hover:bg-opacity-25 transition-all duration-300 flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white text-center">기장 대리</h3>
            </motion.div>

            <motion.div
              className="group bg-blue-900 bg-opacity-100 rounded-lg p-4 hover:bg-opacity-25 transition-all duration-300 flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white text-center">세무 신고</h3>
            </motion.div>

            <motion.div
              className="group bg-blue-900 bg-opacity-100 rounded-lg p-4 hover:bg-opacity-25 transition-all duration-300 flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white text-center">조사 대행</h3>
            </motion.div>

            <motion.div
              className="group bg-blue-900 bg-opacity-100 rounded-lg p-4 hover:bg-opacity-25 transition-all duration-300 flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white text-center">양도/상속/증여</h3>
            </motion.div>

            <motion.div
              className="group bg-blue-900 bg-opacity-100 rounded-lg p-4 hover:bg-opacity-25 transition-all duration-300 flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white text-center">절세 컨설팅</h3>
            </motion.div>

            <motion.div
              className="group bg-blue-900 bg-opacity-100 rounded-lg p-4 hover:bg-opacity-25 transition-all duration-300 flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white text-center">세무 상담</h3>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-blue-900 mb-12 px-6">
            Contacts
          </h2>
          <div className="grid md:grid-cols-2">
            <motion.div
              className="bg-gray-800 p-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6">전화 상담</h3>
              <p className="text-lg text-white font-semibold mb-2">평일 오전 9시 ~ 오후 6시</p>
              <p className="text-lg text-white font-semibold mb-6">토,일 공휴일 휴무</p>
              <p className="text-3xl text-blue-500 font-bold mb-6">031-206-7676</p>
              <motion.button
                onClick={handleCall}
                className="flex items-center justify-center w-full bg-blue-800 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors text-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="mr-3" size={24} />
                전화 연결
              </motion.button>
            </motion.div>
            <motion.div
              className="bg-gray-700 p-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6">메일 상담</h3>
              <p className="text-lg text-white font-semibold mb-2">언제든 상담 가능합니다.</p>
              <motion.button
                onClick={() => setShowChatModal(true)}
                className="flex items-center justify-center w-full bg-blue-800 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors text-lg font-semibold mt-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="mr-3" size={24} />
                상담하러 가기
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-s font-bold mb-4">세무법인 택스인</h3>
              <p className="text-sm mb-2">대표자: 장혁배</p>
              <p className="text-sm mb-2">전화번호: 031-206-7676</p>
              <p className="text-sm mb-2">사업자 등록번호: xxx-xxx-xxxx</p>
              <p className="text-sm">경기 수원시 영통구 청명남로 6 4층</p>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-blue-800">
            <p className="text-left text-sm">
              Copyright © 2025 semu bubin TEXIN. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Sidebar */}
      <motion.div
        className={`fixed inset-0 z-50 ${isSidebarOpen ? 'visible' : 'invisible'}`}
        initial={false}
        animate={isSidebarOpen ? "visible" : "hidden"}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 }
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 bg-black"
          variants={{
            visible: { opacity: 0.6 },
            hidden: { opacity: 0 }
          }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsSidebarOpen(false)}
        />
        <motion.div
          className="absolute right-0 top-0 w-96 h-full bg-gradient-to-b from-blue-50 to-white shadow-2xl"
          variants={{
            visible: { x: 0 },
            hidden: { x: "100%" }
          }}
          transition={{ type: "spring", damping: 20 }}
        >
          <div className="p-8 flex justify-between items-center border-b border-blue-100">
            <div className="flex items-center">
              <img src="/images/logo.png" alt="택스인 로고" className="h-12 w-auto" />
              <h2 className="ml-4 text-2xl font-bold text-blue-900">세무법인 택스인</h2>
            </div>
            <motion.button
              onClick={() => setIsSidebarOpen(false)}
              className="text-blue-900 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={28} />
            </motion.button>
          </div>
          <nav className="mt-8">
            <ul className="space-y-2">
              <motion.li
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a href="#" className="flex items-center px-8 py-5 text-blue-900 font-bold hover:bg-blue-50 transition-colors border-l-4 border-transparent hover:border-blue-600">
                  <span className="text-xl">세무사 소개</span>
                </a>
              </motion.li>
              <motion.li
                className="border-t border-blue-100"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a href="#" className="flex items-center px-8 py-5 text-blue-900 font-bold hover:bg-blue-50 transition-colors border-l-4 border-transparent hover:border-blue-600">
                  <span className="text-xl">회사 소개</span>
                </a>
              </motion.li>
              <motion.li
                className="border-t border-blue-100"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a href="#" className="flex items-center px-8 py-5 text-blue-900 font-bold hover:bg-blue-50 transition-colors border-l-4 border-transparent hover:border-blue-600">
                  <span className="text-xl">오시는 길</span>
                </a>
              </motion.li>
            </ul>
          </nav>
          <div className="absolute bottom-0 w-full p-8 border-t border-blue-100 bg-blue-50">
            <p className="text-lg text-blue-900 font-bold text-center">
              세무법인 택스인과 함께<br />
              더 나은 미래를 설계하세요
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Chat Modal */}
      {showChatModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-60"
            onClick={() => setShowChatModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <motion.div
            className="relative bg-white rounded-xl p-8 w-full max-w-lg mx-6 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              준비중입니다
            </h3>
            <motion.button
              onClick={() => setShowChatModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Home;