// ============================================================
// PINTEREST TITLE GENERATOR — PRODUCTION VERSION
// Elevate Living Co
// ============================================================

"use strict";

// ============================================================
// CONSTANTS
// ============================================================

const SEMANTIC_WORD_BANKS = {
  aestheticWords: [
    "Aesthetic", "Dreamy", "Stunning", "Visual", "Elegant",
    "Minimalist", "Inspiring", "Pinterest-Worthy", "Curated", "Beautiful"
  ],
  luxuryWords: [
    "Luxury", "Premium", "Elegant", "Sophisticated", "Upscale",
    "High-End", "Refined", "Exclusive", "Opulent", "Timeless"
  ],
  urgencyWords: [
    "Trending", "Viral", "Must-See", "Don't Miss", "Hot Right Now",
    "Blowing Up", "Everyone's", "All Over", "This Season", "This Week"
  ],
  emotionalWords: [
    "Obsessed", "Addictive", "Genius", "Life-Changing", "Mind-Blowing",
    "Breathtaking", "Gorgeous", "Irresistible", "Stunning", "Amazing"
  ],
  productivityWords: [
    "Efficient", "Smart", "Proven", "Effective", "Organized",
    "Streamlined", "Optimized", "Productive", "Powerful", "Strategic"
  ],
  cozyWords: [
    "Cozy", "Warm", "Comfortable", "Inviting", "Snug",
    "Homey", "Relaxing", "Peaceful", "Serene", "Restful"
  ],
  pinterestNativeWords: [
    "Ideas", "Inspo", "Guide", "Tutorial", "Tips",
    "Hacks", "Secrets", "Tricks", "Save This", "DIY"
  ],
  creatorWords: [
    "Creator", "Inspired", "Designed", "Crafted", "Curated",
    "Thoughtful", "Intentional", "Authentic", "Unique", "Original"
  ],
  engagementWords: [
    "Save This", "Pin Now", "Share", "Tag A Friend", "Tell Us",
    "Let Us Know", "Comment Below", "Drop A Pin", "Love This", "Bookmark"
  ],
  curiosityWords: [
    "Discover", "Uncover", "Reveal", "Secret", "Hidden",
    "Shocking", "Surprising", "Unexpected", "The Truth About", "Finally"
  ],
  minimalistWords: [
    "Minimalist", "Clean", "Simple", "Essential", "Simplified",
    "Streamlined", "Decluttered", "Modern", "Scandinavian", "Zen"
  ]
};

