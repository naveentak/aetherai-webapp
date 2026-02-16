import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Code2, Shield, FlaskConical } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6 bg-surfaceHighlight/30 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-display font-semibold mb-4">What Sets This Course Apart</h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">Built by a practitioner with 16+ years in financial services IT across 4 countries.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Large Card - Real FinServ Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 p-8 rounded-3xl bg-black border border-white/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-all duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <Building2 className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-display font-medium mb-3">Real FinServ Projects</h3>
              <p className="text-neutral-400 leading-relaxed max-w-md">
                Case studies from digital banking, insurance middleware, and payment integrations — not generic business demos. Includes real builds like ThxBud (payments) and GlassCourt (tournament management).
              </p>
            </div>
          </motion.div>

          {/* Tall Card - SA Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="row-span-2 p-8 rounded-3xl bg-black border border-white/10 relative overflow-hidden group"
          >
             <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                  <Shield className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-display font-medium mb-3">SA Compliance Focus</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Deep dive into POPIA, SA National AI Policy Framework, and regulatory requirements specific to our market. Draft AI acceptable use policies for financial services teams.
                </p>
              </div>
              <div className="mt-8 space-y-2">
                {['POPIA', 'AI Ethics', 'Data Security', 'Bias & Fairness'].map(tag => (
                  <span key={tag} className="inline-block mr-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Small Card 1 - Developer-First */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-3xl bg-black border border-white/10 group hover:border-white/20 transition-colors"
          >
             <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <Code2 className="text-white" size={24} />
              </div>
            <h3 className="text-xl font-display font-medium mb-2">Developer-First</h3>
            <p className="text-neutral-400 text-sm">
              Built for engineers who ship code — covering APIs, architecture patterns, Claude Code, GitHub Copilot, and production deployment.
            </p>
          </motion.div>

          {/* Small Card 2 - Hands-On Labs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-8 rounded-3xl bg-black border border-white/10 group hover:border-white/20 transition-colors"
          >
             <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <FlaskConical className="text-white" size={24} />
              </div>
            <h3 className="text-xl font-display font-medium mb-2">6+ Hands-On Labs</h3>
            <p className="text-neutral-400 text-sm">
              Every session includes practical exercises — you leave with code, prompts, working prototypes, and a personal AI adoption roadmap.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
