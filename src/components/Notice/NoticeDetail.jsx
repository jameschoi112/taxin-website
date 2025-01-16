import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Header from '../Header/Header';
import { ArrowLeft } from 'lucide-react';

const NoticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const getCategoryStyle = (category) => {
    return category === '서비스'
      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
      : 'bg-violet-100 text-violet-700 border border-violet-200';
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <Header />

      <div className="max-w-5xl mx-auto px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/notice')}
            className="flex items-center text-white hover:text-indigo-600 font-bold transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            목록으로 돌아가기
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-indigo-100/50">
          {isLoading ? (
            <div className="p-8 space-y-4 animate-pulse">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-6 w-16 bg-indigo-100 rounded-full"></div>
              </div>
              <div className="h-8 bg-indigo-50 rounded-lg w-3/4"></div>
              <div className="h-4 bg-indigo-50 rounded w-32"></div>
              <div className="border-t border-indigo-100 my-8"></div>
              <div className="space-y-2">
                <div className="h-4 bg-indigo-50 rounded"></div>
                <div className="h-4 bg-indigo-50 rounded w-5/6"></div>
                <div className="h-4 bg-indigo-50 rounded w-4/6"></div>
              </div>
            </div>
          ) : notice ? (
            <article className="p-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <span className={`text-sm px-3 py-1 rounded-full ${getCategoryStyle(notice.category)}`}>
                    {notice.category || '서비스'}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {notice.title}
                </h1>
                <div className="text-gray-500">
                  {formatDate(notice.createdAt)}
                </div>
              </div>

              <div className="border-t border-indigo-100 my-8"></div>

              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {notice.content}
                </p>
              </div>
            </article>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">존재하지 않는 공지사항입니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;