const INTENT_TEMPLATES = {
  luxury: [
    "Luxury {keyword}: {number} Elegant Ideas",
    "{number} Upscale {keyword} Inspo for Premium Living",
    "High-End {keyword} That Feel Expensive",
    "Sophisticated {keyword} for Refined Taste",
    "{keyword} Aesthetics: {number} Luxury Ideas",
    "Timeless {keyword}: {number} Classic Designs",
    "Elevated {keyword} for Discerning Creators",
    "{number} Premium {keyword} Inspirations",
    "Luxury Living: {keyword} Ideas You'll Love",
    "The Art of {keyword}: {number} Refined Ideas"
  ],
  aesthetic: [
    "{keyword} Aesthetic: {number} Inspo Ideas",
    "{number} Beautiful {keyword} You'll Save Forever",
    "Curated {keyword} Inspo for Your Vibe",
    "Pinterest-Worthy {keyword} Ideas",
    "{number} Stunning {keyword} Aesthetics",
    "Visual {keyword} Inspo That Inspires",
    "{keyword}: {number} Mood-Board Ideas",
    "Dreamy {keyword} You'll Want to Pin",
    "{number} Gorgeous {keyword} Concepts",
    "Aesthetic {keyword}: {number} Beautiful Ideas"
  ],
  cozy: [
    "Cozy {keyword} Ideas You'll Adore",
    "{number} Warm {keyword} Inspo",
    "Create Comfort: {keyword} Ideas",
    "{number} Inviting {keyword} Designs",
    "Cozy Living: {keyword} Inspo",
    "Warm & Welcoming {keyword} Ideas",
    "{number} Peaceful {keyword} Aesthetics",
    "The Coziest {keyword} Ideas",
    "Snug & Comfortable: {keyword}",
    "{number} Serene {keyword} Inspirations"
  ],
  minimalist: [
    "Minimalist {keyword}: {number} Clean Ideas",
    "{number} Simple {keyword} for Modern Living",
    "Streamlined {keyword} Ideas",
    "Minimal {keyword}: {number} Essential Designs",
    "{number} Decluttered {keyword} Aesthetics",
    "Simple & Stylish: {keyword} Ideas",
    "Modern Minimal {keyword}: {number} Ideas",
    "Clean {keyword} That Look Expensive",
    "{number} Zen {keyword} Concepts",
    "Less Is More: {keyword} Ideas"
  ],
  productivity: [
    "{number} Productivity {keyword} Hacks",
    "Optimize Your {keyword} in {number} Steps",
    "Smart {keyword} Ideas for Efficiency",
    "{number} Proven {keyword} Systems",
    "Boost {keyword} With These {number} Tips",
    "Efficient {keyword} Setup Ideas",
    "{number} Powerful {keyword} Strategies",
    "Streamline Your {keyword}: {number} Ways",
    "Strategic {keyword} for Results",
    "{number} Game-Changing {keyword} Ideas"
  ],
  study: [
    "{number} Study {keyword} Ideas That Work",
    "Focus: {number} {keyword} Setup Ideas",
    "Productive {keyword} for Students",
    "{number} Study-Friendly {keyword} Designs",
    "Ultimate Study {keyword} Guide",
    "{number} Organized {keyword} Solutions",
    "Ace It: {keyword} Inspo for Success",
    "{number} Distraction-Free {keyword} Ideas",
    "Study Smart: {keyword} Tips",
    "Focused {keyword} for Better Results"
  ],
  smallspace: [
    "{number} Small {keyword} Ideas That Maximize Space",
    "Tiny {keyword}: {number} Space-Saving Ideas",
    "Apartment {keyword}: {number} Ideas",
    "{number} Clever {keyword} for Small Spaces",
    "Small Space {keyword} Solutions",
    "Maximize Your {keyword} in Tiny Spaces",
    "{number} Multifunctional {keyword} Ideas",
    "Studio {keyword}: {number} Ideas",
    "Compact {keyword} That Feel Spacious",
    "{number} Smart {keyword} for Small Living"
  ],
  gaming: [
    "Gaming {keyword}: {number} Setup Ideas",
    "{number} Epic {keyword} for Gamers",
    "Ultimate Gaming {keyword} Guide",
    "Streamer {keyword}: {number} Ideas",
    "{number} Next-Level Gaming {keyword}",
    "Pro Gaming {keyword} Setups",
    "Gaming Station {keyword} Ideas",
    "{number} Immersive {keyword} Designs",
    "Level Up Your {keyword}",
    "{number} Professional Gaming {keyword} Ideas"
  ],
  wedding: [
    "{number} {keyword} Ideas for Your Wedding",
    "Gorgeous {keyword} for Big Day Inspo",
    "{number} Wedding {keyword} Inspirations",
    "Dreamy {keyword} for Weddings",
    "{number} Elegant {keyword} Wedding Ideas",
    "Wedding Planning: {keyword} Inspo",
    "Romantic {keyword} Ideas",
    "{number} Pinterest-Worthy {keyword} for Weddings",
    "Picture-Perfect {keyword} Ideas",
    "{number} Stunning {keyword} Wedding Inspo"
  ],
  fashion: [
    "{number} {keyword} Ideas You'll Love",
    "Style Inspo: {keyword} Ideas",
    "{number} Trendy {keyword} Looks",
    "Fashion {keyword}: {number} Ideas",
    "{number} Chic {keyword} Inspirations",
    "Wear {keyword} Like A Pro",
    "{number} Gorgeous {keyword} Outfits",
    "{keyword} Aesthetic: {number} Ideas",
    "{number} Fashion-Forward {keyword}",
    "Slay: {number} {keyword} Ideas"
  ],
  beauty: [
    "{number} {keyword} Ideas for Glowing Skin",
    "Beauty {keyword}: {number} Tips",
    "{number} Professional {keyword} Looks",
    "Get Ready: {keyword} Ideas",
    "Gorgeous {keyword} Tutorials",
    "{number} Stunning {keyword} Inspo",
    "Master {keyword} in {number} Steps",
    "{number} Trending {keyword} Looks",
    "Self-Care {keyword} Ideas",
    "{number} Beautiful {keyword} Inspirations"
  ],
  business: [
    "{number} {keyword} Tips for Success",
    "Grow Your Business: {keyword}",
    "{number} Proven {keyword} Strategies",
    "Business {keyword} That Work",
    "{number} Smart {keyword} Ideas",
    "Entrepreneur {keyword} Hacks",
    "{number} Game-Changing {keyword}",
    "Scale Your Business: {keyword}",
    "{number} Strategic {keyword} Moves",
    "Business {keyword}: The Complete Guide"
  ],
  fitness: [
    "{number} {keyword} Workouts That Work",
    "Fitness {keyword}: {number} Ideas",
    "Get Fit: {keyword} Tips",
    "{number} Effective {keyword} Routines",
    "Transform: {keyword} in {number} Weeks",
    "{number} No-Equipment {keyword} Ideas",
    "Home {keyword} Routines",
    "Strength {keyword}: {number} Ideas",
    "{number} Quick {keyword} Workouts",
    "Achieve Goals: {keyword} Plan"
  ],
  food: [
    "{number} {keyword} Recipes You'll Make",
    "Delicious {keyword}: {number} Ideas",
    "{keyword} Inspo: {number} Easy Recipes",
    "{number} Trending {keyword} Ideas",
    "Food Inspo: {keyword}",
    "{number} {keyword} Ideas for Dinner",
    "Healthy {keyword} Recipes",
    "{number} Quick {keyword} Ideas",
    "Pinterest {keyword} Favorites",
    "{number} Must-Try {keyword} Ideas"
  ],
  diy: [
    "DIY {keyword}: {number} Easy Ideas",
    "{number} DIY {keyword} Projects",
    "Make {keyword} Yourself",
    "{number} Budget {keyword} DIY Ideas",
    "Craft {keyword}: {number} Tutorials",
    "DIY {keyword} for Beginners",
    "{number} Creative {keyword} Projects",
    "Homemade {keyword} Ideas",
    "{number} Simple {keyword} DIY Hacks",
    "Create Your Own {keyword}"
  ],
  homedecor: [
    "{number} {keyword} Ideas for Every Room",
    "Home Inspo: {keyword}",
    "{number} Beautiful {keyword} Designs",
    "Decorate With {keyword}: {number} Ideas",
    "{number} {keyword} That Transform Spaces",
    "Room Makeover: {keyword} Ideas",
    "{number} Stylish {keyword} Inspirations",
    "Interior {keyword}: {number} Ideas",
    "{number} Modern {keyword} Designs",
    "Home Sweet Home: {keyword} Ideas"
  ],
  creatoreconomy: [
    "{number} Creator {keyword} Tips",
    "Grow as a Creator: {keyword}",
    "{number} {keyword} Strategies for Success",
    "Creator {keyword} That Convert",
    "{number} Content {keyword} Ideas",
    "Build Your Brand: {keyword}",
    "{number} {keyword} for Content Creators",
    "Creator {keyword} Hacks",
    "{number} Proven {keyword} for Growth",
    "Level Up: {keyword} for Creators"
  ],
  blogging: [
    "{number} Blog {keyword} Tips",
    "Grow Your Blog: {keyword}",
    "{number} {keyword} Strategies for Bloggers",
    "Blog Traffic: {keyword} Ideas",
    "{number} Effective {keyword} for Blogs",
    "Blogger {keyword} That Convert",
    "{number} SEO {keyword} Tips",
    "Content {keyword}: {number} Ideas",
    "{number} {keyword} to Boost Traffic",
    "Blogging {keyword}: The Guide"
  ]
};

