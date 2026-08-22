import React, { useEffect, useRef, useState } from "react";

/**
 * At rest a down arrow in the bottom right; on first scroll it runs the state
 * sequence below, ending as a column of dots that extend around the scroll
 * position. Geometry is written to SVG attributes from one rAF loop rather than
 * React state, since 40 dots re-rendering per frame would be wasteful.
 */

const RIGHT_MARGIN = 40;
const BOTTOM_MARGIN = 40;
const ARROW_LENGTH = 28;
const WING_SPREAD = 8;
const BOB_AMPLITUDE = 3;
const BOB_PERIOD = 2; // seconds
const ARROW_HIT_PADDING = 10;
const LINE_LENGTH = 400;
const DOT_SPACING = 10;
const DOT_COUNT = Math.max(1, Math.round(LINE_LENGTH / DOT_SPACING));
/** Zero-length lines plus round caps are what render as dots. */
const DOT_EPSILON = 0.01;

const MAX_EXTENSION = 50;
const EXTENSION_FALLOFF = 0.6;
const COLOR_FALLOFF = 0.3;
const SMOOTHING_TAU = 0.05;
const TRACK_HIT_PADDING = 10;

const STATES = ["idle", "compressed", "extended", "split", "tracking"] as const;
type StateName = (typeof STATES)[number];

const SEGMENTS: { duration: number; ease: [number, number, number, number] }[] = [
    { duration: 0.15, ease: [0.33, 1, 0.68, 1] }, // idle -> compressed
    { duration: 0.35, ease: [0.65, 0, 0.35, 1] }, // compressed -> extended
    { duration: 0.2, ease: [0.33, 1, 0.68, 1] }, // extended -> split
    { duration: 0.2, ease: [0.33, 1, 0.68, 1] }, // split -> tracking
];

type Line = [number, number, number, number];
type Frame = { leftWing: Line; rightWing: Line; pieces: Line[] };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
    const curve = (a: number, b: number, t: number) =>
        3 * a * t * (1 - t) ** 2 + 3 * b * t * t * (1 - t) + t ** 3;
    return (t: number) => {
        if (t <= 0) return 0;
        if (t >= 1) return 1;
        let lo = 0;
        let hi = 1;
        let mid = t;
        for (let i = 0; i < 24; i++) {
            if (curve(x1, x2, mid) < t) lo = mid;
            else hi = mid;
            mid = (lo + hi) / 2;
        }
        return curve(y1, y2, mid);
    };
}

const solid = (x: number, y0: number, y1: number, n: number): Line[] => {
    const step = (y1 - y0) / n;
    return Array.from(
        { length: n },
        (_, i) => [x, y0 + i * step, x, y0 + (i + 1) * step] as Line
    );
};

const dotRow = (x: number, y0: number, y1: number, n: number): Line[] => {
    const step = (y1 - y0) / n;
    return Array.from({ length: n }, (_, i) => {
        const mid = y0 + (i + 0.5) * step;
        return [x, mid - DOT_EPSILON / 2, x, mid + DOT_EPSILON / 2] as Line;
    });
};

function buildFrames(width: number, height: number): Record<StateName, Frame> {
    const x = width - RIGHT_MARGIN;
    const arrowY = height - BOTTOM_MARGIN;
    const top = height / 2 - LINE_LENGTH / 2;
    const bottom = height / 2 + LINE_LENGTH / 2;

    const shaft = solid(x, arrowY - ARROW_LENGTH, arrowY, DOT_COUNT);
    const lastDotCentre = bottom - LINE_LENGTH / DOT_COUNT / 2;
    const scattered: Frame = {
        leftWing: [x, lastDotCentre, x, lastDotCentre],
        rightWing: [x, lastDotCentre, x, lastDotCentre],
        pieces: dotRow(x, top, bottom, DOT_COUNT),
    };

    return {
        idle: {
            leftWing: [x - WING_SPREAD, arrowY - WING_SPREAD, x, arrowY],
            rightWing: [x + WING_SPREAD, arrowY - WING_SPREAD, x, arrowY],
            pieces: shaft,
        },
        compressed: {
            leftWing: [x, arrowY, x, arrowY],
            rightWing: [x, arrowY, x, arrowY],
            pieces: shaft,
        },
        extended: {
            leftWing: [x, bottom, x, bottom],
            rightWing: [x, bottom, x, bottom],
            pieces: solid(x, top, bottom, DOT_COUNT),
        },
        split: scattered,
        tracking: scattered,
    };
}

