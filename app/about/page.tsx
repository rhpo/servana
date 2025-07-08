"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Instagram, Sun, Moon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/lib/Logo";
import WhatsAppButton from "@/components/whatsapp-button";
import { useTheme } from "@/components/theme-provider";
import { HeroVideo } from "@/components/HeroVideo";
import Footer from "@/components/footer";

export default function AboutPage() {
  const { theme, isDarkTheme, setTheme } = useTheme();
  const whatsappUrl = `https://api.whatsapp.com/send?phone=971502438793&text=Hi Servana Circle, I’m ready to unlock an exclusive Dubai experience. Please let me know what’s available.`;
  const joinCircleUrl = `https://api.whatsapp.com/send?phone=971502438793&text=Hi Servana Circle, I’m ready to unlock an exclusive Dubai experience. Please let me know what’s available.`;

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  const themeClasses = {
    background: isDarkTheme ? "bg-black" : "bg-white",
    text: isDarkTheme ? "text-white" : "text-black",
    textSecondary: isDarkTheme ? "text-gray-300" : "text-gray-700",
    textMuted: isDarkTheme ? "text-gray-400" : "text-gray-600",
    navBg: isDarkTheme ? "bg-black/80" : "bg-white/80",
    border: isDarkTheme ? "border-white/10" : "border-black/10",
    sectionBg: isDarkTheme ? "bg-white/5" : "bg-black/5",
    buttonOutline: isDarkTheme
      ? "border-white text-white hover:bg-white hover:text-black"
      : "border-black text-black hover:bg-black hover:text-white",
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${themeClasses.background} ${themeClasses.text}`}
    >
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 ${themeClasses.navBg} backdrop-blur-md border-b ${themeClasses.border}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Mobile: Circle button with arrow, Desktop: Back to Home text */}
          <Link
            href="/"
            className="flex items-center hover:opacity-70 transition-opacity"
          >
            <div className="sm:hidden">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-10 h-10 rounded-full border-2 ${themeClasses.border} flex items-center justify-center hover:bg-white/10 transition-colors`}
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.div>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm tracking-wide">BACK TO HOME</span>
            </div>
          </Link>

          <div className="w-24 sm:w-32 tracking-wider">
            <Logo darkmode={isDarkTheme} />
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full hover:opacity-70 transition-opacity`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {isDarkTheme ? (
                <Sun size={16} className="sm:w-5 sm:h-5" />
              ) : (
                <Moon size={16} className="sm:w-5 sm:h-5" />
              )}
            </motion.button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-xxl"
            >
              <FaWhatsapp size={26} />
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroVideo />

        {/* Dark overlay for better text readability */}
        <div
          className={`absolute inset-0 ${
            isDarkTheme ? "bg-black/70" : "bg-black/30"
          }`}
        />

        <div className="relative z-30 text-center max-w-4xl mx-auto px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-7xl hero-heading mb-6 sm:mb-8 tracking-tight text-white"
          >
            About Servana Circle
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl font-light text-gray-300 mb-6 sm:mb-8 leading-relaxed"
          >
            Redefining luxury experiences in Dubai through exceptional service
            and exclusive access.
          </motion.p>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl section-heading mb-6 sm:mb-8">
              What Do We Offer?
            </h2>
            <p
              className={`text-lg sm:text-xl ${themeClasses.textSecondary} leading-relaxed mb-8 sm:mb-12 max-w-3xl mx-auto`}
            >
              Servana Circle provides comprehensive luxury services designed to
              elevate your Dubai experience to extraordinary heights.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
          >
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <span className="text-xl sm:text-2xl">🛎️</span>
              </div>
              <h3 className="text-lg sm:text-xl service-title mb-2 sm:mb-3">
                24/7 Concierge
              </h3>
              <p
                className={`${themeClasses.textMuted} leading-relaxed text-sm sm:text-base`}
              >
                On-the-ground concierge service before and during your stay in
                Dubai, ensuring every detail is perfect.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <span className="text-xl sm:text-2xl">📋</span>
              </div>
              <h3 className="text-lg sm:text-xl service-title mb-2 sm:mb-3">
                Curated Recommendations
              </h3>
              <p
                className={`${themeClasses.textMuted} leading-relaxed text-sm sm:text-base`}
              >
                Expert recommendations for restaurants, beach clubs, nightclubs,
                and exclusive experiences tailored to your preferences.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <span className="text-xl sm:text-2xl">🎯</span>
              </div>
              <h3 className="text-lg sm:text-xl service-title mb-2 sm:mb-3">
                Exclusive Access
              </h3>
              <p
                className={`${themeClasses.textMuted} leading-relaxed text-sm sm:text-base`}
              >
                VIP reservations and exclusive discounts at Dubai's most
                sought-after venues and experiences.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl section-heading mb-6 sm:mb-8">
              Our Story
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`space-y-6 sm:space-y-8 text-base sm:text-lg ${themeClasses.textSecondary} leading-relaxed`}
          >
            <p>
              Servana Circle was born from a simple yet profound realization:
              Dubai deserves a luxury concierge service that matches its
              extraordinary ambition. In a city where the impossible becomes
              possible daily, we recognized the need for a service that could
              navigate the complex landscape of premium experiences with the
              same finesse that Dubai approaches innovation.
            </p>

            <p>
              Our founders, seasoned veterans of Dubai's hospitality and luxury
              sectors, witnessed firsthand how visitors and residents alike
              struggled to access the city's most exclusive offerings. The best
              restaurants had months-long waiting lists, the most coveted beach
              clubs were invitation-only, and the truly spectacular experiences
              remained hidden behind layers of connections and insider
              knowledge.
            </p>

            <p>
              We built Servana Circle to be more than just a concierge service –
              we created a gateway to Dubai's soul. Every member of our team
              brings years of experience in luxury hospitality, deep
              relationships with the city's most exclusive venues, and an
              unwavering commitment to turning your Dubai dreams into reality.
            </p>

            <p>
              Today, Servana Circle stands as Dubai's premier luxury lifestyle
              concierge, trusted by discerning clients who understand that true
              luxury isn't just about what you experience – it's about how
              effortlessly that experience comes to life. We don't just make
              reservations; we craft moments that become memories, and memories
              that become stories worth telling.
            </p>

            <p className="text-yellow-500 font-medium italic">
              "In Dubai, everything is possible. At Servana Circle, we make the
              impossible inevitable."
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