const NUMBERS = [5, 7, 9, 10, 12, 15, 20, 25, 30, 50];

const TRENDING_KEYWORDS = [
  "small bedroom ideas", "study table setup", "cozy apartment decor",
  "minimalist desk setup", "luxury bedroom aesthetic", "viral Pinterest room ideas",
  "small kitchen storage", "home office inspiration", "tiny apartment hacks",
  "modern living room"
];

const PINTEREST_TIPS = [
  "Use numbers in titles for higher CTR.",
  "Pinterest prefers emotional + descriptive wording.",
  "Titles between 40–70 characters perform best.",
  "Power words increase saves and clicks.",
  "Pinterest rewards fresh content consistency.",
  "Long-tail keywords rank faster.",
  "Aesthetic-focused words improve engagement.",
  "Pinterest SEO compounds over time."
];

const CONTENT_CLUSTERS = {
  pinterestSEO: [
    "how pinterest seo works", "best pinterest title formulas",
    "how to rank on pinterest", "pinterest keyword strategy",
    "pinterest algorithm explained", "viral pinterest strategy",
    "best pinterest niches", "pinterest trends 2026"
  ],
  blogging: [
    "blog traffic from pinterest", "affiliate marketing pinterest",
    "pinterest for bloggers", "content strategy pinterest",
    "how creators grow on pinterest", "seo blogging strategy",
    "passive traffic ideas"
  ],
  creatorEconomy: [
    "creator growth strategies", "small creator marketing",
    "creator seo tips", "how to grow online audience",
    "social media growth"
  ]
};

const BLOG_SUGGESTIONS = [
  { title: "How to Write Pinterest Titles That Get Clicks", category: "Pinterest SEO" },
  { title: "Pinterest Keyword Research for Beginners", category: "Keyword Strategy" },
  { title: "Best Pinterest Niches for Affiliate Marketing", category: "Affiliate Marketing" },
  { title: "Pinterest SEO Checklist for 2026", category: "SEO Strategy" },
  { title: "How Bloggers Drive Free Traffic From Pinterest", category: "Blogging" }
];

const ADVANCED_FAQS = [
  {
    question: "How long should Pinterest titles be?",
    answer: "Pinterest titles perform best between 40 and 70 characters. This improves readability and keyword optimization."
  },
  {
    question: "Do Pinterest titles affect SEO?",
    answer: "Yes. Pinterest titles strongly influence Pinterest search visibility, click-through rate, and content discoverability."
  },
  {
    question: "What words increase Pinterest clicks?",
    answer: "Power words like viral, aesthetic, easy, genius, luxury, cozy, and minimalist often improve engagement."
  },
  {
    question: "Can Pinterest titles rank on Google?",
    answer: "Yes. Pinterest pins can appear in Google image search and visual discovery results when optimized properly."
  }
];

const PROGRAMMATIC_TOPICS = [
  "small-bedroom-ideas", "minimalist-desk-setup", "cozy-room-decor",
  "luxury-kitchen-design", "tiny-apartment-storage", "study-room-ideas",
  "home-office-aesthetic"
];

// Gibberish detection whitelist — common short keywords
const GIBBERISH_WHITELIST = ["ai", "vr", "ux", "ui", "gym", "crypto", "nft", "diy"];

// ============================================================
// SESSION DATA
// ============================================================

const sessionData = {
  generatedCount: 0,
  copiedCount: 0,
  favoriteCount: 0,
  sessionStart: Date.now()
};

// ============================================================
// STATE
// ============================================================

let currentTitles = [];
let currentKeyword = "";
let validationMessage = "";

// ============================================================
// DOM REFERENCES
// ============================================================

const keywordInput     = document.getElementById("keyword-input");
const toneSelect       = document.getElementById("tone-select");
const generateBtn      = document.getElementById("generate-btn");
const resultsSection   = document.getElementById("results-section");
const titlesContainer  = document.getElementById("titles-container");
const historyContainer = document.getElementById("history-container");
const copyAllBtn       = document.getElementById("copy-all-btn");
const exportBtn        = document.getElementById("export-btn");
const mobileMenuBtn    = document.getElementById("mobile-menu-btn");
const mobileMenu       = document.getElementById("mobile-menu");
const validationBox    = document.getElementById("validation-message");

// ============================================================
// UTILITIES
// ============================================================

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function capitalizeWords(text) {
  return text.replace(/\b\w/g, c => c.toUpperCase());
}

function analyticsEvent(eventName, params = {}) {
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, { event_category: "engagement", ...params });
  }
}

function showValidationMessage(message, type = "error") {
  validationMessage = message;
  if (validationBox) {
    validationBox.innerHTML = `
      <div class="bg-${type === 'error' ? 'red' : 'blue'}-50 border border-${type === 'error' ? 'red' : 'blue'}-200 text-${type === 'error' ? 'red' : 'blue'}-700 px-4 py-3 rounded-lg text-sm">
        ${type === 'error' ? '❌' : 'ℹ️'} ${message}
      </div>`;
    setTimeout(() => {
      if (validationBox) validationBox.innerHTML = '';
    }, 5000);
  }
}

