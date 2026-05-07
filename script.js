// ============================================================
// PINTEREST TITLE GENERATOR — PRODUCTION VERSION
// Elevate Living Co
// ============================================================

"use strict";

// ============================================================
// CONSTANTS
// ============================================================

const POWER_WORDS = [
  "Viral", "Secret", "Proven", "Brilliant", "Genius",
  "Aesthetic", "Easy", "Stunning", "Smart", "Luxury",
  "Minimalist", "Cozy", "Trending", "Addictive", "Creative",
  "Elegant", "Game-Changing", "Budget-Friendly", "Insanely Good", "Must-Try"
];

const NUMBERS = [5, 7, 9, 10, 12, 15, 20, 25, 30, 50];

const TITLE_TEMPLATES = {
  motivational: [
    "{power} {keyword} Ideas That Will Inspire You",
    "{number} {power} {keyword} Hacks You Need",
    "Transform Your Life With These {keyword} Tips",
    "The Ultimate {keyword} Blueprint",
    "How to Master {keyword} Like a Pro",
    "{number} {keyword} Secrets Nobody Talks About",
    "{power} {keyword} Strategies That Actually Work",
    "The {keyword} Mindset Shift You Need",
    "Why Everyone is Obsessed With {keyword}",
    "{number} Life-Changing {keyword} Ideas",
    "{number} {power} {keyword} Breakthroughs",
    "Unlock Your Best {keyword} Life",
    "Master {keyword} With This {number}-Step System",
    "{number} {keyword} Moves That Change Everything",
    "The {power} {keyword} Secret Everyone's Talking About"
  ],
  practical: [
    "How to {keyword}: Step-by-Step Guide",
    "{number} Easy {keyword} Tips for Beginners",
    "{keyword} Checklist: {number} Things You Need",
    "{number} Quick {keyword} Solutions",
    "DIY {keyword}: Easy Methods That Work",
    "The Complete {keyword} Starter Guide",
    "{number} Tested {keyword} Methods",
    "Simple {keyword} Ideas You Can Try Today",
    "{power} {keyword} Tricks for Faster Results",
    "The Best {keyword} Setup Guide",
    "Learn {keyword} in {number} Simple Steps",
    "{number} {keyword} Tools That Actually Help",
    "Start {keyword} Today: {number} Beginner Tips",
    "{keyword} How-To (No Experience Needed)",
    "{number} Budget {keyword} Tutorials for Beginners"
  ],
  trending: [
    "Everyone's Talking About {keyword}: Here's Why",
    "{number} Viral {keyword} Trends Right Now",
    "This {keyword} Trend is Exploding on Pinterest",
    "{keyword}: The Aesthetic Trend Everyone Loves",
    "{number} Trending {keyword} Ideas for 2026",
    "Pinterest Can't Stop Saving These {keyword} Ideas",
    "The {keyword} Craze Explained",
    "{power} {keyword} Trends Taking Over",
    "The Most Saved {keyword} Ideas This Month",
    "Why {keyword} is Blowing Up Right Now",
    "{number} {keyword} Ideas Going Viral This Week",
    "Everyone's Obsessed With {keyword}: {number} Reasons",
    "{keyword} is Everywhere — Here's What You Need to Know",
    "The {number} Hottest {keyword} Ideas Right Now",
    "What's Everyone Doing With {keyword}? {number} Ideas"
  ],
  luxury: [
    "Luxury {keyword} Ideas You'll Love",
    "{number} Elegant {keyword} Inspirations",
    "High-End {keyword} Ideas for a Premium Look",
    "Sophisticated {keyword} Styles That Feel Expensive",
    "{power} Luxury {keyword} Designs",
    "Minimalist {keyword} Ideas That Look Rich",
    "{number} Upscale {keyword} Concepts",
    "Pinterest-Worthy Luxury {keyword}",
    "The Most Elegant {keyword} Setups",
    "{number} Premium {keyword} Aesthetics",
    "Timeless {keyword}: {number} Classic Elegance Ideas",
    "Elevated {keyword}: {number} Luxury Upgrades",
    "The Art of {keyword}: {number} Refined Ideas",
    "{number} Chic {keyword} Styles for Discerning Tastes",
    "Luxury Living: {number} {keyword} Essentials"
  ],
  budget: [
    "{number} Budget {keyword} Ideas That Look Expensive",
    "Cheap {keyword} Hacks That Actually Work",
    "Affordable {keyword} Ideas You'll Love",
    "{number} Smart Ways to Save Money on {keyword}",
    "DIY {keyword} on a Tiny Budget",
    "{power} Budget {keyword} Tips",
    "{number} Budget-Friendly {keyword} Setups",
    "The Cheapest Way to Upgrade Your {keyword}",
    "Frugal {keyword} Ideas That Look Amazing",
    "{number} Free {keyword} Ideas Worth Trying",
    "How to {keyword} Without Breaking the Bank",
    "{number} Steal-Worthy {keyword} Ideas Under $50",
    "Thrifty {keyword}: {number} Affordable Solutions",
    "Save Big on {keyword}: {number} Proven Ways",
    "{number} No-Cost {keyword} Ideas"
  ]
};

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

// ============================================================
// UTILITIES
// ============////////////////////////////////////////////////

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

// ============================================================
// SCORING ENGINES
// ============================================================

function calculateSEOScore(title) {
  let score = 50;
  if (title.length >= 40 && title.length <= 70) score += 20;
  POWER_WORDS.forEach(word => { if (title.includes(word)) score += 10; });
  if (/\d/.test(title)) score += 10;
  if (/How|Guide|Ideas/i.test(title)) score += 10;
  return Math.min(score, 100);
}

