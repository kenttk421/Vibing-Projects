/**
 * Vibing Projects // Indie Studio & Workshop Showcase
 * Handcrafted by Daniel Abrams
 */

// ============================================================================
// 1. DATA: Handcrafted Projects Showcase
// ============================================================================
const PROJECTS_DATA = [
  {
    id: "the-final-plunge",
    isFlagship: true,
    category: "games",
    title: "The Final Plunge",
    subtitle: "2D Space Exploration, Rocket Engineering & Orbital Mechanics Simulator",
    description: "A comprehensive 2D physics simulation of celestial mechanics and rocketry. Build multi-stage vessels in the VAB, master analytical Keplerian orbital propagation, navigate dynamic spheres of influence (SOI), and venture through an alien solar system with atmospheric flight and landing physics.",
    imageSrc: "/assets/the-final-plung.jpg",
    imageAlt: "The Final Plunge orbital mechanics simulator showing planetary orbits and spacecraft",
    primaryUrl: "/TheFinalPlunge/PlayTest/",
    primaryLabel: "Launch PlayTest",
    secondaryUrl: "/TheFinalPlunge/",
    secondaryLabel: "Project Hub",
    tags: ["Keplerian Physics", "VAB Rocket Builder", "Hierarchical SOI", "Canvas 2D", "Telemetry HUD"],
    telemetry: [
      { key: "Physics Model", value: "Fixed-Epoch Keplerian" },
      { key: "SOI Hierarchy", value: "Moons → Planets → SOL" },
      { key: "Vessel Assembly", value: "Multi-Part Staging" },
      { key: "Atmosphere", value: "Dynamic Drag & Lift" }
    ]
  },
  {
    id: "the-slapping-salmon",
    category: "tabletop",
    theme: "theme-tavern",
    title: "The Slapping Salmon Game-Hall",
    description: "A curated collection of rich fantasy tavern games, gambling mechanics, and dice systems designed for tabletop Dungeon Masters and adventuring parties to bring tavern nights alive.",
    imageSrc: "/assets/the-slapping-salmon-game-hall.jpg",
    imageAlt: "The Slapping Salmon tavern games and gambling mechanics",
    url: "/TheSlappingSalmon/",
    badge: "Tabletop DM Tools",
    icon: "🍺",
    tags: ["TTRPG", "Tavern Games", "D&D 5e Mechanics", "Dice Simulation"]
  },
  {
    id: "bay-aards-battle-beats",
    category: "games",
    theme: "theme-bard",
    title: "Bay Aard's Battle Beats",
    description: "A bardic musical battle simulator and interactive instrument soundboard where vibrating lute strings set combat rhythm, channeling spell chords and battle anthems.",
    imageSrc: "/assets/bay-aards-battle-beats.jpg",
    imageAlt: "Bay Aard's Battle Beats bardic lute battle simulator",
    url: "/BayaardsBattleBeats/",
    badge: "Music Combat",
    icon: "🎵",
    tags: ["Bardic Combat", "Acoustic Lute", "Interactive Audio", "Medieval Rhythm"]
  },
  {
    id: "atonement-of-the-raven-king",
    category: "games",
    theme: "theme-dark-crit",
    title: "Atonement of the Raven King",
    description: "A dark rogue dice combat game. Face the shadows, balance luck with tactical dice manipulation, and trigger the elusive 'Perfect Strike'—cascading critical hits across all active dice.",
    imageSrc: "/assets/atonement-of-the-raven-king.jpg",
    imageAlt: "Atonement of the Raven King tactical dice combat",
    url: "/AtonementOfTheRavenKing/",
    badge: "Tactical Dice RPG",
    icon: "⚔️",
    tags: ["Dice Tactics", "Critical Strikes", "Dark Fantasy", "Turn-Based"]
  },
  {
    id: "lawneys-crystal-ball",
    category: "tabletop",
    theme: "theme-mystic",
    title: "Lawney's Crystal Ball",
    description: "An arcane probability engine and D&D divination calculator. Forecast attack roll distributions, spell save DC success rates, and multi-dice damage variance with precision models.",
    imageSrc: "/assets/lawneys-crystal-ball.jpg",
    imageAlt: "Lawney's Crystal Ball D&D probability calculator",
    url: "/LawneysCrystalBall/",
    badge: "Arcane Probability",
    icon: "🔮",
    tags: ["D&D 5e", "Probability Models", "Dice Math", "Tabletop Utility"]
  }
];

// ============================================================================
// 2. CANVASES: Celestial Stars in Hero & 3D Rolling Dice Runway Below
// ============================================================================

