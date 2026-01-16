"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sun, Moon, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Logo from "@/lib/Logo";
import WhatsAppButton from "@/components/whatsapp-button";
import { useTheme } from "@/components/theme-provider";
import { HeroVideo } from "@/components/HeroVideo";
import { serviceData, services } from "@/lib/data";
import Footer from "@/components/footer";
import ImageSlider from "@/components/slider";
import Video from "@/lib/Video";

/**
 * The `ServiceDetailsPage` component is a React functional component that renders details of a specific service.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.service - Object containing details about the service.
 * @param {string} props.service.id - Unique identifier for the service.
 * @param {string} props.service.title - Title of the service.
 * @param {string} props.service.type - Type or category of the service.
 * @param {Array<Object>} props.service.features - List of features associated with the service.
 * @param {Object} props.themeClasses - Object containing theme-specific class names for styling.
 * @param {Array<Object>} props.featuredServices - Array of objects representing featured services to be displayed on the page.
 *
 * @returns {JSX.Element} React JSX element representing the `ServiceDetailsPage` component.
 */
export default function ServicePage() {
  const { service } = useParams() as { service: string };
  // const data = serviceData[service as keyof typeof serviceData];
  const data: any = serviceData[service as keyof typeof serviceData];
  const { isDarkTheme, setTheme } = useTheme();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Service not found
      </div>
    );
  }

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  const whatsappNumber = "+971502438793";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber.replace(
    "+",
    ""
  )}&text=Hello Servana Circle, I would like to get in touch with you.`;

  const getWhatsappUrlForService = (serviceName: string, itemName?: string) => {
    const message = itemName
      ? `Hey Servana, I'm interested in ${itemName} of ${serviceName} service, can I get to know more?`
      : `Hey Servana, I'm interested in ${serviceName} service, can I get to know more?`;
    return `https://api.whatsapp.com/send?phone=${whatsappNumber.replace(
      "+",
      ""
    )}&text=${encodeURIComponent(message)}`;
  };

  // Get 4 random featured services (excluding current service)
  const getFeaturedServices = () => {
    const otherServices = services.filter((s) => s.id !== service);
    const shuffled = [...otherServices].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  const featuredServices = getFeaturedServices();

  const themeClasses = {
    background: isDarkTheme ? "bg-black" : "bg-white",
    text: isDarkTheme ? "text-white" : "text-black",
    textSecondary: isDarkTheme ? "text-gray-300" : "text-gray-700",
    textMuted: isDarkTheme ? "text-gray-400" : "text-gray-600",
    navBg: isDarkTheme ? "bg-black/80" : "bg-white/80",
    border: isDarkTheme ? "border-white/10" : "border-black/10",
    cardBg: isDarkTheme ? "bg-white/5" : "bg-black/5",
    cardBorder: isDarkTheme ? "border-white/10" : "border-black/10",
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

          <div className="flex-1 flex justify-center">
            <div className="w-24 sm:w-32 tracking-wider">
              <Logo darkmode={isDarkTheme} />
            </div>
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

            <Button
              variant="outline"
              size="sm"
              className={`${themeClasses.buttonOutline} transition-all duration-300 bg-transparent text-xs sm:text-sm px-3 sm:px-4`}
              asChild
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                BOOK NOW
              </a>
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background for Nightlife and Desert Safari, otherwise image */}
        {data.type === "text-with-video" ? (
          <HeroVideo />
        ) : (data.type === "images-with-custom-video" ||
            data.type === "image-with-custom-video" ||
            data.type === "cities") &&
          data.content?.video ? (
          <HeroVideo
            src={data.content.video}
            thumbnail={data.content.videoThumbnail}
          />
        ) : data.background ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${data.background})`,
            }}
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
              filter: "grayscale(100%) contrast(1.2)",
            }}
          />
        )}

        <div
          className={`absolute inset-0 ${
            isDarkTheme ? "bg-black/50" : "bg-black/30"
          }`}
        />

        <div className="relative z-30 text-center max-w-5xl mx-auto px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-7xl hero-heading mb-6 sm:mb-8 tracking-tight text-white px-4"
          >
            {data.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-xl md:text-2xl font-light text-gray-300 mb-6 sm:mb-8 leading-relaxed px-4"
          >
            {data.hero}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm sm:text-lg italic text-gray-400 px-4"
          >
            {data.tagline}
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <p
              className={`text-lg sm:text-xl ${themeClasses.textSecondary} leading-relaxed max-w-4xl mx-auto px-4`}
            >
              {data.description}
            </p>
          </motion.div>

          {/* Cities Layout for Dining */}
          {data.type === "cities" && data.content.cities && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {data.content.cities.map(
                (
                  city: { name: string; image?: string; description?: string },
                  index: number
                ) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className={`${themeClasses.cardBg} border ${themeClasses.cardBorder} rounded-lg overflow-hidden shadow-lg h-full flex flex-col`}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={city.image || "/placeholder.svg"}
                        alt={city.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4 sm:p-6 flex-1 flex flex-col">
                      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                        {city.name}
                      </h2>
                      <p
                        className={`${themeClasses.textMuted} mb-4 sm:mb-6 text-sm sm:text-base flex-1`}
                      >
                        {city.description}
                      </p>
                      <Button
                        className="w-full bg-yellow-500 text-black hover:bg-yellow-400 hover:text-black transition-all duration-300 text-sm sm:text-base py-2 sm:py-3 mt-auto"
                        asChild
                      >
                        <a
                          href={getWhatsappUrlForService(data.title, city.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {data.cta ? data.cta : "FIND OUT MORE"}
                        </a>
                      </Button>
                    </CardContent>
                  </motion.div>
                )
              )}
            </div>
          )}

          {/* Yachts Layout */}
          {data.type === "yachts" && data.yachts && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {data.yachts.map(
                (
                  yacht: {
                    name: string;
                    image?: string;
                    description?: string;
                    guests?: number;
                  },
                  index: number
                ) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className={`${themeClasses.cardBg} border ${themeClasses.cardBorder} rounded-lg overflow-hidden shadow-lg h-full flex flex-col`}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={yacht.image || "/placeholder.svg"}
                        alt={yacht.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4 sm:p-6 flex-1 flex flex-col">
                      <h3 className="text-lg sm:text-xl font-bold mb-2">
                        {yacht.name}
                      </h3>
                      <p
                        className={`${themeClasses.textMuted} mb-4 text-sm sm:text-base flex-1`}
                      >
                        {yacht.guests}
                      </p>
                      <Button
                        className="w-full bg-yellow-500 text-black hover:bg-yellow-400 hover:text-black transition-all duration-300 text-sm sm:text-base py-2 sm:py-3 mt-auto"
                        asChild
                      >
                        <a
                          href={getWhatsappUrlForService(
                            data.title,
                            yacht.name
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {data.cta ? data.cta : "FIND OUT MORE"}
                        </a>
                      </Button>
                    </CardContent>
                  </motion.div>
                )
              )}
            </div>
          )}

          {/* Text with Video Layout for Nightlife */}
          {data.type === "text-with-standard-video" && data.content && (
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl section-heading mb-4">
                  {data.content.title}
                </h2>
                <h3 className="text-xl sm:text-2xl luxury-heading mb-8">
                  {data.content.subtitle}
                </h3>
                <p
                  className={`text-base sm:text-lg ${themeClasses.textSecondary} leading-relaxed mb-8`}
                >
                  {data.content.text}
                </p>
                <div className="flex justify-center mb-8">
                  {data.content.video ? (
                    <Video
                      className="w-full max-w-2xl h-auto rounded-lg shadow-2xl"
                      src={data.content.video}
                    />
                  ) : (
                    <img
                      src={data.content.image || "/placeholder.svg"}
                      alt={data.title}
                      className="w-full max-w-2xl h-auto rounded-lg shadow-2xl"
                    />
                  )}
                </div>
                <Button
                  className="bg-yellow-500 text-black hover:bg-yellow-400 hover:text-black transition-all duration-300 px-8 py-3 text-sm sm:text-base tracking-wide"
                  asChild
                >
                  <a
                    href={getWhatsappUrlForService(data.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data.cta ? data.cta : "FIND OUT MORE"}
                  </a>
                </Button>
              </motion.div>
            </div>
          )}

          {/* Text with Image Layout */}
          {data.type === "text-with-image" && data.content && (
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl section-heading mb-4">
                  {data.content.title}
                </h2>
                <h3 className="text-xl sm:text-2xl luxury-heading mb-8">
                  {data.content.subtitle}
                </h3>
                <p
                  className={`text-base sm:text-lg ${themeClasses.textSecondary} leading-relaxed mb-8`}
                >
                  {data.content.text}
                </p>

                {/* Check if image is string (single image) or array (multiple images) */}
                {typeof data.content.image === "string" ? (
                  // Single image layout
                  <div className="flex justify-center mb-8">
                    <img
                      src={data.content.image || "/placeholder.svg"}
                      alt={data.title}
                      className="w-full max-w-2xl h-auto rounded-lg shadow-2xl"
                    />
                  </div>
                ) : Array.isArray(data.content.image) ? (
                  // Multiple images grid layout
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mb-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                      {data.content.image.map((image: any, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="group cursor-pointer"
                        >
                          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                            {image.src.endsWith(".webm") ? (
                              <Video
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src={image.src}
                              />
                            ) : (
                              <img
                                src={image.src || "/placeholder.svg"}
                                alt={image.alt || "Service Image"}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            )}
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {/* Caption overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6">
                              <motion.p
                                className="text-white text-sm sm:text-base font-medium text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                                initial={{ opacity: 0.8 }}
                                whileHover={{ opacity: 1 }}
                              >
                                {image.caption}
                              </motion.p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : null}

                <Button
                  className="bg-yellow-500 text-black hover:bg-yellow-400 hover:text-black transition-all duration-300 px-8 py-3 text-sm sm:text-base tracking-wide"
                  asChild
                >
                  <a
                    href={getWhatsappUrlForService(data.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data.cta ? data.cta : "FIND OUT MORE"}
                  </a>
                </Button>
              </motion.div>
            </div>
          )}

          {/* Images with Custom Video Layout for Desert Safari */}
          {data.type === "images-with-custom-video" &&
            data.content &&
            (data.feature === "slider" ? (
              <div className="max-w-6xl mx-auto">
                <ImageSlider
                  data={data as any}
                  themeClasses={themeClasses}
                  getWhatsappUrlForService={getWhatsappUrlForService}
                />
              </div>
            ) : (
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-12 sm:mb-16"
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl section-heading mb-4">
                    {data.content.title}
                  </h2>
                  <h3 className="text-xl sm:text-2xl luxury-heading mb-8">
                    {data.content.subtitle}
                  </h3>
                  <p
                    className={`text-base sm:text-lg ${themeClasses.textSecondary} leading-relaxed mb-12 max-w-4xl mx-auto`}
                  >
                    {data.content.text}
                  </p>
                </motion.div>
                {/* Image Grid */}
                {data.content.images && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mb-12 flex justify-center"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      {data.content.images.map((image: any, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="group cursor-pointer"
                        >
                          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center">
                            {image.src.endsWith(".webm") ? (
                              <Video
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src={image.src}
                              />
                            ) : (
                              <img
                                src={image.src || "/placeholder.svg"}
                                alt={image.alt || "Service Image"}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            )}

                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {/* Caption overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6">
                              <motion.p
                                className="text-white text-sm sm:text-base font-medium text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                                initial={{ opacity: 0.8 }}
                                whileHover={{ opacity: 1 }}
                              >
                                {image.caption}
                              </motion.p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      className="bg-yellow-500 text-black hover:bg-yellow-400 hover:text-black transition-all duration-300 px-8 py-3 text-sm sm:text-base tracking-wide"
                      asChild
                    >
                      <a
                        href={getWhatsappUrlForService(data.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BOOK NOW
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className={`${themeClasses.buttonOutline} transition-all duration-300 bg-transparent px-8 py-3 text-sm sm:text-base tracking-wide`}
                      asChild
                    >
                      <a
                        href={getWhatsappUrlForService(data.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LEARN MORE
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </div>
            ))}

          {/* Images with Custom Video Layout for Desert Safari */}
          {data.type === "image-with-custom-video" && data.content && (
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12 sm:mb-16"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl section-heading mb-4">
                  {data.content.title}
                </h2>
                <h3 className="text-xl sm:text-2xl luxury-heading mb-8">
                  {data.content.subtitle}
                </h3>
                <p
                  className={`text-base sm:text-lg ${themeClasses.textSecondary} leading-relaxed mb-12 max-w-4xl mx-auto`}
                >
                  {data.content.text}
                </p>
              </motion.div>

              {typeof data.content.image === "string" ? (
                // Single image layout
                <div className="flex justify-center mb-8">
                  <img
                    src={data.content.image || "/placeholder.svg"}
                    alt={data.title}
                    className="w-full max-w-2xl h-auto rounded-lg shadow-2xl"
                  />
                </div>
              ) : Array.isArray(data.content.image) ? (
                // Multiple images grid layout
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                    {data.content.image.map((image: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group cursor-pointer"
                      >
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                          {image.src.endsWith(".webm") ? (
                            <Video
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              src={image.src}
                            />
                          ) : (
                            <img
                              src={image.src || "/placeholder.svg"}
                              alt={image.alt || "Service Image"}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          )}
                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          {/* Caption overlay */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6">
                            <motion.p
                              className="text-white text-sm sm:text-base font-medium text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                              initial={{ opacity: 0.8 }}
                              whileHover={{ opacity: 1 }}
                            >
                              {image.caption}
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : null}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-yellow-500 text-black hover:bg-yellow-400 hover:text-black transition-all duration-300 px-8 py-3 text-sm sm:text-base tracking-wide"
                    asChild
                  >
                    <a
                      href={getWhatsappUrlForService(data.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      BOOK NOW
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className={`${themeClasses.buttonOutline} transition-all duration-300 bg-transparent px-8 py-3 text-sm sm:text-base tracking-wide`}
                    asChild
                  >
                    <a
                      href={getWhatsappUrlForService(data.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LEARN MORE
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Helicopter Tours Layout */}
          {data.type === "helicopter-tours" && data.content && (
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl section-heading mb-4">
                  {data.content.title}
                </h2>
                <h3 className="text-xl sm:text-2xl luxury-heading mb-4">
                  {data.content.subtitle}
                </h3>
                <p className="text-lg sm:text-xl text-yellow-500 font-bold mb-6">
                  {data.content.priceText}
                </p>
                <p
                  className={`text-base sm:text-lg ${themeClasses.textSecondary} leading-relaxed mb-8`}
                >
                  {data.content.description}
                </p>

                <div className="mb-8">
                  <br />
                  <br />
                  <ul
                    className={`text-left max-w-2xl mx-auto space-y-2 ${themeClasses.textSecondary}`}
                  >
                    {data.content.features.map(
                      (feature: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-yellow-500 mr-2">•</span>
                          <span className="text-sm sm:text-base">
                            {feature}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="flex justify-center mb-8">
                  <img
                    src={data.content.image || "/placeholder.svg"}
                    alt={data.title}
                    className="w-full max-w-2xl h-auto rounded-lg shadow-2xl"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-yellow-500 text-black hover:bg-yellow-400 hover:text-black transition-all duration-300 px-8 py-3 text-sm sm:text-base tracking-wide"
                    asChild
                  >
                    <a
                      href={getWhatsappUrlForService(data.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ENQUIRE NOW
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className={`${themeClasses.buttonOutline} transition-all duration-300 bg-transparent px-8 py-3 text-sm sm:text-base tracking-wide`}
                    asChild
                  >
                    <a
                      href={getWhatsappUrlForService(data.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      BOOK NOW
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Experiences Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl luxury-heading mb-8">
              Featured Experiences
            </h2>
            <p
              className={`text-lg sm:text-xl ${themeClasses.textSecondary} leading-relaxed max-w-3xl mx-auto`}
            >
              Discover more of our exclusive Dubai experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredServices.map((featuredService, index) => (
              <motion.div
                key={featuredService.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Link href={`/services/${featuredService.id}`}>
                  <div
                    className={`${themeClasses.cardBg} border ${themeClasses.cardBorder} rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105`}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={featuredService.image || "/placeholder.svg"}
                        alt={featuredService.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-center group-hover:text-yellow-500 transition-colors">
                        {featuredService.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
