// ============================================================
// PINTEREST DESCRIPTION OPTIMIZER — PRODUCTION VERSION
// Elevate Living Co
// ============================================================

"use strict";

// ============================================================
// SEMANTIC WORD BANKS (PINTEREST-NATIVE)
// ============================================================

const SEMANTIC_BANKS = {
    aestheticWords: ["Aesthetic", "Dreamy", "Stunning", "Visual", "Elegant", "Minimalist", "Inspiring", "Curated", "Ethereal", "Chic"],
    cozyWords: ["Cozy", "Warm", "Inviting", "Snug", "Homey", "Relaxing", "Soft", "Comforting", "Snuggly", "Peaceful"],
    luxuryWords: ["Luxury", "Premium", "Upscale", "High-End", "Expensive-Looking", "Sophisticated", "Opulent", "Refined", "Luxe", "Elite"],
    emotionalWords: ["Obsessed", "Life-changing", "Mind-blowing", "Heart-warming", "Magical", "Breathtaking", "Captivating", "Enchanting", "Soulful", "Radiant"],
    engagementWords: ["Save this", "Must-try", "Don't miss", "Pin for later", "Share with someone", "Check this out", "Bookmark this", "Add to your board", "Try this today", "Get inspired"],
    pinterestNativeWords: ["Pinterest-worthy", "Pin-worthy", "Must-save", "Inspo", "Vibe", "Mood board", "Aesthetic", "Viral", "Trending", "Obsessed"],
    creatorWords: ["Creator favorite", "Pro tip", "Insider secret", "Designed for you", "Expertly curated", "Hand-picked", "Professional", "Authentic", "Unique"],
    ctaWords: ["Click to see more", "Read the full guide", "Get the tutorial", "Shop the look", "Download now", "See the transformation", "Learn more here", "Start your journey"],
    seoWords: ["Best ideas", "Top trends", "Step-by-step", "Complete guide", "Simple tutorial", "Expert tips", "Beginners guide", "Checklist", "Modern", "Essential"],
    lifestyleWords: ["Daily life", "Home goals", "Dream space", "Routine", "Makeover", "Transformation", "Self-care", "Planning", "Simplified", "Living"]
};

const HOOK_SENTENCES = [
    "Looking for the ultimate {keyword} inspiration? You've found it.",
    "Get ready to transform your space with these {keyword} ideas.",
    "If you're obsessed with {keyword}, you need to save this now.",
    "The secret to a perfect {keyword} is finally here.",
    "Upgrade your {keyword} game with these expert-level tips.",
    "Your dream {keyword} is just a pin away.",
    "Stop scrolling and save these viral {keyword} concepts.",
    "This is the Pinterest-worthy {keyword} you've been searching for."
];

const BODY_STRUCTURES = [
    "Discover how to create a {aesthetic} {keyword} using these {seo} strategies. Every detail is designed for maximum {lifestyle} appeal.",
    "These {luxury} {keyword} hacks will make your {lifestyle} feel like a {aesthetic} dream without the high-end price tag.",
    "A {cozy} and {aesthetic} {keyword} is just a few steps away. Follow this {seo} guide to get the look today.",
    "From {minimalist} vibes to {luxury} finishes, these {keyword} ideas cover everything a {creator} needs to know.",
    "Creating a {viral} {keyword} has never been easier. Use these {pinterestNative} tips to elevate your {lifestyle} instantly."
];

const CTA_PHRASES = [
    "{engagement} to your {keyword} board for later!",
    "{cta} to see the full transformation of this {keyword}!",
    "{engagement} so you don't lose these {seo} {keyword} tips.",
    "{cta} and start your {keyword} makeover journey today!",
    "{engagement} if you're ready for {luxury} {keyword} inspiration."
];

// ============================================================
// STATE & VALIDATION
// ============================================================

const GIBBERISH_WHITELIST = ["ai", "vr", "ux", "ui", "diy", "seo", "canva", "crm"];

function isGibberish(text) {
    const trimmed = text.toLowerCase().trim();
    if (GIBBERISH_WHITELIST.includes(trimmed)) return false;
    if (/^\d+$/.test(trimmed)) return true;
    if (/(.)\1{4,}/.test(trimmed)) return true;
    if (trimmed.length <= 3) return !/[aeiou]/i.test(trimmed);
    const vowels = trimmed.match(/[aeiou]/gi) || [];
    return vowels.length < trimmed.length * 0.15;
}

function cleanInput(text) {
    return text.trim().replace(/\s+/g, " ").replace(/[^a-zA-Z0-9\s\-&]/g, "");
}

// ============================================================
// GENERATION ENGINE
// ============================================================

function getFromBank(bankName) {
    const bank = SEMANTIC_BANKS[bankName] || SEMANTIC_BANKS.emotionalWords;
    return bank[Math.floor(Math.random() * bank.length)];
}

