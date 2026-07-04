/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Terminal, Network, Calculator, ChevronRight, Activity, Code2, Sigma, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Particle background for the "geek/high-tech" vibe
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    const particles: {x: number, y: number, vx: number, vy: number, s: number}[] = [];
    for(let i=0; i<60; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        s: Math.random() * 1.5 + 0.5
      });
    }
    
    let reqId: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
      ctx.fillRect(0, 0, w, h);
      
      ctx.fillStyle = 'rgba(34, 211, 238, 0.4)';
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if(p.x < 0 || p.x > w) p.vx *= -1;
        if(p.y < 0 || p.y > h) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();
      });
      reqId = requestAnimationFrame(draw);
    };
    draw();
    
    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}

// Module accent styling mapping
const accents = {
  cyan: {
    bg: 'group-hover:bg-cyan-500/10',
    border: 'group-hover:border-cyan-500/50',
    text: 'group-hover:text-cyan-400',
    glow: 'from-cyan-500/0 via-cyan-500/30 to-cyan-500/0',
    iconBg: 'bg-cyan-950/50 text-cyan-500 border-cyan-900/50 group-hover:border-cyan-500/50'
  },
  purple: {
    bg: 'group-hover:bg-purple-500/10',
    border: 'group-hover:border-purple-500/50',
    text: 'group-hover:text-purple-400',
    glow: 'from-purple-500/0 via-purple-500/30 to-purple-500/0',
    iconBg: 'bg-purple-950/50 text-purple-500 border-purple-900/50 group-hover:border-purple-500/50'
  },
  emerald: {
    bg: 'group-hover:bg-emerald-500/10',
    border: 'group-hover:border-emerald-500/50',
    text: 'group-hover:text-emerald-400',
    glow: 'from-emerald-500/0 via-emerald-500/30 to-emerald-500/0',
    iconBg: 'bg-emerald-950/50 text-emerald-500 border-emerald-900/50 group-hover:border-emerald-500/50'
  }
}

function ModuleCard({ title, desc, icon, url, accent, delay }: any) {
  const styles = accents[accent as keyof typeof accents];
  
  return (
    <motion.a
      // We use protocol-relative URLs (//) here so it acts as a relative path to subdomains
      // without forcing http:// or https://. 
      href={url}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex flex-col p-6 rounded-xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-sm overflow-hidden transition-all duration-300 ${styles.border} ${styles.bg}`}
    >
      {/* Top scanline effect */}
      <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r ${styles.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Header with icon */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className={`p-3 rounded-lg border transition-colors duration-300 ${styles.iconBg}`}>
          {icon}
        </div>
        <div className={`text-zinc-600 transition-colors duration-300 ${styles.text}`}>
          <Code2 size={20} />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-left flex-1">
        <h2 className={`text-2xl font-bold tracking-tight text-zinc-200 transition-colors duration-300 mb-2 ${styles.text}`}>
          {title}
        </h2>
        <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300 leading-relaxed">
          {desc}
        </p>
      </div>
      
      {/* Footer / Action */}
      <div className="relative z-10 mt-8 flex items-center justify-between pt-4 border-t border-zinc-800/50 group-hover:border-transparent transition-colors duration-300">
        <span className="text-xs font-mono text-zinc-600 group-hover:text-zinc-400 tracking-wider">
          LAUNCH MODULE
        </span>
        <div className={`transform transition-all duration-300 text-zinc-600 group-hover:translate-x-2 ${styles.text}`}>
          <ChevronRight size={20} />
        </div>
      </div>
      
      {/* Hover background pulse */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.a>
  );
}

export default function App() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 font-mono relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-8 selection:bg-cyan-900/50">
      <ParticleBackground />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />
      
      <main className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Boot sequence text */}
        <motion.div 
          className="absolute -top-24 left-0 text-left text-xs text-cyan-500/50 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="mb-1">{'>'} INIT SYSTEM...</p>
          <p className="mb-1">{'>'} LOADING KERNEL...</p>
          <p className="mb-1">{'>'} MOUNTING TOOLX VFS...</p>
          <p className="text-cyan-400">{'>'} ALL SYSTEMS ONLINE.</p>
        </motion.div>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-6"
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500 drop-shadow-[0_0_40px_rgba(34,211,238,0.3)] select-none">
            TOOLX
          </h1>
          <motion.div 
            className="absolute -right-8 -top-4 text-cyan-400 opacity-50"
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Activity size={24} />
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-lg md:text-xl text-zinc-400 font-light tracking-wide flex items-center justify-center gap-3">
            <span className="text-cyan-500">{'//'}</span>
            Advanced Toolkit & Computing Workspace
          </p>
          <div className="mt-6 inline-flex items-center justify-center gap-2 text-[10px] sm:text-xs text-zinc-500 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            SECURE CONNECTION ESTABLISHED
          </div>
        </motion.div>

        {/* Modules Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative px-4 sm:px-0">
          <ModuleCard 
            title="WOLF"
            desc="Advanced analytic operations & multi-threaded data processing."
            icon={<Terminal size={26} strokeWidth={1.5} />}
            url="//wolf.toolx.cc.cd"
            accent="cyan"
            delay={0.6}
          />
          <ModuleCard 
            title="LOCUS"
            desc="Statistical analysis engine computing mean, median, variance, and distribution metrics."
            icon={<Sigma size={26} strokeWidth={1.5} />}
            url="//locus.toolx.cc.cd"
            accent="purple"
            delay={0.8}
          />
          <ModuleCard 
            title="NTH SPLIT"
            desc="Decompose large integers into mathematical sums of n-th powers."
            icon={<Calculator size={26} strokeWidth={1.5} />}
            url="//nthsplit.toolx.cc.cd"
            accent="emerald"
            delay={1.0}
          />
        </div>

        {/* Support & Contact Channels */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 w-full max-w-xl flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs font-mono"
        >
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/80 hover:border-cyan-500/40 transition-colors duration-300 group">
            <Mail size={14} className="text-cyan-500 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-zinc-500">联系我们:</span>
            <a href="mailto:contact@toolx.cc.cd" className="text-zinc-300 hover:text-cyan-400 transition-colors duration-200">
              contact@toolx.cc.cd
            </a>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/80 hover:border-emerald-500/40 transition-colors duration-300 group">
            <Mail size={14} className="text-emerald-500 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-zinc-500">问题反馈:</span>
            <a href="mailto:service@toolx.cc.cd" className="text-zinc-300 hover:text-emerald-400 transition-colors duration-200">
              service@toolx.cc.cd
            </a>
          </div>
        </motion.div>
      </main>

      {/* Footer Info */}
      <motion.footer 
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 text-[10px] text-zinc-700 font-mono text-right pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <p className="mb-1">TOOLX.CC.CD // CORE_V1.0.44</p>
        <p className="text-cyan-900/50">SYS.DEPL: ACTIVE</p>
      </motion.footer>
    </div>
  );
}
