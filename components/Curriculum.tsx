import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { SyllabusItem } from '../types';

const syllabusData: SyllabusItem[] = [
  {
    id: '01',
    title: 'The AI Revolution — Live Showcase',
    week: 'Day 1 | 08:30 – 09:45',
    description: 'See AI transform a single financial services idea into a complete business solution. Live demo turning a banking product concept into research, marketing, a website, and video.',
    topics: ['What AI Is & Why Now', 'LLMs & Hallucinations', 'Prompt Engineering Intro', 'Live FinServ Demo']
  },
  {
    id: '02',
    title: 'How AI Really Works — LLMs & Beyond',
    week: 'Day 1 | 10:00 – 11:15',
    description: 'The theory your team needs to make informed architectural decisions. From transformers to embeddings, RAG patterns, and model trade-offs for enterprise.',
    topics: ['Transformer Architecture', 'Attention & Tokenisation', 'GPT vs Claude vs Gemini', 'Embeddings & RAG']
  },
  {
    id: '03',
    title: 'Prompt Engineering for Developers',
    week: 'Day 1 | 11:30 – 12:45',
    description: 'The #1 skill for extracting maximum value from any AI system. Master the CREATE method, cross-prompting, structured output, and reusable prompt libraries.',
    topics: ['CREATE Method', 'Chain-of-Thought', 'Cross-Prompting', 'Structured Output (JSON/SQL)']
  },
  {
    id: '04',
    title: 'AI Ethics, Compliance & POPIA',
    week: 'Day 1 | 13:30 – 14:30',
    description: 'Navigate the regulatory landscape of AI in South African financial services. Data security, POPIA, bias, and building an ethical AI policy for your organisation.',
    topics: ['POPIA & Data Security', 'SA National AI Policy', 'Bias & Accountability', 'AI Acceptable Use Policy']
  },
  {
    id: '05',
    title: 'AI-Powered Coding & Dev Tools',
    week: 'Day 1 | 14:45 – 16:00',
    description: 'Transform your development workflow with AI-assisted coding. Use Claude Code, GitHub Copilot, and Cursor for code generation, review, debugging, and testing.',
    topics: ['Claude Code & Copilot', 'AI Code Generation', 'AI-Assisted Testing', 'Security Considerations']
  },
  {
    id: '06',
    title: 'AI Agents & Workflow Automation',
    week: 'Day 2 | 08:30 – 09:45',
    description: 'Build intelligent automated workflows for financial operations. Design agent architectures for claims processing, reconciliation, and compliance monitoring.',
    topics: ['ReAct & Tool-Use Agents', 'Multi-Agent Systems', 'Microsoft Copilot Suite', 'Process Automation']
  },
  {
    id: '07',
    title: 'Building AI-Powered FinServ Apps',
    week: 'Day 2 | 10:00 – 11:15',
    description: 'From concept to working prototype. Real case studies: ThxBud (payment integration) and GlassCourt (tournament management). Build and deploy working apps with AI.',
    topics: ['AI App Development', 'SwiftUI & React Native', 'No-Code Prototyping', 'App Store Deployment']
  },
  {
    id: '08',
    title: 'API Integration & AI Middleware',
    week: 'Day 2 | 11:30 – 12:45',
    description: 'Enterprise-grade patterns for connecting AI to your financial systems. RAG pipelines, document processing, and API security at scale.',
    topics: ['AI-Enhanced API Design', 'RAG for Policy Docs', 'Document Classification', 'Cost Management']
  },
  {
    id: '09',
    title: 'AI for Risk, Fraud & Compliance',
    week: 'Day 2 | 13:30 – 14:30',
    description: 'Leverage AI to strengthen your financial institution\'s defence systems. Fraud detection, KYC/AML acceleration, and explainable AI for regulators.',
    topics: ['Fraud Detection Patterns', 'Transaction Anomaly Detection', 'KYC/AML Acceleration', 'Explainable AI']
  },
  {
    id: '10',
    title: 'Capstone Challenge & Certification',
    week: 'Day 2 | 14:45 – 16:00',
    description: 'Put it all together. Teams receive a real financial services brief, build a solution using any AI tools from the course, and present to peers.',
    topics: ['Team Build Sprint', '5-Min Presentations', 'Certification Pathways', 'Alumni Community']
  }
];