// ============================================================
// KEYWORD VALIDATION & CLEANING
// ============================================================

function isGibberish(keyword) {
  const trimmed = keyword.toLowerCase().trim();
  
  // Whitelist short keywords
  if (GIBBERISH_WHITELIST.includes(trimmed)) return false;
  
  // Reject purely numeric
  if (/^\d+$/.test(trimmed)) return true;
  
  // Reject excessive repeated characters
  if (/(.)\1{4,}/.test(trimmed)) return true;
  
  // For short keywords, allow them if they have vowels
  if (trimmed.length <= 3) {
    return !/[aeiou]/i.test(trimmed);
  }
  
  // For longer keywords, check vowel density (softer: 15% instead of 20%)
  const vowels = trimmed.match(/[aeiou]/gi) || [];
  if (vowels.length < trimmed.length * 0.15) return true;
  
  // Reject pure keyboard mashing patterns
  if (/^[^a-z]*$/.test(trimmed)) return true;
  
  return false;
}

function cleanKeyword(keyword) {
  return keyword
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z0-9\s\-&]/g, "")
    .split(" ")
    .filter((word, idx, arr) => arr.indexOf(word) === idx)
    .join(" ")
    .trim();
}

function validateKeyword(keyword) {
  const cleaned = cleanKeyword(keyword);
  
  if (!cleaned || cleaned.length < 2) {
    return { valid: false, message: "Please enter at least 2 characters." };
  }
  
  if (cleaned.length > 100) {
    return { valid: false, message: "Keyword is too long. Keep it under 100 characters." };
  }
  
  if (isGibberish(cleaned)) {
    return { valid: false, message: "This looks like gibberish. Try a real keyword like 'cozy bedroom' or 'study desk setup'." };
  }
  
  return { valid: true, cleaned };
}

// ============================================================
// KEYWORD INTENT DETECTION (ADVANCED)
// ============================================================

function detectKeywordIntent(keyword) {
  const lower = keyword.toLowerCase();
  
  // Luxury/Premium
  if (/luxury|premium|elegant|upscale|high.end|refined|sophisticated|opulent/i.test(lower)) return "luxury";
  
  // Aesthetic
  if (/aesthetic|dreamy|visual|inspo|mood.board|vibe|style|design/i.test(lower)) return "aesthetic";
  
  // Cozy
  if (/cozy|cosy|warm|comfortable|inviting|snug|homey|relaxing|peaceful/i.test(lower)) return "cozy";
  
  // Minimalist
  if (/minimal|minimalist|clean|simple|declutter|zen|modern|scandinavian/i.test(lower)) return "minimalist";
  
  // Productivity/Study
  if (/productivity|productive|study|desk|workspace|efficient|focus|organized/i.test(lower)) return "productivity";
  if (/study|exam|student|school|learning|thesis|course/i.test(lower)) return "study";
  
  // Small Space
  if (/small|tiny|apartment|studio|compact|maximize|space.saving/i.test(lower)) return "smallspace";
  
  // Gaming
  if (/gaming|gamer|stream|twitch|esports|console|pc.gaming/i.test(lower)) return "gaming";
  
  // Wedding
  if (/wedding|bride|groom|marriage|engagement|honeymoon|ceremony/i.test(lower)) return "wedding";
  
  // Fashion
  if (/fashion|outfit|clothes|style|wear|dress|wardrobe|look/i.test(lower)) return "fashion";
  
  // Beauty
  if (/beauty|makeup|skin|hair|cosmetics|skincare|glow|face/i.test(lower)) return "beauty";
  
  // Business
  if (/business|entrepreneurship|startup|growth|marketing|sales|strategy|leadership/i.test(lower)) return "business";
  
  // Fitness
  if (/fitness|workout|exercise|gym|health|training|diet|strength/i.test(lower)) return "fitness";
  
  // Food
  if (/recipe|food|cook|meal|cuisine|eating|dessert|breakfast|lunch|dinner/i.test(lower)) return "food";
  
  // DIY
  if (/diy|craft|make|build|project|tutorial|homemade/i.test(lower)) return "diy";
  
  // Home Decor
  if (/decor|decoration|interior|home|room|furniture|design|wall/i.test(lower)) return "homedecor";
  
  // Creator Economy
  if (/creator|content.creator|influencer|youtube|tiktok|instagram|grow.your|personal.brand/i.test(lower)) return "creatoreconomy";
  
  // Blogging
  if (/blog|blogger|content|traffic|seo|affiliate|passive.income/i.test(lower)) return "blogging";
  
  // Default to blogging
  return "blogging";
}

// ============================================================
// SCORING ENGINES (ENHANCED)
// ============================================================

function calculateCompositeScore(title, keyword) {
  let score = 0;
  
  // Length score (40-70 chars is sweet spot)
  const length = title.length;
  if (length >= 40 && length <= 70) score += 25;
  else if (length >= 35 && length <= 75) score += 15;
  
  // Power word bonus
  const powerWords = Object.values(SEMANTIC_WORD_BANKS).flat();
  const powerWordCount = powerWords.filter(w => title.toLowerCase().includes(w.toLowerCase())).length;
  score += Math.min(powerWordCount * 10, 25);
  
  // Number presence
  if (/\d/.test(title)) score += 15;
  
  // Keyword presence
  if (title.toLowerCase().includes(keyword.toLowerCase())) score += 20;
  
  // Question format
  if (title.includes("?")) score += 5;
  
  // Colon usage (helps structure)
  if (title.includes(":")) score += 5;
  
  return Math.min(score, 100);
}

