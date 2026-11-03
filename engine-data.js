/* =========================================================
   ENGINE — DATA FILE (1 of 3)
   Pure calculations and the personality/wellness/career scoring
   engines. Load this first — engine-content.js and engine-ui.js
   both depend on functions and constants defined here.
   ========================================================= */

/* =========================================================
   NUMEROLOGY ENGINE — shared by every page of the app
   Stores one calculated profile in localStorage under "npData"
   ========================================================= */

const chaldeanMap = {
    A:1,B:2,C:3,D:4,E:5,F:8,G:3,H:5,I:1,J:1,K:2,L:3,M:4,
    N:5,O:7,P:8,Q:1,R:2,S:3,T:4,U:6,V:6,W:6,X:5,Y:1,Z:7
};

function reduceToSingleDigit(input, keepMaster = false) {
    if (!input) return 0;
    let str = input.toString();
    if (keepMaster && (str === "11" || str === "22" || str === "33")) return parseInt(str, 10);
    let sum = 0;
    for (let ch of str) { let n = parseInt(ch, 10); if (!isNaN(n)) sum += n; }
    while (sum > 9 && !(keepMaster && (sum === 11 || sum === 22 || sum === 33))) {
        let next = 0;
        for (let ch of sum.toString()) { let n = parseInt(ch, 10); if (!isNaN(n)) next += n; }
        sum = next;
    }
    return sum;
}

function calculateNameNumbers(name) {
    const vowels = ['A','E','I','O','U'];
    let upper = (name || '').toUpperCase().replace(/[^A-Z]/g, '');
    let vowelSum = 0, consSum = 0, total = 0;
    for (let ch of upper) {
        let v = chaldeanMap[ch] || 0;
        total += v;
        if (vowels.includes(ch)) vowelSum += v; else consSum += v;
    }
    return {
        nameNumber: reduceToSingleDigit(total, true),
        heartDesire: reduceToSingleDigit(vowelSum, true),
        soulUrge: reduceToSingleDigit(consSum, true)
    };
}

function calculateKua(year, gender) {
    let yearSum = reduceToSingleDigit(year % 100, false);
    let kua = 0;
    if (gender === 'male') {
        kua = year < 2000 ? (10 - yearSum) : (9 - yearSum);
        while (kua <= 0) kua += 9;
        kua = reduceToSingleDigit(kua, false);
        if (kua === 5) kua = 2;
    } else {
        kua = year < 2000 ? (yearSum + 5) : (yearSum + 6);
        kua = reduceToSingleDigit(kua, false);
        if (kua === 5) kua = 8;
    }
    return kua;
}

// Count how many times each digit 1-9 appears in the birth date (Lo Shu grid).
// extraDigits (optional) lets us fold in core numbers, Kua, and any house/car/
// phone numbers the person entered, the same way a full numerology chart does.
function calculateGridCounts(day, month, year, extraDigits = '') {
    const raw = `${day}${month}${year}${extraDigits}`.replace(/[^0-9]/g, '');
    const counts = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0};
    for (let ch of raw) { let n = parseInt(ch, 10); if (n >= 1 && n <= 9) counts[n]++; }
    return counts;
}

function reduceAlphanumeric(input) {
    if (!input) return 0;
    let cleaned = input.toString().toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (!cleaned) return 0;
    let sum = 0;
    for (let ch of cleaned) {
        if (ch >= '0' && ch <= '9') sum += parseInt(ch, 10);
        else if (chaldeanMap[ch]) sum += chaldeanMap[ch];
    }
    return reduceToSingleDigit(sum, false);
}

const compatibilityMap = {
    1: { friendly: [1,2,3,5,6,9], enemy: [8], neutral: [4,7] },
    2: { friendly: [1,2,3,5], enemy: [4,6,8,9], neutral: [7] },
    3: { friendly: [1,2,3,5,7,9], enemy: [4], neutral: [6,8] },
    4: { friendly: [1,4,5,6,7,8], enemy: [2,9], neutral: [3] },
    5: { friendly: [1,4,5,6], enemy: [], neutral: [2,3,7,8,9] },
    6: { friendly: [1,4,5,6,7,8], enemy: [2,3], neutral: [9] },
    7: { friendly: [1,3,4,5,6,7,9], enemy: [2], neutral: [8] },
    8: { friendly: [4,5,6,8], enemy: [1,2,9], neutral: [3,7] },
    9: { friendly: [1,2,3,5,9], enemy: [6], neutral: [4,7,8] }
};
function safeDigit(n) { n = Math.abs(n); return n > 9 ? reduceToSingleDigit(n, false) : n; }
function getRelationType(num1, num2) {
    num1 = safeDigit(num1); num2 = safeDigit(num2);
    if (!compatibilityMap[num1]) return 'neutral';
    if (compatibilityMap[num1].friendly.includes(num2)) return 'friendly';
    if (compatibilityMap[num1].enemy.includes(num2)) return 'enemy';
    return 'neutral';
}
const RELATION_WORD = { friendly: 'Friendly', enemy: 'Needs Extra Effort', neutral: 'Neutral' };
const RELATION_BAND = { friendly: 'band-Low', enemy: 'band-High', neutral: 'band-Moderate' };

function personalYear(month, day, year) {
    return reduceToSingleDigit(safeDigit(month) + safeDigit(day) + safeDigit(year), false);
}
function personalMonth(py, month) { return reduceToSingleDigit(py + month, false); }
function personalDayNum(pm, day) { return reduceToSingleDigit(pm + day, false); }

/* Pinnacles & Challenges */
function computePinnaclesChallenges(month, day, year) {
    const bM = safeDigit(month), bD = safeDigit(day), bY = safeDigit(year);
    const pin1 = reduceToSingleDigit(bM + bD, true);
    const pin2 = reduceToSingleDigit(bD + bY, true);
    const pin3 = reduceToSingleDigit(pin1 + pin2, true);
    const pin4 = reduceToSingleDigit(bM + bY, true);
    const chal1 = Math.abs(bM - bD);
    const chal2 = Math.abs(bD - bY);
    const chal3 = Math.abs(chal1 - chal2);
    const chal4 = Math.abs(bM - bY);
    return { pin1, pin2, pin3, pin4, chal1, chal2, chal3, chal4 };
}

function clampPct(n) { return Math.max(4, Math.min(96, Math.round(n))); }

/* =========================================================
   PERSONALITY TRAIT ENGINE
   Every trait is scored 4-96% from a weighted mix of how many
   times each digit 1-9 shows up in the birth date, plus small
   adjustments from the Mulank (birth number), Bhagyank (life
   path) and Kua number. This is the same kind of digit-based
   logic numerologists use for the Lo Shu grid, just extended
   into more precise, everyday personality language.
   ========================================================= */

