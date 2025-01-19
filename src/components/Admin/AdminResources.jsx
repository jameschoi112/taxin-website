import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Plus, Pencil, Trash2, X, Check, Link as LinkIcon } from 'lucide-react';
import Sidebar from './Sidebar';

const AdminResources = () => {
  const [resources, setResources] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentResource, setCurrentResource] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    url: ''
  });

  // 자료 목록 불러오기
  const fetchResources = async () => {
    try {
      const q = query(collection(db, 'resources'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const resourceList = [];
      querySnapshot.forEach((doc) => {
        resourceList.push({ id: doc.id, ...doc.data() });
      });
      setResources(resourceList);
      setIsLoading(false);
    } catch (error) {
      console.error('자료를 불러오는데 실패했습니다:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // 자료 추가/수정 모달 열기
  const openModal = (resource = null) => {
    if (resource) {
      setFormData({
        title: resource.title,
        url: resource.url
      });
      setCurrentResource(resource);
    } else {
      setFormData({ title: '', url: '' });
      setCurrentResource(null);
    }
    setIsModalOpen(true);
  };

  // 자료 저장
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.url.startsWith('http://') && !formData.url.startsWith('https://')) {
      formData.url = 'https://' + formData.url;
    }

    try {
      const resourceData = {
        title: formData.title,
        url: formData.url,
        updatedAt: serverTimestamp()
      };

      if (currentResource) {
        // 수정
        await updateDoc(doc(db, 'resources', currentResource.id), resourceData);
      } else {
        // 새로 추가
        resourceData.createdAt = serverTimestamp();
        await addDoc(collection(db, 'resources'), resourceData);
      }

      await fetchResources();
      setIsModalOpen(false);
      setFormData({ title: '', url: '' });
    } catch (error) {
      console.error('자료 저장 실패:', error);
      alert('저장에 실패했습니다.');
    }
  };

  // 자료 삭제
  const handleDelete = async (resourceId) => {
    if (!window.confirm('정말로 이 자료를 삭제하시겠습니까?')) return;

    try {
      await deleteDoc(doc(db, 'resources', resourceId));
      await fetchResources();
    } catch (error) {
      console.error('자료 삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-sky-900">
      <Sidebar />
      <div className="lg:ml-64 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">자료실 관리</h1>
              <p className="text-white/60 mt-2">자료실 링크를 관리할 수 있습니다.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal()}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              새 링크 추가
            </motion.button>
          </div>

          {/* Resources List */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
            {isLoading ? (
              <div className="p-4">
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-white/5 rounded" />
                  ))}
                </div>
              </div>
            ) : resources.length > 0 ? (
              <div className="divide-y divide-white/10">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="p-6 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">
                            {resource.title}
                          </h3>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <LinkIcon className="w-4 h-4" />
                          </a>
                        </div>
                        <p className="text-white/60 text-sm">
                          {resource.url}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openModal(resource)}
                          className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(resource.id)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-white/60">
                등록된 자료가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-lg"
          >
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {currentResource ? '링크 수정' : '새 링크 추가'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      버튼명
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="버튼에 표시될 이름을 입력하세요"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL
                    </label>
                    <input
                      type="text"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-b-xl flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                >
                  <Check className="w-5 h-5 mr-2" />
                  {currentResource ? '수정하기' : '추가하기'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminResources;