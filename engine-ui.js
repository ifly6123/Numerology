/* =========================================================
   ENGINE — UI FILE (3 of 3)
   Modal/popup rendering, theme toggling, profile storage,
   the Notebook, Family board, backup/restore, sync links, the
   summary card, the guided tour, the quiz, and search. Load
   this last — it runs a couple of setup calls immediately
   (theme + schema check) and depends on engine-data.js and
   engine-content.js already being loaded.
   ========================================================= */

/* =========================================================
   MODAL / POPUP UI — injected once per page
   ========================================================= */
function ensureModal() {
    if (document.getElementById('npModal')) return;
    const div = document.createElement('div');
    div.id = 'npModal';
    div.className = 'modal-overlay';
    div.innerHTML = `
        <div class="modal-box">
            <button class="modal-close" onclick="closeInfo()" aria-label="Close">✕</button>
            <h3 id="npModalTitle"></h3>
            <div id="npModalBody"></div>
            <div style="text-align:right; margin-top:1.2rem;">
                <button class="btn small" onclick="closeInfo()">Cancel</button>
            </div>
        </div>`;
    div.addEventListener('click', (e) => { if (e.target === div) closeInfo(); });
    document.body.appendChild(div);
}

function openInfo(key) {
    ensureModal();
    const data = POPUPS[key];
    if (!data) return;
    document.getElementById('npModalTitle').textContent = data.title;
    document.getElementById('npModalBody').innerHTML = data.body.map(
        ([label, text]) => `<p class="label">${label}</p><p>${text}</p>`
    ).join('');
    document.getElementById('npModal').classList.add('open');
}

function openTraitInfo(key, label) {
    ensureModal();
    document.getElementById('npModalTitle').textContent = label;
    let body = `<p class="label">What this trait means</p><p>${TRAIT_POPUPS[key] || ''}</p>`;
    if (TRAIT_EXAMPLES[key]) body += `<p class="label">What it can look like</p><p>${TRAIT_EXAMPLES[key]}</p>`;
    if (TRAIT_GROWTH_TIPS[key]) body += `<p class="label">A small thing to try</p><p>${TRAIT_GROWTH_TIPS[key]}</p>`;
    document.getElementById('npModalBody').innerHTML = body;
    document.getElementById('npModal').classList.add('open');
}

/* Detailed single-day prediction popup, used by the calendar on the
   Daily Guidance page and the 31-year timeline on the Life Path page.
   Reads the saved profile itself, so callers just pass the date. */
function openDayModal(year, month, day) {
    ensureModal();
    const profile = loadProfile();
    if (!profile) return;
    const pred = buildDatePrediction(day, month, year, profile.day, profile.month);
    const dateObj = new Date(year, month - 1, day);
    const dateLabel = dateObj.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById('npModalTitle').textContent = dateLabel;
    document.getElementById('npModalBody').innerHTML = `
        <p class="label">Personal Year ${pred.py} · Personal Month ${pred.pm} · Personal Day ${pred.pd}</p>
        <p>${pred.core}</p>
        <p class="label">This Week's Rhythm</p><p>${pred.weekdayLine}</p>
        <p class="label">This Month's Bigger Picture</p><p>${pred.monthLine}</p>
        <p class="label">About This Calendar Date</p><p>${pred.dayOfMonthLine}</p>
        <p class="label">Good For</p><p>${pred.good}</p>
        <p class="label">Better To Avoid</p><p>${pred.bad}</p>
        <p class="label">Advice For The Day</p><p>${pred.advice}</p>
        <p class="label">Watch Out For</p><p>${pred.avoid}</p>
    `;
    document.getElementById('npModal').classList.add('open');
}

function closeInfo() {
    const m = document.getElementById('npModal');
    if (m) m.classList.remove('open');
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeInfo(); });

/* =========================================================
   THEME (light / colorful / dark) — persisted per browser
   ========================================================= */
function initTheme() {
    try {
        const saved = localStorage.getItem('npTheme');
        if (saved) document.documentElement.setAttribute('data-theme', saved);
    } catch (e) {}
    updateThemeIcon();
}
function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('npTheme', next); } catch (e) {}
    updateThemeIcon();
}
function updateThemeIcon() {
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
}
if (typeof document !== 'undefined') {
    initTheme();
}


/* =========================================================
   DATA SCHEMA VERSION
   Local storage now holds several keys (profile, notebook,
   family, milestones, theme, previous traits). This version tag
   lets a future update detect and migrate old saved data instead
   of silently breaking on a shape change.
   ========================================================= */