const toRgb = (value: string): [number, number, number] | null => {
    const v = value.trim();
    const hex = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (hex) {
        const h = hex[1].length === 3 ? [...hex[1]].map((c) => c + c).join("") : hex[1];
        const n = parseInt(h, 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    const rgb = v.match(/rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
    if (rgb) return [+rgb[1], +rgb[2], +rgb[3]];
    return null;
};

const mixRgb = (a: number[], b: number[], t: number) =>
    "rgb(" +
    Math.round(lerp(a[0], b[0], t)) +
    ", " +
    Math.round(lerp(a[1], b[1], t)) +
    ", " +
    Math.round(lerp(a[2], b[2], t)) +
    ")";

const scrollProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
};

const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const smoothScrollTo = (top: number) =>
    window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });

type Props = {
    /** Below this viewport width the dots would sit over the text column. */
    minWidth?: number;
};

const MinimalScrollbar: React.FC<Props> = ({ minWidth = 768 }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const leftWingRef = useRef<SVGLineElement>(null);
    const rightWingRef = useRef<SVGLineElement>(null);
    const dotRefs = useRef<(SVGLineElement | null)[]>([]);
    const hitRefs = useRef<(SVGRectElement | null)[]>([]);
    const arrowHitRef = useRef<SVGRectElement>(null);

    // Only take over when the page is actually long enough and the viewport is
    // wide enough that the dots sit in the margin rather than over the text.
    const [active, setActive] = useState(false);
    useEffect(() => {
        const evaluate = () => {
            const scrollable =
                document.documentElement.scrollHeight - window.innerHeight > LINE_LENGTH / 2;
            setActive(scrollable && window.innerWidth >= minWidth);
        };
        evaluate();
        window.addEventListener("resize", evaluate);
        const observer = new ResizeObserver(evaluate);
        observer.observe(document.body);
        return () => {
            window.removeEventListener("resize", evaluate);
            observer.disconnect();
        };
    }, [minWidth]);

    // Hide the native bar only while ours is live, so a script failure leaves the
    // page with its normal scrollbar.
    useEffect(() => {
        if (!active) return;
        const html = document.documentElement;
        html.classList.add("hide-scrollbar");
        return () => html.classList.remove("hide-scrollbar");
    }, [active]);

    useEffect(() => {
        if (!active) return;
        const svg = svgRef.current;
        const leftWing = leftWingRef.current;
        const rightWing = rightWingRef.current;
        const arrowHit = arrowHitRef.current;
        const dotEls = dotRefs.current.slice(0, DOT_COUNT).filter(Boolean) as SVGLineElement[];
        const hitEls = hitRefs.current.slice(0, DOT_COUNT).filter(Boolean) as SVGRectElement[];
        if (!svg || !leftWing || !rightWing || !arrowHit) return;
        if (dotEls.length < DOT_COUNT || hitEls.length < DOT_COUNT) return;

        const canHover = window.matchMedia("(hover: hover)");
        const eases = SEGMENTS.map((s) => cubicBezier(...s.ease));

        let frames = buildFrames(window.innerWidth, window.innerHeight);
        let current = 0;
        let target = 0;
        let state: StateName = "idle";
        let rafId: number | null = null;
        let lastTime = 0;
        let elapsed = 0;
        let hoveredDot: number | null = null;
        let arrowHovered = false;
        const extension = new Float64Array(DOT_COUNT);

        // Resolve the themed colours once so they can be interpolated in JS.
        const styles = getComputedStyle(svg);
        const base = toRgb(styles.getPropertyValue("--theme-text-secondary")) ?? [166, 166, 166];
        const hover = toRgb(styles.getPropertyValue("--theme-accent")) ?? [255, 0, 234];

        const extensionFor = (index: number, thumb: number) =>
            MAX_EXTENSION * EXTENSION_FALLOFF ** Math.abs(index - thumb);

        const thumbIndex = () => Math.round(scrollProgress() * (DOT_COUNT - 1));

        const paint = () => {
            const hoverCss = arrowHovered ? "var(--theme-accent)" : "";
            leftWing.style.stroke = hoverCss;
            rightWing.style.stroke = hoverCss;
            dotEls.forEach((el, i) => {
                if (arrowHovered) el.style.stroke = hoverCss;
                else if (hoveredDot === null) el.style.stroke = "";
                else el.style.stroke = mixRgb(base, hover, COLOR_FALLOFF ** Math.abs(i - hoveredDot));
            });
        };

        const layoutHitAreas = () => {
            const slot = LINE_LENGTH / DOT_COUNT;
            hitEls.forEach((rect, i) => {
                const piece = frames.split.pieces[i];
                rect.setAttribute("x", String(piece[0] - MAX_EXTENSION - TRACK_HIT_PADDING));
                rect.setAttribute("y", String((piece[1] + piece[3]) / 2 - slot / 2));
                rect.setAttribute("width", String(MAX_EXTENSION + 2 * TRACK_HIT_PADDING));
                rect.setAttribute("height", String(slot));
            });
            const apexX = frames.idle.leftWing[2];
            const apexY = frames.idle.leftWing[3];
            const topY = apexY - ARROW_LENGTH - BOB_AMPLITUDE - ARROW_HIT_PADDING;
            const bottomY = apexY + BOB_AMPLITUDE + ARROW_HIT_PADDING;
            arrowHit.setAttribute("x", String(apexX - WING_SPREAD - ARROW_HIT_PADDING));
            arrowHit.setAttribute("y", String(topY));
            arrowHit.setAttribute("width", String(2 * (WING_SPREAD + ARROW_HIT_PADDING)));
            arrowHit.setAttribute("height", String(bottomY - topY));
        };

        const setLine = (
            el: SVGLineElement,
            from: Line,
            to: Line,
            t: number,
            pullLeft: number,
            bob: number
        ) => {
            el.setAttribute("x1", String(lerp(from[0], to[0], t) - pullLeft));
            el.setAttribute("y1", String(lerp(from[1], to[1], t) + bob));
            el.setAttribute("x2", String(lerp(from[2], to[2], t)));
            el.setAttribute("y2", String(lerp(from[3], to[3], t) + bob));
        };

        const render = (position: number) => {
            const seg = Math.min(Math.max(Math.floor(position), 0), SEGMENTS.length - 1);
            const from = frames[STATES[seg]];
            const to = frames[STATES[seg + 1]];
            const t = eases[seg](position - seg);
            // Dots only pull leftward once the final transition is running.
            const pull = seg === SEGMENTS.length - 1 ? t : 0;
            // The arrow bobs only while it is still an arrow.
            const bob =
                (seg === 0 ? 1 - t : 0) *
                BOB_AMPLITUDE *
                Math.sin((2 * Math.PI * elapsed) / BOB_PERIOD);

            setLine(leftWing, from.leftWing, to.leftWing, t, 0, bob);
            setLine(rightWing, from.rightWing, to.rightWing, t, 0, bob);
            dotEls.forEach((el, i) =>
                setLine(el, from.pieces[i], to.pieces[i], t, pull * extension[i], bob)
            );
        };

        const advance = (dt: number) => {
            if (prefersReducedMotion()) {
                current = target;
                return;
            }
            let left = dt;
            while (left > 0 && current !== target) {
                const dir = target > current ? 1 : -1;
                const seg =
                    dir > 0
                        ? Math.min(Math.floor(current), SEGMENTS.length - 1)
                        : Math.max(Math.ceil(current) - 1, 0);
                const edge = dir > 0 ? seg + 1 : seg;
                const goal = dir > 0 ? Math.min(target, edge) : Math.max(target, edge);
                const duration = SEGMENTS[seg].duration;
                const needed = Math.abs(goal - current) * duration;
                if (needed <= left) {
                    current = goal;
                    left -= needed;
                } else {
                    current += (left / duration) * dir;
                    left = 0;
                }
            }
        };

        const settleExtensions = (dt: number) => {
            const thumb = thumbIndex();
            const k = prefersReducedMotion() ? 1 : 1 - Math.exp(-dt / SMOOTHING_TAU);
            let settled = true;
            for (let i = 0; i < DOT_COUNT; i++) {
                const goal = extensionFor(i, thumb);
                const next = extension[i] + (goal - extension[i]) * k;
                if (Math.abs(goal - next) < 0.05) extension[i] = goal;
                else {
                    extension[i] = next;
                    settled = false;
                }
            }
            return settled;
        };

        const tick = (now: number) => {
            const dt = Math.min((now - lastTime) / 1000, 0.1);
            lastTime = now;
            advance(dt);
            const settled = settleExtensions(dt);
            const reduced = prefersReducedMotion();
            if (!reduced) elapsed += dt;
            render(current);
            // Keep running while idle so the arrow can keep bobbing.
            const bobbing = current === 0 && !reduced;
            if (current === target && settled && !bobbing) {
                rafId = null;
                return;
            }
            rafId = requestAnimationFrame(tick);
        };

        const kick = () => {
            if (rafId === null) {
                lastTime = performance.now();
                rafId = requestAnimationFrame(tick);
            }
        };

        const syncState = () => {
            const next: StateName = window.scrollY > 0 ? "tracking" : "idle";
            if (next === state) return;
            state = next;
            svg.dataset.state = next;
            if (next !== "tracking" && hoveredDot !== null) {
                hoveredDot = null;
                paint();
            }
            if (next !== "idle" && arrowHovered) {
                arrowHovered = false;
                paint();
            }
        };

        const onScroll = () => {
            syncState();
            target = STATES.indexOf(state);
            kick();
        };

        // Start one state behind so the sequence animates in rather than snapping.
        syncState();
        target = STATES.indexOf(state);
        current = prefersReducedMotion() ? target : Math.max(target - 1, 0);

        const startThumb = thumbIndex();
        for (let i = 0; i < DOT_COUNT; i++) extension[i] = extensionFor(i, startThumb);
        render(current);
        layoutHitAreas();
        kick();

        const observer = new ResizeObserver(() => {
            frames = buildFrames(window.innerWidth, window.innerHeight);
            render(current);
            layoutHitAreas();
        });
        observer.observe(document.documentElement);

        const dotHandlers = hitEls.map((rect, i) => {
            const enter = () => {
                if (canHover.matches) {
                    hoveredDot = i;
                    paint();
                }
            };
            const leave = () => {
                if (hoveredDot === i) {
                    hoveredDot = null;
                    paint();
                }
            };
            rect.addEventListener("mouseenter", enter);
            rect.addEventListener("mouseleave", leave);
            return { rect, enter, leave };
        });

        const arrowEnter = () => {
            if (canHover.matches) {
                arrowHovered = true;
                paint();
            }
        };
        const arrowLeave = () => {
            arrowHovered = false;
            paint();
        };
        arrowHit.addEventListener("mouseenter", arrowEnter);
        arrowHit.addEventListener("mouseleave", arrowLeave);

        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            dotHandlers.forEach(({ rect, enter, leave }) => {
                rect.removeEventListener("mouseenter", enter);
                rect.removeEventListener("mouseleave", leave);
            });
            arrowHit.removeEventListener("mouseenter", arrowEnter);
            arrowHit.removeEventListener("mouseleave", arrowLeave);
            window.removeEventListener("scroll", onScroll);
            observer.disconnect();
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, [active]);

    const jumpToDot = (index: number) => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = DOT_COUNT > 1 ? index / (DOT_COUNT - 1) : 1;
        smoothScrollTo(ratio * max);
    };

    const pageDown = () => smoothScrollTo(window.scrollY + window.innerHeight);

    if (!active) return null;

    return (
        <svg ref={svgRef} className="minimal-scrollbar" data-state="idle" aria-hidden="true">
            <line ref={leftWingRef} />
            <line ref={rightWingRef} />
            {Array.from({ length: DOT_COUNT }, (_, i) => (
                <line
                    key={"dot-" + i}
                    ref={(el) => {
                        dotRefs.current[i] = el;
                    }}
                />
            ))}
            {Array.from({ length: DOT_COUNT }, (_, i) => (
                <rect
                    key={"hit-" + i}
                    className="hit-area"
                    ref={(el) => {
                        hitRefs.current[i] = el;
                    }}
                    onClick={() => jumpToDot(i)}
                />
            ))}
            <rect className="arrow-hit" ref={arrowHitRef} onClick={pageDown} />
        </svg>
    );
};

export default MinimalScrollbar;
