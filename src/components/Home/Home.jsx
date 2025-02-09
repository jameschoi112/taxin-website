import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useForm } from 'react-hook-form';
import smoothscroll from 'smoothscroll-polyfill';
import _ from 'lodash';
import Sidebar from '../Sidebar/Sidebar';
import {X, Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import emailjs from '@emailjs/browser';
import Header from '../Header/Header';


const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
  const logPageView = async () => {
    try {
      await fetch('https://us-central1-texin-e2c8b.cloudfunctions.net/logPageView', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: window.location.pathname,
          userId: 'anonymous', // 또는 로그인된 사용자 ID
          userAgent: window.navigator.userAgent
        })
      });
    } catch (error) {
      console.error('Failed to log page view:', error);
    }
  };

  logPageView();
}, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();


// Firebase 저장 함수
const onSubmit = async (data) => {
  if (!isAgreed) {
    alert('개인정보 수집 이용에 동의해주세요.');
    return;
  }

  try {
    // Firebase에 저장
    await addDoc(collection(db, 'consultations'), {
      name: data.name,
      phone: data.phone,
      message: data.message,
      createdAt: serverTimestamp(),
      status: '신규'
    });

    // 이메일 발송
    await emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      {
        to_email: 'wodud0112@naver.com',
        to_name: '관리자',
        from_name: data.name,
        phone: data.phone,
        message: data.message,
        subject: '[택스인] 새로운 상담 신청이 접수되었습니다.'
      },
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    );

    alert('상담 신청이 완료되었습니다. 관련자가 확인 후 빠르게 연락드리겠습니다. 감사합니다.');
    reset();
    setIsAgreed(false);
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
  <Header setIsSidebarOpen={setIsSidebarOpen} />
       <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
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
          duration: 1.2,
          delay: index * 0.5,  // 각 줄마다 0.2초씩 딜레이
          ease: [0.16, 1, 0.3, 1]  // custom easing
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
<div className="mt-8 md:mt-12 h-[30vh] md:h-[60vh]">
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
    breakpoints={{
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    }}
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
        <div className="relative h-full rounded-lg overflow-hidden">
          <img
            src={service.image}
            alt={service.titleKo}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white text-xl font-medium mb-2">
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

      {/* Introduction Section */}
<section className="relative py-20 overflow-hidden">
  {/* Background with blur */}
  <div className="absolute inset-0">
    <img
      src="/images/intro-bg.jpg"
      alt="background"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
  </div>

  <div className="container mx-auto px-6 relative z-10">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
      </motion.div>

      <motion.p
        className="text-xl md:text-2xl leading-relaxed text-gray-800 font-semibold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="text-blue-600 font-bold">35년 이상의</span> 현장 경험을 바탕으로<br />
        고객님의 세무문제 해결에<br />
        최선을 다하겠습니다.
      </motion.p>
    </div>
  </div>
</section>


      {/* Career Section */}
<section className="relative py-16 overflow-hidden">
  {/* Background with blue overlay */}
  <div className="absolute inset-0">
    <img
      src="/images/career-bg.jpg"
      alt="background"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-blue-900/80" />
  </div>

  <div className="container mx-auto px-6 relative z-10">
    <div className="max-w-4xl">
      {/* Name and Title */}
      <motion.div
        className="flex items-baseline gap-4 mb-8"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white">장혁배</h2>
        <div>
          <p className="text-xl text-white mb-1">대표 세무사</p>
          <p className="text-lg text-blue-200">Tax Accountant</p>
        </div>
      </motion.div>

      {/* Career History */}
      <div className="grid md:grid-cols-[120px,1fr] gap-4">
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="text-xl font-bold text-white"
  >
    약력
  </motion.div>
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="space-y-3"
  >
    {[
      "세무법인 택스인 대표세무사",
      "국세청 35년 근무",
      "동안양세무서 납세자보호담당관",
      "성남세무서 조사과장",
      "분당세무서 부가가치세과장",
      "경기 광주세무서 재산 법인세과장",
      "이하 중략"

    ].map((item, index) => (
      <motion.div
        key={index}
        className="flex items-center gap-2 text-lg text-gray-100"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 + (index * 0.1) }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-blue-300 flex-shrink-0" />
        <p>{item}</p>
      </motion.div>
    ))}
  </motion.div>
</div>
    </div>
  </div>
</section>
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
          <div className="relative">
    <div className="bg-white/10 border border-white/20 rounded-lg p-4 h-32 overflow-y-auto text-sm text-white/70">
      <h4 className="font-medium mb-2">개인정보 수집·이용 동의(필수)</h4>
      <h4 className="font-medium mb-2">세무법인 택스인(이하 “회사”)은 고객님의 개인정보를 소중히 여기며, 관련 법령을 준수하여 개인정보를 보호하기 위해 최선을 다하고 있습니다. 아래는 개인정보취급방침의 주요 내용을 담고 있습니다.</h4>
      <h4 className="font-medium mb-2">개인정보의 수집 항목 및 방법</h4>
      <h4 className="font-medium mb-2">수집방법 : 홈페이지 - 상담 신청</h4>
      <p>1. 수집하는 개인정보 항목: 성함, 연락처</p>
      <p>2. 수집 및 이용목적 : 상담 문의에 대한 답변, 상담 관련 용도</p>
      <p>3. 보유 및 이용기간 : 3개월 / 상담 완료 후 폐기</p>
      <p>4. 동의를 거부할 권리가 있으며, 동의 거부 시 상담 신청이 제한됩니다.</p>
    </div>
  </div>
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      id="agree"
      checked={isAgreed}
      onChange={(e) => setIsAgreed(e.target.checked)}
      className="w-4 h-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500"
    />
    <label htmlFor="agree" className="text-white/70 text-sm">
      개인정보 수집·이용에 동의합니다.
    </label>
  </div>
  <motion.button
    type="submit"
    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-xl flex items-center justify-center space-x-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    disabled={isSubmitting || !isAgreed}
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
              <p className="text-sm mb-2">팩스번호: 031-254-1840</p>
              <p className="text-sm mb-2">이메일: Jhbkr@naver.com</p>
              <p className="text-sm mb-4">사업자 등록번호: 135-85-51836</p>
              <p className="text-sm">경기 수원시 영통구 청명남로 6 4층</p>
              <p className="text-sm">Yeongtong-dong, 4 floor , 6 Cheongmyeongnam-ro, Yeongtong-gu, Suwon-si, Gyeonggi-do</p>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-blue-800">
            <p className="text-left text-sm">
              Copyright © 2025 Semububin Taxin. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

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