const SCHEMA_VERSION = 1;
function migrateData() {
    let stored;
    try { stored = parseInt(localStorage.getItem('npSchemaVersion'), 10); } catch (e) { stored = null; }
    if (stored === SCHEMA_VERSION) return;
    // No migrations needed yet — this is the first versioned release.
    // Future versions add steps here, e.g.:
    // if (!stored || stored < 2) { /* upgrade shape from v1 to v2 */ }
    try { localStorage.setItem('npSchemaVersion', String(SCHEMA_VERSION)); } catch (e) {}
}
if (typeof document !== 'undefined') { migrateData(); }

/* =========================================================
   PROFILE STORAGE
   ========================================================= */
function saveProfile(profile) {
    profile.schemaVersion = SCHEMA_VERSION;
    localStorage.setItem('npData', JSON.stringify(profile));
}
function loadProfile() {
    try {
        const raw = localStorage.getItem('npData');
        return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
}
function requireProfileOrRedirect() {
    const p = loadProfile();
    if (!p) {
        document.body.innerHTML = `
            <div class="container">
              <div class="panel" style="text-align:center;">
                <h2>No profile found yet</h2>
                <p class="sub">Please enter your details first.</p>
                <a class="btn gold" href="index.html">Go to Start</a>
              </div>
            </div>`;
        return null;
    }
    return p;
}

/* =========================================================
   PERSONAL NOTEBOOK — save any card from any page
   ========================================================= */
function loadNotes() {
    try { return JSON.parse(localStorage.getItem('npNotebook') || '[]'); } catch (e) { return []; }
}
function saveNotesList(list) {
    try { localStorage.setItem('npNotebook', JSON.stringify(list)); } catch (e) {}
}
function saveNote(title, text, sourcePage) {
    const notes = loadNotes();
    const id = 'n' + Date.now() + Math.floor(Math.random() * 1000);
    notes.unshift({ id, title, text, sourcePage: sourcePage || '', savedAt: new Date().toISOString() });
    saveNotesList(notes);
    return id;
}
function deleteNote(id) {
    saveNotesList(loadNotes().filter(n => n.id !== id));
}
/* Call from an inline onclick: saveNoteFromButton(this, 'Title', 'Text', 'career.html') */
function saveNoteFromButton(btn, title, text, sourcePage) {
    saveNote(title, text, sourcePage);
    const original = btn.textContent;
    btn.textContent = '✓ Saved';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 1600);
}
/* Returns an HTML snippet for a small "Save" star button, safe to drop into any card.
   Escapes the text for the inline onclick attribute. */
function saveButtonHTML(title, text, sourcePage) {
    const esc = s => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ');
    return `<button type="button" class="save-btn" style="margin-top:0.7rem;" title="Save to My Notebook" onclick="saveNoteFromButton(this, '${esc(title)}', '${esc(text)}', '${esc(sourcePage || '')}')">☆ Save</button>`;
}

/* =========================================================
   FAMILY / PEOPLE BOARD
   ========================================================= */
function loadFamily() {
    try { return JSON.parse(localStorage.getItem('npFamily') || '[]'); } catch (e) { return []; }
}
function saveFamilyList(list) {
    try { localStorage.setItem('npFamily', JSON.stringify(list)); } catch (e) {}
}
function addFamilyMember(name, day, month, year, gender) {
    const mulank = reduceToSingleDigit(day, true);
    const bhagyank = reduceToSingleDigit(`${day}${month}${year}`, true);
    const kua = calculateKua(year, gender);
    const gridCounts = calculateGridCounts(day, month, year);
    const list = loadFamily();
    const id = 'f' + Date.now() + Math.floor(Math.random() * 1000);
    list.push({ id, name, day, month, year, gender, mulank, bhagyank, kua, gridCounts });
    saveFamilyList(list);
    return id;
}
function deleteFamilyMember(id) {
    saveFamilyList(loadFamily().filter(f => f.id !== id));
}

/* =========================================================
   WEIGHTED COMPATIBILITY SCORE
   Blends Life Path (40%), Root/Birth Number (35%) and Kua (25%)
   into one overall percentage, instead of three separate labels.
   ========================================================= */
function computeCompatibilityScore(mulankA, bhagyankA, kuaA, mulankB, bhagyankB, kuaB) {
    const relScore = (type) => ({ friendly: 88, neutral: 58, enemy: 28 }[type] ?? 58);
    const rLife = relScore(getRelationType(bhagyankA, bhagyankB));
    const rRoot = relScore(getRelationType(mulankA, mulankB));
    const rKua = relScore(getRelationType(kuaA, kuaB));
    const score = Math.round(rLife * 0.40 + rRoot * 0.35 + rKua * 0.25);
    let band = 'Low';
    if (score >= 75) band = 'VeryHigh'; else if (score >= 60) band = 'High'; else if (score >= 40) band = 'Moderate';
    return { score, band, rLife, rRoot, rKua };
}
const COMPAT_SCORE_LINES = {
    Low: "This pairing takes real, conscious effort — your natural rhythms pull in fairly different directions.",
    Moderate: "This pairing is workable but not automatic — clear communication will matter more than usual.",
    High: "This pairing flows fairly naturally — your core numbers line up well on most fronts.",
    VeryHigh: "This is a strongly aligned pairing — your core numbers reinforce each other across the board."
};

