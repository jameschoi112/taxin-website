import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, BookOpen, ChartBar } from 'lucide-react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { LazyBackground } from '../common/LazyMedia';

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
                  icon: <Shield className="w-10 h-10 text-white" />,
                  title: "신뢰성",
                  description: "엄격한 윤리기준과 전문성을 바탕으로 고객의 신뢰를 최우선으로 생각합니다.",
                  bgImage: "/images/trust-bg.jpg"
                },
                {
                  icon: <BookOpen className="w-10 h-10 text-white" />,
                  title: "전문성",
                  description: "35년의 현장 경험을 바탕으로 최고의 전문성을 유지합니다.",
                  bgImage: "/images/expertise-bg.jpg"
                },
                {
                  icon: <ChartBar className="w-10 h-10 text-white" />,
                  title: "맞춤성",
                  description: "고객님께 맞춤형 최적의 서비스를 제공합니다.",
                  bgImage: "/images/customization-bg.jpg"
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <LazyBackground
                    src={value.bgImage}
                    className="h-64 overflow-hidden rounded-lg"
                    overlayClassName="bg-indigo-900/80 transition-opacity duration-300 group-hover:bg-indigo-900/70"
                    backgroundClassName="transition-transform duration-300 group-hover:scale-110"
                  >
                    <div className="h-full p-8 flex flex-col">
                      <div className="mb-6">{value.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-4">
                        {value.title}
                      </h3>
                      <p className="text-gray-100 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </LazyBackground>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
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
                회사 소개
              </h2>
              <div className="w-24 h-1 bg-indigo-700 mx-auto"/>
            </motion.div>

            <motion.div
              className="bg-gray-50 rounded-xl p-8 md:p-12 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>세무법인 택스인</strong>은 세무 전문가들이 모인 전문 기관으로 기장 대리, 세무 신고, 조사 대행, 양도소득세 및 상속증여세 신고와 납부, 그리고 조세 절세 컨설팅 등의 서비스를 제공합니다.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  저희 대표세무사 장혁배는 <strong>35년 이상의 현장 경험</strong>을 바탕으로 고객님의 세무 문제를 해결하는 데 최선을 다하고 있습니다. 그동안 쌓아온 풍부한 세무 지식과 실무 경험을 통해 고객에게 <strong>맞춤형 최적의 세무 서비스</strong>를 제공할 것을 약속드립니다.
                </p>
                <p className="text-gray-700 leading-relaxed mb-8">
                  앞으로도 고객님의 세무 관리에 있어 최고의 파트너가 되어 드리겠습니다. 항상 건강하시고 사업이 더욱 번창하시길 기원합니다.
                </p>
                <div className="text-right">
                  <p className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 inline-block text-transparent bg-clip-text">
                    세무법인 택스인 대표세무사 장혁배
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Career History Section */}
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
                대표세무사 주요경력
              </h2>
              <div className="w-24 h-1 bg-yellow-600 mx-auto"/>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"/>

              {[
  {
    title: "국세청 35년 근무",
    description: "국세청에서의 오랜 경험을 통해 축적한 전문성",
    align: "left"
  },
  {
    title: "주요 보직",
    description: "동안양세무서 납세자보호담당관\n성남세무서 조사과장\n분당세무서 부가가치세과장\n경기광주세무서 재산법인세과장",
    align: "right"
  },
  {
    title: "국세청 핵심부서 근무",
    description: "중부지방국세청 체납추적팀장\n국세청 심사2과\n중부지방국세청 송무과\n중부지방국세청 조사1국/조사3국",
    align: "left"
  },
  {
    title: "세무서 근무",
    description: "동수원, 수원, 안산 등 근무",
    align: "right"
  },
  {
    title: "학력",
    description: "세무대학 7회 졸업\n청석고 12회 졸업\n청안 초-중 졸업",
    align: "left"
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
      <div className={`w-1/2 ${item.align === 'left' ? 'pr-8 text-right' : 'pl-8 text-left'} ${item.align === 'right' && 'order-2'}`}>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {item.title}
        </h3>
        <p className="text-gray-600 whitespace-pre-line">
          {item.description}
        </p>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4">
        <div className="w-4 h-4 rounded-full bg-yellow-600 border-4 border-white"/>
      </div>
      {item.align === 'left' ? <div className="w-1/2 pl-8"/> : <div className="w-1/2 pr-8"/>}
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