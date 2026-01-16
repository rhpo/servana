import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Video from "@/lib/Video";

type ImageSliderProps = {
  data: any;
  themeClasses: {
    textSecondary: string;
    buttonOutline: string;
  };
  getWhatsappUrlForService: (serviceTitle: string) => string;
};

type ImageGalleryComponentProps = {
  data: any;
  themeClasses: {
    textSecondary: string;
    buttonOutline: string;
  };
  getWhatsappUrlForService: (serviceTitle: string) => string;
};

/**
 * A React component that renders an image slider with auto-play functionality and navigation controls.
 *
 * This component takes in data, theme classes, and a function to generate WhatsApp URLs for services.
 * It manages the current index of the displayed slide and the auto-play state using useState hooks.
 * The component renders images from the provided data, supports both static images and videos,
 * and includes navigation buttons, play/pause controls, slide counters, thumbnail navigation, and dots indicators.
 * Additionally, it provides action buttons to open WhatsApp URLs for booking services.
 *
 * @param data - An object containing content details such as title, subtitle, text, and images.
 * @param themeClasses - An object containing CSS classes for theming purposes.
 * @param getWhatsappUrlForService - A function that generates a WhatsApp URL based on the service title.
 */
const ImageSlider = ({
  data,
  themeClasses,
  getWhatsappUrlForService,
}: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const images = data.content?.image || [];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(nextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentIndex]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl section-heading mb-4">
          {data.content?.title}
        </h2>
        <h3 className="text-xl sm:text-2xl luxury-heading mb-8">
          {data.content?.subtitle}
        </h3>
        <p
          className={`text-base sm:text-lg ${themeClasses.textSecondary} leading-relaxed mb-12 max-w-4xl mx-auto`}
        >
          {data.content?.text}
        </p>
      </div>
      {/* Slider Container */}
      <div className="relative mb-12">
        {/* Main Slider */}
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image: any, index: number) => (
              <div key={index} className="w-full flex-shrink-0 relative">
                {image.src?.endsWith(".webm") ? (
                  <Video
                    className="w-full h-full object-cover"
                    src={image.src}
                  />
                ) : (
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt || "Service Image"}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                  <p className="text-white text-lg font-medium text-center">
                    {image.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronRight size={24} />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          {/* Slide Counter */}
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center mt-6 space-x-2 overflow-x-auto pb-2">
          {images.map((image: any, index: number) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? "border-yellow-500 shadow-lg"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              {image.src?.endsWith(".webm") ? (
                <Video className="w-full h-full object-cover" src={image.src} />
              ) : (
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt || "Thumbnail"}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_: number, index: number) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-yellow-500"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-yellow-500 text-black hover:bg-yellow-400 hover:text-black transition-all duration-300 px-8 py-3 text-sm sm:text-base tracking-wide rounded-lg font-medium"
            onClick={() =>
              window.open(getWhatsappUrlForService(data.title), "_blank")
            }
          >
            BOOK NOW
          </button>
          <button
            className={`${themeClasses.buttonOutline} transition-all duration-300 bg-transparent px-8 py-3 text-sm sm:text-base tracking-wide rounded-lg font-medium border-2`}
            onClick={() =>
              window.open(getWhatsappUrlForService(data.title), "_blank")
            }
          >
            LEARN MORE
          </button>
        </div>
      </div>
    </div>
  );
};

// Example usage with your existing component structure
/**
 * Renders an image gallery component based on the provided data and theme classes.
 *
 * This function checks if the slider feature is enabled in the data, and if so, it renders an ImageSlider component.
 * Otherwise, it renders a grid layout for images, which may include custom videos. The grid displays each image with
 * hover effects, captions, and action buttons to book or learn more about the service using WhatsApp.
 */
const ImageGalleryComponent = ({
  data,
  themeClasses,
  getWhatsappUrlForService,
}: ImageGalleryComponentProps) => {
  // If slider feature is enabled, use the slider
  if (data.feature === "slider") {
    return (
      <>
        <ImageSlider
          data={data}
          themeClasses={themeClasses}
          getWhatsappUrlForService={getWhatsappUrlForService}
        />
      </>
    );
  }

  // Original grid layout for images-with-custom-video
  return (
    <div className="max-w-6xl mx-auto">
      HELLO WORLD
      <div className="text-center mb-12 sm:mb-16">
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
      </div>
      {/* Image Grid */}
      {data.content.images && (
        <div className="mb-12 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {data.content.images.map((image: any, index: number) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center">
                  {image.src?.endsWith(".webm") ? (
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
                    <p className="text-white text-sm sm:text-base font-medium text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {image.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-yellow-500 text-black hover:bg-yellow-400 hover:text-black transition-all duration-300 px-8 py-3 text-sm sm:text-base tracking-wide rounded-lg font-medium"
            onClick={() =>
              window.open(getWhatsappUrlForService(data.title), "_blank")
            }
          >
            BOOK NOW
          </button>
          <button
            className={`${themeClasses.buttonOutline} transition-all duration-300 bg-transparent px-8 py-3 text-sm sm:text-base tracking-wide rounded-lg font-medium border-2`}
            onClick={() =>
              window.open(getWhatsappUrlForService(data.title), "_blank")
            }
          >
            LEARN MORE
          </button>
        </div>
      </div>
    </div>
  );

  return null;
};

export default ImageGalleryComponent;
