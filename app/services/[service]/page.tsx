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

const serviceData = {
  dining: {
    title: "Luxury Dining Experiences",
    icon: "🍽️",
    hero: "From skyline views to beachfront elegance, Servana Circle gives you seamless access to Dubai's most refined culinary destinations.",
    tagline: "We don't book restaurants. We unlock moments you'll crave again.",
    description:
      "Experience Dubai's culinary excellence through our curated network of premium restaurants across the city's most prestigious locations.",
    type: "cities",
    background: "/images/wallpaper/dining.png",
    cities: [
      {
        name: "DUBAI MARINA",
        description:
          "With the most amazing views, both day and night, you cannot go wrong in Dubai Marina. Enjoy anything from a romantic dinner for two, have a coffee at Marina Mall whilst watch the yachts go by, or let your hair down with a wild night out with friends.",
        image: "/images/places/marina.png",
      },
      {
        name: "Palm Jumeirah",
        description:
          "The palm is pure luxury, with the beach on your doorstep and access to the most incredible views of the iconic marina sky line – whether you are sipping a cocktail for sunset at one of the rooftop bars or you are dancing the night away at one of the amazing beach clubs.",
        image: "/images/places/jumeriah.png",
      },
      {
        name: "Downtown Dubai",
        description:
          "Where do we start? Downtown Dubai is the heart and sole of Dubai. It is the perfect place for a day out with the family or friends and at the end of the day enjoy dinner or drinks by the jaw dropping fountain display at The Dubai Fountain set on the Burj Khalifa Lake.",
        image: "/images/places/downtown.png",
      },
      {
        name: "Madinat Jumeriah",
        description:
          "Fancy taking an gondola to your dinner reservation? Or exploring the souqs for one off pieces? Up for a thrill at the waterpark? Then Souq Madinat Jumeriah is the place for you. It is suitable for both families and couples – one of the most idyllic resorts in Dubai.",
        image: "/images/places/madinat-jumeriah.png",
      },
    ],
  },
  yachts: {
    title: "Yacht Charters & Private Cruises",
    icon: "⛵",
    background: "/images/wallpaper/boat.png",
    hero: "Sail the Arabian Gulf aboard curated yachts that define elegance. Whether it's an intimate escape or a celebration with a private DJ, we deliver ocean experiences tailored to your mood and style.",
    tagline:
      "Because your time on the water should feel like time stopped for you.",
    description:
      "Our extensive fleet of luxury yachts offers the perfect vessel for every occasion, from intimate sunset cruises to grand celebrations.",
    type: "yachts",
    yachts: [
      {
        name: "28ft LUXURY YACHT",
        guests: "7 Guests",
        image: "/images/boats/28ft.png",
      },
      {
        name: "47ft LUXURY YACHT",
        guests: "12 Guests",
        image: "/images/boats/47ft.png",
      },
      {
        name: "76FT LUXURY YACHT",
        guests: "40 Guests",
        image: "/images/boats/76ft.png",
      },
      {
        name: "85ft Jacuzzi YACHT",
        guests: "40 Guests",
        image: "/images/boats/85ft.png",
      },
    ],
  },
  nightlife: {
    title: "Nightlife & Elite Lounge Access",
    icon: "🍸",
    hero: "Dubai after dark is electric, and we hold the keys. From premium lounges to high-energy nightclubs, our network ensures you enter like royalty and enjoy the night on your terms.",
    background: "/placeholder.svg?width=1920&height=1080",
    tagline: "Skip the lines. Own the night. Dance where the lights chase you.",
    description:
      "Experience Dubai's legendary nightlife through exclusive access to the city's most coveted venues, where every night becomes an unforgettable story.",
    type: "text-with-video",
    content: {
      title: "NIGHTLIFE IN DUBAI",
      subtitle: "YOUR DUBAI NIGHTLIFE EXPERIENCE",
      text: "Need some help with nightlife in Dubai? Not only can we provide our recommendations on the best Dubai bars and Dubai nightclubs – we will take care of any reservation requirements for you and your group. We will ensure your access to the best clubs, at the lowest minimum spend.",
      image: "/images/night.png",
    },
  },
  "beach-clubs": {
    title: "Beach Clubs & Poolside Escapes",
    icon: "🏖️",
    hero: "Sun-soaked indulgence at Dubai's most iconic beach clubs and pools.",
    tagline: "Where luxury meets the shoreline.",
    background: "/images/wallpaper/beach.png",
    description:
      "Escape to Dubai's most exclusive beach clubs where pristine sands meet world-class service.",
    type: "text-with-image",
    content: {
      title: "Pool & Beach Clubs IN DUBAI",
      subtitle: "YOUR DUBAI BEACH CLUB EXPERIENCE",
      text: "You will struggle to cover all of the best beach clubs in Dubai during one trip, so let us help you decide. Whether you are looking for a chilled day soaking up the Arabian sunshine, or to attend one of the famous pool parties in Dubai – we have got you covered.",
      image: "/images/beachclubs.png",
    },
  },
  "luxury-cars": {
    title: "Luxury & Exotic Car Rentals",
    icon: "🚘",
    hero: "Drive your dream through Dubai with our handpicked fleet of supercars.",
    tagline: "Every street becomes a runway.",
    description:
      "Experience Dubai's roads in style with our curated collection of luxury and exotic vehicles.",
    background: "/images/wallpaper/cars.png",
    type: "text-with-image",
    content: {
      title: "LUXURY CAR RENTALS IN DUBAI",
      subtitle: "YOUR DUBAI DRIVING EXPERIENCE",
      text: "Transform your Dubai journey with our exclusive fleet of luxury and exotic vehicles. From sleek Lamborghinis to elegant Rolls-Royces, experience the city's stunning skyline and pristine roads in unparalleled style. Our concierge team ensures seamless delivery and pickup, so you can focus on the thrill of the drive.",
      image: "/images/cars.png",
    },
  },
  desert: {
    title: "Desert Escapes & Safari Adventures",
    icon: "🏜️",
    background: "/images/wallpaper/desert.png",
    hero: "Golden silence and adrenaline in Dubai's magnificent desert landscapes.",
    tagline: "Where the city meets the infinite.",
    description:
      "Venture into the heart of the Arabian Desert for an experience that combines traditional Bedouin culture with modern luxury.",
    type: "text-with-image",
    content: {
      title: "DESERT SAFARI IN DUBAI",
      subtitle: "YOUR DUBAI DESERT EXPERIENCE",
      text: "Escape the urban pulse and discover the timeless beauty of the Arabian Desert. From exhilarating dune bashing adventures to serene sunset dinners under a canopy of stars, our desert experiences blend authentic Bedouin traditions with contemporary luxury. Let the golden sands tell their ancient stories while you create new memories.",
      image: "/images/safari.png",
    },
  },
  "water-activities": {
    title: "Water Activities & Sea Thrills",
    icon: "🌊",
    background: "/images/wallpaper/water.png",
    hero: "Dive into Dubai's playful side with exciting marine experiences.",
    tagline: "Where adventure meets the azure.",
    description:
      "Explore Dubai's stunning coastline through exhilarating water sports and marine adventures.",
    type: "text-with-image",
    content: {
      title: "WATER ACTIVITIES IN DUBAI",
      subtitle: "YOUR DUBAI MARINE EXPERIENCE",
      text: "Dubai's pristine coastline offers endless aquatic adventures. From high-speed jet skiing across the Persian Gulf to peaceful paddleboarding at sunrise, our water activities cater to every thrill level. Dive into crystal-clear waters, explore vibrant marine life, or simply cruise along the iconic Dubai Marina – the choice is yours.",
      image: "/images/water.png",
    },
  },
  helicopter: {
    title: "Helicopter & Aerial Experiences",
    icon: "🚁",
    background: "/images/wallpaper/helicopter.png",
    hero: "Soar above the city in private helicopters with breathtaking views.",
    tagline: "See Dubai from where dreams are made.",
    // "Experience Dubai from a perspective reserved for the few. Our helicopter tours offer unparalleled views of the city's iconic landmarks."
    type: "helicopter-tours",
    content: {
      title: "LUXURY CONCIERGE SERVICES IN DUBAI",
      subtitle: "HELICOPTER TOUR OF DUBAI",
      description:
        "See the sites of Dubai from the luxury of a helicopter. Choose from four aerial tour options guaranteeing breathtaking views of the city.",
      features: [
        "Iconic Tour (12 minutes)",
        "The Palm Tour (17 minutes)",
        "Vision Tour (22 minutes)",
        "The Grand Tour (30 minutes)",
        "Odyssey Tour (40 minutes)",
        "All tours are available on a sharing and exclusive basis (maximum 5 persons per helicopter)",
        "All helicopter tours depart from Dubai Police Academy",
        "Payment required in advance to secure booking",
      ],
      image: "/images/helicopter.png",
    },
  },
  family: {
    title: "Family & Cultural Explorations",
    icon: "🐾",
    background: "/images/wallpaper/family.png",
    hero: "Luxury meets discovery for all ages with curated family experiences.",
    tagline: "Creating memories across generations.",
    description:
      "Discover Dubai's rich culture and family-friendly attractions through carefully curated experiences.",
    type: "text-with-image",
    content: {
      title: "FAMILY EXPERIENCES IN DUBAI",
      subtitle: "YOUR DUBAI FAMILY ADVENTURE",
      text: "Dubai is a playground for families, where wonder meets luxury at every turn. From private tours of world-class aquariums to exclusive theme park experiences, we curate adventures that captivate both young hearts and sophisticated tastes. Create lasting memories as you explore Dubai's cultural treasures and modern marvels together.",
      image: "/images/family.png",
    },
  },
};

