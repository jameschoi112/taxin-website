import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import smoothscroll from 'smoothscroll-polyfill';
import _ from 'lodash';


const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

const onSubmit = async (data) => {
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',          // EmailJS Service ID
      'YOUR_TEMPLATE_ID',         // EmailJS Template ID
      {
        to_name: "관리자",
        from_name: data.name,
        phone: data.phone,
        message: data.message,
      },
      'YOUR_PUBLIC_KEY'           // EmailJS Public Key
    );

    alert('상담 신청이 완료되었습니다.');
    reset();
  } catch (error) {
    console.error('Error:', error);
    alert('전송 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
};
  useEffect(() => {
  // polyfill 킥스타트
  smoothscroll.polyfill();
}, []);

  const handleScroll = () => {
  const servicesSection = document.getElementById('services');
  servicesSection.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};

  useEffect(() => {
  const handleAutoScroll = () => {
    if (hasScrolled || isScrolling) return;

    const servicesSection = document.getElementById('services');
    const servicesSectionTop = servicesSection.offsetTop;
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50 && scrollPosition < servicesSectionTop / 4) {
      setIsScrolling(true);  // 스크롤 시작

      const startPosition = window.scrollY;
      const endPosition = servicesSectionTop;
      const duration = 1500; // 1.5초
      const startTime = performance.now();

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easeOutExpo - 더 부드러운 감속 효과
        const easing = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        const currentPosition = startPosition + (endPosition - startPosition) * easing;
        window.scrollTo(0, currentPosition);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          setHasScrolled(true);
          setIsScrolling(false);  // 스크롤 완료
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  const throttledScroll = _.throttle(handleAutoScroll, 100);  // 100ms 쓰로틀링
  window.addEventListener('scroll', throttledScroll);

  return () => {
    window.removeEventListener('scroll', throttledScroll);
    throttledScroll.cancel();
  };
}, [hasScrolled, isScrolling]);

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
    <div
      className="absolute bottom-8 md:bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
      onClick={handleScroll}
    >
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
<section className="relative h-[100dvh] overflow-hidden" id="services">
  {/* Background Image with Blue Overlay */}
  <div className="absolute inset-0">
    <img
      src="/images/service-bg.jpg"
      alt="background"
      loading="lazy"
      className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
    />
    <div className="absolute inset-0 bg-blue-900/50" />
  </div>

  <div className="container mx-auto px-6 relative z-10 h-full py-16">
    {/* Introduction Text */}
    <div className="max-w-2xl pt-8">
  <div className="overflow-hidden">
    {[
      "세무법인 택스인은",
      "전문 대표 세무사가",
      "아래의 서비스들을 제공드립니다"
    ].map((line, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{
          opacity: 1,
          y: 0
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: index * 0.2,  // 각 줄마다 0.2초씩 딜레이
          ease: [0.22, 1, 0.36, 1]  // custom easing
        }}
      >
        <p className="text-white text-xl md:text-xl font-bold leading-relaxed">
          {line}
        </p>
      </motion.div>
    ))}
  </div>
</div>

    {/* Service Slides */}
    <div className="mt-8 md:mt-12 h-[50vh]">
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
        spaceBetween={30}
        loop={true}
        className="h-full"
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

      {/* Contacts Section */}
<section className="py-24 relative overflow-hidden">
  {/* Background with gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-sky-900" />

  <div className="container mx-auto px-6 relative z-10">
    <div className="grid md:grid-cols-2 gap-8">
      {/* Phone Consultation */}
      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <Phone className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">전화 상담</h3>
            <p className="text-blue-200">평일 오전 9시 ~ 오후 6시</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <p className="text-lg text-white/80">토,일 공휴일 휴무</p>
          <p className="text-3xl text-white font-bold">031-206-7676</p>
        </div>

        <motion.button
          onClick={handleCall}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-xl flex items-center justify-center space-x-3 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Phone size={20} />
          <span className="text-lg font-medium">전화 연결하기</span>
        </motion.button>
      </motion.div>

      {/* Consultation Form */}
      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <MessageCircle className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">상담 신청</h3>
            <p className="text-blue-200">어떤 것이라도<br />편하게 문의주셔도 좋습니다.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="성함"
              {...register('name', { required: true })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="연락처"
              {...register('phone', { required: true })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <textarea
              placeholder="문의 내용"
              {...register('message', { required: true })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-xl flex items-center justify-center space-x-3 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="text-lg font-medium">전송중...</span>
            ) : (
              <>
                <MessageCircle size={20} />
                <span className="text-lg font-medium">상담 신청하기</span>
              </>
            )}
          </motion.button>
        </form>
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
              <p className="text-sm mb-2">사업자 등록번호: 135-85-51836</p>
              <p className="text-sm">경기 수원시 영통구 청명남로 6 4층</p>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-blue-800">
            <p className="text-left text-sm">
              Copyright © 2025 semububin TEXIN. All rights reserved.
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
  {/* Backdrop with blur */}
  <motion.div
    className="absolute inset-0 backdrop-blur-sm bg-black/30"
    variants={{
      visible: { opacity: 1 },
      hidden: { opacity: 0 }
    }}
    transition={{ duration: 0.3 }}
    onClick={() => setIsSidebarOpen(false)}
  />

  {/* Sidebar Content */}
  <motion.div
    className="absolute right-0 top-0 w-80 h-full bg-gradient-to-br from-blue-900 via-blue-800 to-sky-900"
    variants={{
      visible: { x: 0 },
      hidden: { x: "100%" }
    }}
    transition={{ type: "spring", damping: 20 }}
  >
    {/* Header */}
    <div className="p-6 flex justify-between items-center border-b border-white/10">
      <div className="flex items-center">
        <img src="/images/logo2.png" alt="택스인 로고" className="h-10 w-auto" />
        <h2 className="ml-3 text-xl font-bold text-white">세무법인 택스인</h2>
      </div>
      <motion.button
        onClick={() => setIsSidebarOpen(false)}
        className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X size={24} />
      </motion.button>
    </div>

    {/* Navigation */}
    <nav className="mt-6">
      <div className="px-3 ">
        {[
          { title: '회사 소개', href: '/company' },
          { title: '오시는 길', href: '/location' }
        ].map((item, index) => (
          <motion.a
            key={item.title}
            href={item.href}
            className="flex items-center px-4 py-4 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors mb-1"
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-lg font-bold">{item.title}</span>
          </motion.a>
        ))}
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