const day1Sessions = syllabusData.filter(item => item.week.startsWith('Day 1'));
const day2Sessions = syllabusData.filter(item => item.week.startsWith('Day 2'));

const days = [
  { label: 'Day 1', subtitle: 'AI Foundations', timeRange: '08:30 – 16:00', sessions: day1Sessions },
  { label: 'Day 2', subtitle: 'Advanced AI & Capstone', timeRange: '08:30 – 16:00', sessions: day2Sessions },
];

const SessionItem: React.FC<{
  item: SyllabusItem;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ item, isOpen, onToggle }) => {
  const timeSlot = item.week.split(' | ')[1];

  return (
    <div className="group">
      <button
        onClick={onToggle}
        className={`w-full text-left py-6 border-b border-overlay-5 transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-60 hover:opacity-100'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex gap-6 md:gap-12">
            <span className="font-mono text-sm text-muted pt-1">{item.id}</span>
            <div>
              <span className="block text-xs font-mono text-muted mb-1.5 uppercase tracking-wider">{timeSlot}</span>
              <h3 className="text-xl md:text-2xl font-medium">{item.title}</h3>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="text-muted w-5 h-5" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pl-[calc(1.5rem+32px)] md:pl-[calc(3rem+32px)] pr-4 py-5">
              <p className="text-secondary text-lg leading-relaxed mb-6 max-w-2xl">
                {item.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {item.topics.map((topic, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 rounded-lg overlay-5 border border-overlay-5">
                    <div className="w-1.5 h-1.5 rounded-full overlay-20" />
                    <span className="text-sm text-secondary">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Curriculum: React.FC = () => {
  const [openSessionId, setOpenSessionId] = useState<string | null>('01');
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set(['Day 1']));

  const toggleDay = (dayLabel: string) => {
    setExpandedDays(prev => {
      const next = new Set(prev);
      if (next.has(dayLabel)) {
        next.delete(dayLabel);
      } else {
        next.add(dayLabel);
      }
      return next;
    });
  };

  return (
    <section id="curriculum" className="py-20 sm:py-32 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-semibold mb-4">Your 2-Day Journey</h2>
          <p className="text-secondary text-lg mb-6">10 sessions across 2 intensive days — from AI foundations to production solutions.</p>
          <div className="w-full h-[1px] overlay-10" />
        </div>

        <div className="space-y-6">
          {days.map((day) => {
            const isDayExpanded = expandedDays.has(day.label);

            return (
              <div key={day.label} className="rounded-2xl border border-overlay-10 overflow-hidden">
                <button
                  onClick={() => toggleDay(day.label)}
                  className="w-full text-left px-6 md:px-8 py-6 flex items-center justify-between transition-all duration-300 overlay-5 hover:overlay-10"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <motion.div
                      animate={{ rotate: isDayExpanded ? 90 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronRight className="text-muted w-5 h-5" />
                    </motion.div>
                    <div>
                      <div className="flex items-baseline gap-3">
                        <h3 className="text-2xl md:text-3xl font-display font-semibold">{day.label}</h3>
                        <span className="text-sm md:text-base text-muted font-mono">— {day.subtitle}</span>
                      </div>
                      <span className="text-xs font-mono text-muted mt-1 block">
                        {day.sessions.length} sessions · {day.timeRange}
                      </span>
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isDayExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-4">
                        {day.sessions.map((item) => (
                          <SessionItem
                            key={item.id}
                            item={item}
                            isOpen={openSessionId === item.id}
                            onToggle={() => setOpenSessionId(openSessionId === item.id ? null : item.id)}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