// Featured experiences for random selection
const allServices = [
  { id: "dining", title: "Luxury Dining", image: "/images/cook.png" },
  { id: "yachts", title: "Yacht Charters", image: "/images/boat.png" },
  { id: "nightlife", title: "Nightlife Access", image: "/images/night.png" },
  { id: "beach-clubs", title: "Beach Clubs", image: "/images/beachclubs.png" },
  { id: "luxury-cars", title: "Luxury Cars", image: "/images/cars.png" },
  { id: "desert", title: "Desert Safari", image: "/images/safari.png" },
  {
    id: "water-activities",
    title: "Water Activities",
    image: "/images/water.png",
  },
  {
    id: "helicopter",
    title: "Helicopter Tours",
    image: "/images/helicopter.png",
  },
  { id: "family", title: "Family Experiences", image: "/images/family.png" },
];

export default function ServicePage() {
  const { service } = useParams() as { service: string };
  const data = serviceData[service as keyof typeof serviceData];
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme, isDarkTheme, setTheme } = useTheme();

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
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber.replace("+", "")}&text=Hello Servana Circle, I would like to get in touch with you.`;

  const getWhatsappUrlForService = (serviceName: string, itemName?: string) => {
    const message = itemName
      ? `Hey Servana, I'm interested in ${itemName} of ${serviceName} service, can I get to know more?`
      : `Hey Servana, I'm interested in ${serviceName} service, can I get to know more?`;
    return `https://api.whatsapp.com/send?phone=${whatsappNumber.replace("+", "")}&text=${encodeURIComponent(message)}`;
  };

  // Get 4 random featured services (excluding current service)
  const getFeaturedServices = () => {
    const otherServices = allServices.filter((s) => s.id !== service);
    const shuffled = [...otherServices].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  const featuredServices = getFeaturedServices();

  const nextSlide = () => {
    if (data.type === "slider" && data.images) {
      setCurrentSlide((prev) => (prev + 1) % data.images.length);
    } else if (data.type === "car-slider" && data.cars) {
      setCurrentSlide((prev) => (prev + 1) % data.cars.length);
    }
  };

  const prevSlide = () => {
    if (data.type === "slider" && data.images) {
      setCurrentSlide(
        (prev) => (prev - 1 + data.images.length) % data.images.length,
      );
    } else if (data.type === "car-slider" && data.cars) {
      setCurrentSlide(
        (prev) => (prev - 1 + data.cars.length) % data.cars.length,
      );
    }
  };

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
        {/* Video Background for Nightlife, otherwise image */}
        {data.type === "text-with-video" ? (
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
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('/placeholder.svg?height=1080&width=1920')",
                filter: "grayscale(100%) contrast(1.2)",
              }}
            />
          </video>
        ) : data.background ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${data.background})`,
              // filter: "grayscale(100%) contrast(1.2)",
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
          className={`absolute inset-0 ${isDarkTheme ? "bg-black/70" : "bg-black/30"}`}
        />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl mb-6 sm:mb-8"
          >
            {data.icon}
          </motion.div>

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
          {data.type === "cities" && data.cities && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {data.cities.map((city, index) => (
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
                        FIND OUT MORE
                      </a>
                    </Button>
                  </CardContent>
                </motion.div>
              ))}
            </div>
          )}

          {/* Yachts Layout */}
          {data.type === "yachts" && data.yachts && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {data.yachts.map((yacht, index) => (
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
                        href={getWhatsappUrlForService(data.title, yacht.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        FIND OUT MORE
                      </a>
                    </Button>
                  </CardContent>
                </motion.div>
              ))}
            </div>
          )}

          {/* Text with Video Layout for Nightlife */}
          {data.type === "text-with-video" && data.content && (
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
                  <img
                    src={data.content.image || "/placeholder.svg"}
                    alt={data.title}
                    className="w-full max-w-2xl h-auto rounded-lg shadow-2xl"
                  />
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
                    FIND OUT MORE
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
                <div className="flex justify-center mb-8">
                  <img
                    src={data.content.image || "/placeholder.svg"}
                    alt={data.title}
                    className="w-full max-w-2xl h-auto rounded-lg shadow-2xl"
                  />
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
                    FIND OUT MORE
                  </a>
                </Button>
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
                    {data.content.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span className="text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl luxury-heading mb-6 sm:mb-8 tracking-wide px-4">
              follow our instagram
            </h2>

            {/* Description */}
            <p
              className={`text-base sm:text-lg ${themeClasses.textSecondary} leading-relaxed mb-8 sm:mb-12 max-w-2xl mx-auto px-4`}
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl luxury-heading mb-6 sm:mb-8 px-4">
              Servana Concierge
            </h2>
            <p
              className={`text-base sm:text-lg lg:text-xl ${themeClasses.textSecondary} leading-relaxed mb-8 sm:mb-12 px-4`}
            >
              At the core of it all , a personal concierge ready around the
              clock. One message, and it's done: bookings, transport, upgrades,
              surprises, and beyond.
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl font-light italic px-4">
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
