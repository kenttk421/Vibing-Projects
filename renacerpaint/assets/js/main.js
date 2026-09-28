/**
 * Renacer Painting - Main Interactive Logic
 * Handles:
 * 1. 3-Style Theme Switching (Modern Minimalist, Brand Logo Craft, South Bay Coastal Estate)
 * 2. Instagram Connected Gallery (Filtering, Likes, Modal Lightbox)
 * 3. Interactive South Bay Estimate Calculator
 * 4. Before/After Split Comparison Slider
 * 5. Contact Form Simulation & Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initInstagramGallery();
  initServiceMap();
  initCoverageChecker();
  initBeforeAfterSlider();
  initContactForm();
  initMobileMenu();
});

/* ==========================================================================
   1. THEME / STYLE SWITCHER
   ========================================================================== */
const THEMES = {
  modern: {
    id: 'modern',
    name: 'Modern Minimalist',
    subtitle: 'Architectural Luxury & Crisp Contrast',
    badge: 'Style 1: Modern Minimalist',
    heroTag: 'Architectural Precision & Luxury Living',
    pillText: '1. Modern'
  },
  brand: {
    id: 'brand',
    name: 'Renacer Brand Craft',
    subtitle: 'Direct Match to the Colorful Logo',
    badge: 'Style 2: Renacer Brand Craft',
    heroTag: 'Artisan Passion • 100% Brand Match',
    pillText: '2. Logo Match'
  },
  coastal: {
    id: 'coastal',
    name: 'South Bay Coastal Estate',
    subtitle: 'California Coastal Luxury & Fine Stains',
    badge: 'Style 3: South Bay Coastal Estate',
    heroTag: 'South Bay Coastal Elegance',
    pillText: '3. Coastal Estate'
  }
};

function initThemeSwitcher() {
  const savedTheme = localStorage.getItem('renacer_theme') || 'brand'; // default to brand or modern
  setTheme(savedTheme, false);

  // Top header button & dropdown
  const toggleBtn = document.getElementById('styleSwitchBtn');
  const dropdown = document.getElementById('styleDropdown');

  if (toggleBtn && dropdown) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  // Dropdown option buttons
  const optionBtns = document.querySelectorAll('.style-option-btn');
  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const themeKey = btn.getAttribute('data-theme-choice');
      setTheme(themeKey, true);
      if (dropdown) dropdown.classList.remove('open');
    });
  });

  // Top banner pill buttons
  const bannerPills = document.querySelectorAll('.style-pill-btn');
  bannerPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const themeKey = pill.getAttribute('data-theme-choice');
      setTheme(themeKey, true);
    });
  });
}

function setTheme(themeKey, showToast = true) {
  if (!THEMES[themeKey]) themeKey = 'brand';

  document.documentElement.setAttribute('data-theme', themeKey);
  localStorage.setItem('renacer_theme', themeKey);

  // Update active state on buttons
  document.querySelectorAll('.style-pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-theme-choice') === themeKey);
  });

  document.querySelectorAll('.style-option-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-theme-choice') === themeKey);
  });

  // Update text label in header button
  const currentStyleLabel = document.getElementById('currentStyleName');
  if (currentStyleLabel) {
    currentStyleLabel.textContent = THEMES[themeKey].name;
  }

  // Update style notification banner badge
  const bannerBadge = document.getElementById('bannerActiveStyle');
  if (bannerBadge) {
    bannerBadge.textContent = THEMES[themeKey].badge;
  }

  // Update hero subtag
  const heroBadge = document.getElementById('heroBadgeText');
  if (heroBadge) {
    heroBadge.textContent = THEMES[themeKey].heroTag;
  }

  if (showToast) {
    showToastNotice(`Switched design to: ${THEMES[themeKey].name}`);
  }

  // Update Google Maps corridor polygon colors according to active theme
  updateMapTheme();
}

/* ==========================================================================
   2. INSTAGRAM GALLERY ENGINE
   ========================================================================== */
