import {
    Outfit,
    Newsreader,
    DM_Sans,
    JetBrains_Mono,
    Space_Grotesk,
    Sora,
    Instrument_Serif,
    Fraunces,
    Plus_Jakarta_Sans,
} from 'next/font/google';

// Fonts are loaded here rather than via @import in globals.css: Tailwind v4
// strips remote `@import url(...)` rules out of the bundle, so the Google Fonts
// import never shipped and every family silently fell back to system sans.
// next/font self-hosts the files and exposes each as a CSS variable, which
// globals.css consumes.
//
// The four app faces below preload. The owner-selectable profile faces further
// down set `preload: false` on purpose: they are declared for every page but a
// browser only fetches a webfont once something actually renders in it, so a
// visitor to a profile using Outfit never downloads Fraunces.

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-outfit',
    display: 'swap',
});

// Serif display face: minimal layout headings and the public profile
// (`.font-serif-display` / `.font-profile` in globals.css).
const newsreader = Newsreader({
    subsets: ['latin'],
    style: ['normal', 'italic'],
    variable: '--font-newsreader',
    display: 'swap',
});

const dmSans = DM_Sans({
    subsets: ['latin'],
    variable: '--font-dm-sans',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
    display: 'swap',
});

// ---------------------------------------------------------------------------
// Owner-selectable profile faces. See lib/profileFonts.ts for the presets.
// ---------------------------------------------------------------------------

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
    display: 'swap',
    preload: false,
});

const sora = Sora({
    subsets: ['latin'],
    variable: '--font-sora',
    display: 'swap',
    preload: false,
});

// Single weight (400) by design — it is a display face. Heading weights are
// pinned in globals.css and font-synthesis is off, so 500 resolves to 400
// without faux-bolding.
const instrumentSerif = Instrument_Serif({
    subsets: ['latin'],
    weight: ['400'],
    style: ['normal', 'italic'],
    variable: '--font-instrument-serif',
    display: 'swap',
    preload: false,
});

const fraunces = Fraunces({
    subsets: ['latin'],
    variable: '--font-fraunces',
    display: 'swap',
    preload: false,
});

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-plus-jakarta',
    display: 'swap',
    preload: false,
});

/** Font variable classes, for the element wrapping the React tree. */
export const fontVariables = [
    outfit.variable,
    newsreader.variable,
    dmSans.variable,
    jetbrainsMono.variable,
    spaceGrotesk.variable,
    sora.variable,
    instrumentSerif.variable,
    fraunces.variable,
    plusJakarta.variable,
].join(' ');

/**
 * The same variables declared on :root. next/font only puts them on whatever
 * element carries the generated class, which would leave anything portalled to
 * document.body (modals, confetti) on the system font. Emitted as a <style> in
 * _app so it lands server-side, with no flash of fallback text.
 */
export const rootFontStyles = `:root{`
    + `--font-outfit:${outfit.style.fontFamily};`
    + `--font-newsreader:${newsreader.style.fontFamily};`
    + `--font-dm-sans:${dmSans.style.fontFamily};`
    + `--font-jetbrains-mono:${jetbrainsMono.style.fontFamily};`
    + `--font-space-grotesk:${spaceGrotesk.style.fontFamily};`
    + `--font-sora:${sora.style.fontFamily};`
    + `--font-instrument-serif:${instrumentSerif.style.fontFamily};`
    + `--font-fraunces:${fraunces.style.fontFamily};`
    + `--font-plus-jakarta:${plusJakarta.style.fontFamily};`
    + `}`;
