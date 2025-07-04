export const serviceData = {
   dining: {
    title: "Luxury Dining Experiences",
    hero: "From breathtaking skyline views to serene beachfront elegance, Servana Circle grants you effortless access to Dubai's most exquisite culinary destinations. We don’t just book restaurants,  we unlock unforgettable moments you'll crave again.",
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
    title: "Private Yacht Charters & Elite Cruises",
    background: "/images/wallpaper/boat.png",
    hero: "Indulge in a world of refined luxury on the Arabian Gulf. Our handpicked fleet of premium yachts offers bespoke experiences, from romantic getaways to high-profile celebrations with private chefs and onboard DJs.",
    tagline:
      "Because every moment on the water should feel like it was made exclusively for you.",
    description:
      "Step aboard our elite collection of luxury yachts—each one meticulously appointed for unparalleled comfort, style, and service. Whether you're toasting under the stars or soaking in a Jacuzzi at sea, your voyage is tailored to perfection.",
    type: "yachts",
    yachts: [
      {
        name: "28ft Premium Cruiser",
        guests: "Up to 7 Guests",
        image: "/images/boats/28ft.png",
      },
      {
        name: "47ft Executive Yacht",
        guests: "Up to 12 Guests",
        image: "/images/boats/47ft.png",
      },
      {
        name: "76ft Grand Yacht",
        guests: "Up to 40 Guests",
        image: "/images/boats/76ft.png",
      },
      {
        name: "85ft Jacuzzi Superyacht",
        guests: "Up to 40 Guests",
        image: "/images/boats/85ft.png",
      },
    ],
  },
  nightlife: {
    title: "Nightlife & Elite Lounge Access",
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
    hero: "Drive your dream through Dubai with our handpicked fleet of supercars.",
    tagline: "Every street becomes a runway.",
    description:
      "Experience freedom on your own terms, or lean back and let us drive you in ultimate style.",
    background: "/images/wallpaper/cars.png",
    type: "text-with-image",
    content: {
      title: "LUXURY CAR RENTALS IN DUBAI",
      subtitle: "YOUR DUBAI DRIVING EXPERIENCE",
      text: "Transform your Dubai journey with our exclusive fleet of luxury and exotic vehicles. From sleek Lamborghinis to elegant Rolls-Royces, experience the city's stunning skyline and pristine roads in unparalleled style. Our concierge team ensures seamless delivery and pickup, so you can focus on the thrill of the drive.",
      image: [
        {
          src: "/images/cars/client.png", // This would be actual self-driving image
          alt: "Self-Drive Luxury Experience",
          caption: "Drive Your Dream - Self-Drive Experience",
        },
        {
          src: "/images/cars/chauffeur.png", // This would be actual chauffeur image
          alt: "Chauffeured Luxury Experience",
          caption: "Chauffeured Elegance - Let Us Drive You",
        },
      ],
    },
  },
  desert: {
    title: "Desert Escapes & Safari Adventures",
    background: "/images/wallpaper/desert.png",
    hero: "Golden silence and adrenaline in Dubai's magnificent desert landscapes.",
    tagline: "Where the city meets the infinite.",
    description:
      "Venture into the heart of the Arabian Desert for an experience that combines traditional Bedouin culture with modern luxury.",
    type: "images-with-custom-video",
    content: {
      title: "DESERT SAFARI IN DUBAI",
      subtitle: "YOUR DUBAI DESERT EXPERIENCE",
      text: "Escape the urban pulse and discover the timeless beauty of the Arabian Desert. From exhilarating dune bashing adventures to serene sunset dinners under a canopy of stars, our desert experiences blend authentic Bedouin traditions with contemporary luxury. Let the golden sands tell their ancient stories while you create new memories.",
      video: "/videos/safari-bak.mp4", // Using the hero video for now, can be replaced with safari video
      videoThumbnail: "/videos/safari.png",
      images: [
        {
          src: "/images/safari/camel.png", // These would be actual camel ride images
          alt: "Camel Rides",
          caption: "Traditional Camel Rides",
        },
        {
          src: "/images/safari/quad.png", // These would be actual quad biking images
          alt: "Quad Biking",
          caption: "Thrilling Quad Biking",
        },
        {
          src: "/images/safari/barbecue.png", // These would be actual barbecue images
          alt: "Barbecue Dinner",
          caption: "Desert Barbecue Dinner",
        },
        {
          src: "/images/safari/dune.png", // These would be actual dune bashing images
          alt: "Dune Bashing",
          caption: "Exciting Dune Bashing",
        },
        {
          src: "/images/safari/bedouin.png", // These would be actual entertainment images
          alt: "Traditional Entertainment",
          caption: "Authentic Bedouin Entertainment",
        },
      ],
    },
  },
  "water-activities": {
    title: "Water Activities & Sea Thrills",
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
        "Soar over Dubai’s icons with a private helicopter tour! A breathtaking experience from takeoff to landing.",
      ],
      image: "/images/helicopter.png",
    },
  },
  family: {
    title: "Family & Cultural Explorations",
    background: "/images/wallpaper/family.png",
    hero: "Luxury meets discovery for all ages with curated family experiences.",
    tagline: "Creating memories across generations.",
    // description:
    //   "Discover Dubai's rich culture and family-friendly attractions through carefully curated experiences.",
    type: "text-with-image",
    content: {
      title: "FAMILY EXPERIENCES IN DUBAI",
      subtitle: "YOUR DUBAI FAMILY ADVENTURE",
      text: "Soar over Dubai’s icons with a private helicopter tour, a breathtaking experience from takeoff to landing.",
      image: [
        {
          src: "/images/family/miracle.png", // This would be actual Miracle Garden image
          alt: "Dubai Miracle Garden",
          caption: "Dubai Miracle Garden - Floral Wonderland",
        },
        {
          src: "/images/family/village.png", // This would be actual Global Village image
          alt: "Global Village Dubai",
          caption: "Global Village - Cultural Celebration",
        },
        {
          src: "/images/family/greenplanet.png", // This would be actual Green Planet image
          alt: "The Green Planet Dubai",
          caption: "The Green Planet - Indoor Rainforest",
        },
        {
          src: "/images/family/zoo.png", // This would be actual Dubai Zoo image
          alt: "Dubai Zoo",
          caption: "Dubai Zoo - Wildlife Adventure",
        },
        {
          src: "/images/family/themeparks.png", // This would be actual theme park image
          alt: "Dubai Theme Parks",
          caption: "Theme Parks - Thrilling Adventures",
        },
        {
          src: "/images/family/aquarium.png", // This would be actual aquarium image
          alt: "Dubai Aquarium",
          caption: "Dubai Aquarium - Underwater Wonders",
        },
      ],
    },
  },
  "luxury-stay": {
    title: "Luxury Stay",
    background: "/images/stay.png",
    hero: "Your Home Away From Ordinary",
    tagline: "Wake up where you want to be.",
    description:
      "From sunset-view penthouses to hidden desert villas, our team secures your dream stay, fully tailored to your taste.",
    type: "text-with-image",
    cta: "Plan My Stay",
    content: {
      title: "LUXURY ACCOMMODATIONS IN DUBAI",
      subtitle: "YOUR PRIVATE RETREAT EXPERIENCE",
      text: "Experience Dubai from the comfort of your perfect sanctuary. Our Stay Designer service ensures every detail matches your vision — from oceanfront penthouses with infinity pools to secluded desert villas under starlit skies. We don't just book rooms; we curate your ideal home away from home, where luxury meets your personal style.",
      image: "/images/wallpaper/room.png",
    },
  },
  "private-jet": {
    title: "Private Jet",
    background: "/images/jet-hero.png",
    hero: "Take Off On Your Time",
    tagline: "We move as you move.",
    description:
      "Your private jet, ready when you are. Servana Circle handles every detail — routes, crew, ground transfers — so you just step in and fly.",
    type: "text-with-image",
    cta: "Request My Jet",
    content: {
      title: "PRIVATE AVIATION SERVICES",
      subtitle: "YOUR SKY, YOUR SCHEDULE",
      text: "From romantic getaways to last-minute business flights, experience the ultimate in aviation luxury. Our private jet service eliminates the ordinary — no lines, no delays, just seamless travel on your terms. Whether it's a sunset flight over the Arabian Gulf or an international business trip, we handle every detail so you can focus on what matters most.",
      image: "/images/jet.png",
    },
  },
  "vip-haircut": {
    title: "VIP Haircut",
    background: "/images/haircut.png",
    hero: "A Barber. A Chair. Anywhere.",
    tagline: "Your style, your space, your time.",
    description:
      "From your villa balcony to your yacht deck, get a professional cut by Dubai's best stylists — at your place, on your time.",
    type: "text-with-image",
    cta: "Book My VIP Cut",
    content: {
      title: "VIP GROOMING SERVICES",
      subtitle: "GENTLEMEN'S GROOMING CONCIERGE",
      text: "Elevate your grooming experience with Dubai's finest stylists coming to you. Whether you're preparing for a business meeting on your yacht or want to refresh your look poolside at your villa, our Gentlemen's Grooming Concierge delivers professional cuts, beard trims, and spa-quality treatments wherever you are. Style has never been this convenient.",
      image: "/images/haircut.png",
    }
  }
};

