import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";

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

  useEffect(() => {
    const fetchContributions = async () => {
      if (!githubUsername) return;

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
        console.log(`[GitHubCard] Raw API response:`, data);

        // Transform the API data to our expected format
        const totalContributions = data.contributions.flat().map((day: any) => ({
          date: day.date,
          count: day.contributionCount,
          level: mapContributionLevel(day.contributionLevel, day.contributionCount)
        }));

        console.log(`[GitHubCard] Total contribution days: ${totalContributions.length}`);

        // Take the last N days based on our size * 7 rows
        const daysToDisplay = size * 7;
        const recentDays = totalContributions.slice(-daysToDisplay);

        console.log(`[GitHubCard] Displaying ${recentDays.length} days`);
        console.log(`[GitHubCard] Sample data:`, recentDays.slice(0, 5));
        console.log(`[GitHubCard] Last 5 days:`, recentDays.slice(-5));

        // Count how many days have contributions
        const daysWithContributions = recentDays.filter((d: any) => d.count > 0).length;
        console.log(`[GitHubCard] Days with contributions: ${daysWithContributions}/${recentDays.length}`);

        setContributions(recentDays);
      } catch (err) {
        console.error("[GitHubCard] Error fetching GitHub contributions:", err);
        setError(true);
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

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-white/20 p-8">
        <FaGithub size={30} className="mb-4 opacity-50" />
        <p className="text-xs font-black uppercase tracking-widest text-center">
          Could not fetch data for <span className="text-blue-500">{githubUsername}</span>
        </p>
      </div>
    );
  }

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

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div
        className="grid w-full gap-1"
        style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
      >
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-1">
            {col.map((day, ri) => (
              <div
                key={`${ci}-${ri}`}
                title={`${day.date}: ${day.count} contributions`}
                className={`aspect-square w-full rounded-[2px] transition-all duration-500 hover:scale-150 hover:z-50 ${colorFor(day.level)} cursor-help`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHubCard;