function calculateCuriosity(title) {
  const curiosityTriggers = [
    "secret", "hidden", "reveal", "shocking", "surprising",
    "discover", "uncover", "finally", "truth", "nobody"
  ];
  
  let score = 0;
  curiosityTriggers.forEach(trigger => {
    if (title.toLowerCase().includes(trigger)) score += 15;
  });
  
  return Math.min(score, 100);
}

function calculateEmotional(title) {
  const emotionalKeywords = Object.values(SEMANTIC_WORD_BANKS)
    .filter(arr => arr !== SEMANTIC_WORD_BANKS.pinterestNativeWords)
    .flat();
  
  let score = 0;
  emotionalKeywords.forEach(word => {
    if (title.toLowerCase().includes(word.toLowerCase())) score += 5;
  });
  
  return Math.min(score, 100);
}

function calculateQuality(title) {
  let score = 0;
  
  // Perfect length
  if (title.length >= 40 && title.length <= 70) score += 30;
  
  // Has power words
  const powerWords = Object.values(SEMANTIC_WORD_BANKS).flat();
  if (powerWords.some(w => title.toLowerCase().includes(w.toLowerCase()))) score += 30;
  
  // Has number
  if (/\d/.test(title)) score += 20;
  
  // Good readability
  if (title.split(" ").length >= 4 && title.split(" ").length <= 12) score += 20;
  
  return Math.min(score, 100);
}

function getTitleQualityBadge(score) {
  if (score >= 85) return "💎 Premium";
  if (score >= 70) return "⭐ Strong";
  if (score >= 55) return "✓ Good";
  return "○ Fair";
}

// ============================================================
// GENERATION ENGINE (INTELLIGENT)
// ============================================================

function generateTitles(keyword, selectedTone = null) {
  // Validate keyword
  const validation = validateKeyword(keyword);
  if (!validation.valid) {
    showValidationMessage(validation.message);
    return [];
  }
  
  const cleanedKeyword = validation.cleaned;
  const intent = selectedTone || detectKeywordIntent(cleanedKeyword);
  const templates = INTENT_TEMPLATES[intent] || INTENT_TEMPLATES.blogging;
  
  const allTitles = [];
  const usedIndices = new Set();
  
  // Generate 20 internally
  while (allTitles.length < 20) {
    const idx = Math.floor(Math.random() * templates.length);
    if (usedIndices.has(idx)) continue;
    usedIndices.add(idx);
    
    const template = templates[idx];
    const title = template
      .replace(/{keyword}/g, cleanedKeyword)
      .replace(/{number}/g, getRandom(NUMBERS))
      .split("{")
      .map(part => {
        if (part.includes("}")) {
          const key = part.split("}")[0];
          const bank = SEMANTIC_WORD_BANKS[key + "Words"] || SEMANTIC_WORD_BANKS.emotionalWords;
          return getRandom(bank) + part.substring(key.length + 1);
        }
        return part;
      })
      .join("");
    
    allTitles.push({
      text: title,
      quality: calculateQuality(title),
      curiosity: calculateCuriosity(title),
      emotional: calculateEmotional(title),
      composite: calculateCompositeScore(title, cleanedKeyword)
    });
  }
  
  // Sort by composite score, return top 10
  const sorted = allTitles.sort((a, b) => b.composite - a.composite).slice(0, 10);
  
  return sorted;
}

// ============================================================
// HISTORY
// ============================================================

function saveToHistory(keyword) {
  let history = JSON.parse(localStorage.getItem("pinterestTitleHistory") || "[]");
  history = history.filter(item => item !== keyword);
  history.unshift(keyword);
  history = history.slice(0, 10);
  localStorage.setItem("pinterestTitleHistory", JSON.stringify(history));
}

function loadHistory() {
  return JSON.parse(localStorage.getItem("pinterestTitleHistory") || "[]");
}

function displayHistory() {
  if (!historyContainer) return;
  const history = loadHistory();
  historyContainer.innerHTML = "";
  
  if (history.length === 0) {
    historyContainer.innerHTML = '<p class="text-sm text-gray-600">No recent searches yet</p>';
    return;
  }
  
  history.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "bg-gray-100 hover:bg-pink-100 text-gray-800 px-3 py-1 rounded-full text-sm transition";
    btn.textContent = item;
    btn.addEventListener("click", () => {
      keywordInput.value = item;
      generateTitlesHandler();
    });
    historyContainer.appendChild(btn);
  });
}

// ============================================================
// FAVORITES
// ============================================================

function saveFavorite(titleObj) {
  let favorites = JSON.parse(localStorage.getItem("favoritePinterestTitles") || "[]");
  if (!favorites.some(item => item.text === titleObj.text)) {
    favorites.unshift(titleObj);
    favorites = favorites.slice(0, 50);
    localStorage.setItem("favoritePinterestTitles", JSON.stringify(favorites));
  }
}

// ============================================================
// CLIPBOARD
// ============================================================

async function copyToClipboard(text, button) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
  
  const original = button.innerHTML;
  button.innerHTML = "✓ Copied";
  button.classList.add("bg-green-600");
  setTimeout(() => {
    button.innerHTML = original;
    button.classList.remove("bg-green-600");
  }, 2000);
}

// ============================================================
// PIN DESCRIPTION & HASHTAG GENERATORS
// ============================================================

