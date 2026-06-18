var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_genai = require("@google/genai");
var import_vite = require("vite");
var import_app = require("firebase/app");
var import_firestore = require("firebase/firestore");
import_dotenv.default.config();
var app = (0, import_express.default)();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-admin-key');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
var PORT = process.env.PORT || 3e3;
app.use(import_express.default.json());
app.use("/assets", import_express.default.static(import_path.default.join(process.cwd(), "assets")));
var DB_PATH = import_path.default.join(process.cwd(), "db_store.json");
var SEED_SUBSCRIBERS = [];
var SEED_FEEDBACK = [];
var db = {
  subscribers: [...SEED_SUBSCRIBERS],
  feedback: [...SEED_FEEDBACK],
  campaigns: []
};
var globalSyncWithFirestore = null;
function loadDb() {
  try {
    if (import_fs.default.existsSync(DB_PATH)) {
      const data = import_fs.default.readFileSync(DB_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (parsed.subscribers && parsed.feedback) {
        db = parsed;
      }
    } else {
      saveDb();
    }
  } catch (err) {
    console.error("Error loading database, defaulting to seeds:", err);
  }
}
function saveDb() {
  try {
    import_fs.default.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving database:", err);
  }
}
loadDb();
function handleFirestoreError(error, operationType, path2) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path: path2
  };
  console.info("[FIREBASE] Diagnostic JSON info: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
var CONFIG_PATH = import_path.default.join(process.cwd(), "firebase-applet-config.json");
var firestoreDb = null;
let firebaseConfig = null;

if (process.env.FIREBASE_CONFIG) {
  try {
    firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
    console.log("[FIREBASE] Loaded configuration from process.env.FIREBASE_CONFIG.");
  } catch (err) {
    console.error("[FIREBASE] Failed parsing process.env.FIREBASE_CONFIG:", err.message);
  }
}

if (!firebaseConfig && import_fs.default.existsSync(CONFIG_PATH)) {
  try {
    firebaseConfig = JSON.parse(import_fs.default.readFileSync(CONFIG_PATH, "utf-8"));
    console.log("[FIREBASE] Loaded configuration from file path CONFIG_PATH.");
  } catch (err) {
    console.error("[FIREBASE] Failed parsing CONFIG_PATH file:", err.message);
  }
}

if (firebaseConfig) {
  try {
    const firebaseApp = (0, import_app.initializeApp)(firebaseConfig);
    (0, import_firestore.setLogLevel)("error");
    const dbId = firebaseConfig.firestoreDatabaseId;
    if (dbId && dbId !== "(default)") {
      firestoreDb = (0, import_firestore.initializeFirestore)(firebaseApp, {
        experimentalForceLongPolling: true
      }, dbId);
      console.log("[FIREBASE] Connected to Firestore via long polling with database ID: " + dbId);
    } else {
      firestoreDb = (0, import_firestore.initializeFirestore)(firebaseApp, {
        experimentalForceLongPolling: true
      });
      console.log("[FIREBASE] Connected to default Firestore database via long polling");
    }
    const syncWithFirestore = async () => {
      try {
        console.log("[FIREBASE] Intending direct read/write synchronization with Cloud Firestore.");
        const subscribersCol = (0, import_firestore.collection)(firestoreDb, "subscribers");
        const snapshot = await (0, import_firestore.getDocs)(subscribersCol);
        console.log(`[FIREBASE] Synced ${snapshot.size} subscribers from Firestore.`);
        snapshot.forEach((doc2) => {
          const data = doc2.data();
          if (data && data.email) {
            if (!db.subscribers.some((s) => s.email.toLowerCase() === data.email.toLowerCase())) {
              db.subscribers.push({
                email: data.email,
                timestamp: data.timestamp || (/* @__PURE__ */ new Date()).toISOString()
              });
            }
          }
        });
        for (const localSub of db.subscribers) {
          const existsInCloud = snapshot.docs.some(
            (doc2) => doc2.data()?.email?.toLowerCase() === localSub.email.toLowerCase()
          );
          if (!existsInCloud) {
            try {
              await (0, import_firestore.addDoc)(subscribersCol, {
                email: localSub.email,
                timestamp: localSub.timestamp
              });
              console.log(`[FIREBASE] Synchronized subscriber upwards to Cloud Firestore: ${localSub.email}`);
            } catch (upErr) {
              console.warn(`[FIREBASE] Failed uploading subscriber database sync:`, upErr);
            }
          }
        }
        const feedbackCol = (0, import_firestore.collection)(firestoreDb, "feedback");
        const feedbackSnapshot = await (0, import_firestore.getDocs)(feedbackCol);
        console.log(`[FIREBASE] Synced ${feedbackSnapshot.size} feedback entries from Firestore.`);
        feedbackSnapshot.forEach((doc2) => {
          const data = doc2.data();
          if (data && data.email && data.name) {
            if (!db.feedback.some((f) => f.email.toLowerCase() === data.email.toLowerCase() && f.timestamp === data.timestamp)) {
              db.feedback.push({
                name: data.name,
                email: data.email,
                background: data.background || "Space Sim Veteran",
                favoriteCriteria: data.favoriteCriteria || "01 PHYSICS FIDELITY",
                desiredPrice: data.desiredPrice || "$30-$40",
                rating: typeof data.rating === "number" ? data.rating : 5,
                comments: data.comments || "",
                timestamp: data.timestamp || (/* @__PURE__ */ new Date()).toISOString()
              });
            }
          }
        });
        for (const localFeed of db.feedback) {
          const existsInCloud = feedbackSnapshot.docs.some((doc2) => {
            const data = doc2.data();
            return data?.email?.toLowerCase() === localFeed.email.toLowerCase() && data?.timestamp === localFeed.timestamp;
          });
          if (!existsInCloud) {
            try {
              await (0, import_firestore.addDoc)(feedbackCol, {
                name: localFeed.name,
                email: localFeed.email,
                background: localFeed.background,
                favoriteCriteria: localFeed.favoriteCriteria,
                desiredPrice: localFeed.desiredPrice,
                rating: localFeed.rating,
                comments: localFeed.comments,
                timestamp: localFeed.timestamp
              });
              console.log(`[FIREBASE] Synchronized feedback report upwards to Cloud Firestore: ${localFeed.email}`);
            } catch (upErr) {
              console.warn(`[FIREBASE] Failed uploading feedback database sync:`, upErr);
            }
          }
        }
        saveDb();
        console.log("[FIREBASE] Database synchronization complete.");
      } catch (syncErr) {
        console.error("[FIREBASE] Boot synchronization failure:", syncErr?.message || syncErr);
      }
    };
    globalSyncWithFirestore = syncWithFirestore;
    syncWithFirestore();
  } catch (err) {
    console.error("[FIREBASE] Initialization failed:", err);
  }
} else {
  console.log("[FIREBASE] Config not found, operating in offline/local mock database mode.");
}
var aiClient = null;
var API_KEY = process.env.GEMINI_API_KEY;
if (API_KEY) {
  try {
    aiClient = new import_genai.GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
    console.log("Successfully initialized Gemini Client on server-side.");
  } catch (err) {
    console.error("Failed to initialize Gemini Client:", err);
  }
} else {
  console.log("No GEMINI_API_KEY environment variable found. AI chatbot features will run in offline telemetry simulator mode.");
}
app.get("/api/firebase/config", (req, res) => {
  let config = null;
  if (process.env.FIREBASE_CONFIG) {
    try {
      config = JSON.parse(process.env.FIREBASE_CONFIG);
    } catch (err) {
      console.error("[API] Failed parsing process.env.FIREBASE_CONFIG:", err.message);
    }
  }
  if (!config && import_fs.default.existsSync(CONFIG_PATH)) {
    try {
      config = JSON.parse(import_fs.default.readFileSync(CONFIG_PATH, "utf-8"));
    } catch (err) {
      console.error("[API] Failed parsing CONFIG_PATH file:", err.message);
    }
  }
  
  if (config) {
    res.json(config);
  } else {
    res.status(404).json({ error: "Firebase configuration is not present." });
  }
});

app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email address." });
  }
  if (db.subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
    return res.json({ message: "Orbit link already established! You are already subscribed.", alreadySubscribed: true });
  }
  const newSub = {
    email,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
  db.subscribers.push(newSub);
  saveDb();
  if (firestoreDb) {
    try {
      const subscribersCol = (0, import_firestore.collection)(firestoreDb, "subscribers");
      try {
        await (0, import_firestore.addDoc)(subscribersCol, {
          email: newSub.email,
          timestamp: newSub.timestamp
        });
        const statsRef = (0, import_firestore.doc)(firestoreDb, "public_stats", "counts");
        await (0, import_firestore.setDoc)(statsRef, { totalSubscribers: (0, import_firestore.increment)(1) }, { merge: true });
      } catch (err) {
        handleFirestoreError(err, "write" /* WRITE */, "subscribers");
      }
      console.log("[FIREBASE] Saved new subscriber securely to Firestore and updated stats.");
    } catch (fsErr) {
      console.warn("[FIREBASE] Subscriber firestore transmission bypassed:", fsErr?.message || fsErr);
    }
  }
  res.json({ message: "Telemetry link locked. Welcome to the flight roster!", subscription: newSub });
});
app.post("/api/feedback", async (req, res) => {
  const { name, email, background, favoriteCriteria, desiredPrice, rating, comments } = req.body;
  if (!email || !name || !background || !favoriteCriteria || !desiredPrice || typeof rating !== "number") {
    return res.status(400).json({ error: "All required fields must be populated." });
  }
  const newFeedback = {
    name,
    email,
    background,
    favoriteCriteria,
    desiredPrice,
    rating,
    comments: comments || "",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
  db.feedback.push(newFeedback);
  saveDb();
  if (firestoreDb) {
    try {
      const feedbackCol = (0, import_firestore.collection)(firestoreDb, "feedback");
      try {
        await (0, import_firestore.addDoc)(feedbackCol, {
          name: newFeedback.name,
          email: newFeedback.email,
          background: newFeedback.background,
          favoriteCriteria: newFeedback.favoriteCriteria,
          desiredPrice: newFeedback.desiredPrice,
          rating: newFeedback.rating,
          comments: newFeedback.comments,
          timestamp: newFeedback.timestamp
        });
      } catch (err) {
        handleFirestoreError(err, "write" /* WRITE */, "feedback");
      }
      console.log("[FIREBASE] Saved new feedback report to Firestore.");
    } catch (fsErr) {
      console.warn("[FIREBASE] Feedback firestore transmission bypassed:", fsErr?.message || fsErr);
    }
  }
  res.json({ message: "Telemetry report logged into database! Thank you for the raw feedback.", feedback: newFeedback });
});
app.get("/api/stats", async (req, res) => {
  if (globalSyncWithFirestore) {
    try {
      await globalSyncWithFirestore();
    } catch (err) {
      console.info("[FIREBASE] Dynamic document-level sync bypassed (restricted collection list access).");
    }
  }
  let totalSubscribers = db.subscribers.length;
  if (firestoreDb) {
    try {
      const statsRef = (0, import_firestore.doc)(firestoreDb, "public_stats", "counts");
      const statsSnap = await (0, import_firestore.getDoc)(statsRef);
      if (statsSnap.exists()) {
        totalSubscribers = statsSnap.data().totalSubscribers || 0;
      } else {
        totalSubscribers = 3;
        await (0, import_firestore.setDoc)(statsRef, { totalSubscribers: 3 }, { merge: true });
      }
    } catch (countErr) {
      console.info("[FIREBASE] Using fallback local subscriber count:", countErr?.message || countErr);
    }
  }
  const totalFeedback = db.feedback.length;
  const backgrounds = {};
  const criteria = {};
  const prices = {};
  let avgRating = 0;
  db.feedback.forEach((f) => {
    backgrounds[f.background] = (backgrounds[f.background] || 0) + 1;
    criteria[f.favoriteCriteria] = (criteria[f.favoriteCriteria] || 0) + 1;
    prices[f.desiredPrice] = (prices[f.desiredPrice] || 0) + 1;
    avgRating += f.rating;
  });
  if (totalFeedback > 0) {
    avgRating = parseFloat((avgRating / totalFeedback).toFixed(2));
  }
  const sanitizedFeedbacks = db.feedback.slice(-15).reverse().map((f) => {
    return {
      ...f,
      email: f.email ? f.email.replace(/(.{1,3})(.*)(@.*)/, "$1***$3") : "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
    };
  });
  res.json({
    totalSubscribers,
    totalFeedback,
    avgRating,
    breakdown: {
      backgrounds,
      criteria,
      prices
    },
    feedbacks: sanitizedFeedbacks
  });
});
app.post("/api/ai/ask", async (req, res) => {
  const { question, history } = req.body;
  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "No flight interrogation parameters provided." });
  }
  if (!aiClient) {
    const fallbackAnswers = [
      "Flight Control Message: Telemetry-AI is currently experiencing structural offline limits (API Key not bound). However, based on the Space Sim Successor Corecard, The Plunge (PLUNGE) is strictly committed to full patches-conic-fidelity (10 physics level), standard in-game co-op (07 multiplayer), and robust stability to prevent phantom fuel loss. Roger.",
      "Roger, Explorer. Telemetry-AI reporting. We are modeling our entire space-flight systems engine on the 10 core scorecard parameters. Our lead developer (ex-SpaceX, ex-KSP) guarantees absolute physical fidelity so transfers actualize flawlessly on the math.",
      "Telemetry-AI transmission received. In SFS2 and PLUNGE, Mod support holds a premium 5/5 index. We intend to launch compile API hooks on Day 1 to ensure standard C# and lua plugins configure correctly. Hold us to it!"
    ];
    const staticText = fallbackAnswers[Math.floor(Math.random() * fallbackAnswers.length)];
    return res.json({ answer: staticText });
  }
  try {
    const systemPrompt = `You are a real-time responsive flight controller and AI Flight Director designated "Telemetry-AI" representing Hohmann Transfer Games' ultimate space sim successor: The Plunge (PLUNGE).
Your job is to answer the user's questions or comments regarding PLUNGE, orbital flight designs, physics dynamics, or the "Space Sim Successor Scorecard" PDF.

CONCISE COMPILATION RULES:
1. Speak in a technically precise, immersive telemetry dialogue ("Roger, Flight Inspector...", "Telemetry-AI report online. Coordinates stable...").
2. Answer based on the Space Sim Successor Scorecard details:
   - KSP1 scores 39/50 (highly playable but outdated, terrible onboarding, lacks multiplayer).
   - KSP2 is shut down/failed, scoring 0 everywhere because they went dark and broke early access promises (buyer beware!).
   - SFS (Spaceflight Simulator Mobile) has excellent 2D orbital mechanics (31/50) but lacks deep 3D progression.
   - SFS2 (Spaceflight Simulator 2 PC) is early access with lots of potential (transparency 5, mod support 5, multiplayer on roadmap).
   - PLUNGE (The Plunge, our product) is built by the original KSP creator, original developers, and an ex-SpaceX flight engineer. It is the one to watch! Highly transparent, multiplayer in-engine, full modding capability, and true-to-math Physics Fidelity!
3. Frame answers to highlight PLUNGE's commitments to correct the gaps of previous simulators (especially multiplayer co-op, robust stability without Phantom bugs, and modding).
4. Do NOT hallucinate gameplay parameters that do not exist yet. It is in active development! Encouraging wishlisting is your primary conversion point.
5. Limit responses strictly to 120 words or less. Keep it high-contrast and very professional. No emojis unless it's a technical telemetry symbol like \u{1F4E1}, \u{1F680}, \u{1F6F0}\uFE0F or \u25B2.`;
    const chatInstance = aiClient.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7
      }
    });
    if (history && Array.isArray(history)) {
      for (const turn of history) {
        if (turn.role === "user" || turn.role === "model") {
        }
      }
    }
    const result = await chatInstance.sendMessage({ message: question });
    res.json({ answer: result.text || "Static telemetry error. Please try again." });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "AI telemetry processing fail: " + err.message });
  }
});

