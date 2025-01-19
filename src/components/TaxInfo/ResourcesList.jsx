import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { ExternalLink } from 'lucide-react';

const ResourcesList = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

    fetchResources();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-14 bg-blue-100 rounded-lg" />
            </div>
          ))}
        </div>
      ) : resources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <motion.a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all h-14 flex items-center justify-between px-6">
                <span className="font-medium">{resource.title}</span>
                <ExternalLink className="w-4 h-4 opacity-70" />
              </div>
            </motion.a>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
          등록된 자료가 없습니다.
        </div>
      )}
    </div>
  );
};

export default ResourcesList;