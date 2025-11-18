export const PROFILE = {
    name: "Hyeokgi Kim",
    tagline: "Undergraduate ECE Student",
    email: "ryan0905@snu.ac.kr",
    github: "https://github.com/grenademeister",
    summary:
        "AI enthusiast · Generative Models · Medical Imaging",
    description:
        "Hi 👋 , I'm an Electrical & Computer Engineering student studying at Seoul National University.\n" +
        "I'm primarily interested in applied machine learning, generative AI, and MR imaging.\n" +
        "I've experienced developing AI agents and neural network models with various projects and research internships."
};

export const EDUCATION = [
    {
        institution: "Seoul National University",
        degree: "Electrical & Computer Engineering",
        period: "2024 - Present",
        gpa: "4.17 / 4.3",
        icon: "BookOpen"
    },
    {
        institution: "Gyeonggi Science High School for the Gifted",
        degree: "Physics Track",
        period: "Graduated 2023",
        gpa: "4.27 / 4.3",
        icon: "GraduationCap"
    }
];

export const SKILLS = {
    "AI Research": [
        { name: "PyTorch", icon: "Zap" },
        { name: "TensorFlow", icon: "Brain" },
        { name: "HuggingFace Transformers", icon: "Bot" },
        { name: "OpenAI Gym", icon: "Network" },
        { name: "scikit-learn", icon: "Database" },
        { name: "MATLAB", icon: "Cpu" }
    ],
    "Software Engineering": [
        { name: "Python", icon: "FileCode" },
        { name: "C/C++", icon: "Code2" },
        { name: "JavaScript (React)", icon: "Laptop2" },
        { name: "Git", icon: "GitBranch" },
        { name: "Linux", icon: "Terminal" },
    ]
};

export const PROJECTS = [
    {
        title: "Longitudinal MRI reconstruction with Diffusion/Flow Models",
        year: 2025,
        description:
            "Developed a novel diffusion model and flow based model for reconstructing longitudinal MRI data",
        detailedDescription: "Created advanced generative models to reconstruct high-quality longitudinal MRI images from sparse data. The project involved designing and training diffusion and flow-based models, achieving state-of-the-art results in medical imaging tasks.",
        tags: ["Python", "PyTorch", "Medical Imaging", "Diffusion Models"],
        showOnTop: true,
    },
    {
        title: "Hardware-Aware Sequentialization of CNN Kernels",
        year: 2025,
        description:
            "Converted spatial CNN kernels into time-sequential forms to exploit an RNN-centric AI accelerator",
        detailedDescription: "Developed a novel approach to convert convolutional neural network operations into sequential forms optimized for RNN-based accelerator hardware. This research focused on hardware-aware optimization techniques that significantly improved throughput while maintaining model accuracy.",
        tags: ["C++", "Python", "PyTorch", "AI Acceleration"],
        showOnTop: false,
    },
    {
        title: "Rainbow DQN Tetris Agent",
        year: 2025,
        description:
            "Designed and trained a Rainbow DQN agent that surpasses human baseline on classic Tetris",
        detailedDescription: "Implemented a reinforcement learning agent using Rainbow DQN techniques (combining multiple DQN improvements) for playing Tetris. The agent incorporates prioritized experience replay, noisy networks for exploration, and distributional Q-learning to model uncertainty in returns.",
        tags: ["Python", "PyTorch", "Reinforcement Learning", "OpenAI Gym"],
        showOnTop: false,
    },
    {
        title: "Transformer from Scratch on Edge NPU",
        year: 2024,
        description:
            "Implemented a basic transformer architecture, quantized and compiled on Intel NPU",
        detailedDescription: "Built a transformer architecture from scratch with fundamental principles and optimized it for edge deployment. Implemented efficient quantization techniques to enable inference on resource-constrained neural processing units.",
        tags: ["Python", "Edge", "HuggingFace Transformers"],
        showOnTop: true,
    },
    {
        title: "Analytic Model of Horizontal Brazil Nut Effect",
        year: 2023,
        description:
            "Developed an analytic model explaining the horizontal Brazil nut effect through void filling mechanisms as part of physics graduation research.",
        detailedDescription: "Created a mathematical model to explain the physical phenomenon where larger particles aggregates to the center in heterogeneous granular materials when shaken horizontally. The research focused on void-filling mechanisms and resulted in a predictive model with experimental validation.",
        tags: ["Physics", "Mathematical Modeling"],
        showOnTop: false,
    },
    {
        title: "One-shot object detection with DINOv3",
        year: 2025,
        description:
            "Implemented one-shot object detection and tracking using DINOv3 that can run on laptop CPUs",
        detailedDescription: "Created a one-shot object detection and tracking system using the DINOv3 model architecture. Implemented using patch similarity techniques and leveraged various method to optimize performance for CPU-only environments.",
        tags: ["Python", "Edge", "HuggingFace Transformers"],
        showOnTop: true,
    },
    {
        title: "Long-horizon Pokemon gameplay agent",
        year: 2025,
        description:
            "Developed an AI agent capable of playing Pokemon games as part of the NeurIPS 2025 PokeAgent challenge",
        detailedDescription: "Designed an AI agent that can effectively play Pokemon games by utilizing tool calling, memory management, and planning strategies. The agent didn't need any additional training or ground-truth data. This project was part of DEEPEST research group activities.",
        tags: ["Python", "Reinforcement Learning", "AI Agents"],
        showOnTop: true,
    },
    {
        title: "Solar radiance prediction model",
        year: 2025,
        description:
            "Developed a machine learning model to predict solar radiance as part of the POSTECH OIBC challenge",
        detailedDescription: "Created a model to impute missing solar radiance data using various machine learning techniques. This project was conducted as part of the POSTECH OIBC challenge as a team member.",
        tags: ["Python", "scikit-learn", "PyTorch", "Machine Learning"],
        showOnTop: false,
    }
];

export const EXPERIENCE = [
    {
        role: "Research Intern",
        org: "LIST, Seoul National University",
        period: "May 2025 ~ February 2026",
        description: "Conducted research on longitudinal MRI reconstruction in the Laboratory for Imaging science & technology(LIST).",
        icon: "Award",
    },
    {
        role: "Student Member",
        org: "DEEPEST(Research Group)",
        period: "Since 2025",
        description: "Active member of a student-led AI research society DEEPEST, focused on deep learning and its applications.",
        icon: "BookOpen",
    },
    {
        role: "STEM National Scholarship",
        org: "Korea Student Aid Foundation",
        period: "Since 2024",
        description: "Recipient of the National Scholarship for Outstanding STEM Students, awarded based on academic excellence and research potential.",
        icon: "GraduationCap",
    },
];