function generatePinDescription(keyword) {
  const descriptions = [
    `Discover the best ${keyword} ideas trending on Pinterest right now. Save these aesthetic and viral inspirations for your next project.`,
    `Looking for ${keyword} inspiration? These Pinterest-worthy ideas are perfect for creators, bloggers, and aesthetic lovers.`,
    `Boost your Pinterest engagement with these ${keyword} ideas everyone is saving right now.`,
    `Find viral ${keyword} inspiration with tips, trends, and Pinterest-friendly ideas designed to increase clicks and saves.`
  ];
  return getRandom(descriptions);
}

function generateHashtags(keyword) {
  const clean = keyword.toLowerCase().replace(/\s+/g, "");
  return [
    `#${clean}`, "#pinteresttips", "#pinterestmarketing", "#viralpins",
    "#contentcreator", "#bloggingtips", "#smallcreator", "#pinideas",
    "#seo", "#socialmediamarketing"
  ];
}

// ============================================================
// DISPLAY TITLES
// ============================================================

function displayTitles(titles, keyword) {
  if (!titlesContainer) return;
  titlesContainer.innerHTML = "";
  currentTitles = titles;
  
  titles.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all";
    card.innerHTML = `
      <div class="flex flex-col gap-4">
        <div class="flex justify-between items-start gap-4">
          <h3 class="font-bold text-lg text-gray-900 leading-snug">${item.text}</h3>
          <button class="copy-btn flex-shrink-0 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            data-title="${item.text.replace(/"/g, '&quot;')}">📋 Copy</button>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div class="bg-pink-100 text-pink-700 px-3 py-2 rounded-full">Quality: ${item.quality}/100</div>
          <div class="bg-blue-100 text-blue-700 px-3 py-2 rounded-full">Curiosity: ${item.curiosity}/100</div>
          <div class="bg-green-100 text-green-700 px-3 py-2 rounded-full">Emotion: ${item.emotional}/100</div>
          <div class="bg-yellow-100 text-yellow-700 px-3 py-2 rounded-full">Score: ${item.composite}/100</div>
        </div>
        
        <div class="flex flex-wrap gap-2 items-center">
          <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">${getTitleQualityBadge(item.composite)}</span>
          <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">${item.text.length} chars</span>
        </div>
        
        <div class="flex flex-wrap gap-2">
          <button class="save-favorite-btn text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full" data-index="${index}">⭐ Save</button>
          <button class="gen-description-btn text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full" data-keyword="${keyword}">📝 Description</button>
          <button class="gen-hashtags-btn text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full" data-keyword="${keyword}">#️⃣ Hashtags</button>
        </div>
      </div>
    `;
    titlesContainer.appendChild(card);
  });
  
  // Copy individual title
  titlesContainer.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      copyToClipboard(this.dataset.title, this);
      sessionData.copiedCount++;
      analyticsEvent("copy_title", { event_label: this.dataset.title });
    });
  });
  
  // Save favorite
  titlesContainer.querySelectorAll(".save-favorite-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      saveFavorite(currentTitles[this.dataset.index]);
      this.innerHTML = "✓ Saved";
      sessionData.favoriteCount++;
      analyticsEvent("save_favorite");
    });
  });
  
  // Generate description
  titlesContainer.querySelectorAll(".gen-description-btn").forEach(btn => {
    btn.addEventListener("click", async function () {
      const desc = generatePinDescription(this.dataset.keyword);
      await navigator.clipboard.writeText(desc).catch(() => {});
      this.innerHTML = "✓ Copied Description";
    });
  });
  
  // Generate hashtags
  titlesContainer.querySelectorAll(".gen-hashtags-btn").forEach(btn => {
    btn.addEventListener("click", async function () {
      const tags = generateHashtags(this.dataset.keyword).join(" ");
      await navigator.clipboard.writeText(tags).catch(() => {});
      this.innerHTML = "✓ Copied Hashtags";
    });
  });
  
  if (resultsSection) {
    resultsSection.classList.remove("hidden");
    resultsSection.scrollIntoView({ behavior: "smooth" });
  }
}

// ============================================================
// GENERATE HANDLER
// ============================================================

function generateTitlesHandler() {
  const keyword = keywordInput?.value.trim();
  const selectedTone = toneSelect?.value;
  
  if (!keyword) {
    showValidationMessage("Please enter a keyword to generate titles.", "error");
    keywordInput?.focus();
    return;
  }
  
  currentKeyword = keyword;
  generateBtn.disabled = true;
  generateBtn.innerHTML = "Analyzing keyword intent...";
  
  setTimeout(() => {
    generateBtn.innerHTML = "Optimizing Pinterest SEO...";
    
    setTimeout(() => {
      const titles = generateTitles(keyword, selectedTone);
      
      if (titles.length === 0) {
        generateBtn.disabled = false;
        generateBtn.innerHTML = "✨ Generate Titles";
        return;
      }
      
      displayTitles(titles, keyword);
      saveToHistory(keyword);
      displayHistory();
      
      sessionData.generatedCount++;
      generateBtn.disabled = false;
      generateBtn.innerHTML = "✨ Generate 10 Titles";
      
      analyticsEvent("generate_titles", { event_label: keyword });
    }, 300);
  }, 300);
}

// ============================================================
// COPY ALL
// ============================================================

function copyAllTitles() {
  if (!currentTitles.length || !copyAllBtn) return;
  const text = currentTitles.map(item => item.text).join("\n");
  copyToClipboard(text, copyAllBtn);
  analyticsEvent("copy_all_titles");
}

// ============================================================
// EXPORT
// ============================================================

function exportTitlesAsText() {
  if (!currentTitles.length) return;
  
  const content = currentTitles
    .map((item, i) =>
      `${i + 1}. ${item.text}\nQuality Score: ${item.quality}/100\nCuriosity: ${item.curiosity}/100\nEmotional: ${item.emotional}/100\n`
    )
    .join("\n");
  
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pinterest-titles.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  analyticsEvent("export_titles");
}

