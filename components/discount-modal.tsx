"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

export default function DiscountModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [userActivity, setUserActivity] = useState(0);
  const [hasShown, setHasShown] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { isDarkTheme } = useTheme();

  // Check localStorage on component mount
  useEffect(() => {
    const submitted = localStorage.getItem("servana-discount-submitted");
    if (submitted === "true") {
      setHasSubmitted(true);
    }
  }, []);

  useEffect(() => {
    // Don't show modal if user has already submitted
    if (hasShown || hasSubmitted) return;

    let showTimer: NodeJS.Timeout;
    let activityCount = 0;

    const handleActivity = () => {
      activityCount++;

      // Show after 5 user interactions if timer hasn't triggered yet
      if (activityCount >= 5 && !hasShown && !hasSubmitted) {
        clearTimeout(showTimer);
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // Add event listeners for user activity
    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("scroll", handleActivity);
    document.addEventListener("click", handleActivity);
    document.addEventListener("keydown", handleActivity);

    // Show modal after random time (3-8 seconds)
    const randomTime = Math.random() * 5000 + 3000; // 3-8 seconds

    showTimer = setTimeout(() => {
      if (!hasShown && !hasSubmitted) {
        setIsVisible(true);
        setHasShown(true);
      }
    }, randomTime);

    return () => {
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("scroll", handleActivity);
      document.removeEventListener("click", handleActivity);
      document.removeEventListener("keydown", handleActivity);
      clearTimeout(showTimer);
    };
  }, [hasShown, hasSubmitted]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted!");

    // <form action="https://api.web3forms.com/submit" method="POST">

    // Send form data to Web3Forms API
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Thank you! You will receive offers and discounts soon!");
        } else {
          console.error("Form submission failed:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });

    // Mark as submitted in localStorage to prevent future submissions
    localStorage.setItem("servana-discount-submitted", "true");
    setHasSubmitted(true);
    setIsVisible(false);
  };

  // Handle backdrop click to close modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
    }
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isVisible]);

  // Theme-based styling
  const themeClasses = {
    background: isDarkTheme ? "bg-black" : "bg-white",
    text: isDarkTheme ? "text-white" : "text-black",
    textSecondary: isDarkTheme ? "text-gray-300" : "text-gray-700",
    textMuted: isDarkTheme ? "text-gray-400" : "text-gray-600",
    border: isDarkTheme ? "border-white/10" : "border-black/10",
    inputBg: isDarkTheme ? "bg-white/5" : "bg-white",
    inputBorder: isDarkTheme ? "border-white/20" : "border-gray-300",
    inputFocus: isDarkTheme ? "focus:border-white/40" : "focus:border-black",
    buttonPrimary: isDarkTheme
      ? "bg-yellow-500 text-black hover:bg-yellow-400"
      : "bg-black text-white hover:bg-gray-800",
    closeButton: isDarkTheme
      ? "bg-white/10 hover:bg-white/20 text-white"
      : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-6"
          onClick={handleBackdropClick}
        >
          <motion.form
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            onSubmit={handleSubmit}
            className={`max-w-md w-full ${themeClasses.background} rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col gap-4 relative mx-4 border ${themeClasses.border}`}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="hidden"
              name="access_key"
              value="d1e2c608-ca84-4817-91fc-4597f61e5c91"
            ></input>

            {/* Close Button */}
            <motion.button
              type="button"
              onClick={handleClose}
              className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full ${themeClasses.closeButton} transition-colors`}
              aria-label="Close modal"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            <motion.div
              className="mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <h2
                className={`text-2xl font-bold mb-2 ${themeClasses.text} pr-8`}
              >
                Welcome to the Circle, where everything else is ordinary.
              </h2>
              <p className={`${themeClasses.textMuted} mb-4 text-sm`}>
                Join the Circle and get your first experience discount!
              </p>
            </motion.div>

            <motion.label
              className="flex flex-col gap-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              <span
                className={`text-sm font-medium ${themeClasses.textSecondary}`}
              >
                Name
              </span>
              <input
                type="text"
                name="name"
                className={`${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${themeClasses.inputFocus} focus:border-transparent text-base ${themeClasses.text}`}
                placeholder="Your Name"
                required
              />
            </motion.label>

            <motion.label
              className="flex flex-col gap-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <span
                className={`text-sm font-medium ${themeClasses.textSecondary}`}
              >
                Email
              </span>
              <input
                type="email"
                name="email"
                className={`${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${themeClasses.inputFocus} focus:border-transparent text-base ${themeClasses.text}`}
                placeholder="you@email.com"
                required
              />
            </motion.label>

            <motion.label
              className="flex flex-col gap-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
            >
              <span
                className={`text-sm font-medium ${themeClasses.textSecondary}`}
              >
                Phone
              </span>
              <input
                type="tel"
                name="phone"
                className={`${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${themeClasses.inputFocus} focus:border-transparent text-base ${themeClasses.text}`}
                placeholder="+971 5x xxx xxxx"
                required
              />
            </motion.label>

            <motion.button
              type="submit"
              className={`mt-4 ${themeClasses.buttonPrimary} rounded-lg px-6 py-3 font-semibold transition-colors text-base`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Unlock Discount
            </motion.button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
