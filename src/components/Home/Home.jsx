import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';


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
<div className="relative h-[100dvh] md:h-[85dvh] overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/images/hero-bg.jpg"
      alt="배경"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/40" />
  </div>

  {/* Animated Content */}
  <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
    <motion.h2
      className="text-xl md:text-6xl font-bold text-white mb-4 md:mb-6"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={titleVariants}
    >
      TaxIn, your trusted partner in excellence
    </motion.h2>

    <motion.p
      className="text-xl md:text-2xl font-bold text-white mb-8 md:mb-12"
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
      <div className="absolute top-1/4 left-1/4 w-24 md:w-32 h-24 md:h-32 bg-blue-500/20 rounded-full blur-xl" />
      <div className="absolute top-1/3 right-1/4 w-32 md:w-48 h-32 md:h-48 bg-sky-400/20 rounded-full blur-xl" />
      <div className="absolute bottom-1/4 left-1/3 w-28 md:w-40 h-28 md:h-40 bg-white/20 rounded-full blur-xl" />
    </motion.div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-8 md:bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
      <motion.p
        className="text-white text-xs md:text-sm font-light tracking-widest mb-2"
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
        <ChevronDown className="text-white w-5 md:w-6 h-5 md:h-6" />
      </motion.div>
    </div>
  </div>
</div>

      {/* Services Section */}
<section className="py-24 relative min-h-[600px] overflow-hidden">
  {/* Background Image with Blue Overlay */}
  <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
    <img
      src="/images/service-bg.jpg"
      alt="background"
      loading="lazy"
      className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
    />
    <div className="absolute inset-0 bg-blue-900/50" />
  </div>

  <div className="container mx-auto px-6 relative z-10">
    {/* Introduction Text - Changed to left align */}
    <div className="max-w-2xl mb-16">
      <motion.p
        className="text-white text-xl font-bold :text-2xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        세무법인 택스인은<br />
        세무 전문가들이 모인<br /> 전문 기관으로<br />
        아래의 서비스들을 제공드립니다
      </motion.p>
    </div>

    {/* Service Slides */}
    <div className="max-w-5xl mx-auto">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !w-6 !h-1 !rounded-none',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-blue-500',
        }}
        navigation
        grabCursor={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={30}
        loop={true}
        className="service-slider"
        breakpoints={{
          // 모바일에서는 한 장만 보이도록
          640: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          // 태블릿 이상에서는 1.5장 보이도록
          768: {
            slidesPerView: 1.5,
            spaceBetween: 30,
          }
        }}
      >
        {[
          {
            image: '/images/service1.jpg',
            titleKo: '기장 대리',
            titleEn: 'Tax Accounting Services'
          },
          {
            image: '/images/service2.jpg',
            titleKo: '세무신고',
            titleEn: 'Tax Filing Services'
          },
          {
            image: '/images/service3.jpg',
            titleKo: '조사 대행',
            titleEn: 'Tax Audit Representation'
          },
          {
            image: '/images/service4.jpg',
            titleKo: '양도소득세 및 상속 증여세',
            titleEn: 'Capital Gains, Inheritance, and Gift Tax Advisory'
          },
          {
            image: '/images/service5.jpg',
            titleKo: '조세 컨설팅',
            titleEn: 'Tax Advisory and Consulting'
          }
        ].map((service, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={service.image}
                alt={service.titleKo}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-lg font-medium mb-1">
                  {service.titleKo}
                </h3>
                <p className="text-sky-300 text-sm">
                  {service.titleEn}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
</section>

{/* Add these styles to your global CSS */}
<style jsx global>{`
  .service-slider .swiper-pagination {
    position: relative;
    margin-top: 2rem;
  }

  .service-slider .swiper-button-next,
  .service-slider .swiper-button-prev {
    color: white;
  }

  .service-slider .swiper-button-next:after,
  .service-slider .swiper-button-prev:after {
    font-size: 1.5rem;
  }

  .service-slider .swiper-pagination-bullet {
    background: white;
    opacity: 0.5;
  }

  .service-slider .swiper-pagination-bullet-active {
    opacity: 1;
  }
`}</style>

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