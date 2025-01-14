// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { motion } from 'framer-motion';


const Sidebar = ({ isOpen, setIsOpen }) => {


  return (
    <motion.div
      className={`fixed inset-0 z-50 ${isOpen ? 'visible' : 'invisible'}`}
      initial={false}
      animate={isOpen ? "visible" : "hidden"}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Sidebar 내용 */}
    </motion.div>
  );
};

export default Sidebar;