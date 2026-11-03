/* =========================================================
   ENGINE — CONTENT FILE (2 of 3)
   All the long-form written content: every 'Know More' popup,
   and every number/love/career/health/timing dictionary used
   across the app. Load this after engine-data.js.
   ========================================================= */

/* =========================================================
   POPUP / "KNOW MORE" CONTENT — plain B1/B2 English.
   Each entry answers: what is it, why measure it, what result means.
   ========================================================= */
const POPUPS = {
    mulank: {
        title: "What is the Mulank (Birth Number)?",
        body: [
            ["What it is", "Your Mulank comes only from the day of the month you were born. For example, if you were born on the 23rd, your Mulank is 2+3 = 5."],
            ["Why it matters", "This number is believed to shape the way you naturally react to daily life — your first instinct, before you think things through."],
            ["What your result means", "Each number from 1 to 9 is linked to a different natural style, such as leading, caring, or analysing. Your card above shows the style connected to your day of birth."]
        ]
    },
    bhagyank: {
        title: "What is the Bhagyank (Life Path Number)?",
        body: [
            ["What it is", "Your Bhagyank uses your full birth date — day, month and year — added together and reduced to one number."],
            ["Why it matters", "This number is seen as your bigger life direction: the lessons and opportunities that tend to follow you through life, not just day to day."],
            ["What your result means", "It points to the type of path that usually feels right for you, such as building something stable, helping others, or exploring freedom."]
        ]
    },
    kua: {
        title: "What is the Kua Number?",
        body: [
            ["What it is", "The Kua Number comes from your birth year and gender. It is used in Feng Shui, a older Chinese practice about arranging life and space for good energy."],
            ["Why it matters", "It is mainly used to find directions and spaces that are said to suit you best — for example which direction to face when working or sleeping."],
            ["What your result means", "Your number places you in one of two groups. One group tends to feel more supported facing directions like East or South; the other group tends to prefer West-side directions. This is a guide, not a strict rule."]
        ]
    },
    nameNumber: {
        title: "What is the Name Number?",
        body: [
            ["What it is", "Each letter of your name is given a number value, and all of them are added up and reduced to one digit."],
            ["Why it matters", "This number is thought to describe the impression you give to the outside world — how people read you before they know you well."],
            ["What your result means", "It works alongside your Mulank: your Mulank is who you feel like inside, and your Name Number is closer to how you come across to others."]
        ]
    },
    loShu: {
        title: "What is the Lo Shu Grid?",
        body: [
            ["What it is", "The Lo Shu Grid is an old 3x3 chart. Every digit from your birth date (day, month and year) is placed into it, so some numbers may appear more than once and some may not appear at all."],
            ["Why it matters", "A number that repeats often is treated as a strength you naturally lean on. A number that is missing is treated as an area that may need extra effort."],
            ["What your result means", "Use it as a simple strengths-and-gaps map, not a fixed verdict — missing numbers can still be developed with practice."]
        ]
    },
    personalDay: {
        title: "What is a Personal Day Number?",
        body: [
            ["What it is", "It is a number made by combining your birth date with today's date. It changes every day."],
            ["Why it matters", "It is used to give a short, practical mood or focus for that specific day, separate from your long-term personality."],
            ["What your result means", "Treat it as a light daily suggestion — a nudge about what kind of day it might be, not a prediction set in stone."]
        ]
    },
    personalMonthNum: {
        title: "What is a Personal Month?",
        body: [
            ["What it is", "It is a number made by combining your Personal Year with the current calendar month. It changes every month and repeats in a 9-month pattern within each Personal Year."],
            ["Why it matters", "It sits between your big-picture Personal Year and your day-to-day Personal Day — a medium-range theme for the next few weeks."],
            ["What your result means", "Use it to plan roughly a month ahead: is this a month to push forward, to slow down, to focus on people, or to focus on results?"]
        ]
    },
    personalYearNum: {
        title: "What is a Personal Year?",
        body: [
            ["What it is", "It is a number made by combining your birth day and month with the current calendar year. It changes once a year and repeats in a 9-year cycle throughout your life."],
            ["Why it matters", "It sets the overall theme for everything else this year — your Personal Months and Personal Days all play out within it."],
            ["What your result means", "Think of it as the chapter title for your year, while your Personal Month is the section, and your Personal Day is the specific paragraph you're reading today."]
        ]
    },
    careerFit: {
        title: "How is Career Fit worked out?",
        body: [
            ["What it is", "This section looks at your Mulank and Bhagyank together to suggest the type of work environment that tends to suit your natural style."],
            ["Why it matters", "People usually do their best work when their role matches how they naturally think and act, not just their skills on paper."],
            ["What your result means", "The suggestions below are directions to consider, such as working alone versus in a team, or steady routine versus varied tasks. They are starting points, not job titles to follow exactly."]
        ]
    },
    compatibility: {
        title: "How is Compatibility worked out?",
        body: [
            ["What it is", "This compares your core number with someone else's core number (a partner, friend, or colleague) to see how the two natural styles usually interact."],
            ["Why it matters", "Some number pairings tend to bring out ease and balance, while others may need more patience and communication to work well together."],
            ["What your result means", "A 'friendly' result suggests things usually flow naturally. A 'neutral' or 'enemy' result does not mean the relationship will fail — it means a bit more conscious effort may help."]
        ]
    },
    digitMeanings: {
        title: "What Do Missing, Normal, and Repeated Numbers Mean?",
        body: [
            ["What it is", "Each digit from 1 to 9 stands for a classic personality quality (drawn from old planetary associations). How many times that digit shows up in your birth-date grid — zero times, once, or several times — changes how strongly that quality shows up in you."],
            ["Why it matters", "A missing number usually points to a quality that takes more conscious effort to develop. A number that appears once tends to show up in a balanced, everyday way. A number that repeats several times shows up strongly — often as a real strength, but sometimes tipped into excess."],
            ["What your result means", "None of these are fixed verdicts. A missing quality can still be built through practice, and a repeated one is worth being aware of so its more intense side doesn't take over."]
        ]
    },
    coreHarmony: {
        title: "What is 'Core Harmony'?",
        body: [
            ["What it is", "This looks at how your three main numbers — Birth Number, Life Path Number, and Kua Number — relate to each other, rather than reading each one alone."],
            ["Why it matters", "Two people can have the same Birth Number but completely different overall pictures, depending on whether their other core numbers agree with it or pull against it."],
            ["What your result means", "A high score means your core numbers tend to reinforce each other, so your personality tends to feel consistent across situations. A lower score isn't a flaw — it just means different parts of you may need more conscious balancing than someone whose numbers all point the same way."]
        ]
    },
    loShuPlanes: {
        title: "What are the Lo Shu 'Planes'?",
        body: [
            ["What it is", "The 9 numbers in your Lo Shu Grid can be grouped into rows, columns, and diagonals. Each group is called a plane and stands for one area of life, such as thinking, feeling, or getting things done."],
            ["Why it matters", "If all three numbers in a plane are present, that area tends to be a natural strength. If none are present, it tends to need more conscious effort."],
            ["What your result means", "A 'Complete' plane below means all three numbers are there. 'Inactive' means none of them are — that is simply an area to build up on purpose."]
        ]
    },
    karmicDebt: {
        title: "What is a 'Karmic Debt' Number?",
        body: [
            ["What it is", "Before certain numbers are reduced to a single digit, they briefly show up as 13, 14, 16, or 19. Numerology treats these as a sign of a pattern that needs extra attention."],
            ["Why it matters", "It is a way of flagging a recurring life lesson, not a punishment. Think of it as a note to pay closer attention to a specific area."],
            ["What your result means", "If one shows up in your chart, the section explains the pattern it points to. If none show up, there is nothing to flag here."]
        ]
    },
    karmicLesson: {
        title: "What is a 'Karmic Lesson' Number?",
        body: [
            ["What it is", "These are numbers that do not appear anywhere in the letters of your full name."],
            ["Why it matters", "A number missing from your name is treated as a skill that has not been practised much yet, rather than a permanent gap."],
            ["What your result means", "Each missing number points to a specific skill worth building on purpose, such as patience, discipline, or independence."]
        ]
    },
    pinnaclesChallenges: {
        title: "What are Pinnacles and Challenges?",
        body: [
            ["What it is", "Your life is divided into four broad periods (called Pinnacles), each with its own theme, plus a matching internal Challenge to work through during that period."],
            ["Why it matters", "It gives you a rough map of which decades tend to focus on which themes — such as building a career, focusing on family, or personal growth."],
            ["What your result means", "The ages are approximate guides, not fixed deadlines. Use them to notice patterns, not to feel boxed in."]
        ]
    },
    turningPoints: {
        title: "What are Turning Point Ages?",
        body: [
            ["What it is", "Certain ages, based on your Life Path number, are flagged as more likely to bring a noticeable shift or milestone."],
            ["Why it matters", "Knowing these ages in advance can help you plan for change instead of being caught off guard by it."],
            ["What your result means", "These are likely windows for bigger change, not guaranteed events."]
        ]
    },
    eventTiming: {
        title: "How Is Event Timing Worked Out?",
        body: [
            ["What it is", "Your birth date combines with the calendar to create a 'Personal Year' number that repeats in a 9-year cycle. Certain years and months in that cycle are traditionally linked to certain life events, such as marriage or having a family."],
            ["Why it matters", "It can help with planning — for example, knowing which months this year are more naturally suited to a big commitment."],
            ["What your result means", "Treat this as a helpful nudge on timing, not a rule about whether something will or won't happen."]
        ]
    },
    dosha: {
        title: "What is an Ayurvedic Dosha?",
        body: [
            ["What it is", "In Ayurveda, an old Indian health tradition, everyone has a mix of three energy types: Vata, Pitta, and Kapha. This section estimates your leading type from your core number."],
            ["Why it matters", "Each type tends to react to stress differently in the body, so knowing your leading type can help you spot patterns in how you personally respond to pressure."],
            ["What your result means", "This is a general wellness lens, not a medical diagnosis. Always check with a real doctor for actual health concerns."]
        ]
    },
    medical: {
        title: "What is Medical Numerology?",
        body: [
            ["What it is", "This section links your core number to body areas that are traditionally seen as more sensitive for that number."],
            ["Why it matters", "It can be a gentle reminder to pay a bit more attention to those areas — nothing more."],
            ["What your result means", "This is not medical advice. It should never replace a doctor's opinion or a real diagnosis."]
        ]
    },
    circadian: {
        title: "What is Circadian Numerology?",
        body: [
            ["What it is", "This section suggests rough times of day when your energy and focus are traditionally said to peak, based on your core number."],
            ["Why it matters", "Matching demanding tasks to your higher-energy hours, where practical, can make your day feel a little easier."],
            ["What your result means", "Treat these windows as a loose guide to experiment with, not a fixed schedule."]
        ]
    },
    nameSandbox: {
        title: "What is the Name Sandbox?",
        body: [
            ["What it is", "A quick tool to test how any name — a business name, a baby name, anything — numerically lines up with your own core numbers."],
            ["Why it matters", "Some people like to check a new name before using it, the same way they might check an address before moving."],
            ["What your result means", "A 'friendly' result means the name's number gets along well with yours. It is a fun data point, not a rule to live by."]
        ]
    },
    geoMatrix: {
        title: "What is the Location Matrix?",
        body: [
            ["What it is", "This turns a place name (a city, state, or country) into a number the same way your own name is turned into a number, then compares it to your core numbers."],
            ["Why it matters", "Some people use this as one small factor among many when thinking about relocating or travelling."],
            ["What your result means", "Treat it as a light, fun data point — real relocation decisions should rest on much more than this."]
        ]
    },
    muhurat: {
        title: "What is a Muhurat (Auspicious Date)?",
        body: [
            ["What it is", "A Muhurat is a date that traditionally lines up well with your numbers, often used for starting something important like signing a contract."],
            ["Why it matters", "Picking a date this way is a long-standing tradition some people use for peace of mind before a big step."],
            ["What your result means", "'Launch' days line up well with your numbers. 'Avoid' days do not. Use this as one input among many, not the only factor."]
        ]
    },
    purgeAlert: {
        title: "What is the 9-Year Purge Period?",
        body: [
            ["What it is", "Numerology treats your life as moving through a repeating 9-year cycle. The 9th year of that cycle is traditionally seen as a time to close things out before a new cycle begins."],
            ["Why it matters", "It is a useful nudge to review what is no longer serving you, rather than a warning of doom."],
            ["What your result means", "If this applies to you right now, treat it as a good moment for a clear-out — of clutter, habits, or commitments that no longer fit."]
        ]
    },
    assetAllocation: {
        title: "How Is Asset Allocation Worked Out?",
        body: [
            ["What it is", "This looks at which numbers are strong or missing in your Lo Shu Grid to suggest a general investment style, such as steady versus speculative."],
            ["Why it matters", "It is meant as a light starting point for a conversation with a real financial advisor, not a replacement for one."],
            ["What your result means", "Please treat this as entertainment and general reflection. It is not financial advice."]
        ]
    },
    partnerSynergy: {
        title: "What is Partner Synergy?",
        body: [
            ["What it is", "When you combine your Life Path number with someone else's, the result is treated as a third number describing the relationship itself."],
            ["Why it matters", "It offers a lens on the overall theme and challenge of a specific relationship, beyond just comparing two individual charts."],
            ["What your result means", "Every combination has both a strength and a challenge listed — both are worth paying attention to."]
        ]
    },
    externalCompatibility: {
        title: "What is External Number Compatibility?",
        body: [
            ["What it is", "House numbers, car number plates, and phone numbers are all turned into a single number and compared with your own, the same way a name is."],
            ["Why it matters", "Some people like to check whether the spaces and objects around them numerically 'get along' with their own core numbers."],
            ["What your result means", "An 'enemy' result does not mean bad luck is guaranteed — it just suggests that number may need a little more conscious effort around it."]
        ]
    },
    overallPersonality: {
        title: "How is the Personality Profile built?",
        body: [
            ["What it is", "Every trait bar on this page is worked out from patterns in your birth date — how often each digit from 1 to 9 appears, plus your core numbers."],
            ["Why it matters", "Instead of one single label like 'you are a 5', this breaks your personality into smaller, everyday traits such as anger, ego, and empathy, so the picture is more specific and useful."],
            ["What your result means", "A high percentage means that trait shows up strongly in how you tend to act. A low percentage means it shows up rarely. No score is 'good' or 'bad' on its own — they simply describe tendencies you can choose to work with."]
        ]
    }
};

