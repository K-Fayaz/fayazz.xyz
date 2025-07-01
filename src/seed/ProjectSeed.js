const ProjectSeed = {
    'Jun': {
        status: true,
        meta: {
            title: 'LoremAPIs',
            tagline: 'A No code Mock API builder using AI',
            link: 'https://loremapis.com',
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
    'Jul': {
        status: true,
        meta: {
            title: 'Journal to Tweet',
            tagline: 'The AI second brain for your online presence.',
            link: '',
            status: 'building'
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
                    overview: "Journal-To-Tweet helps makers and indie hackers stay consistent on X (formerly Twitter) without needing to 'create content' every day. Users log their day in a journal-style interface — what they worked on, learned, built, or thought about. At user-defined times during the day, AI converts these journal entries into tweet suggestions and emails them. Additionally, the app pulls trend-based topics from APIs like Hacker News and Product Hunt to supplement tweet ideas, helping users stay relevant and visible.",
                    features: [
                        { feature: 'Daily Journal Interface', text: 'Simple, chat-style journaling space for logging thoughts, updates, and events each day.' },
                        { feature: 'Calendar View', text: 'A visual calendar to track which days you journaled and tweeted.' },
                        { feature: 'AI Tweet Suggestions', text: 'Uses journal entries to draft personalized tweets based on your choice and tone.' },
                        { feature: 'Scheduled Delivery', text: 'Lets users choose when to receive tweet ideas (e.g., 10am, 1:30pm, 5pm, 8pm).' },
                        { feature: 'Email Notifications', text: 'Tweet drafts are delivered by email at user-defined times for frictionless editing and posting.' },
                        { feature: 'Trend-Based Suggestions', text: 'Pulls trending topics from APIs like Hacker News and Product Hunt to suggest timely tweet ideas.' },
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
    }
}

export default ProjectSeed;