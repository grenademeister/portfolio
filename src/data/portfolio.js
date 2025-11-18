export const portfolioData = {
  projects: {
    'rainbow-dqn-tetris': {
      title: 'Rainbow DQN-based Tetris AI',
      description: 'A sophisticated Tetris-playing AI agent using Rainbow DQN reinforcement learning algorithm.',
      technologies: ['Python', 'PyTorch', 'OpenAI Gym', 'NumPy', 'Matplotlib'],
      category: 'AI/ML',
      status: 'Completed',
      year: '2025',
      githubUrl: 'https://github.com/grenademeister/rainbow-dqn-tetris',
      features: [
        'Rainbow DQN implementation with Double DQN',
        'Dueling Networks architecture',
        'Prioritized Experience Replay',
        'Multi-step Learning',
        'Distributional RL',
        'Noisy Networks',
        'Real-time gameplay visualization',
        'Training progress monitoring'
      ],
      performance: 'Advanced RL agent demonstrating strategic piece placement and line clearing through self-learning',
      researchAspects: [
        'Reinforcement Learning algorithm optimization',
        'Neural network architecture design',
        'Training stability improvements',
        'Performance analysis and metrics'
      ]
    },
    'cnn-rnn-accelerator': {
      title: 'Hardware-Aware CNN Kernel Sequentialization',
      description: 'Research project optimizing CNN operations for RNN-based AI accelerator hardware.',
      technologies: ['Python', 'PyTorch', 'Hardware Simulation', 'Performance Profiling'],
      category: 'AI/Hardware',
      status: 'Ongoing',
      year: '2025',
      affiliation: 'LIST, Seoul National University',
      features: [
        'Novel sequentialization algorithm for CNN kernels',
        'Hardware-aware optimization techniques',
        'Memory access pattern optimization',
        'CNN-to-RNN transformation strategies',
        'Performance benchmarking framework',
        'Edge AI optimization'
      ],
      researchGoals: [
        'Develop efficient CNN kernel sequentialization',
        'Optimize for RNN accelerator architecture',
        'Minimize computational overhead',
        'Improve memory efficiency',
        'Enable edge AI deployment'
      ],
      applications: [
        'Edge AI devices',
        'Mobile AI acceleration',
        'IoT applications',
        'Power-efficient inference'
      ]
    },
    'transformer-from-scratch': {
      title: 'Transformer Architecture Implementation',
      description: 'Complete Transformer neural network built from scratch with NPU inference optimization.',
      technologies: ['Python', 'PyTorch', 'Hugging Face Transformers', 'NPU Libraries', 'CUDA'],
      category: 'AI/ML',
      status: 'Completed',
      year: '2024',
      githubUrl: 'https://github.com/grenademeister/transformer-from-scratch',
      features: [
        'Complete Transformer implementation from scratch',
        'Multi-head self-attention mechanism',
        'Positional encoding system',
        'Layer normalization and residual connections',
        'NPU-optimized inference pipeline',
        'Local deployment capabilities',
        'Efficient memory management'
      ],
      learningOutcomes: [
        'Deep understanding of attention mechanisms',
        'Transformer architecture internals',
        'Hardware optimization techniques',
        'NPU programming and deployment'
      ],
      technicalDetails: [
        'Built without pre-trained models',
        'NPU hardware acceleration',
        'Support for variable sequence lengths',
        'Memory-efficient inference'
      ]
    },
    'brazil-nut-effect': {
      title: 'Horizontal Brazil Nut Effect Analysis',
      description: 'Physics graduation research developing analytical model for granular segregation through void filling.',
      technologies: ['Mathematical Modeling', 'Statistical Mechanics', 'Python', 'Physics Simulation'],
      category: 'Physics Research',
      status: 'Completed',
      year: '2023',
      affiliation: 'Gyeonggi Science High School for the Gifted',
      features: [
        'Novel analytical approach to Brazil nut effect',
        'Void filling mechanism characterization',
        'Horizontal segregation pattern analysis',
        'Theoretical framework development',
        'Mathematical model implementation',
        'Particle system simulation'
      ],
      researchContributions: [
        'Theoretical modeling of granular segregation',
        'Void filling mechanism analysis',
        'Horizontal particle migration study',
        'Mathematical framework for physical phenomena'
      ],
      applications: [
        'Granular materials processing',
        'Industrial mixing processes',
        'Pharmaceutical powder handling',
        'Food processing optimization'
      ]
    }
  },
  
  profile: {
    name: 'Hyeokgi Kim',
    title: 'ECE Undergraduate & AI Engineer',
    tagline: 'Passionate about applied machine learning, deep learning, and reinforcement learning',
    skills: {
      programming: ['Python', 'C++', 'JavaScript'],
      deepLearning: ['PyTorch', 'TensorFlow', 'Hugging Face Transformers'],
      reinforcementLearning: ['OpenAI Gym', 'Rainbow DQN', 'Policy Gradients'],
      classicalML: ['Scikit-learn', 'NumPy', 'Pandas'],
      hardware: ['NPU Optimization', 'Hardware Simulation', 'Performance Profiling'],
      research: ['Mathematical Modeling', 'Statistical Mechanics', 'Physics Simulation']
    },
    education: {
      current: 'Seoul National University - Electrical & Computer Engineering (GPA: 4.3/4.5)',
      previous: 'Gyeonggi Science High School for the Gifted (GPA: 4.27/4.3)'
    },
    experience: [
      'Research Intern at LIST, Seoul National University (May 2025 - Aug 2025)',
      'Student Member of Deepest Research Group (Since 2025)',
      'National Scholarship for Outstanding STEM Students (Since 2024)'
    ],
    researchInterests: [
      'Applied Machine Learning',
      'Deep Learning & Neural Networks', 
      'Reinforcement Learning',
      'Hardware-aware AI Acceleration',
      'Granular Physics Modeling'
    ],
    contact: {
      email: 'ryan0905@snu.ac.kr',
      github: 'github.com/grenademeister',
      university: 'Seoul National University',
      location: 'Seoul, South Korea'
    }
  }
};
