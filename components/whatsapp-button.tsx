"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const whatsappNumber = "+971502438793";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber.replace(
    /[^0-9]/g,
    ""
  )}&text=Hello Servana Circle, I would like to speak to your concierge team.`;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 1 }}
    >
      <div className="relative">
        {/* Tooltip */}
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-16 bottom-2 bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg"
          >
            Speak to Concierge
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 translate-x-1 w-2 h-2 bg-black rotate-45"></div>
          </motion.div>
        )}

        {/* WhatsApp Button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaWhatsapp className="w-6 h-6" />
        </motion.a>
      </div>
    </motion.div>
  );
}
