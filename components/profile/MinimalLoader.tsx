import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Terminal-style boot screen for the minimal profile layout.
 *
 * Everything is themed off the --theme-* vars rather than hardcoded colours, so
 * it inherits whichever palette the profile is using. Copy is derived from the
 * visitor-facing profile data — no invented numbers.
 */

type Props = {
    name: string;
    profession?: string | null;
    isAvailable?: boolean | null;
    projectCount: number;
    techCount: number;
    linkCount: number;
    /** Opaque background class for the overlay, so it matches the active theme
     *  and fully hides the profile underneath. */
    bgClass: string;
    /** How long the boot screen runs, in ms. Owner-configurable in the
     *  dashboard; the caller is responsible for skipping render when it's 0. */
    durationMs?: number;
};

// Not the product default — the boot screen is off unless an owner opts in.
// This is only the duration used if a caller renders without `durationMs`.
const FALLBACK_MS = 2800;
const MIN_MS = 1200;
const MAX_MS = 8000;
const FADE_MS = 520;
const GLYPHS = ["<", ">", "{", "}", "[", "]", "/", "0", "1", ";", "*", "$"];
const BAR_SLOTS = 16;

/** Deterministic PRNG: keeps the glyph field stable across re-renders, and safe
 *  if it is ever server-rendered (Math.random would trip a hydration mismatch). */
function mulberry32(seed: number) {
    return () => {
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/** Shared 0→1 ramp. One rAF loop drives the bar and every counter, so the
 *  glyph field never re-renders. */
function useRamp(active: boolean, duration: number, delay = 0) {
    const [t, setT] = useState(0);
    useEffect(() => {
        if (!active) {
            setT(1);
            return;
        }
        let raf = 0;
        let start: number | null = null;
        const tick = (now: number) => {
            if (start === null) start = now;
            const p = Math.min(1, Math.max(0, (now - start - delay) / duration));
            setT(p);
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [active, duration, delay]);
    return t;
}

/**
 * An index row rather than a dashboard tile: hairline rule, mono label left,
 * zero-padded serif numeral right — echoing how the minimal profile styles its
 * own project list.
 */
const StatRow: React.FC<{ value: number; label: string; t: number; delay: number }> = ({
    value,
    label,
    t,
    delay,
}) => (
    <motion.div
        className="flex items-baseline justify-between gap-6 py-3 border-b"
        style={{ borderColor: "var(--theme-border)" }}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay }}
    >
        <span
            className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "var(--theme-text-secondary)" }}
        >
            {label}
        </span>
        <span
            className="font-serif-display text-2xl md:text-3xl leading-none tabular-nums"
            style={{ color: "var(--theme-text)" }}
        >
            {String(Math.round(value * t)).padStart(2, "0")}
        </span>
    </motion.div>
);