// ============================================================
// TRENDING KEYWORDS
// ============================================================

function displayTrendingKeywords() {
  const container = document.getElementById("trending-keywords");
  if (!container) return;
  container.innerHTML = "";
  
  TRENDING_KEYWORDS.forEach(keyword => {
    const btn = document.createElement("button");
    btn.className = "bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 text-gray-800 text-sm px-4 py-2 rounded-full transition";
    btn.innerHTML = `🔥 ${keyword}`;
    btn.addEventListener("click", () => {
      keywordInput.value = keyword;
      generateTitlesHandler();
    });
    container.appendChild(btn);
  });
}

// ============================================================
// SEO TIPS ROTATOR
// ============================================================

function rotateSEOTips() {
  const container = document.getElementById("seo-tip-box");
  if (!container) return;
  
  let index = 0;
  const render = () => {
    container.innerHTML = `
      <div class="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100 rounded-2xl p-4">
        <p class="text-sm text-gray-700">💡 ${PINTEREST_TIPS[index]}</p>
      </div>`;
    index = (index + 1) % PINTEREST_TIPS.length;
  };
  
  render();
  setInterval(render, 5000);
}

// ============================================================
// EMAIL CAPTURE
// ============================================================

function showEmailCapture() {
  if (localStorage.getItem("emailPopupShown")) return;
  
  const popup = document.createElement("div");
  popup.id = "email-popup";
  popup.className = "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4";
  popup.innerHTML = `
    <div class="bg-white rounded-3xl p-8 max-w-lg w-full relative">
      <button id="close-popup" class="absolute top-4 right-4 text-gray-500 hover:text-black">✕</button>
      <div class="text-center">
        <div class="text-5xl mb-4">📌</div>
        <h2 class="text-3xl font-bold text-gray-900 mb-3">Get Viral Pinterest Growth Tips</h2>
        <p class="text-gray-600 mb-6">Join creators getting Pinterest SEO tips, viral pin strategies, and free tools weekly.</p>
        <input type="email" id="email-input" placeholder="Enter your email"
          class="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4" />
        <button id="email-submit" class="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-semibold">
          🚀 Get Free Pinterest Tips
        </button>
        <p class="text-xs text-gray-500 mt-3">No spam. Creator-focused insights only.</p>
      </div>
    </div>`;
  
  document.body.appendChild(popup);
  localStorage.setItem("emailPopupShown", "true");
  
  document.getElementById("close-popup").addEventListener("click", () => popup.remove());
  
  document.getElementById("email-submit").addEventListener("click", () => {
    const email = document.getElementById("email-input").value;
    if (!email.includes("@")) {
      showValidationMessage("Please enter a valid email address.", "error");
      return;
    }
    
    popup.innerHTML = `
      <div class="bg-white rounded-3xl p-8 text-center">
        <div class="text-6xl mb-4">🎉</div>
        <h2 class="text-3xl font-bold mb-3">You're In!</h2>
        <p class="text-gray-600">Watch your inbox for Pinterest growth strategies.</p>
      </div>`;
    
    analyticsEvent("email_signup", { event_category: "lead_generation" });
    setTimeout(() => popup.remove(), 2500);
  });
}

// ============================================================
// INTERNAL LINKS
// ============================================================

function generateInternalLinks() {
  const section = document.getElementById("internal-linking");
  if (!section) return;
  
  let html = `
    <div class="bg-white border border-gray-200 rounded-3xl p-8 mt-14 shadow-sm">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Learn Pinterest SEO Faster</h2>
      <div class="grid md:grid-cols-3 gap-8">`;
  
  Object.entries(CONTENT_CLUSTERS).forEach(([cluster, articles]) => {
    html += `
      <div>
        <h3 class="font-bold text-xl mb-4 capitalize">${cluster.replace(/([A-Z])/g, " $1")}</h3>
        <div class="space-y-3">`;
    
    articles.forEach(article => {
      const slug = article.replace(/\s+/g, "-").toLowerCase();
      html += `<a href="/blog/${slug}.html" class="block text-gray-700 hover:text-pink-600 transition">→ ${capitalizeWords(article)}</a>`;
    });
    
    html += `</div></div>`;
  });
  
  html += `</div></div>`;
  section.innerHTML = html;
}

// ============================================================
// RELATED TOOLS
// ============================================================

function injectRelatedTools() {
  const section = document.getElementById("related-tools");
  if (!section) return;
  
  section.innerHTML = `
    <div class="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mt-10">
      <h3 class="text-2xl font-bold text-gray-900 mb-4">Continue Growing Your Pinterest Traffic</h3>
      <div class="grid md:grid-cols-3 gap-4">
        <a href="/description-optimizer.html" class="bg-white rounded-xl p-4 border hover:shadow-md transition">
          <h4 class="font-semibold mb-2">📝 Pin Description Optimizer</h4>
          <p class="text-sm text-gray-600">Generate SEO-friendly Pinterest descriptions.</p>
        </a>
        <a href="/hashtag-generator.html" class="bg-white rounded-xl p-4 border hover:shadow-md transition">
          <h4 class="font-semibold mb-2">#️⃣ Pinterest Hashtag Generator</h4>
          <p class="text-sm text-gray-600">Find hashtags that increase Pinterest reach.</p>
        </a>
        <a href="/blog.html" class="bg-white rounded-xl p-4 border hover:shadow-md transition">
          <h4 class="font-semibold mb-2">🚀 Pinterest Growth Blog</h4>
          <p class="text-sm text-gray-600">Learn how creators grow Pinterest traffic.</p>
        </a>
      </div>
    </div>`;
}

