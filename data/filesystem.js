// Virtual File System Structure
export const fileSystem = {
    '/': {
        type: 'directory',
        children: {
            'home': {
                type: 'directory',
                children: {
                    'user': {
                        type: 'directory',
                        children: {
                            'projects': {
                                type: 'directory',
                                children: {
                                    'tetris-dqn': {
                                        type: 'directory',
                                        children: {
                                            'README.md': {
                                                type: 'file',
                                                content: `# Tetris DQN

An AI-powered Tetris game using Deep Q-Network (DQN) reinforcement learning.

## Features
- Self-learning Tetris AI
- Real-time gameplay visualization
- Performance metrics tracking
- Neural network architecture optimization

## Technologies
- Python
- TensorFlow/Keras
- OpenAI Gym
- NumPy

## Performance
The AI achieves an average score of 15,000+ points after 1000 training episodes.

## Installation
\`\`\`bash
pip install -r requirements.txt
python train.py
\`\`\`

## Demo
Watch the AI play: [Live Demo](https://example.com/tetris-dqn)`
                                            },
                                            'demo.mp4': {
                                                type: 'file',
                                                content: 'Binary video file - AI playing Tetris'
                                            }
                                        }
                                    },
                                    'portfolio-website': {
                                        type: 'directory',
                                        children: {
                                            'README.md': {
                                                type: 'file',
                                                content: `# Portfolio Website

A modern, responsive portfolio website built with React and CLI interface.

## Features
- Terminal-style navigation
- Interactive command system
- Project showcase
- Theme customization
- Mobile responsive

## Technologies
- React 19
- Tailwind CSS
- Framer Motion
- Vite

## Commands
- \`ls\` - List directory contents
- \`cd <dir>\` - Change directory
- \`cat <file>\` - Display file contents
- \`open <project>\` - Open project details
- \`help\` - Show available commands`
                                            }
                                        }
                                    },
                                    'e-commerce-app': {
                                        type: 'directory',
                                        children: {
                                            'README.md': {
                                                type: 'file',
                                                content: `# E-Commerce App

A full-stack e-commerce application with modern UI and robust backend.

## Features
- User authentication
- Product catalog
- Shopping cart
- Payment integration
- Order management
- Admin dashboard

## Technologies
- Frontend: React, Redux, Tailwind CSS
- Backend: Node.js, Express, MongoDB
- Payment: Stripe API
- Authentication: JWT

## Live Demo
[Visit App](https://example.com/ecommerce)`
                                            }
                                        }
                                    }
                                }
                            },
                            'about.txt': {
                                type: 'file',
                                content: `Hi! I'm a Full-Stack Developer passionate about creating innovative web applications.

Skills:
- Frontend: React, Vue.js, TypeScript, Tailwind CSS
- Backend: Node.js, Python, Express, FastAPI
- Database: MongoDB, PostgreSQL, Redis
- DevOps: Docker, AWS, CI/CD
- AI/ML: TensorFlow, PyTorch, OpenAI API

Experience:
- 5+ years in web development
- Led 10+ successful projects
- Mentored junior developers
- Open source contributor

Contact:
- Email: developer@example.com
- GitHub: github.com/developer
- LinkedIn: linkedin.com/in/developer`
                            },
                            'resume.pdf': {
                                type: 'file',
                                content: 'PDF Resume - Full Stack Developer'
                            },
                            'contact.txt': {
                                type: 'file',
                                content: `Contact Information:

Email: developer@example.com
Phone: +1 (555) 123-4567
GitHub: https://github.com/developer
LinkedIn: https://linkedin.com/in/developer
Portfolio: https://developer-portfolio.com

Location: San Francisco, CA
Timezone: PST (UTC-8)

Available for:
- Full-time opportunities
- Freelance projects
- Consulting
- Mentoring`
                            }
                        }
                    }
                }
            }
        }
    }
};

export const getCurrentDirectory = (path, fs = fileSystem) => {
    const pathParts = path.split('/').filter(part => part !== '');
    let current = fs['/'];

    for (const part of pathParts) {
        if (current.children && current.children[part]) {
            current = current.children[part];
        } else {
            return null;
        }
    }

    return current;
};

export const getFileContent = (path, fs = fileSystem) => {
    const file = getCurrentDirectory(path, fs);
    return file && file.type === 'file' ? file.content : null;
};

export const listDirectory = (path, fs = fileSystem) => {
    const dir = getCurrentDirectory(path, fs);
    if (dir && dir.type === 'directory' && dir.children) {
        return Object.keys(dir.children).map(name => ({
            name,
            type: dir.children[name].type
        }));
    }
    return [];
};