/* =========================================================
   CORE NUMBER INTERACTIONS
   Individually, Mulank/Bhagyank/Kua each get their own reading.
   This section instead looks at how they interact with each
   other — where they reinforce each other and where they pull
   in different directions.
   ========================================================= */
const CORE_INTERACTION_PAIRS = [
    { a: 'mulank', b: 'bhagyank', aLabel: 'Birth Number', bLabel: 'Life Path Number', framing: "who you are day-to-day and where your life keeps pushing you" },
    { a: 'mulank', b: 'kua', aLabel: 'Birth Number', bLabel: 'Kua Number', framing: "your natural personality and the spaces or directions that tend to support you" },
    { a: 'bhagyank', b: 'kua', aLabel: 'Life Path Number', bLabel: 'Kua Number', framing: "your long-term direction and the environments that back you up" }
];
function describeCoreInteraction(numA, numB, aLabel, bLabel, framing) {
    const baseA = safeDigit(numA), baseB = safeDigit(numB);
    if (baseA === baseB) {
        return `Your ${aLabel} and ${bLabel} are the same number. That creates unusual clarity — ${framing} line up so closely that this theme shows up consistently across almost every area of your life, rather than shifting depending on context.`;
    }
    const type = getRelationType(numA, numB);
    const capFraming = framing.charAt(0).toUpperCase() + framing.slice(1);
    if (type === 'friendly') {
        return `Your ${aLabel} and ${bLabel} naturally support each other. ${capFraming} tend to pull in the same direction, so you're less likely to feel torn between the two — one reinforces the other rather than fighting it.`;
    }
    if (type === 'enemy') {
        return `Your ${aLabel} and ${bLabel} pull in noticeably different directions. ${capFraming} can genuinely feel like a tug-of-war at times — not a flaw, just something worth being aware of so you can consciously balance both sides instead of always favouring one.`;
    }
    return `Your ${aLabel} and ${bLabel} don't clash, but they don't obviously reinforce each other either. ${capFraming} sit somewhat separately, so it may take a little conscious effort to connect the two rather than expecting them to align on their own.`;
}
function computeCoreHarmony(mulank, bhagyank, kua) {
    const relScore = (type) => ({ friendly: 88, neutral: 58, enemy: 28 }[type] ?? 58);
    const pairScore = (a, b) => safeDigit(a) === safeDigit(b) ? 95 : relScore(getRelationType(a, b));
    const s1 = pairScore(mulank, bhagyank);
    const s2 = pairScore(mulank, kua);
    const s3 = pairScore(bhagyank, kua);
    const score = Math.round((s1 + s2 + s3) / 3);
    let band = 'Low';
    if (score >= 75) band = 'VeryHigh'; else if (score >= 60) band = 'High'; else if (score >= 40) band = 'Moderate';
    return { score, band };
}
const CORE_HARMONY_LINES = {
    Low: "Your core numbers pull in fairly different directions. This isn't a problem to fix — it often just means different parts of you need active, conscious balancing rather than running on autopilot.",
    Moderate: "Your core numbers are workable together, without being automatically aligned. A little self-awareness helps them work as a team.",
    High: "Your core numbers largely support each other, which tends to make your personality feel fairly consistent across different areas of life.",
    VeryHigh: "Your core numbers are strongly aligned. The way you naturally act, the direction your life keeps pulling toward, and what supports you all tend to point the same way."
};

/* =========================================================
   TRAIT COMBINATIONS
   Reading 14 trait bars one at a time misses the more useful
   insight: how two traits interact together. This checks a set
   of common, meaningful pairings and surfaces the ones that
   actually match this person's profile.
   ========================================================= */
