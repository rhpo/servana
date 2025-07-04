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

/**
 * Contact component for Servana Circle, displaying various contact methods and information.
 *
 * This component renders a contact page with sections for messaging, Instagram,
 * email, concierge services, and footer details. It includes interactive elements
 * such as buttons that open links in new tabs and handle WhatsApp interactions.
 *
 * @returns {JSX.Element} - The JSX representation of the Contact component.
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
                  @servanacircle
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

      {/* Instagram Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Instagram Icon and Handle */}
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
              <div
                className={`p-2 sm:p-3 rounded-full border-2 ${themeClasses.border}`}
              >
                <Instagram className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <span
                className={`text-base sm:text-lg tracking-wide ${themeClasses.textMuted} font-light`}
              >
                @SERVANACIRCLE
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl luxury-heading mb-6 sm:mb-8 tracking-wide">
              follow our instagram
            </h2>

            {/* Description */}
            <p
              className={`text-base sm:text-lg ${themeClasses.textSecondary} leading-relaxed mb-8 sm:mb-12 max-w-2xl mx-auto`}
            >
              For daily Dubai updates and to see our latest exclusive
              experiences, follow us{" "}
              <span className="font-medium">@servanacircle</span>
            </p>

            {/* Instagram Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className={`bg-transparent border-2 ${
                  isDarkTheme
                    ? "border-white text-white hover:bg-white hover:text-black"
                    : "border-black text-black hover:bg-black hover:text-white"
                } transition-all duration-300 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base tracking-wide`}
                asChild
              >
                <a
                  href="https://instagram.com/servana_circle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>SEE MORE ON INSTAGRAM</span>
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Concierge Section */}
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
            <div className="text-3xl sm:text-4xl mb-6 sm:mb-8">🧭</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl luxury-heading mb-6 sm:mb-8">
              Servana Concierge
            </h2>
            <p
              className={`text-base sm:text-lg lg:text-xl ${themeClasses.textSecondary} leading-relaxed mb-8 sm:mb-12`}
            >
              At the core of it all , a personal concierge ready around the
              clock. One message, and it's done: bookings, transport, upgrades,
              surprises, and beyond.
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl font-light italic">
              Luxury isn't what we offer. It's how we think.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 sm:py-16 px-4 sm:px-6 border-t ${themeClasses.border}`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Mobile: Centered layout, Desktop: Grid layout */}
          <div className="text-center sm:text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="col-span-1 sm:col-span-2 flex flex-col items-center sm:items-start">
                <div className="w-36 sm:w-48 mb-4">
                  <Logo darkmode={isDarkTheme} />
                </div>
                <p
                  className={`${themeClasses.textMuted} leading-relaxed text-sm sm:text-base max-w-md`}
                >
                  Unlock the Circle. Live the Privilege. Experience Dubai like
                  never before.
                </p>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <h4 className="text-sm sm:text-base tracking-wide mb-3 sm:mb-4">
                  SERVICES
                </h4>
                <div
                  className={`space-y-2 text-xs sm:text-sm ${themeClasses.textMuted} text-center sm:text-left`}
                >
                  <div>Luxury Dining</div>
                  <div>Yacht Charters</div>
                  <div>Nightlife Access</div>
                  <div>Beach Clubs</div>
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <h4 className="text-sm sm:text-base tracking-wide mb-3 sm:mb-4">
                  CONTACT
                </h4>
                <div
                  className={`space-y-2 text-xs sm:text-sm ${themeClasses.textMuted} text-center sm:text-left`}
                >
                  <div>Dubai, UAE</div>
                  <div>+971 50 243 8793</div>
                  <div>concierge@servanacircle.com</div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`border-t ${themeClasses.border} mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-xs sm:text-sm ${themeClasses.textMuted}`}
          >
            {new Date().getFullYear()} Servana Circle. <br />
            <small>
              Site made by the{" "}
              <a
                className="underline"
                target="_blank"
                href="https://www.codiha.com/"
              >
                CODIHA
              </a>
              &trade; Agency.
            </small>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