// (A) The Star Area: Constellations & Orbital Rings
// (A) Celestial Realm Constellation Canvas: Loose Dynamic "VP" Shape Asterism & Cosmic Starfield
// Spanning seamlessly from top of Hero through the bottom of The Final Plunge
const VP_COORDS = [
  {x:0.1497,y:0.4392},{x:0.0923,y:0.4471},{x:0.1715,y:0.3119},{x:0.098,y:0.3423},{x:0.1715,y:0.3727},
  {x:0.1661,y:0.5777},{x:0.1116,y:0.4352},{x:0.1272,y:0.1723},{x:0.1044,y:0.134},{x:0.1097,y:0.0653},
  {x:0.0765,y:0.2005},{x:0.0158,y:0.0687},{x:0.1159,y:0.1639},{x:0.0654,y:0.107},{x:0.1889,y:0.5507},
  {x:0.2176,y:0.5614},{x:0.2002,y:0.8767},{x:0.2069,y:0.978},{x:0.2753,y:0.951},{x:0.2798,y:0.9181},
  {x:0.2972,y:0.9789},{x:0.2324,y:0.6492},{x:0.2404,y:0.7641},{x:0.1924,y:0.5082},{x:0.1419,y:0.643},
  {x:0.171,y:0.7089},{x:0.1818,y:0.8305},{x:0.3294,y:0.7382},{x:0.2677,y:0.7584},{x:0.2394,y:0.8801},
  {x:0.3253,y:0.8035},{x:0.2902,y:0.7891},{x:0.3345,y:0.5459},{x:0.2891,y:0.6098},{x:0.3388,y:0.4544},
  {x:0.422,y:0.3508},{x:0.3575,y:0.2877},{x:0.3453,y:0.3457},{x:0.469,y:0.1999},{x:0.3965,y:0.0985},
  {x:0.4321,y:0.1729},{x:0.4979,y:0.0648},{x:0.4394,y:0.2269},{x:0.4139,y:0.1166},{x:0.3841,y:0.1495},
  {x:0.3562,y:0.6571},{x:0.3651,y:0.6396},{x:0.6792,y:0.8221},{x:0.6574,y:0.8356},{x:0.8091,y:0.6396},
  {x:0.8936,y:0.6036},{x:0.8802,y:0.3378},{x:0.8789,y:0.2162},{x:0.6735,y:0.6689},{x:0.5997,y:0.9572},
  {x:0.5903,y:0.8919},{x:0.6064,y:0.7523},{x:0.6695,y:0.3829},{x:0.673,y:0.2956},{x:0.6972,y:0.1965},
  {x:0.5863,y:0.0614},{x:0.6784,y:0.4713},{x:0.6112,y:0.3925},{x:0.6972,y:0.4983},{x:0.9884,y:0.3699},
  {x:0.9602,y:0.3136},{x:0.6596,y:0.2461},{x:0.6743,y:0.2235},{x:0.732,y:0.0794},{x:0.7481,y:0.0569},
  {x:0.8206,y:0.0636},{x:0.9266,y:0.1267},{x:0.8098,y:0.2055},{x:0.8206,y:0.1852},{x:0.8703,y:0.147},
  {x:0.8596,y:0.237},{x:0.9013,y:0.3494},{x:0.9711,y:0.4057},{x:0.749,y:0.5586},{x:0.7839,y:0.5113},
  {x:0.6023,y:0.4032},{x:0.5956,y:0.4865},{x:0.6601,y:0.1757},{x:0.6131,y:0.1081},{x:0.6362,y:0.8986},
  {x:0.6604,y:0.9302},{x:0.6872,y:0.9842},{x:0.6151,y:0.9234},{x:0.6819,y:0.8536},{x:0.6966,y:0.6486},
  {x:0.5836,y:0.3164},{x:0.7849,y:0.1047},{x:0.7597,y:0.6149},{x:0.5859,y:0.6577},{x:0.5859,y:0.5811},
  {x:0.5893,y:0.982},{x:0.3785,y:0.6194},{x:0.3906,y:0.4662},{x:0.2233,y:0.9611},{x:0.1537,y:0.6171},
  {x:0.3671,y:0.3468},{x:0.4104,y:0.4471},{x:0.5768,y:0.2579},{x:0.8829,y:0.5394},{x:0.8586,y:0.4735},
  {x:0.6277,y:0.1357},{x:0.6119,y:0.5771}
];