function scoreFromWeights(counts, weights, baseline = 24) {
    let raw = baseline;
    for (let digit in weights) raw += (counts[digit] || 0) * weights[digit];
    return raw;
}

function computeTraits(counts, mulank, bhagyank, kua) {
    const bump = (n, amt) => (n === mulank || n === bhagyank || n === kua) ? amt : 0;

    const defs = [
        {
            key: 'anger_general',
            label: 'Anger (Overall Temper)',
            weights: {1:9, 9:14, 5:6, 2:-9, 6:-6, 7:-4},
            extra: bump(9, 8) + bump(1, 5)
        },
        {
            key: 'anger_emotional',
            label: 'Anger in Relationships',
            weights: {9:12, 5:9, 2:-6, 6:-11, 7:-3},
            extra: bump(2, -6) + bump(6, -8)
        },
        {
            key: 'anger_work',
            label: 'Anger Under Work Pressure',
            weights: {8:12, 4:10, 1:6, 3:-10, 6:-4},
            extra: bump(8, 7) + bump(4, 5)
        },
        {
            key: 'ego',
            label: 'Ego (Need To Be Right)',
            weights: {1:14, 8:9, 4:4, 6:-7, 2:-8},
            extra: bump(1, 9) + bump(8, 5)
        },
        {
            key: 'ego_positive',
            label: 'Ego Used In A Positive Way',
            weights: {1:8, 8:8, 3:9, 9:7, 2:-3},
            extra: bump(9, 6) + bump(3, 5)
        },
        {
            key: 'empathy',
            label: 'Empathy (Feeling For Others)',
            weights: {6:13, 2:12, 9:8, 7:3, 1:-8, 8:-6},
            extra: bump(6, 8) + bump(2, 6)
        },
        {
            key: 'people_pleasing',
            label: 'People-Pleasing Tendency',
            weights: {6:11, 2:12, 4:-5, 1:-10, 8:-8},
            extra: bump(2, 7) + bump(6, 5)
        },
        {
            key: 'confidence',
            label: 'Self-Confidence',
            weights: {1:13, 8:8, 3:7, 9:5, 6:-3, 2:-6},
            extra: bump(1, 9)
        },
        {
            key: 'emotional_stability',
            label: 'Emotional Steadiness',
            weights: {4:10, 8:6, 6:6, 5:-9, 2:-4, 9:-3},
            extra: bump(4, 8)
        },
        {
            key: 'sociability',
            label: 'Sociability',
            weights: {3:13, 5:9, 6:6, 9:4, 7:-11, 4:-4},
            extra: bump(3, 8) + bump(7, -6)
        },
        {
            key: 'discipline',
            label: 'Discipline & Focus',
            weights: {4:14, 8:9, 1:4, 5:-11, 3:-5},
            extra: bump(4, 9)
        },
        {
            key: 'adaptability',
            label: 'Adaptability To Change',
            weights: {5:14, 3:6, 9:4, 4:-11, 7:-4},
            extra: bump(5, 9)
        },
        {
            key: 'leadership',
            label: 'Leadership Drive',
            weights: {1:14, 8:9, 9:5, 2:-8, 7:-3},
            extra: bump(1, 8) + bump(8, 5)
        },
        {
            key: 'intuition',
            label: 'Intuition & Inner Sense',
            weights: {7:13, 2:9, 9:4, 1:-5, 8:-4},
            extra: bump(7, 9) + bump(2, 5)
        }
    ];

    return defs.map(d => {
        const raw = scoreFromWeights(counts, d.weights, 24) + d.extra;
        const pct = clampPct(raw);
        let band = 'Low';
        if (pct >= 75) band = 'VeryHigh';
        else if (pct >= 55) band = 'High';
        else if (pct >= 35) band = 'Moderate';
        return { key: d.key, label: d.label, pct, band };
    });
}

function bandWord(band) {
    return { Low: 'low', Moderate: 'moderate', High: 'high', VeryHigh: 'very high' }[band] || 'moderate';
}

/* Short, plain sentence for each trait at each band. Kept varied
   so wording does not repeat from one trait to the next. */
const TRAIT_LINES = {
    anger_general: {
        Low: "Small annoyances rarely get under your skin. You stay calm even when things go wrong.",
        Moderate: "You can stay patient most days, but a few things can still push your buttons.",
        High: "You feel frustration quickly and it shows. Little things can build up fast.",
        VeryHigh: "Your temper rises fast and strong. You feel anger before you can stop it."
    },
    anger_emotional: {
        Low: "In close relationships you rarely lose your cool, even during arguments.",
        Moderate: "You usually stay calm with people you love, but hurt feelings can spill out sometimes.",
        High: "When someone close to you upsets you, your reaction is strong and immediate.",
        VeryHigh: "Emotional hurt turns into anger very quickly with the people closest to you."
    },
    anger_work: {
        Low: "Deadlines and pressure barely rattle you. You keep a level head at your desk.",
        Moderate: "Stress at work bothers you sometimes, but you mostly hold it together.",
        High: "Under deadlines or criticism at work, your patience runs out fast.",
        VeryHigh: "Work pressure hits you hard. Delays or mistakes from others make you snap."
    },
    ego: {
        Low: "You are comfortable admitting when you are wrong. Being right matters less to you than being fair.",
        Moderate: "You like your opinion to count, but you can still back down when needed.",
        High: "Being proven wrong is hard for you to accept. You want your view to win.",
        VeryHigh: "Your self-image is tightly tied to always being right. Losing an argument feels personal."
    },
    ego_positive: {
        Low: "You rarely use pride as fuel. Your motivation comes from somewhere other than proving yourself.",
        Moderate: "Now and then, wanting to prove a point pushes you to work harder.",
        High: "You turn your need to prove yourself into real effort and results.",
        VeryHigh: "Your strong drive to be seen as capable pushes you to achieve big things."
    },
    empathy: {
        Low: "You notice facts before feelings. Other people's emotions do not always register with you first.",
        Moderate: "You care about others but you do not always sense what they are feeling right away.",
        High: "You pick up on other people's moods easily and genuinely feel for them.",
        VeryHigh: "You absorb the feelings of people around you almost like they are your own."
    },
    people_pleasing: {
        Low: "You speak your mind even if it upsets someone. Approval from others is not a priority for you.",
        Moderate: "You try to keep the peace, but you can still say no when it matters.",
        High: "You often put other people's comfort ahead of your own to avoid conflict.",
        VeryHigh: "Saying no feels very hard for you. You often agree just to keep everyone happy."
    },
    confidence: {
        Low: "You tend to doubt your own judgment and look to others before deciding.",
        Moderate: "Your confidence depends on the situation. Some days you trust yourself more than others.",
        High: "You generally trust your own decisions and are not afraid to act on them.",
        VeryHigh: "You believe strongly in your own ability, even in unfamiliar situations."
    },
    emotional_stability: {
        Low: "Your mood can shift quickly depending on what is happening around you.",
        Moderate: "You stay fairly steady, though big events can still throw you off for a while.",
        High: "You keep your emotional balance even when life gets stressful.",
        VeryHigh: "You stay remarkably calm and steady no matter what is going on around you."
    },
    sociability: {
        Low: "You recharge alone and only need a small circle of people around you.",
        Moderate: "You enjoy people in doses, mixing social time with quiet time.",
        High: "Being around others energises you and you seek out company often.",
        VeryHigh: "You come alive in groups and rarely tire of being around people."
    },
    discipline: {
        Low: "Routines and long plans feel restrictive to you. You prefer to work in bursts.",
        Moderate: "You can follow a plan, but you sometimes lose steam halfway through.",
        High: "You stick to your goals and routines even when motivation dips.",
        VeryHigh: "You are extremely consistent and finish what you start, no matter what."
    },
    adaptability: {
        Low: "You prefer things to stay familiar and can find sudden change unsettling.",
        Moderate: "You can adjust to change, though it may take you a little time.",
        High: "You move with change easily and rarely feel thrown off by surprises.",
        VeryHigh: "You thrive on change and get restless if life stays the same for too long."
    },
    leadership: {
        Low: "You prefer to support a plan rather than be the one steering it.",
        Moderate: "You can lead when needed, but you do not always seek the role out.",
        High: "You naturally step forward to guide others and make decisions.",
        VeryHigh: "You are drawn to being in charge and feel most comfortable leading."
    },
    intuition: {
        Low: "You trust facts and evidence far more than a gut feeling.",
        Moderate: "You sometimes sense things before you can explain why, but you check the facts too.",
        High: "You often know something is right or wrong before you can prove it.",
        VeryHigh: "Your gut feeling is rarely wrong and you rely on it heavily."
    }
};

