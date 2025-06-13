# CLI Portfolio Interface

A modern CLI-style portfolio website built with React that mimics a Linux terminal interface. Users can navigate the portfolio using familiar terminal commands.

## 🚀 Features

### Terminal Interface
- **Authentic CLI Experience**: Blinking cursor, command history, and terminal-style interface
- **Multiple Themes**: Matrix (green), Amber, Blue, Purple, and Default themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Command History**: Navigate through previous commands using arrow keys
- **Auto-focus**: Terminal automatically focuses input for seamless typing

### Available Commands

#### Navigation
- `ls` - List directory contents
- `cd <directory>` - Change directory (supports relative and absolute paths)
- `pwd` - Print working directory
- `cd ..` - Go up one directory level

#### File Operations
- `cat <file>` - Display file contents (supports README.md, .txt files)
- `file <path>` - Show file type information

#### Portfolio Features
- `projects` - List all available projects
- `open <project>` - Open detailed project view in modal
- `about` - Display personal information and skills
- `contact` - Show contact information

#### Terminal Commands
- `help` - Show all available commands with examples
- `clear` - Clear terminal output
- `history` - Show command history
- `theme <name>` - Change terminal theme (matrix, amber, blue, purple, default)

#### Navigation
- `skip` - Switch to traditional GUI portfolio
- `exit` - Exit CLI mode with farewell message

## 🗂️ File System Structure

```
/
└── home/
    └── user/
        ├── projects/
        │   ├── tetris-dqn/
        │   │   ├── README.md
        │   │   └── demo.mp4
        │   ├── portfolio-website/
        │   │   └── README.md
        │   └── e-commerce-app/
        │       └── README.md
        ├── about.txt
        ├── resume.pdf
        └── contact.txt
```

## 🎨 Themes

### Available Themes
1. **Matrix** (`theme matrix`) - Classic green-on-black terminal
2. **Amber** (`theme amber`) - Retro amber terminal colors
3. **Blue** (`theme blue`) - Modern blue color scheme
4. **Purple** (`theme purple`) - Purple/violet theme
5. **Default** (`theme default`) - Standard gray terminal

## 🛠️ Architecture

### Component Structure
```
src/
├── components/
│   ├── BlankPage.jsx (Main CLI interface)
│   ├── cli/
│   │   ├── Terminal.jsx (Terminal container)
│   │   ├── CommandLine.jsx (Input handling)
│   │   ├── Output.jsx (Command output display)
│   │   └── commands/
│   │       └── index.js (Command registry)
│   └── modals/
│       └── ProjectModal.jsx (Project details modal)
├── data/
│   ├── filesystem.js (Virtual file system)
│   └── portfolio.js (Portfolio data)
└── hooks/
    ├── useTerminal.js (Terminal state management)
    ├── useCommandHistory.js (Command history)
    └── useFileSystem.js (File system navigation)
```

### Key Features Implementation

#### Virtual File System
- Simulates a real Linux file system structure
- Supports relative and absolute path navigation
- File type detection and content serving

#### Command System
- Modular command architecture
- Easy to extend with new commands
- Type-safe command handling with proper error messages

#### Terminal Experience
- Blinking cursor animation
- Command history with arrow key navigation
- Auto-complete suggestions (extensible)
- Proper terminal styling and behavior

## 🎯 Usage Examples

### Basic Navigation
```bash
$ ls                    # List current directory
$ cd projects          # Navigate to projects
$ ls                   # List projects
$ cd tetris-dqn        # Enter project directory
$ cat README.md        # Read project documentation
$ cd ..                # Go back to projects
$ cd ../..             # Go to home directory
```

### Project Exploration
```bash
$ projects             # List all projects
$ open tetris-dqn      # Open project in detailed modal
$ cd projects/tetris-dqn
$ cat README.md        # Read project details
```

### Information Commands
```bash
$ about                # Personal information
$ contact              # Contact details
$ help                 # All available commands
$ history              # Command history
```

### Customization
```bash
$ theme matrix         # Switch to matrix theme
$ theme amber          # Switch to amber theme
$ clear                # Clear terminal
```

## 🔧 Technical Implementation

### State Management
- React hooks for terminal state
- Custom hooks for file system navigation
- Command history management
- Theme switching

### Performance Optimizations
- Lazy loading of command modules
- Efficient re-rendering with proper React patterns
- Optimized terminal output display

### Accessibility
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- High contrast themes available

## 🚀 Getting Started

The CLI interface is integrated into the BlankPage component. Users can:

1. Navigate to the CLI portfolio page
2. Start typing commands immediately
3. Use `help` to see available commands
4. Explore the virtual file system
5. View project details with `open <project>`
6. Switch themes with `theme <name>`
7. Return to GUI mode with `skip` or `exit`

## 📱 Mobile Support

The CLI interface is fully responsive and works on mobile devices with:
- Touch-friendly interface
- Mobile keyboard support
- Responsive terminal sizing
- Optimized for various screen sizes

This implementation provides a unique and engaging way to showcase a portfolio while demonstrating technical skills in creating interactive command-line interfaces.