/* Popup content specifically for each personality trait (generic explanation of the trait itself) */
const TRAIT_POPUPS = {
    anger_general: "This measures how quickly small frustrations turn into visible irritation or anger in everyday situations. Knowing this helps you notice your own warning signs before a reaction gets bigger than the situation needs.",
    anger_emotional: "This measures how anger shows up specifically in close relationships — with family, partners, or close friends — where feelings run deeper. It matters because hurt in close relationships often turns into anger faster than in casual ones.",
    anger_work: "This measures how pressure, deadlines, or mistakes at work affect your temper. It matters because work stress that is not managed well can affect both your performance and your relationships with colleagues.",
    ego: "This measures how strongly your sense of self-worth is tied to being right or being seen as capable. A very high score can make feedback feel like a personal attack, even when it is not meant that way.",
    ego_positive: "This measures whether your pride and self-belief get used to push you forward, rather than just to defend your image. High scores here often show up as strong drive and determination.",
    empathy: "This measures how easily you sense and share what other people are feeling. It matters for relationships, teamwork, and understanding people whose experience is different from yours.",
    people_pleasing: "This measures how often you put other people's comfort ahead of your own needs to avoid conflict. It matters because a very high score can lead to burnout or resentment over time.",
    confidence: "This measures how much you trust your own judgment and decisions, separate from what others think. It affects how comfortable you feel taking risks or standing your ground.",
    emotional_stability: "This measures how steady your mood stays when life gets stressful or unpredictable. It matters for how well you cope during pressure and setbacks.",
    sociability: "This measures how much you enjoy and seek out the company of other people, versus needing time alone to recharge.",
    discipline: "This measures how consistently you stick to routines, plans, and long-term goals, even when motivation drops.",
    adaptability: "This measures how easily you adjust when plans change or something unexpected happens.",
    leadership: "This measures how naturally you step into a guiding or decision-making role in a group, rather than following someone else's lead.",
    intuition: "This measures how much you rely on a gut feeling or inner sense, compared to relying only on facts and logic."
};