/* =========================================================
   LO SHU GRID — full plane definitions
   The grid is a 3x3 square. Numbers sit in fixed positions:
       4  9  2
       3  5  7
       8  1  6
   A "plane" is any straight line of three cells (a row, a
   column, or a diagonal). Each line has been given a meaning
   in old Chinese and Indian number charts. `cells` below are
   grid positions 0-8 reading left-to-right, top-to-bottom,
   matching the layout above — used to draw the mini diagrams.
   ========================================================= */
const LOSHU_PLANES = [
    {
        key: 'mental', name: "Mental Plane", numbers: [4,9,2], cells: [0,1,2],
        definition: "This is the top row of the grid. It stands for how your mind naturally works day to day — memory, quick thinking, and how easily you pick up new information.",
        meaning: "A Complete Mental Plane usually shows up as a sharp memory and fast learning. A Partial one means you learn well but maybe not effortlessly. An Inactive one does not mean low intelligence — it usually means your thinking style leans more practical or emotional than academic, and that structured study or repetition helps more than it does for others."
    },
    {
        key: 'emotional', name: "Emotional Plane", numbers: [3,5,7], cells: [3,4,5],
        definition: "This is the middle row of the grid. It stands for compassion, emotional sensitivity, and how connected you feel to other people's feelings.",
        meaning: "A Complete Emotional Plane usually means you feel things deeply and read people well. A Partial one is a fairly typical, balanced mix. An Inactive one often means you process the world more through logic than feeling — not a lack of care, just a different starting point."
    },
    {
        key: 'practical', name: "Practical Plane", numbers: [8,1,6], cells: [6,7,8],
        definition: "This is the bottom row of the grid. It stands for hands-on ability, common sense, and how well you manage everyday, real-world matters like money and routine.",
        meaning: "A Complete Practical Plane usually shows up as being naturally good with money and daily logistics. An Inactive one suggests these things take more conscious effort for you — worth building through habits rather than assuming they'll come naturally."
    },
    {
        key: 'planning', name: "Thought / Planning Plane", numbers: [4,3,8], cells: [0,3,6],
        definition: "This is the left column of the grid. It stands for how well you think ahead — spotting problems early and preparing instead of reacting.",
        meaning: "A Complete Planning Plane usually means you naturally think several steps ahead. An Inactive one means you may do better living and deciding in the moment, with structured checklists helping to cover the gaps."
    },
    {
        key: 'willpower', name: "Willpower Plane", numbers: [9,5,1], cells: [1,4,7],
        definition: "This is the middle column of the grid. It stands for determination — your ability to keep going when something gets difficult or boring.",
        meaning: "A Complete Willpower Plane usually shows up as strong resilience and follow-through. An Inactive one suggests motivation may come and go, so it helps to lean on external structure (deadlines, accountability partners) rather than willpower alone."
    },
    {
        key: 'action', name: "Action Plane", numbers: [2,7,6], cells: [2,5,8],
        definition: "This is the right column of the grid. It stands for how quickly you move from deciding something to actually doing it.",
        meaning: "A Complete Action Plane usually means you execute fast once you've decided. An Inactive one suggests you may spend longer than most people between the idea stage and the doing stage — which is fine, as long as you notice it and set your own deadlines."
    },
    {
        key: 'goldenSuccess', name: "Golden Success Plane (Raj Yog)", numbers: [4,5,6], cells: [0,4,8],
        definition: "This is the diagonal running from the top-left to the bottom-right. Traditionally, it is read as a marker of overall prosperity and being well regarded by others.",
        meaning: "A Complete Golden Success Plane is traditionally seen as a strong sign for status and recognition, often earned through steady effort. An Inactive one simply means success is likely to come through a different, more individual route than public recognition."
    },
    {
        key: 'propertyPlane', name: "Property Plane (Silver Yog)", numbers: [2,5,8], cells: [2,4,6],
        definition: "This is the diagonal running from the top-right to the bottom-left. Traditionally, it is read as a marker of stability tied to land, property, and physical assets.",
        meaning: "A Complete Property Plane is traditionally read as a natural ease with owning property or physical assets. An Inactive one suggests your wealth may build more through skills, business, or investments than through property specifically."
    }
];