const TRAIT_COMBOS = [
    {
        title: "Explosive Pride",
        test: t => t.anger_general >= 55 && t.ego >= 55,
        text: "When your temper and your need to be right are both running high, disagreements can escalate fast — a small correction can feel like a personal attack, and the reaction can be bigger than the moment calls for. Naming this pattern out loud to yourself in the moment ('this is my pride talking') tends to help more than trying to suppress the anger directly."
    },
    {
        title: "Protective Fire",
        test: t => t.anger_general >= 55 && t.empathy >= 55,
        text: "Your frustration usually comes from caring, not indifference — you feel for people strongly, and when they're mistreated or dismissed, that empathy turns into real heat. This combination often makes you a fierce advocate for others, even if you're less quick to defend yourself the same way."
    },
    {
        title: "Quiet Giver",
        test: t => t.people_pleasing >= 55 && t.ego <= 40,
        text: "You tend to give a lot without needing credit for it, which makes you easy to be around — but it also means your own needs can quietly go unmet for a long time before anyone (including you) notices. Practising small, low-stakes requests for yourself can help rebalance this over time."
    },
    {
        title: "Overlooked Empath",
        test: t => t.empathy >= 55 && t.confidence <= 40,
        text: "You sense what other people need clearly, but you're less sure of your own instincts when it comes to yourself — you may hold back an insight you'd have shared instantly on someone else's behalf. Your read on others is usually more reliable than you give it credit for; it's worth extending some of that trust inward."
    },
    {
        title: "Reluctant Leader",
        test: t => t.leadership >= 55 && t.people_pleasing >= 55,
        text: "You have real leadership instincts, but your discomfort with conflict can make you soften decisions that need to be firm, or delay a call to avoid upsetting someone. Recognising that a good decision delivered kindly is still a good decision can help you lead without feeling like you're being harsh."
    },
    {
        title: "The Rigid Achiever",
        test: t => t.discipline >= 55 && t.adaptability <= 40,
        text: "You're excellent at sticking to a plan, but sudden changes can throw you more than they'd throw most people — your strength is consistency, and that same strength makes detours feel uncomfortable. Building small, deliberate flexibility into your routines (rather than treating every plan as fixed) can make change less jarring."
    },
    {
        title: "The Free Spirit",
        test: t => t.discipline <= 40 && t.adaptability >= 55,
        text: "You move easily with change and rarely feel stuck, but sticking to a long routine without an external structure can be genuinely difficult for you. Rather than fighting this, pairing loose goals with built-in variety (rather than a rigid schedule) tends to work far better for you than forcing consistency."
    },
    {
        title: "Confident But Shaky",
        test: t => t.confidence >= 55 && t.emotional_stability <= 40,
        text: "You come across as sure of yourself, and mostly you are — but underneath, bigger stresses can throw you more than people around you would guess from your outward composure. It's worth having at least one person who sees the less composed side, rather than carrying every wobble alone."
    },
    {
        title: "The Social Operator",
        test: t => t.sociability >= 55 && t.empathy <= 40,
        text: "You genuinely enjoy being around people and do it easily, but you may connect more through energy and conversation than through deeply tuning into what someone else is feeling. This isn't coldness — it just means your warmth shows up as engagement rather than emotional attunement, and that's worth knowing about yourself."
    },
    {
        title: "The Doubted Intuition",
        test: t => t.intuition >= 55 && t.confidence <= 40,
        text: "You often sense the right call before you can explain why, but you're quick to talk yourself out of it in favour of what seems more 'provable'. Your gut read is one of your stronger instincts — it may be worth testing it more often instead of defaulting to double-guessing it."
    },
    {
        title: "The Driven Achiever",
        test: t => t.ego_positive >= 55 && t.discipline >= 55,
        text: "You combine a strong drive to prove yourself with the consistency to actually follow through, which is a genuinely powerful combination for reaching long-term goals. The main thing worth watching is burnout — this combination doesn't always know when to stop and rest."
    },
    {
        title: "The Steady Anchor",
        test: t => t.emotional_stability >= 55 && t.empathy >= 55,
        text: "You stay calm under pressure and still notice what others are feeling, which tends to make you the person people go to during a crisis. Just make sure that role doesn't become one-directional — you're allowed to need steadying too, occasionally."
    }
];
function matchTraitCombos(traits) {
    const map = {};
    traits.forEach(t => { map[t.key] = t.pct; });
    return TRAIT_COMBOS.filter(c => c.test(map));
}

/* =========================================================
   SMARTER NAME CORRECTION — concrete spelling suggestions
   ========================================================= */