function initConstellationCanvas(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const celestialRealm = canvas.closest('.celestial-realm') || canvas.parentElement;

  let width, height;
  let animationFrameId;
  let resizeObserver;
  const vpStars = [];
  const ambientStars = [];
  const ambientCount = 45; // Ambient celestial starfield spanning down through The Final Plunge
  const mouse = { x: -1000, y: -1000, vx: 0, vy: 0, radius: 130 };
  let vpWidth = 650, vpHeight = 387;

  function resize() {
    width = canvas.width = celestialRealm.clientWidth;
    height = canvas.height = celestialRealm.clientHeight;
    setupConstellation();
  }

  function setupConstellation() {
    vpStars.length = 0;
    ambientStars.length = 0;

    // Center the loose dynamic VP constellation in the upper Hero region
    vpWidth = Math.min(width * 0.84, 720);
    vpHeight = vpWidth * (444 / 745);
    const vpLeft = (width - vpWidth) * 0.5;
    const vpTop = Math.max(25, Math.min(height * 0.08, 80));

    // 1. Build VP constellation nodes with organic harmonic floating parameters
    VP_COORDS.forEach((pt, idx) => {
      const anchorX = vpLeft + pt.x * vpWidth;
      const anchorY = vpTop + pt.y * vpHeight;
      vpStars.push({
        id: idx,
        isVP: true,
        anchorX,
        anchorY,
        x: anchorX + (Math.random() - 0.5) * 6,
        y: anchorY + (Math.random() - 0.5) * 6,
        vx: 0,
        vy: 0,
        energy: 0,
        baseRadius: Math.random() * 1.5 + 1.2,
        driftPhaseX: Math.random() * Math.PI * 2,
        driftPhaseY: Math.random() * Math.PI * 2,
        driftSpeedX: 0.0006 + Math.random() * 0.0009,
        driftSpeedY: 0.0006 + Math.random() * 0.0009,
        driftAmpX: 7 + Math.random() * 9, // Loose dynamic breathing offset (~7-16px)
        driftAmpY: 6 + Math.random() * 9,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.002 + Math.random() * 0.003,
        color: Math.random() > 0.4 ? 'rgba(56, 189, 248, 0.9)' : 'rgba(251, 191, 36, 0.88)'
      });
    });

    // 2. Build ambient stars across full canvas height (from top through The Final Plunge)
    for (let i = 0; i < ambientCount; i++) {
      ambientStars.push({
        isVP: false,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        baseRadius: Math.random() * 1.8 + 1.0,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.002 + Math.random() * 0.003,
        color: Math.random() > 0.5 ? 'rgba(56, 189, 248, 0.75)' : 'rgba(251, 191, 36, 0.75)'
      });
    }
  }

  window.addEventListener('resize', resize);
  if (window.ResizeObserver) {
    resizeObserver = new ResizeObserver(() => {
      width = canvas.width = celestialRealm.clientWidth;
      height = canvas.height = celestialRealm.clientHeight;
    });
    resizeObserver.observe(celestialRealm);
  }

  celestialRealm.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const nx = e.clientX - rect.left;
    const ny = e.clientY - rect.top;
    if (mouse.x > -1000) {
      mouse.vx = nx - mouse.x;
      mouse.vy = ny - mouse.y;
    }
    mouse.x = nx;
    mouse.y = ny;
  });

  celestialRealm.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
    mouse.vx = 0;
    mouse.vy = 0;
  });

  function draw(currentTime = 0) {
    ctx.clearRect(0, 0, width, height);

    // Orbital Ring Guides centered over Hero and The Final Plunge
    const centerX = width * 0.5;
    const heroCenterY = Math.min(height * 0.28, 300);
    const flagshipCenterY = height * 0.72;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.022)';
    ctx.lineWidth = 1;
    [150, 300, 450, 600].forEach(r => {
      ctx.beginPath();
      ctx.arc(centerX, heroCenterY, r, 0, Math.PI * 2);
      ctx.stroke();
    });
    [180, 350, 520].forEach(r => {
      ctx.beginPath();
      ctx.arc(centerX, flagshipCenterY, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Mouse velocity decay & speed
    mouse.vx *= 0.92;
    mouse.vy *= 0.92;
    const mouseSpeed = Math.hypot(mouse.vx, mouse.vy);

    // Dynamic connection threshold based on current VP bounding scale
    const scale = vpWidth / 745;
    const connectThreshold = 96 * scale; // Balanced density for crisp, flowing VP letterforms

    // 1. Update and draw VP Constellation Stars (Loose Dynamic Shape in the Background)
    for (let i = 0; i < vpStars.length; i++) {
      const star = vpStars[i];

      // Loose harmonic floating anchor drift (gives the VP shape an organic cosmic breathing motion)
      const targetX = star.anchorX + Math.sin(currentTime * star.driftSpeedX + star.driftPhaseX) * star.driftAmpX;
      const targetY = star.anchorY + Math.cos(currentTime * star.driftSpeedY + star.driftPhaseY) * star.driftAmpY;

      // Soft spring return toward breathing anchor
      star.vx += (targetX - star.x) * 0.024;
      star.vy += (targetY - star.y) * 0.024;

      // Subtle, gentle mouse deflection
      const mdx = mouse.x - star.x;
      const mdy = mouse.y - star.y;
      const mdist = Math.hypot(mdx, mdy);
      if (mdist < mouse.radius && mdist > 0) {
        const force = (mouse.radius - mdist) / mouse.radius;
        star.vx -= (mdx / mdist) * force * 0.9;
        star.vy -= (mdy / mdist) * force * 0.9;
      }

      // Apply velocity and smooth damping
      star.vx *= 0.88;
      star.vy *= 0.88;
      star.x += star.vx;
      star.y += star.vy;

      // Draw star node: subtle, peaceful starlight without bright flashes
      const twinkle = Math.sin(currentTime * star.twinkleSpeed + star.twinklePhase) * 0.25 + 0.75;
      const rad = star.baseRadius * twinkle;

      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Draw VP Constellation Strings: Subtle, Calm Background Lines
    for (let i = 0; i < vpStars.length; i++) {
      for (let j = i + 1; j < vpStars.length; j++) {
        const a = vpStars[i];
        const b = vpStars[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);

        if (dist < connectThreshold) {
          const relDist = 1 - dist / connectThreshold;
          const alpha = relDist * 0.16; // Subtle, elegant background line opacity
          ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // 4. Update and Draw Ambient Stars Across Full Canvas Height
    for (let i = 0; i < ambientStars.length; i++) {
      const star = ambientStars[i];
      star.x += star.vx;
      star.y += star.vy;

      if (star.x < 0 || star.x > width) star.vx *= -1;
      if (star.y < 0 || star.y > height) star.vy *= -1;

      // Gentle mouse deflection
      const adx = mouse.x - star.x;
      const ady = mouse.y - star.y;
      const adist = Math.hypot(adx, ady);
      if (adist < mouse.radius && adist > 0) {
        const force = (mouse.radius - adist) / mouse.radius;
        star.x -= (adx / adist) * force * 1.2;
        star.y -= (ady / adist) * force * 1.2;
      }

      // Draw ambient star
      const twinkle = Math.sin(currentTime * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.85;
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.baseRadius * twinkle, 0, Math.PI * 2);
      ctx.fill();

      // Ambient faint constellation lines
      for (let j = i + 1; j < ambientStars.length; j++) {
        const other = ambientStars[j];
        const ndx = star.x - other.x;
        const ndy = star.y - other.y;
        const nDist = Math.hypot(ndx, ndy);

        if (nDist < 120) {
          const alpha = (1 - nDist / 120) * 0.16;
          ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(draw);
  }

  resize();
  animationFrameId = requestAnimationFrame(draw);

  return () => {
    window.removeEventListener('resize', resize);
    if (resizeObserver) resizeObserver.disconnect();
    cancelAnimationFrame(animationFrameId);
  };
}

// (B) 3D Polyhedral Dice: Spread Out Across the Explore The Works Section (No Numbers)
function initDiceCanvas(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const section = canvas.closest('#projects') || canvas.parentElement;

  let width, height;
  let animationFrameId;
  let resizeObserver;
  const dice = [];
  const mouse = { x: -1000, y: -1000, radius: 150 };

  // Helper to normalize vectors
  function norm(v) {
    const l = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    return [v[0] / l, v[1] / l, v[2] / l];
  }

  function getUniqueEdges(faces) {
    const edgeSet = new Set();
    const edges = [];
    faces.forEach(face => {
      for (let i = 0; i < face.length; i++) {
        const a = face[i];
        const b = face[(i + 1) % face.length];
        const key = a < b ? `${a}_${b}` : `${b}_${a}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edges.push([a, b]);
        }
      }
    });
    return edges;
  }

  // --- 1. D4: Regular Tetrahedron (4 vertices, 4 triangular faces) ---
  const d4Vertices = [
    [1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]
  ].map(norm);
  const d4Faces = [
    [1, 2, 0], [3, 1, 0], [2, 3, 0], [3, 2, 1]
  ];

  // --- 2. D6: Regular Cube (8 vertices, 6 square faces) ---
  const d6Vertices = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
  ].map(norm);
  const d6Faces = [
    [3, 2, 1, 0], [5, 6, 7, 4], [1, 5, 4, 0],
    [3, 7, 6, 2], [4, 7, 3, 0], [2, 6, 5, 1]
  ];

  // --- 3. D8: Regular Octahedron (6 vertices, 8 triangular faces) ---
  const d8Vertices = [
    [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]
  ].map(norm);
  const d8Faces = [
    [0, 2, 4], [2, 1, 4], [1, 3, 4], [3, 0, 4],
    [2, 0, 5], [1, 2, 5], [3, 1, 5], [0, 3, 5]
  ];

  // --- 4. D10: Pentagonal Trapezohedron (12 vertices, 10 planar kite faces) ---
  const d10C36 = Math.cos(Math.PI / 5);
  const d10R = 1.0;
  const d10H0 = 0.165;
  const d10H1 = d10H0 * (1 + d10C36) / (1 - d10C36);
  const d10Scale = 1.0 / d10H1;

  const d10ApexY = 0.74; // Pushed in from 1.0 to give authentic gaming die proportions without being too long
  const d10Vertices = [
    [0, d10ApexY, 0],  // 0: Top apex
    [0, -d10ApexY, 0]  // 1: Bottom apex
  ];
  for (let k = 0; k < 5; k++) {
    const a = (k * 2 * Math.PI) / 5;
    d10Vertices.push([
      d10R * Math.cos(a) * d10Scale,
      d10H0 * d10Scale,
      d10R * Math.sin(a) * d10Scale
    ]); // 2..6: Upper equatorial ring
  }
  for (let k = 0; k < 5; k++) {
    const a = (k * 2 * Math.PI) / 5 + Math.PI / 5;
    d10Vertices.push([
      d10R * Math.cos(a) * d10Scale,
      -d10H0 * d10Scale,
      d10R * Math.sin(a) * d10Scale
    ]); // 7..11: Lower equatorial ring (staggered 36°)
  }
  const d10Faces = [
    // 5 Top Kite Facets (meeting at top apex 0)
    [3, 7, 2, 0], [4, 8, 3, 0], [5, 9, 4, 0], [6, 10, 5, 0], [2, 11, 6, 0],
    // 5 Bottom Kite Facets (meeting at bottom apex 1)
    [7, 3, 8, 1], [8, 4, 9, 1], [9, 5, 10, 1], [10, 6, 11, 1], [11, 2, 7, 1]
  ];

  // --- 5. D12: Regular Dodecahedron (20 vertices, 12 pentagonal faces) ---
  const phi = (1 + Math.sqrt(5)) / 2;
  const inv = 1 / phi;
  const d12Raw = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
    [0, -inv, -phi], [0, inv, -phi], [0, -inv, phi], [0, inv, phi],
    [-inv, -phi, 0], [inv, -phi, 0], [inv, phi, 0], [-inv, phi, 0],
    [-phi, 0, -inv], [phi, 0, -inv], [-phi, 0, inv], [phi, 0, inv]
  ];
  const d12Vertices = d12Raw.map(norm);
  const d12Faces = [
    [0, 8, 1, 13, 12], [16, 3, 9, 8, 0], [1, 8, 9, 2, 17], [17, 19, 5, 13, 1],
    [2, 9, 3, 15, 14], [2, 14, 6, 19, 17], [16, 18, 7, 15, 3], [12, 13, 5, 10, 4],
    [19, 6, 11, 10, 5], [14, 15, 7, 11, 6], [18, 4, 10, 11, 7], [4, 18, 16, 0, 12]
  ];

  // --- 6. D20: Regular Icosahedron (12 vertices, 20 triangular faces) ---
  const d20Raw = [
    [0, 1, phi], [0, -1, phi], [0, 1, -phi], [0, -1, -phi],
    [1, phi, 0], [-1, phi, 0], [1, -phi, 0], [-1, -phi, 0],
    [phi, 0, 1], [-phi, 0, 1], [phi, 0, -1], [-phi, 0, -1]
  ];
  const d20Vertices = d20Raw.map(norm);
  const d20Faces = [
    [0, 8, 4], [0, 4, 5], [0, 5, 9], [0, 9, 1], [0, 1, 8],
    [10, 6, 3], [2, 10, 3], [11, 2, 3], [7, 11, 3], [6, 7, 3],
    [8, 10, 4], [4, 10, 2], [4, 2, 5], [5, 2, 11], [5, 11, 9],
    [9, 11, 7], [9, 7, 1], [1, 7, 6], [1, 6, 8], [8, 6, 10]
  ];

  // Registry of all 6 Polyhedral Models
  const MODELS = {
    d4:  { vertices: d4Vertices,  faces: d4Faces,  edges: getUniqueEdges(d4Faces),  baseSize: 32 },
    d6:  { vertices: d6Vertices,  faces: d6Faces,  edges: getUniqueEdges(d6Faces),  baseSize: 25 },
    d8:  { vertices: d8Vertices,  faces: d8Faces,  edges: getUniqueEdges(d8Faces),  baseSize: 28 },
    d10: { vertices: d10Vertices, faces: d10Faces, edges: getUniqueEdges(d10Faces), baseSize: 29 },
    d12: { vertices: d12Vertices, faces: d12Faces, edges: getUniqueEdges(d12Faces), baseSize: 27 },
    d20: { vertices: d20Vertices, faces: d20Faces, edges: getUniqueEdges(d20Faces), baseSize: 31 }
  };

  const THEMES = [
    { stroke: 'rgba(251, 191, 36, 0.9)',  fill: 'rgba(245, 158, 11, 0.14)', dot: '#fbbf24' }, // Amber Gold
    { stroke: 'rgba(56, 189, 248, 0.9)',  fill: 'rgba(2, 132, 199, 0.14)',  dot: '#38bdf8' }, // Cyan Sky
    { stroke: 'rgba(52, 211, 153, 0.9)',  fill: 'rgba(16, 185, 129, 0.14)', dot: '#34d399' }, // Emerald
    { stroke: 'rgba(192, 132, 252, 0.9)', fill: 'rgba(168, 85, 247, 0.14)', dot: '#c084fc' }, // Amethyst
    { stroke: 'rgba(251, 113, 133, 0.9)', fill: 'rgba(244, 63, 94, 0.14)',  dot: '#fb7185' }, // Rose Ruby
    { stroke: 'rgba(125, 211, 252, 0.95)',fill: 'rgba(14, 165, 233, 0.15)', dot: '#7dd3fc' }  // Celestial Azure
  ];

  function rotate3D(x, y, z, rx, ry, rz) {
    const cosX = Math.cos(rx), sinX = Math.sin(rx);
    const y1 = y * cosX - z * sinX;
    const z1 = y * sinX + z * cosX;

    const cosY = Math.cos(ry), sinY = Math.sin(ry);
    const x2 = x * cosY + z1 * sinY;
    const z2 = -x * sinY + z1 * cosY;

    const cosZ = Math.cos(rz), sinZ = Math.sin(rz);
    const x3 = x2 * cosZ - y1 * sinZ;
    const y3 = x2 * sinZ + y1 * cosZ;
    return [x3, y3, z2];
  }

  function resize() {
    width = canvas.width = section.clientWidth;
    height = canvas.height = section.clientHeight;
    initDice();
  }

  function initDice() {
    dice.length = 0;
    // The 6 canonical RPG polyhedral dice: D4, D6, D8, D10, D12, D20
    const polyhedralTypes = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];
    const count = width > 1400 ? 14 : width > 900 ? 12 : 8;

    const cols = width > 1400 ? 5 : width > 768 ? 4 : 3;
    const rows = Math.ceil(count / cols);
    const cellW = width / cols;
    const cellH = height / rows;

    for (let i = 0; i < count; i++) {
      const type = polyhedralTypes[i % polyhedralTypes.length];
      const model = MODELS[type];
      const theme = THEMES[i % THEMES.length];

      const col = i % cols;
      const row = Math.floor(i / cols);

      dice.push({
        type,
        x: col * cellW + cellW * 0.5 + (Math.random() - 0.5) * (cellW * 0.7),
        y: row * cellH + cellH * 0.5 + (Math.random() - 0.5) * (cellH * 0.7),
        z: (Math.random() - 0.5) * 60,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.35,
        size: model.baseSize * (0.95 + Math.random() * 0.15),
        rx: Math.random() * Math.PI * 2,
        ry: Math.random() * Math.PI * 2,
        rz: Math.random() * Math.PI * 2,
        wx: (Math.random() - 0.5) * 0.02 + 0.008,
        wy: (Math.random() - 0.5) * 0.02 + 0.008,
        wz: (Math.random() - 0.5) * 0.015,
        strokeColor: theme.stroke,
        fillColor: theme.fill,
        dotColor: theme.dot
      });
    }
  }

  window.addEventListener('resize', resize);
  if (window.ResizeObserver) {
    resizeObserver = new ResizeObserver(() => {
      width = canvas.width = section.clientWidth;
      height = canvas.height = section.clientHeight;
    });
    resizeObserver.observe(section);
  }

  section.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  section.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // Clicking rolls all the dice with energetic momentum!
  section.addEventListener('click', (e) => {
    if (e.target.closest('a, button, input')) return;
    dice.forEach(die => {
      die.wx += (Math.random() - 0.5) * 0.12;
      die.wy += (Math.random() - 0.5) * 0.12;
      die.wz += (Math.random() - 0.5) * 0.12;
      die.vx += (Math.random() - 0.5) * 2.2;
      die.vy += (Math.random() - 0.5) * 1.8;
    });
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Render 3D Rolling Polyhedral Dice (NO NUMBERS)
    dice.forEach(die => {
      // Natural horizontal drift & bounce
      die.x += die.vx;
      die.y += die.vy;
      if (die.x < 35) { die.x = 35; die.vx *= -1; }
      if (die.x > width - 35) { die.x = width - 35; die.vx *= -1; }
      if (die.y < 25) { die.y = 25; die.vy *= -1; }
      if (die.y > height - 25) { die.y = height - 25; die.vy *= -1; }

      // 3D continuous roll
      die.rx += die.wx;
      die.ry += die.wy;
      die.rz += die.wz;

      // Friction on spin
      die.wx *= 0.996;
      die.wy *= 0.996;
      die.wz *= 0.996;
      if (Math.abs(die.wx) < 0.004) die.wx = 0.007;
      if (Math.abs(die.wy) < 0.004) die.wy = 0.007;

      // Mouse proximity interaction: roll faster & deflect
      const mdx = mouse.x - die.x;
      const mdy = mouse.y - die.y;
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mDist < mouse.radius && mDist > 0) {
        const force = (mouse.radius - mDist) / mouse.radius;
        die.x -= (mdx / mDist) * force * 2.5;
        die.y -= (mdy / mDist) * force * 1.5;
        die.wx += (Math.random() - 0.5) * 0.03 * force;
        die.wy += (Math.random() - 0.5) * 0.03 * force;
      }

      // Model lookup
      const model = MODELS[die.type];
      const fov = 350;

      // Project vertices to 2D
      const proj = model.vertices.map(v => {
        const [rx, ry, rz] = rotate3D(v[0], v[1], v[2], die.rx, die.ry, die.rz);
        const scale = fov / (fov + rz * die.size + die.z + 80);
        return {
          x: die.x + rx * die.size * scale,
          y: die.y + ry * die.size * scale,
          z: rz,
          scale
        };
      });

      // Draw Translucent Facets (NO NUMBERS)
      model.faces.forEach(face => {
        const p0 = proj[face[0]];
        const p1 = proj[face[1]];
        const p2 = proj[face[2]];

        // Cross product for front-facing check
        const normalZ = (p1.x - p0.x) * (p2.y - p0.y) - (p1.y - p0.y) * (p2.x - p0.x);

        if (normalZ > 0) {
          ctx.fillStyle = die.fillColor;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          for (let k = 1; k < face.length; k++) {
            ctx.lineTo(proj[face[k]].x, proj[face[k]].y);
          }
          ctx.closePath();
          ctx.fill();
        }
      });

      // Draw Wireframe Edges
      ctx.strokeStyle = die.strokeColor;
      ctx.lineWidth = 1.3;
      model.edges.forEach(([iA, iB]) => {
        const pA = proj[iA];
        const pB = proj[iB];
        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.stroke();
      });

      // Illuminated Vertex Dots
      ctx.fillStyle = die.dotColor;
      proj.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    animationFrameId = requestAnimationFrame(draw);
  }

  resize();
  draw();

  return () => {
    window.removeEventListener('resize', resize);
    if (resizeObserver) resizeObserver.disconnect();
    cancelAnimationFrame(animationFrameId);
  };
}

// ============================================================================
// 3. UI GENERATOR: Render Application Shell
// ============================================================================
function renderApp() {
  const root = document.getElementById('root');
  if (!root) return;

  const flagship = PROJECTS_DATA.find(p => p.isFlagship);
  const gridProjects = PROJECTS_DATA.filter(p => !p.isFlagship);

  root.innerHTML = `
    <div class="workshop-grid"></div>
    <div class="app-shell">
      
      <!-- Top Navigation -->
      <header class="top-nav">
        <div class="container nav-inner">
          <a href="#" class="brand-logo">
            <span class="logo-badge">VP</span>
            <div class="logo-text">
              <span class="logo-title">Vibing Projects</span>
              <span class="logo-subtitle">Indie Game & Tabletop Studio</span>
            </div>
          </a>

          <nav>
            <ul class="nav-links">
              <li><a href="#flagship" class="nav-link">Flagship</a></li>
              <li><a href="#projects" class="nav-link">All Projects</a></li>
              <li><a href="#scope-calculator" class="nav-link">Custom Software</a></li>
              <li><a href="#about" class="nav-link">The Maker</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <!-- CELESTIAL REALM: Stars from Top through The Final Plunge -->
      <div class="celestial-realm">
        <div class="celestial-canvas-wrap">
          <canvas id="heroCanvas" class="celestial-canvas"></canvas>
        </div>

        <!-- Hero Section -->
        <section class="hero-section">
          <div class="container hero-content">
            <h1 class="hero-title">
              Games, Physics & <span class="title-accent">Tabletop Worlds</span>
            </h1>

            <p class="hero-lead">
              Welcome to the creative workshop of <strong>Daniel Abrams</strong>. Here you'll find custom-built 
              2D orbital mechanics simulators, medieval tavern gambling halls, bardic rhythm combat, and arcane tabletop RPG toolkits.
            </p>

            <div class="stats-strip">
              <div class="stat-item">
                <span class="stat-val cyan">Keplerian</span>
                <span class="stat-lbl">Orbital Physics</span>
              </div>
              <div class="stat-item">
                <span class="stat-val gold">5+</span>
                <span class="stat-lbl">Playable Projects</span>
              </div>
              <div class="stat-item">
                <span class="stat-val emerald">100%</span>
                <span class="stat-lbl">Indie Crafted</span>
              </div>
            </div>
          </div>
        </section>

        <!-- FLAGSHIP SPOTLIGHT: The Final Plunge -->
        <section id="flagship" class="container flagship-wrapper">
          <div class="section-header">
            <span class="section-tag">Flagship Simulator</span>
            <h2 class="section-title">The Final Plunge</h2>
          </div>

          <div class="flagship-card">
            <div class="flagship-visual">
              <img src="${flagship.imageSrc}" alt="${flagship.imageAlt}" />
              <div class="flagship-overlay-badge">
                <span class="flagship-live-pulse"></span>
                <span>Active Orbital Simulation</span>
              </div>
            </div>

            <div class="flagship-content">
              <div class="flagship-header">
                <div class="flagship-cat">Space Exploration & Flight Mechanics</div>
                <h3 class="flagship-name">${flagship.title}</h3>
                <p class="flagship-desc">${flagship.description}</p>
              </div>

              <div class="telemetry-grid">
                ${flagship.telemetry.map(t => `
                  <div class="telem-box">
                    <span class="telem-key">${t.key}</span>
                    <span class="telem-val">${t.value}</span>
                  </div>
                `).join('')}
              </div>

              <div class="flagship-tags">
                ${flagship.tags.map(t => `<span class="tag-pill cyan">${t}</span>`).join('')}
              </div>

              <div class="flagship-actions">
                <a href="${flagship.primaryUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary cyan-theme">
                  <span>${flagship.primaryLabel}</span>
                  <span>➔</span>
                </a>
                <a href="${flagship.secondaryUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary">
                  <span>${flagship.secondaryLabel}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- CATALOG OF PROJECTS (Full Width Dice Arena) -->
      <section id="projects" class="projects-section">
        <div class="projects-dice-bg">
          <canvas id="diceCanvas" class="projects-dice-canvas"></canvas>
        </div>

        <div class="container projects-inner">
          <div class="section-header">
            <span class="section-tag">Explore The Works</span>
            <h2 class="section-title">Games, Tabletop & Tools</h2>
          </div>

          <!-- Project Cards Grid (2x2) -->
          <div class="projects-grid" id="projectsGrid">
            ${gridProjects.map(p => {
              const isExternal = p.url?.startsWith('http');
              const targetAttr = isExternal ? `target="_blank" rel="noopener noreferrer"` : ``;

              return `
                <a href="${p.url || p.primaryUrl}" class="project-card ${p.theme || ''}" ${targetAttr}>
                  <div class="card-media">
                    <img src="${p.imageSrc}" alt="${p.imageAlt}" loading="lazy" />
                    <span class="card-badge">${p.badge || p.category}</span>
                  </div>

                  <div class="card-body">
                    <h3 class="card-title">${p.title}</h3>
                    <p class="card-desc">${p.description}</p>

                    <div class="card-tags">
                      ${p.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
                    </div>

                    <div class="card-footer">
                      <div class="card-link">
                        <span>Play & Explore</span>
                        <span>➔</span>
                      </div>
                      <div class="card-type-icon">${p.icon || '🚀'}</div>
                    </div>
                  </div>
                </a>
              `;
            }).join('')}
          </div>
        </div>
      </section>

      <!-- UNIVERSAL SOFTWARE SCOPE & COLLABORATION -->
      <section id="scope-calculator" class="container scope-section">
        <div class="section-header">
          <span class="section-tag">Custom Software & Solutions</span>
          <h2 class="section-title">Got an Idea or a Tricky Problem?</h2>
        </div>

        <div class="scope-card">
          <div class="scope-grid">
            <div class="scope-content">
              <span class="tag-pill cyan" style="margin-bottom: 14px; display: inline-block;">Free Project Estimator</span>
              <h3>Do you have an issue that can be solved with custom software?</h3>
              <p class="scope-lead">
                Let's work together to make it a reality. Whether you need a <strong>mobile app</strong>, 
                a <strong>custom desktop tool to speed up your workflow</strong>, a <strong>game or simulation engine</strong>, 
                or a <strong>rock-solid backend API</strong>—I love taking ambitious ideas and turning them into clean, 
                reliable software that actually solves real problems.
              </p>

              <div class="scope-platforms-title">Whatever kind of software you need:</div>
              <div class="scope-platforms-wrap">
                <span class="scope-platform-pill highlight">📱 Mobile Apps (iOS & Android)</span>
                <span class="scope-platform-pill highlight">🎮 Games & Simulation Engines</span>
                <span class="scope-platform-pill highlight">🖥️ Desktop & Internal Tools</span>
                <span class="scope-platform-pill highlight">🌐 Web Apps & Portals</span>
                <span class="scope-platform-pill highlight">⚡ APIs & Cloud Backends</span>
                <span class="scope-platform-pill highlight">🤖 Automation & Workflows</span>
              </div>

              <div class="scope-actions">
                <a href="/sitescale/" target="_blank" rel="noopener noreferrer" class="btn-primary cyan-theme">
                  <span>Try The Project Scope Calculator</span>
                  <span>➔</span>
                </a>
              </div>
            </div>

            <div class="scope-features-box">
              <div class="scope-feature-item">
                <div class="scope-feature-icon">💡</div>
                <div class="scope-feature-text">
                  <h5>No Corporate Jargon, Just Solutions</h5>
                  <p>Tell me what you're trying to solve or build, and we'll break down the practical engineering steps to get it done.</p>
                </div>
              </div>

              <div class="scope-feature-item">
                <div class="scope-feature-icon">⏱️</div>
                <div class="scope-feature-text">
                  <h5>Honest Timelines & Sizing</h5>
                  <p>Get a realistic, phased roadmap from rapid prototype to a fully polished, production-ready build.</p>
                </div>
              </div>

              <div class="scope-feature-item">
                <div class="scope-feature-icon">🛠️</div>
                <div class="scope-feature-text">
                  <h5>Handcrafted Quality</h5>
                  <p>Clean, maintainable code written specifically for your needs—no bloated templates or throwaway shortcuts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ABOUT THE MAKER -->
      <section id="about" class="about-section">
        <div class="container">
          <div class="about-card">
            <div class="about-grid">
              <div class="about-bio">
                <span class="section-tag">Behind The Screen</span>
                <h3>Hey, I'm Daniel.</h3>
                <p>
                  I'm an independent developer and software craftsman based in California. I love building 
                  things with physical weight and genuine character—whether that's fine-tuning 
                  <strong>Keplerian orbital mechanics</strong> for spacecraft, composing 
                  <strong>interactive musical instruments</strong>, or designing <strong>tactile games and tabletop tools</strong>.
                </p>
                <p>
                  I'm also a proud dad of two little boys. My oldest is 3, so we haven't quite started running tabletop 
                  campaigns together yet—most of my downtime between code commits is spent changing diapers and chasing toddlers.
                </p>
                <p>
                  Every project in this workshop is built with care, clean code, and zero corporate artificiality.
                </p>
              </div>

              <div class="craft-pillars">
                <div class="pillar-item">
                  <div class="pillar-icon">🪐</div>
                  <div class="pillar-content">
                    <h4>Orbital Physics & Math</h4>
                    <p>Analytical orbital propagation, patched conics, gravity wells, and dynamic solar systems.</p>
                  </div>
                </div>

                <div class="pillar-item">
                  <div class="pillar-icon">🎲</div>
                  <div class="pillar-content">
                    <h4>Tabletop & Game Mechanics</h4>
                    <p>Tavern gambling rules, probability models, combat encounters, and soundboards for DMs.</p>
                  </div>
                </div>

                <div class="pillar-item">
                  <div class="pillar-icon">⚡</div>
                  <div class="pillar-content">
                    <h4>High-Fidelity Web Tech</h4>
                    <p>Clean TypeScript, HTML5 Canvas, Web Audio API, and zero-bloat modern web architectures.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SITE FOOTER -->
      <footer class="site-footer">
        <div class="container footer-inner">
          <div class="footer-brand">
            <span class="mono" style="color: var(--accent-gold);">[VP]</span>
            <span>Vibing Projects — Handcrafted by Daniel Abrams</span>
          </div>

          <ul class="footer-links">
            <li><a href="https://github.com/kenttk421" target="_blank" rel="noopener noreferrer">GitHub Profile</a></li>
            <li><a href="#flagship">The Final Plunge</a></li>
            <li><a href="#projects">Projects Catalog</a></li>
            <li><a href="#scope-calculator">Software Scope Calculator</a></li>
          </ul>

          <div>
            <span>© ${new Date().getFullYear()} Vibing Projects // Crafted with good vibes.</span>
          </div>
        </div>
      </footer>

    </div>
  `;

  // Initialize Canvases
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas) {
    initConstellationCanvas(heroCanvas);
  }

  const diceCanvas = document.getElementById('diceCanvas');
  if (diceCanvas) {
    initDiceCanvas(diceCanvas);
  }
}

// Boot application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