/* =========================================================
   LO SHU DIGIT MEANINGS (1-9)
   Every digit is tied to a classic planetary quality. How many
   times it shows up in your grid — zero, once, or several times
   — changes how strongly that quality shows up in you, and what
   personality trait it links to.
   ========================================================= */
const DIGIT_MEANINGS = {
    1: {
        title: "1 — Leadership & Self-Belief (Sun)",
        trait: "Confidence / Ego",
        missing: "Missing a 1 often shows up as quiet self-doubt. You may find it hard to promote your own ideas or take the lead without a push from someone else.",
        normal: "One 1 gives you a healthy, natural level of self-belief and independence — you can lead when needed without needing to control everything.",
        repeat: "Several 1s intensify leadership and self-confidence strongly. You're highly self-reliant and driven to be in charge, but this can tip into stubbornness or brushing off other people's advice."
    },
    2: {
        title: "2 — Emotion & Sensitivity (Moon)",
        trait: "Empathy",
        missing: "Missing a 2 can make emotions feel harder to access or express — you may come across as more logical or detached than sensitive.",
        normal: "One 2 gives you a balanced emotional sensitivity — caring and empathetic without being overwhelmed by feelings.",
        repeat: "Several 2s intensify emotional sensitivity a great deal. You feel things deeply and read others' moods quickly, but this can also mean overthinking, mood swings, or taking things too personally."
    },
    3: {
        title: "3 — Expression & Optimism (Jupiter)",
        trait: "Sociability",
        missing: "Missing a 3 can make self-expression feel harder — you may hold back from sharing ideas or knowledge as confidently as you'd like.",
        normal: "One 3 gives you clear self-expression and a naturally positive, growth-minded outlook.",
        repeat: "Several 3s make you highly expressive, optimistic, and idea-driven — often the person others turn to for encouragement. Watch for over-promising or spreading your attention across too many things at once."
    },
    4: {
        title: "4 — Structure & Discipline (Rahu)",
        trait: "Discipline & Focus",
        missing: "Missing a 4 often shows up as a looser relationship with routine — staying organised or following through consistently can take more conscious effort.",
        normal: "One 4 gives you a healthy level of discipline and structure without becoming rigid about it.",
        repeat: "Several 4s make you extremely disciplined and detail-focused, but that intensity can turn into excessive worry, over-control, or trouble relaxing."
    },
    5: {
        title: "5 — Adaptability & Communication (Mercury)",
        trait: "Adaptability",
        missing: "Missing a 5 can make sudden change feel unsettling — you may take longer than most to adjust when plans shift.",
        normal: "One 5 gives you reasonable ease with change and clear, comfortable communication.",
        repeat: "Several 5s make you extremely adaptable, quick-witted, and communicative — a natural multitasker. This can also show up as restlessness, impatience, or trouble focusing on one thing for long."
    },
    6: {
        title: "6 — Love & Harmony (Venus)",
        trait: "People-Pleasing / Warmth",
        missing: "Missing a 6 can make warmth and closeness harder to express naturally — you may come across as more independent or reserved in relationships.",
        normal: "One 6 gives you a warm, caring nature and a healthy value for harmony in relationships.",
        repeat: "Several 6s create a very strong capacity for love, beauty, and devotion to family — deeply nurturing. Just watch for over-attachment, people-pleasing, or losing your own needs while caring for others."
    },
    7: {
        title: "7 — Reflection & Inner Life (Ketu)",
        trait: "Intuition",
        missing: "Missing a 7 often means you lean more toward the practical and material side of life, with less natural pull toward introspection.",
        normal: "One 7 gives you a healthy inner life — balancing practical action with occasional reflection.",
        repeat: "Several 7s make you deeply intuitive, reflective, and drawn to philosophical or spiritual questions. This can tip into overthinking, isolation, or drifting from everyday practical matters."
    },
    8: {
        title: "8 — Ambition & Discipline (Saturn)",
        trait: "Ambition / Ego-Positive",
        missing: "Missing an 8 can make sustained hard work or patience under pressure feel more difficult — you may prefer quicker results over a long grind.",
        normal: "One 8 gives you a solid work ethic and a comfortable relationship with responsibility.",
        repeat: "Several 8s create an intense drive for achievement and a willingness to work relentlessly for long-term success — but often at the cost of over-working, financial stress, or difficulty enjoying the present."
    },
    9: {
        title: "9 — Energy & Courage (Mars)",
        trait: "Anger / Drive",
        missing: "Missing a 9 can mean a quieter drive for bold action — you may hesitate rather than push forward assertively when it counts.",
        normal: "One 9 gives you a healthy amount of courage and energy — willing to act when needed without being reckless.",
        repeat: "Several 9s bring intense energy, courage, and a strong sense of justice. This same intensity often fuels a quicker temper, impatience, or a pull toward conflict when things don't go your way."
    }
};
function digitMeaningTier(count) {
    if (count === 0) return 'missing';
    if (count === 1) return 'normal';
    return 'repeat';
}



/* =========================================================
   WELLNESS ENGINE (Health & Body page)
   Uses the same weighted-digit approach as the personality
   engine, applied to physical/energy-related traits.
   ========================================================= */
function computeWellness(gridCounts, mulank) {
    const bump = (n, amt) => (n === mulank) ? amt : 0;
    const defs = [
        { key: 'vitality', label: 'Physical Vitality', weights: {1:12,9:8,3:6,4:-8,7:-6}, extra: bump(1,8) },
        { key: 'stress_resilience', label: 'Stress Resilience', weights: {4:11,8:8,6:5,5:-10,2:-6}, extra: bump(4,8) },
        { key: 'sleep_quality', label: 'Sleep Quality', weights: {6:10,2:8,4:6,5:-11,9:-5}, extra: bump(6,6) },
        { key: 'recovery_speed', label: 'Recovery After Illness', weights: {8:10,1:8,3:6,7:-9,5:-4}, extra: bump(8,6) }
    ];
    return defs.map(d => {
        const raw = scoreFromWeights(gridCounts, d.weights, 30) + d.extra;
        const pct = clampPct(raw);
        let band = 'Low';
        if (pct >= 75) band = 'VeryHigh'; else if (pct >= 55) band = 'High'; else if (pct >= 35) band = 'Moderate';
        return { key: d.key, label: d.label, pct, band };
    });
}
const WELLNESS_LINES = {
    vitality: { Low: "Your natural energy tank runs a little lower — pacing yourself matters more than pushing through.", Moderate: "Your energy is fairly steady, with occasional dips.", High: "You tend to have strong, dependable physical energy most days.", VeryHigh: "You run on unusually high natural energy and stamina." },
    stress_resilience: { Low: "Stress tends to affect you quickly — recovery time matters a lot for you.", Moderate: "You handle everyday stress reasonably well, with tougher patches under real pressure.", High: "You bounce back from stress faster than most.", VeryHigh: "You handle high pressure unusually well without it wearing you down." },
    sleep_quality: { Low: "Your sleep pattern is more easily disturbed by stress or an active mind.", Moderate: "Your sleep is generally okay, with occasional restless nights.", High: "You tend to sleep soundly and wake up rested.", VeryHigh: "Sleep tends to come easily and deeply for you." },
    recovery_speed: { Low: "You may take a little longer than average to bounce back from illness or injury.", Moderate: "Your recovery speed is about average.", High: "You tend to recover from illness or setbacks faster than most.", VeryHigh: "You bounce back from physical setbacks unusually fast." }
};

