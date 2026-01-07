import React from 'react';
import { FaGithub, FaChartBar, FaCode, FaPalette, FaGlobe, FaRocket, FaLink, FaProjectDiagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface FeatureBlockProps {
  badge: string;
  title: string;
  accentTitle: string;
  description: string;
  icon: React.ElementType;
  accentColor: string;
  isReversed: boolean;
  children: React.ReactNode;
}

const FeatureBlock: React.FC<FeatureBlockProps> = ({
  badge,
  title,
  accentTitle,
  description,
  icon: Icon,
  accentColor,
  isReversed,
  children
}) => (
  <div className="py-24 md:py-32 relative overflow-hidden">
    {/* Ambient Glow */}
    <div className={`absolute top-1/2 -translate-y-1/2 ${isReversed ? '-left-1/4' : '-right-1/4'} w-1/2 h-full opacity-10 blur-[120px] rounded-full pointer-events-none`} style={{ background: accentColor }} />

    <div className={`max-w-7xl mx-auto flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 md:gap-24 relative z-10 px-6`}>
      {/* Visual Side */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2"
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-white/5 rounded-[2.5rem] -rotate-1 scale-105 group-hover:rotate-0 transition-transform duration-500" />
          <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3] flex items-center justify-center p-8">
            {children || (
              <div className="flex flex-col items-center gap-6 opacity-40">
                <Icon size={80} style={{ color: accentColor }} />
                <div className="h-4 w-48 bg-white/10 rounded-full" />
                <div className="h-4 w-32 bg-white/10 rounded-full" />
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Text Side */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full md:w-1/2 flex flex-col items-start"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 border"
          style={{ borderColor: `${accentColor}33`, color: accentColor, backgroundColor: `${accentColor}11` }}
        >
          <Icon size={12} />
          <span>{badge}</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
          {title} <br />
          <span style={{ color: accentColor }}>{accentTitle}</span>
        </h2>

        <p className="text-xl text-white/40 font-light leading-relaxed max-w-lg">
          {description}
        </p>
      </motion.div>
    </div>
  </div>
);

const Features: React.FC = () => {
  return (
    <section id="features" className="bg-black relative pt-32">
      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-2xl font-black uppercase tracking-[0.4em] text-white/20 mb-4"
        >
          Features
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-black text-white tracking-tighter"
        >
          Showcase Your <br />
          <span className="text-gradient">Code, Stats, and Stack.</span>
        </motion.h3 >
      </div>

      <div className="flex flex-col">
        <FeatureBlock
          badge="Featured Projects"
          title="Showcase Your"
          accentTitle="Best Work."
          description="Go beyond a simple list of projects. With DevBio, you can create a rich, detailed portfolio. Add descriptions, tech stacks, and live links."
          icon={FaProjectDiagram}
          accentColor="#3b82f6"
          isReversed={false}
        >
          <div className="w-full space-y-4">
            <div className="p-6 glass rounded-2xl border-white/10">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <FaRocket />
                </div>
                <div className="px-3 py-1 glass rounded-full text-[10px] text-white/40 font-bold uppercase tracking-widest">Live</div>
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Prepkitty</h4>
              <p className="text-sm text-white/40">AI-driven interview coach with real-time feedback.</p>
            </div>
            <div className="p-6 glass rounded-2xl border-white/10 opacity-40">
              <h4 className="text-lg font-bold text-white mb-1">Project Delta</h4>
              <p className="text-sm text-white/40">Open-source distributed database system.</p>
            </div>
          </div>
        </FeatureBlock>

        <FeatureBlock
          badge="Built-in Analytics"
          title="Understand Your"
          accentTitle="Audience."
          description="Knowledge is power. Our built-in analytics give you valuable insights into your profile's performance. See how many people are viewing your page, where they're coming from, and what content is most popular. Use this data to tailor your profile and grow your online presence."
          icon={FaChartBar}
          accentColor="#a855f7"
          isReversed={true}
        >
          <div className="w-full flex flex-col gap-8 px-4">
            <div className="flex justify-between items-end gap-2 h-32">
              {[40, 70, 45, 90, 65, 80, 55, 95, 75, 60].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-lg transition-all duration-1000" style={{ height: `${h}%`, backgroundColor: '#a855f7' }} />
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/20">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
              <span>Sun</span>
            </div>
          </div>
        </FeatureBlock>

        <FeatureBlock
          badge="GitHub Contributions"
          title="Sync Your"
          accentTitle="GitHub Activity."
          description="Keep your profile dynamic and up-to-date automatically. DevBio seamlessly integrates with your GitHub account to display your contribution graph. It’s the easiest way to show you're an active and engaged developer."
          icon={FaGithub}
          accentColor="#ffffff"
          isReversed={false}
        >
          <div className="w-full flex flex-col gap-6">
            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
              <FaGithub size={24} className="text-white/40" />
              <span className="text-white/40 font-mono text-sm">github.com/username</span>
            </div>
            <div className="grid grid-cols-12 md:grid-cols-16 gap-2">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className={`aspect-square rounded-sm ${i % 7 === 0 ? 'bg-white' : i % 5 === 0 ? 'bg-white/60' : i % 3 === 0 ? 'bg-white/20' : 'bg-white/5'}`} />
              ))}
            </div>
          </div>
        </FeatureBlock>

        <FeatureBlock
          badge="Tech Stack Visuals"
          title="Display Your"
          accentTitle="Expertise."
          description="Don't just list your skills show them. Our visual tech stack allows you to display the languages, frameworks, and tools you're proficient in. It’s a quick and effective way for visitors to gauge your technical abilities."
          icon={FaCode}
          accentColor="#10b981"
          isReversed={true}
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'PostgreSQL', 'Docker', 'AWS'].map((tech, i) => (
              <div key={tech} className="px-6 py-3 rounded-2xl glass border-white/10 text-white font-bold text-lg" style={{ opacity: 1 - (i * 0.08) }}>
                {tech}
              </div>
            ))}
          </div>
        </FeatureBlock>

        <FeatureBlock
          badge="Customizable Profile"
          title="Make It"
          accentTitle="Uniquely Yours."
          description="Your personal brand matters. Choose from multiple themes and layouts to create a profile that reflects your style. Make a memorable first impression that sets you apart from the crowd."
          icon={FaPalette}
          accentColor="#f59e0b"
          isReversed={false}
        >
          <div className="grid grid-cols-2 gap-4 w-full px-4">
            <div className="aspect-square bg-white shadow-2xl rounded-[2rem] flex items-center justify-center"><div className="w-12 h-12 rounded-full bg-blue-500/20" /></div>
            <div className="aspect-square bg-[#0a0a0a] border border-white/10 rounded-[2rem] flex flex-col p-4 gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10" />
              <div className="w-full h-2 bg-white/5 rounded-full" />
              <div className="w-2/3 h-2 bg-white/5 rounded-full" />
            </div>
            <div className="aspect-square bg-blue-600 rounded-[2rem]" />
            <div className="aspect-square glass rounded-[2rem]" />
          </div>
        </FeatureBlock>

        <FeatureBlock
          badge="Custom Domains"
          title="Own Your"
          accentTitle="Online Identity."
          description="Strengthen your professional brand by linking your profile to your own custom domain. A personal domain like yourname.dev makes your portfolio more professional, easier to share, and more likely to be remembered."
          icon={FaGlobe}
          accentColor="#3b82f6"
          isReversed={true}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="px-8 py-4 glass border-blue-500/30 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <span className="text-3xl font-mono font-black text-blue-400">yourname.dev</span>
            </div>
            <div className="flex items-center gap-3 text-white/20">
              <FaLink size={14} />
              <span className="text-xs uppercase tracking-[0.2em] font-black">Connected</span>
            </div>
          </div>
        </FeatureBlock>
      </div>
    </section>
  );
};

export default Features;