/* =========================================================
   ADDITIONAL FEATURE DATA — plain-language versions of every
   section from the original single-page tool.
   ========================================================= */

/* Core number meanings — shared by the Overview page and the Numbers Glossary */
const NUMBER_MEANINGS = {
    mulank: {
        1: "You like to make your own decisions and take the first step before others do.",
        2: "You notice how people feel and try to keep things calm and fair.",
        3: "You enjoy talking, sharing ideas, and lifting the mood of a room.",
        4: "You feel safest when things are organised and planned ahead of time.",
        5: "You get restless if life stays the same for too long. You need change.",
        6: "You feel responsible for the people close to you and enjoy looking after them.",
        7: "You think deeply before speaking and prefer quality time over small talk.",
        8: "You are driven by results and want to see your effort turn into something solid.",
        9: "You care about fairness on a bigger scale, not just your own circle.",
        11: "You often sense things before you can explain why, and others come to you for insight.",
        22: "You can take a big idea and actually build it into something real and lasting.",
        33: "You are pulled towards helping and guiding others, often before yourself."
    },
    bhagyank: {
        1: "Your life keeps pushing you to stand on your own and trust your own choices.",
        2: "Your life keeps teaching you patience, teamwork, and give-and-take.",
        3: "Your life rewards you when you express yourself openly instead of holding back.",
        4: "Your life asks you to build steady foundations, step by step, without shortcuts.",
        5: "Your life keeps bringing change, travel, and new experiences your way.",
        6: "Your life centres around caring for family and creating a stable home.",
        7: "Your life pushes you to slow down, study, and understand things at a deeper level.",
        8: "Your life keeps testing your discipline before rewarding you with success.",
        9: "Your life asks you to think beyond yourself and give back to others.",
        11: "Your path involves inspiring people through insight you cannot always explain.",
        22: "Your path involves turning a large vision into something practical and lasting.",
        33: "Your path centres on teaching, healing, or guiding others without expecting much back."
    },
    kua: {
        1: "You tend to feel most comfortable and productive facing South, North, or East directions.",
        2: "You tend to feel most supported facing South-West, North-East, West, or North-West directions.",
        3: "You tend to feel most comfortable and productive facing South, North, or East directions.",
        4: "You tend to feel most comfortable and productive facing South, North, or East directions.",
        6: "You tend to feel most supported facing South-West, North-East, West, or North-West directions.",
        7: "You tend to feel most supported facing South-West, North-East, West, or North-West directions.",
        8: "You tend to feel most supported facing South-West, North-East, West, or North-West directions.",
        9: "You tend to feel most comfortable and productive facing South, North, or East directions."
    },
    nameNumber: {
        1: "People tend to see you as confident and independent, even before they know you well.",
        2: "People tend to see you as easy to talk to and trustworthy.",
        3: "People tend to see you as lively, friendly, and expressive.",
        4: "People tend to see you as reliable and grounded.",
        5: "People tend to see you as energetic and hard to pin down.",
        6: "People tend to see you as warm and caring.",
        7: "People tend to see you as thoughtful and a little private.",
        8: "People tend to see you as capable and driven.",
        9: "People tend to see you as passionate about causes bigger than yourself.",
        11: "People tend to see you as insightful, sometimes in a way that surprises them.",
        22: "People tend to see you as someone who gets big things done.",
        33: "People tend to see you as a natural carer and guide."
    }
};