/* =========================================================
   CAREER ENGINE — concrete job titles + entrepreneur score
   ========================================================= */
const JOB_TITLES = {
    1: ["Founder / CEO", "Sales Director", "Politician", "Military Officer", "General Manager"],
    2: ["HR Manager", "Counsellor", "Diplomat", "Nurse", "Client Relations Lead"],
    3: ["Teacher", "Content Creator", "Lawyer", "Financial Advisor", "Public Speaker"],
    4: ["Software Engineer", "Civil Engineer", "Accountant", "Operations Manager", "Systems Analyst"],
    5: ["Sales Executive", "Journalist", "Travel Consultant", "Import/Export Trader", "Marketing Manager"],
    6: ["Interior Designer", "Chef", "Event Planner", "Hotel Manager", "Fashion Designer"],
    7: ["Research Scientist", "Data Analyst", "Pharmacist", "Professor", "Investigator"],
    8: ["Real Estate Developer", "Investment Banker", "Construction Manager", "Corporate Lawyer", "Business Owner"],
    9: ["Surgeon", "Police Officer", "NGO Director", "Mechanical Engineer", "Athlete / Coach"],
    11: ["Life Coach", "UX Designer", "Spiritual Teacher", "Therapist"],
    22: ["Architect", "Infrastructure Project Lead", "Urban Planner"],
    33: ["Hospital Administrator", "Global Health Director", "Senior Educator"]
};
function computeEntrepreneurScore(gridCounts, mulank, bhagyank) {
    const bump = (n, amt) => (n === mulank || n === bhagyank) ? amt : 0;
    const weights = {1:13, 8:11, 5:7, 3:4, 2:-10, 4:-4, 7:-3};
    const raw = scoreFromWeights(gridCounts, weights, 32) + bump(1,8) + bump(8,7);
    return clampPct(raw);
}
const ENTREPRENEUR_LINES = {
    Low: "You're likely to feel steadier and more effective inside an established structure, with clear roles and steady income, rather than building something from zero.",
    Moderate: "You could go either way — running something of your own is possible, but it works best with a co-founder or a stable base income alongside it.",
    High: "You show a real pull toward building and running your own thing, and are likely to feel restless staying purely as an employee long-term.",
    VeryHigh: "You have a strong natural drive to lead your own venture — working strictly under someone else's direction long-term may feel limiting."
};

/* Browsable career directory — shown to everyone, not just the person's own number,
   so they can explore paths beyond their top match. (Defined further below, once
   INDUSTRY_SIMPLE exists — see near the bottom of this section.) */

/* =========================================================
   EXPANDED HEALTH ANALYSIS — specific issues + self-care list
   ========================================================= */
const HEALTH_ISSUES_DETAILED = {
    1: ["Tension headaches from overwork or stress", "High blood pressure if drive isn't balanced with rest", "Poor circulation from long hours sitting or standing rigidly", "Eye strain from screen-heavy, decision-making work"],
    2: ["Acidity or bloating linked to swallowed stress", "Fatigue from absorbing other people's emotional load", "Menstrual or hormonal sensitivity to stress", "Sleep disruption during emotionally tense periods"],
    3: ["Liver sluggishness from rich food and irregular meals", "Weight fluctuation tied to inconsistent routines", "Joint stiffness in hips and thighs from a sedentary, social lifestyle", "Mild anxiety around public performance or scrutiny"],
    4: ["Muscle tension from resisting change or overworking a routine", "Breathing shallow under pressure, which can worsen anxiety", "Repetitive strain from long hours at a desk or on a single task", "Digestive stiffness tied to rigid eating schedules"],
    5: ["Nervous exhaustion from constant mental stimulation", "Skin flare-ups during high-stress or high-travel periods", "Throat and thyroid sensitivity, especially with irregular sleep", "Restless leg or fidgeting linked to pent-up energy"],
    6: ["Lower back tension from carrying responsibility for others", "Hormonal imbalance during high-stress family periods", "Throat infections tied to holding back words to keep the peace", "Sugar cravings during emotional stress"],
    7: ["Unexplained fatigue with no clear medical cause", "Digestive sensitivity linked to overthinking or isolation", "Sleep difficulty from a mind that won't switch off", "Mild immune dips during long stretches without rest"],
    8: ["Joint or bone stiffness from long work hours", "Tooth and gum sensitivity tied to mineral depletion under stress", "Slow-healing injuries during high-pressure periods", "Tension headaches linked to financial or status pressure"],
    9: ["Sudden spikes in blood pressure during conflict", "Muscle inflammation from intense physical or emotional exertion", "Fever-prone immune response during high-stress periods", "Skin flare-ups tied to suppressed frustration"]
};
const SELF_CARE_CHECKLIST = {
    1: ["Schedule short breaks between demanding tasks, even 5 minutes counts", "Get your blood pressure checked at least once a year", "Practice one calming activity daily — even a short walk helps"],
    2: ["Keep a simple journal to release feelings before they turn into stomach tension", "Stay consistent with meal times to protect digestion", "Set one small boundary each week to protect your own energy"],
    3: ["Balance rich meals with lighter days during the week", "Get a basic liver and cholesterol panel done annually", "Add light stretching to loosen the hips and thighs regularly"],
    4: ["Take a 5-minute stretch break every hour if desk-bound", "Practice slow breathing exercises during high-pressure moments", "Build in one flexible, unplanned hour each week to reduce rigidity"],
    5: ["Protect your sleep schedule even during busy or exciting periods", "Do a calming activity before bed to quiet a racing mind", "Check in on thyroid health if fatigue feels unusual"],
    6: ["Practice saying no at least once this week without guilt", "Watch your sugar intake, especially during stressful weeks", "Get periodic hormone-related checkups, especially after major life changes"],
    7: ["Build in quiet, alone time daily, not just when you're depleted", "Keep meals simple and easy to digest", "Talk to someone you trust when withdrawing starts to feel isolating"],
    8: ["Add calcium and vitamin D rich foods to your regular diet", "Take short breaks from demanding physical or desk work", "Get joint and bone health checked periodically, especially past your 40s"],
    9: ["Practice a cool-down activity after intense emotional moments", "Watch spicy food and alcohol intake during high-stress periods", "Track your blood pressure if you notice frequent frustration"]
};

