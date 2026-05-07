// ============================================================
// TITLE GENERATION DATA & TEMPLATES
// ============================================================

const titleTemplates = {
    motivational: [
        "{number} {keyword} Ideas That Will Inspire You",
        "The {keyword} Guide Everyone Needs",
        "Transform Your Life With These {number} {keyword} Hacks",
        "Why {number} {keyword} Tips Changed Everything",
        "{number} Proven {keyword} Strategies That Actually Work",
        "The Ultimate {keyword} Blueprint for Success",
        "How to Master {keyword} in {number} Days",
        "The {number} Most Powerful {keyword} Techniques",
        "Finally! The {keyword} Secret Everyone's Talking About",
        "Unlock Your Best {keyword} Life With These {number} Ideas",
        "{number} Game-Changing {keyword} Secrets",
        "The {keyword} Mindset Shift You Need Right Now",
        "Discover {number} Life-Changing {keyword} Hacks",
        "Master {keyword} With This {number}-Step System",
        "{number} {keyword} Breakthroughs You Need to Know"
    ],
    practical: [
        "How to {keyword}: A Step-by-Step Guide",
        "{number} Easy {keyword} Tips for Beginners",
        "The Complete {keyword} Checklist ({number} Steps)",
        "DIY {keyword}: {number} Methods That Work",
        "{number} Quick {keyword} Hacks You Can Try Today",
        "The {keyword} Basics Everyone Should Know",
        "Easy {keyword}: {number} Simple Steps",
        "{number} {keyword} Tools That Actually Help",
        "Quick {keyword} Solutions for {number} Common Problems",
        "Learn {keyword} in {number} Minutes",
        "{number} Budget {keyword} Tutorials for Beginners",
        "The {keyword} How-To Guide (No Experience Needed)",
        "{number} Tested {keyword} Methods That Work",
        "Start {keyword} Today: {number} Beginner Tips",
        "The {keyword} Starter Pack: {number} Essentials"
    ],
    trending: [
        "Everyone's Obsessed With {keyword}: Here's Why",
        "{number} {keyword} Trends Taking Over Now",
        "The {keyword} Phenomenon: What You Need to Know",
        "Why {number} People Are Doing {keyword}",
        "{keyword} is Trending—Here's Everything About It",
        "The {number} Hottest {keyword} Ideas Right Now",
        "{keyword}: The Trend That's Everywhere",
        "{number} Viral {keyword} Hacks That's Going Crazy",
        "This {keyword} Trend is Blowing Up—Here's Why",
        "The {keyword} Craze: {number} Things to Know",
        "Everyone's Talking About {keyword}: {number} Reasons Why",
        "The {number} Most Viral {keyword} Trends",
        "{keyword}: {number} Trending Ideas for 2024",
        "What's Everyone Doing With {keyword}? {number} Ideas",
        "The {keyword} Viral Moment: {number} Things You Missed"
    ],
    luxury: [
        "Luxury {keyword}: {number} Premium Ideas",
        "The {number} Most Elegant {keyword} Styles",
        "High-End {keyword} for Sophisticated Tastes",
        "Luxury Living: {number} {keyword} Essentials",
        "The {number} Most Chic {keyword} Aesthetics",
        "Elevated {keyword}: {number} Luxury Upgrades",
        "Premium {keyword} Ideas for Discerning Tastes",
        "{number} Luxury {keyword} Concepts",
        "The Art of {keyword}: {number} Refined Ideas",
        "Timeless {keyword}: {number} Classic Elegance Ideas",
        "{number} Upscale {keyword} Inspirations",
        "Sophisticated {keyword}: {number} High-End Styles",
        "The {number} Most Luxurious {keyword} Finds",
        "Elegant {keyword} for the Refined Home",
        "Premium {keyword} Inspiration: {number} Exclusive Ideas"
    ],
    budget: [
        "{number} Budget {keyword} Ideas Under $50",
        "Affordable {keyword}: {number} Money-Saving Hacks",
        "DIY {keyword} on a Budget: {number} Ideas",
        "{number} Cheap {keyword} Ideas That Look Expensive",
        "Budget-Friendly {keyword}: {number} Tips",
        "Save Money on {keyword}: {number} Proven Ways",
        "{number} {keyword} Hacks for Tight Budgets",
        "Frugal {keyword}: {number} Smart Spending Ideas",
        "How to {keyword} Without Breaking the Bank",
        "{number} Free & Cheap {keyword} Ideas",
        "Budget {keyword}: {number} Steal-Worthy Ideas",
        "{number} Ways to {keyword} for Less",
        "Thrifty {keyword}: {number} Affordable Solutions",
        "Cut Costs on {keyword}: {number} Easy Ideas",
        "Free {keyword}: {number} No-Cost Options"
    ]
};

function getRandomNumber() {
    const numbers = [5, 7, 9, 10, 11, 12, 15, 20, 21, 25, 30, 50, 100];
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function generateTitles(keyword, tone = 'motivational') {
    if (!keyword.trim()) {
        alert('Please enter a keyword first!');
        return [];
    }

    const templates = titleTemplates[tone] || titleTemplates.motivational;
    const titles = [];
    const usedIndexes = new Set();

    while (titles.length < 15) {
        const randomIndex = Math.floor(Math.random() * templates.length);
        
        if (usedIndexes.has(randomIndex)) {
            continue;
        }
        
        usedIndexes.add(randomIndex);
        const template = templates[randomIndex];
        const number = getRandomNumber();
        
        const title = template
            .replace(/{keyword}/g, keyword)
            .replace(/{number}/g, number);

        titles.push(title);
    }

    return titles;
}

function saveToHistory(keyword) {
    let history = JSON.parse(localStorage.getItem('pinterestTitleHistory') || '[]');
    history = history.filter(item => item !== keyword);
    history.unshift(keyword);
    history = history.slice(0, 10);
    localStorage.setItem('pinterestTitleHistory', JSON.stringify(history));
}

function loadHistory() {
    return JSON.parse(localStorage.getItem('pinterestTitleHistory') || '[]');
}

async function copyToClipboard(text, button) {
    try {
        await navigator.clipboard.writeText(text);
        
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        button.classList.add('copy-success');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copy-success');
        }, 2000);
    } catch (err) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        button.textContent = '✓ Copied!';
        setTimeout(() => {
            button.textContent = '📋 Copy';
        }, 2000);
    }
}