const HEART_DESIRE_SIMPLE = {
    1: "You want to lead and do things your own way.",
    2: "You want closeness, harmony, and a peaceful partnership.",
    3: "You want to express yourself and be noticed for your creativity.",
    4: "You want order, security, and something lasting to show for your effort.",
    5: "You want freedom, change, and new experiences.",
    6: "You want to care for the people you love and build a happy home.",
    7: "You want truth, quiet, and a deeper understanding of life.",
    8: "You want financial success and real influence.",
    9: "You want to make a difference on a scale bigger than yourself.",
    11: "You want to understand life on a deep, almost spiritual level.",
    22: "You want to build something big enough to outlast you.",
    33: "You want to teach, heal, and give love without expecting anything back."
};

const OUTER_PERSONA_SIMPLE = {
    1: "People read you as confident, self-reliant, and a bit of a natural leader.",
    2: "People read you as gentle, easy to approach, and genuinely fair.",
    3: "People read you as fun, expressive, and full of energy.",
    4: "People read you as dependable and grounded — someone who follows through.",
    5: "People read you as exciting, unpredictable, and independent.",
    6: "People read you as warm, responsible, and caring toward others.",
    7: "People read you as intelligent, private, and a little mysterious.",
    8: "People read you as capable, authoritative, and driven to succeed.",
    9: "People read you as idealistic, passionate, and generous.",
    11: "People read you as intuitive and somewhat otherworldly.",
    22: "People read you as extremely capable and highly organised.",
    33: "People read you as a caring, wise presence others turn to."
};