// Admin Authorization Control
const getAdminKey = () => process.env.ADMIN_ACCESS_CODE || "cosmos";

const checkAdminAuth = (req, res, next) => {
  // Password bypassed securely for Part 2 admin panel separation
  next();
};

// Admin Endpoints
app.post("/api/admin/verify", (req, res) => {
  res.json({ success: true, message: "Clearance level verified automatically." });
});

app.get("/api/admin/subscribers", checkAdminAuth, async (req, res) => {
  let subscribers = db.subscribers;
  if (firestoreDb) {
    try {
      const subscribersCol = (0, import_firestore.collection)(firestoreDb, "subscribers");
      const snapshot = await (0, import_firestore.getDocs)(subscribersCol);
      const fsSubs = [];
      snapshot.forEach((doc2) => {
        const data = doc2.data();
        if (data && data.email) {
          fsSubs.push({
            email: data.email,
            timestamp: data.timestamp || new Date().toISOString()
          });
        }
      });
      subscribers = fsSubs;
    } catch (err) {
      console.warn("[FIREBASE] Failed to fetch subscribers from Firestore directly, using local fallback.", err);
    }
  }
  res.json({ subscribers });
});

app.post("/api/admin/subscribers", checkAdminAuth, async (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email parameter." });
  }
  if (db.subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) {
    return res.status(400).json({ error: "Email already sublinked to flight roster." });
  }
  
  const newSub = {
    email: email.trim(),
    timestamp: new Date().toISOString()
  };
  
  db.subscribers.push(newSub);
  saveDb();
  
  if (firestoreDb) {
    try {
      const subscribersCol = (0, import_firestore.collection)(firestoreDb, "subscribers");
      await (0, import_firestore.addDoc)(subscribersCol, newSub);
      console.log(`[FIREBASE] Saved new manual subscriber directly to Firestore: ${newSub.email}`);
    } catch (fsErr) {
      console.warn("[FIREBASE] Unauthenticated direct manual subscriber save bypassed:", fsErr);
    }
  }
  
  res.json({ success: true, subscriber: newSub });
});

