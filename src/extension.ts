import * as vscode from "vscode";

// =============================================================================
// 🎨 CURATED COLOR PALETTE
// These colors are hand-picked to be dark-theme friendly and visually distinct
// =============================================================================

interface PaletteColor {
  name: string;
  hex: string;
}

const COLOR_PALETTE: PaletteColor[] = [
  { name: "Deep Teal", hex: "#1A535C" },
  { name: "Rich Purple", hex: "#4A3F6B" },
  { name: "Forest Green", hex: "#2D5A27" },
  { name: "Ocean Blue", hex: "#1E3A5F" },
  { name: "Warm Rust", hex: "#6B3A3A" },
  { name: "Midnight Indigo", hex: "#2E2A4A" },
  { name: "Dark Cyan", hex: "#0E4D5C" },
  { name: "Slate Brown", hex: "#4A3C2A" },
  { name: "Deep Magenta", hex: "#5C2A4A" },
  { name: "Olive Drab", hex: "#4A5C2A" },
  { name: "Steel Blue", hex: "#2A4A5C" },
  { name: "Burgundy", hex: "#5C2A2A" },
];

// =============================================================================
// 🔧 COLOR UTILITY FUNCTIONS
// =============================================================================

/**
 * Converts hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return { r: 0, g: 0, b: 0 };
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Converts RGB values to hex color
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    return clamped.toString(16).padStart(2, "0");
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Adjusts color brightness
 * @param hex - The hex color
 * @param percent - Positive = lighter, negative = darker
 */
function adjustBrightness(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  const adjust = (value: number) => {
    if (percent > 0) {
      // Lighten: move toward 255
      return value + (255 - value) * (percent / 100);
    } else {
      // Darken: move toward 0
      return value * (1 + percent / 100);
    }
  };
  return rgbToHex(adjust(rgb.r), adjust(rgb.g), adjust(rgb.b));
}

/**
 * Applies a slight random variation to a color for uniqueness
 * This ensures even if the same palette color is picked, it looks slightly different
 */
function applyVariation(hex: string, seed?: number): string {
  const rgb = hexToRgb(hex);

  // Use seed or current time for randomness
  const random = seed ?? Date.now();

  // Small variations: -10 to +10 on each channel
  const variation = (channel: number, offset: number) => {
    const delta = (offset % 21) - 10; // -10 to +10
    return Math.max(0, Math.min(255, channel + delta));
  };

  return rgbToHex(
    variation(rgb.r, (random * 7) % 100),
    variation(rgb.g, (random * 13) % 100),
    variation(rgb.b, (random * 19) % 100),
  );
}

// =============================================================================
// 🎯 MAIN EXTENSION LOGIC
// =============================================================================

/**
 * Generates a unique color set for the current window
 */
function generateColorSet(): {
  base: string;
  titleBarActive: string;
  titleBarInactive: string;
  statusBar: string;
  activityBar: string;
  colorName: string;
} {
  // Pick a random color from the palette
  const randomIndex = Math.floor(Math.random() * COLOR_PALETTE.length);
  const paletteColor = COLOR_PALETTE[randomIndex];

  // Apply slight variation for uniqueness across windows
  const seed = Date.now() + Math.random() * 10000;
  const baseColor = applyVariation(paletteColor.hex, seed);

  // Create variations for different UI elements
  return {
    base: baseColor,
    titleBarActive: adjustBrightness(baseColor, 15), // Slightly lighter
    titleBarInactive: adjustBrightness(baseColor, -20), // Darker when inactive
    statusBar: adjustBrightness(baseColor, -10), // Slightly darker
    activityBar: baseColor, // Base color
    colorName: paletteColor.name,
  };
}

/**
 * Applies the color set to VS Code's workspace settings
 */