const INDUSTRY_SIMPLE = {
    1: "Government roles, defence, top management, or running your own business.",
    2: "HR, counselling, nursing, client relations, or creative partnerships.",
    3: "Banking, teaching, law, advising, or wealth management.",
    4: "Technology, infrastructure, aviation, or hands-on engineering work.",
    5: "Sales, trade, journalism, telecom, or logistics.",
    6: "Entertainment, fashion, interior design, architecture, or hospitality.",
    7: "Research, data analysis, pharmacy, academia, or investigation.",
    8: "Real estate, heavy engineering, construction, or corporate law.",
    9: "Police, defence, surgery, mechanical engineering, sport, or non-profits.",
    11: "Mentoring, spiritual guidance, progressive media, or diplomacy.",
    22: "Large infrastructure projects, big mergers, or legacy-building architecture.",
    33: "Global healthcare, large-scale charity work, or advanced teaching."
};

/* Browsable career directory — shown to everyone, not just the person's own number,
   so they can explore paths beyond their top match. */
const CAREER_DIRECTORY = [
    { num: 1, title: "Leadership & Government", desc: INDUSTRY_SIMPLE[1] },
    { num: 2, title: "People, Care & Diplomacy", desc: INDUSTRY_SIMPLE[2] },
    { num: 3, title: "Finance, Law & Communication", desc: INDUSTRY_SIMPLE[3] },
    { num: 4, title: "Technology & Infrastructure", desc: INDUSTRY_SIMPLE[4] },
    { num: 5, title: "Sales, Trade & Media", desc: INDUSTRY_SIMPLE[5] },
    { num: 6, title: "Design, Hospitality & Beauty", desc: INDUSTRY_SIMPLE[6] },
    { num: 7, title: "Research & Analysis", desc: INDUSTRY_SIMPLE[7] },
    { num: 8, title: "Business, Property & Law", desc: INDUSTRY_SIMPLE[8] },
    { num: 9, title: "Service, Defence & Action", desc: INDUSTRY_SIMPLE[9] },
    { num: 11, title: "Visionary & Guidance Roles", desc: INDUSTRY_SIMPLE[11] },
    { num: 22, title: "Large-Scale Building & Systems", desc: INDUSTRY_SIMPLE[22] },
    { num: 33, title: "Healing & Large-Scale Care", desc: INDUSTRY_SIMPLE[33] }
];