/* =========================================================
   SYMPTOM-FIRST LOOKUP
   The Health page is normally read number-first (start with
   your own number, see what it says). This works the other way:
   start with a concern, see which numbers are commonly linked
   to it, and whether that matches this person's own chart.
   ========================================================= */
const SYMPTOM_MAP = [
    { key: 'sleep', label: "Trouble Sleeping", numbers: [5, 7, 2], note: "Restlessness (5), an overactive mind (7), and absorbed stress (2) are the numbers most often linked to disturbed sleep." },
    { key: 'energy', label: "Low Energy / Fatigue", numbers: [8, 4, 7], note: "Overwork (8), rigid routines (4), and mental depletion (7) are the numbers most often linked to ongoing tiredness." },
    { key: 'digestion', label: "Digestive Issues", numbers: [2, 3], note: "Swallowed stress (2) and rich, irregular eating (3) are the numbers most often linked to stomach trouble." },
    { key: 'joints', label: "Joint / Bone Discomfort", numbers: [8], note: "Long hours and sustained physical or mental pressure (8) are most often linked to joint and bone strain." },
    { key: 'skin', label: "Skin Issues / Flare-Ups", numbers: [5, 6, 9], note: "Nervous tension (5), hormonal shifts (6), and suppressed frustration (9) are the numbers most often linked to skin flare-ups." },
    { key: 'anxiety', label: "Anxiety / Restlessness", numbers: [5, 2], note: "A busy, changeable mind (5) and emotional over-absorption (2) are the numbers most often linked to anxious energy." },
    { key: 'headaches', label: "Headaches / Tension", numbers: [1, 9], note: "Pressure to lead or control (1) and suppressed anger (9) are the numbers most often linked to tension headaches." },
    { key: 'weight', label: "Weight Fluctuation", numbers: [3, 6], note: "Inconsistent routines (3) and stress-linked comfort eating (6) are the numbers most often linked to weight changes." }
];
function lookupSymptom(symptomKey, profile) {
    const symptom = SYMPTOM_MAP.find(s => s.key === symptomKey);
    if (!symptom) return null;
    const mulankBase = safeDigit(profile.mulank);
    const matchesOwnNumber = symptom.numbers.includes(mulankBase);
    const missingRelated = symptom.numbers.filter(n => !(profile.gridCounts[n] > 0));
    let verdict;
    if (matchesOwnNumber) {
        verdict = `Your own Birth Number (${mulankBase}) is one of the numbers linked to this, so it may be worth a bit of extra attention for you specifically.`;
    } else if (missingRelated.length) {
        verdict = `You're missing ${missingRelated.join(' and ')} in your chart, which are among the numbers linked to this — worth keeping an eye on, without assuming it will definitely affect you.`;
    } else {
        verdict = "This isn't strongly linked to your specific numbers, but that doesn't rule it out — general care is always worth it regardless.";
    }
    return { ...symptom, verdict };
}

/* =========================================================
   JOURNALING PROMPTS
   A short, specific daily reflection question, generated from
   today's Personal Day theme plus one trait from this person's
   own profile — rotates automatically day to day.
   ========================================================= */
