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
    <div className="relative min-h-screen bg-gray-100">
      {/* Header */}
      <header className="absolute w-full z-50 bg-transparent">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/images/logo2.png" alt="택스인 로고" className="h-12 w-auto" />
            <h1 className="ml-3 text-2xl font-bold text-white">세무법인 택스인</h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-white p-2"
          >
            <Menu />
          </button>
        </div>
      </header>

      {/* Slider */}
      <div className="relative h-[70vh]">
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
                <div className="absolute inset-0 bg-black bg-opacity-50">
                  <div className="container mx-auto px-4 h-full flex items-center">
                    <h2 className="text-white text-4xl font-bold max-w-2xl">
                      {slide.title.map((line, i) => (
                        <div key={i} className="leading-tight">
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
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-900 mb-16 text-center">
            서비스 안내
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-green-900">기장 대리</h3>
            </div>

            <div className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-green-900">세무 신고</h3>
            </div>

            <div className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-green-900">조사 대행</h3>
            </div>

            <div className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-green-900">양도 · 상속 · 증여</h3>
            </div>

            <div className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-green-900">절세 컨설팅</h3>
            </div>

            <div className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-green-900">세무 상담</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-900 mb-8 text-center">
            상담 문의
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-green-900 mb-4">전화 상담</h3>
              <p className="mb-2">평일 오전 9시 ~ 오후 6시</p>
              <p className="mb-4">토,일 공휴일 휴무</p>
              <button
                onClick={handleCall}
                className="flex items-center justify-center w-full bg-green-900 text-white py-3 rounded-lg hover:bg-green-800 transition-colors"
              >
                <Phone className="mr-2" />
                031-206-7676
              </button>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-green-900 mb-4">메일 상담</h3>
              <button
                onClick={() => setShowChatModal(true)}
                className="flex items-center justify-center w-full bg-green-900 text-white py-3 rounded-lg hover:bg-green-800 transition-colors"
              >
                <MessageCircle className="mr-2" />
                상담하러 가기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold mb-2">세무법인 택스인</h3>
              <p>대표자: 장혁배</p>
              <p>전화번호: 031-206-7676</p>
              <p>사업자 등록번호: xxx-xxx-xxxx</p>
              <p>경기 수원시 영통구 청명남로 6 4층</p>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-green-800">
            <p className="text-center">
              Copyright © 2025 semu bubin TEXIN. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Sidebar */}
<div className={`fixed inset-0 z-50 ${isSidebarOpen ? 'visible' : 'invisible'} transition-all duration-300`}>
  <div
    className={`absolute inset-0 bg-black transition-opacity duration-300 ${
      isSidebarOpen ? 'opacity-50' : 'opacity-0'
    }`}
    onClick={() => setIsSidebarOpen(false)}
  />
  <div className={`absolute right-0 top-0 w-80 h-full bg-gradient-to-b from-green-50 to-white shadow-lg transform transition-transform duration-500 ease-in-out ${
    isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
  }`}>
    <div className="p-6 flex justify-between items-center border-b border-green-100">
      <div className="flex items-center">
        <img src="/images/logo.png" alt="택스인 로고" className="h-10 w-auto" />
        <h2 className="ml-3 text-xl font-bold text-green-900">세무법인 택스인</h2>
      </div>
      <button
        onClick={() => setIsSidebarOpen(false)}
        className="text-green-900 hover:text-green-700 p-2 transition-colors"
      >
        <X size={24} />
      </button>
    </div>
    <nav className="mt-6 bg-white">
      <ul className="space-y-2">
        <li>
          <a href="#" className="flex items-center px-6 py-4 text-green-900 font-bold hover:bg-green-50 transition-colors border-l-4 border-transparent hover:border-green-600">
            <span className="text-lg">세무사 소개</span>
          </a>
        </li>
        <li className="border-t border-green-100">
          <a href="#" className="flex items-center px-6 py-4 text-green-900 font-bold hover:bg-green-50 transition-colors border-l-4 border-transparent hover:border-green-600">
            <span className="text-lg">회사 소개</span>
          </a>
        </li>
        <li className="border-t border-green-100">
          <a href="#" className="flex items-center px-6 py-4 text-green-900 font-bold hover:bg-green-50 transition-colors border-l-4 border-transparent hover:border-green-600">
            <span className="text-lg">오시는 길</span>
          </a>
        </li>
      </ul>
    </nav>
    <div className="absolute bottom-0 w-full p-6 border-t border-green-100 bg-green-50">
      <p className="text-sm text-green-800 font-bold text-center">
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
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowChatModal(false)}
          />
          <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-green-900 mb-4">
              준비중입니다
            </h3>
            <button
              onClick={() => setShowChatModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;