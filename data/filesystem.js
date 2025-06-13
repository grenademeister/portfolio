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
                                                content: `# Rainbow DQN-based Tetris AI

A sophisticated Tetris-playing AI agent using Rainbow DQN (Deep Q-Network) reinforcement learning algorithm.

## Overview
This project implements an advanced reinforcement learning agent that learns to play Tetris using the Rainbow DQN algorithm, which combines several improvements over the standard DQN.

## Features
- Rainbow DQN implementation with:
  - Double DQN
  - Dueling Networks
  - Prioritized Experience Replay
  - Multi-step Learning
  - Distributional RL
  - Noisy Networks
- Real-time gameplay visualization
- Training progress monitoring
- Performance metrics and analysis

## Technologies
- Python
- PyTorch
- OpenAI Gym
- NumPy
- Matplotlib (for visualization)

## Project Status
Completed in 2025 as part of reinforcement learning research.

## Results
The agent demonstrates significant improvement in Tetris gameplay through self-learning, achieving high scores through strategic piece placement and line clearing.`
                                            },
                                            'train.py': {
                                                type: 'file',
                                                content: 'Main training script for Rainbow DQN agent'
                                            },
                                            'model.py': {
                                                type: 'file',
                                                content: 'Neural network architecture and Rainbow DQN implementation'
                                            },
                                            'environment.py': {
                                                type: 'file',
                                                content: 'Tetris game environment wrapper for RL training'
                                            }
                                        }
                                    },
                                    'cnn-rnn-accelerator': {
                                        type: 'directory',
                                        children: {
                                            'README.md': {
                                                type: 'file',
                                                content: `# Hardware-Aware CNN Kernel Sequentialization for RNN AI Accelerator

Research project focused on optimizing CNN operations for RNN-based AI accelerator hardware through intelligent kernel sequentialization.

## Overview
This project addresses the challenge of efficiently running CNN operations on RNN-optimized AI accelerator hardware by developing novel sequentialization techniques for CNN kernels.

## Research Objectives
- Develop hardware-aware algorithms for CNN kernel sequentialization
- Optimize memory access patterns for RNN accelerator architecture
- Minimize computational overhead while maintaining accuracy
- Create efficient mapping strategies for CNN-to-RNN transformation

## Key Contributions
- Novel sequentialization algorithm for CNN kernels
- Hardware-aware optimization techniques
- Performance analysis and benchmarking
- Memory efficiency improvements

## Technologies
- Python
- PyTorch
- Hardware simulation frameworks
- Performance profiling tools

## Status
Ongoing research project (2025) at Seoul National University LIST Lab.

## Applications
- Edge AI devices
- Mobile AI acceleration
- IoT applications with RNN accelerators
- Power-efficient AI inference`
                                            },
                                            'algorithm.py': {
                                                type: 'file',
                                                content: 'Core sequentialization algorithm implementation'
                                            },
                                            'hardware_sim.py': {
                                                type: 'file',
                                                content: 'Hardware accelerator simulation and benchmarking'
                                            },
                                            'experiments/': {
                                                type: 'directory',
                                                children: {
                                                    'benchmarks.md': {
                                                        type: 'file',
                                                        content: 'Performance benchmarks and analysis results'
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    'transformer-from-scratch': {
                                        type: 'directory',
                                        children: {
                                            'README.md': {
                                                type: 'file',
                                                content: `# Transformer Architecture from Scratch

Implementation of the Transformer neural network architecture from scratch with local NPU inference optimization.

## Overview
This project involves building a complete Transformer model from the ground up, focusing on understanding the attention mechanism and optimizing inference for local Neural Processing Units (NPUs).

## Features
- Complete Transformer implementation in PyTorch
- Multi-head self-attention mechanism
- Positional encoding
- Layer normalization and residual connections
- NPU-optimized inference pipeline
- Local deployment capabilities

## Technical Details
- Built entirely from scratch (no pre-trained models)
- Optimized for NPU hardware acceleration
- Efficient memory management for local inference
- Support for various sequence lengths

## Technologies
- Python
- PyTorch
- Hugging Face Transformers (for reference)
- NPU optimization libraries
- CUDA (for GPU acceleration)

## Project Year
2024

## Learning Outcomes
- Deep understanding of attention mechanisms
- Transformer architecture internals
- Hardware optimization techniques
- NPU programming and deployment

## Applications
- Natural language processing
- Sequence-to-sequence tasks
- Local AI inference
- Edge computing applications`
                                            },
                                            'transformer.py': {
                                                type: 'file',
                                                content: 'Core Transformer model implementation'
                                            },
                                            'attention.py': {
                                                type: 'file',
                                                content: 'Multi-head attention mechanism implementation'
                                            },
                                            'npu_inference.py': {
                                                type: 'file',
                                                content: 'NPU-optimized inference pipeline'
                                            }
                                        }
                                    },
                                    'brazil-nut-effect': {
                                        type: 'directory',
                                        children: {
                                            'README.md': {
                                                type: 'file',
                                                content: `# Analytic Model of Horizontal Brazil Nut Effect by Void Filling

Physics graduation research project analyzing the horizontal Brazil nut effect through void filling mechanisms.

## Overview
This research project develops an analytical model to understand the horizontal Brazil nut effect, a phenomenon in granular physics where larger particles migrate in a horizontal direction through void filling processes.

## Research Focus
- Theoretical modeling of granular segregation
- Void filling mechanisms in particle systems
- Horizontal particle migration analysis
- Mathematical modeling of physical phenomena

## Key Contributions
- Novel analytical approach to Brazil nut effect
- Void filling mechanism characterization
- Horizontal segregation pattern analysis
- Theoretical framework development

## Methodology
- Mathematical modeling
- Analytical derivations
- Theoretical physics principles
- Statistical mechanics approaches

## Project Details
- Graduation research in Physics (2023)
- Conducted at Gyeonggi Science High School for the Gifted
- Part of advanced physics curriculum

## Applications
- Granular materials processing
- Industrial mixing processes
- Pharmaceutical powder handling
- Food processing optimization

## Status
Completed as graduation research project in 2023.`
                                            },
                                            'analytical_model.py': {
                                                type: 'file',
                                                content: 'Mathematical model implementation and analysis'
                                            },
                                            'simulation.py': {
                                                type: 'file',
                                                content: 'Particle system simulation code'
                                            },
                                            'thesis.pdf': {
                                                type: 'file',
                                                content: 'Graduation thesis document (PDF)'
                                            }
                                        }
                                    }
                                }
                            }, 'about.txt': {
                                type: 'file',
                                content: `Hyeokgi Kim
ECE Undergraduate & AI Engineer

Summary:
Undergraduate student majoring in Electrical and Computer Engineering at Seoul National University with a strong interest in applied machine learning, deep learning, and reinforcement learning. Experienced in developing AI agents and neural network models using Python and PyTorch with hands-on projects such as reinforcement learning agents and transformer-based models.

Education:
• Seoul National University - Electrical & Computer Engineering
  GPA: 4.3/4.5 (2024 - Present)
• Gyeonggi Science High School for the Gifted
  GPA: 4.27/4.3 (Graduated 2023)

Technical Skills:
• Programming Languages: Python, C++, JavaScript
• AI/ML Frameworks:
  - Deep Learning: PyTorch, TensorFlow, Hugging Face Transformers
  - Reinforcement Learning: OpenAI Gym
  - Classical ML: Scikit-learn

Research Areas:
• Hardware-aware AI acceleration
• Reinforcement learning algorithms
• Deep learning architectures
• Granular physics modeling

Awards & Experience:
• Research Intern at LIST, Seoul National University (May 2025 - Aug 2025)
• National Scholarship for Outstanding STEM Students (Since 2024)
• Student Member of Deepest Research Group (Since 2025)

Contact:
Email: ryan0905@snu.ac.kr
GitHub: github.com/grenademeister`
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
                                            'reading-list.md': {
                                                type: 'file',
                                                content: `# Research Reading List

## Reinforcement Learning
- Sutton & Barto: Reinforcement Learning: An Introduction
- Hessel et al.: Rainbow: Combining Improvements in Deep Reinforcement Learning
- Van Hasselt et al.: Deep Reinforcement Learning with Double Q-learning

## Deep Learning & Transformers
- Vaswani et al.: Attention Is All You Need
- Devlin et al.: BERT: Pre-training of Deep Bidirectional Transformers
- Brown et al.: Language Models are Few-Shot Learners (GPT-3)

## Hardware Acceleration
- Chen et al.: DianNao: A Small-Footprint High-Throughput Accelerator for Ubiquitous Machine-Learning
- Jouppi et al.: In-Datacenter Performance Analysis of a Tensor Processing Unit

## Granular Physics
- Rosato et al.: Why the Brazil nuts are on top: Size segregation of particulate matter
- Duran: Sands, Powders, and Grains: An Introduction to the Physics of Granular Materials`
                                            }
                                        }
                                    },
                                    'notes': {
                                        type: 'directory',
                                        children: {
                                            'deep-learning-notes.md': {
                                                type: 'file',
                                                content: `# Deep Learning Study Notes

## Key Concepts

### Neural Networks
- Forward propagation
- Backpropagation algorithm
- Gradient descent optimization
- Regularization techniques (dropout, batch norm)

### CNN Architectures
- ResNet: Skip connections and residual learning
- VGG: Deep convolutional networks
- Inception: Multi-scale feature extraction

### RNN/LSTM
- Vanishing gradient problem
- LSTM gates: forget, input, output
- GRU: Simplified gating mechanism

### Transformer Architecture
- Self-attention mechanism
- Multi-head attention
- Positional encoding
- Layer normalization`
                                            },
                                            'rl-algorithms.md': {
                                                type: 'file',
                                                content: `# Reinforcement Learning Algorithms

## Value-Based Methods
- Q-Learning
- Deep Q-Network (DQN)
- Double DQN
- Dueling DQN
- Rainbow DQN

## Policy-Based Methods
- REINFORCE
- Actor-Critic
- A3C (Asynchronous Advantage Actor-Critic)
- PPO (Proximal Policy Optimization)

## Key Concepts
- Exploration vs Exploitation
- Experience Replay
- Target Networks
- Temporal Difference Learning
- Policy Gradient Theorem`
                                            }
                                        }
                                    }
                                }
                            }, 'contact.txt': {
                                type: 'file',
                                content: `Contact Information - Hyeokgi Kim

Email: ryan0905@snu.ac.kr
GitHub: https://github.com/grenademeister

Academic Affiliation:
Seoul National University
Electrical & Computer Engineering Department
Seoul, South Korea

Research Groups:
• LIST (Laboratory for Intelligent Systems Technology), SNU
• Deepest Research Group (Student Member)

Current Status:
• Undergraduate Student (2024 - Present)
• Research Intern at LIST, SNU (May 2025 - Aug 2025)
• National Scholarship Recipient for Outstanding STEM Students

Research Interests:
• Applied Machine Learning
• Deep Learning & Neural Networks
• Reinforcement Learning
• Hardware-aware AI Acceleration
• Granular Physics Modeling

Available for:
• Research collaborations
• AI/ML project partnerships
• Academic discussions
• Internship opportunities

Languages:
• Korean (Native)
• English (Fluent)

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
