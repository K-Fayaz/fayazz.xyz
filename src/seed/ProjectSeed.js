const ProjectSeed = {
    'Jul': {
        status: true,
        meta: {
            title: 'LoremAPIs',
            tagline: 'A No code Mock API builder using AI',
            link: 'https://github.com/K-Fayaz/loremapis',
            status: 'live'
        },
        content: [
            {
                id: 'idea',
                label: 'Idea',
                content: {
                    overview: "LoremAPIs is a no-code API builder that enables developers to instantly create mock REST APIs (GET, POST, PATCH, DELETE) using a visual schema designer and AI-generated data.Whether you're prototyping, testing frontend apps, or mocking backend logic, LoremAPIs gives you realistic endpoints without writing a single line of backend code.",
                    features:[
                        { feature: 'Visual Schema Builder', text:'Drag-and-drop interface to create entities and relationships, no JSON editing required.' },
                        { feature: 'Instant REST APIs', text: 'Auto-generates complete CRUD APIs based on your schema.' },
                        { feature: 'AI Data Generation', text: 'Uses Claude Sonnet 3.5 to generate realistic mock data per entity.' },
                        { feature: 'Playground & Postman Support', text: 'Test GET in-app, and all methods externally via cURL/Postman.' },
                        { feature: 'Project & Entity Limits', text: 'Free and Pro-tier limits to balance cost and access.' },
                        { feature: 'Project & Entity Limits', text: 'Free and Pro-tier limits to balance cost and access.' }
                    ]
                }
            },
            {
                id:'stack',
                label:'Stack',
                content: {
                    stack:['Node.js','Express.js', 'React', 'mongoDB', 'Anthropic API', 'Redis + BullMQ','Docker','GCP']
                }
            }
        ]
    },
    'Aug': {
        status: true,
        meta: {
            title: 'Journal to Tweet',
            tagline: 'The AI second brain for your online presence.',
            link: 'https://www.youtube.com/watch?v=NmWikQROH2s',
            status: 'live'
        },
        content: [
            {
                id:'problem',
                label:'Problem',
                content: {
                    overview: " staying consistent on X while building is hard — often times I don't know what to tweet or when. After seeing others struggle too, I realized a tool that turns daily journals into scheduled tweet suggestions could solve this."
                }
            },
            {
                id: 'idea',
                label: 'Idea',
                content: {
                    overview: "Journal-To-Tweet helps busy people stay consistent on X (formerly Twitter) without the pressure of daily content creation. Just jot down what you’re working on, learning, or thinking about in a simple journal-style interface. At your chosen times, the app uses AI to convert those entries into tweet suggestions and sends them to your inbox — you can review, edit, and post directly to X with zero friction. It’s the easiest way to show up, build in public, and grow your audience — without burning time or creative energy and without having another task on your todo list.",
                    features: [
                        { feature: 'Daily Journal Interface', text: 'Simple, chat-style journaling space for logging thoughts, updates, and events each day.' },
                        { feature: 'Calendar View', text: 'A visual calendar to track which days you journaled and tweeted.' },
                        { feature: 'AI Tweet Suggestions', text: 'Uses journal entries to draft personalized tweets based on your choice and tone.' },
                        { feature: 'Scheduled Delivery', text: 'Lets users choose when to receive tweet ideas (e.g., 10am, 1:30pm, 5pm, 8pm).' },
                        { feature: 'Email Notifications', text: 'Tweet drafts are delivered by email at user-defined times for frictionless editing and posting.' },
                        // { feature: 'Trend-Based Suggestions', text: 'Pulls trending topics from APIs like Hacker News and Product Hunt to suggest timely tweet ideas.' },
                        // { feature: 'No Free Plan', text: 'Pricing starts at $12/mo or $100/year (2 months free), with full access to all features.' }
                    ]
                }
            },
            {
                id: 'stack',
                label: 'Stack',
                content: {
                    stack: ['Node.js', 'Express', 'ReactJS', 'MongoDB', 'TailwindCSS', 'Redis + BullMQ', 'Anthropic API', 'Resend (email)']
                }
            }
        ]
    },
    'Sep': {
        status: true,
        meta: {
            title: 'Social Media Screenshot Tool',
            tagline: 'The fastest way to turn social posts into beautiful shareable cards.',
            link: 'https://zapshot.in/',
            status: 'live',
            prototypeLink: 'https://zapshot.in/'
        },
        content: [
            {
                id:'problem',
                label:'Problem',
                content: {
                    overview: "Taking clean screenshots of social media posts is surprisingly frustrating. Every platform has its quirks — some posts look bad in screenshots, others are cluttered or cut off. As someone who shares content from X, Peerlist, and Reddit regularly, I found myself wasting time manually editing screenshots just to make them look halfway decent. It's not scalable, and the tools out there are either broken, bloated, or locked to a single platform."
                }
            },
            {
                id: 'idea',
                label: 'Idea',
                content: {
                    overview: "Zapshot is a fast, clean, and platform-agnostic tool that turns social media posts into styled, ready-to-share image cards. Whether it's a tweet, Peerlist drop, or a Reddit post, you just paste the link — and Zapshot reconstructs a beautiful visual version that feels native, but branded for sharing. It's not a screenshot. It's a better visual quote for your content strategy, portfolio, or newsletter.",
                    features: [
                        { feature: 'Multi-Platform Support', text: 'Currently supports X (Twitter), Peerlist, and Reddit — with more coming soon.' },
                        { feature: 'Styled Post Templates', text: 'Rebuilds posts with clean HTML-based designs that look better than raw screenshots.' },
                        { feature: 'One-Click Image Export', text: 'Generates high-quality PNG images from rendered posts with no extra effort.' },
                        { feature: 'Dark & Light Themes', text: 'Output visuals that match your aesthetic or platform tone.' },
                        { feature: 'Smart Media Handling', text: 'Automatically includes post images, avatars, and meta-info without clutter.' }
                    ]
                }
            },
            {
                id: 'stack',
                label: 'Stack',
                content: {
                    stack: ['Node.js', 'Puppeteer', 'ReactJS', 'html-to-image', 'TailwindCSS']
                }
            }
        ]
    },
    'Oct': {
        status: true,
        meta: {
            title: 'AI Excuse Generator',
            tagline: 'Turn your screw-ups into smart, funny excuses — powered by AI.',
            link: 'https://excuse-gen-fun.vercel.app/', // replace with actual link
            status: 'live',
            // prototypeLink: 'https://yourexuseapp.link/' // replace with actual link
        },
        content: [
            {
                id: 'problem',
                label: 'Problem',
                content: {
                    overview: "When you mess something up — push to prod without testing, miss a meeting, or delete the wrong database — coming up with a clever excuse on the spot is hard. I wanted to build something fun and relatable that gives people a reason to laugh at their mistakes instead of stressing about them."
                }
            },
            {
                id: 'idea',
                label: 'Idea',
                content: {
                    overview: "The AI Excuse Generator takes any situation and instantly crafts a witty, semi-believable excuse for it. Users just describe what went wrong, and the AI responds with a funny explanation — tech-related or otherwise. It's half humor, half creativity, and 100% shareable.",
                    features: [
                        { feature: 'AI-Powered Excuse Generation', text: 'Enter any situation and get a custom, funny excuse generated by AI.' },
                        { feature: 'Blame Mode', text: 'Choose who to blame — yourself, the intern, or the universe.' },
                        { feature: 'Clean & Playful UI', text: 'Built with a gradient background, animated text, and instant feedback for fun interaction.' },
                        { feature: 'Shareable Results', text: 'Copy or share your favorite excuses directly.' },
                        { feature: 'Simple & Fast', text: 'Built and deployed within a week as part of a personal challenge to ship weekly projects.' }
                    ]
                }
            },
            {
                id: 'stack',
                label: 'Stack',
                content: {
                    stack: ['Next.js', 'TailwindCSS', 'Vercel']
                }
            }
        ]
    },
    'Dec': {
        status: true,
        meta: {
            title: 'RAG-Powered News Chatbot',
            tagline: 'A fully functional chatbot that understands news by combining vector search and LLM reasoning.',
            link: 'https://rag-news-client.vercel.app/', // replace with actual link
            status: 'live'
            // prototypeLink: ''
        },
        content: [
            {
                id: 'problem',
                label: 'Problem',
                content: {
                    overview:
                        "I’ve always been curious about how real-world RAG systems work — especially those that search large text corpora and generate contextual answers. News data changes constantly, so I wanted to build a chatbot that can actually understand and answer questions from a real collection of articles instead of relying on generic LLM knowledge."
                }
            },
            {
                id: 'idea',
                label: 'Idea',
                content: {
                    overview:
                        "The project is a complete RAG pipeline wrapped inside a conversational chatbot. It ingests news articles, embeds them, stores them in a vector database, fetches the most relevant chunks on each query, and uses an LLM to produce accurate and context-aware responses. I built it to understand the full lifecycle of retrieval augmented generation — from ingestion to vector storage to query-time retrieval.",
                    features: [
                        {
                            feature: 'Automated News Ingestion',
                            text: 'Scrapes or fetches ~50+ articles and converts them into clean text for embedding.'
                        },
                        {
                            feature: 'Vector Search Retrieval',
                            text: 'Embeds articles using Jina embeddings and stores them in a vector DB for fast semantic search.'
                        },
                        {
                            feature: 'RAG Answering Pipeline',
                            text: 'Retrieves top-k relevant chunks and feeds them into an LLM (Gemini) to produce grounded responses.'
                        },
                        {
                            feature: 'Session-Based Chat System',
                            text: 'Each user gets a unique session with history stored in Redis for fast access and resets.'
                        },
                        {
                            feature: 'Clean Chat UI',
                            text: 'React-based interface with message history, smooth response rendering, and a reset button.'
                        },
                        {
                            feature: 'REST-First Architecture',
                            text: 'Simple, stable REST API for chat and session operations — no unnecessary socket complexity.'
                        }
                    ]
                }
            },
            {
                id: 'stack',
                label: 'Stack',
                content: {
                    stack: [
                        'Node.js (Express)',
                        'React',
                        'SCSS',
                        'Redis',
                        'Jina Embeddings',
                        'Qdrant',
                        'Google Gemini API',
                        'GCP'
                    ]
                }
            }
        ]
    }
}

export default ProjectSeed;