function generateNameFixes(fullName, mulank, bhagyank) {
    const suggestions = [];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let ch of letters) {
        const candidate = fullName.trim() + ' ' + ch;
        const num = safeDigit(calculateNameNumbers(candidate).nameNumber);
        const r1 = getRelationType(mulank, num);
        const r2 = getRelationType(bhagyank, num);
        if (r1 === 'friendly' && r2 === 'friendly') {
            suggestions.push({ type: 'middle initial', example: `${fullName.trim()} ${ch}.`, num });
        }
        if (suggestions.length >= 3) break;
    }
    if (suggestions.length < 3) {
        for (let ch of letters) {
            const candidate = fullName.trim() + ch.toLowerCase();
            const num = safeDigit(calculateNameNumbers(candidate).nameNumber);
            const r1 = getRelationType(mulank, num);
            const r2 = getRelationType(bhagyank, num);
            if (r1 !== 'enemy' && r2 !== 'enemy' && !(r1 === 'neutral' && r2 === 'neutral')) {
                suggestions.push({ type: 'added letter', example: `${fullName.trim()}${ch.toLowerCase()}`, num });
            }
            if (suggestions.length >= 3) break;
        }
    }
    return suggestions.slice(0, 3);
}

/* =========================================================
   MILESTONE / ANNIVERSARY TRACKER
   ========================================================= */
function loadMilestones() {
    try { return JSON.parse(localStorage.getItem('npMilestones') || '[]'); } catch (e) { return []; }
}
function saveMilestonesList(list) {
    try { localStorage.setItem('npMilestones', JSON.stringify(list)); } catch (e) {}
}
function addMilestone(label, day, month) {
    const list = loadMilestones();
    const id = 'm' + Date.now() + Math.floor(Math.random() * 1000);
    list.push({ id, label, day: parseInt(day, 10), month: parseInt(month, 10) });
    saveMilestonesList(list);
    return id;
}
function deleteMilestone(id) {
    saveMilestonesList(loadMilestones().filter(m => m.id !== id));
}

/* =========================================================
   EXPORT / IMPORT (BACKUP) — since everything lives only in
   this browser's local storage, this is the safety net.
   ========================================================= */
function exportAllData() {
    const bundle = {
        exportedAt: new Date().toISOString(),
        npData: localStorage.getItem('npData'),
        npNotebook: localStorage.getItem('npNotebook'),
        npFamily: localStorage.getItem('npFamily'),
        npMilestones: localStorage.getItem('npMilestones'),
        npTheme: localStorage.getItem('npTheme')
    };
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-numbers-backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
function importAllData(file, onDone) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const bundle = JSON.parse(e.target.result);
            if (bundle.npData) localStorage.setItem('npData', bundle.npData);
            if (bundle.npNotebook) localStorage.setItem('npNotebook', bundle.npNotebook);
            if (bundle.npFamily) localStorage.setItem('npFamily', bundle.npFamily);
            if (bundle.npMilestones) localStorage.setItem('npMilestones', bundle.npMilestones);
            if (bundle.npTheme) localStorage.setItem('npTheme', bundle.npTheme);
            if (onDone) onDone(true);
        } catch (err) {
            if (onDone) onDone(false);
        }
    };
    reader.onerror = function() { if (onDone) onDone(false); };
    reader.readAsText(file);
}

/* =========================================================
   SHAREABLE SYNC LINK — move your profile to another device
   without any server. The whole profile is compressed into a
   URL parameter; opening that link on another device (or
   browser) offers to load it in. No account, no upload, no
   backend of any kind — the link itself carries the data.
   ========================================================= */
function encodeProfileForLink(profile) {
    try {
        const json = JSON.stringify(profile);
        return encodeURIComponent(btoa(unescape(encodeURIComponent(json))));
    } catch (e) { return null; }
}
function decodeProfileFromLink(encoded) {
    try {
        const json = decodeURIComponent(escape(atob(decodeURIComponent(encoded))));
        return JSON.parse(json);
    } catch (e) { return null; }
}
function buildSyncLink(profile) {
    const encoded = encodeProfileForLink(profile);
    if (!encoded) return null;
    const base = window.location.href.replace(/[^\/]*$/, '');
    return `${base}index.html?sync=${encoded}`;
}
/* Checked on index.html load: if a ?sync= link was opened, offer to load it. */
function checkForSyncLink() {
    try {
        const params = new URLSearchParams(window.location.search);
        const encoded = params.get('sync');
        if (!encoded) return null;
        const profile = decodeProfileFromLink(encoded);
        return profile && profile.fullName ? profile : null;
    } catch (e) { return null; }
}

/* =========================================================
   SHAREABLE SUMMARY CARD — drawn on a <canvas>, downloaded as PNG.
   No server involved; everything happens in the browser.
   ========================================================= */