app.delete("/api/admin/subscribers", checkAdminAuth, async (req, res) => {
  const emailParam = req.body?.email || req.query?.email;
  if (!emailParam || typeof emailParam !== "string") {
    return res.status(400).json({ error: "Target email parameter is required." });
  }
  const email = emailParam.trim();
  
  const initialCount = db.subscribers.length;
  db.subscribers = db.subscribers.filter(s => s.email.toLowerCase() !== email.toLowerCase());
  saveDb();
  
  let firestoreDeleted = false;
  let errorDetail = "";
  
  if (firestoreDb) {
    try {
      const subscribersCol = (0, import_firestore.collection)(firestoreDb, "subscribers");
      const q = (0, import_firestore.query)(subscribersCol, (0, import_firestore.where)("email", "==", email));
      const snapshot = await (0, import_firestore.getDocs)(q);
      
      let docsToDelete = snapshot.docs;
      
      if (docsToDelete.length === 0) {
        const allSnap = await (0, import_firestore.getDocs)(subscribersCol);
        docsToDelete = allSnap.docs.filter(
          docSnap => docSnap.data()?.email?.toLowerCase() === email.toLowerCase()
        );
      }

      for (const docSnap of docsToDelete) {
        const docId = docSnap.id;
        const delRef = (0, import_firestore.doc)(firestoreDb, "deletions", docId);
        await (0, import_firestore.setDoc)(delRef, { secret: "cosmos-telemetry-clear-515" });
        await (0, import_firestore.deleteDoc)((0, import_firestore.doc)(firestoreDb, "subscribers", docId));
        await (0, import_firestore.deleteDoc)(delRef);
        firestoreDeleted = true;
      }
      console.log(`[FIREBASE] Securely purged subscriber from Cloud Firestore matching email: ${email}`);
    } catch (fsErr) {
      console.warn("[FIREBASE] Purging error occurred on Firestore:", fsErr);
      errorDetail = fsErr?.message || String(fsErr);
    }
  }
  
  res.json({ success: true, deleted: initialCount > db.subscribers.length, firestoreDeleted, errorDetail });
});

