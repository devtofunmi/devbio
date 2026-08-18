// Owner-selectable typography for public profiles.
//
// Each preset is a pairing rather than a single family: a display face for
// headings and a body face for running text. Several presets use one family for
// both, but the serif display faces are paired with a neutral sans, because
// Instrument Serif or Fraunces set at 14px for a whole bio reads badly.
//
// `display` / `body` are complete font-family stacks, substituted straight into
// CSS custom properties by pages/[profile].tsx. The families themselves are
// loaded in lib/fonts.ts.

export type ProfileFont = {
    id: string;
    /** Shown in the dashboard picker. */
    name: string;
    /** One-line character note. */
    description: string;
    /** Heading stack. */
    display: string;
    /** Body stack. */
    body: string;
    /** Which var to preview the name in, so each option renders in its own face. */
    previewVar: string;
};

export const PROFILE_FONTS: ProfileFont[] = [
    {
        id: 'editorial',
        name: 'Editorial',
        description: 'Newsreader headings, DM Sans body',
        display: 'var(--font-newsreader), Georgia, ui-serif, serif',
        body: 'var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif',
        previewVar: '--font-newsreader',
    },
    {
        id: 'instrument',
        name: 'Instrument',
        description: 'High-contrast display serif, sans body',
        display: 'var(--font-instrument-serif), Georgia, ui-serif, serif',
        body: 'var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif',
        previewVar: '--font-instrument-serif',
    },
    {
        id: 'fraunces',
        name: 'Fraunces',
        description: 'Soft, characterful serif with a sans body',
        display: 'var(--font-fraunces), Georgia, ui-serif, serif',
        body: 'var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif',
        previewVar: '--font-fraunces',
    },
    {
        id: 'grotesk',
        name: 'Space Grotesk',
        description: 'Geometric and a little technical',
        display: 'var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif',
        body: 'var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif',
        previewVar: '--font-space-grotesk',
    },
    {
        id: 'sora',
        name: 'Sora',
        description: 'Clean, wide, slightly futuristic',
        display: 'var(--font-sora), ui-sans-serif, system-ui, sans-serif',
        body: 'var(--font-sora), ui-sans-serif, system-ui, sans-serif',
        previewVar: '--font-sora',
    },
    {
        id: 'jakarta',
        name: 'Jakarta',
        description: 'Neutral modern sans, quietly gets out of the way',
        display: 'var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif',
        body: 'var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif',
        previewVar: '--font-plus-jakarta',
    },
    {
        id: 'outfit',
        name: 'Outfit',
        description: 'Rounded geometric sans, the DevBio house face',
        display: 'var(--font-outfit), ui-sans-serif, system-ui, sans-serif',
        body: 'var(--font-outfit), ui-sans-serif, system-ui, sans-serif',
        previewVar: '--font-outfit',
    },
    {
        id: 'mono',
        name: 'Mono',
        description: 'JetBrains Mono throughout, unmistakably a developer',
        display: 'var(--font-jetbrains-mono), ui-monospace, monospace',
        body: 'var(--font-jetbrains-mono), ui-monospace, monospace',
        previewVar: '--font-jetbrains-mono',
    },
];

/** Preset used when a profile has not chosen one — the pre-existing look. */
export const DEFAULT_PROFILE_FONT = 'editorial';

export const getProfileFont = (id?: string | null): ProfileFont =>
    PROFILE_FONTS.find((f) => f.id === id) ??
    PROFILE_FONTS.find((f) => f.id === DEFAULT_PROFILE_FONT)!;
