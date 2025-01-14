import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, BookOpen, ChartBar } from 'lucide-react';
import Header from '../Header/Header';  // Header import
import Sidebar from '../Sidebar/Sidebar';  // Sidebar도 따로 컴포넌트로 분리하면 좋습니다


const Company = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  return (
    <div className="min-h-screen bg-gray-50">
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-gray-900 to-gray-800" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center max-w-6xl mx-auto px-6">
          <motion.h1
            className="text-4xl md:text-6xl text-white font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            세무법인 택스인
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            신뢰와 전문성으로 고객의 미래를 설계하는 재무 파트너
          </motion.p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                세무법인 택스인이 지향하는 가치
              </h2>
              <div className="w-24 h-1 bg-indigo-700 mx-auto"/>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="w-10 h-10 text-indigo-700" />,
                  title: "신뢰성",
                  description: "엄격한 윤리기준과 전문성을 바탕으로 고객의 신뢰를 최우선으로 생각합니다."
                },
                {
                  icon: <BookOpen className="w-10 h-10 text-indigo-700" />,
                  title: "전문성",
                  description: "지속적인 연구와 교육을 통해 최고의 전문성을 유지합니다."
                },
                {
                  icon: <ChartBar className="w-10 h-10 text-indigo-700" />,
                  title: "혁신성",
                  description: "변화하는 세무환경에 맞춰 혁신적인 서비스를 제공합니다."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-lg p-8 border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="mb-6">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                연혁
              </h2>
              <div className="w-24 h-1 bg-indigo-700 mx-auto"/>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"/>

              {[
                {
                  year: "2023",
                  title: "세무법인 택스인 설립",
                  description: "고객 중심의 차별화된 세무 서비스를 제공하기 위해 설립되었습니다."
                },
                {
                  year: "2023",
                  title: "디지털 세무 시스템 도입",
                  description: "업계 최초 AI 기반 세무 분석 시스템을 도입하여 서비스 품질을 향상했습니다."
                },
                {
                  year: "2024",
                  title: "서울 본사 확장 이전",
                  description: "늘어나는 고객사의 요구에 부응하기 위해 본사를 확장 이전했습니다."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="relative mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="flex items-center">
                    <div className="w-1/2 pr-8 text-right">
                      <div className="text-xl font-bold text-indigo-700 mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4">
                      <div className="w-4 h-4 rounded-full bg-indigo-700 border-4 border-white"/>
                    </div>
                    <div className="w-1/2 pl-8"/>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Company;