function generateRawDescription(keyword, tone) {
    const hook = HOOK_SENTENCES[Math.floor(Math.random() * HOOK_SENTENCES.length)].replace("{keyword}", keyword);
    let body = BODY_STRUCTURES[Math.floor(Math.random() * BODY_STRUCTURES.length)]
        .replace("{keyword}", keyword)
        .replace("{aesthetic}", getFromBank("aestheticWords"))
        .replace("{luxury}", getFromBank("luxuryWords"))
        .replace("{cozy}", getFromBank("cozyWords"))
        .replace("{seo}", getFromBank("seoWords"))
        .replace("{lifestyle}", getFromBank("lifestyleWords"))
        .replace("{creator}", getFromBank("creatorWords"))
        .replace("{viral}", getFromBank("pinterestNativeWords"))
        .replace("{pinterestNative}", getFromBank("pinterestNativeWords"));
    
    // Apply tone-specific adjectives
    if (tone === "Cozy") body = body.replace(/aesthetic|luxury|modern/i, "warm and cozy");
    if (tone === "Luxury") body = body.replace(/minimalist|simple|budget/i, "high-end luxury");
    
    const cta = CTA_PHRASES[Math.floor(Math.random() * CTA_PHRASES.length)]
        .replace("{keyword}", keyword)
        .replace("{engagement}", getFromBank("engagementWords"))
        .replace("{cta}", getFromBank("ctaWords"))
        .replace("{seo}", getFromBank("seoWords"))
        .replace("{luxury}", getFromBank("luxuryWords"));

    return `${hook} ${body} ${cta}`;
}

function scoreDescription(desc, keyword) {
    let scores = { seo: 0, emotion: 0, readability: 0, engagement: 0 };
    const lowerDesc = desc.toLowerCase();
    const lowerKey = keyword.toLowerCase();

    // SEO Score (Keyword presence and density)
    if (lowerDesc.includes(lowerKey)) scores.seo += 50;
    if (lowerDesc.split(lowerKey).length > 2) scores.seo += 20;
    if (lowerDesc.startsWith(lowerKey.substring(0, 5))) scores.seo += 20;

    // Emotion Score
    const emoWords = SEMANTIC_BANKS.emotionalWords.concat(SEMANTIC_BANKS.aestheticWords);
    emoWords.forEach(w => { if (lowerDesc.includes(w.toLowerCase())) scores.emotion += 15; });

    // Readability (Length and structure)
    if (desc.length > 150 && desc.length < 400) scores.readability += 80;
    if (desc.split('.').length > 2) scores.readability += 20;

    // Engagement
    const engWords = SEMANTIC_BANKS.engagementWords.concat(SEMANTIC_BANKS.ctaWords);
    engWords.forEach(w => { if (lowerDesc.includes(w.toLowerCase())) scores.engagement += 15; });

    Object.keys(scores).forEach(k => scores[k] = Math.min(100, scores[k]));
    const overall = Math.round((scores.seo + scores.emotion + scores.readability + scores.engagement) / 4);
    
    return { ...scores, overall };
}

// ============================================================
// UI LOGIC
// ============================================================

const DOM = {
    input: document.getElementById("keyword-input"),
    tone: document.getElementById("tone-select"),
    btn: document.getElementById("generate-btn"),
    results: document.getElementById("results-section"),
    container: document.getElementById("descriptions-container"),
    validation: document.getElementById("validation-message")
};

function showValidation(msg, type = "error") {
    if (!DOM.validation) return;
    DOM.validation.innerHTML = `<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm fade-in">❌ ${msg}</div>`;
    setTimeout(() => { DOM.validation.innerHTML = ""; }, 4000);
}

function handleGenerate() {
    const rawInput = DOM.input?.value || "";
    const keyword = cleanInput(rawInput);
    const tone = DOM.tone?.value || "Pinterest SEO";

    if (!keyword || keyword.length < 3) return showValidation("Please enter a valid keyword (min 3 chars).");
    if (isGibberish(keyword)) return showValidation("Keyword looks like gibberish. Try 'cozy bedroom'.");

    DOM.btn.disabled = true;
    DOM.btn.innerHTML = `<span class="loading-spinner"></span> Optimizing...`;

    setTimeout(() => {
        const pool = [];
        for (let i = 0; i < 30; i++) {
            const text = generateRawDescription(keyword, tone);
            const scores = scoreDescription(text, keyword);
            pool.push({ text, scores });
        }

        const top10 = pool.sort((a, b) => b.scores.overall - a.scores.overall).slice(0, 10);
        renderDescriptions(top10);
        
        DOM.btn.disabled = false;
        DOM.btn.innerHTML = "✨ Generate 10 Descriptions";
        DOM.results.classList.remove("hidden");
        DOM.results.scrollIntoView({ behavior: "smooth", block: "start" });
        
        // Track Event
        if (window.gtag) {
            gtag('event', 'generate_description', { 'keyword': keyword, 'tone': tone });
        }
    }, 800);
}