const ROMANCE_SIMPLE = {
    1: { title: "The Independent Partner", text: "You need a relationship that respects your independence. Watch out for taking over decisions or brushing off your partner's opinion." },
    2: { title: "The Deep Feeler", text: "You crave closeness and emotional harmony. Watch out for losing your own boundaries just to keep your partner happy." },
    3: { title: "The Joyful Romantic", text: "You need fun, talk, and social connection in love. Watch out for avoiding serious conversations when problems come up." },
    4: { title: "The Loyal Rock", text: "You want stability and loyalty above all. Watch out for treating the relationship like a duty instead of a romance." },
    5: { title: "The Freedom Seeker", text: "You need space, adventure, and mental stimulation. Watch out for pulling away whenever things get too routine." },
    6: { title: "The Devoted Carer", text: "You build romance around home and family life. Watch out for over-giving and quietly keeping score of it." },
    7: { title: "The Private Thinker", text: "You need a deep mental connection and plenty of alone time. Watch out for seeming distant or closed off." },
    8: { title: "The Power Partner", text: "You want a relationship that also feels like a shared success story. Watch out for treating it too much like business." },
    9: { title: "The Idealistic Lover", text: "You love with big passion and big ideals. Watch out for expecting a partner to be perfect and feeling let down when they aren't." }
};

