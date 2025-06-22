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
                                    'rainbow-dqn-tetris': {
                                        type: 'directory',
                                        children: {
                                            'README.md': {
                                                type: 'file',
                                                content: `# Rainbow DQN-based Tetris AI`
                                            },
                                        }
                                    },
                                    'cnn-rnn-accelerator': {
                                        type: 'directory',
                                        children: {
                                            'README.md': {
                                                type: 'file',
                                                content: `# Hardware-Aware CNN Kernel Sequentialization for RNN AI Accelerator`
                                            },
                                        }
                                    },
                                    'transformer-from-scratch': {
                                        type: 'directory',
                                        children: {
                                            'README.md': {
                                                type: 'file',
                                                content: `# Transformer Architecture from Scratch
`
                                            },
                                        }
                                    },
                                    'brazil-nut-effect': {
                                        type: 'directory',
                                        children: {
                                            'README.md': {
                                                type: 'file',
                                                content: `# Analytic Model of Horizontal Brazil Nut Effect by Void Filling
`
                                            },
                                        }
                                    }
                                }
                            }, 'about.txt': {
                                type: 'file',
                                content: `Hyeokgi Kim
ECE Undergraduate & AI Engineer`
                            }, 'resume.pdf': {
                                type: 'file',
                                content: 'PDF Resume - Hyeokgi Kim, ECE Student & AI Engineer'
                            },
                            'research': {
                                type: 'directory',
                                children: {
                                    'papers': {
                                        type: 'directory',
                                        children: {
                                            'cnn-rnn-accelerator-paper.pdf': {
                                                type: 'file',
                                                content: 'Research paper on Hardware-Aware CNN Kernel Sequentialization (In Progress)'
                                            },
                                            'brazil-nut-thesis.pdf': {
                                                type: 'file',
                                                content: 'Graduation thesis: Analytic model of horizontal Brazil nut effect by void filling'
                                            },
                                        }
                                    },
                                }
                            }, 'contact.txt': {
                                type: 'file',
                                content: `Contact Information - Hyeokgi Kim
Feel free to reach out for research collaborations or project discussions!`
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