// ============================================================
// FEATURED BLOG POSTS
// ============================================================

function renderFeaturedArticles() {
  const container = document.getElementById("featured-blog-posts");
  if (!container) return;
  
  let html = `<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">`;
  
  BLOG_SUGGESTIONS.forEach(post => {
    const slug = post.title.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-");
    html += `
      <a href="/blog/${slug}.html" class="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition">
        <div class="h-44 bg-gradient-to-br from-pink-100 to-purple-100"></div>
        <div class="p-5">
          <span class="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">${post.category}</span>
          <h3 class="font-bold text-xl mt-4 text-gray-900 group-hover:text-pink-600 transition">${post.title}</h3>
          <p class="text-gray-600 mt-3 text-sm">Learn actionable Pinterest SEO strategies designed for creators and bloggers.</p>
        </div>
      </a>`;
  });
  
  html += `</div>`;
  container.innerHTML = html;
}

// ============================================================
// FAQs
// ============================================================

function renderAdvancedFAQs() {
  const container = document.getElementById("advanced-faqs");
  if (!container) return;
  
  container.innerHTML = `<div class="space-y-4">` +
    ADVANCED_FAQS.map(item => `
      <details class="bg-white border border-gray-200 rounded-2xl p-5">
        <summary class="font-semibold cursor-pointer text-gray-900">${item.question}</summary>
        <p class="mt-4 text-gray-600 leading-relaxed">${item.answer}</p>
      </details>`).join("") +
    `</div>`;
}

// ============================================================
// PROGRAMMATIC PAGES
// ============================================================

function renderProgrammaticPages() {
  const container = document.getElementById("programmatic-pages");
  if (!container) return;
  
  let html = `
    <div class="mt-14">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Popular Pinterest Search Topics</h2>
      <div class="flex flex-wrap gap-3">`;
  
  PROGRAMMATIC_TOPICS.forEach(topic => {
    html += `<a href="/topics/${topic}.html"
      class="bg-gray-100 hover:bg-pink-100 hover:text-pink-700 px-4 py-2 rounded-full text-sm transition">
      ${capitalizeWords(topic.replace(/-/g, " "))}</a>`;
  });
  
  html += `</div></div>`;
  container.innerHTML = html;
}

// ============================================================
// SCHEMA MARKUP
// ============================================================

function injectSchemaMarkup() {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Pinterest Title Generator",
    "url": window.location.href,
    "applicationCategory": "SEOApplication",
    "operatingSystem": "All",
    "description": "Generate viral Pinterest titles instantly using SEO optimization and CTR psychology.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": ADVANCED_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  };
  
  [appSchema, faqSchema].forEach(schema => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

// ============================================================
// SCROLL DEPTH TRACKING
// ============================================================

const scrollTracked = { 25: false, 50: false, 75: false };

window.addEventListener("scroll", () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  [25, 50, 75].forEach(threshold => {
    if (pct > threshold && !scrollTracked[threshold]) {
      scrollTracked[threshold] = true;
      analyticsEvent(`scroll_${threshold}`);
    }
  });
}, { passive: true });

// ============================================================
// SESSION TIME TRACKING
// ============================================================

window.addEventListener("beforeunload", () => {
  const duration = Math.floor((Date.now() - sessionData.sessionStart) / 1000);
  analyticsEvent("session_duration", { value: duration });
});

// ============================================================
// EXIT INTENT
// ============================================================

document.addEventListener("mouseleave", e => {
  if (e.clientY <= 0 && !localStorage.getItem("exitPopupShown")) {
    localStorage.setItem("exitPopupShown", "true");
    showEmailCapture();
  }
});

// ============================================================
// EMAIL POPUP — DELAYED TRIGGER
// ============================================================

setTimeout(() => {
  if (sessionData.generatedCount >= 1) showEmailCapture();
}, 30000);

// ============================================================
// MOBILE MENU
// ============================================================

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
}

// ============================================================
// EVENT LISTENERS
// ============================================================

generateBtn?.addEventListener("click", generateTitlesHandler);

keywordInput?.addEventListener("keypress", e => {
  if (e.key === "Enter") generateTitlesHandler();
});

copyAllBtn?.addEventListener("click", copyAllTitles);

exportBtn?.addEventListener("click", exportTitlesAsText);

document.addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") generateTitlesHandler();
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "c") copyAllTitles();
});

// ============================================================
// ACCESSIBILITY
// ============================================================

document.querySelectorAll("details > summary").forEach(summary => {
  summary.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      summary.parentElement.open = !summary.parentElement.open;
    }
  });
});

// ============================================================
// SCROLL RESTORATION
// ============================================================

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// ============================================================
// LAZY IMAGES
// ============================================================

document.querySelectorAll("img").forEach(img => { img.loading = "lazy"; });

// ============================================================
// THEME DETECTION
// ============================================================

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.body.classList.add("dark-mode-ready");
}

// ============================================================
// INITIALIZATION
// ============================================================

window.addEventListener("load", () => {
  displayHistory();
  displayTrendingKeywords();
  rotateSEOTips();
  injectSchemaMarkup();
  injectRelatedTools();
  generateInternalLinks();
  renderFeaturedArticles();
  renderAdvancedFAQs();
  renderProgrammaticPages();
  
  setTimeout(() => keywordInput?.focus(), 600);
});

// ============================================================
// CONSOLE BRANDING
// ============================================================

console.log(`
🚀 Elevate Living Co — Pinterest SEO Tools
   Production Build — Advanced Intelligence Layer
   Built for creators, bloggers, and Pinterest growth.
`);