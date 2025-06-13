export const portfolioData = {
    projects: {
        'tetris-dqn': {
            title: 'Tetris DQN - AI Tetris Player',
            description: 'An AI-powered Tetris game using Deep Q-Network (DQN) reinforcement learning.',
            technologies: ['Python', 'TensorFlow', 'OpenAI Gym', 'NumPy'],
            category: 'AI/ML',
            status: 'Completed',
            demoUrl: 'https://example.com/tetris-dqn',
            githubUrl: 'https://github.com/developer/tetris-dqn',
            features: [
                'Self-learning Tetris AI',
                'Real-time gameplay visualization',
                'Performance metrics tracking',
                'Neural network architecture optimization'
            ],
            performance: 'Average score of 15,000+ points after 1000 training episodes',
            images: [
                '/images/tetris-gameplay.png',
                '/images/tetris-training.png',
                '/images/tetris-metrics.png'
            ]
        },
        'portfolio-website': {
            title: 'CLI Portfolio Website',
            description: 'A modern, responsive portfolio website with terminal-style interface.',
            technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
            category: 'Frontend',
            status: 'In Progress',
            demoUrl: 'https://developer-portfolio.com',
            githubUrl: 'https://github.com/developer/portfolio',
            features: [
                'Terminal-style navigation',
                'Interactive command system',
                'Project showcase',
                'Theme customization',
                'Mobile responsive'
            ],
            commands: [
                'ls - List directory contents',
                'cd <dir> - Change directory',
                'cat <file> - Display file contents',
                'open <project> - Open project details',
                'help - Show available commands'
            ]
        },
        'e-commerce-app': {
            title: 'Full-Stack E-Commerce Platform',
            description: 'A comprehensive e-commerce application with modern UI and robust backend.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
            category: 'Full-Stack',
            status: 'Completed',
            demoUrl: 'https://example.com/ecommerce',
            githubUrl: 'https://github.com/developer/ecommerce',
            features: [
                'User authentication',
                'Product catalog',
                'Shopping cart',
                'Payment integration',
                'Order management',
                'Admin dashboard'
            ],
            architecture: {
                frontend: 'React, Redux, Tailwind CSS',
                backend: 'Node.js, Express, MongoDB',
                payment: 'Stripe API',
                auth: 'JWT tokens'
            }
        }
    },

    profile: {
        name: 'Full-Stack Developer',
        tagline: 'Passionate about creating innovative web applications',
        skills: {
            frontend: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS'],
            backend: ['Node.js', 'Python', 'Express', 'FastAPI'],
            database: ['MongoDB', 'PostgreSQL', 'Redis'],
            devops: ['Docker', 'AWS', 'CI/CD'],
            aiml: ['TensorFlow', 'PyTorch', 'OpenAI API']
        },
        experience: '5+ years in web development',
        achievements: [
            'Led 10+ successful projects',
            'Mentored junior developers',
            'Open source contributor'
        ],
        contact: {
            email: 'developer@example.com',
            github: 'github.com/developer',
            linkedin: 'linkedin.com/in/developer',
            location: 'San Francisco, CA'
        }
    }
};