function getCTRLabel(score) {
  if (score >= 90) return "Very High";
  if (score >= 75) return "High";
  if (score >= 60) return "Medium";
  return "Low";
}

function calculateUniqueness(title) {
  const commonWords = ["ideas", "tips", "guide", "best", "easy", "viral"];
  let uniqueness = 100;
  commonWords.forEach(word => { if (title.toLowerCase().includes(word)) uniqueness -= 5; });
  if (title.length > 60) uniqueness += 5;
  if (/\d/.test(title)) uniqueness += 5;
  return Math.max(50, uniqueness);
}

function emotionalScore(title) {
  const emotionalWords = [
    "secret", "viral", "easy", "genius", "stunning",
    "luxury", "proven", "addictive", "beautiful", "amazing"
  ];
  let score = 0;
  emotionalWords.forEach(word => { if (title.toLowerCase().includes(word)) score += 10; });
  return Math.min(score, 100);
}

function analyzeTitle(title) {
  return {
    length: title.length,
    containsNumber: /\d/.test(title),
    containsPowerWord: POWER_WORDS.some(w => title.includes(w)),
    readability: title.length < 70 ? "Good" : "Too Long"
  };
}

function getTitleQuality(title) {
  const a = analyzeTitle(title);
  let score = 0;
  if (a.containsNumber) score += 30;
  if (a.containsPowerWord) score += 30;
  if (a.readability === "Good") score += 40;
  if (score >= 90) return "Excellent";
  if (score >= 70) return "Strong";
  if (score >= 50) return "Moderate";
  return "Weak";
}

function getPerformanceBadge(score) {
  if (score >= 90) return `<span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">🚀 High Ranking Potential</span>`;
  if (score >= 75) return `<span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">📈 Strong CTR Potential</span>`;
  return `<span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">⚡ Moderate Performance</span>`;
}

// ============================================================
// KEYWORD INTENT DETECTION
// ============================================================

function detectKeywordIntent(keyword) {
  const lower = keyword.toLowerCase();
  if (/luxury|premium|elegant/.test(lower)) return "luxury";
  if (/cheap|budget|affordable/.test(lower)) return "budget";
  if (/trend|viral|popular/.test(lower)) return "trending";
  if (/how|guide|tutorial/.test(lower)) return "practical";
  return "motivational";
}

// ============================================================
// GENERATION ENGINE
// ============================================================

function generateTitles(keyword, selectedTone = null) {
  if (!keyword.trim()) {
    alert("Please enter a keyword.");
    return [];
  }

  const tone = selectedTone || detectKeywordIntent(keyword);
  const templates = TITLE_TEMPLATES[tone] || TITLE_TEMPLATES.motivational;
  const titles = [];
  const used = new Set();

  while (titles.length < 15) {
    const index = Math.floor(Math.random() * templates.length);
    if (used.has(index)) continue;
    used.add(index);

    const title = templates[index]
      .replace(/{keyword}/g, keyword)
      .replace(/{number}/g, getRandom(NUMBERS))
      .replace(/{power}/g, getRandom(POWER_WORDS));

    const seoScore = calculateSEOScore(title);

    titles.push({
      text: title,
      seoScore,
      ctr: getCTRLabel(seoScore)
    });
  }

  return titles;
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
    const uniqueness = calculateUniqueness(item.text);
    const emotion = emotionalScore(item.text);
    const quality = getTitleQuality(item.text);

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
          <div class="bg-pink-100 text-pink-700 px-3 py-2 rounded-full">SEO: ${item.seoScore}/100</div>
          <div class="bg-blue-100 text-blue-700 px-3 py-2 rounded-full">CTR: ${item.ctr}</div>
          <div class="bg-green-100 text-green-700 px-3 py-2 rounded-full">Unique: ${uniqueness}/100</div>
          <div class="bg-yellow-100 text-yellow-700 px-3 py-2 rounded-full">Emotion: ${emotion}/100</div>
        </div>

        <div class="flex flex-wrap gap-2 items-center">
          ${getPerformanceBadge(item.seoScore)}
          <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">Quality: ${quality}</span>
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
    keywordInput?.focus();
    return;
  }

  currentKeyword = keyword;
  generateBtn.disabled = true;
  generateBtn.innerHTML = "Generating...";

  setTimeout(() => {
    const titles = generateTitles(keyword, selectedTone);
    displayTitles(titles, keyword);
    saveToHistory(keyword);
    displayHistory();

    sessionData.generatedCount++;
    generateBtn.disabled = false;
    generateBtn.innerHTML = "✨ Generate 15 Titles";

    analyticsEvent("generate_titles", { event_label: keyword });
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
      `${i + 1}. ${item.text}\nSEO Score: ${item.seoScore}/100\nCTR Potential: ${item.ctr}\n`
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
// LIVE USER COUNTER (social proof)
// ============================================================

function updateLiveCounter() {
  const counter = document.getElementById("live-user-count");
  if (!counter) return;

  let count = Math.floor(Math.random() * 40) + 20;
  counter.textContent = `${count} creators using this tool`;

  setInterval(() => {
    count += Math.floor(Math.random() * 5) - 2;
    if (count < 18) count = 18;
    counter.textContent = `${count} creators using this tool`;
  }, 8000);
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
    if (!email.includes("@")) { alert("Enter a valid email."); return; }

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
  updateLiveCounter();
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
   Production Build — One Clean Architecture
   Built for creators, bloggers, and Pinterest growth.
`);
