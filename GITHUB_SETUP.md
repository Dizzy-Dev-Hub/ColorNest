# Publishing ColorNest to GitHub

This guide will help you publish your ColorNest extension to GitHub.

## Prerequisites

- Git installed on your computer
- A GitHub account (Dizzy-Dev-Hub)
- Your extension ready in: `c:\Users\tmadmin\Desktop\colorful extention`

## Step 1: Initialize Git Repository

Open a terminal in your extension folder and run:

```bash
cd "c:\Users\tmadmin\Desktop\colorful extention"
git init
```

## Step 2: Create Repository on GitHub

1. Go to [GitHub](https://github.com/Dizzy-Dev-Hub)
2. Click the **+** icon (top right) → **New repository**
3. Repository name: `ColorNest`
4. Description: `Automatically applies a unique random color to each VS Code window for easy identification`
5. Choose **Public** (or Private if you prefer)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **Create repository**

## Step 3: Add and Commit Files

```bash
git add .
git commit -m "Initial commit - ColorNest v1.0.0"
```

## Step 4: Link to GitHub

Replace `Dizzy-Dev-Hub` with your actual GitHub username if different:

```bash
git remote add origin https://github.com/Dizzy-Dev-Hub/ColorNest.git
git branch -M main
git push -u origin main
```

## Step 5: Verify

Visit `https://github.com/Dizzy-Dev-Hub/ColorNest` to see your repository!

## Optional: Add Topics/Tags

On your GitHub repository page:

1. Click the ⚙️ gear icon next to "About"
2. Add topics: `vscode-extension`, `color-theme`, `productivity`, `vscode`, `typescript`
3. Save changes

## Next Steps

### Publishing to VS Code Marketplace

Once you're ready to publish to the VS Code Marketplace:

1. **Get a Personal Access Token** from [Azure DevOps](https://dev.azure.com)
2. **Install vsce**: `npm install -g @vscode/vsce`
3. **Package**: `vsce package`
4. **Publish**: `vsce publish`

See the [official guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) for detailed instructions.

### Creating Releases

When you make updates:

1. Update `CHANGELOG.md`
2. Update version in `package.json`
3. Commit changes
4. Create a GitHub release with a tag (e.g., `v1.0.0`)

---

**Your extension is now GitHub-ready! 🎉**