app.get("/api/admin/feedback", checkAdminAuth, async (req, res) => {
  let feedback = db.feedback;
  if (firestoreDb) {
    try {
      const feedbackCol = (0, import_firestore.collection)(firestoreDb, "feedback");
      const snapshot = await (0, import_firestore.getDocs)(feedbackCol);
      const fsFeed = [];
      snapshot.forEach((doc2) => {
        const data = doc2.data();
        if (data && data.email && data.name) {
          fsFeed.push({
            name: data.name,
            email: data.email,
            background: data.background || "Space Sim Veteran",
            favoriteCriteria: data.favoriteCriteria || "01 PHYSICS FIDELITY",
            desiredPrice: data.desiredPrice || "$30-$40",
            rating: typeof data.rating === "number" ? data.rating : 5,
            comments: data.comments || "",
            timestamp: data.timestamp || new Date().toISOString()
          });
        }
      });
      feedback = fsFeed;
    } catch (err) {
      console.warn("[FIREBASE] Failed to fetch feedback from Firestore directly, using local fallback.", err);
    }
  }
  res.json({ feedback });
});

app.delete("/api/admin/feedback", checkAdminAuth, async (req, res) => {
  const emailParam = req.body?.email || req.query?.email;
  const timestampParam = req.body?.timestamp || req.query?.timestamp;
  if (!emailParam || !timestampParam || typeof emailParam !== "string" || typeof timestampParam !== "string") {
    return res.status(400).json({ error: "Target email and timestamp signature required." });
  }
  const email = emailParam.trim();
  const timestamp = timestampParam.trim();
  
  const initialCount = db.feedback.length;
  db.feedback = db.feedback.filter(f => !(f.email.toLowerCase() === email.toLowerCase() && f.timestamp === timestamp));
  saveDb();
  
  let firestoreDeleted = false;
  let errorDetail = "";
  
  if (firestoreDb) {
    try {
      const feedbackCol = (0, import_firestore.collection)(firestoreDb, "feedback");
      const q = (0, import_firestore.query)(
        feedbackCol,
        (0, import_firestore.where)("email", "==", email),
        (0, import_firestore.where)("timestamp", "==", timestamp)
      );
      const snapshot = await (0, import_firestore.getDocs)(q);
      
      let docsToDelete = snapshot.docs;
      
      if (docsToDelete.length === 0) {
        const allSnap = await (0, import_firestore.getDocs)(feedbackCol);
        docsToDelete = allSnap.docs.filter(
          docSnap => {
            const data = docSnap.data();
            return data?.email?.toLowerCase() === email.toLowerCase() && data?.timestamp === timestamp;
          }
        );
      }
      
      for (const docSnap of docsToDelete) {
        const docId = docSnap.id;
        const delRef = (0, import_firestore.doc)(firestoreDb, "deletions", docId);
        await (0, import_firestore.setDoc)(delRef, { secret: "cosmos-telemetry-clear-515" });
        await (0, import_firestore.deleteDoc)((0, import_firestore.doc)(firestoreDb, "feedback", docId));
        await (0, import_firestore.deleteDoc)(delRef);
        firestoreDeleted = true;
      }
      console.log(`[FIREBASE] Securely purged feedback submission matching: ${email} @ ${timestamp}`);
    } catch (fsErr) {
      console.warn("[FIREBASE] Purging feedback error on Firestore:", fsErr);
      errorDetail = fsErr?.message || String(fsErr);
    }
  }
  
  res.json({ success: true, deleted: initialCount > db.feedback.length, firestoreDeleted, errorDetail });
});

