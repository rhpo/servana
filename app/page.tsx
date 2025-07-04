"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/lib/Logo";
import WhatsAppButton from "@/components/whatsapp-button";
import { useTheme } from "@/components/theme-provider";
import { HeroVideo } from "@/components/HeroVideo";
import { services } from "@/lib/data";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, isDarkTheme, setTheme } = useTheme();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  const joinCircleUrl = `https://api.whatsapp.com/send?phone=971502438793&text=Hello I'm interested in the Servana Circle, can I please know more?`;

  const themeClasses = {
    background: isDarkTheme ? "bg-black" : "bg-white",
    text: isDarkTheme ? "text-white" : "text-black",
    textSecondary: isDarkTheme ? "text-gray-300" : "text-gray-700",
    textMuted: isDarkTheme ? "text-gray-400" : "text-gray-600",
    navBg: isDarkTheme ? "bg-black/60" : "bg-white/70",
    border: isDarkTheme ? "border-white/10" : "border-black/10",
    cardBg: isDarkTheme ? "bg-white/5" : "bg-black/5",
    cardBorder: isDarkTheme ? "border-white/10" : "border-black/10",
    cardHoverBorder: isDarkTheme
      ? "hover:border-white/30"
      : "hover:border-black/30",
    overlay: isDarkTheme ? "bg-black/40" : "bg-white/20",
    overlayHover: isDarkTheme
      ? "group-hover:bg-black/20"
      : "group-hover:bg-white/20",
    sectionBg: isDarkTheme ? "bg-white/5" : "bg-black/5",
    buttonPrimary: isDarkTheme
      ? "bg-yellow-500 text-black hover:bg-yellow-400 hover:text-black"
      : "bg-black text-white hover:bg-gray-800 hover:text-white",
    buttonOutline: isDarkTheme
      ? "bg-transparent border-2 border-white text-white hover:bg-white hover:text-black"
      : "bg-transparent border-2 border-black text-black hover:bg-black hover:text-white",
    gold: isDarkTheme ? "text-yellow-500" : "text-yellow-600",
  };

  return (
    <motion.div
      className={`min-h-screen transition-colors duration-500 ${themeClasses.background} ${themeClasses.text}`}
      initial={false}
      animate={{
        backgroundColor: isDarkTheme ? "#000000" : "#ffffff",
        color: isDarkTheme ? "#ffffff" : "#000000",
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 ${themeClasses.navBg} backdrop-blur-md border-b ${themeClasses.border}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            {/* Hamburger Menu Button - Mobile Only */}
            <button
              onClick={toggleMobileMenu}
              className={`md:hidden mr-4 ${themeClasses.text} focus:outline-none`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-light tracking-wider"
            >
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-32">
                  <Logo darkmode={isDarkTheme} />
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#services"
              className={`text-sm tracking-wide ${themeClasses.textSecondary} hover:text-gray-300 transition-colors`}
            >
              SERVICES
            </Link>
            <Link
              href="/about"
              className={`text-sm tracking-wide ${themeClasses.textSecondary} hover:text-gray-300 transition-colors`}
            >
              ABOUT
            </Link>
            <Link
              href="/contact"
              className={`text-sm tracking-wide ${themeClasses.textSecondary} hover:text-gray-300 transition-colors`}
            >
              CONTACT
            </Link>
          </div>

          {/* Theme Toggle and Join Circle Button */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${themeClasses.text} hover:opacity-70 transition-opacity`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {isDarkTheme ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Join Circle Button - Hidden on small screens */}
            <div className="hidden md:block">
              <Button
                variant="outline"
                className={`${themeClasses.buttonOutline} transition-all duration-300`}
                asChild
              >
                <a
                  href={joinCircleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  JOIN CIRCLE
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden ${themeClasses.navBg} backdrop-blur-md border-b ${themeClasses.border}`}
            >
              <div className="px-6 py-4 space-y-4">
                <Link
                  href="#services"
                  className={`block text-sm tracking-wide py-2 ${themeClasses.textSecondary} hover:text-gray-300 transition-colors`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  SERVICES
                </Link>
                <Link
                  href="/about"
                  className={`block text-sm tracking-wide py-2 ${themeClasses.textSecondary} hover:text-gray-300 transition-colors`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ABOUT
                </Link>
                <Link
                  href="/contact"
                  className={`block text-sm tracking-wide py-2 ${themeClasses.textSecondary} hover:text-gray-300 transition-colors`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  CONTACT
                </Link>
                <Button
                  variant="outline"
                  className={`w-full ${themeClasses.buttonOutline} transition-all duration-300 mt-4`}
                  asChild
                >
                  <a
                    href={joinCircleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    JOIN CIRCLE
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroVideo />

        {/* Dark overlay for better text readability */}
        <div
          className={`absolute inset-0 ${
            isDarkTheme ? "bg-black/50" : "bg-black/10"
          }`}
        />

        <div className="relative z-30 text-center max-w-4xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm tracking-[0.3em] text-gray-300 mb-6"
          >
            FOR THE MOST EXCLUSIVE EXPERIENCES
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl sm:text-6xl md:text-8xl hero-heading mb-8 tracking-tight text-yellow-500"
          >
            unlock the <span className="text-yellow-500">circle</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl font-light text-white mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Unlock the Circle. Step into Dubai Elite with Servana.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="#services" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-yellow-500 text-black hover:bg-yellow-400 hover:text-black transition-all duration-300 px-8 py-3 text-sm tracking-wide w-full"
              >
                EXPLORE SERVICES
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-3 text-sm tracking-wide w-full sm:w-auto"
              asChild
            >
              <a href={joinCircleUrl} target="_blank" rel="noopener noreferrer">
                JOIN CIRCLE
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 animate-bounce text-white" />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`text-sm tracking-[0.3em] ${themeClasses.textMuted} mb-8`}
          >
            WELCOME TO SERVANA CIRCLE
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-6xl luxury-heading mb-12 leading-tight"
          >
            exceptional access to ensure your experience in Dubai is
            unforgettable
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className={`text-base sm:text-lg ${themeClasses.textSecondary} leading-relaxed space-y-6`}
          >
            <p>
              Servana Circle is a curated network of Dubai's most exclusive
              experiences, designed for those who understand that true luxury
              lies in the details. We don't just provide access , we create
              moments that define your story.
            </p>
            <p>
              From the moment you join our circle, every experience is tailored
              to your desires, every detail anticipated, and every moment
              crafted to exceed your expectations. This is luxury redefined.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p
              className={`text-sm tracking-[0.3em] ${themeClasses.textMuted} mb-4`}
            >
              OUR SERVICES
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl luxury-title">
              curated experiences
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any, index: number) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer h-full"
              >
                <Link href={`/services/${service.id}`}>
                  <div
                    className={`relative overflow-hidden ${themeClasses.cardBg} border ${themeClasses.cardBorder} ${themeClasses.cardHoverBorder} transition-all duration-500 h-full flex flex-col`}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{
                          backgroundImage: `url('${service.image}')`,
                        }}
                      />
                      <div
                        className={`absolute inset-0 ${themeClasses.overlay} ${themeClasses.overlayHover} transition-all duration-500`}
                      />
                      {/* <div className="absolute top-6 left-6 text-3xl">{service.icon}</div> */}
                    </div>

                    <div className="p-8 flex-1 flex flex-col">
                      <h3
                        className={`text-xl luxury-title mb-4 group-hover:${themeClasses.textSecondary} transition-colors`}
                      >
                        {service.title}
                      </h3>
                      <p
                        className={`${themeClasses.textMuted} text-sm leading-relaxed mb-6 flex-1`}
                      >
                        {service.description}
                      </p>
                      <div
                        className={`flex items-center text-sm tracking-wide group-hover:translate-x-2 transition-transform duration-300 mt-auto`}
                      >
                        EXPLORE <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Concierge Section */}
      <section className={`py-24 px-6 ${themeClasses.sectionBg}`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl mb-8">🧭</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl luxury-heading mb-8">
              Servana Concierge
            </h2>
            <p
              className={`text-lg sm:text-xl ${themeClasses.textSecondary} leading-relaxed mb-12`}
            >
              At the core of it all , a personal concierge ready around the
              clock. One message, and it's done: bookings, transport, upgrades,
              surprises, and beyond.
            </p>
            <p className="text-xl sm:text-2xl font-light italic">
              Luxury isn't what we offer. It's how we think.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Instagram Icon and Handle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div
                className={`p-3 rounded-full border-2 ${themeClasses.border}`}
              >
                <Instagram className={`w-8 h-8 ${themeClasses.text}`} />
              </div>
              <span
                className={`text-lg tracking-wide ${themeClasses.textMuted} font-light`}
              >
                @SERVANACIRCLE
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl luxury-heading mb-8 tracking-wide">
              follow our instagram
            </h2>

            {/* Description */}
            <p
              className={`text-lg ${themeClasses.textSecondary} leading-relaxed mb-12 max-w-2xl mx-auto`}
            >
              For daily Dubai updates and to see our latest exclusive
              experiences, follow us{" "}
              <span className={`font-medium ${themeClasses.text}`}>
                @servanacircle
              </span>
            </p>

            {/* Instagram Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className={`${themeClasses.buttonOutline} transition-all duration-300 px-8 py-3 text-sm tracking-wide`}
                asChild
              >
                <a
                  href="https://instagram.com/servana_circle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <Instagram className="w-5 h-5" />
                  <span>SEE MORE ON INSTAGRAM</span>
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 px-6 border-t ${themeClasses.border}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-1 sm:col-span-2">
              <div className="w-48 mb-4">
                <Logo darkmode={isDarkTheme} />
              </div>
              <p className={`${themeClasses.textMuted} leading-relaxed`}>
                Unlock the Circle. Live the Privilege. Experience Dubai like
                never before.
              </p>
            </div>
            <div>
              <h4 className="text-sm tracking-wide mb-4">SERVICES</h4>
              <div className={`space-y-2 text-sm ${themeClasses.textMuted}`}>
                <div>Luxury Dining</div>
                <div>Yacht Charters</div>
                <div>Nightlife Access</div>
                <div>Beach Clubs</div>
              </div>
            </div>
            <div>
              <h4 className="text-sm tracking-wide mb-4">CONTACT</h4>
              <div className={`space-y-2 text-sm ${themeClasses.textMuted}`}>
                <div>Dubai, UAE</div>
                <div>+971 50 243 8793</div>
                <div>concierge@servanacircle.com</div>
              </div>
            </div>
          </div>
          <div
            className={`border-t ${themeClasses.border} mt-12 pt-8 text-center text-sm ${themeClasses.textMuted}`}
          >
            {new Date().getFullYear()} Servana Circle. <br />
            <small>
              Site made by the{" "}
              <a
                className="underline"
                target="_blank"
                href="https://www.codiha.com"
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
    </motion.div>
  );
}
