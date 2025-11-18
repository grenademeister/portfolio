export const PROFILE = {
    name: "Hyeokgi Kim",
    tagline: "Undergraduate ECE Student & AI Engineer",
    email: "ryan0905@snu.ac.kr",
    github: "https://github.com/grenademeister",
    summary:
        "ECE undergraduate at Seoul National University\n" +
        "Generative Models · Medical Imaging · Reinforcement Learning",
    description:
        "Electrical & Computer Engineering student at Seoul National University focused on applied machine learning, reinforcement learning, and hardware-aware AI acceleration. Experienced in developing AI agents and neural network models with hands-on projects in reinforcement learning and transformer-based models."
};

export const EDUCATION = [
    {
        institution: "Seoul National University",
        degree: "Electrical & Computer Engineering",
        period: "2024 - Present",
        gpa: "4.17 / 4.3",
        icon: "GraduationCap"
    },
    {
        institution: "Gyeonggi Science High School for the Gifted",
        degree: "Physics Track",
        period: "Graduated 2023",
        gpa: "4.27 / 4.3",
        icon: "BookOpen"
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
    },
    {
        title: "Hardware-Aware Sequentialization of CNN Kernels",
        year: 2025,
        description:
            "Converted spatial CNN kernels into time-sequential forms to exploit an RNN-centric AI accelerator",
        detailedDescription: "Developed a novel approach to convert convolutional neural network operations into sequential forms optimized for RNN-based accelerator hardware. This research focused on hardware-aware optimization techniques that significantly improved throughput while maintaining model accuracy.",
        tags: ["C++", "Python", "PyTorch", "AI Acceleration"],
    },
    {
        title: "Rainbow DQN Tetris Agent",
        year: 2025,
        description:
            "Designed and trained a Rainbow DQN agent that surpasses human baseline on classic Tetris",
        detailedDescription: "Implemented a reinforcement learning agent using Rainbow DQN techniques (combining multiple DQN improvements) for playing Tetris. The agent incorporates prioritized experience replay, noisy networks for exploration, and distributional Q-learning to model uncertainty in returns.",
        tags: ["Python", "PyTorch", "Reinforcement Learning", "OpenAI Gym"],
    },
    {
        title: "Transformer from Scratch on Edge NPU",
        year: 2024,
        description:
            "Implemented a basic transformer architecture, quantized and compiled on Intel NPU",
        detailedDescription: "Built a transformer architecture from scratch with fundamental principles and optimized it for edge deployment. Implemented efficient quantization techniques to enable inference on resource-constrained neural processing units.",
        tags: ["Python", "Edge", "HuggingFace Transformers"],
    },
    {
        title: "Analytic Model of Horizontal Brazil Nut Effect",
        year: 2023,
        description:
            "Developed an analytic model explaining the horizontal Brazil nut effect through void filling mechanisms as part of physics graduation research.",
        detailedDescription: "Created a mathematical model to explain the physical phenomenon where larger particles aggregates to the center in heterogeneous granular materials when shaken horizontally. The research focused on void-filling mechanisms and resulted in a predictive model with experimental validation.",
        tags: ["Physics", "Mathematical Modeling"],
    },
];

export const EXPERIENCE = [
    {
        role: "Research Intern",
        org: "LIST, Seoul National University",
        period: "May 2025 ~ Aug 2025",
        description: "Conducted research on longitudinal MRI reconstruction in the Laboratory for Imaging science & technology. Focused on developing efficient neural network architectures for 3D whole brain processing.",
        icon: "Award",
    },
    {
        role: "Student Member",
        org: "DEEPEST(Research Group)",
        period: "Since 2025",
        description: "Active member of a student-led AI research community focused on deep learning and its applications. Collaborated on projects and participated in knowledge-sharing sessions on cutting-edge AI techniques.",
        icon: "BookOpen",
    },
    {
        role: "STEM National Scholarship",
        org: "Korea Student Aid Foundation",
        period: "Since 2024",
        description: "Recipient of the prestigious National Scholarship for Outstanding STEM Students, awarded based on academic excellence and research potential in science and engineering fields.",
        icon: "GraduationCap",
    },
];
