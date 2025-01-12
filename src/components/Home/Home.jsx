import React, { useState } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  const slides = [
    {
      title: ["35년", "이상의 경력을 가진", "전문 세무사"],
      image: "/images/slides/slide1.jpg"
    },
    {
      title: ["현장 경험을", "바탕으로", "빠른 세무 문제 해결"],
      image: "/images/slides/slide2.jpg"
    },
    {
      title: ["고객 별", "최적의 맞춤형", "세무 서비스 제공"],
      image: "/images/slides/slide3.jpg"
    },
    {
      title: ["세무 관리 부문", "최고의 파트너"],
      image: "/images/slides/slide4.jpg"
    }
  ];

  const handleCall = () => {
    window.location.href = 'tel:031-206-7676';
  };

  return (
    <div className="relative min-h-screen bg-slate-100">
      {/* Header */}
      <header className="absolute w-full z-50 bg-transparent">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/images/logo2.png" alt="택스인 로고" className="h-14 w-auto" />
            <h1 className="ml-4 text-2xl font-bold text-white tracking-tight">세무법인 택스인</h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Slider */}
      <div className="relative h-[80vh]">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60">
                  <div className="container mx-auto px-6 h-full flex items-center">
                    <h2 className="text-white text-5xl font-bold max-w-3xl">
                      {slide.title.map((line, i) => (
                        <div key={i} className="leading-tight mb-2">
                          {line}
                        </div>
                      ))}
                    </h2>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Services Section */}
<section className="py-24 relative min-h-[600px] overflow-hidden"> {/* overflow-hidden 추가 */}
    {/* Background Image with Blur Effect */}
    <div className="absolute top-0 left-0 right-0 bottom-0 z-0"> {/* inset-0 대신 명시적 위치 지정 */}
      <img
        src="/images/service-bg.jpg"
        alt="background"
        loading="lazy" // 이미지 로딩 최적화
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
      <div className="group bg-blue-900 bg-opacity-100 rounded-lg p-4 hover:bg-opacity-25 transition-all duration-300 flex flex-col items-center">
        <div className="w-12 h-12 flex items-center justify-center mb-2">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white text-center">기장 대리</h3>
      </div>

      <div className="group bg-blue-900 bg-opacity-100 rounded-lg p-4 hover:bg-opacity-25 transition-all duration-300 flex flex-col items-center">
        <div className="w-12 h-12 flex items-center justify-center mb-2">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white text-center">세무 신고</h3>
      </div>

      <div className="group bg-blue-900 bg-opacity-100 rounded-lg p-4 hover:bg-opacity-25 transition-all duration-300 flex flex-col items-center">
        <div className="w-12 h-12 flex items-center justify-center mb-2">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white text-center">조사 대행</h3>
      </div>

      <div className="group bg-blue-900 bg-opacity-100 rounded-lg p-4 hover:bg-opacity-25 transition-all duration-300 flex flex-col items-center">
        <div className="w-12 h-12 flex items-center justify-center mb-2">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white text-center">양도/상속/증여</h3>
      </div>

      <div className="group bg-blue-900 bg-opacity-100 rounded-lg p-4 hover:bg-opacity-25 transition-all duration-300 flex flex-col items-center">
        <div className="w-12 h-12 flex items-center justify-center mb-2">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white text-center">절세 컨설팅</h3>
      </div>

      <div className="group bg-blue-900 bg-opacity-100 rounded-lg p-4 hover:bg-opacity-25 transition-all duration-300 flex flex-col items-center">
        <div className="w-12 h-12 flex items-center justify-center mb-2">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white text-center">세무 상담</h3>
      </div>
    </div>
  </div>
</section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-blue-900 mb-12 text-left">
            Contacts
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-blue-50 p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">전화 상담</h3>
              <p className="text-lg font-semibold mb-2">평일 오전 9시 ~ 오후 6시</p>
              <p className="text-lg font-semibold mb-6">토,일 공휴일 휴무</p>
              <p className="text-3xl text-blue-800 font-bold mb-6">031-206-7676</p>
              <button
                onClick={handleCall}
                className="flex items-center justify-center w-full bg-blue-900 text-white py-4 rounded-xl hover:bg-blue-800 transition-colors text-lg font-semibold"
              >
                <Phone className="mr-3" size={24} />
                전화 연결
              </button>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">메일 상담</h3>
              <button
                onClick={() => setShowChatModal(true)}
                className="flex items-center justify-center w-full bg-blue-900 text-white py-4 rounded-xl hover:bg-blue-800 transition-colors text-lg font-semibold"
              >
                <MessageCircle className="mr-3" size={24} />
                상담하러 가기
              </button>
            </div>
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
      <div className={`fixed inset-0 z-50 ${isSidebarOpen ? 'visible' : 'invisible'} transition-all duration-300`}>
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-60' : 'opacity-0'
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />
        <div className={`absolute right-0 top-0 w-96 h-full bg-gradient-to-b from-blue-50 to-white shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-8 flex justify-between items-center border-b border-blue-100">
            <div className="flex items-center">
              <img src="/images/logo.png" alt="택스인 로고" className="h-12 w-auto" />
              <h2 className="ml-4 text-2xl font-bold text-blue-900">세무법인 택스인</h2>
              </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-blue-900 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <X size={28} />
            </button>
          </div>
          <nav className="mt-8">
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center px-8 py-5 text-blue-900 font-bold hover:bg-blue-50 transition-colors border-l-4 border-transparent hover:border-blue-600">
                  <span className="text-xl">세무사 소개</span>
                </a>
              </li>
              <li className="border-t border-blue-100">
                <a href="#" className="flex items-center px-8 py-5 text-blue-900 font-bold hover:bg-blue-50 transition-colors border-l-4 border-transparent hover:border-blue-600">
                  <span className="text-xl">회사 소개</span>
                </a>
              </li>
              <li className="border-t border-blue-100">
                <a href="#" className="flex items-center px-8 py-5 text-blue-900 font-bold hover:bg-blue-50 transition-colors border-l-4 border-transparent hover:border-blue-600">
                  <span className="text-xl">오시는 길</span>
                </a>
              </li>
            </ul>
          </nav>
          <div className="absolute bottom-0 w-full p-8 border-t border-blue-100 bg-blue-50">
            <p className="text-lg text-blue-900 font-bold text-center">
              세무법인 택스인과 함께<br />
              더 나은 미래를 설계하세요
            </p>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-60"
            onClick={() => setShowChatModal(false)}
          />
          <div className="relative bg-white rounded-xl p-8 w-full max-w-lg mx-6 shadow-2xl">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              준비중입니다
            </h3>
            <button
              onClick={() => setShowChatModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
