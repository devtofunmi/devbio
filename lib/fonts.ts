import { Outfit, Newsreader, DM_Sans, JetBrains_Mono } from 'next/font/google';

// Fonts are loaded here rather than via @import in globals.css: Tailwind v4
// strips remote `@import url(...)` rules out of the bundle, so the Google Fonts
// import never shipped and every family silently fell back to system sans.
// next/font self-hosts the files and exposes each as a CSS variable, which
// globals.css consumes.

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

/** Font variable classes, for the element wrapping the React tree. */
export const fontVariables = [
    outfit.variable,
    newsreader.variable,
    dmSans.variable,
    jetbrainsMono.variable,
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
    + `}`;
