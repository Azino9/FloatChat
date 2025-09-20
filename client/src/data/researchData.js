export const researchData = {
  temperatureTrends: [
    { year: 2020, indian: 28.2, pacific: 26.8, atlantic: 25.1 },
    { year: 2021, indian: 28.4, pacific: 27.0, atlantic: 25.3 },
    { year: 2022, indian: 28.6, pacific: 27.2, atlantic: 25.5 },
    { year: 2023, indian: 28.8, pacific: 27.4, atlantic: 25.7 },
    { year: 2024, indian: 29.0, pacific: 27.6, atlantic: 25.9 },
    { year: 2025, indian: 29.2, pacific: 27.8, atlantic: 26.1 }
  ],
  
  salinityData: [
    { depth: 0, salinity: 35.2, region: "Surface Indian Ocean" },
    { depth: 100, salinity: 35.4, region: "Subsurface Indian Ocean" },
    { depth: 500, salinity: 35.1, region: "Intermediate Indian Ocean" },
    { depth: 1000, salinity: 34.8, region: "Deep Indian Ocean" },
    { depth: 2000, salinity: 34.7, region: "Abyssal Indian Ocean" }
  ],

  currentStrength: [
    { location: "Arabian Sea", current: "Southwest Monsoon", strength: 85, season: "Summer" },
    { location: "Bay of Bengal", current: "Northeast Monsoon", strength: 72, season: "Winter" },
    { location: "Equatorial Region", current: "Equatorial Countercurrent", strength: 65, season: "Year-round" },
    { location: "Madagascar", current: "Agulhas Current", strength: 95, season: "Year-round" },
    { location: "Western Australia", current: "Leeuwin Current", strength: 45, season: "Year-round" }
  ],

  datasets: [
    {
      id: 1,
      title: "Indian Ocean Temperature Anomalies 2020-2025",
      type: "Temperature",
      region: "Indian Ocean",
      description: "Sea surface temperature variations across the Indian Ocean basin showing warming trends",
      lastUpdated: "2025-09-15",
      dataPoints: 1250,
      keywords: ["temperature", "climate", "warming", "indian ocean"]
    },
    {
      id: 2,
      title: "ARGO Float Salinity Profiles - Bay of Bengal",
      type: "Salinity",
      region: "Bay of Bengal",
      description: "Vertical salinity profiles from ARGO floats showing freshwater influence from rivers",
      lastUpdated: "2025-09-18",
      dataPoints: 890,
      keywords: ["salinity", "argo", "bay of bengal", "freshwater"]
    },
    {
      id: 3,
      title: "Monsoon Current Velocity Measurements",
      type: "Current",
      region: "Arabian Sea",
      description: "Current velocity and direction data during monsoon seasons 2020-2025",
      lastUpdated: "2025-09-10",
      dataPoints: 2150,
      keywords: ["currents", "monsoon", "arabian sea", "velocity"]
    },
    {
      id: 4,
      title: "Coral Reef Health Assessment - Maldives",
      type: "Biological",
      region: "Maldives",
      description: "Coral bleaching and recovery data from Maldivian reef systems",
      lastUpdated: "2025-08-25",
      dataPoints: 450,
      keywords: ["coral", "bleaching", "maldives", "ecosystem"]
    },
    {
      id: 5,
      title: "Deep Water Formation - Antarctic Region",
      type: "Oceanographic",
      region: "Southern Ocean",
      description: "Antarctic bottom water formation and circulation patterns",
      lastUpdated: "2025-09-12",
      dataPoints: 1680,
      keywords: ["deep water", "antarctic", "circulation", "formation"]
    }
  ],

  mapMarkers: [
    {
      id: 1,
      lat: 15.5,
      lng: 68.2,
      title: "Arabian Sea Research Station",
      type: "research",
      description: "Active ARGO deployment site monitoring monsoon currents",
      data: "Temperature: 29.2°C, Salinity: 35.4 PSU"
    },
    {
      id: 2,
      lat: 10.8,
      lng: 85.5,
      title: "Bay of Bengal Float Cluster",
      type: "argo",
      description: "High-density ARGO float network studying river discharge effects",
      data: "Active Floats: 15, Data Quality: High"
    },
    {
      id: 3,
      lat: -2.5,
      lng: 95.0,
      title: "Equatorial Observation Point",
      type: "observation",
      description: "Long-term monitoring of equatorial current systems",
      data: "Current Speed: 0.65 m/s, Direction: 270°"
    },
    {
      id: 4,
      lat: 4.2,
      lng: 73.5,
      title: "Maldives Coral Monitoring",
      type: "biological",
      description: "Coral reef health and bleaching assessment site",
      data: "Coral Cover: 65%, Bleaching: 12%"
    },
    {
      id: 5,
      lat: -12.0,
      lng: 96.8,
      title: "Deep Water Monitoring",
      type: "deep",
      description: "Antarctic intermediate water formation study site",
      data: "Depth: 2000m, Temperature: 3.2°C"
    }
  ],

  summaries: [
    {
      id: 1,
      title: "Indian Ocean Warming Acceleration",
      content: "Analysis of the latest ARGO data reveals that the Indian Ocean has warmed by 0.8°C in surface waters over the past decade, with the most significant warming occurring in the Arabian Sea region. This accelerated warming is 40% faster than the global ocean average.",
      region: "Indian Ocean",
      impact: "High",
      timeframe: "2015-2025"
    },
    {
      id: 2,
      title: "Monsoon Current Strengthening",
      content: "Southwest monsoon currents in the Arabian Sea have increased in intensity by 15% over the last 5 years, potentially affecting regional weather patterns and marine ecosystems. This strengthening correlates with increased precipitation over the Indian subcontinent.",
      region: "Arabian Sea",
      impact: "Medium",
      timeframe: "2020-2025"
    },
    {
      id: 3,
      title: "Salinity Changes in Bay of Bengal",
      content: "The Bay of Bengal continues to show decreasing salinity trends in surface waters due to increased river discharge and changing precipitation patterns. Surface salinity has decreased by 0.3 PSU over the past decade, affecting local marine ecosystems.",
      region: "Bay of Bengal",
      impact: "Medium",
      timeframe: "2015-2025"
    },
    {
      id: 4,
      title: "Deep Water Formation Decline",
      content: "Antarctic Bottom Water formation has decreased by 8% since 2020, potentially slowing global thermohaline circulation. This change could have significant implications for global heat transport and climate regulation mechanisms.",
      region: "Southern Ocean",
      impact: "High",
      timeframe: "2020-2025"
    }
  ]
};