function downloadSummaryCard(profile) {
    const canvas = document.createElement('canvas');
    canvas.width = 1000; canvas.height = 600;
    const ctx = canvas.getContext('2d');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    const grad = ctx.createLinearGradient(0, 0, 1000, 600);
    grad.addColorStop(0, isDark ? '#161b28' : '#1b1030');
    grad.addColorStop(1, isDark ? '#05070d' : '#3b0a52');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1000, 600);

    ctx.fillStyle = 'rgba(212,175,55,0.9)';
    ctx.font = '700 22px Georgia, serif';
    ctx.fillText('MY NUMBERS', 60, 70);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 46px Georgia, serif';
    ctx.fillText(profile.fullName, 60, 140);

    const topTrait = (profile.traits && profile.traits.length) ? [...profile.traits].sort((a,b) => b.pct - a.pct)[0] : null;

    const stats = [
        ['Birth Number', profile.mulank],
        ['Life Path Number', profile.bhagyank],
        ['Kua Number', profile.kua],
        ['Name Number', profile.nameNumber]
    ];
    let x = 60, y = 240;
    stats.forEach(([label, val], i) => {
        const cx = x + (i % 2) * 460;
        const cy = y + Math.floor(i / 2) * 130;
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fillRect(cx, cy, 420, 100);
        ctx.fillStyle = '#d4af37';
        ctx.font = '700 16px Arial';
        ctx.fillText(label.toUpperCase(), cx + 24, cy + 32);
        ctx.fillStyle = '#ffffff';
        ctx.font = '800 44px Arial';
        ctx.fillText(String(val), cx + 24, cy + 78);
    });

    if (topTrait) {
        ctx.fillStyle = 'rgba(255,255,255,0.75)';
        ctx.font = '600 20px Arial';
        ctx.fillText(`Strongest trait: ${topTrait.label} — ${topTrait.pct}%`, 60, 550);
    }
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '400 14px Arial';
    ctx.fillText('Generated by a static, local-only numerology app', 60, 580);

    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-numbers-summary.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

/* =========================================================
   FIRST-VISIT GUIDED TOUR
   ========================================================= */
const TOUR_SLIDES = [
    { title: "Welcome", text: "This app turns your birth details into a full numerology profile — personality, career, health, relationships, and more. Nothing you enter ever leaves your device." },
    { title: "Dashboard", text: "Your Dashboard is home base — a snapshot of every section with quick links to dive deeper." },
    { title: "Personality & Health", text: "These pages use percentage bars, not vague labels, so you can see exactly how strongly each trait or pattern shows up for you." },
    { title: "Life Path Timeline", text: "Explore a full 31-year calendar. Tap any date, past or future, for its own detailed reading." },
    { title: "My Data", text: "Save anything that resonates to your Notebook, back up your whole profile as a file, or download a shareable summary card." },
    { title: "You're set", text: "Explore at your own pace using the menu at the top of every page. Have fun with it!" }
];
function shouldShowTour() {
    try { return !localStorage.getItem('npTourSeen'); } catch (e) { return false; }
}
function dismissTour() {
    try { localStorage.setItem('npTourSeen', '1'); } catch (e) {}
    const overlay = document.getElementById('npTour');
    if (overlay) overlay.remove();
}
function renderTour() {
    if (!shouldShowTour()) return;
    let idx = 0;
    const overlay = document.createElement('div');
    overlay.id = 'npTour';
    overlay.className = 'modal-overlay open';
    overlay.innerHTML = `<div class="modal-box">
        <button class="modal-close" onclick="dismissTour()" aria-label="Close tour">✕</button>
        <h3 id="tourTitle"></h3>
        <p id="tourText" style="margin-top:0.8rem;"></p>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1.5rem;">
            <span id="tourProgress" style="font-size:0.8rem; color:var(--text-light);"></span>
            <div>
                <button class="btn small" onclick="dismissTour()" style="margin-right:0.5rem;">Skip</button>
                <button class="btn small gold" id="tourNextBtn">Next</button>
            </div>
        </div>
    </div>`;
    document.body.appendChild(overlay);
    function render() {
        document.getElementById('tourTitle').textContent = TOUR_SLIDES[idx].title;
        document.getElementById('tourText').textContent = TOUR_SLIDES[idx].text;
        document.getElementById('tourProgress').textContent = `${idx + 1} / ${TOUR_SLIDES.length}`;
        document.getElementById('tourNextBtn').textContent = idx === TOUR_SLIDES.length - 1 ? 'Done' : 'Next';
    }
    document.getElementById('tourNextBtn').addEventListener('click', function() {
        idx++;
        if (idx >= TOUR_SLIDES.length) { dismissTour(); return; }
        render();
    });
    render();
}

/* =========================================================
   SELF-CHECK QUIZ — compare quiz answers against the numbers
   ========================================================= */
