import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Curriculum } from './components/Curriculum';
import { Features } from './components/Features';
import { Audience } from './components/Audience';
import { AIToolsGrid } from './components/AIToolsGrid';
import { CourseChat } from './components/CourseChat';
import { Assessment } from './components/Assessment';
import { Button } from './components/ui/Button';
import { BrandMark } from './components/BrandMark';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const [showAssessment, setShowAssessment] = useState(false);

  if (showAssessment) {
    return <Assessment onBack={() => setShowAssessment(false)} />;
  }

  return (
    <div className="bg-background min-h-screen text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-overlay-5 surface-glass-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandMark suffix="labs" size="lg" />
            <span className="text-[10px] font-mono text-muted uppercase tracking-wider hidden sm:block">| Aether AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary">
            <a href="#features" className="hover:text-primary transition-colors">Why This Course</a>
            <a href="#tools" className="hover:text-primary transition-colors">Tools</a>
            <a href="#audience" className="hover:text-primary transition-colors">Who It's For</a>
            <a href="#curriculum" className="hover:text-primary transition-colors">Sessions</a>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="secondary" className="!py-2 !px-4 !text-xs" onClick={() => setShowAssessment(true)}>
              <span className="font-mono">r:</span>start
            </Button>
          </div>
        </div>
      </nav>

      <main>
        <Hero onStartAssessment={() => setShowAssessment(true)} />
        <Features />
        <AIToolsGrid />
        <Audience />
        <Curriculum />

        {/* Call to Action */}
        <section className="py-20 sm:py-32 px-4 sm:px-6 text-center border-t border-overlay-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-display font-semibold mb-8">
              Ready to Transform<br />Your Team?
            </h2>
            <p className="text-secondary text-lg mb-10">
              Two days. Ten sessions. One massive leap into your AI future.<br />
              Tailored for financial services & insurance tech teams.
            </p>
            <Button variant="primary" className="!text-lg !px-8 !py-4" onClick={() => setShowAssessment(true)}>
              <span className="font-mono mr-2">r:</span>start Your Assessment
            </Button>
            <p className="mt-6 text-sm text-muted font-mono">
              Customised for your organisation | On-site or virtual delivery
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 border-t border-overlay-5 bg-card-bg">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-muted text-sm">
              <span>An</span>
              <BrandMark suffix="labs" size="sm" />
              <span>product</span>
            </div>
            <div className="flex gap-6 text-muted text-sm">
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-primary transition-colors">Email</a>
            </div>
          </div>
        </footer>
      </main>

      <CourseChat />
    </div>
  );
}

export default App;
