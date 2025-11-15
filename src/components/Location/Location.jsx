import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Car, Train, Phone } from 'lucide-react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const NAVER_MAP_KEY = process.env.REACT_APP_NAVER_MAP_KEY_ID || process.env.REACT_APP_NAVER_MAP_CLIENT_ID;
const NAVER_SCRIPT_ID = 'naver-map-sdk';
const NAVER_SCRIPT_BASE_URL = 'https://oapi.map.naver.com/openapi/v3/maps.js';

const OFFICE_COORDINATES = {
  lat: 37.2505091,
  lng: 127.0737612,
};

const Location = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapError, setMapError] = useState('');
  const mapElementRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const labelOverlayRef = useRef(null);
  const infoWindowRef = useRef(null);

  const handleCall = () => {
    window.location.href = 'tel:031-206-7676';
  };

  useEffect(() => {
    if (!NAVER_MAP_KEY || !mapElementRef.current) {
      return;
    }

    let isMounted = true;
    const scriptUrl = `${NAVER_SCRIPT_BASE_URL}?ncpKeyId=${NAVER_MAP_KEY}`;
    const previousAuthFailureHandler = window.navermap_authFailure;

    window.navermap_authFailure = () => {
      if (!isMounted) return;
      setIsMapReady(false);
      setMapError('네이버 지도 인증에 실패했습니다. 네이버 클라우드 콘솔에서 허용된 도메인에 현재 주소를 추가해 주세요.');
    };

    const initializeMap = () => {
      if (!isMounted || !window.naver?.maps || !mapElementRef.current) {
        return;
      }

      const { maps } = window.naver;
      const center = new maps.LatLng(OFFICE_COORDINATES.lat, OFFICE_COORDINATES.lng);

      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new maps.Map(mapElementRef.current, {
          center,
          zoom: 17,
          minZoom: 10,
          scaleControl: false,
          zoomControl: true,
          zoomControlOptions: {
            style: maps.ZoomControlStyle.SMALL,
            position: maps.Position.RIGHT_BOTTOM,
          },
          logoControlOptions: {
            position: maps.Position.BOTTOM_RIGHT,
          },
        });
      } else {
        mapInstanceRef.current.setCenter(center);
      }

      if (!markerRef.current && mapInstanceRef.current) {
        markerRef.current = new maps.Marker({
          position: center,
          map: mapInstanceRef.current,
          title: '세무법인 택스인',
        });
      } else if (markerRef.current) {
        markerRef.current.setPosition(center);
      }

      const labelContent = `
        <div style="
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: white;
          border-radius: 9999px;
          border: 1px solid #d1d5db;
          box-shadow: 0 6px 18px rgba(0,0,0,0.12);
          font-size: 14px;
          font-weight: 600;
          color: #1f2937;
          white-space: nowrap;
        ">
          <span style="
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 9999px;
            background: #1d4ed8;
          "></span>
          <span>세무법인 택스인</span>
        </div>
      `;

      try {
        if (maps.CustomOverlay) {
          if (!labelOverlayRef.current) {
            labelOverlayRef.current = new maps.CustomOverlay({
              position: center,
              content: labelContent,
              xAnchor: 0.5,
              yAnchor: 1.3,
            });
          } else {
            labelOverlayRef.current.setContent(labelContent);
            labelOverlayRef.current.setPosition(center);
          }
          labelOverlayRef.current.setMap(mapInstanceRef.current);
          infoWindowRef.current = null;
        } else {
          if (!infoWindowRef.current) {
            infoWindowRef.current = new maps.InfoWindow({
              content: labelContent,
              borderWidth: 0,
              disableAnchor: true,
              backgroundColor: 'transparent',
            });
          } else {
            infoWindowRef.current.setContent(labelContent);
          }

          if (markerRef.current) {
            infoWindowRef.current.open(mapInstanceRef.current, markerRef.current);
          }
        }
      } catch (overlayError) {
        console.error('네이버 지도 라벨 렌더링 실패:', overlayError);
      }

      setIsMapReady(true);
      setMapError('');
    };

    const loadNaverScript = () =>
      new Promise((resolve, reject) => {
        if (window.naver?.maps) {
          resolve();
          return;
        }

        let script = document.getElementById(NAVER_SCRIPT_ID);
        const handleLoad = () => resolve();
        const handleError = (event) => reject(event);

        if (script && script.getAttribute('src') !== scriptUrl) {
          script.removeEventListener('load', handleLoad);
          script.removeEventListener('error', handleError);
          script.remove();
          script = null;
          window.naver = undefined;
        }

        if (!script) {
          script = document.createElement('script');
          script.id = NAVER_SCRIPT_ID;
          script.src = scriptUrl;
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
        }

        script.addEventListener('load', handleLoad, { once: true });
        script.addEventListener('error', handleError, { once: true });
      });

    loadNaverScript()
      .then(() => {
        if (!window.naver?.maps) {
          throw new Error('NAVER 지도 객체 초기화에 실패했습니다.');
        }
        initializeMap();
      })
      .catch(() => {
        if (!isMounted) return;
        setIsMapReady(false);
        setMapError('네이버 지도 스크립트를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
      });

    return () => {
      isMounted = false;
      if (previousAuthFailureHandler) {
        window.navermap_authFailure = previousAuthFailureHandler;
      } else {
        delete window.navermap_authFailure;
      }
    };
  }, []);

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
              {/* Map */}
              <div className="rounded-xl overflow-hidden shadow-lg mb-12 h-40 sm:h-56 md:h-72 lg:h-96 bg-gray-200 relative">
                {!isMapReady && (
                  <img
                    src="/images/map.png"
                    alt="세무법인 택스인 위치 안내"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div
                  ref={mapElementRef}
                  className={`w-full h-full transition-opacity duration-300 ${
                    isMapReady ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {!NAVER_MAP_KEY && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white text-center px-6">
                    <p className="text-lg font-semibold mb-2">네이버 지도 API 키가 필요합니다.</p>
                    <p className="text-sm text-gray-100">
                      루트 디렉터리에 .env 파일을 생성하고 REACT_APP_NAVER_MAP_KEY_ID (또는 기존 REACT_APP_NAVER_MAP_CLIENT_ID) 값을 설정해 주세요.
                    </p>
                  </div>
                )}
                {mapError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white px-6 text-center">
                    {mapError}
                  </div>
                )}
              </div>

              {/* Location Info */}
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  세무법인 택스인
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-blue-800 flex-shrink-0 mt-1" />
                    <p className="text-s text-gray-700">
                      경기 수원시 영통구 청명남로 6 4층
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-2">
                      <Train className="w-6 h-6 text-blue-800 flex-shrink-0" />
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-yellow-400 text-white rounded-full text-sm font-bold whitespace-nowrap min-w-[72px] text-center">
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
                  <ul className="space-y-3 text-gray-600 mb-8">
                    <li>• 노상주차 구획선에 주차가 가능합니다.</li>
                    <li>• 근무시간 중 동수원 세무서에 주차 가능하며 5분이내 거리입니다.</li>
                    <li>• 자세한 안내가 필요하시면 전화로 문의 부탁드립니다. 친절히 안내해 드리겠습니다.</li>
                    <li>• 주차 관련 문의 : 031-206-7676</li>
                  </ul>
                  <div className="flex justify-center">
                  <motion.button
      onClick={handleCall}
      className="bg-blue-800 hover:bg-blue-700 text-white py-3 px-6 rounded-xl flex items-center justify-center space-x-3 transition-colors w-3/4"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Phone size={20} />
      <span className="text-lg font-medium">전화 연결</span>
    </motion.button>
                 </div>
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