function renderDescriptions(items) {
    DOM.container.innerHTML = items.map((item, idx) => `
        <div class="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all fade-in" style="animation-delay: ${idx * 50}ms">
            <div class="flex flex-col gap-4">
                <p class="text-gray-800 leading-relaxed font-medium">${item.text}</p>
                
                <div class="grid grid-cols-2 md:grid-cols-5 gap-2 pt-2">
                    <div class="bg-pink-50 p-2 rounded-xl text-center">
                        <div class="text-[10px] uppercase font-bold text-pink-400">SEO</div>
                        <div class="font-bold text-gray-900">${item.scores.seo}%</div>
                    </div>
                    <div class="bg-purple-50 p-2 rounded-xl text-center">
                        <div class="text-[10px] uppercase font-bold text-purple-400">EMOTION</div>
                        <div class="font-bold text-gray-900">${item.scores.emotion}%</div>
                    </div>
                    <div class="bg-blue-50 p-2 rounded-xl text-center">
                        <div class="text-[10px] uppercase font-bold text-blue-400">READS</div>
                        <div class="font-bold text-gray-900">${item.scores.readability}%</div>
                    </div>
                    <div class="bg-green-50 p-2 rounded-xl text-center">
                        <div class="text-[10px] uppercase font-bold text-green-400">ENGAGE</div>
                        <div class="font-bold text-gray-900">${item.scores.engagement}%</div>
                    </div>
                    <div class="bg-gray-900 p-2 rounded-xl text-center">
                        <div class="text-[10px] uppercase font-bold text-gray-400">TOTAL</div>
                        <div class="font-bold text-white">${item.scores.overall}%</div>
                    </div>
                </div>

                <div class="flex gap-3 pt-2">
                    <button onclick="copyText(this, '${item.text.replace(/'/g, "\\'")}')" class="flex-1 bg-gray-900 text-white py-3 rounded-2xl font-bold hover:bg-gray-800 transition">📋 Copy</button>
                    <button onclick="favoriteItem(this)" class="px-4 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition">⭐</button>
                </div>
            </div>
        </div>
    `).join("");
}

window.copyText = (btn, text) => {
    navigator.clipboard.writeText(text);
    const original = btn.innerHTML;
    btn.innerHTML = "✓ Copied";
    btn.classList.replace("bg-gray-900", "bg-green-600");
    setTimeout(() => {
        btn.innerHTML = original;
        btn.classList.replace("bg-green-600", "bg-gray-900");
    }, 2000);
    if (window.gtag) gtag('event', 'copy_description');
};

window.copyAllDescriptions = () => {
    const texts = Array.from(document.querySelectorAll('#descriptions-container p')).map(p => p.innerText).join('\n\n---\n\n');
    navigator.clipboard.writeText(texts);
    
    // Non-alert notification
    const notify = document.createElement('div');
    notify.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-2xl z-[100] fade-in font-bold';
    notify.innerHTML = '✨ All 10 descriptions copied to clipboard!';
    document.body.appendChild(notify);
    setTimeout(() => notify.remove(), 3000);

    if (window.gtag) gtag('event', 'copy_all_descriptions');
};

window.exportDescriptions = () => {
    const texts = Array.from(document.querySelectorAll('#descriptions-container p')).map(p => p.innerText).join('\n\n---\n\n');
    const blob = new Blob([texts], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pinterest-descriptions-${new Date().getTime()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    if (window.gtag) gtag('event', 'export_descriptions');
};

// Mobile Menu Logic
const mobileMenuBtn = document.querySelector('nav button');
const mobileMenu = document.createElement('div');
mobileMenu.className = 'hidden fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center gap-8 text-2xl font-bold p-8';
mobileMenu.innerHTML = `
    <button class="absolute top-6 right-6 text-4xl">✕</button>
    <a href="https://pinterest-title-generator.pages.dev/" class="hover:text-pink-600 transition">Title Generator</a>
    <a href="https://pinterest-description-generator.pages.dev/" class="text-pink-600">Description Optimizer</a>
    <a href="https://elevatelivingco.me/" target="_blank" class="hover:text-pink-600 transition">Creator Blog</a>
`;
document.body.appendChild(mobileMenu);

mobileMenuBtn?.addEventListener('click', () => mobileMenu.classList.remove('hidden'));
mobileMenu.querySelector('button')?.addEventListener('click', () => mobileMenu.classList.add('hidden'));
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));

window.favoriteItem = (btn) => {
    btn.innerHTML = "❤️";
    btn.classList.add("text-red-500");
    if (window.gtag) gtag('event', 'favorite_description');
};

// ============================================================
// INITIALIZATION
// ============================================================

DOM.btn?.addEventListener("click", handleGenerate);
DOM.input?.addEventListener("keypress", (e) => { if (e.key === "Enter") handleGenerate(); });

console.log("🚀 Pinterest Description Optimizer Engine Ready");
