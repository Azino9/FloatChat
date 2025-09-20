export const learningCategories = [
  {
    id: 1,
    title: "Marine Life",
    icon: "🐠",
    description: "Explore the diverse world of ocean creatures and ecosystems",
    color: "from-blue-500 to-cyan-500",
    units: [
      {
        id: 1,
        title: "Deep Sea Creatures",
        subtopics: [
          {
            id: 1,
            title: "Bioluminescent Fish",
            content: {
              simple: "Deep sea fish create their own light using special chemicals in their bodies. This helps them see in the dark ocean depths where sunlight cannot reach.",
              technical: "Bioluminescence in deep-sea fish occurs through the oxidation of luciferin by the enzyme luciferase, producing photons. This biochemical process typically occurs in specialized organs called photophores.",
              examples: "The anglerfish uses a glowing lure to attract prey, while lanternfish create patterns of light along their bodies for communication and camouflage."
            }
          },
          {
            id: 2,
            title: "Giant Squids",
            content: {
              simple: "Giant squids are massive sea creatures that can grow up to 43 feet long. They live in the deepest parts of the ocean and are rarely seen by humans.",
              technical: "Architeuthis dux, commonly known as the giant squid, possesses the largest eyes in the animal kingdom (up to 10 inches in diameter) and uses jet propulsion for locomotion through siphon-mediated water expulsion.",
              examples: "Sperm whales often have scars from giant squid tentacles, showing evidence of deep-sea battles. Scientists study these encounters to learn about giant squid behavior."
            }
          }
        ]
      },
      {
        id: 2,
        title: "Coral Reef Ecosystems",
        subtopics: [
          {
            id: 3,
            title: "Coral Formation",
            content: {
              simple: "Corals are tiny animals that build hard skeletons. Over time, millions of these skeletons create large coral reefs that provide homes for many sea creatures.",
              technical: "Coral polyps secrete calcium carbonate (CaCO₃) through biomineralization processes, creating aragonite crystal structures. Symbiotic zooxanthellae algae provide up to 90% of coral energy through photosynthesis.",
              examples: "The Great Barrier Reef spans over 2,300 kilometers and supports over 9,000 species of marine life, making it one of the most biodiverse ecosystems on Earth."
            }
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Oceanography",
    icon: "🌊",
    description: "Understand ocean currents, temperature, and water properties",
    color: "from-teal-500 to-blue-600",
    units: [
      {
        id: 3,
        title: "Ocean Currents",
        subtopics: [
          {
            id: 4,
            title: "Gulf Stream",
            content: {
              simple: "The Gulf Stream is like a river of warm water flowing through the Atlantic Ocean. It carries warm water from the tropics to colder regions, affecting weather patterns.",
              technical: "The Gulf Stream is a western boundary current driven by thermohaline circulation and the Coriolis effect, transporting approximately 30 million cubic meters of water per second northeastward.",
              examples: "The Gulf Stream keeps Western Europe's climate milder than expected for its latitude. London has a similar climate to cities 500 miles further south due to this warm current."
            }
          },
          {
            id: 5,
            title: "Thermohaline Circulation",
            content: {
              simple: "Ocean water moves around the world based on its temperature and saltiness. Cold, salty water sinks while warm, less salty water rises, creating a global conveyor belt of water movement.",
              technical: "Thermohaline circulation is driven by density differences caused by variations in temperature (thermal) and salinity (haline). This process forms the global meridional overturning circulation (MOC).",
              examples: "The Antarctic Circumpolar Current transports 600 times more water than the Amazon River, demonstrating the massive scale of global ocean circulation."
            }
          }
        ]
      },
      {
        id: 4,
        title: "Ocean Chemistry",
        subtopics: [
          {
            id: 6,
            title: "Ocean Acidification",
            content: {
              simple: "When the ocean absorbs carbon dioxide from the air, it becomes more acidic. This change makes it harder for sea creatures with shells to build and maintain their protective coverings.",
              technical: "Ocean acidification occurs when atmospheric CO₂ dissolves in seawater, forming carbonic acid (H₂CO₃), which releases hydrogen ions (H⁺) and lowers pH. This reduces carbonate ion availability for calcifying organisms.",
              examples: "Coral reefs and shellfish like oysters and mussels struggle to build calcium carbonate structures in more acidic waters, affecting entire marine food chains."
            }
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "ARGO Resources",
    icon: "🛰️",
    description: "Learn about ARGO floats and ocean data collection",
    color: "from-purple-500 to-indigo-600",
    units: [
      {
        id: 5,
        title: "ARGO Float Technology",
        subtopics: [
          {
            id: 7,
            title: "How ARGO Floats Work",
            content: {
              simple: "ARGO floats are robotic devices that drift in the ocean, diving up and down to measure water temperature and saltiness. They send this data to satellites so scientists can study ocean conditions.",
              technical: "ARGO profilers use hydraulic systems to adjust buoyancy, cycling between surface (data transmission) and subsurface depths (up to 2000m) every 10 days. They measure temperature, salinity, and pressure using CTD sensors.",
              examples: "Over 4,000 ARGO floats currently operate worldwide, providing real-time ocean data that improves weather forecasting and climate models by 30%."
            }
          }
        ]
      },
      {
        id: 6,
        title: "Data Applications",
        subtopics: [
          {
            id: 8,
            title: "Climate Research",
            content: {
              simple: "ARGO data helps scientists understand how the ocean is changing over time. This information is crucial for predicting climate change and its effects on weather patterns.",
              technical: "ARGO data contributes to ocean heat content calculations, mixed layer depth analysis, and validation of global climate models. The network provides critical observations for assessing ocean warming rates.",
              examples: "ARGO data revealed that oceans have absorbed 93% of excess heat from global warming, with the upper 2000m of ocean warming by 0.33°C since 1969."
            }
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Marine Economics & Laws",
    icon: "⚖️",
    description: "Explore ocean governance, trade, and economic activities",
    color: "from-emerald-500 to-teal-600",
    units: [
      {
        id: 7,
        title: "Maritime Law",
        subtopics: [
          {
            id: 9,
            title: "Territorial Waters",
            content: {
              simple: "Countries have rights over the ocean waters near their coasts. These territorial waters extend 12 nautical miles from the shore, where nations can enforce their laws and control activities.",
              technical: "Under UNCLOS (United Nations Convention on the Law of the Sea), territorial seas extend 12 nautical miles from baselines, with coastal states exercising sovereignty over water column, seabed, and airspace.",
              examples: "India's territorial waters cover approximately 0.37 million km², while its Exclusive Economic Zone (EEZ) spans 2.02 million km², containing rich fishery and mineral resources."
            }
          }
        ]
      },
      {
        id: 8,
        title: "Ocean Economy",
        subtopics: [
          {
            id: 10,
            title: "Blue Economy",
            content: {
              simple: "The blue economy refers to using ocean resources in a sustainable way that benefits people while protecting marine environments. It includes fishing, shipping, tourism, and renewable energy.",
              technical: "The blue economy encompasses sustainable use of ocean resources for economic growth, improved livelihoods, and ocean ecosystem health. It contributes $2.5 trillion annually to the global economy.",
              examples: "India's Blue Economy initiative aims to utilize 7,500 km of coastline for sustainable fisheries, offshore wind energy, and marine biotechnology, targeting $1 trillion by 2047."
            }
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Geography of Oceans",
    icon: "🗺️",
    description: "Study ocean basins, features, and geographical patterns",
    color: "from-orange-500 to-red-500",
    units: [
      {
        id: 9,
        title: "Ocean Basins",
        subtopics: [
          {
            id: 11,
            title: "Indian Ocean Features",
            content: {
              simple: "The Indian Ocean is the third-largest ocean, bounded by Africa, Asia, and Australia. It has unique features like the Mid-Indian Ridge and deep-sea trenches.",
              technical: "The Indian Ocean covers 70.6 million km² and reaches maximum depths of 7,725m in the Java Trench. It's characterized by the Central Indian Ridge system and seasonal monsoon-driven circulation patterns.",
              examples: "The Indian Ocean's unique geography creates the Indian Ocean Dipole (IOD), affecting monsoon patterns across the Indian subcontinent and influencing agricultural cycles."
            }
          }
        ]
      },
      {
        id: 10,
        title: "Underwater Topography",
        subtopics: [
          {
            id: 12,
            title: "Mid-Ocean Ridges",
            content: {
              simple: "Mid-ocean ridges are underwater mountain chains where new ocean floor is created. Hot rock rises from deep inside Earth, cools, and forms new seafloor that slowly spreads outward.",
              technical: "Mid-ocean ridges are divergent plate boundaries where basaltic magma erupts, creating new oceanic lithosphere through seafloor spreading at rates of 2-18 cm/year.",
              examples: "The Mid-Atlantic Ridge is slowly pushing Europe and North America apart by about 2.5 cm per year, the same rate that fingernails grow."
            }
          }
        ]
      }
    ]
  }
];

export const quizQuestions = {
  1: [ // Marine Life
    {
      id: 1,
      question: "What enables deep-sea fish to produce their own light?",
      options: [
        "Reflection of moonlight",
        "Bioluminescent chemicals",
        "Electric currents",
        "Phosphorescent plankton"
      ],
      correct: 1,
      explanation: "Deep-sea fish use bioluminescent chemicals (luciferin and luciferase) to create light through biochemical reactions."
    },
    {
      id: 2,
      question: "What is the maximum recorded length of a giant squid?",
      options: ["25 feet", "35 feet", "43 feet", "55 feet"],
      correct: 2,
      explanation: "Giant squids can grow up to 43 feet long, making them one of the largest invertebrates on Earth."
    },
    {
      id: 3,
      question: "What percentage of coral energy comes from symbiotic algae?",
      options: ["50%", "70%", "90%", "100%"],
      correct: 2,
      explanation: "Symbiotic zooxanthellae algae provide up to 90% of coral energy through photosynthesis."
    },
    {
      id: 4,
      question: "Which process creates coral reef structures?",
      options: ["Sand accumulation", "Biomineralization", "Volcanic activity", "Tidal erosion"],
      correct: 1,
      explanation: "Coral polyps create reef structures through biomineralization, secreting calcium carbonate skeletons."
    },
    {
      id: 5,
      question: "How many species does the Great Barrier Reef support?",
      options: ["5,000", "7,500", "9,000", "12,000"],
      correct: 2,
      explanation: "The Great Barrier Reef supports over 9,000 species of marine life, making it incredibly biodiverse."
    }
  ],
  2: [ // Oceanography
    {
      id: 6,
      question: "What drives the Gulf Stream current?",
      options: [
        "Wind patterns only",
        "Thermohaline circulation and Coriolis effect",
        "Tidal forces",
        "Gravitational pull"
      ],
      correct: 1,
      explanation: "The Gulf Stream is driven by thermohaline circulation and the Coriolis effect, creating a powerful western boundary current."
    },
    {
      id: 7,
      question: "How much water does the Gulf Stream transport per second?",
      options: ["10 million m³", "30 million m³", "50 million m³", "70 million m³"],
      correct: 1,
      explanation: "The Gulf Stream transports approximately 30 million cubic meters of water per second."
    },
    {
      id: 8,
      question: "What causes ocean acidification?",
      options: [
        "Industrial waste",
        "CO₂ absorption from atmosphere",
        "Plastic pollution",
        "Overfishing"
      ],
      correct: 1,
      explanation: "Ocean acidification occurs when seawater absorbs CO₂ from the atmosphere, forming carbonic acid."
    },
    {
      id: 9,
      question: "What is thermohaline circulation driven by?",
      options: [
        "Wind patterns",
        "Density differences from temperature and salinity",
        "Tidal forces",
        "Ocean floor topography"
      ],
      correct: 1,
      explanation: "Thermohaline circulation is driven by density differences caused by temperature and salinity variations."
    },
    {
      id: 10,
      question: "How much more water does the Antarctic Circumpolar Current transport compared to the Amazon River?",
      options: ["200 times", "400 times", "600 times", "800 times"],
      correct: 2,
      explanation: "The Antarctic Circumpolar Current transports 600 times more water than the Amazon River."
    }
  ]
};

export const assignments = {
  1: {
    question: "Describe how bioluminescence helps deep-sea creatures survive in their environment. Include at least three specific examples and explain the evolutionary advantages. (10 marks)",
    rubric: [
      "Clear explanation of bioluminescence mechanism (2 marks)",
      "Three specific examples with accurate details (3 marks)",
      "Discussion of evolutionary advantages (3 marks)",
      "Scientific terminology and clarity (2 marks)"
    ]
  },
  2: {
    question: "Analyze the impact of thermohaline circulation on global climate patterns. Discuss how changes in this circulation could affect regional weather systems. (10 marks)",
    rubric: [
      "Explanation of thermohaline circulation process (2 marks)",
      "Connection to global climate patterns (3 marks)",
      "Analysis of potential impacts from circulation changes (3 marks)",
      "Use of scientific evidence and examples (2 marks)"
    ]
  }
};