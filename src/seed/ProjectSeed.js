const ProjectSeed = {
    'Jun': {
        status: true,
        meta: {
            title: 'LoremAPIs',
            tagline: 'A No code Mock API builder using AI',
            link: 'https://frontend-app-677386827284.us-central1.run.app/'
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
    }
}

export default ProjectSeed;