async function applyColors(
  colorSet: ReturnType<typeof generateColorSet>,
): Promise<void> {
  const config = vscode.workspace.getConfiguration("workbench");

  const colorCustomizations: Record<string, string> = {
    // Title Bar
    "titleBar.activeBackground": colorSet.titleBarActive,
    "titleBar.activeForeground": "#FFFFFF",
    "titleBar.inactiveBackground": colorSet.titleBarInactive,
    "titleBar.inactiveForeground": "#CCCCCC",

    // Activity Bar (left sidebar icons)
    "activityBar.background": colorSet.activityBar,
    "activityBar.foreground": "#FFFFFF",
    "activityBar.inactiveForeground": "rgba(255, 255, 255, 0.6)",
    "activityBarBadge.background": adjustBrightness(colorSet.activityBar, 40),
    "activityBarBadge.foreground": "#FFFFFF",

    // Status Bar (bottom)
    "statusBar.background": colorSet.statusBar,
    "statusBar.foreground": "#FFFFFF",
    "statusBar.debuggingBackground": adjustBrightness(colorSet.statusBar, 20),
    "statusBar.debuggingForeground": "#FFFFFF",
    "statusBar.noFolderBackground": adjustBrightness(colorSet.statusBar, -15),
    "statusBar.noFolderForeground": "#FFFFFF",
  };

  // Get existing customizations and merge
  const existing =
    config.get<Record<string, string>>("colorCustomizations") || {};
  const merged = { ...existing, ...colorCustomizations };

  // Apply to workspace settings (not global, so each window can be different)
  await config.update(
    "colorCustomizations",
    merged,
    vscode.ConfigurationTarget.Workspace,
  );
}

/**
 * Resets colors to default (removes our customizations)
 */
async function resetColors(): Promise<void> {
  const config = vscode.workspace.getConfiguration("workbench");
  const existing =
    config.get<Record<string, string>>("colorCustomizations") || {};

  // Keys we manage
  const ourKeys = [
    "titleBar.activeBackground",
    "titleBar.activeForeground",
    "titleBar.inactiveBackground",
    "titleBar.inactiveForeground",
    "activityBar.background",
    "activityBar.foreground",
    "activityBar.inactiveForeground",
    "activityBarBadge.background",
    "activityBarBadge.foreground",
    "statusBar.background",
    "statusBar.foreground",
    "statusBar.debuggingBackground",
    "statusBar.debuggingForeground",
    "statusBar.noFolderBackground",
    "statusBar.noFolderForeground",
  ];

  // Remove our keys
  const cleaned: Record<string, string> = {};
  for (const [key, value] of Object.entries(existing)) {
    if (!ourKeys.includes(key)) {
      cleaned[key] = value;
    }
  }

  // Apply cleaned settings
  if (Object.keys(cleaned).length === 0) {
    await config.update(
      "colorCustomizations",
      undefined,
      vscode.ConfigurationTarget.Workspace,
    );
  } else {
    await config.update(
      "colorCustomizations",
      cleaned,
      vscode.ConfigurationTarget.Workspace,
    );
  }
}

/**
 * Shuffles to a new random color
 */
async function shuffleColor(): Promise<void> {
  const colorSet = generateColorSet();
  await applyColors(colorSet);
  vscode.window.showInformationMessage(
    `🎨 Window Colors: Applied "${colorSet.colorName}"`,
  );
}

// =============================================================================
// 🚀 EXTENSION ACTIVATION
// =============================================================================

export function activate(context: vscode.ExtensionContext): void {
  console.log("Window Colors extension is now active!");

  // ALWAYS apply a fresh color on window activation
  // This ensures each window gets a unique color, even if opening the same workspace
  // The random seed (Date.now() + Math.random()) guarantees uniqueness
  const colorSet = generateColorSet();
  applyColors(colorSet).then(() => {
    console.log(
      `Window Colors: Applied "${colorSet.colorName}" (${colorSet.base})`,
    );
  });

  // Register commands
  const shuffleCommand = vscode.commands.registerCommand(
    "windowColors.shuffle",
    async () => {
      await shuffleColor();
    },
  );

  const resetCommand = vscode.commands.registerCommand(
    "windowColors.reset",
    async () => {
      await resetColors();
      vscode.window.showInformationMessage(
        "🎨 Window Colors: Reset to defaults",
      );
    },
  );

  context.subscriptions.push(shuffleCommand, resetCommand);
}

export function deactivate(): void {
  console.log("Window Colors extension deactivated");
}