// ============================================================
// UI INTERACTION LOGIC
// ============================================================

const keywordInput = document.getElementById('keyword-input');
const toneSelect = document.getElementById('tone-select');
const generateBtn = document.getElementById('generate-btn');
const resultsSection = document.getElementById('results-section');
const titlesContainer = document.getElementById('titles-container');
const copyAllBtn = document.getElementById('copy-all-btn');
const regenerateBtn = document.getElementById('regenerate-btn');
const clearBtn = document.getElementById('clear-btn');
const tryAnotherBtn = document.getElementById('try-another-btn');
const historyContainer = document.getElementById('history-container');
const btnText = document.getElementById('btn-text');
const loadingSpinner = document.getElementById('loading-spinner');

let currentTitles = [];
let currentKeyword = '';

function displayTitles(titles) {
    titlesContainer.innerHTML = '';
    currentTitles = titles;

    titles.forEach((title, index) => {
        const titleCard = document.createElement('div');
        titleCard.className = 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-lg p-3 fade-in';
        titleCard.setAttribute('data-title-index', index);

        titleCard.innerHTML = `
            <div class="flex gap-3">
                <div class="flex-1 min-w-0">
                    <p class="font-semibold text-gray-900 text-sm sm:text-base leading-snug break-words">
                        ${title}
                    </p>
                    <p class="text-xs text-gray-500 mt-2">
                        📊 ${title.length} characters
                    </p>
                </div>
                <button
                    class="copy-title-btn flex-shrink-0 bg-pink-600 hover:bg-pink-700 text-white px-3 py-2 rounded transition-smooth text-sm font-semibold whitespace-nowrap"
                    data-title="${title}"
                    aria-label="Copy this title"
                >
                    📋
                </button>
            </div>
        `;

        titlesContainer.appendChild(titleCard);
    });

    document.querySelectorAll('.copy-title-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            copyToClipboard(this.dataset.title, this);
        });
    });

    resultsSection.classList.remove('hidden');
}

function displayHistory() {
    const history = loadHistory();
    historyContainer.innerHTML = '';

    if (history.length === 0) {
        historyContainer.innerHTML = '<p class="text-sm text-gray-600">No recent searches yet</p>';
        return;
    }

    history.forEach(item => {
        const tag = document.createElement('button');
        tag.className = 'bg-white border border-blue-300 hover:bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full transition-smooth';
        tag.textContent = item;
        tag.setAttribute('data-history', item);
        
        tag.addEventListener('click', function() {
            keywordInput.value = item;
            generateTitlesHandler();
        });

        historyContainer.appendChild(tag);
    });
}

function generateTitlesHandler() {
    const keyword = keywordInput.value.trim();
    const tone = toneSelect.value;

    if (!keyword) {
        keywordInput.focus();
        keywordInput.setAttribute('aria-invalid', 'true');
        return;
    }

    currentKeyword = keyword;
    keywordInput.removeAttribute('aria-invalid');

    generateBtn.disabled = true;
    btnText.textContent = 'Generating...';
    loadingSpinner.classList.remove('hidden');

    setTimeout(() => {
        const titles = generateTitles(keyword, tone);
        displayTitles(titles);
        saveToHistory(keyword);
        displayHistory();

        generateBtn.disabled = false;
        btnText.textContent = '✨ Generate 15 Titles';
        loadingSpinner.classList.add('hidden');

        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
}

function copyAllTitles() {
    if (currentTitles.length === 0) return;
    const allText = currentTitles.join('\n');
    copyToClipboard(allText, copyAllBtn);
}

function regenerateTitles() {
    generateTitlesHandler();
}

function clearResults() {
    titlesContainer.innerHTML = '';
    resultsSection.classList.add('hidden');
    currentTitles = [];
    currentKeyword = '';
    keywordInput.value = '';
    keywordInput.focus();
}

// ============================================================
// EVENT LISTENERS
// ============================================================

generateBtn.addEventListener('click', generateTitlesHandler);
keywordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateTitlesHandler();
    }
});

copyAllBtn.addEventListener('click', copyAllTitles);
regenerateBtn.addEventListener('click', regenerateTitles);
clearBtn.addEventListener('click', clearResults);
tryAnotherBtn.addEventListener('click', function() {
    keywordInput.value = '';
    keywordInput.focus();
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

displayHistory();

document.addEventListener('click', function(e) {
    if (e.target.hasAttribute('data-history')) {
        keywordInput.value = e.target.textContent;
        generateTitlesHandler();
    }
});

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (document.activeElement === keywordInput) {
            generateTitlesHandler();
        }
    }
});

// ============================================================
// ACCESSIBILITY & PROGRESSIVE ENHANCEMENT
// ============================================================

document.querySelectorAll('details > summary').forEach(summary => {
    summary.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.parentElement.open = !this.parentElement.open;
        }
    });
});

// ============================================================
// SCROLL RESTORATION
// ============================================================

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
