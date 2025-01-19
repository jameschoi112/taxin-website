import React, { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  getDocs,
  updateDoc,
  deleteDoc,  // deleteDoc 추가
  doc
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import Sidebar from './Sidebar';
import { Trash2,Check, Phone } from 'lucide-react';

const AdminConsultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deleteConsultation = async (id) => {
  if (!window.confirm('정말로 이 상담 신청을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.')) {
    return;
  }

  try {
    await deleteDoc(doc(db, 'consultations', id));
    setConsultations(prevConsultations =>
      prevConsultations.filter(consultation => consultation.id !== id)
    );
  } catch (error) {
    console.error('삭제 실패:', error);
    alert('삭제 중 오류가 발생했습니다.');
  }
};


  // 상담 내역 불러오기
  const fetchConsultations = async () => {
    try {
      const q = query(
        collection(db, 'consultations'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const consultationList = [];
      querySnapshot.forEach((doc) => {
        consultationList.push({ id: doc.id, ...doc.data() });
      });
      setConsultations(consultationList);
      setIsLoading(false);
    } catch (error) {
      console.error('상담 내역을 불러오는데 실패했습니다:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  // 상담 상태 업데이트
  const updateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'consultations', id), {
        status: newStatus
      });
      await fetchConsultations();
    } catch (error) {
      console.error('상태 업데이트 실패:', error);
    }
  };

  // 전화 연결
  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return '';
    const date = timestamp.toDate();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case '신규':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case '진행중':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case '완료':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-sky-900">
      <Sidebar />
      <div className="lg:ml-64 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">상담 신청 내역</h1>
            <p className="text-white/60 mt-2">고객님들의 상담 신청을 관리합니다.</p>
          </div>

          {/* Consultations List */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
            {isLoading ? (
              <div className="p-4">
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-white/5 rounded" />
                  ))}
                </div>
              </div>
            ) : consultations.length > 0 ? (
              <div className="divide-y divide-white/10">
                {consultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="p-6 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <span className={`px-3 py-1 rounded-full text-sm border ${getStatusStyle(consultation.status)}`}>
                            {consultation.status}
                          </span>
                          <h3 className="text-lg font-medium text-white">
                            {consultation.name}
                          </h3>
                          <button
                            onClick={() => handleCall(consultation.phone)}
                            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <Phone className="w-4 h-4 mr-1" />
                            {consultation.phone}
                          </button>
                        </div>
                        <p className="text-white/80 mb-3 whitespace-pre-line">
                          {consultation.message}
                        </p>
                        <p className="text-sm text-white/60">
                          신청일시: {formatDate(consultation.createdAt)}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        {consultation.status !== '진행중' && (
                          <button
                            onClick={() => updateStatus(consultation.id, '진행중')}
                            className="px-3 py-1 text-sm text-yellow-400 hover:text-yellow-300 border border-yellow-400 hover:border-yellow-300 rounded transition-colors"
                          >
                            진행중으로 변경
                          </button>
                        )}
                        {consultation.status !== '완료' && (
                          <button
                            onClick={() => updateStatus(consultation.id, '완료')}
                            className="px-3 py-1 text-sm text-green-400 hover:text-green-300 border border-green-400 hover:border-green-300 rounded transition-colors flex items-center"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            완료처리
                          </button>
                        )}
                        <button
                        onClick={() => deleteConsultation(consultation.id)}
                        className="px-3 py-1 text-sm text-red-400 hover:text-red-300 border border-red-400 hover:border-red-300 rounded transition-colors flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        삭제
                      </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-white/60">
                신청된 상담이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminConsultations;