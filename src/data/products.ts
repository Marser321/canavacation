export type PlanKey = 'classic' | 'vip';

export interface PlanComparator {
  group: string;
  transport: string;
  spots: string;
  food: string;
  pace: string;
  bestFor: string;
}

export interface TourDetails {
  title: string;
  headline: string;
  bestFor: string;
  includes: string[];
  notIncludes: string[];
  timeline: string[];
  comparator: Record<PlanKey, PlanComparator>;
}

export interface ProductPricing {
  adult: number;
  child: number;
  infant: number;
  comparableValue?: number;
}

export interface Product {
  id: string;
  anchor: string;
  durationHours: number;
  classicImage: string;
  vipImage: string;
  selectorImage: string;
  galleryImages: string[];
  pricing: Record<PlanKey, ProductPricing>;
  es: TourDetails;
  en: TourDetails;
}

const premiumPath = '/imagenes_excursiones/premium-2026';

export const products: Product[] = [
  {
    id: 'saona',
    anchor: '#saona',
    durationHours: 7,
    // IMAGE_AUDIT_MARKER (Classic Wide Banner):
    // Prompt: A bright, high-resolution wide-angle photograph of a large white catamaran sailing on the turquoise waters of Bayahibe, Dominican Republic. The catamaran is filled with a group of happy, diverse tourists dancing and enjoying the sun. In the background, clear blue sky and a distant view of Isla Saona. Shot on DSLR, professional travel photography, highly detailed, vibrant tropical colors.
    classicImage: `${premiumPath}/saona-classic-wide.jpg`,
    // IMAGE_AUDIT_MARKER (VIP Wide Banner):
    // Prompt: A premium, high-resolution wide-angle photograph of a sleek, luxury private speed boat cruising fast through crystal-clear turquoise waters in Punta Cana. A small, select group of travelers is relaxing on the comfortable seats. The background features pristine white-sand beaches with leaning coconut palm trees and no crowds. Drone shot or low-angle action shot, professional travel advertising, cinematic lighting, 8k.
    vipImage: `${premiumPath}/saona-vip-wide.jpg`,
    // IMAGE_AUDIT_MARKER (Selector/Thumbnail Image):
    // Prompt: A wide cinematic photograph of a calm shallow natural pool near Isla Saona with a small family and local guide standing waist-deep in transparent turquoise water, palm-lined island in the distance, no boats as the main subject, premium Caribbean travel photography.
    selectorImage: `${premiumPath}/saona-selector-wide.jpg`,
    galleryImages: [
      // IMAGE_AUDIT_MARKER (Gallery Image 1 - Classic Story format):
      // Prompt: A vertical 9:16 professional food photography shot of a traditional Dominican buffet lunch on a wooden beach table at Isla Saona. The plate features arroz con habichuelas (rice and beans), grilled chicken, fresh salad, and sliced tropical fruits (pineapple, mango). In the background, soft focus on the turquoise sea and leaning palm trees. Warm sun rays, appetizing look, high detail.
      `${premiumPath}/saona-classic-story.jpg`,
      // IMAGE_AUDIT_MARKER (Gallery Image 2 - VIP Story format):
      // Prompt: A vertical 9:16 breathtaking aerial drone photograph of three pristine, untouched beaches of Isla Saona (Canto de la Playa). Crystal-clear shallow waters showing different shades of turquoise and navy, white sand shore, and lush green coconut palms bordering the beach. No tourists, wild nature paradise, high-end travel magazine cover style, sharp details, sunny day.
      `${premiumPath}/saona-vip-story.jpg`,
      // IMAGE_AUDIT_MARKER (Gallery Image 3 - VIP Square format):
      // Prompt: A square 1:1 close-up shot of hands gently presenting a large, orange starfish underwater in the shallow, crystal-clear natural pool of Bayahibe. Sunlight reflections ripple on the water surface, creating a magical pattern. The starfish is fully submerged and intact. Professional underwater travel photography, crisp details, natural lighting.
      `${premiumPath}/saona-vip-square.jpg`
    ],
    pricing: {
      classic: {
        adult: 90,
        child: 42,
        infant: 0
      },
      vip: {
        adult: 126,
        child: 63,
        infant: 0,
        comparableValue: 168
      }
    },
    es: {
      title: 'Isla Saona',
      headline: 'El paraíso caribeño que siempre soñaste.',
      bestFor: 'familias y primera vez',
      includes: [
        'Transporte ida/vuelta desde el hotel',
        'Guía oficial bilingüe',
        'Almuerzo buffet en la isla',
        'Open bar de bebidas nacionales',
        'Snorkeling en arrecife de coral',
        'Visita a la piscina natural con estrellas de mar'
      ],
      notIncludes: [
        'Fotografías profesionales del tour',
        'Propinas para la tripulación',
        'Consumos especiales o souvenirs'
      ],
      timeline: ['7:30 AM - Pickup', '9:00 AM - Embarque', '10:30 AM - Snorkel', '11:30 AM - Piscina natural', '12:30 PM - Almuerzo buffet en Saona', '4:30 PM - Retorno'],
      comparator: {
        classic: {
          group: 'Catamarán compartido (grupo grande)',
          transport: 'Catamarán espacioso a la ida y lancha rápida de retorno',
          spots: '1 playa principal en Isla Saona + piscina natural',
          food: 'Almuerzo buffet dominicano + open bar nacional',
          pace: 'Ritmo de grupo grande con tiempos coordinados',
          bestFor: 'Primera vez, familias y viajeros con presupuesto moderado'
        },
        vip: {
          group: 'Grupo reducido semi-privado',
          transport: 'Lancha rápida premium para ganar más tiempo de playa',
          spots: '3 playas vírgenes + piscina natural',
          food: 'Buffet mejorado + bebidas premium',
          pace: 'Salida más temprana, menos multitudes y más calma',
          bestFor: 'Quien quiere la foto sin desconocidos y más confort'
        }
      }
    },
    en: {
      title: 'Saona Island',
      headline: "The Caribbean paradise you've always dreamed of.",
      bestFor: 'families & first-timers',
      includes: [
        'Round-trip hotel transportation',
        'Bilingual tour guide',
        'Buffet lunch on the island',
        'National open bar',
        'Snorkeling on coral reefs',
        'Natural pool visit with starfish'
      ],
      notIncludes: [
        'Professional souvenir photos',
        'Crew tips',
        'Personal expenses or souvenirs'
      ],
      timeline: ['7:30 AM - Pickup', '9:00 AM - Boarding', '10:30 AM - Snorkel', '11:30 AM - Natural pool', '12:30 PM - Buffet lunch on Saona', '4:30 PM - Return'],
      comparator: {
        classic: {
          group: 'Shared catamaran (large group)',
          transport: 'Spacious catamaran out and speedboat return',
          spots: '1 main Saona beach + natural pool',
          food: 'Dominican buffet lunch + national open bar',
          pace: 'Large-group pace with coordinated stops',
          bestFor: 'First-timers, families and moderate budgets'
        },
        vip: {
          group: 'Small semi-private group',
          transport: 'Premium speedboat for more beach time',
          spots: '3 pristine beaches + natural pool',
          food: 'Upgraded buffet + premium drinks',
          pace: 'Earlier start, fewer crowds and calmer timing',
          bestFor: 'Travelers who want the crowd-free photo and comfort'
        }
      }
    }
  },
  {
    id: 'buggy',
    anchor: '#buggy',
    durationHours: 4,
    // IMAGE_AUDIT_MARKER (Classic Wide Banner):
    // Prompt: A wide-angle, high-action photograph of a caravan of classic off-road buggies driving through a muddy trail in Punta Cana. Mud splashes from the wheels, and a diverse group of young tourists is laughing and driving. Surrounded by tropical vegetation and palm trees. Action photography, dynamic composition, bright daytime, high resolution.
    classicImage: `${premiumPath}/buggy-classic-wide.jpg`,
    // IMAGE_AUDIT_MARKER (VIP Wide Banner):
    // Prompt: A wide-angle, premium photograph of a modern, high-performance Polaris RZR off-road vehicle driving fast on a private dirt path. A couple is driving with professional helmets and safety gear. The environment is a clean, beautiful Dominican landscape. High-end adventure, crisp detail, sharp focus, professional marketing style.
    vipImage: `${premiumPath}/buggy-vip-wide.jpg`,
    // IMAGE_AUDIT_MARKER (Selector/Thumbnail Image):
    // Prompt: A wide documentary-style photograph of travelers putting on helmets and bandanas beside parked off-road buggies at a rustic Dominican ranch checkpoint, cocoa pods, coffee plants, palm trees and a dusty trail in the background, energetic adventure travel photography.
    selectorImage: `${premiumPath}/buggy-selector-wide.jpg`,
    galleryImages: [
      // IMAGE_AUDIT_MARKER (Gallery Image 1 - Classic Story format):
      // Prompt: A vertical 9:16 portrait of a smiling couple sitting inside an open-air buggy, their faces and clothes playfully covered in mud splashes, wearing sunglasses and bandanas. They are giving thumbs up. Behind them is a tropical jungle trail. Fun, adventurous vibe, professional portrait photography, vibrant colors.
      `${premiumPath}/buggy-classic-story.jpg`,
      // IMAGE_AUDIT_MARKER (Gallery Image 2 - VIP Story format):
      // Prompt: A vertical 9:16 photograph of a hidden freshwater cave cenote (Cueva del Agua) in Punta Cana. The water is deep crystal-clear blue, and a person is swimming peacefully. Light beams stream through an opening in the rocky cave ceiling, illuminating the water. Mystic, tropical oasis, high detail, professional travel photography.
      `${premiumPath}/buggy-vip-story.jpg`,
      // IMAGE_AUDIT_MARKER (Gallery Image 3 - VIP Square format):
      // Prompt: A square 1:1 landscape photograph of Macao Beach (Playa Macao), Dominican Republic. Golden sand, wild turquoise waves crashing on the shore, surfboards lined up, and coconut palm trees bending towards the ocean. High-detail, professional landscape photography, sunny day.
      `${premiumPath}/buggy-vip-square.jpg`
    ],
    pricing: {
      classic: {
        adult: 69,
        child: 37,
        infant: 0
      },
      vip: {
        adult: 100,
        child: 53,
        infant: 0,
        comparableValue: 137
      }
    },
    es: {
      title: 'Excursión Buggy',
      headline: 'Barro, adrenalina y diversión en caminos todoterreno.',
      bestFor: 'aventura y adrenalina',
      includes: [
        'Traslado ida/vuelta desde hoteles en Punta Cana',
        'Buggy compartido equipado con seguridad',
        'Guías expertos en conducción',
        'Parada y baño en la cueva del agua / cenote',
        'Visita a Playa Macao',
        'Degustaciones de café, cacao y tabaco en rancho típico'
      ],
      notIncludes: [
        'Pañuelos o bandana protectora para el polvo',
        'Fotografías del recorrido',
        'Propinas opcionales'
      ],
      timeline: ['8:00 AM - Salida de hotel', '9:00 AM - Rancho y charla', '9:30 AM - Ruta todoterreno', '10:15 AM - Cueva del agua', '11:00 AM - Playa Macao', '12:00 PM - Retorno'],
      comparator: {
        classic: {
          group: 'Caravana grande compartida',
          transport: 'Buggy estándar todoterreno',
          spots: 'Cueva del agua + Playa Macao',
          food: 'Degustaciones de cacao/café + snack local',
          pace: 'Dependes del ritmo del conductor más lento',
          bestFor: 'Aventura económica y primera experiencia off-road'
        },
        vip: {
          group: 'Privado o grupo mínimo',
          transport: 'Polaris o vehículo de alto rendimiento',
          spots: 'Tiempo extendido en cenotes, rancho y rutas privadas',
          food: 'Degustaciones + trato más personalizado',
          pace: 'A tu propio ritmo, sin esperas largas',
          bestFor: 'Quien quiere estatus, control y mejores fotos'
        }
      }
    },
    en: {
      title: 'Buggy Adventure',
      headline: 'Mud, adrenaline, and off-road paths in Punta Cana.',
      bestFor: 'adventure & adrenaline',
      includes: [
        'Round-trip transportation from Punta Cana hotels',
        'Equipped shared buggy with safety harnesses',
        'Professional driving instructors',
        'Swimming stop at the water cave / cenote',
        'Stop at Macao Beach',
        'Coffee, cocoa, and cigar tastings at a local ranch'
      ],
      notIncludes: [
        'Bandanas or dust masks',
        'Professional photography packages',
        'Optional tips'
      ],
      timeline: ['8:00 AM - Hotel pickup', '9:00 AM - Ranch arrival & briefing', '9:30 AM - Off-road trail driving', '10:15 AM - Water cave swim', '11:00 AM - Macao Beach visit', '12:00 PM - Return'],
      comparator: {
        classic: {
          group: 'Large shared caravan',
          transport: 'Standard off-road buggy',
          spots: 'Water cave + Macao Beach',
          food: 'Coffee/cocoa tastings + local snack',
          pace: 'You wait for the slowest driver',
          bestFor: 'Budget adventure and first-time off-road riders'
        },
        vip: {
          group: 'Private or tiny group',
          transport: 'Polaris or high-performance vehicle',
          spots: 'Extended time at cenotes, ranch and private trails',
          food: 'Tastings + more personalized service',
          pace: 'Your own pace with no long waiting',
          bestFor: 'Travelers who want status, control and better photos'
        }
      }
    }
  },
  {
    id: 'party',
    anchor: '#party',
    durationHours: 3,
    // IMAGE_AUDIT_MARKER (Classic Wide Banner):
    // Prompt: A wide-angle photograph of a high-energy boat party on a double-deck catamaran in Punta Cana. A large group of diverse young people is dancing, laughing, raising tropical cocktails in plastic cups, led by a charismatic local animator. Sunny day, open ocean background, bright and fun party vibe, professional lifestyle photography.
    classicImage: `${premiumPath}/party-classic-wide.jpg`,
    // IMAGE_AUDIT_MARKER (VIP Wide Banner):
    // Prompt: A wide-angle, premium photograph of a luxury catamaran lounge area. A small group of friends is relaxing on comfortable white leather seats, sipping colorful premium cocktails in glass cups. Sophisticated, exclusive, and relaxed ambiance. Calm turquoise ocean in the background, elegant travel photography, 8k.
    vipImage: `${premiumPath}/party-vip-wide.jpg`,
    // IMAGE_AUDIT_MARKER (Selector/Thumbnail Image):
    // Prompt: A wide vibrant photograph of friends standing in a shallow turquoise natural pool around a floating tropical fruit tray and colorful drinks, Punta Cana coastline and a catamaran secondary in the background, premium lifestyle travel photography.
    selectorImage: `${premiumPath}/party-selector-wide.jpg`,
    galleryImages: [
      // IMAGE_AUDIT_MARKER (Gallery Image 1 - Classic Story format):
      // Prompt: A vertical 9:16 photograph of a floating bar in a shallow turquoise natural pool. The floating tray contains colorful tropical fruit platters (watermelon, pineapple, melon) and national drinks. People in swimwear are standing in the chest-deep crystal-clear water around it, smiling. Vibrant, sunny, professional travel shot.
      `${premiumPath}/party-classic-story.jpg`,
      // IMAGE_AUDIT_MARKER (Gallery Image 2 - VIP Story format):
      // Prompt: A vertical 9:16 underwater action photograph of a tourist snorkeling in a vibrant coral reef in Punta Cana. Crystal-clear water, colorful tropical fish swimming around, beautiful coral formations. The snorkeler is wearing a mask and fins. Natural light filtering through the water surface, crisp details.
      `${premiumPath}/party-vip-story.jpg`,
      // IMAGE_AUDIT_MARKER (Gallery Image 3 - VIP Square format):
      // Prompt: A square 1:1 close-up photograph of a premium tropical cocktail served in a freshly cut coconut, garnished with a slice of pineapple and a straw. It is held up with a soft-focus background of the calm turquoise ocean and sky. Professional commercial photography, refreshing, sharp details.
      `${premiumPath}/party-vip-square.jpg`
    ],
    pricing: {
      classic: {
        adult: 69,
        child: 37,
        infant: 0
      },
      vip: {
        adult: 95,
        child: 53,
        infant: 0,
        comparableValue: 126
      }
    },
    es: {
      title: 'Party Boat',
      headline: 'La mejor fiesta a bordo en las costas de Punta Cana.',
      bestFor: 'grupos y fiesta',
      includes: [
        'Transporte de ida y vuelta en autobús climatizado',
        'Catamarán de fiesta de dos cubiertas',
        'Animación a bordo y música bilingüe',
        'Open bar de bebidas nacionales (ron, cerveza)',
        'Snorkeling guiado con equipo incluido',
        'Paseo y baño en la piscina natural'
      ],
      notIncludes: [
        'Bebidas internacionales premium',
        'Almuerzo a bordo (solo snacks en Clásica)',
        'Propinas'
      ],
      timeline: ['12:30 PM - Recogida', '1:30 PM - Zarpe', '2:00 PM - Snorkel', '2:45 PM - Piscina natural y barra flotante', '4:00 PM - Regreso a muelle', '4:45 PM - Retorno'],
      comparator: {
        classic: {
          group: 'Catamarán compartido y ambiente animado',
          transport: 'Catamarán clásico de dos niveles',
          spots: 'Snorkel + piscina natural',
          food: 'Open bar nacional + frutas frescas',
          pace: 'Música alta, dinámicas grupales y fiesta constante',
          bestFor: 'Grupos que quieren fiesta sin complicarse'
        },
        vip: {
          group: 'Grupo reducido o zona reservada',
          transport: 'Catamarán mejorado con lounge premium',
          spots: 'Snorkel mejorado y spots menos concurridos',
          food: 'Barra premium + aperitivos frescos',
          pace: 'Más espacio, mejor servicio y ambiente curado',
          bestFor: 'Quien quiere confort, mejor reel y mejores bebidas'
        }
      }
    },
    en: {
      title: 'Party Boat',
      headline: 'The ultimate catamaran boat party in Punta Cana.',
      bestFor: 'groups & party',
      includes: [
        'Round-trip air-conditioned bus transportation',
        'Two-deck party catamaran vessel',
        'On-board entertainment and DJ',
        'Open bar with national rum and beers',
        'Guided snorkeling with gear',
        'Swimming at the natural pool shallow waters'
      ],
      notIncludes: [
        'Premium international alcohol brand labels',
        'Lunch on board (snacks only for Classic)',
        'Crew tips'
      ],
      timeline: ['12:30 PM - Pickup', '1:30 PM - Departure', '2:00 PM - Snorkel', '2:45 PM - Natural pool swim & floating bar', '4:00 PM - Return to marina', '4:45 PM - Dropoff'],
      comparator: {
        classic: {
          group: 'Shared catamaran with a lively crowd',
          transport: 'Classic two-level catamaran',
          spots: 'Snorkel + natural pool',
          food: 'National open bar + fresh fruit',
          pace: 'Loud music, group games and constant party energy',
          bestFor: 'Groups that want an easy party day'
        },
        vip: {
          group: 'Smaller group or reserved area',
          transport: 'Upgraded catamaran with premium lounge seating',
          spots: 'Better snorkel and quieter water spots',
          food: 'Premium bar + fresh appetizers',
          pace: 'More space, better service and curated vibes',
          bestFor: 'Travelers who want comfort, better reels and better drinks'
        }
      }
    }
  },
  {
    id: 'santo-domingo',
    anchor: '#santo-domingo',
    durationHours: 9,
    // IMAGE_AUDIT_MARKER (Classic Wide Banner):
    // Prompt: A wide-angle photograph of the historic Colonial Zone of Santo Domingo, showing a large modern air-conditioned tour bus parked. A diverse group of tourists is walking towards the imposing historic Cathedral of Santa María la Menor. Historic architecture, cobblestone streets, sunny day, professional travel photography.
    classicImage: `${premiumPath}/santo-classic-wide.jpg`,
    // IMAGE_AUDIT_MARKER (VIP Wide Banner):
    // Prompt: A wide-angle, premium photograph of a private walking tour in the Colonial Zone of Santo Domingo. A professional tour guide is showing historical details to a couple on a quiet, narrow cobblestone street lined with colorful colonial-style houses and vibrant pink bougainvillea flowers. Intimate, cultural, professional photography.
    vipImage: `${premiumPath}/santo-vip-wide.jpg`,
    // IMAGE_AUDIT_MARKER (Selector/Thumbnail Image):
    // Prompt: A wide premium travel photograph of visitors entering Plaza de España near the Alcázar de Colón arches while a local guide points toward the historic landmark, warm colonial stone, blue sky, architecture as the hero, no vehicle focus.
    selectorImage: `${premiumPath}/santo-selector-wide.jpg`,
    galleryImages: [
      // IMAGE_AUDIT_MARKER (Gallery Image 1 - Classic Story format):
      // Prompt: A vertical 9:16 photograph of the breathtaking underground lagoons at Los Tres Ojos National Park in Santo Domingo. Lush green tropical vegetation hangs down into a massive open limestone cave, framing a crystal-clear blue lake. Cinematic natural lighting, scenic, professional travel photo.
      `${premiumPath}/santo-classic-story.jpg`,
      // IMAGE_AUDIT_MARKER (Gallery Image 2 - VIP Story format):
      // Prompt: A vertical 9:16 professional food photography shot of a gourmet Dominican fusion dish (like a stylized mofongo with shrimp) served in the open-air courtyard of a luxury restaurant in the Colonial Zone. Elegant presentation, colonial architecture in the background with soft focus. Cinematic warm lighting.
      `${premiumPath}/santo-vip-story.jpg`,
      // IMAGE_AUDIT_MARKER (Gallery Image 3 - VIP Square format):
      // Prompt: A square 1:1 architectural photograph of the historic Alcázar de Colón in Santo Domingo. Focus on the majestic stone arches and columns, with the bright blue sky above. Sharp details, professional travel photography, historical landmark.
      `${premiumPath}/santo-vip-square.jpg`
    ],
    pricing: {
      classic: {
        adult: 95,
        child: 48,
        infant: 0
      },
      vip: {
        adult: 168,
        child: 84,
        infant: 0,
        comparableValue: 221
      }
    },
    es: {
      title: 'City Tour Santo Domingo',
      headline: 'Viaja en el tiempo y conoce la cuna de América.',
      bestFor: 'cultura e historia',
      includes: [
        'Transporte de larga distancia en autobús de turismo',
        'Guía oficial especializado en historia',
        'Entradas al Parque Nacional Los Tres Ojos',
        'Recorrido por la Zona Colonial',
        'Visita al Faro a Colón y Palacio Presidencial (exterior)',
        'Almuerzo tradicional dominicano'
      ],
      notIncludes: [
        'Bebidas adicionales en el restaurante',
        'Propinas para el guía e historiadores locales',
        'Compras personales'
      ],
      timeline: ['7:00 AM - Salida de Punta Cana', '9:30 AM - Visita a Los Tres Ojos', '11:00 AM - Catedral y Zona Colonial', '1:00 PM - Almuerzo típico', '2:30 PM - Alcázar de Colón', '6:00 PM - Llegada a Punta Cana'],
      comparator: {
        classic: {
          group: 'Autobús turístico de gran capacidad (30+)',
          transport: 'Bus turístico climatizado',
          spots: 'Ruta fija con los puntos históricos principales',
          food: 'Guía estándar + almuerzo típico',
          pace: 'Horarios rígidos coordinados para grupos grandes',
          bestFor: 'Turistas culturales que buscan economía y puntos clave'
        },
        vip: {
          group: 'Privado o grupo íntimo (<8)',
          transport: 'Minivan o SUV cómoda para el trayecto largo',
          spots: 'Ruta flexible, rincones especiales y sin paradas forzadas',
          food: 'Guía historiador + almuerzo gastronómico',
          pace: 'Tu propio ritmo con más comodidad y profundidad',
          bestFor: 'Amantes de la cultura que no quieren sentirse turistas estándar'
        }
      }
    },
    en: {
      title: 'Santo Domingo City Tour',
      headline: "Walk through history in America's oldest city.",
      bestFor: 'culture & history',
      includes: [
        'Long-distance tourist bus transportation',
        'Certified history tour guide',
        'Admission ticket to Los Tres Ojos National Park',
        'Walking tour of the historic Colonial Zone',
        'Sightseeing at Columbus Lighthouse and Presidential Palace',
        'Traditional Dominican lunch'
      ],
      notIncludes: [
        'Additional drinks at the restaurant',
        'Tips for the tour guide and museum curators',
        'Personal souvenirs'
      ],
      timeline: ['7:00 AM - Departure', '9:30 AM - Los Tres Ojos Park', '11:00 AM - Colonial Cathedral walking tour', '1:00 PM - Traditional lunch', '2:30 PM - Alcazar de Colon', '6:00 PM - Return to hotels'],
      comparator: {
        classic: {
          group: 'Large tour bus (30+)',
          transport: 'Air-conditioned tour bus',
          spots: 'Fixed route with the main historic landmarks',
          food: 'Standard guide + traditional lunch',
          pace: 'Fixed schedule coordinated for large groups',
          bestFor: 'Culture travelers who want the key sights with value'
        },
        vip: {
          group: 'Private or intimate group (<8)',
          transport: 'Comfortable minivan or SUV for the long drive',
          spots: 'Flexible route, special corners and no forced shop stops',
          food: 'Historian guide + gourmet lunch',
          pace: 'Your own relaxed pace with deeper context',
          bestFor: 'Culture lovers who hate feeling like standard tourists'
        }
      }
    }
  }
];