const MEDICAL_SIMPLE = {
    1: { organs: "Heart, upper back, blood flow, and general energy levels.", diet: "Watch your salt intake and very heating foods. Add honey and heart-friendly whole grains.", exercise: "Activities that let you take the lead work well for you — solo cardio, running, or competitive sport.", checkup: "Heart and blood-pressure checks are worth doing yearly, especially past your mid-30s.", mentalTendency: "Stress usually shows up for you as impatience or a short temper, rather than sadness." },
    2: { organs: "Stomach, digestion, fluids, and stress-related tension.", diet: "Avoid heavy meals late at night. Drink enough water and eat cooling foods like cucumber.", exercise: "Gentle, rhythmic movement suits you best — swimming, walking, or yoga rather than high-intensity training.", checkup: "Digestive and hydration-related check-ups are worth prioritising if you notice ongoing stomach discomfort.", mentalTendency: "Stress usually shows up for you as anxiety or overthinking, often felt physically in the stomach." },
    3: { organs: "Liver, arterial system, hips, thighs, and fat metabolism/cholesterol.", diet: "Cut back on fried and fatty food. Turmeric and lemon water can help.", exercise: "Group classes or dance-based workouts suit your sociable energy better than solo gym routines.", checkup: "Liver function and cholesterol screening are worth doing regularly, especially if your diet leans rich.", mentalTendency: "Stress usually shows up for you as scattered focus or restlessness rather than staying still with it." },
    4: { organs: "Nerves and breathing, with a tendency toward sudden, hard-to-diagnose issues.", diet: "Favour grounding root vegetables and cut back on caffeine and processed snacks.", exercise: "Structured routines suit you — a set gym plan or scheduled runs work better than unplanned activity.", checkup: "Respiratory and nervous-system check-ups are worth scheduling if you notice ongoing tension or breathing issues.", mentalTendency: "Stress usually shows up for you as rigidity or frustration when routines get disrupted." },
    5: { organs: "Nervous system, throat, thyroid, hands, and skin — often linked to a very active mind.", diet: "Eat more raw leafy greens, and avoid eating while stressed or rushed.", exercise: "Variety keeps you consistent — mix things up with different sports or activities rather than one repeated routine.", checkup: "Thyroid and nervous-system panels are worth checking if you often feel restless or wired.", mentalTendency: "Stress usually shows up for you as restlessness or a racing mind that's hard to switch off." },
    6: { organs: "Reproductive health, kidneys, lower back, throat, and hormone balance.", diet: "Keep sugar intake balanced, stay hydrated, and enjoy fruit and light dairy.", exercise: "Anything that feels nurturing works well for you — yoga, pilates, or gentle strength training.", checkup: "Hormonal and kidney-function checks are worth doing periodically, particularly around major life changes.", mentalTendency: "Stress usually shows up for you as worry about others rather than about yourself." },
    7: { organs: "Lymph system and stress-related or hard-to-explain sensitivities.", diet: "Eat as clean as possible. Gut health matters most for you. Cut back on processed meat and strong stimulants.", exercise: "Solo, meditative movement suits you — long walks, swimming alone, or quiet stretching.", checkup: "General wellness panels and allergy testing are worth doing if symptoms are vague or hard to pin down.", mentalTendency: "Stress usually shows up for you as withdrawal or overthinking alone rather than talking it out." },
    8: { organs: "Bones, teeth, and joints, with a tendency toward slow-healing issues.", diet: "Get enough calcium and vitamin D. Avoid cold, stale, or leftover food.", exercise: "Strength training and resistance work suit your driven nature well.", checkup: "Bone density and joint health checks are worth doing regularly, especially with a demanding work schedule.", mentalTendency: "Stress usually shows up for you as physical tension or overworking to cope." },
    9: { organs: "Blood pressure, muscles, and a tendency toward inflammation or fevers.", diet: "Cut back on red meat, very spicy food, and alcohol. Cooling herbs can help.", exercise: "High-energy, competitive activities suit you — martial arts, team sport, or intense cardio.", checkup: "Blood pressure and inflammation markers are worth checking, particularly if you run hot-tempered under stress.", mentalTendency: "Stress usually shows up for you as sudden anger followed by needing to cool off alone." }
};
const MEDICAL_DEFICIENCY_SIMPLE = {
    1: "Low energy and finding it hard to speak up for yourself.",
    2: "Stress that shows up as stomach trouble or feeling drained.",
    3: "Sensitivity around the liver and slower nutrient absorption.",
    4: "Prone to odd allergies or breathing sensitivity.",
    5: "A restless, unsettled stomach and nervous tension.",
    6: "A weaker immune response and skin sensitivity.",
    7: "Trouble sleeping and a baseline of low-level anxiety.",
    8: "Stiff joints and possible mineral shortages.",
    9: "Lower stamina and feeling physically drained easily."
};
const DOSHA_SIMPLE = {
    Vata: { title: "Vata (Air & Space)", text: "Your nervous system is sensitive. Stress shows up quickly as anxiety, poor sleep, cold hands and feet, or an upset stomach.", remedy: "Warm, grounding food and a steady daily routine help you the most.", physicalSigns: "Cold hands and feet, dry skin, irregular appetite, and a lighter body frame.", emotionalSigns: "Quick to worry, enthusiastic in bursts, and prone to overthinking before sleep.", imbalanceSigns: "Constipation, insomnia, restlessness, and a scattered, anxious mind are the clearest warning signs that you're out of balance." },
    Pitta: { title: "Pitta (Fire & Water)", text: "You run hot, driven, and competitive. Stress shows up as irritation, skin flare-ups, acidity, or a short fuse.", remedy: "Cooling foods and avoiding overly spicy or fried meals helps keep you balanced.", physicalSigns: "Warm body temperature, strong appetite, and a medium, athletic build.", emotionalSigns: "Sharp, focused, and goal-driven, with a tendency toward impatience under pressure.", imbalanceSigns: "Acid reflux, skin breakouts, irritability, and a short temper are the clearest warning signs that you're out of balance." },
    Kapha: { title: "Kapha (Earth & Water)", text: "You have a solid, steady build but a slower metabolism. Stress shows up as tiredness, weight gain, or holding onto feelings.", remedy: "Regular movement and lighter, spiced meals help keep your energy up.", physicalSigns: "A sturdy, solid build, smooth skin, and steady, reliable stamina.", emotionalSigns: "Calm, loyal, and slow to anger, but prone to holding onto emotions rather than expressing them.", imbalanceSigns: "Weight gain, sluggishness, congestion, and low motivation are the clearest warning signs that you're out of balance." }
};
const KARMIC_LESSON_SIMPLE = {
    1: "Learning to stand on your own and take initiative without leaning on others.",
    2: "Learning patience and teamwork instead of trying to control everything.",
    3: "Learning to express yourself without fearing judgement.",
    4: "Learning discipline and follow-through instead of avoiding hard work.",
    5: "Learning to handle change and freedom responsibly.",
    6: "Learning to care for others without keeping score.",
    7: "Learning to sit with yourself and think deeply, rather than staying busy.",
    8: "Learning to manage money and power fairly and wisely.",
    9: "Learning to forgive, let go, and think beyond yourself."
};
const KARMIC_DEBT_SIMPLE = {
    13: "This points to a pattern of avoiding hard work or pushing responsibility onto others. Progress may feel slower than it does for others, and the fix is steady discipline rather than shortcuts.",
    14: "This points to a pattern around freedom being used carelessly. Big, sudden changes are likely, and the lesson is learning moderation and following through on commitments.",
    16: "This points to a pattern of pride or ego getting in the way. Plans or relationships may collapse suddenly so that something more honest can be rebuilt.",
    19: "This points to a pattern of relying only on yourself and shutting others out. You may be pushed into moments of standing completely alone, and the lesson is learning when to ask for help."
};
const TURNING_POINT_SIMPLE = {
    1: "Around ages 28, 37, and 46 — likely shifts in independence, authority, or career direction.",
    2: "Around ages 29, 38, and 47 — likely shifts involving partnerships or emotional growth.",
    3: "Around ages 30, 39, and 48 — likely shifts in creative work or public visibility.",
    4: "Around ages 31, 40, and 49 — likely restructuring of your foundation, property, or long-term security.",
    5: "Around ages 32, 41, and 50 — likely big transitions, travel, or lifestyle changes.",
    6: "Around ages 33, 42, and 51 — likely shifts around family, home, or shared finances.",
    7: "Around ages 34, 43, and 52 — likely a period of deep reflection or a change in outlook.",
    8: "Around ages 35, 44, and 53 — likely a jump in career authority or financial scale.",
    9: "Around ages 36, 45, and 54 — likely the closing of a long chapter and a fresh start after it."
};
const FIRST_VOWEL_SIMPLE = {
    A: "Your gut reaction to stress is bold action — you move first and process feelings later.",
    E: "Your gut reaction to stress is to talk it through and look for a way out fast.",
    I: "Your gut reaction to stress is deep, intense feeling — you feel things strongly before you can explain why.",
    O: "Your gut reaction to stress is to protect and smooth things over, sometimes before checking your own needs.",
    U: "Your gut reaction to stress is to go quiet and withdraw until you've processed it alone."
};
const CIRCADIAN_SIMPLE = {
    1: { peak: "10 AM – 1 PM: your best window for decisions and taking the lead.", secondary: "4 PM – 6 PM: good for planning tomorrow.", caution: "8 PM – 10 PM: focus fades — avoid big arguments or heavy thinking." },
    2: { peak: "9 AM – 11 AM: your best window for calls, negotiation, and connecting with people.", secondary: "2 PM – 4 PM: good for teamwork.", caution: "11 PM – 1 AM: overthinking spikes — avoid big relationship decisions." },
    3: { peak: "11 AM – 2 PM: your best window for expressing ideas and learning.", secondary: "3 PM – 5 PM: good for brainstorming.", caution: "6 PM – 8 PM: focus drops — avoid detailed paperwork." },
    4: { peak: "8 AM – 11 AM: your best window for structured, detailed work.", secondary: "1 PM – 3 PM: steady, reliable output.", caution: "7 PM – 9 PM: patience runs thin — step away from rigid problems." },
    5: { peak: "2 PM – 5 PM: your best window for quick thinking and networking.", secondary: "9 AM – 11 AM: good for outreach and calls.", caution: "10 PM – midnight: restlessness spikes — avoid late-night impulse decisions." },
    6: { peak: "4 PM – 7 PM: your best window for relationships and creative or design work.", secondary: "10 AM – noon: good for planning and finances.", caution: "1 PM – 3 PM: energy dips after lunch — keep tasks light." },
    7: { peak: "6 AM – 9 AM: your best window for focus, before the world wakes up.", secondary: "8 PM – 10 PM: good for study and reflection.", caution: "12 PM – 2 PM: noisy environments drain you fast — protect your space." },
    8: { peak: "1 PM – 4 PM: your best window for big decisions and long-term planning.", secondary: "9 AM – 11 AM: good for strategy.", caution: "5 PM – 7 PM: fatigue builds — avoid new stressful commitments." },
    9: { peak: "11 AM – 2 PM: your best window for action and getting things done.", secondary: "4 PM – 6 PM: good for wrapping up loose ends.", caution: "8 PM – 10 PM: patience runs short — avoid heated conversations." }
};