const QUIZ_QUESTIONS = [
    { trait: 'anger_general', prompt: "Someone cuts in front of you in a queue. What's your first reaction?", options: [
        { text: "I barely notice.", pts: 10 }, { text: "A flash of annoyance, gone quickly.", pts: 40 },
        { text: "I feel genuinely irritated for a while.", pts: 70 }, { text: "I say something on the spot.", pts: 95 }
    ]},
    { trait: 'ego', prompt: "You're proven wrong in front of others. How do you respond?", options: [
        { text: "I admit it right away, no issue.", pts: 10 }, { text: "I accept it, a little reluctantly.", pts: 40 },
        { text: "I feel the urge to defend myself first.", pts: 70 }, { text: "It's hard to let it go afterward.", pts: 95 }
    ]},
    { trait: 'empathy', prompt: "A friend is unusually quiet during a hangout. What happens?", options: [
        { text: "I probably don't notice.", pts: 10 }, { text: "I notice, but don't say anything.", pts: 40 },
        { text: "I gently ask if they're okay.", pts: 70 }, { text: "I feel their mood shift almost instantly.", pts: 95 }
    ]},
    { trait: 'people_pleasing', prompt: "Someone asks a favor at a bad time. What do you do?", options: [
        { text: "I say no without much guilt.", pts: 10 }, { text: "I consider it, but can decline.", pts: 40 },
        { text: "I usually say yes to avoid letting them down.", pts: 70 }, { text: "I always find a way to help, even if it costs me.", pts: 95 }
    ]},
    { trait: 'confidence', prompt: "You're asked to present something with no prep time. Reaction?", options: [
        { text: "I'd rather someone else did it.", pts: 10 }, { text: "Nervous, but I'd manage.", pts: 40 },
        { text: "I'd say yes without much hesitation.", pts: 70 }, { text: "I'd actually look forward to it.", pts: 95 }
    ]},
    { trait: 'emotional_stability', prompt: "Unexpected bad news arrives. How do you usually process it?", options: [
        { text: "It throws me off for a long while.", pts: 10 }, { text: "It takes me a day or so to settle.", pts: 40 },
        { text: "I'm rattled briefly, then steady again.", pts: 70 }, { text: "I stay level almost immediately.", pts: 95 }
    ]},
    { trait: 'sociability', prompt: "After a long week, how do you feel about a big social plan?", options: [
        { text: "I'd rather stay in, alone.", pts: 10 }, { text: "I'd go, but leave early.", pts: 40 },
        { text: "I'd enjoy it, in moderation.", pts: 70 }, { text: "I'd feel recharged by it.", pts: 95 }
    ]},
    { trait: 'discipline', prompt: "You start a new habit. Six weeks in, how's it going?", options: [
        { text: "Honestly, I've probably dropped it.", pts: 10 }, { text: "On and off, not fully consistent.", pts: 40 },
        { text: "Mostly consistent, with a few gaps.", pts: 70 }, { text: "Still going strong, no question.", pts: 95 }
    ]},
    { trait: 'adaptability', prompt: "Your plans get cancelled last minute. What's your reaction?", options: [
        { text: "It really throws off my day.", pts: 10 }, { text: "A bit annoying, but I adjust.", pts: 40 },
        { text: "I shrug and move to plan B.", pts: 70 }, { text: "Honestly, I don't mind at all.", pts: 95 }
    ]},
    { trait: 'leadership', prompt: "A group project has no clear direction. What do you do?", options: [
        { text: "I wait for someone else to take charge.", pts: 10 }, { text: "I'll contribute, but not lead.", pts: 40 },
        { text: "I'll step up if no one else does.", pts: 70 }, { text: "I usually end up setting the plan.", pts: 95 }
    ]},
    { trait: 'anger_emotional', prompt: "Someone you love forgets something that mattered to you. What happens next?", options: [
        { text: "I let it go almost immediately.", pts: 10 }, { text: "It stings, but I stay calm about it.", pts: 40 },
        { text: "My reaction is sharp and immediate.", pts: 70 }, { text: "The hurt turns into real anger fast.", pts: 95 }
    ]},
    { trait: 'anger_work', prompt: "A colleague's mistake creates extra work for you right before a deadline. Reaction?", options: [
        { text: "I barely register it as a problem.", pts: 10 }, { text: "Mildly annoyed, but I move on quickly.", pts: 40 },
        { text: "I feel real frustration building.", pts: 70 }, { text: "My patience runs out fast in the moment.", pts: 95 }
    ]},
    { trait: 'ego_positive', prompt: "Someone doubts you can pull something off. What's your instinct?", options: [
        { text: "Their opinion doesn't really motivate me either way.", pts: 10 }, { text: "It stings a little, but doesn't change much.", pts: 40 },
        { text: "It pushes me to try a bit harder.", pts: 70 }, { text: "I feel a strong drive to prove them wrong.", pts: 95 }
    ]},
    { trait: 'intuition', prompt: "You meet someone new and something feels 'off', with no clear reason why. What do you do?", options: [
        { text: "I ignore it — I need facts, not a feeling.", pts: 10 }, { text: "I notice it, but wait for evidence.", pts: 40 },
        { text: "I quietly trust it and stay a little guarded.", pts: 70 }, { text: "I trust it fully, almost without question.", pts: 95 }
    ]}
];
function computeQuizScores(answers) {
    // answers: { traitKey: pts }
    const result = {};
    Object.keys(answers).forEach(k => { result[k] = clampPct(answers[k]); });
    return result;
}

