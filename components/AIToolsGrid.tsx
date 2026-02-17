import React from 'react';
import { motion } from 'framer-motion';

interface AITool {
  name: string;
  icon: string;
  category: 'model' | 'dev' | 'platform' | 'framework';
}

const tools: AITool[] = [
  // Models & APIs
  { name: 'Claude', icon: '◈', category: 'model' },
  { name: 'GPT-4', icon: '◉', category: 'model' },
  { name: 'Gemini', icon: '◆', category: 'model' },
  { name: 'LLaMA', icon: '◎', category: 'model' },
  // Dev Tools
  { name: 'Claude Code', icon: '⌘', category: 'dev' },
  { name: 'GitHub Copilot', icon: '⟐', category: 'dev' },
  { name: 'Cursor', icon: '▸', category: 'dev' },
  { name: 'V0', icon: '▽', category: 'dev' },
  // Platforms
  { name: 'ChatGPT', icon: '◊', category: 'platform' },
  { name: 'Microsoft Copilot', icon: '⬡', category: 'platform' },
  { name: 'Hugging Face', icon: '⊛', category: 'platform' },
  { name: 'Vercel AI', icon: '▲', category: 'platform' },
  // Frameworks & Patterns
  { name: 'LangChain', icon: '⟁', category: 'framework' },
  { name: 'RAG', icon: '⧉', category: 'framework' },
  { name: 'Vector DBs', icon: '⬢', category: 'framework' },
  { name: 'OpenAI API', icon: '⊕', category: 'framework' },
  { name: 'Anthropic API', icon: '⊗', category: 'framework' },
  { name: 'Gemini API', icon: '⊘', category: 'framework' },
  { name: 'Prompt Eng.', icon: '⟔', category: 'framework' },
  { name: 'AI Agents', icon: '⊞', category: 'framework' },
];

const categoryLabels: Record<AITool['category'], string> = {
  model: 'Models',
  dev: 'Dev Tools',
  platform: 'Platforms',
  framework: 'Frameworks & Patterns',
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 18 },
  },
};

export const AIToolsGrid: React.FC = () => {
  return (
    <section id="tools" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[500px] h-[60vw] max-h-[500px] opacity-[0.03] blur-[100px] rounded-full" style={{ backgroundColor: `rgb(var(--color-overlay-rgb))` }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-baseline gap-3 mb-3">
            <h2 className="text-3xl md:text-5xl font-display font-semibold">Tools You'll Master</h2>
            <span className="text-sm font-mono text-muted">20+</span>
          </div>
          <p className="text-secondary text-lg max-w-2xl">Hands-on experience with the AI tools and frameworks shaping financial services.</p>
          <div className="w-full h-[1px] overlay-10 mt-6" />
        </motion.div>

        {/* Category groups */}
        <div className="space-y-8">
          {(['model', 'dev', 'platform', 'framework'] as const).map((cat) => {
            const catTools = tools.filter(t => t.category === cat);
            return (
              <div key={cat}>
                <motion.span
                  className="text-[11px] font-mono text-muted uppercase tracking-widest mb-4 block"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {categoryLabels[cat]}
                </motion.span>
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                >
                  {catTools.map((tool) => (
                    <motion.div
                      key={tool.name}
                      variants={itemVariants}
                      whileHover={{ scale: 1.04, y: -2 }}
                      className="group relative p-4 rounded-xl border border-overlay-10 overlay-3 hover:overlay-8 hover:border-overlay-20 transition-all duration-300 cursor-default"
                    >
                      {/* Shimmer effect on hover */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
                      </div>

                      <div className="relative z-10 flex items-center gap-3">
                        <span className="text-lg text-muted group-hover:text-primary transition-colors duration-300 font-mono">{tool.icon}</span>
                        <span className="text-sm font-medium text-secondary group-hover:text-primary transition-colors duration-300">{tool.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