const DAILY_FOCUS = {
    1: { line: "Start something. Today favours taking the first step rather than waiting.", caution: "Watch for impatience or wanting things done only your way." },
    2: { line: "Slow down and listen. Today favours cooperation over pushing your own agenda.", caution: "Watch for taking on other people's stress as your own." },
    3: { line: "Say what's on your mind. Today favours open conversation and light connection.", caution: "Watch for spreading your focus too thin." },
    4: { line: "Handle the necessary, unglamorous tasks. Today favours catching up and organising.", caution: "Watch for getting rigid or frustrated with delays." },
    5: { line: "Expect the unexpected. Today favours flexibility over rigid plans.", caution: "Watch for restlessness leading to impulsive choices." },
    6: { line: "Focus on the people close to you. Today favours home and family matters.", caution: "Watch for over-giving or taking on too much responsibility for others." },
    7: { line: "Take time to think things through alone. Today favours reflection over action.", caution: "Watch for isolating yourself more than is helpful." },
    8: { line: "Focus on results and money matters. Today favours practical, goal-driven work.", caution: "Watch for becoming too focused on status or control." },
    9: { line: "Finish something and let it go. Today favours closing a chapter rather than starting one.", caution: "Watch for sudden frustration if you resist letting go." }
};

const PINNACLE_SIMPLE = {
    1: "a period about independence — learning to lead and stand on your own",
    2: "a period about teamwork — learning patience and cooperation",
    3: "a period about self-expression — a creative, social, communicative stretch",
    4: "a period about building — hard work that lays a lasting foundation",
    5: "a period about change — travel, freedom, and unpredictable shifts",
    6: "a period about family — home, responsibility, and relationships",
    7: "a period about inner growth — study, reflection, and specialising",
    8: "a period about achievement — career power and financial growth",
    9: "a period about closing chapters — humanitarian focus and letting go",
    11: "a highly intuitive period — a time of insight that can guide and inspire others",
    22: "a highly constructive period — a time to turn a big idea into something lasting"
};
const CHALLENGE_SIMPLE = {
    0: "no single external obstacle — the main challenge is an internal one: making clear choices",
    1: "overcoming pride or the fear of standing alone",
    2: "overcoming over-sensitivity or leaning too much on others",
    3: "overcoming scattered focus or a fear of being seen",
    4: "overcoming a resistance to routine and hard work",
    5: "overcoming impulsiveness or a fear of commitment",
    6: "overcoming perfectionism or being overly controlling in relationships",
    7: "overcoming isolation or emotional distance",
    8: "overcoming an unhealthy focus on money or status"
};

