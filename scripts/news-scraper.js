require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const cron = require('node-cron');

const EVENT_REGISTRY_API_KEY = process.env.NEWS_API_KEY;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const TOPICS = ['Augmented Reality', 'Virtual Reality Technology', 'Metaverse Business', 'Enterprise XR', 'Apple Vision Pro'];
const BANNED_WORDS = ['porn', 'sexy', 'xxx', 'nude', 'erotic', 'bangers', 'adult', 'dating', 'sex'];

function isContentSafe(article) {
    const text = (article.title + ' ' + (article.description || '')).toLowerCase();
    const isUnsafe = BANNED_WORDS.some(word => text.includes(word));
    if (isUnsafe) {
        console.log(`[!] SAFETY BLOCK: Skipping inappropriate content: ${article.title}`);
        return false;
    }
    return true;
}

async function fetchNews() {
    let allArticles = [];
    for (const topic of TOPICS) {
        console.log(`Fetching top 2 relevant articles for: ${topic}...`);
        const url = `https://eventregistry.org/api/v1/article/getArticles?action=getArticles&keyword=${encodeURIComponent(topic)}&lang=eng&articlesCount=2&articlesSortBy=rel&includeArticleBody=true&includeArticleImage=true&resultType=articles&apiKey=${EVENT_REGISTRY_API_KEY}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.articles && data.articles.results) {
                const mapped = data.articles.results.map(art => ({
                    title: art.title,
                    description: art.body.substring(0, 500),
                    content: art.body,
                    url: art.url,
                    urlToImage: art.image,
                    topic: topic
                }));
                allArticles = [...allArticles, ...mapped];
            }
        } catch (err) { console.error(`Fetch error for ${topic}:`, err.message); }
    }
    return allArticles;
}

async function rewriteWithAI(article) {
    console.log(`Rewriting article: ${article.title}...`);
    const prompt = `
You are a premium XR technology editor. Rewrite this news into a professional editorial for "Spatial Horizons".
IMPORTANT: If the content is inappropriate, sexual, non-technology related, or a duplicate, respond ONLY with "REJECT".

Original Title: ${article.title}
Original Description: ${article.description}

Response must be VALID JSON:
{
  "title": "...",
  "short_description": "...",
  "meta_description": "...",
  "content": "Full HTML with <h2>, <h3>, <p> tags. MUST be greater than 200 words and include detailed subheadings.",
  "author": "Realistic Name",
  "category": "AR/VR/AI/Meta/Spatial Computing/XR"
}
`;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: { "Authorization": `Bearer ${OPENROUTER_API_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ "model": "google/gemma-4-31b-it:free", "messages": [{ "role": "user", "content": prompt }] })
        });

        const data = await response.json();
        const resContent = data.choices[0].message.content.trim();
        if (resContent.includes("REJECT")) return null;
        
        const jsonStr = resContent.replace(/```json|```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (e) { return null; }
}

async function runAutomation() {
    console.log(`\n--- [${new Date().toLocaleString()}] STARTING AUTOMATED UPDATE ---\n`);
    try {
        const articles = await fetchNews();
        console.log(`\nProcessing ${articles.length} candidates...\n`);

        for (const article of articles) {
            if (!isContentSafe(article)) continue;

            const { data: existing } = await supabase.from('Website_Auto_Post').select('id').eq('source_url', article.url).maybeSingle();
            if (existing) {
                console.log(`[-] SKIPPED: Already exists - ${article.title}`);
                continue;
            }

            const rewritten = await rewriteWithAI(article);
            if (!rewritten) {
                console.log(`[!] REJECTED: Quality/Filter - ${article.title}`);
                continue;
            }

            const { error } = await supabase.from('Website_Auto_Post').insert([{
                title: rewritten.title,
                short_description: rewritten.short_description,
                meta_description: rewritten.meta_description,
                content: rewritten.content,
                author: rewritten.author,
                source_url: article.url,
                image_url: article.urlToImage || 'https://t3.ftcdn.net/jpg/02/68/91/90/360_F_268919036_PO4HSh99zqRwewVgALxVcSfA17JkxKWD.jpg',
                category: rewritten.category,
                created_at: new Date().toISOString()
            }]);

            if (error) console.error(`[X] ERROR: ${error.message}`);
            else console.log(`✅ ADDED TO TABLE: ${rewritten.title}`);
        }
        console.log("\n--- AUTOMATION COMPLETE ---\n");
    } catch (error) { console.error("Execution failed:", error.message); }
}

// 1. SCHEDULE: Run at 12:00 AM every day
cron.schedule('0 0 * * *', () => {
    runAutomation();
}, {
    timezone: "Asia/Kolkata" // Set to your local timezone
});

console.log("-----------------------------------------");
console.log("XR News Automation Service Started");
console.log("Schedule: Every day at 12:00 AM");
console.log("Current Time:", new Date().toLocaleString());
console.log("-----------------------------------------");

// 2. IMMEDIATE RUN: Uncomment the line below if you want it to run once right now when started
// runAutomation();
