// src/components/TaxInfo/NoticeDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { ArrowLeft } from 'lucide-react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const NoticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const docRef = doc(db, 'notices', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNotice({ id: docSnap.id, ...docSnap.data() });
        }
        setIsLoading(false);
      } catch (error) {
        console.error('공지사항을 불러오는데 실패했습니다:', error);
        setIsLoading(false);
      }
    };

    fetchNotice();
  }, [id]);

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return '';
    const date = timestamp.toDate();
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getCategoryStyle = (category) => {
    return category === '서비스'
      ? 'bg-blue-50 text-blue-600 border-blue-100'
      : 'bg-violet-50 text-violet-600 border-violet-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <motion.button
            onClick={() => navigate('/notice')}
            className="flex items-center text-gray-600 hover:text-indigo-600 mb-8 group"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>목록으로 돌아가기</span>
          </motion.button>

          {isLoading ? (
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="space-y-2 pt-8">
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-4/5" />
                </div>
              </div>
            </div>
          ) : notice ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`text-sm px-3 py-1 rounded-full border ${getCategoryStyle(notice.category)}`}>
                    {notice.category || '서비스'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(notice.createdAt)}
                  </span>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-8">
                  {notice.title}
                </h1>

                <div className="prose prose-indigo max-w-none">
                  <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                    {notice.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <p className="text-gray-500">존재하지 않는 공지사항입니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;