const INSTAGRAM_POSTS = [
  {
    id: 'post-1',
    category: 'stain',
    image: 'assets/images/stain-lacquer.jpg',
    categoryName: 'Stains & Lacquers',
    location: 'Manhattan Beach, CA',
    caption: 'Custom walnut kitchen cabinetry finished with hand-rubbed deep walnut stain and 3 coats of ultra-durable satin lacquer. Notice the zero-streak mirror reflection! 🪵✨ #RenacerPainting #WoodFinishing #SouthBayCabinets #LacquerFinishing #ManhattanBeachHome',
    likes: 384,
    comments: 29,
    date: '2 days ago'
  },
  {
    id: 'post-2',
    category: 'exterior',
    image: 'assets/images/hero-exterior.jpg',
    categoryName: 'Exterior Painting',
    location: 'Hermosa Beach, CA',
    caption: 'Full coastal exterior transformation in Hermosa Beach! Complete weatherproofing against salt air, elastomeric masonry sealants, and premium Sherwin-Williams Emerald exterior finish. 🌊🏡 #CoastalExterior #HermosaBeach #SouthBayPainter #HousePainting #CurbAppeal',
    likes: 512,
    comments: 42,
    date: '4 days ago'
  },
  {
    id: 'post-3',
    category: 'interior',
    image: 'assets/images/kitchen-cabinets.jpg',
    categoryName: 'Cabinet Refinishing',
    location: 'Torrance, CA (Hollywood Riviera)',
    caption: 'Breathtaking kitchen cabinet spray refinishing in custom Pacific Navy satin lacquer with champagne brass hardware. Factory-smooth finish without replacing the cabinets! 🎨👌 #CabinetRepaint #RenacerPainting #TorranceCA #KitchenMakeover #NavyCabinets',
    likes: 467,
    comments: 38,
    date: '1 week ago'
  },
  {
    id: 'post-4',
    category: 'interior',
    image: 'assets/images/hero-interior.jpg',
    categoryName: 'Interior Painting',
    location: 'Palos Verdes Estates, CA',
    caption: 'Modern luxury interior repaint with seamless level 5 wall prep, alabaster white walls, and sharp high-contrast charcoal window trim. Crisp, clean lines that highlight California sunlight. ☀️🛋️ #InteriorPainting #PalosVerdesHomes #LuxuryInteriors #RenacerPaint #CleanLines',
    likes: 620,
    comments: 53,
    date: '1 week ago'
  },
  {
    id: 'post-5',
    category: 'stain',
    image: 'assets/images/deck-stain.jpg',
    categoryName: 'Deck & Pergola Stains',
    location: 'Redondo Beach, CA',
    caption: 'Oceanfront redwood deck & pergola restoration! Stripped old weathered gray wood, conditioned, and sealed with premium UV-blocking marine teak stain. Ready for coastal sunsets! 🌅🥂 #DeckStaining #RedondoBeach #OutdoorLiving #MarineGrade #RenacerPainting',
    likes: 418,
    comments: 31,
    date: '2 weeks ago'
  },
  {
    id: 'post-6',
    category: 'construction',
    image: 'assets/images/construction.jpg',
    categoryName: 'General Construction',
    location: 'Rolling Hills, CA',
    caption: 'General construction and finish carpentry: custom exposed beam ceiling installation, floor-to-ceiling wainscoting, and flawless drywall finishing. The complete package from framing to final topcoat. 🔨📐 #GeneralConstruction #Carpentry #SouthBayContractor #Wainscoting #RenacerCraft',
    likes: 345,
    comments: 24,
    date: '3 weeks ago'
  },
  {
    id: 'post-7',
    category: 'exterior',
    image: 'assets/images/spanish-exterior.jpg',
    categoryName: 'Stucco & Exterior',
    location: 'Palos Verdes, CA',
    caption: 'Classic Spanish revival exterior restoration in Palos Verdes. Stucco crack repair, breathable elastomeric coating, and dark iron trim detailing. Preserving South Bay architectural heritage. 🏰🌴 #SpanishRevival #PalosVerdes #StuccoPainting #ExteriorRestoration #RenacerPainting',
    likes: 589,
    comments: 47,
    date: '3 weeks ago'
  },
  {
    id: 'post-8',
    category: 'stain',
    image: 'assets/images/staircase-lacquer.jpg',
    categoryName: 'Staircase & Fine Trim',
    location: 'El Segundo, CA',
    caption: 'Grand staircase transformation: dark espresso stained oak treads with high-wear polyurethane lacquer and semi-gloss crisp white risers and wainscoting. Perfection down to every spindle! 🪜✨ #StaircaseRefinishing #FineWoodworking #SouthBayCraftsman #ElSegundo #RenacerPainting',
    likes: 492,
    comments: 36,
    date: '1 month ago'
  }
];

