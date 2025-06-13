import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Star, Calendar, Code } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';

const ProjectModal = ({ projectId, isOpen, onClose }) => {
    if (!projectId || !isOpen) return null;

    const project = portfolioData.projects[projectId];
    if (!project) return null;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-500';
            case 'In Progress':
                return 'bg-yellow-500';
            case 'Planned':
                return 'bg-blue-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'AI/ML':
                return 'bg-purple-500';
            case 'Frontend':
                return 'bg-blue-500';
            case 'Full-Stack':
                return 'bg-green-500';
            case 'Backend':
                return 'bg-orange-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {project.title}
                            </h2>
                            <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                                    {project.status}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(project.category)}`}>
                                    {project.category}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                        <div className="space-y-6">
                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                    Description
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            {/* Technologies */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                                    <Code className="w-5 h-5 mr-2" />
                                    Technologies
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            {project.features && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                                        <Star className="w-5 h-5 mr-2" />
                                        Key Features
                                    </h3>
                                    <ul className="space-y-2">
                                        {project.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                                <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Performance (for AI projects) */}
                            {project.performance && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                        Performance
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                        {project.performance}
                                    </p>
                                </div>
                            )}

                            {/* Architecture (for full-stack projects) */}
                            {project.architecture && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                        Architecture
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {Object.entries(project.architecture).map(([key, value]) => (
                                            <div key={key} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                                <h4 className="font-medium text-gray-900 dark:text-white capitalize mb-2">
                                                    {key}
                                                </h4>
                                                <p className="text-gray-600 dark:text-gray-300 text-sm">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Commands (for CLI projects) */}
                            {project.commands && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                        Available Commands
                                    </h3>
                                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm space-y-1">
                                        {project.commands.map((command, index) => (
                                            <div key={index}>{command}</div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {project.status}
                            </span>
                        </div>
                        <div className="flex items-center space-x-3">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
                                >
                                    <Github className="w-4 h-4 mr-2" />
                                    Code
                                </a>
                            )}
                            {project.demoUrl && (
                                <a
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectModal;
