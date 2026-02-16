import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layers, Server, BarChart3 } from 'lucide-react';

const audienceData = [
  {
    icon: <Code size={24} />,
    title: 'Software Engineers & Developers',
    description: 'Backend, frontend, full-stack devs building financial applications — learn to integrate AI into your codebase.',
  },
  {
    icon: <Layers size={24} />,
    title: 'Solutions Architects & Tech Leads',
    description: 'Designing systems for banks & insurers — understand AI architecture patterns for enterprise scale.',
  },
  {
    icon: <Server size={24} />,
    title: 'DevOps & Platform Engineers',
    description: 'Running finserv infrastructure — deploy and operate AI services with compliance baked in.',
  },
  {
    icon: <BarChart3 size={24} />,
    title: 'QA, Data & Analytics Teams',
    description: 'Testing and analysing financial data — leverage AI for test automation, anomaly detection & insights.',
  },
];

export const Audience: React.FC = () => {
  return (
    <section id="audience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-semibold mb-4">Who Is This For?</h2>
          <div className="w-full h-[1px] bg-white/10" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {audienceData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-black border border-white/10 hover:border-white/20 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-5 group-hover:bg-white/15 transition-colors">
                <span className="text-white">{item.icon}</span>
              </div>
              <h3 className="text-xl font-display font-medium mb-2">{item.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
