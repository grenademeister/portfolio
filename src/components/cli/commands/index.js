import { getCurrentDirectory, listDirectory, getFileContent } from '../../../data/filesystem';
import { portfolioData } from '../../../data/portfolio';

// Available commands
const commands = {
    help: () => ({
        output: `Available commands:

Navigation:
  ls                    List directory contents
  cd <directory>        Change directory
  pwd                   Print working directory
  
File Operations:
  cat <file>           Display file contents
  file <path>          Show file type information
  
Portfolio:
  open <project>       Open project in detailed view
  projects             List all projects
  about                Show about information
  contact              Show contact information
  
Fun Stuff:
  ascii                Show ASCII art banner
  neofetch             Display system information
  
Terminal:
  clear                Clear terminal
  history              Show command history
  theme <name>         Change terminal theme
  
Navigation:
  skip                 Switch to GUI portfolio
  exit                 Exit CLI mode

Examples:
  cd projects          Navigate to projects directory
  ls                   List current directory
  cat about.txt        Read about file
  open rainbow-dqn-tetris  Open project details
  ascii                Show cool ASCII art
  neofetch             System info display
  theme matrix         Change to matrix theme`,
        type: 'output'
    }),

    ls: (args, fileSystem) => {
        const items = fileSystem.listCurrentDirectory();
        if (items.length === 0) {
            return { output: 'Directory is empty', type: 'output' };
        }

        const formatted = items.map(item => {
            const icon = item.type === 'directory' ? '📁' : '📄';
            const name = item.type === 'directory' ? `${item.name}/` : item.name;
            return `${icon} ${name}`;
        }).join('\n');

        return { output: formatted, type: 'output' };
    },

    cd: (args, fileSystem) => {
        const target = args[0] || '~';
        const result = fileSystem.changeDirectory(target);

        if (result.success) {
            return { output: '', type: 'output' };
        } else {
            return { output: result.error, type: 'error' };
        }
    },

    pwd: (args, fileSystem) => ({
        output: fileSystem.currentPath,
        type: 'output'
    }),

    cat: (args, fileSystem) => {
        if (!args[0]) {
            return { output: 'cat: missing file operand', type: 'error' };
        }

        const filePath = fileSystem.getAbsolutePath(args[0]);
        const content = getFileContent(filePath);

        if (content === null) {
            return { output: `cat: ${args[0]}: No such file or directory`, type: 'error' };
        }

        return { output: content, type: 'file' };
    },

    file: (args, fileSystem) => {
        if (!args[0]) {
            return { output: 'file: missing file operand', type: 'error' };
        }

        const filePath = fileSystem.getAbsolutePath(args[0]);
        const item = getCurrentDirectory(filePath);

        if (!item) {
            return { output: `file: ${args[0]}: No such file or directory`, type: 'error' };
        }

        const typeInfo = item.type === 'directory' ? 'directory' : 'regular file';
        return { output: `${args[0]}: ${typeInfo}`, type: 'output' };
    },

    open: (args) => {
        if (!args[0]) {
            return { output: 'open: missing project name', type: 'error' };
        }

        const projectName = args[0];
        const project = portfolioData.projects[projectName];

        if (!project) {
            const availableProjects = Object.keys(portfolioData.projects).join(', ');
            return {
                output: `Project "${projectName}" not found. Available projects: ${availableProjects}`,
                type: 'error'
            };
        }

        return {
            output: `Opening ${project.title}...`,
            type: 'output',
            action: () => {
                // This will be handled by the parent component to open a modal
                window.dispatchEvent(new CustomEvent('openProject', { detail: projectName }));
            }
        };
    },

    projects: () => {
        const projectList = Object.entries(portfolioData.projects)
            .map(([key, project]) => `📦 ${key} - ${project.title}`)
            .join('\n');

        return {
            output: `Available Projects:\n${projectList}\n\nUse "open <project-name>" to view details`,
            type: 'output'
        };
    },

    about: () => {
        const profile = portfolioData.profile;
        const skillsList = Object.entries(profile.skills)
            .map(([category, skills]) => `  ${category}: ${skills.join(', ')}`)
            .join('\n');

        return {
            output: `${profile.name}
${profile.tagline}

Skills:
${skillsList}

Experience: ${profile.experience}

Achievements:
${profile.achievements.map(achievement => `• ${achievement}`).join('\n')}`,
            type: 'output'
        };
    },

    contact: () => {
        const contact = portfolioData.profile.contact;
        return {
            output: `Contact Information:

📧 Email: ${contact.email}
🐙 GitHub: ${contact.github}
💼 LinkedIn: ${contact.linkedin}
📍 Location: ${contact.location}

Feel free to reach out for opportunities or collaborations!`,
            type: 'output'
        };
    },

    clear: () => ({
        output: '',
        type: 'clear'
    }),

    history: (args, fileSystem, terminalHistory) => {
        if (!terminalHistory || terminalHistory.length === 0) {
            return { output: 'No commands in history', type: 'output' };
        }

        const historyList = terminalHistory
            .map((cmd, index) => `${index + 1}: ${cmd}`)
            .join('\n');

        return { output: historyList, type: 'output' };
    },

    theme: (args) => {
        const themeName = args[0];
        const availableThemes = ['default', 'matrix', 'amber', 'blue', 'purple'];

        if (!themeName) {
            return {
                output: `Available themes: ${availableThemes.join(', ')}\nUsage: theme <theme-name>`,
                type: 'output'
            };
        }

        if (!availableThemes.includes(themeName)) {
            return {
                output: `Theme "${themeName}" not found. Available themes: ${availableThemes.join(', ')}`,
                type: 'error'
            };
        }

        return {
            output: `Switching to ${themeName} theme...`,
            type: 'output',
            action: () => {
                window.dispatchEvent(new CustomEvent('changeTheme', { detail: themeName }));
            }
        };
    },

    skip: () => ({
        output: 'Switching to GUI portfolio...',
        type: 'output',
        action: () => {
            window.dispatchEvent(new CustomEvent('skipToGUI'));
        }
    }),

    exit: () => ({
        output: 'Goodbye! 👋',
        type: 'output',
        action: () => {
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('skipToGUI'));
            }, 1000);
        }
    }), ascii: () => {
        // Detect if mobile/small screen
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            return {
                output: `
╔═══════════════════════════════╗
║        HYEOKGI KIM            ║
║   ECE Student & AI Engineer   ║
║                               ║
║  🎓 Seoul National University ║
║  🤖 RL • DL • Hardware AI     ║
╚═══════════════════════════════╝

Welcome to my portfolio!`,
                type: 'output'
            };
        } else {
            return {
                output: `
 ██   ██ ██    ██ ███████  ██████  ██   ██  ██████  ██ 
 ██   ██  ██  ██  ██      ██    ██ ██  ██  ██       ██ 
 ███████   ████   █████   ██    ██ █████   ██   ███ ██ 
 ██   ██    ██    ██      ██    ██ ██  ██  ██    ██ ██ 
 ██   ██    ██    ███████  ██████  ██   ██  ██████  ██ 
                                                       
          ██   ██ ██ ███    ███                        
          ██  ██  ██ ████  ████                        
          █████   ██ ██ ████ ██                        
          ██  ██  ██ ██  ██  ██                        
          ██   ██ ██ ██      ██                        

    🎓 ECE Undergraduate & AI Engineer 🤖
    Seoul National University
    Reinforcement Learning • Deep Learning • Hardware AI`,
                type: 'output'
            };
        }
    }, neofetch: () => {
        const profile = portfolioData.profile;

        // Calculate uptime since birth (2005/9/5, 10:27:00 PM)
        const birthDate = new Date(2005, 8, 5, 22, 27, 0); // Month is 0-indexed, so 8 = September
        const now = new Date();
        const uptimeMs = now - birthDate;

        // Convert to human-readable format
        const years = Math.floor(uptimeMs / (1000 * 60 * 60 * 24 * 365.25));
        const days = Math.floor((uptimeMs % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((uptimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((uptimeMs % (1000 * 60 * 60)) / (1000 * 60));

        const uptimeString = `${years} years, ${days} days, ${hours} hours, ${minutes} mins`;

        return {
            output: `                   -\`                 ${profile.name}@portfolio
                  .o+\`                 ----------------
                 \`ooo/                 OS: btwOS
                \`+oooo:                Model: Homo sapiens [patched]
               \`+oooooo:               Kernel: coffee-patched
               -+oooooo+:              Uptime: ${uptimeString}
             \`/:-:++oooo+:             Packages: too many to track
            \`/++++/+++++++:            Shell: portfolio-sh
           \`/++++++++++++++:           DE: CLI
          \`/+++ooooooooo/+++/          
         ./ooosssso++osssssso+\`        Theme: Matrix [CLI]
        .oossssso-\`\`\`\`/ossssss+\`       Icons: Lucide React
       -osssssso.      :ssssssso.      Used: React, Tailwind CSS
      :osssssss/        osssso+++.     Contact: ${profile.contact.email}
     /ossssssss/        +ssssooo/-     
   \`/ossssso+/:-        -:/+osssso+-   
  \`+sso+:-\`                 \`.-/+oso:  
 \`++:.                           \`-/+/ 
 .\`                                 \`/
`,
            type: 'output'
        };
    }
};

export const executeCommand = async (input, fileSystem, terminalHistory) => {
    const [command, ...args] = input.trim().split(/\s+/);
    const cmd = command.toLowerCase();

    if (commands[cmd]) {
        return commands[cmd](args, fileSystem, terminalHistory);
    } else {
        return {
            output: `Command not found: ${command}. Type "help" for available commands.`,
            type: 'error'
        };
    }
};

export const getCommandSuggestions = (input) => {
    const commandNames = Object.keys(commands);
    return commandNames.filter(cmd => cmd.startsWith(input.toLowerCase()));
};
