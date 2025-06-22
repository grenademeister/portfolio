import React from "react";
import {
    GraduationCap,
    BookOpen,
    Zap,
    Brain,
    Bot,
    Network,
    Database,
    Cpu,
    FileCode,
    Code2,
    Laptop2,
    GitBranch,
    Award,
} from "lucide-react";

// Map of icon names to their corresponding Lucide React components
export const iconMap = {
    GraduationCap,
    BookOpen,
    Zap,
    Brain,
    Bot,
    Network,
    Database,
    Cpu,
    FileCode,
    Code2,
    Laptop2,
    GitBranch,
    Award,
};

// Helper function to get an icon component by name
export const getIcon = (iconName, props = {}) => {
    const IconComponent = iconMap[iconName];
    if (!IconComponent) {
        console.warn(`Icon "${iconName}" not found in iconMap`);
        return null;
    }
    return React.createElement(IconComponent, props);
};
