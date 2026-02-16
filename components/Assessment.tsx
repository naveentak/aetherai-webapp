import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Code,
  Layers,
  Server,
  BarChart3,
  Sparkles,
  Brain,
  Bot,
  Shield,
  Zap,
  Calendar,
  Clock,
  ScanSearch,
  Cpu,
  FileText,
  Send,
  User,
  Mail,
  Phone,
  Building,
  Loader2,
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────

interface AssessmentProps {
  onBack: () => void;
}

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: {
    value: string;
    label: string;
    description: string;
    icon: React.FC<{ size?: number; className?: string }>;
  }[];
}

// ─── Questions ──────────────────────────────────────────────────────

const questions: Question[] = [
  {
    id: 1,
    question: "What's your role?",
    subtitle: "We tailor the workshop experience to your team's profile.",
    options: [
      { value: 'developer', label: 'Software Engineer / Developer', description: 'Backend, frontend, or full-stack building financial apps', icon: Code },
      { value: 'architect', label: 'Solutions Architect / Tech Lead', description: 'Designing systems for banks, insurers, or fintechs', icon: Layers },
      { value: 'devops', label: 'DevOps / Platform Engineer', description: 'Running infrastructure for financial services', icon: Server },
      { value: 'qa-data', label: 'QA, Data & Analytics', description: 'Testing, analysing, or managing financial data', icon: BarChart3 },
    ],
  },
  {
    id: 2,
    question: "Where are you with AI?",
    subtitle: "No wrong answers — we meet everyone where they are.",
    options: [
      { value: 'exploring', label: 'Just Getting Started', description: "Curious but haven't used AI in my workflow yet", icon: Sparkles },
      { value: 'dabbling', label: 'Dabbling with ChatGPT', description: 'Using AI for ad-hoc tasks like writing or research', icon: Brain },
      { value: 'integrating', label: 'Integrating into Workflows', description: 'Using Copilot, Claude Code, or AI APIs in projects', icon: Bot },
      { value: 'building', label: 'Building AI Products', description: 'Shipping AI-powered features or applications', icon: Zap },
    ],
  },
  {
    id: 3,
    question: "What excites you most?",
    subtitle: "We'll emphasise the sessions that matter to your team.",
    options: [
      { value: 'coding', label: 'AI-Powered Development', description: 'Claude Code, Copilot, AI-assisted coding & testing', icon: Code },
      { value: 'agents', label: 'AI Agents & Automation', description: 'Automating claims, reconciliation, compliance flows', icon: Bot },
      { value: 'risk-fraud', label: 'Risk, Fraud & Compliance', description: 'Fraud detection, KYC/AML, explainable AI for regulators', icon: Shield },
      { value: 'strategy', label: 'AI Strategy & Ethics', description: 'POPIA compliance, AI policy, responsible adoption', icon: Brain },
    ],
  },
  {
    id: 4,
    question: "When are you thinking?",
    subtitle: "We're flexible — workshops can be scheduled to suit you.",
    options: [
      { value: 'urgent', label: 'ASAP', description: 'We need this training yesterday', icon: Zap },
      { value: 'this-quarter', label: 'This Quarter', description: 'Planning for the next few weeks', icon: Calendar },
      { value: 'next-quarter', label: 'Next Quarter', description: 'Forward planning — getting buy-in first', icon: Clock },
      { value: 'exploring', label: 'Just Exploring', description: 'Gathering intel for now — no commitment', icon: Brain },
    ],
  },
];

// ─── Motion tokens (Aether-consistent) ──────────────────────────────

const springTransition = { type: "spring" as const, stiffness: 80, damping: 24 };
const springSnappy = { type: "spring" as const, stiffness: 300, damping: 20 };
const springPage = { type: "spring" as const, stiffness: 100, damping: 22 };

const stepVariants = {
  enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
};

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: springTransition },
};

// ─── Shared background layer ────────────────────────────────────────

const AetherBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Aether-style white orbs (not blue) */}
    <motion.div
      className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white opacity-[0.03] rounded-full blur-[120px]"
      animate={{ scale: [1, 1.08, 1], opacity: [0.03, 0.05, 0.03] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white opacity-[0.02] rounded-full blur-[120px]"
      animate={{ scale: [1, 1.12, 1], opacity: [0.02, 0.04, 0.02] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
    />
    {/* Grid overlay */}
    <div className="absolute inset-0 bg-grid-white bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] opacity-[0.08]" />
  </div>
);

// ─── Processing stages ──────────────────────────────────────────────

interface ProcessingStage {
  id: string;
  command: string;
  label: string;
  sublabel: string;
  icon: React.FC<{ size?: number; className?: string }>;
  duration: number;
}

const processingStages: ProcessingStage[] = [
  { id: 'scan', command: 'r:scan', label: 'Analysing your responses', sublabel: 'Reviewing role, experience, interests & timeline', icon: ScanSearch, duration: 2200 },
  { id: 'think', command: 'r:think', label: 'Building your workshop profile', sublabel: 'Matching against 10 session tracks & 6 lab scenarios', icon: Cpu, duration: 2800 },
  { id: 'build', command: 'r:build', label: 'Generating tailored brief', sublabel: 'Compiling session emphasis & lab recommendations', icon: FileText, duration: 2400 },
  { id: 'deliver', command: 'r:deliver', label: 'Brief ready', sublabel: 'Your personalised workshop plan is prepared', icon: Send, duration: 1200 },
];

// ─── Animated checkmark SVG ─────────────────────────────────────────

const AnimatedCheck = () => (
  <motion.svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
    <motion.path
      d="M5 13l4 4L19 7"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
    />
  </motion.svg>
);

// ─── Aether-style CTA button ────────────────────────────────────────

const AetherButton: React.FC<{
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}> = ({ onClick, disabled, children }) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-4 rounded-full font-medium text-sm flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm ${
      disabled
        ? 'bg-white/[0.04] text-neutral-600 cursor-not-allowed border border-white/[0.05]'
        : 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-neutral-200 border border-transparent'
    }`}
    whileHover={disabled ? {} : { scale: 1.02, y: -1 }}
    whileTap={disabled ? {} : { scale: 0.98 }}
  >
    {children}
  </motion.button>
);

// ─── Contact details fields ─────────────────────────────────────────

const detailsFields = [
  { key: 'name' as const, placeholder: 'Full name', icon: User, type: 'text', required: true },
  { key: 'email' as const, placeholder: 'Email address', icon: Mail, type: 'email', required: true },
  { key: 'phone' as const, placeholder: 'Phone (optional)', icon: Phone, type: 'tel', required: false },
  { key: 'company' as const, placeholder: 'Company (optional)', icon: Building, type: 'text', required: false },
];

// ─── Details Screen ─────────────────────────────────────────────────

const DetailsScreen: React.FC<{
  onSubmit: () => void;
  onBack: () => void;
}> = ({ onSubmit, onBack }) => {
  const [details, setDetails] = useState({ name: '', email: '', phone: '', company: '' });
  const [submitting, setSubmitting] = useState(false);
  const isValid = details.name.trim() !== '' && details.email.trim() !== '';

  const handleSubmit = async () => {
    if (!isValid || submitting) return;
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onSubmit();
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AetherBackground />
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header className="p-6 flex items-center justify-between" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springTransition, delay: 0.1 }}>
          <button onClick={onBack} className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-xs tracking-wide">r<span className="text-blue-500">:</span>back</span>
          </button>
          <div className="text-xs text-neutral-500 font-mono">
            <span className="text-white font-semibold">05</span>
            <span className="mx-1 text-neutral-600">/</span>
            <span className="text-neutral-600">05</span>
          </div>
        </motion.header>

        {/* Progress */}
        <div className="px-6 max-w-2xl mx-auto w-full">
          <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div className="h-full bg-white/40 rounded-full" initial={{ width: '80%' }} animate={{ width: '100%' }} transition={{ type: 'spring', stiffness: 50, damping: 20 }} />
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <motion.div className="max-w-lg w-full" initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} transition={springPage}>
            <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springTransition, delay: 0.1 }}>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-white tracking-tight">Almost there</h1>
              <p className="text-neutral-400 text-lg">Where should we send your tailored workshop brief?</p>
            </motion.div>

            <motion.div className="space-y-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springTransition, delay: 0.2 }}>
              {detailsFields.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.key} className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-neutral-400 transition-colors">
                      <Icon size={16} />
                    </div>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={details[field.key]}
                      onChange={(e) => setDetails(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full pl-11 pr-4 py-4 rounded-2xl glass-panel text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-white/20 transition-colors"
                    />
                  </div>
                );
              })}
            </motion.div>

            <motion.div className="mt-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springTransition, delay: 0.4 }}>
              <AetherButton onClick={handleSubmit} disabled={!isValid || submitting}>
                {submitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                ) : (
                  <>Launch Assessment <ArrowRight size={16} /></>
                )}
              </AetherButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// ─── Processing Screen ──────────────────────────────────────────────

const ProcessingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [activeStage, setActiveStage] = useState(-1);
  const [completedStages, setCompletedStages] = useState<Set<string>>(new Set());

  const progressStages = useCallback(() => {
    let i = 0;
    const advance = () => {
      if (i >= processingStages.length) { setTimeout(onComplete, 800); return; }
      setActiveStage(i);
      const stage = processingStages[i];
      setTimeout(() => {
        setCompletedStages(prev => new Set([...prev, stage.id]));
        i++;
        setTimeout(advance, 200);
      }, stage.duration);
    };
    setTimeout(advance, 400);
  }, [onComplete]);

  useEffect(() => { progressStages(); }, [progressStages]);

  const allComplete = completedStages.size === processingStages.length;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <AetherBackground />
      <motion.div className="max-w-md w-full relative z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={springTransition}>
        {/* Header */}
        <motion.div className="text-center mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <span className="font-mono text-xs text-neutral-500 font-medium tracking-wider">r<span className="text-blue-500">:</span>process</span>
          <h2 className="font-display text-2xl md:text-3xl font-semibold mt-2 text-white tracking-tight">Processing your brief</h2>
        </motion.div>

        {/* Stage list */}
        <div className="space-y-1">
          {processingStages.map((stage, index) => {
            const isActive = index === activeStage;
            const isCompleted = completedStages.has(stage.id);
            const isPending = !isActive && !isCompleted;
            const StageIcon = stage.icon;

            return (
              <motion.div
                key={stage.id}
                className={`flex items-start gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                  isActive ? 'glass-panel' : 'border border-transparent'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...springTransition, delay: 0.3 + index * 0.1 }}
              >
                {/* Icon morph zone */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AnimatePresence mode="wait">
                    {isCompleted ? (
                      <motion.div key="check" className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center"
                        initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={springSnappy}>
                        <AnimatedCheck />
                      </motion.div>
                    ) : isActive ? (
                      <motion.div key="active" className="w-10 h-10 rounded-xl bg-white/[0.08] text-white flex items-center justify-center"
                        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                          <StageIcon size={18} />
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div key="pending" className="w-10 h-10 rounded-xl bg-white/[0.03] text-neutral-700 flex items-center justify-center">
                        <StageIcon size={18} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 pt-1">
                  <span className={`font-mono text-[11px] font-semibold tracking-wide transition-colors duration-300 ${
                    isCompleted ? 'text-emerald-500' : isActive ? 'text-blue-500' : 'text-neutral-700'
                  }`}>
                    {stage.command}
                  </span>
                  <p className={`text-sm font-medium transition-colors duration-300 ${isPending ? 'text-neutral-700' : 'text-white'}`}>
                    {stage.label}
                  </p>
                  <AnimatePresence>
                    {isActive && (
                      <motion.p className="text-xs text-neutral-500 mt-0.5" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                        {stage.sublabel}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress bar */}
        <motion.div className="mt-8 h-[2px] bg-white/[0.06] rounded-full overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <motion.div
            className="h-full rounded-full transition-colors duration-500"
            style={{ background: allComplete ? 'rgb(16, 185, 129)' : 'rgba(255,255,255,0.4)' }}
            initial={{ width: '0%' }}
            animate={{ width: allComplete ? '100%' : `${((completedStages.size + (activeStage >= 0 ? 0.5 : 0)) / processingStages.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 30, damping: 15 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

// ─── Success Screen ─────────────────────────────────────────────────

const SuccessScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
    <AetherBackground />
    <motion.div className="max-w-lg w-full text-center relative z-10" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 60, damping: 20 }}>
      {/* Success icon with pulse ring */}
      <motion.div
        className="w-20 h-20 rounded-full bg-white/[0.06] flex items-center justify-center mx-auto mb-8 relative border border-white/[0.08]"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
      >
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={springSnappy}>
          <Check className="w-8 h-8 text-emerald-500" strokeWidth={2.5} />
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-full border border-emerald-500/20"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
        />
      </motion.div>

      <motion.span className="font-mono text-xs text-neutral-500 font-medium tracking-wider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        r<span className="text-blue-500">:</span>complete
      </motion.span>

      <motion.h1 className="font-display text-3xl md:text-5xl font-semibold mb-4 mt-3 text-white tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springTransition, delay: 0.35 }}>
        Briefing received
      </motion.h1>

      <motion.p className="text-neutral-400 text-lg mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springTransition, delay: 0.45 }}>
        Your tailored workshop plan is on its way.
      </motion.p>

      <motion.p className="text-neutral-500 text-sm mb-12 max-w-sm mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springTransition, delay: 0.55 }}>
        We'll analyse your requirements and reach out within <span className="text-white font-medium">24 hours</span> with a customised workshop proposal.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springTransition, delay: 0.65 }}>
        <motion.button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black text-sm font-medium shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-neutral-200 transition-colors"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-mono">r<span className="text-blue-500">:</span></span>home
          <ArrowRight size={16} />
        </motion.button>
      </motion.div>
    </motion.div>
  </div>
);

// ─── Main Assessment Component ──────────────────────────────────────

export const Assessment: React.FC<AssessmentProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [phase, setPhase] = useState<'questions' | 'details' | 'processing' | 'success'>('questions');
  const [direction, setDirection] = useState(1);

  const handleSelect = (qId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    } else {
      setPhase('details');
    }
  };

  const handleBack = () => {
    if (phase === 'details') {
      setPhase('questions');
      setCurrentStep(questions.length - 1);
      setDirection(-1);
      return;
    }
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const handleProcessingComplete = useCallback(() => setPhase('success'), []);

  const currentQuestion = questions[currentStep];
  const totalSteps = questions.length + 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  // ─── Phase routing ──────────────────────────────────────────────
  if (phase === 'details') return <DetailsScreen onSubmit={() => setPhase('processing')} onBack={handleBack} />;
  if (phase === 'processing') return <ProcessingScreen onComplete={handleProcessingComplete} />;
  if (phase === 'success') return <SuccessScreen onBack={onBack} />;

  // ─── Questions phase ────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AetherBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          className="p-6 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.1 }}
        >
          <button onClick={handleBack} className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-xs tracking-wide">
              r<span className="text-blue-500">:</span>{currentStep === 0 ? 'home' : 'back'}
            </span>
          </button>
          <div className="text-xs text-neutral-600 font-mono">
            <span className="text-white font-semibold">{String(currentStep + 1).padStart(2, '0')}</span>
            <span className="mx-1">/</span>
            <span>{String(totalSteps).padStart(2, '0')}</span>
          </div>
        </motion.header>

        {/* Progress bar — white track, white fill (Aether soul) */}
        <div className="px-6 max-w-2xl mx-auto w-full">
          <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white/40 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            />
          </div>
        </div>

        {/* Question content */}
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              className="max-w-2xl w-full"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={springPage}
            >
              {/* Question heading */}
              <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springTransition, delay: 0.1 }}>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-white tracking-tight">
                  {currentQuestion.question}
                </h1>
                <p className="text-neutral-400 text-lg">{currentQuestion.subtitle}</p>
              </motion.div>

              {/* Option cards — glass-panel aesthetic, white-based selection */}
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={cardContainerVariants} initial="hidden" animate="visible">
                {currentQuestion.options.map((option) => {
                  const isSelected = answers[currentQuestion.id] === option.value;
                  const IconComponent = option.icon;

                  return (
                    <motion.button
                      key={option.value}
                      variants={cardVariants}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(currentQuestion.id, option.value)}
                      className={`group relative p-6 rounded-3xl border text-left transition-all duration-300 backdrop-blur-xl ${
                        isSelected
                          ? 'bg-white/[0.06] border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.08)]'
                          : 'bg-[rgba(10,10,10,0.6)] border-white/[0.08] hover:border-white/[0.15]'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon — inverts on select (Aether style) */}
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? 'bg-white text-black'
                            : 'bg-white/[0.06] text-neutral-500 group-hover:text-white group-hover:bg-white/[0.1]'
                        }`}>
                          <IconComponent size={22} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`font-medium text-sm block mb-1 transition-colors duration-300 ${
                            isSelected ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                          }`}>
                            {option.label}
                          </span>
                          <span className="text-xs text-neutral-500 leading-relaxed block">
                            {option.description}
                          </span>
                        </div>
                        {/* Check — white circle, black check (Aether inversion) */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={springSnappy}
                              className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0"
                            >
                              <Check size={14} className="text-black" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Continue button — Aether rounded-full with glow */}
              <motion.div className="mt-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springTransition, delay: 0.4 }}>
                <AetherButton onClick={handleNext} disabled={!answers[currentQuestion.id]}>
                  Continue <ArrowRight size={16} />
                </AetherButton>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
