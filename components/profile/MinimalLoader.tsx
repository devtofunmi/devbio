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
    /** ?loader=hold — play the sequence then stay up instead of dismissing, so
     *  the finished state can be inspected. Skip still works. */
    hold?: boolean;
};

const TOTAL_MS = 2800;
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

const StatCell: React.FC<{ value: number | null; label: string; t: number }> = ({ value, label, t }) => (
    <div className="border px-4 py-3" style={{ borderColor: "var(--theme-border)", background: "var(--theme-card-bg)" }}>
        <div
            className="font-serif-display text-2xl md:text-3xl tabular-nums"
            style={{ color: "var(--theme-text)" }}
        >
            {value === null ? (
                <span style={{ color: "var(--theme-accent)" }}>∞</span>
            ) : (
                Math.round(value * t)
            )}
        </div>
        <p
            className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em]"
            style={{ color: "var(--theme-text-secondary)" }}
        >
            {label}
        </p>
    </div>
);

const MinimalLoader: React.FC<Props> = ({
    name,
    profession,
    isAvailable,
    projectCount,
    techCount,
    linkCount,
    bgClass,
    hold = false,
}) => {
    // Rendered on the server so the profile never flashes before the boot
    // screen. The effect below decides whether it actually plays.
    const [visible, setVisible] = useState(true);
    const [animate, setAnimate] = useState(false);
    const dismissed = useRef(false);

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

    const dismiss = useCallback(() => {
        if (dismissed.current) return;
        dismissed.current = true;
        setVisible(false);
    }, []);

    useEffect(() => {
        // Inspection mode: always play, never time out, and don't burn the
        // once-per-tab flag so normal visits still get the full thing.
        if (hold) {
            setAnimate(true);
            return;
        }

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
        const timer = setTimeout(dismiss, TOTAL_MS);
        return () => clearTimeout(timer);
    }, [dismiss, hold]);

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

    const ramp = useRamp(animate, TOTAL_MS - 500, 260);
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
                    {...(hold ? { "data-hold": "true" } : {})}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: FADE_MS / 1000, ease: "easeInOut" }}
                    className={`fixed inset-0 z-[200] flex items-center justify-center overflow-hidden ${bgClass}`}
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

                    <div className="absolute top-6 right-6 z-10 flex items-center gap-4">
                        {hold && (
                            <span
                                className="font-mono text-[10px] uppercase tracking-[0.22em] border px-2 py-1"
                                style={{
                                    color: "var(--theme-accent)",
                                    borderColor: "var(--theme-border)",
                                }}
                            >
                                Hold
                            </span>
                        )}
                        <button
                            type="button"
                            onClick={dismiss}
                            className="font-mono text-[10px] uppercase tracking-[0.22em] transition-opacity hover:opacity-100 cursor-pointer"
                            style={{ color: "var(--theme-text-secondary)" }}
                        >
                            Skip &rarr;
                        </button>
                    </div>

                    <div className="relative w-full max-w-xl mx-auto px-6 md:px-8">
                        {/* Identity */}
                        <motion.div
                            className="mb-10"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
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
                                    transition={{ duration: 0.25, delay: 0.5 + i * 0.32 }}
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
                                transition={{ duration: 0.3, delay: 2.05 }}
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
                                    transition={{ duration: (TOTAL_MS - 500) / 1000, delay: 0.26, ease: "linear" }}
                                />
                            </div>
                        </div>

                        {/* Stats */}
                        <motion.div
                            className="mt-10 grid grid-cols-2 gap-4 md:gap-6"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                        >
                            <StatCell value={projectCount} label="Projects" t={ramp} />
                            <StatCell value={techCount} label="Stack" t={ramp} />
                            <StatCell value={linkCount} label="Links" t={ramp} />
                            <StatCell value={null} label="Building" t={ramp} />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MinimalLoader;
