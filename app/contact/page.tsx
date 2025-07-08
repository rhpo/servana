"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/lib/Logo";
import WhatsAppButton from "@/components/whatsapp-button";
import { useTheme } from "@/components/theme-provider";
import { HeroVideo } from "@/components/HeroVideo";
import Footer from "@/components/footer";

/**
 * Renders a contact page with navigation, hero section, and contact information.
 *
 * The component uses the `useTheme` hook to manage theme state and dynamically apply styles based on whether the theme is dark or light.
 * It constructs URLs for WhatsApp messages to pre-fill messages directed at Servana Circle's concierge team.
 * The page includes a toggle button for switching between light and dark themes, which updates the UI accordingly.
 * It also features a hero section with a video background and contact buttons that link to various communication channels (WhatsApp, Instagram, Email).
 *
 * @returns A React component representing the Contact Page.
 */
export default function ContactPage() {
  const { theme, isDarkTheme, setTheme } = useTheme();
  const whatsappNumber = "+971502438793";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber.replace(
    "+",
    ""
  )}&text=Hi Servana Circle, I’m ready to unlock an exclusive Dubai experience. Please let me know what’s available.`;
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
              className="p-2 rounded-full hover:opacity-70 transition-opacity"
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
            Contact Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl font-light text-gray-300 mb-12 sm:mb-16 leading-relaxed"
          >
            You can reach us through the following contact methods. Our
            concierge team is ready to assist you 24/7.
          </motion.p>

          {/* Contact Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center"
          >
            <Button
              size="lg"
              className="bg-yellow-500 text-black hover:bg-yellow-400 hover:text-black transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base tracking-wide flex items-center space-x-2"
              asChild
            >
              <a href={joinCircleUrl} target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>SPEAK TO CONCIERGE</span>
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section
        className={`py-12 sm:py-24 px-4 sm:px-6 ${themeClasses.sectionBg}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl section-heading mb-12 sm:mb-16">
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div>
                <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 sm:mb-4 text-yellow-500" />
                <h3 className="text-lg sm:text-xl service-title mb-2">
                  WhatsApp
                </h3>
                <p
                  className={`${themeClasses.textMuted} mb-3 sm:mb-4 text-sm sm:text-base`}
                >
                  {whatsappNumber}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 text-xs sm:text-sm px-4 sm:px-6"
                  asChild
                >
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MESSAGE
                  </a>
                </Button>
              </div>
              <div>
                <Instagram className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 sm:mb-4 text-yellow-500" />
                <h3 className="text-lg sm:text-xl service-title mb-2">
                  Instagram
                </h3>
                <p
                  className={`${themeClasses.textMuted} mb-3 sm:mb-4 text-sm sm:text-base`}
                >
                  @servana_circle
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 text-xs sm:text-sm px-4 sm:px-6"
                  asChild
                >
                  <a
                    href="https://instagram.com/servana_circle"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    FOLLOW
                  </a>
                </Button>
              </div>
              <div>
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 sm:mb-4 text-yellow-500" />
                <h3 className="text-lg sm:text-xl service-title mb-2">Email</h3>
                <p
                  className={`${themeClasses.textMuted} mb-3 sm:mb-4 text-sm sm:text-base`}
                >
                  concierge@servanacircle.com
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 text-xs sm:text-sm px-4 sm:px-6"
                  asChild
                >
                  <a href="mailto:concierge@servanacircle.com">EMAIL</a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
