
import React, { useEffect, useRef, useMemo, useState } from 'react';
import landPolygons from '../data/land_polygons_simple.json';
import './Globe3D.css';

const Globe3D = ({ floatData }) => {
  const rotationRef = useRef(0);
  const canvasRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showDataPanel, setShowDataPanel] = useState(false);
  const [selectedFloat, setSelectedFloat] = useState(null);
  const [showFloatDetails, setShowFloatDetails] = useState(false);
  const [hoveredFloat, setHoveredFloat] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Mock ARGO float data
  const defaultFloatData = useMemo(() => [
    { lat: 45.2642, lng: -75.7035, status: 'active', id: 'ARG001', depth: 1500 },
    { lat: 40.7589, lng: -73.9851, status: 'transmitting', id: 'ARG002', depth: 2000 },
    { lat: 34.0522, lng: -118.2437, status: 'active', id: 'ARG003', depth: 1200 },
    { lat: 51.5074, lng: -0.1278, status: 'active', id: 'ARG004', depth: 1800 },
    { lat: 35.6762, lng: 139.6503, status: 'transmitting', id: 'ARG005', depth: 2200 },
    { lat: -33.8688, lng: 151.2093, status: 'active', id: 'ARG006', depth: 1600 },
    { lat: 37.7749, lng: -122.4194, status: 'active', id: 'ARG007', depth: 1400 },
    { lat: 55.7558, lng: 37.6173, status: 'transmitting', id: 'ARG008', depth: 1900 },
    { lat: -22.9068, lng: -43.1729, status: 'active', id: 'ARG009', depth: 1700 },
    { lat: 19.4326, lng: -99.1332, status: 'transmitting', id: 'ARG010', depth: 2100 },
  ], []);

  const currentFloatData = floatData || defaultFloatData;

  // Marine life and ecosystem database for different ocean regions
  const marineEcosystemData = useMemo(() => ({
    'North Atlantic': {
      region: 'North Atlantic Ocean',
      authority: 'NOAA & International Maritime Organization',
      localCommunities: ['Newfoundland Fishermen', 'Inuit Communities', 'Scottish Coastal Communities'],
      marineAnimals: ['Atlantic Cod', 'Humpback Whale', 'Atlantic Mackerel', 'Harbor Seal', 'Lobster', 'Atlantic Salmon'],
      marineSpecies: ['Atlantic Herring', 'Bluefin Tuna', 'Swordfish', 'Sea Scallop', 'Snow Crab'],
      marineHerbs: ['Sea Lettuce', 'Dulse', 'Irish Moss', 'Bladder Wrack', 'Kelp Forests', 'Rockweed'],
      environmentalConditions: {
        avgDepth: '0-4000m',
        temperature: '2-15°C',
        salinity: '34.5-36.5 PSU',
        currents: 'Gulf Stream, Labrador Current'
      },
      economicImportance: 'Major fishing grounds, shipping lanes, oil reserves',
      conservation: 'Marine Protected Areas, fishing quotas, whale watching regulations'
    },
    'North Pacific': {
      region: 'North Pacific Ocean',
      authority: 'Pacific Marine Fisheries Commission & NOAA',
      localCommunities: ['Alaskan Native Tribes', 'Pacific Northwest First Nations', 'Japanese Fishing Communities'],
      marineAnimals: ['Pacific Salmon', 'Orca Whale', 'Sea Otter', 'Steller Sea Lion', 'Pacific Halibut', 'Gray Whale'],
      marineSpecies: ['Pacific Sardine', 'Dungeness Crab', 'Rockfish', 'Albacore Tuna', 'Pacific Cod'],
      marineHerbs: ['Giant Kelp', 'Bull Kelp', 'Sea Palm', 'Wakame', 'Nori', 'Eelgrass'],
      environmentalConditions: {
        avgDepth: '0-6000m',
        temperature: '4-18°C',
        salinity: '32-35 PSU',
        currents: 'Kuroshio Current, California Current'
      },
      economicImportance: 'Salmon industry, kelp harvesting, shipping routes',
      conservation: 'Marine sanctuaries, salmon restoration programs'
    },
    'Tropical Pacific': {
      region: 'Tropical Pacific Ocean',
      authority: 'Pacific Islands Fisheries Science Center',
      localCommunities: ['Polynesian Islanders', 'Micronesian Communities', 'Hawaiian Native Communities'],
      marineAnimals: ['Manta Ray', 'Reef Sharks', 'Green Sea Turtle', 'Dolphin', 'Whale Shark', 'Parrotfish'],
      marineSpecies: ['Tropical Reef Fish', 'Crown-of-Thorns Starfish', 'Giant Clam', 'Sea Cucumber', 'Coral Trout'],
      marineHerbs: ['Sea Grapes', 'Caulerpa', 'Halimeda', 'Turbinaria', 'Coral Polyps', 'Coralline Algae'],
      environmentalConditions: {
        avgDepth: '0-2000m',
        temperature: '24-30°C',
        salinity: '34-36 PSU',
        currents: 'Equatorial Counter Current, Trade Wind Drift'
      },
      economicImportance: 'Tourism, coral reef fisheries, pearl cultivation',
      conservation: 'Coral reef protection, marine parks, turtle nesting sites'
    },
    'Indian Ocean': {
      region: 'Indian Ocean',
      authority: 'Indian Ocean Tuna Commission & Regional Fisheries Bodies',
      localCommunities: ['Maldivian Fishermen', 'Sri Lankan Coastal Communities', 'East African Fishermen'],
      marineAnimals: ['Whale Shark', 'Manta Ray', 'Sperm Whale', 'Dugong', 'Indian Ocean Tuna', 'Spinner Dolphin'],
      marineSpecies: ['Yellowfin Tuna', 'Skipjack Tuna', 'Reef Fish', 'Lobster', 'Prawns'],
      marineHerbs: ['Seagrass Beds', 'Mangrove Systems', 'Red Algae', 'Brown Algae', 'Coralline Algae'],
      environmentalConditions: {
        avgDepth: '0-7000m',
        temperature: '22-28°C',
        salinity: '34-37 PSU',
        currents: 'Monsoon Currents, Agulhas Current'
      },
      economicImportance: 'Tuna fishing, shipping lanes, oil and gas reserves',
      conservation: 'Whale shark protection, dugong sanctuaries'
    },
    'Arctic Ocean': {
      region: 'Arctic Ocean',
      authority: 'Arctic Council & Indigenous Communities Council',
      localCommunities: ['Inuit Peoples', 'Sami Communities', 'Chukchi Peoples', 'Aleut Communities'],
      marineAnimals: ['Polar Bear', 'Narwhal', 'Beluga Whale', 'Walrus', 'Arctic Fox', 'Ringed Seal'],
      marineSpecies: ['Arctic Cod', 'Arctic Char', 'Capelin', 'Polar Cod', 'Ice Fish'],
      marineHerbs: ['Ice Algae', 'Arctic Kelp', 'Phytoplankton Blooms', 'Sea Ice Microorganisms'],
      environmentalConditions: {
        avgDepth: '0-4000m',
        temperature: '-2 to 4°C',
        salinity: '30-35 PSU',
        currents: 'Transpolar Drift Stream, Beaufort Gyre'
      },
      economicImportance: 'Indigenous subsistence, emerging shipping routes',
      conservation: 'Climate change monitoring, polar bear protection'
    },
    'Southern Ocean': {
      region: 'Southern Ocean (Antarctic)',
      authority: 'Commission for Conservation of Antarctic Marine Living Resources',
      localCommunities: ['Research Station Communities', 'Antarctic Scientists', 'International Researchers'],
      marineAnimals: ['Emperor Penguin', 'Leopard Seal', 'Blue Whale', 'Orca', 'Adelie Penguin', 'Weddell Seal'],
      marineSpecies: ['Antarctic Krill', 'Antarctic Toothfish', 'Icefish', 'Antarctic Silverfish'],
      marineHerbs: ['Antarctic Kelp', 'Ice Algae', 'Phytoplankton', 'Diatoms', 'Marine Microalgae'],
      environmentalConditions: {
        avgDepth: '0-5000m',
        temperature: '-2 to 2°C',
        salinity: '34-35 PSU',
        currents: 'Antarctic Circumpolar Current'
      },
      economicImportance: 'Scientific research, krill harvesting (regulated)',
      conservation: 'Antarctic Treaty System, marine protected areas'
    }
  }), []);

  // Function to determine ocean region based on coordinates
  const _getOceanRegion = (lat, lng) => {
    if (lat > 66.5) return 'Arctic Ocean';
    if (lat < -60) return 'Southern Ocean';
    if (lat > 25 && lng > -60 && lng < 20) return 'North Atlantic';
    if (lat > 25 && lng > 100) return 'North Pacific';
    if (lat > 25 && lng < -100) return 'North Pacific';
    if (Math.abs(lat) < 25 && lng > 100) return 'Tropical Pacific';
    if (lng > 20 && lng < 150 && lat > -40 && lat < 30) return 'Indian Ocean';
    return 'Tropical Pacific'; // Default
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let rotation = 0;
    let isDragging = false;
    let isHoveringCanvas = false;
    let rotationSpeed = 0.003;
    let lastInteraction = Date.now();

    // Canvas dimensions and globe settings
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;

    // Utility functions
    const latLngTo3D = (lat, lng, radius) => {
      const phi = (lat * Math.PI) / 180;
      const theta = (lng * Math.PI) / 180;
      return {
        x: radius * Math.cos(phi) * Math.cos(theta),
        y: radius * Math.sin(phi),
        z: radius * Math.cos(phi) * Math.sin(theta)
      };
    };

    const project3DTo2D = (pos3D, rotationY, centerX, centerY) => {
      const rotatedX = pos3D.x * Math.cos(rotationY) + pos3D.z * Math.sin(rotationY);
      const rotatedZ = -pos3D.x * Math.sin(rotationY) + pos3D.z * Math.cos(rotationY);
      const scale = 300 / (300 + rotatedZ);
      return {
        x: centerX + rotatedX * scale,
        y: centerY - pos3D.y * scale,
        scale: scale
      };
    };

    // Canvas setup - Enhanced dimensions for high quality hologram
    const resizeCanvas = () => {
      canvas.width = 600;
      canvas.height = 600;
      canvas.style.width = '500px';
      canvas.style.height = '500px';
    };

    const resetAutoRotation = () => {
      if (Date.now() - lastInteraction > 1000) {
        rotationSpeed = 0.003;
      }
    };

    // Mouse event handlers for 360° rotation
    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.movementX || 0;
        
        // Horizontal rotation (longitude) - smooth 360° rotation
        rotation -= deltaX * 0.005;
        
        // Keep rotation within 0-360 degrees for smooth continuous rotation
        if (rotation > Math.PI * 2) rotation -= Math.PI * 2;
        if (rotation < 0) rotation += Math.PI * 2;
        
        rotationRef.current = rotation;
        rotationSpeed = 0;
        lastInteraction = Date.now();
      }
    };

    const handleMouseDown = () => {
      isDragging = true;
      canvas.style.cursor = 'grabbing';
      rotationSpeed = 0;
      lastInteraction = Date.now();
    };

    const handleMouseUp = () => {
      isDragging = false;
      canvas.style.cursor = isHoveringCanvas ? 'grab' : 'default';
      setTimeout(resetAutoRotation, 2000);
    };

    const handleMouseEnter = () => {
      isHoveringCanvas = true;
      canvas.style.cursor = 'grab';
      rotationSpeed = 0.001;
    };

    const handleMouseLeave = () => {
      isHoveringCanvas = false;
      isDragging = false;
      canvas.style.cursor = 'default';
      setTimeout(resetAutoRotation, 1000);
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      currentFloatData.forEach(float => {
        const pos3D = latLngTo3D(float.lat, float.lng, radius + 5);
        const pos2D = project3DTo2D(pos3D, rotation, centerX, centerY);
        
        const distance = Math.sqrt(
          Math.pow(clickX - pos2D.x, 2) + Math.pow(clickY - pos2D.y, 2)
        );
        
        if (distance < 15 && pos2D.scale > 0.3) {
          console.log(`Clicked on float ${float.id}:`, float);
        }
      });
    };

    // Draw globe - Enhanced for high quality hologram
    const drawGlobe = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 200; // Increased for better proportion with 600px canvas

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      // Draw main globe (hologram style)
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = 'rgba(8, 145, 178, 0.1)';
      ctx.strokeStyle = '#00d4ff';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00d4ff';
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.stroke();

      // Hologram grid lines
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.restore();

      // Draw latitude lines
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      
      for (let lat = -90; lat <= 90; lat += 15) {
        ctx.beginPath();
        for (let lng = -180; lng <= 180; lng += 5) {
          const pos3D = latLngTo3D(lat, lng, radius);
          const pos2D = project3DTo2D(pos3D, rotation, centerX, centerY);
          if (lng === -180) {
            ctx.moveTo(pos2D.x, pos2D.y);
          } else {
            ctx.lineTo(pos2D.x, pos2D.y);
          }
        }
        ctx.stroke();
      }

      // Draw longitude lines
      for (let lng = -180; lng <= 180; lng += 30) {
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 5) {
          const pos3D = latLngTo3D(lat, lng, radius);
          const pos2D = project3DTo2D(pos3D, rotation, centerX, centerY);
          if (lat === -90) {
            ctx.moveTo(pos2D.x, pos2D.y);
          } else {
            ctx.lineTo(pos2D.x, pos2D.y);
          }
        }
        ctx.stroke();
      }

      // Point-in-polygon detection for GeoJSON polygons
      function pointInPolygon(lat, lng, polygon) {
        let inside = false;
        const coords = polygon[0];
        for (let i = 0, j = coords.length - 1; i < coords.length; j = i++) {
          const xi = coords[i][0], yi = coords[i][1];
          const xj = coords[j][0], yj = coords[j][1];
          const intersect = ((yi > lat) !== (yj > lat)) &&
            (lng < (xj - xi) * (lat - yi) / (yj - yi + 0.00001) + xi);
          if (intersect) inside = !inside;
        }
        return inside;
      }

      // Accurate land detection using GeoJSON polygons
      const _isLand = (lat, lng) => {
        for (const feature of landPolygons.features) {
          if (feature.geometry.type === 'Polygon') {
            if (pointInPolygon(lat, lng, feature.geometry.coordinates)) return true;
          }
        }
        return false;
      };

      // Draw continents using GeoJSON polygons
      ctx.save();
      landPolygons.features.forEach(feature => {
        if (feature.geometry.type === 'Polygon') {
          const coords = feature.geometry.coordinates[0];
          ctx.beginPath();
          let first = true;
          coords.forEach(([lng, lat]) => {
            const pos3D = latLngTo3D(lat, lng, radius);
            const pos2D = project3DTo2D(pos3D, rotation, centerX, centerY);
            if (pos2D.scale > 0.1) {
              if (first) {
                ctx.moveTo(pos2D.x, pos2D.y);
                first = false;
              } else {
                ctx.lineTo(pos2D.x, pos2D.y);
              }
            }
          });
          ctx.closePath();
          ctx.fillStyle = 'rgba(34, 139, 34, 0.35)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(34, 139, 34, 0.7)';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Label continent at centroid
          let sumLat = 0, sumLng = 0;
          coords.forEach(([lng, lat]) => {
            sumLat += lat;
            sumLng += lng;
          });
          const centroidLat = sumLat / coords.length;
          const centroidLng = sumLng / coords.length;
          const pos3D = latLngTo3D(centroidLat, centroidLng, radius + 10);
          const pos2D = project3DTo2D(pos3D, rotation, centerX, centerY);
          if (pos2D.scale > 0.1) {
            ctx.save();
            ctx.font = `${16 * pos2D.scale}px 'Orbitron', sans-serif`;
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 4;
            ctx.fillText(feature.properties.name, pos2D.x, pos2D.y);
            ctx.restore();
          }
        }
      });
      ctx.restore();

      // Draw ARGO floats
      currentFloatData.forEach(float => {
        const pos3D = latLngTo3D(float.lat, float.lng, radius + 5);
        const pos2D = project3DTo2D(pos3D, rotation, centerX, centerY);
        
        if (pos2D.scale > 0.3) {
          const size = 3 * pos2D.scale;
          
          // Float marker with glow effect
          ctx.beginPath();
          ctx.arc(pos2D.x, pos2D.y, size, 0, 2 * Math.PI);
          
          // Glow effect
          const gradient = ctx.createRadialGradient(pos2D.x, pos2D.y, 0, pos2D.x, pos2D.y, size * 2);
          gradient.addColorStop(0, float.status === 'active' ? '#00d4ff' : '#0ea5e9');
          gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // Core marker
          ctx.beginPath();
          ctx.arc(pos2D.x, pos2D.y, size * 0.6, 0, 2 * Math.PI);
          ctx.fillStyle = float.status === 'active' ? '#00d4ff' : '#0ea5e9';
          ctx.fill();
          
          // Subtle pulse for active floats when close
          if (float.status === 'active' && pos2D.scale > 0.7) {
            ctx.beginPath();
            ctx.arc(pos2D.x, pos2D.y, size * 1.8, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Show only float code/ID - simple text
          ctx.save();
          ctx.font = '10px Arial';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.fillText(float.id, pos2D.x, pos2D.y - size - 8);
          ctx.restore();
        }
      });

      // Draw ocean region labels
      const oceanRegions = [
        { name: 'Indian', lat: 0, lng: 80, scale: 1 },
        { name: 'Pacific', lat: 0, lng: -160, scale: 1 },
        { name: 'Atlantic', lat: 0, lng: -30, scale: 1 },
        { name: 'Arctic', lat: 75, lng: 0, scale: 0.6 },
        { name: 'Southern', lat: -60, lng: 0, scale: 0.7 }
      ];
      
      oceanRegions.forEach(region => {
        const pos3D = latLngTo3D(region.lat, region.lng, radius);
        const pos2D = project3DTo2D(pos3D, rotation, centerX, centerY);
        
        if (pos2D.scale > 0.4) {
          ctx.save();
          ctx.font = `${12 * pos2D.scale * region.scale}px 'Orbitron', sans-serif`;
          ctx.fillStyle = `rgba(0, 212, 255, ${0.3 * pos2D.scale})`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          ctx.shadowBlur = 3;
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 1;
          ctx.fillText(region.name, pos2D.x, pos2D.y);
          ctx.restore();
        }
      });

      ctx.restore();
    };

    // Animation loop with 360° rotation support
    const animate = () => {
      rotation -= rotationSpeed;
      
      // Keep rotation in 0-360° range for smooth continuous rotation
      if (rotation > Math.PI * 2) rotation -= Math.PI * 2;
      if (rotation < 0) rotation += Math.PI * 2;
      
      rotationRef.current = rotation;
      drawGlobe();
      animationId = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [currentFloatData]);

  // Handle canvas clicks to show location data or float details
  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert to canvas coordinates (accounting for scaling)
    const scaleX = canvas.width / canvas.offsetWidth;
    const scaleY = canvas.height / canvas.offsetHeight;
    const canvasX = x * scaleX;
    const canvasY = y * scaleY;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 200;
    
    // First check if we clicked on a float dot
    let clickedFloat = null;
    const latLngTo3D = (lat, lng, r) => ({
      x: r * Math.cos(lat * Math.PI / 180) * Math.cos(lng * Math.PI / 180),
      y: r * Math.sin(lat * Math.PI / 180),
      z: -r * Math.cos(lat * Math.PI / 180) * Math.sin(lng * Math.PI / 180)
    });
    
    const project3DTo2D = (pos3D, rotationY, centerX, centerY) => {
      const cos = Math.cos(rotationY);
      const sin = Math.sin(rotationY);
      const x = pos3D.x * cos - pos3D.z * sin;
      const z = pos3D.x * sin + pos3D.z * cos;
      const scale = Math.max(0, (z + radius * 2) / (radius * 3));
      
      return {
        x: centerX + x * scale,
        y: centerY - pos3D.y * scale,
        scale: scale
      };
    };
    
    // Get current rotation from the ref
    const currentRotation = rotationRef.current;
    
    currentFloatData.forEach(float => {
      const pos3D = latLngTo3D(float.lat, float.lng, radius + 5);
      const pos2D = project3DTo2D(pos3D, currentRotation, centerX, centerY);
      
      if (pos2D.scale > 0.3) {
        const floatSize = 3 * pos2D.scale;
        const distanceToFloat = Math.sqrt(
          Math.pow(canvasX - pos2D.x, 2) + Math.pow(canvasY - pos2D.y, 2)
        );
        
        if (distanceToFloat <= floatSize * 2) {
          clickedFloat = float;
          return;
        }
      }
    });
    
    if (clickedFloat) {
      // Show float details
      setSelectedFloat(clickedFloat);
      setShowFloatDetails(true);
      setShowDataPanel(false); // Hide marine data panel
    } else {
      // Check if we clicked within the globe for marine ecosystem data
      const dx = canvasX - centerX;
      const dy = canvasY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= radius) {
        // Calculate approximate latitude and longitude
        const lat = ((centerY - canvasY) / radius) * 90;
        const lng = ((canvasX - centerX) / radius) * 180;
        
        // Find closest region by lat/lng
        let closestRegion = null;
        let minDist = Infinity;
        Object.entries(marineEcosystemData).forEach(([key, val]) => {
          // Use region centroid for matching
          let regionLat = 0, regionLng = 0;
          if (val.regionCentroid) {
            regionLat = val.regionCentroid.lat;
            regionLng = val.regionCentroid.lng;
          } else {
            // Fallback: use some typical values
            if (key === 'North Atlantic') { regionLat = 40; regionLng = -30; }
            if (key === 'North Pacific') { regionLat = 40; regionLng = -160; }
            if (key === 'Tropical Pacific') { regionLat = 0; regionLng = -160; }
            if (key === 'Indian Ocean') { regionLat = 0; regionLng = 80; }
            if (key === 'Arctic Ocean') { regionLat = 75; regionLng = 0; }
            if (key === 'Southern Ocean') { regionLat = -60; regionLng = 0; }
          }
          const dist = Math.sqrt(Math.pow(lat - regionLat, 2) + Math.pow(lng - regionLng, 2));
          if (dist < minDist) {
            minDist = dist;
            closestRegion = key;
          }
        });
        const locationData = {
          coordinates: { lat: lat.toFixed(2), lng: lng.toFixed(2) },
          region: closestRegion,
          data: marineEcosystemData[closestRegion]
        };
        setSelectedLocation(locationData);
        setShowDataPanel(true);
        setShowFloatDetails(false); // Hide float details panel
      }
    }
  };

  return (
    <div className={`globe-3d-container ${showDataPanel ? 'with-data-panel' : ''}`}>
      <canvas 
        ref={canvasRef} 
        className="globe-canvas"
        onClick={handleCanvasClick}
        onMouseMove={(e) => {
          const rect = canvasRef.current.getBoundingClientRect();
          setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          
          // Check if hovering over a float
          const canvas = canvasRef.current;
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const scaleX = canvas.width / canvas.offsetWidth;
          const scaleY = canvas.height / canvas.offsetHeight;
          const canvasX = x * scaleX;
          const canvasY = y * scaleY;
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const radius = 200;
          
          let foundFloat = null;
          currentFloatData.forEach(float => {
            const pos3D = {
              x: radius * Math.cos(float.lat * Math.PI / 180) * Math.cos(float.lng * Math.PI / 180),
              y: radius * Math.sin(float.lat * Math.PI / 180),
              z: -radius * Math.cos(float.lat * Math.PI / 180) * Math.sin(float.lng * Math.PI / 180)
            };
            
            const cos = Math.cos(rotationRef.current);
            const sin = Math.sin(rotationRef.current);
            const rotatedX = pos3D.x * cos - pos3D.z * sin;
            const rotatedZ = pos3D.x * sin + pos3D.z * cos;
            const scale = Math.max(0, (rotatedZ + radius * 2) / (radius * 3));
            
            const pos2D = {
              x: centerX + rotatedX * scale,
              y: centerY - pos3D.y * scale
            };
            
            if (scale > 0.3) {
              const floatSize = 3 * scale;
              const distance = Math.sqrt(
                Math.pow(canvasX - pos2D.x, 2) + Math.pow(canvasY - pos2D.y, 2)
              );
              
              if (distance <= floatSize * 2) {
                foundFloat = float;
              }
            }
          });
          
          setHoveredFloat(foundFloat);
        }}
        style={{ cursor: hoveredFloat ? 'pointer' : 'grab' }}
      />
      
      {showDataPanel && selectedLocation && (
        <div className="data-panel">
          <div className="data-panel-header">
            <h3>🌊 Marine Ecosystem Data</h3>
            <button 
              className="close-btn"
              onClick={() => setShowDataPanel(false)}
            >
              ✕
            </button>
          </div>
          
          <div className="data-panel-content">
            <div className="location-info">
              <h4>📍 Location Details</h4>
              <p><strong>Coordinates:</strong> {selectedLocation.coordinates.lat}°, {selectedLocation.coordinates.lng}°</p>
              <p><strong>Region:</strong> {selectedLocation.data.region}</p>
              <p><strong>Authority:</strong> {selectedLocation.data.authority}</p>
            </div>
            
            <div className="marine-life-section">
              <h4>🐋 Marine Animals</h4>
              <div className="species-grid">
                {selectedLocation.data.marineAnimals?.map((animal, index) => (
                  <span key={index} className="species-tag">{animal}</span>
                ))}
              </div>
            </div>
            
            <div className="marine-life-section">
              <h4>🐟 Marine Species</h4>
              <div className="species-grid">
                {selectedLocation.data.marineSpecies?.map((species, index) => (
                  <span key={index} className="species-tag">{species}</span>
                ))}
              </div>
            </div>
            
            <div className="marine-life-section">
              <h4>🌿 Marine Herbs & Plants</h4>
              <div className="species-grid">
                {selectedLocation.data.marineHerbs?.map((herb, index) => (
                  <span key={index} className="species-tag herb-tag">{herb}</span>
                ))}
              </div>
            </div>
            
            <div className="environmental-data">
              <h4>🌊 Environmental Conditions</h4>
              <div className="env-grid">
                <div className="env-item">
                  <span className="env-label">Depth:</span>
                  <span>{selectedLocation.data.environmentalConditions?.avgDepth}</span>
                </div>
                <div className="env-item">
                  <span className="env-label">Temperature:</span>
                  <span>{selectedLocation.data.environmentalConditions?.temperature}</span>
                </div>
                <div className="env-item">
                  <span className="env-label">Salinity:</span>
                  <span>{selectedLocation.data.environmentalConditions?.salinity}</span>
                </div>
                <div className="env-item">
                  <span className="env-label">Currents:</span>
                  <span>{selectedLocation.data.environmentalConditions?.currents}</span>
                </div>
              </div>
            </div>
            
            <div className="community-section">
              <h4>👥 Local Communities</h4>
              <div className="community-list">
                {selectedLocation.data.localCommunities?.map((community, index) => (
                  <span key={index} className="community-tag">{community}</span>
                ))}
              </div>
            </div>
            
            <div className="conservation-info">
              <h4>🛡️ Conservation & Economy</h4>
              <p><strong>Economic Importance:</strong> {selectedLocation.data.economicImportance}</p>
              <p><strong>Conservation Efforts:</strong> {selectedLocation.data.conservation}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Float Details Panel */}
      {showFloatDetails && selectedFloat && (
        <div className="float-details-popup">
          <div className="popup-header">
            <h3>🎯 ARGO Float Details</h3>
            <button 
              className="popup-close"
              onClick={() => setShowFloatDetails(false)}
            >
              ✕
            </button>
          </div>
          
          <div className="float-info">
            <div className="float-main-info">
              <div className="float-id-display">{selectedFloat.id}</div>
              <div className={`float-status-badge ${selectedFloat.status}`}>
                {selectedFloat.status.toUpperCase()}
              </div>
            </div>
            
            <div className="float-coordinates">
              <h4>📍 Location</h4>
              <p><strong>Latitude:</strong> {selectedFloat.lat.toFixed(4)}°</p>
              <p><strong>Longitude:</strong> {selectedFloat.lng.toFixed(4)}°</p>
            </div>
            
            <div className="float-measurements">
              <h4>📊 Measurements</h4>
              <div className="measurement-grid">
                <div className="measurement-item">
                  <span className="measurement-label">Depth:</span>
                  <span className="measurement-value">{selectedFloat.depth}m</span>
                </div>
                <div className="measurement-item">
                  <span className="measurement-label">Temperature:</span>
                  <span className="measurement-value">{(Math.random() * 20 + 5).toFixed(1)}°C</span>
                </div>
                <div className="measurement-item">
                  <span className="measurement-label">Salinity:</span>
                  <span className="measurement-value">{(Math.random() * 2 + 34).toFixed(1)} PSU</span>
                </div>
                <div className="measurement-item">
                  <span className="measurement-label">Pressure:</span>
                  <span className="measurement-value">{Math.round(selectedFloat.depth * 0.1)} dbar</span>
                </div>
              </div>
            </div>
            
            <div className="float-mission">
              <h4>🚀 Mission Info</h4>
              <p><strong>Deployment:</strong> {new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              <p><strong>Cycles:</strong> {Math.floor(Math.random() * 200 + 50)}</p>
              <p><strong>Data Quality:</strong> <span className="quality-good">Good</span></p>
            </div>
          </div>
        </div>
      )}
      
      {/* Float Tooltip */}
      {hoveredFloat && (
        <div 
          className="float-tooltip"
          style={{
            position: 'absolute',
            left: mousePos.x + 15,
            top: mousePos.y - 10,
            pointerEvents: 'none',
            zIndex: 1000
          }}
        >
          <div className="tooltip-content">
            <div className="tooltip-id">{hoveredFloat.id}</div>
            <div className="tooltip-coords">
              {hoveredFloat.lat.toFixed(2)}°, {hoveredFloat.lng.toFixed(2)}°
            </div>
            <div className={`tooltip-status ${hoveredFloat.status}`}>
              {hoveredFloat.status}
            </div>
          </div>
        </div>
      )}
      
      {/* Globe Controls - Fixed to bottom */}
      <div className="globe-controls">
        <div className="control-info">
          <div className="legend">
            <div className="legend-item">
              <div className="legend-dot active"></div>
              <span>Active ({currentFloatData.filter(f => f.status === 'active').length})</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot transmitting"></div>
              <span>Transmitting ({currentFloatData.filter(f => f.status === 'transmitting').length})</span>
            </div>
          </div>
        </div>
        
        <div className="interaction-hint">
          <span className="hint-text">🖱️ Drag to rotate • 🔍 Click ocean for marine data</span>
        </div>
      </div>
    </div>
  );
};

export default Globe3D;