const JOURNAL_PROMPTS = {
    anger_general: "Think of a recent moment you felt anger rising. What actually triggered it, underneath the surface reaction?",
    anger_emotional: "When did someone close to you last upset you? Looking back, what did you actually need from them in that moment?",
    anger_work: "What's one work frustration you're still holding onto? What would it take to genuinely let it go?",
    ego: "When did you last resist admitting you were wrong? What was really being protected in that moment?",
    ego_positive: "What's something you're currently trying to prove, and to whom — to others, or mainly to yourself?",
    empathy: "Whose feelings did you carry today that weren't really yours to carry?",
    people_pleasing: "What's one thing you agreed to recently that you didn't actually want to do? What made saying no feel hard?",
    confidence: "What's a decision you're currently second-guessing? What would you tell a friend in the same position?",
    emotional_stability: "What's something that threw you off recently? How long did it take you to feel steady again?",
    sociability: "Did today's social energy feel like it recharged you, or drained you? What made the difference?",
    discipline: "What's one habit you've let slip lately? What's the smallest possible version of it you could restart with?",
    adaptability: "What's a recent change you resisted? What would it have looked like to meet it with more ease?",
    leadership: "Where did you hold back from taking charge recently, even though part of you wanted to?",
    intuition: "What's a gut feeling you've been ignoring lately? What is it actually telling you?"
};
function generateJournalPrompt(profile, dateObj) {
    const traits = profile.traits || [];
    if (!traits.length) return null;
    const startOfYear = new Date(dateObj.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((dateObj - startOfYear) / 86400000);
    const idx = dayOfYear % traits.length;
    const trait = traits[idx];
    const pred = buildDatePrediction(dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear(), profile.day, profile.month);
    return {
        traitLabel: trait.label,
        traitPct: trait.pct,
        prompt: JOURNAL_PROMPTS[trait.key] || "What's one thing about today that felt distinctly like 'you'?",
        context: pred.core
    };
}

/* =========================================================
   PERSONALITY ENHANCEMENTS — real-life examples + growth tips
   ========================================================= */
const TRAIT_EXAMPLES = {
    anger_general: "For example: someone cuts you off in traffic, and your heart rate spikes before you've even thought about it.",
    anger_emotional: "For example: a partner forgets something important, and the hurt turns into a sharp reply before you've processed the feeling.",
    anger_work: "For example: a colleague misses a deadline that affects your own work, and your patience runs out fast.",
    ego: "For example: someone corrects you in front of others, and your first instinct is to defend your position rather than consider it.",
    ego_positive: "For example: being doubted by someone makes you work twice as hard to prove them wrong, in a productive way.",
    empathy: "For example: you notice a friend is quiet at dinner and sense something is wrong before they say a word.",
    people_pleasing: "For example: you agree to help with something you don't have time for, just to avoid disappointing someone.",
    confidence: "For example: you're asked to present at short notice, and you say yes without much hesitation.",
    emotional_stability: "For example: unexpected bad news lands, and you're able to think clearly within minutes rather than staying rattled all day.",
    sociability: "For example: after a long week, a night out with a big group still leaves you feeling recharged, not drained.",
    discipline: "For example: you keep a workout or study habit going for months, even on days you don't feel like it.",
    adaptability: "For example: a trip gets rescheduled last minute, and you adjust your plans within minutes rather than feeling thrown off.",
    leadership: "For example: in a group with no clear direction, you're often the one who ends up setting the plan.",
    intuition: "For example: you sense a deal or a person is 'off' before you have any solid proof."
};
const TRAIT_GROWTH_TIPS = {
    anger_general: "Try pausing for 10 seconds and naming the feeling out loud before reacting — it gives the spike time to pass.",
    anger_emotional: "Try saying 'I need a minute before we talk about this' instead of responding in the heat of the moment.",
    anger_work: "Try writing the frustrated reply first, then waiting an hour before you actually send anything.",
    ego: "Try asking yourself 'would I rather be right, or would I rather solve this?' before pushing back.",
    ego_positive: "Channel this drive into a specific, measurable goal so the energy has somewhere useful to go.",
    empathy: "Set small emotional boundaries so you can support others without absorbing their stress as your own.",
    people_pleasing: "Practice one small 'no' a week — it gets easier with repetition, not with waiting to feel ready.",
    confidence: "Keep a short list of past wins to reread before big decisions, especially on lower-confidence days.",
    emotional_stability: "A simple breathing routine before reacting to stress can extend the calm you already have naturally.",
    sociability: "Balance social time with a little solo recovery time, even if you don't feel like you need it.",
    discipline: "Tie new habits to an existing routine (like right after brushing your teeth) to make them stick without relying on motivation.",
    adaptability: "Use this strength deliberately — volunteer for the changing, unpredictable tasks others tend to avoid.",
    leadership: "Practice asking for input before deciding, so leading doesn't come across as taking over.",
    intuition: "Keep a quick note when your gut feeling turns out right — it builds trust in the signal over time."
};

/* =========================================================
   DAILY PREDICTIONS — richer good/bad/advice/avoid content
   ========================================================= */
const DAILY_PREDICTION_SIMPLE = {
    1: { good: "Starting new projects, asking for what you want, making a bold first move.", bad: "Waiting for permission or trying to force others to follow your exact plan.", advice: "Take the first step today rather than waiting for the perfect moment.", avoid: "Avoid getting so focused on your own way that you miss useful input from others." },
    2: { good: "Listening, negotiating, resolving a disagreement, quiet teamwork.", bad: "Making a big solo decision or pushing an agenda without checking in with others.", advice: "Let today be about cooperation rather than being the one who leads.", avoid: "Avoid taking on so much of someone else's stress that you lose track of your own needs." },
    3: { good: "Conversations, creative work, socialising, presenting an idea.", bad: "Detailed paperwork or tasks needing long, narrow focus.", advice: "Say what's on your mind — today rewards open, light communication.", avoid: "Avoid spreading your energy across too many things at once." },
    4: { good: "Organising, catching up on admin, sticking to a routine.", bad: "Sudden, big changes or spontaneous decisions.", advice: "Handle the necessary, unglamorous tasks — today favours steady progress.", avoid: "Avoid forcing rigid plans onto a day that has any moving parts." },
    5: { good: "Trying something new, travel, adapting to sudden change.", bad: "Long-term commitments or anything requiring strict routine.", advice: "Stay flexible today — plans may shift more than usual.", avoid: "Avoid impulsive decisions made purely to escape boredom." },
    6: { good: "Family time, home matters, caring for someone close to you.", bad: "Prioritising strangers' needs over your own family's.", advice: "Focus on the people closest to you today.", avoid: "Avoid over-giving to the point where your own needs go unmet." },
    7: { good: "Research, quiet reflection, deep or technical thinking.", bad: "Loud, crowded, or highly social environments.", advice: "Take time alone to think things through properly.", avoid: "Avoid isolating so much that you skip a conversation you actually need to have." },
    8: { good: "Money matters, negotiations, big career decisions.", bad: "Emotional or overly sentimental conversations.", advice: "Focus on results and practical, goal-driven work today.", avoid: "Avoid letting the drive for results overshadow people around you." },
    9: { good: "Finishing projects, letting go of something old, generosity.", bad: "Starting brand-new, long-term commitments.", advice: "Close a chapter today rather than opening a new one.", avoid: "Avoid clinging to something that has clearly run its course." }
};

/* Simplified Chaldean meaning for each calendar day-of-month (1-31),
   used in the detailed day popup on the Life Path timeline. */
const CHALDEAN_DAY_SIMPLE = {
    1: "A day number linked to independence and a fresh, self-driven start.",
    2: "A day number linked to sensitivity, cooperation, and reading a room well.",
    3: "A day number linked to expression, optimism, and creative energy.",
    4: "A day number linked to structure, though it can carry a restless undertone.",
    5: "A day number linked to freedom, quick thinking, and communication.",
    6: "A day number linked to responsibility, harmony, and caring for others.",
    7: "A day number linked to introspection and a need for quiet space.",
    8: "A day number linked to ambition and material progress.",
    9: "A day number linked to compassion and closing out old matters.",
    10: "A day number linked to leadership and standing on your own.",
    11: "A day number linked to heightened intuition and sensitivity.",
    12: "A day number linked to creativity that needs patience to fully form.",
    13: "A day number linked to hard work — progress here tends to come through consistent effort, not shortcuts.",
    14: "A day number linked to change — freedom used carelessly can cause setbacks, so balance is key.",
    15: "A day number linked to charm and magnetism, best used with honesty.",
    16: "A day number linked to sudden upheaval, often followed by a more solid rebuild.",
    17: "A day number linked to spiritual insight and quiet inner strength.",
    18: "A day number linked to inner conflict between material goals and idealism.",
    19: "A day number linked to self-reliance, sometimes to the point of isolation.",
    20: "A day number linked to sensitivity and partnership matters.",
    21: "A day number linked to creative success achieved through cooperation.",
    22: "A day number linked to big, practical achievements when effort is applied wisely.",
    23: "A day number linked to adaptability and a protective, resourceful streak.",
    24: "A day number linked to home, family, and steady support from others.",
    25: "A day number linked to deep analysis and a need to understand things fully.",
    26: "A day number linked to partnership-based financial matters — caution with joint money helps.",
    27: "A day number linked to authority earned through wisdom rather than force.",
    28: "A day number linked to independence with an underlying need for support from others.",
    29: "A day number linked to strong intuition paired with emotional intensity.",
    30: "A day number linked to expression and social warmth.",
    31: "A day number linked to hard work that pays off through persistence."
};

/* =========================================================
   DYNAMIC PREDICTION GENERATOR
   A single prediction is built from FIVE independent layers:
   Personal Day (9 options), the weekday (7 options), the
   calendar day-of-month (31 options), the Personal Month
   (9 options), and the Personal Year (9 options). Because a
   date's exact combination of all five rarely repeats for
   many months, two different dates that share the same
   Personal Day almost never read identically — and when they
   eventually do line up closely, it naturally lands months
   apart, not days apart.
   ========================================================= */
const WEEKDAY_ENERGY = {
    0: "Sundays naturally slow the pace — today favours rest, reflection, or a lighter to-do list over a big push.",
    1: "Mondays carry a fresh-start pull, which makes it a little easier than usual to begin something you've been putting off.",
    2: "Tuesdays tend to bring steady, practical energy — good for follow-through rather than new ideas.",
    3: "Wednesdays sit in the middle of the week and often favour conversation, quick decisions, and course-correcting.",
    4: "Thursdays often carry a builder's energy — useful for pushing a project further before the week winds down.",
    5: "Fridays tend to loosen focus and favour wrapping things up before a change of pace over the weekend.",
    6: "Saturdays favour personal time, social plans, or catching up on things left aside during the week."
};
const MONTH_ENERGY = {
    1: "Zooming out, this whole month is nudging you to plant something new rather than just maintain what's already there.",
    2: "Zooming out, this month favours patience — things may move slower than you'd like, and that's not a bad sign.",
    3: "Zooming out, this month opens up room for expression, ideas, and being a little more visible than usual.",
    4: "Zooming out, this month rewards steady, unglamorous effort over any big, dramatic leap.",
    5: "Zooming out, this month brings more movement and change than usual — it helps to stay light on your feet.",
    6: "Zooming out, this month draws your attention toward home, family, or the people closest to you.",
    7: "Zooming out, this month favours stepping back and thinking things through rather than rushing forward.",
    8: "Zooming out, this month puts a spotlight on money, career, and tangible, measurable results.",
    9: "Zooming out, this month is about finishing things and making room for what comes next."
};
const YEAR_ENERGY = {
    1: "you're moving through a year built for starting fresh and asserting what you actually want",
    2: "you're moving through a year built around patience, partnership, and give-and-take",
    3: "you're moving through a year built for creative growth and being a bit more visible",
    4: "you're moving through a year built for steady, unglamorous groundwork",
    5: "you're moving through a year built for change, movement, and new experience",
    6: "you're moving through a year built around family, home, and responsibility",
    7: "you're moving through a year built for reflection and going deeper into something",
    8: "you're moving through a year built for ambition, results, and financial growth",
    9: "you're moving through a year built for closing chapters and letting go of what's done"
};
const PD_CORE = {
    1: "Today carries an initiating energy. Whatever you start now tends to carry a bit of extra momentum, so it favours making the first move rather than waiting for someone else to.",
    2: "Today carries a cooperative, sensitive energy. Things tend to move better through patience and listening than through pushing your own agenda.",
    3: "Today carries an expressive energy. Conversations, ideas, and anything creative tend to flow more easily than usual.",
    4: "Today carries a grounding, structured energy. It rewards steady, practical progress over anything sudden or dramatic.",
    5: "Today carries a restless, changeable energy. Plans may shift, and staying flexible will serve you better than gripping tightly to a schedule.",
    6: "Today carries a caring, responsible energy. Attention naturally drifts toward home, family, or people who depend on you.",
    7: "Today carries an inward, reflective energy. It favours quiet thinking over noise and quick decisions.",
    8: "Today carries an ambitious, results-driven energy. Money, career, and practical outcomes are more likely to be on your mind.",
    9: "Today carries a closing, releasing energy. It favours finishing something or letting go rather than starting brand-new."
};

function buildDatePrediction(day, month, year, birthDay, birthMonth) {
    const py = personalYear(birthMonth, birthDay, year);
    const pm = personalMonth(py, month);
    const pd = personalDayNum(pm, day);
    const weekday = new Date(year, month - 1, day).getDay();
    const pred = DAILY_PREDICTION_SIMPLE[pd] || DAILY_PREDICTION_SIMPLE[9];
    return {
        py, pm, pd, weekday,
        core: PD_CORE[pd] || '',
        weekdayLine: WEEKDAY_ENERGY[weekday] || '',
        monthLine: MONTH_ENERGY[pm] || '',
        yearLine: YEAR_ENERGY[py] || '',
        dayOfMonthLine: CHALDEAN_DAY_SIMPLE[day] || '',
        good: pred.good, bad: pred.bad, advice: pred.advice, avoid: pred.avoid
    };
}

/* =========================================================
   CALENDAR BUILDER — a real Sun-Sat month grid, reused by the
   Daily Guidance page and the 31-Year Timeline.
   ========================================================= */
const WEEKDAY_LABELS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
function buildCalendarHTML(year, month, profile) {
    const py = personalYear(profile.month, profile.day, year);
    const pm = personalMonth(py, month);
    const firstDow = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const today = new Date();
    let html = '<div class="cal-grid">';
    WEEKDAY_LABELS.forEach(w => { html += `<div class="cal-head">${w}</div>`; });
    for (let i = 0; i < firstDow; i++) html += `<div class="cal-cell cal-empty"></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
        const pd = personalDayNum(pm, d);
        const r1 = getRelationType(profile.mulank, pd);
        const r2 = getRelationType(profile.bhagyank, pd);
        let cls = 'cal-neutral';
        if (r1 === 'enemy' || r2 === 'enemy') cls = 'cal-avoid';
        else if (r1 === 'friendly' && r2 === 'friendly') cls = 'cal-great';
        const isToday = today.getFullYear() === year && (today.getMonth() + 1) === month && today.getDate() === d;
        html += `<button type="button" class="cal-cell ${cls} ${isToday ? 'cal-today' : ''}" data-y="${year}" data-m="${month}" data-d="${d}">
            <span class="cal-daynum">${d}</span><span class="cal-pd">PD ${pd}</span>
        </button>`;
    }
    html += '</div>';
    return html;
}
function bindCalendarClicks(container) {
    container.querySelectorAll('.cal-cell:not(.cal-empty)').forEach(btn => {
        btn.addEventListener('click', () => openDayModal(parseInt(btn.dataset.y, 10), parseInt(btn.dataset.m, 10), parseInt(btn.dataset.d, 10)));
    });
}