function initInstagramGallery() {
  const gridContainer = document.getElementById('instagramGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!gridContainer) return;

  function renderPosts(categoryFilter = 'all') {
    gridContainer.innerHTML = '';
    const filtered = categoryFilter === 'all'
      ? INSTAGRAM_POSTS
      : INSTAGRAM_POSTS.filter(p => p.category === categoryFilter);

    filtered.forEach(post => {
      const card = document.createElement('div');
      card.className = 'ig-post-card';
      card.setAttribute('data-id', post.id);

      card.innerHTML = `
        <img src="${post.image}" alt="${post.categoryName}" class="ig-post-img" loading="lazy">
        <div class="ig-post-overlay">
          <div class="ig-overlay-top">
            <span class="ig-category-pill">${post.categoryName}</span>
            <div class="ig-icon-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
          </div>
          <p class="ig-overlay-caption">${post.caption}</p>
          <div class="ig-overlay-footer">
            <div class="ig-metrics">
              <span class="ig-metric-item">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                ${post.likes}
              </span>
              <span class="ig-metric-item">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/></svg>
                ${post.comments}
              </span>
            </div>
            <span class="ig-post-date">${post.date}</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openInstagramModal(post));
      gridContainer.appendChild(card);
    });
  }

  renderPosts('all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderPosts(cat);
    });
  });
}

function openInstagramModal(post) {
  const modal = document.getElementById('instagramModal');
  if (!modal) return;

  document.getElementById('modalImage').src = post.image;
  document.getElementById('modalCategory').textContent = post.categoryName;
  document.getElementById('modalLocation').textContent = post.location;
  document.getElementById('modalCaption').textContent = post.caption;
  document.getElementById('modalLikes').textContent = `${post.likes} likes`;
  document.getElementById('modalDate').textContent = post.date;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('modalCloseBtn');
  closeBtn.onclick = closeInstagramModal;

  modal.onclick = (e) => {
    if (e.target === modal) closeInstagramModal();
  };

  document.onkeydown = (e) => {
    if (e.key === 'Escape') closeInstagramModal();
  };
}

function closeInstagramModal() {
  const modal = document.getElementById('instagramModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   3. GOOGLE MAPS SERVICE CORRIDOR (LA CITY TO IRVINE: BEACH TO MOUNTAINS)
   ========================================================================== */
let leafletMap = null;
let corridorPolygon = null;
let googleRoadmapLayer = null;
let googleSatelliteLayer = null;
let isSatellite = false;
let isHighlightVisible = true;

// Exact Geographic Perimeter: LA City to Irvine, bounded by the Pacific beaches and mountain foothills
const CORRIDOR_COORDS = [
  // --- Northwest: Santa Monica & Westside Coastline ---
  [34.020, -118.510], // Santa Monica / Pacific Palisades
  [34.045, -118.490], // Brentwood
  [34.075, -118.430], // Westwood / UCLA / Sunset Blvd
  [34.085, -118.390], // Beverly Hills (base of Santa Monica Mtns)
  [34.098, -118.330], // West Hollywood / Hollywood base
  [34.112, -118.280], // Los Feliz / Griffith Park southern foothills
  [34.075, -118.235], // Elysian Park / Downtown Los Angeles (DTLA)
  
  // --- Inland Mountain & Foothill Boundary (DTLA down to Irvine) ---
  [34.040, -118.150], // East LA / Monterey Park hills
  [34.015, -118.080], // Montebello / Whittier Narrows
  [33.985, -118.010], // Whittier / Turnbull Canyon (Puente Hills base)
  [33.945, -117.940], // La Habra Heights / Coyote Hills
  [33.915, -117.870], // Brea / Carbon Canyon foothills
  [33.875, -117.780], // Yorba Linda / Anaheim Hills
  [33.820, -117.765], // Orange / Villa Park foothills
  [33.770, -117.755], // Santiago Hills / Peters Canyon (Tustin foothills)
  [33.715, -117.720], // East Irvine / Limestone Canyon / Portola Springs
  [33.670, -117.740], // Southeast Irvine / Great Park / Lake Forest
  [33.635, -117.775], // South Irvine / Quail Hill / Laguna Coast Wilderness
  [33.615, -117.820], // Irvine Spectrum / Shady Canyon
  
  // --- Southeast Coastline Meeting Point ---
  [33.565, -117.840], // Crystal Cove / Newport Coast
  
  // --- Pacific Ocean Coastline (The Beach - South to North) ---
  [33.595, -117.885], // Corona del Mar
  [33.605, -117.925], // Newport Beach / Balboa Peninsula
  [33.630, -117.960], // Santa Ana River mouth
  [33.655, -118.005], // Huntington Beach Pier
  [33.705, -118.065], // Bolsa Chica State Beach
  [33.740, -118.105], // Seal Beach
  [33.755, -118.150], // Long Beach / Belmont Shore
  [33.745, -118.215], // Long Beach Harbor
  [33.725, -118.280], // San Pedro / Port of Los Angeles
  [33.708, -118.295], // Point Fermin (Southern tip of Palos Verdes Peninsula)
  [33.740, -118.410], // Rancho Palos Verdes / Point Vicente
  [33.805, -118.395], // Palos Verdes Estates / Malaga Cove
  [33.840, -118.392], // Redondo Beach (Esplanade)
  [33.862, -118.400], // Hermosa Beach
  [33.885, -118.415], // Manhattan Beach Pier
  [33.920, -118.428], // El Segundo Beach
  [33.960, -118.455], // Playa del Rey / Marina del Rey
  [33.985, -118.475], // Venice Beach Pier
  [34.010, -118.498], // Santa Monica Pier
  [34.020, -118.510]  // Closing loop at Pacific Palisades
];

function getThemeColors() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'brand';
  if (currentTheme === 'modern') {
    return {
      fill: '#2563eb',
      fillOpacity: 0.22,
      stroke: '#38bdf8',
      weight: 2.5
    };
  } else if (currentTheme === 'coastal') {
    return {
      fill: '#c29b38',
      fillOpacity: 0.22,
      stroke: '#c29b38',
      weight: 2.5
    };
  } else {
    // Brand (matches Renacer logo colors)
    return {
      fill: '#1e88e5',
      fillOpacity: 0.22,
      stroke: '#f59e0b',
      weight: 2.5
    };
  }
}

function updateMapTheme() {
  if (corridorPolygon) {
    const colors = getThemeColors();
    corridorPolygon.setStyle({
      color: colors.stroke,
      fillColor: colors.fill,
      fillOpacity: colors.fillOpacity,
      weight: colors.weight
    });
  }
}

function initServiceMap() {
  const mapContainer = document.getElementById('serviceMap');
  if (!mapContainer || typeof L === 'undefined') return;

  // Initialize Leaflet Map centered between LA and Irvine
  leafletMap = L.map('serviceMap', {
    center: [33.82, -118.15],
    zoom: 10,
    minZoom: 9,
    maxZoom: 17,
    scrollWheelZoom: false, // Prevents accidental page scrolling hijacking
    zoomControl: true
  });

  // Google Maps Roadmap Layer
  googleRoadmapLayer = L.tileLayer('https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en', {
    maxZoom: 20,
    subdomains: ['0', '1', '2', '3'],
    attribution: '&copy; Google Maps'
  });

  // Google Maps Hybrid Satellite Layer (satellite + road labels)
  googleSatelliteLayer = L.tileLayer('https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&hl=en', {
    maxZoom: 20,
    subdomains: ['0', '1', '2', '3'],
    attribution: '&copy; Google Maps Satellite'
  });

  // Add default roadmap layer
  googleRoadmapLayer.addTo(leafletMap);

  // Add LA to Irvine Corridor Polygon Highlight
  const themeColors = getThemeColors();
  corridorPolygon = L.polygon(CORRIDOR_COORDS, {
    color: themeColors.stroke,
    fillColor: themeColors.fill,
    fillOpacity: themeColors.fillOpacity,
    weight: themeColors.weight,
    dashArray: '6, 4',
    className: 'corridor-highlight-polygon'
  }).addTo(leafletMap);

  corridorPolygon.bindPopup(`
    <div class="map-popup-card">
      <strong>★ Renacer Painting Service Area</strong>
      <p>Continuous daily coverage between the Pacific coastline and the inland mountain foothills. Zero travel surcharges everywhere inside.</p>
      <a href="tel:3104189598" class="popup-cta">
        <span>Call (310) 418-9598 for Walkthrough</span>
        <span>→</span>
      </a>
    </div>
  `);

  // Smoothly fit bounds to encompass the entire highlighted polygon
  leafletMap.fitBounds(corridorPolygon.getBounds(), {
    padding: [25, 25]
  });

  // Map Controls: Toggle Roadmap / Satellite
  const toggleMapTypeBtn = document.getElementById('toggleMapTypeBtn');
  const mapTypeText = document.getElementById('mapTypeText');

  if (toggleMapTypeBtn) {
    toggleMapTypeBtn.addEventListener('click', () => {
      isSatellite = !isSatellite;
      if (isSatellite) {
        leafletMap.removeLayer(googleRoadmapLayer);
        googleSatelliteLayer.addTo(leafletMap);
        toggleMapTypeBtn.classList.add('active');
        if (mapTypeText) mapTypeText.textContent = 'Roadmap View';
      } else {
        leafletMap.removeLayer(googleSatelliteLayer);
        googleRoadmapLayer.addTo(leafletMap);
        toggleMapTypeBtn.classList.remove('active');
        if (mapTypeText) mapTypeText.textContent = 'Satellite View';
      }
    });
  }

  // Map Controls: Toggle Highlight ON / OFF
  const toggleHighlightBtn = document.getElementById('toggleHighlightBtn');
  const toggleHighlightText = document.getElementById('toggleHighlightText');

  if (toggleHighlightBtn) {
    toggleHighlightBtn.addEventListener('click', () => {
      isHighlightVisible = !isHighlightVisible;
      if (isHighlightVisible) {
        corridorPolygon.addTo(leafletMap);
        toggleHighlightBtn.classList.add('active');
        if (toggleHighlightText) toggleHighlightText.textContent = 'Highlight: ON';
      } else {
        leafletMap.removeLayer(corridorPolygon);
        toggleHighlightBtn.classList.remove('active');
        if (toggleHighlightText) toggleHighlightText.textContent = 'Highlight: OFF';
      }
    });
  }
}

/* ==========================================================================
   4. LA-TO-IRVINE NEIGHBORHOOD COVERAGE CHECKER
   ========================================================================== */
function initCoverageChecker() {
  const input = document.getElementById('coverageInput');
  const btn = document.getElementById('coverageCheckBtn');
  const result = document.getElementById('coverageResult');

  if (!input || !btn || !result) return;

  const CORRIDOR_CITIES = [
    // South Bay
    'torrance', 'manhattan beach', 'manhattan', 'hermosa beach', 'hermosa', 'redondo beach', 'redondo',
    'palos verdes', 'palos verdes estates', 'rancho palos verdes', 'rolling hills', 'rolling hills estates',
    'el segundo', 'san pedro', 'hawthorne', 'lawndale', 'gardena', 'lomita', 'carson', 'hollywood riviera',
    // Los Angeles / Westside
    'los angeles', 'la', 'dtla', 'downtown la', 'santa monica', 'venice', 'marina del rey', 'playa del rey',
    'culver city', 'beverly hills', 'westwood', 'brentwood', 'west hollywood', 'hollywood', 'century city', 'inglewood',
    // Gateway Cities & Long Beach
    'long beach', 'belmont shore', 'signal hill', 'lakewood', 'cerritos', 'norwalk', 'downey', 'bellflower', 'paramount', 'whittier',
    // Orange County Coastal & Inland
    'seal beach', 'sunset beach', 'huntington beach', 'hb', 'fountain valley', 'costa mesa', 'newport beach', 'newport coast', 'balboa', 'corona del mar',
    'westminster', 'garden grove', 'anaheim', 'fullerton', 'orange', 'santa ana', 'tustin',
    // Irvine Corridor
    'irvine', 'woodbridge', 'turtle rock', 'portola springs', 'northwood', 'quail hill', 'great park', 'shady canyon', 'lake forest'
  ];

  const CORRIDOR_ZIP_PREFIXES = [
    '900', // Central LA / Downtown / Hollywood
    '902', // South Bay, Beverly Hills, Culver City, Inglewood
    '903', // Inglewood
    '904', // Santa Monica
    '905', // Torrance
    '906', // Whittier, La Mirada, Buena Park
    '907', // San Pedro, Lomita, Long Beach
    '908', // Long Beach
    '926', // Orange County Coast, Irvine, Newport, Huntington, Costa Mesa
    '927', // Santa Ana, Tustin
    '928'  // Anaheim, Orange, Fullerton, Garden Grove
  ];

  function check() {
    const val = input.value.trim().toLowerCase();
    if (!val) {
      result.className = 'coverage-result notice';
      result.textContent = 'Please enter a city name or zip code in the LA to Irvine corridor.';
      return;
    }

    // Check by 3-digit zip prefix or exact 5-digit number
    const isZip = /^\d{5}$/.test(val);
    let isCovered = false;

    if (isZip) {
      const prefix = val.substring(0, 3);
      isCovered = CORRIDOR_ZIP_PREFIXES.includes(prefix);
    } else {
      isCovered = CORRIDOR_CITIES.some(c => val.includes(c) || c.includes(val));
    }

    if (isCovered) {
      result.className = 'coverage-result success';
      result.innerHTML = '✓ <strong>Great news! You are inside our primary LA-to-Irvine service corridor.</strong> Zero travel surcharges and rapid 24-48h walkthroughs. Call us at (310) 418-9598.';
    } else {
      result.className = 'coverage-result notice';
      result.innerHTML = '📍 We primarily service LA City to Irvine between the beach and the mountains, but we also accommodate select neighboring California projects. Please call <strong>(310) 418-9598</strong> to confirm.';
    }
  }

  btn.addEventListener('click', check);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') check();
  });
}

/* ==========================================================================
   4. BEFORE & AFTER SPLIT COMPARISON SLIDER
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.getElementById('beforeAfterBox');
  const beforeImg = document.getElementById('baBeforeImgWrap');
  const handle = document.getElementById('baHandle');

  if (!container || !beforeImg || !handle) return;

  let isDragging = false;

  function updateSlider(xPos) {
    const rect = container.getBoundingClientRect();
    let position = (xPos - rect.left) / rect.width;

    if (position < 0.05) position = 0.05;
    if (position > 0.95) position = 0.95;

    const percentage = position * 100;
    beforeImg.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  // Touch Support for mobile
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  });
}

/* ==========================================================================
   5. CONTACT FORM & TOAST NOTIFICATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('quoteForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName')?.value || 'Valued Client';
    const phone = document.getElementById('formPhone')?.value || '';
    const email = document.getElementById('formEmail')?.value || '';

    // Show simulated confirmation toast
    showToastNotice(`Thank you, ${name}! Your request has been sent to Renacer Painting (310-418-9598). We will contact you today!`);

    form.reset();
  });
}

function showToastNotice(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="22" height="22" fill="#10b981" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ==========================================================================
   6. MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.style.display === 'flex';
      if (isOpen) {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'var(--bg-card)';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid var(--border-subtle)';
        navLinks.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
      }
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.style.display = 'none';
        }
      });
    });
  }
}