/* =========================================================
   SEARCH INDEX — one place to search across the whole app:
   glossary numbers, health symptoms, career paths, and every
   "know more" popup definition. Used by the Dashboard's search box.
   ========================================================= */
function buildSearchIndex() {
    const idx = [];
    [1,2,3,4,5,6,7,8,9,11,22,33].forEach(n => {
        idx.push({ title: 'Number ' + n + ' (Glossary)', snippet: NUMBER_MEANINGS.mulank[n] || '', type: 'Glossary', link: 'glossary.html?num=' + n });
    });
    SYMPTOM_MAP.forEach(s => {
        idx.push({ title: s.label + ' (Health)', snippet: s.note, type: 'Health', link: 'health.html' });
    });
    CAREER_DIRECTORY.forEach(c => {
        idx.push({ title: c.title + ' (Career)', snippet: c.desc, type: 'Career', link: 'career.html' });
    });
    Object.keys(POPUPS).forEach(key => {
        const pop = POPUPS[key];
        idx.push({ title: pop.title, snippet: pop.body.map(b => b[1]).join(' '), type: 'Definition', link: null, popupKey: key });
    });
    const pageLinks = [
        ['Numerology Profile', 'Your Birth Number, Life Path Number, Kua Number, Name Number, and Lo Shu Grid.', 'overview.html'],
        ['Personality Profile', 'Percentage bars for anger, ego, empathy, confidence, and more.', 'personality.html'],
        ['Career Fit', 'Your work style, job titles to explore, and career timing.', 'career.html'],
        ['Compatibility', 'Compare yourself or saved people against anyone else.', 'compatibility.html'],
        ['Life Path Timeline', 'A 31-year calendar with a detailed reading for any date.', 'life-path.html'],
        ['Health & Body', 'Wellness scores, dosha type, and a symptom-first lookup.', 'health.html'],
        ['Daily Rhythms', 'Your best hours of the day and a general wealth-channel note.', 'rhythms.html'],
        ['Daily Guidance', "Today's calendar, a 9-point reading, and a reflection prompt.", 'daily.html'],
        ['Self-Check Quiz', 'Compare your own sense of yourself to your numbers.', 'quiz.html'],
        ['Family & Friends', 'Save people and compare compatibility at a glance.', 'family.html'],
        ['My Data', 'Notebook, backup, sync link, milestones, and your summary card.', 'mydata.html']
    ];
    pageLinks.forEach(([title, snippet, link]) => idx.push({ title, snippet, type: 'Page', link }));
    return idx;
}
function searchIndex(index, query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index.filter(item =>
        item.title.toLowerCase().includes(q) || item.snippet.toLowerCase().includes(q)
    ).slice(0, 12);
}

/* =========================================================
   DISCOVERABILITY — a rotating "Did You Know?" tip on the
   Dashboard, surfacing features that are easy to miss.
   ========================================================= */
const DASHBOARD_TIPS = [
    "You can check compatibility between two saved family members without including yourself — try it on the Family & Friends page.",
    "Health has a symptom-first lookup: pick a concern like 'trouble sleeping' and see which numbers are linked to it.",
    "Every core number on your Numerology Profile links straight to its full write-up in the Numbers Glossary.",
    "You can generate a link that carries your whole profile, so you can open the same numbers on another device — no account needed.",
    "The Life Path Timeline goes 31 years — open any year, then any month, then tap any single day for its own unique reading.",
    "Tap the ☆ Save button on any card to send it to your Notebook, so you don't lose track of what mattered most.",
    "The Self-Check Quiz compares your own sense of yourself against what your numbers say — the gaps are often the most interesting part.",
    "You can save recurring dates like anniversaries on My Data and get their numerology reading each year automatically.",
    "Daily Guidance includes a reflection prompt that changes every day, tied to a different trait each time.",
    "Your Personality page shows real trait combinations (like 'Explosive Pride' or 'The Rigid Achiever'), not just individual bars."
];
function pickDailyTip() {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    return DASHBOARD_TIPS[dayOfYear % DASHBOARD_TIPS.length];
}