// Featured experiences for random selection
export const services = [
      {
        id: "dining",
        title: "Luxury Dining Experiences",
        description:
          "From skyline views to beachfront elegance, seamless access to Dubai's most refined culinary destinations.",
        image: "/images/cook.png",
      },
      {
        id: "yachts",
        title: "Yacht Charters & Private Cruises",
        description:
          "Sail the Arabian Gulf aboard curated yachts that define elegance and sophistication.",
        image: "/images/boat.png",
      },
      {
        id: "nightlife",
        title: "Nightlife & Elite Lounge Access",
        description:
          "Dubai after dark is electric,  and we hold the keys to premium experiences.",
        image: "/images/night.png",
      },
      {
        id: "beach-clubs",
        title: "Beach Clubs & Poolside Escapes",
        description:
          "Sun-soaked indulgence at Dubai's most iconic beach clubs and pools.",
        image: "/images/beachclubs.png",
      },
      {
        id: "luxury-cars",
        title: "Luxury & Exotic Car Rentals",
        description:
          "Drive your dream through Dubai with our handpicked fleet of supercars.",
        image: "/images/cars.png",
      },
      {
        id: "desert",
        title: "Desert Escapes & Safari Adventures",
        description:
          "Golden silence and adrenaline in Dubai's magnificent desert landscapes.",
        image: "/images/safari.png",
      },
      {
        id: "water-activities",
        title: "Water Activities & Sea Thrills",
        description:
          "Dive into Dubai's playful side with exciting marine experiences.",
        image: "/images/water.png",
      },
      {
        id: "helicopter",
        title: "Helicopter & Aerial Experiences",
        description:
          "Soar above the city in private helicopters with breathtaking views.",
        image: "/images/helicopter.png",
      },
      {
        id: "family",
        title: "Family & Cultural Explorations",
        description:
          "Luxury meets discovery for all ages with curated family experiences.",
        image: "/images/family.png",
      },
      {
        id: "luxury-stay",
        title: "Luxury Stay — Your Private Retreat",
        description:
          "From sunset-view penthouses to hidden desert villas, your dream stay awaits.",
        image: "/images/stay.png",
      },
      {
        id: "private-jet",
        title: "Private Jet | Your Sky, Your Rules",
        description:
          "Your private jet, ready when you are. Fly on your terms with seamless service.",
        image: "/images/jet.png",
      },
      {
        id: "vip-haircut",
        title: "VIP Haircut | Style Delivered",
        description:
          "A barber. A chair. Anywhere. Professional cuts by Dubai's best stylists at your place.",
        image: "/images/haircut.png",
      }
];
