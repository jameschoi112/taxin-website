import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Car, Train } from 'lucide-react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const Location = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <section className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/location-hero-bg.jpg"
            alt="오시는 길 배경"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center">
          <motion.h1
            className="text-4xl md:text-5xl text-white font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            오시는 길
          </motion.h1>
        </div>
      </section>

      {/* Main Location Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Map Image */}
              <div className="rounded-xl overflow-hidden shadow-lg mb-12 h-96 bg-gray-200">
                <img
                  src="/images/map.png"
                  alt="회사 위치 지도"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Location Info */}
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  세무법인 택스인
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-blue-800 flex-shrink-0 mt-1" />
                    <p className="text-lg text-gray-700">
                      경기 수원시 영통구 청명남로 6 4층
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-2">
                      <Train className="w-6 h-6 text-blue-800 flex-shrink-0" />
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-yellow-400 text-white rounded-full text-sm font-medium whitespace-nowrap min-w-[72px] text-center">
                          수인분당
                        </span>
                        <span className="text-gray-600">
                          영통역 2번 출구에서 217m
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Parking Section */}
            <motion.div
              className="mt-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Car className="w-6 h-6 text-blue-800" />
                <h2 className="text-2xl font-bold text-gray-900">
                  주차 안내
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Parking Map */}
                <div className="rounded-xl overflow-hidden shadow-lg h-64 bg-gray-200">
                  <img
                    src="/images/parking.png"
                    alt="주차장 위치"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Parking Information */}
                <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    주차 안내사항
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>• 영통노상주차장에 주차가 가능합니다</li>
                    <li>• 주차 비용은 저희가 전액 부담합니다</li>
                    <li>• 자세한 안내가 필요하시면 전화로 문의 부탁드립니다. 친절히 안내해 드리겠습니다.</li>
                    <li>• 주차 관련 문의: 031-206-7676</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Location;