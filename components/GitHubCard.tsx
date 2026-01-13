import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import Portal from "./Portal";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  githubUsername?: string;
  size?: number;
  onDelete?: () => void;
};

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

const mapContributionLevel = (level: string, count: number): number => {
  if (count === 0) return 0;
  if (level === 'FIRST_QUARTILE') return 1;
  if (level === 'SECOND_QUARTILE') return 2;
  if (level === 'THIRD_QUARTILE') return 3;
  if (level === 'FOURTH_QUARTILE') return 4;
  return count > 0 ? 1 : 0;
};

const GitHubCard: React.FC<Props> = ({ githubUsername = "jay", size = 52 }) => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    date: string;
    count: number;
    level: number;
  } | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      if (!githubUsername) {
        // Generate empty data
        const daysToDisplay = size * 7;
        const emptyDays = Array(daysToDisplay).fill(0).map((_, i) => ({
          date: "",
          count: 0,
          level: 0
        }));
        setContributions(emptyDays);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(false);

      try {
        console.log(`[GitHubCard] Fetching contributions for: ${githubUsername}`);
        const response = await fetch(`https://github-contributions-api.deno.dev/${githubUsername}.json`);

        if (!response.ok) {
          console.error(`[GitHubCard] API returned status: ${response.status}`);
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        const totalContributions = data.contributions.flat().map((day: { date: string; contributionCount: number; contributionLevel: string }) => ({
          date: day.date,
          count: day.contributionCount,
          level: mapContributionLevel(day.contributionLevel, day.contributionCount)
        }));

        const daysToDisplay = size * 7;
        const recentDays = totalContributions.slice(-daysToDisplay);

        // Pad with empty days if we don't have enough data
        if (recentDays.length < daysToDisplay) {
          const padding = Array(daysToDisplay - recentDays.length).fill(0).map(() => ({
            date: "",
            count: 0,
            level: 0
          }));
          recentDays.unshift(...padding);
        }

        setContributions(recentDays);
      } catch (err) {
        console.error("[GitHubCard] Error fetching GitHub contributions:", err);
        // Fallback to empty graph on error
        const daysToDisplay = size * 7;
        const emptyDays = Array(daysToDisplay).fill(0).map((_, i) => ({
          date: "",
          count: 0,
          level: 0
        }));
        setContributions(emptyDays);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [githubUsername, size]);

  const colorFor = (level: number) => {
    switch (level) {
      case 0: return "bg-white/5";
      case 1: return "bg-green-900/60 shadow-[0_0_5px_rgba(20,83,45,0.3)]";
      case 2: return "bg-green-700/70 shadow-[0_0_8px_rgba(34,197,94,0.4)]";
      case 3: return "bg-green-500/85 shadow-[0_0_12px_rgba(34,197,94,0.5)]";
      case 4: return "bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.6)]";
      default: return "bg-white/5";
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-2 h-2 rounded-full bg-blue-500/40 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>
    );
  }

  // Group into columns of 7 days
  const columns = [];
  for (let i = 0; i < contributions.length; i += 7) {
    columns.push(contributions.slice(i, i + 7));
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, day: ContributionDay) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      date: day.date,
      count: day.count,
      level: day.level
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center overflow-hidden">
        <div className="w-full overflow-x-auto hide-scrollbar pb-2">
          <div
            className="grid gap-1 min-w-[600px] md:min-w-0"
            style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
          >
            {columns.map((col, ci) => (
              <div key={ci} className="flex flex-col gap-1">
                {col.map((day, ri) => (
                  <div
                    key={`${ci}-${ri}`}
                    onMouseEnter={(e) => handleMouseEnter(e, day)}
                    onMouseLeave={handleMouseLeave}
                    className={`aspect-square w-full rounded-[2px] transition-all duration-300 hover:scale-125 hover:z-10 ${colorFor(day.level)} cursor-help relative`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Portal>
        <AnimatePresence>
          {tooltip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 5 }}
              transition={{ duration: 0.15 }}
              style={{ top: tooltip.y, left: tooltip.x }}
              className="fixed z-[9999] pointer-events-none -translate-x-1/2 -translate-y-full mb-2"
            >
              <div className="glass backdrop-blur-md bg-black/80 border border-white/10 px-4 py-3 rounded-xl shadow-2xl flex flex-col items-center gap-1 min-w-[120px]">
                <span className="text-2xl font-black text-white leading-none">{tooltip.count}</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{tooltip.count === 1 ? 'Contribution' : 'Contributions'}</span>
                <div className="h-[1px] w-full bg-white/10 my-1" />
                <span className="text-[10px] text-white/60 font-mono">{formatDate(tooltip.date)}</span>
              </div>
              {/* Arrow */}
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black/80 absolute left-1/2 -translate-x-1/2 bottom-[-6px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};

export default GitHubCard;
