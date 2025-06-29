"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Instagram, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/lib/Logo";
import WhatsAppButton from "@/components/whatsapp-button";
import { useTheme } from "@/components/theme-provider";

export default function AboutPage() {
  const { theme, isDarkTheme, setTheme } = useTheme();
  const whatsappUrl = `https://api.whatsapp.com/send?phone=971502438793&text=Hello Servana Circle, I would like to learn more about your services.`;
  const joinCircleUrl = `https://api.whatsapp.com/send?phone=971502438793&text=Hello I'm interested in the Servana Circle, can I please know more?`;

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

            <Button
              variant="outline"
              size="sm"
              className={`${themeClasses.buttonOutline} transition-all duration-300 bg-transparent text-xs sm:text-sm px-3 sm:px-4`}
              asChild
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                CONTACT US
              </a>
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "contrast(1.2) brightness(0.7)",
          }}
        >
          <source
            src="https://faithdubai.com/wp-content/uploads/2023/12/VID-FINAL-FAITH-1.mp4"
            type="video/mp4"
          />
          {/* Fallback image in case video doesn't load */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
              filter: "grayscale(100%) contrast(1.2)",
            }}
          />
        </video>

        {/* Dark overlay for better text readability */}
        <div
          className={`absolute inset-0 ${isDarkTheme ? "bg-black/70" : "bg-black/30"}`}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
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
                className={`${themeClasses.buttonOutline} transition-all duration-300 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base tracking-wide bg-transparent`}
                asChild
              >
                <a
                  href="https://instagram.com/servanacircle"
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

      {/* CTA Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl section-heading mb-6 sm:mb-8">
              Ready to Join the Circle?
            </h2>
            <p
              className={`text-lg sm:text-xl ${themeClasses.textSecondary} leading-relaxed mb-8 sm:mb-12`}
            >
              Experience Dubai like never before. Let our concierge team craft
              your perfect luxury experience.
            </p>
            <Button
              size="lg"
              className="bg-yellow-500 text-black hover:bg-yellow-400 transition-all duration-300 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base tracking-wide"
              asChild
            >
              <a href={joinCircleUrl} target="_blank" rel="noopener noreferrer">
                JOIN CIRCLE
              </a>
            </Button>
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
    </div>
  );
}
