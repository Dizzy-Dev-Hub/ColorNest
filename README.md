# 🎨 ColorNest

**Automatically applies a unique random color to each VS Code window for easy identification.**

![Demo](images/demo.gif)

## Features

- 🎲 **Automatic coloring** — Each VS Code window gets a unique color on open
- 🎨 **Curated palette** — 12 hand-picked, dark-theme-friendly colors
- ✨ **Subtle variations** — Title Bar, Status Bar, and Activity Bar get coordinated but distinct shades
- 🔄 **Shuffle command** — Don't like the color? Shuffle to a new one!
- 🔁 **Uniqueness guaranteed** — Even if the same palette color is picked, slight variations ensure no two windows look identical
- 🌍 **Cross-platform** — Works on Windows, Mac, and Linux

## Why Use This?

When you have multiple VS Code windows open, they all look the same. This makes it hard to quickly identify which project or folder you're working in. **ColorNest** solves this by giving each window a unique color identity — no manual setup required.

## Commands

| Command                           | Description                                    |
| --------------------------------- | ---------------------------------------------- |
| `Window Colors: Shuffle Color`    | Apply a new random color to the current window |
| `Window Colors: Reset to Default` | Remove Window Colors customizations            |

Access via Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).

## Color Palette

The extension uses 12 carefully selected colors that work beautifully with dark themes:

| Color           | Preview   |
| --------------- | --------- |
| Deep Teal       | `#1A535C` |
| Rich Purple     | `#4A3F6B` |
| Forest Green    | `#2D5A27` |
| Ocean Blue      | `#1E3A5F` |
| Warm Rust       | `#6B3A3A` |
| Midnight Indigo | `#2E2A4A` |
| Dark Cyan       | `#0E4D5C` |
| Slate Brown     | `#4A3C2A` |
| Deep Magenta    | `#5C2A4A` |
| Olive Drab      | `#4A5C2A` |
| Steel Blue      | `#2A4A5C` |
| Burgundy        | `#5C2A2A` |

## How It Works

1. When VS Code opens, the extension automatically activates
2. A random color is selected from the curated palette
3. A slight random variation is applied to ensure uniqueness
4. The color is applied to:
   - **Title Bar** (slightly lighter)
   - **Activity Bar** (base color)
   - **Status Bar** (slightly darker)
5. The setting is stored in your workspace, so reopening shows a fresh color

## Installation

### From VS Code Marketplace

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "ColorNest"
4. Click Install

### From VSIX File

1. Download the `.vsix` file
2. Open VS Code
3. Go to Extensions
4. Click the `...` menu → "Install from VSIX..."
5. Select the downloaded file

## Requirements

- VS Code 1.74.0 or higher
- Works with any color theme (optimized for dark themes)

## Known Issues

- Colors are applied to workspace settings, so "unsaved" workspaces (opening a folder) may prompt to save settings
- First window after installation may need a reload to apply color

## Release Notes

### 1.0.0

- Initial release
- 12-color curated palette
- Automatic coloring on window open
- Shuffle and Reset commands
- Cross-platform support

## Contributing

Found a bug or have a feature idea? [Open an issue](https://github.com/Dizzy-Dev-Hub/ColorNest/issues)!

## License

MIT License — see [LICENSE](LICENSE) for details.

---

**Enjoy! 🎨**
