import Logo from "@/lib/Logo";
import { useTheme } from "@/components/theme-provider";
import WhatsAppButton from "./whatsapp-button";
import { Instagram, LocateFixedIcon, Mail, PhoneCall, Pin } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { services } from "@/lib/data";
import Link from "next/link";
import {
  FaEnvelope,
  FaInstagram,
  FaLocationArrow,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  const { isDarkTheme } = useTheme();

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
    <>
      {/* Concierge Section */}
      <section className={`py-24 px-6 ${themeClasses.sectionBg}`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
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
                @servana_circle
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
                @servana_circle
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
                {services.map((service) => (
                  <div key={service.id}>
                    <Link
                      href={`/services/${service.id}`}
                      className="hover:underline"
                    >
                      {service.short}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm tracking-wide mb-4">CONTACT</h4>
              <div className={`space-y-2 text-sm ${themeClasses.textMuted}`}>
                <Link
                  href="https://maps.app.goo.gl/GViJi4Kf6vbnw1PD6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-[5px] "
                >
                  <FaLocationArrow className="" /> Dubai, UAE
                </Link>

                <Link
                  href="https://instagram.com/servana_circle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-[5px] "
                >
                  <FaInstagram /> servana_circle
                </Link>

                <Link
                  href="https://wa.me/971502438793"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-[5px] "
                >
                  <FaWhatsapp /> Servana Circle
                </Link>

                <Link
                  href="tel:+971502438793"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-[5px] "
                >
                  <FaPhone className="" /> +971 50 243 8793
                </Link>

                {/* mail */}
                <Link
                  href="mailto:concierge@servanacircle.com"
                  className="hover:underline flex items-center gap-[5px] "
                >
                  <FaEnvelope className="" /> concierge@servanacircle.com
                </Link>
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

      <WhatsAppButton />
    </>
  );
}
