import { useState, useCallback } from 'react';
import { getCurrentDirectory, listDirectory } from '../data/filesystem';

export const useFileSystem = () => {
    const [currentPath, setCurrentPath] = useState('/home/user');

    const changeDirectory = useCallback((path) => {
        let newPath;

        if (path === '..') {
            // Go up one directory
            const pathParts = currentPath.split('/').filter(part => part !== '');
            pathParts.pop();
            newPath = pathParts.length > 0 ? '/' + pathParts.join('/') : '/';
        } else if (path.startsWith('/')) {
            // Absolute path
            newPath = path;
        } else {
            // Relative path
            newPath = currentPath === '/' ? `/${path}` : `${currentPath}/${path}`;
        }

        // Normalize path (remove double slashes, etc.)
        newPath = newPath.replace(/\/+/g, '/').replace(/\/$/, '') || '/';

        // Check if directory exists
        const dir = getCurrentDirectory(newPath);
        if (dir && dir.type === 'directory') {
            setCurrentPath(newPath);
            return { success: true, path: newPath };
        } else {
            return { success: false, error: `cd: ${path}: No such file or directory` };
        }
    }, [currentPath]);

    const listCurrentDirectory = useCallback(() => {
        return listDirectory(currentPath);
    }, [currentPath]);

    const getAbsolutePath = useCallback((relativePath) => {
        if (relativePath.startsWith('/')) {
            return relativePath;
        }
        return currentPath === '/' ? `/${relativePath}` : `${currentPath}/${relativePath}`;
    }, [currentPath]);

    const getCurrentDirectoryName = useCallback(() => {
        if (currentPath === '/') return '/';
        const parts = currentPath.split('/').filter(part => part !== '');
        return parts[parts.length - 1] || '/';
    }, [currentPath]);

    const getPromptPath = useCallback(() => {
        if (currentPath === '/') return '/';
        if (currentPath === '/home/user') return '~';
        if (currentPath.startsWith('/home/user/')) {
            return '~' + currentPath.substring('/home/user'.length);
        }
        return currentPath;
    }, [currentPath]);

    return {
        currentPath,
        changeDirectory,
        listCurrentDirectory,
        getAbsolutePath,
        getCurrentDirectoryName,
        getPromptPath
    };
};