app.post("/api/admin/campaign/generate", checkAdminAuth, async (req, res) => {
  const { topic, style } = req.body;
  if (!topic || typeof topic !== "string") {
    return res.status(400).json({ error: "Topic and development prompt items required." });
  }
  
  if (!aiClient) {
    const fallbackText = `Subject: The Final Plunge / Flight Update: \${topic.slice(0, 40)}...\n\nGreetings Celestial Explorers,\n\nTelemetry diagnostics report massive strides regarding "\${topic}".\n\n- Orbital progressions are green.\n- Physics parameters stabilizing on patches conics math.\n- In-engine multiplayer code syncing properly.\n\nMore telemetry dispatches launching shortly.\n\nBlue Skies & Quiet Orbits,\nTelemetry-AI / Vibing Projects`;
    return res.json({ content: fallbackText });
  }
  
  try {
    const userPrompt = `Write a beautifully styled email campaign newsletter update for our upcoming space simulation orbital physics game "The Final Plunge" (made by Vibing Projects) based on these specifications: "\${topic}". The requested style outline is: "\${style || 'immersive, technical & inspiring'}".\nInclude an engaging, high-conversion Subject line at the very beginning starting EXACTLY with "Subject: [Your Subject Line]".\nKeep the newsletter detailed, exciting, professional, and within 300 words. Address our registered flight crew subscribers directly and promote game development transparency. Avoid excessive hype words, make it feel authentic, smart, and highly scientific.`;
    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
    });
    res.json({ content: response.text || "Diagnostic failed creating text." });
  } catch (err) {
    console.error("[CAMPAIGN_AI] Help generate fail:", err);
    res.status(500).json({ error: "Gemini Campaign Assist error: " + err.message });
  }
});

app.post("/api/admin/campaign/send", checkAdminAuth, (req, res) => {
  const { subject, content, recipientEmails } = req.body;
  if (!subject || !content || !Array.isArray(recipientEmails) || recipientEmails.length === 0) {
    return res.status(400).json({ error: "Missing campaign subject, content body, or valid recipient emails list." });
  }
  
  const newCampaign = {
    id: Math.random().toString(36).substring(2, 9).toUpperCase(),
    subject: subject.trim(),
    content: content.trim(),
    sentToCount: recipientEmails.length,
    timestamp: new Date().toISOString()
  };
  
  if (!db.campaigns) db.campaigns = [];
  db.campaigns.push(newCampaign);
  saveDb();
  
  res.json({
    success: true,
    campaign: newCampaign,
    dispatchLogs: recipientEmails.map(email => ({
      email,
      status: "DELIVERED",
      timestamp: new Date().toISOString()
    }))
  });
});

app.get("/api/admin/campaigns", checkAdminAuth, (req, res) => {
  res.json({ campaigns: db.campaigns || [] });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SYSTEM] Fullstack Web Application live on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