const MinimalLoader: React.FC<Props> = ({
    name,
    profession,
    isAvailable,
    projectCount,
    techCount,
    linkCount,
    bgClass,
    durationMs,
}) => {
    // Rendered on the server so the profile never flashes before the boot
    // screen. The effect below decides whether it actually plays.
    const [visible, setVisible] = useState(true);
    const [animate, setAnimate] = useState(false);
    const dismissed = useRef(false);

    const total = Math.min(MAX_MS, Math.max(MIN_MS, durationMs ?? FALLBACK_MS));

    /**
     * Every delay is a fraction of the total, so a shorter duration compresses
     * the whole sequence instead of leaving the closing line to fire after the
     * overlay has already gone. The fractions reproduce the original hand-tuned
     * timings at the 2800ms default.
     */
    const at = useMemo(
        () => ({
            header: 0.05 * total,
            linesStart: 0.18 * total,
            lineStep: 0.11 * total,
            finalLine: 0.73 * total,
            statsStart: 0.36 * total,
            statStep: 0.043 * total,
            rampDelay: 0.09 * total,
            rampDuration: 0.82 * total,
        }),
        [total]
    );

    const firstName = (name || "").trim().split(/\s+/)[0] || "this developer";

    const lines = useMemo(() => {
        const out = ["Initializing profile..."];
        out.push(
            projectCount > 0
                ? `Loading ${projectCount} project${projectCount === 1 ? "" : "s"}...`
                : "Preparing workspace..."
        );
        if (techCount > 0) {
            out.push(`Mounting ${techCount} technolog${techCount === 1 ? "y" : "ies"}...`);
        }
        out.push(
            isAvailable ? "Status: available for work..." : "Status: heads down, building..."
        );
        return out;
    }, [projectCount, techCount, isAvailable]);

    // Empty counts are dropped rather than shown as "00" — a boot screen
    // announcing zero projects is worse than not mentioning them.
    const stats = useMemo(
        () =>
            [
                { label: "Projects", value: projectCount },
                { label: "Stack", value: techCount },
                { label: "Links", value: linkCount },
            ].filter((s) => s.value > 0),
        [projectCount, techCount, linkCount]
    );

    const dismiss = useCallback(() => {
        if (dismissed.current) return;
        dismissed.current = true;
        setVisible(false);
    }, []);

    useEffect(() => {
        const reduceMotion =
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

        // Once per tab: a repeat visitor should not sit through it again.
        let alreadySeen = false;
        try {
            alreadySeen = sessionStorage.getItem("devbio:minimal-loader") === "1";
            sessionStorage.setItem("devbio:minimal-loader", "1");
        } catch {
            /* private mode — just play it */
        }

        if (reduceMotion || alreadySeen) {
            dismiss();
            return;
        }

        setAnimate(true);
        const timer = setTimeout(dismiss, total);
        return () => clearTimeout(timer);
    }, [dismiss, total]);

    // Hold the page still underneath while the overlay is up.
    useEffect(() => {
        if (!visible) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [visible]);

    useEffect(() => {
        if (!visible) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" || e.key === "Enter" || e.key === " ") dismiss();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [visible, dismiss]);

    const ramp = useRamp(animate, at.rampDuration, at.rampDelay);
    const filled = Math.round(ramp * BAR_SLOTS);

    const columns = useMemo(() => {
        const rand = mulberry32(20260817);
        return Array.from({ length: 18 }, () => ({
            left: `${rand() * 100}%`,
            duration: `${5 + rand() * 4}s`,
            delay: `${rand() * 2.5}s`,
            chars: Array.from({ length: 14 }, () => GLYPHS[Math.floor(rand() * GLYPHS.length)]),
        }));
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    id="minimal-loader"
                    key="minimal-loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: FADE_MS / 1000, ease: "easeInOut" }}
                    className={`fixed inset-0 z-[200] flex items-center justify-center overflow-hidden ${bgClass}`}
                    style={{ "--loader-failsafe": `${total + 2000}ms` } as React.CSSProperties}
                    role="status"
                    aria-live="polite"
                    aria-label="Loading profile"
                >
                    {/* Server-rendered so the profile never flashes first — which
                        means without JS nothing would dismiss it. Hide it there. */}
                    <noscript>
                        <style
                            dangerouslySetInnerHTML={{
                                __html: "#minimal-loader{display:none !important}",
                            }}
                        />
                    </noscript>

                    {/* Depth wash */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(120% 90% at 50% 0%, var(--theme-card-bg) 0%, transparent 60%)",
                        }}
                    />

                    {/* Falling glyph field */}
                    {animate && (
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05]">
                            {columns.map((col, i) => (
                                <div
                                    key={i}
                                    className="absolute top-0 font-mono text-[10px] leading-tight animate-matrix-fall"
                                    style={{
                                        left: col.left,
                                        color: "var(--theme-accent)",
                                        animationDuration: col.duration,
                                        animationDelay: col.delay,
                                    }}
                                >
                                    {col.chars.map((c, j) => (
                                        <div key={j}>{c}</div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={dismiss}
                        className="absolute top-6 right-6 z-10 font-mono text-[10px] uppercase tracking-[0.22em] transition-opacity hover:opacity-100 cursor-pointer"
                        style={{ color: "var(--theme-text-secondary)" }}
                    >
                        Skip &rarr;
                    </button>

                    <div className="relative w-full max-w-xl mx-auto px-6 md:px-8">
                        {/* Identity */}
                        <motion.div
                            className="mb-10"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: at.header / 1000 }}
                        >
                            {profession && (
                                <p
                                    className="font-mono text-[10px] uppercase tracking-[0.24em]"
                                    style={{ color: "var(--theme-accent)" }}
                                >
                                    {profession}
                                </p>
                            )}
                            <p
                                className="font-serif-display text-2xl mt-1"
                                style={{ color: "var(--theme-text)" }}
                            >
                                {name}
                            </p>
                        </motion.div>

                        {/* Terminal */}
                        <div
                            className="rounded border backdrop-blur-sm p-5 md:p-6 font-mono text-[12px] md:text-[13px] leading-relaxed"
                            style={{
                                borderColor: "var(--theme-border)",
                                background: "var(--theme-card-bg)",
                            }}
                        >
                            {lines.map((line, i) => (
                                <motion.div
                                    key={line}
                                    className="mb-1"
                                    style={{ color: "var(--theme-text-secondary)" }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.25, delay: (at.linesStart + i * at.lineStep) / 1000 }}
                                >
                                    <span className="mr-2" style={{ color: "var(--theme-accent)", opacity: 0.7 }}>
                                        &gt;
                                    </span>
                                    {line}
                                </motion.div>
                            ))}
                            <motion.div
                                className="mt-3"
                                style={{ color: "var(--theme-text)" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: at.finalLine / 1000 }}
                            >
                                <span className="mr-2" style={{ color: "var(--theme-accent)" }}>
                                    &gt;
                                </span>
                                Welcome to {firstName}&apos;s portfolio.
                            </motion.div>
                        </div>

                        {/* Progress */}
                        <div className="mt-8">
                            <div
                                className="flex items-center gap-3 font-mono text-[11px]"
                                style={{ color: "var(--theme-text-secondary)" }}
                            >
                                <span
                                    className="tracking-wider shrink-0"
                                    style={{ color: "var(--theme-accent)" }}
                                >
                                    [{"#".repeat(filled)}
                                    {".".repeat(BAR_SLOTS - filled)}]
                                </span>
                                <span className="truncate tabular-nums">
                                    {Math.round(ramp * 100)}%
                                </span>
                            </div>
                            <div
                                className="mt-2 h-px overflow-hidden"
                                style={{ background: "var(--theme-border)" }}
                            >
                                <motion.div
                                    className="h-full"
                                    style={{ background: "var(--theme-accent)" }}
                                    initial={{ width: "0%" }}
                                    animate={{ width: animate ? "100%" : "0%" }}
                                    transition={{ duration: at.rampDuration / 1000, delay: at.rampDelay / 1000, ease: "linear" }}
                                />
                            </div>
                        </div>

                        {/* Index */}
                        {stats.length > 0 && (
                            <div
                                className="mt-10 border-t"
                                style={{ borderColor: "var(--theme-border)" }}
                            >
                                {stats.map((s, i) => (
                                    <StatRow
                                        key={s.label}
                                        value={s.value}
                                        label={s.label}
                                        t={ramp}
                                        delay={(at.statsStart + i * at.statStep) / 1000}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MinimalLoader;
