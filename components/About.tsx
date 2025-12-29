
import React, { useState } from 'react';
import { WORKFLOW_STEPS } from '../constants';
import { getWorkflowAdvice } from '../services/geminiService';

const About: React.FC = () => {
  const [adviceInput, setAdviceInput] = useState('');
  const [adviceOutput, setAdviceOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetAdvice = async () => {
    if (!adviceInput.trim()) return;
    setLoading(true);
    const result = await getWorkflowAdvice(`Provide AI art workflow advice for: ${adviceInput}`);
    setAdviceOutput(result);
    setLoading(false);
  };

  return (
    <section id="workflow" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black tracking-tight sm:text-5xl">The AI Workflow</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            It's not just about pushing a button. It's about a systematic process of human-AI collaboration.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW_STEPS.map((step, index) => (
            <div
              key={step.title}
              className="group relative rounded-3xl border border-gray-200 bg-white p-8 transition-all hover:border-brand-500/50 hover:shadow-2xl dark:border-white/5 dark:bg-slate-900/50"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                <i className={`fas ${step.icon} text-2xl`}></i>
              </div>
              <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              <span className="absolute right-6 top-6 text-5xl font-black text-gray-100 dark:text-white/5">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>

        {/* AI Assistant Tool */}
        <div className="mt-20 overflow-hidden rounded-[2.5rem] bg-slate-950 p-1">
          <div className="rounded-[2.4rem] bg-gradient-to-br from-brand-600/20 via-slate-950 to-purple-600/20 p-8 md:p-12">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h3 className="mb-4 text-3xl font-black text-white">Ask My AI Assistant</h3>
                <p className="mb-8 text-gray-400">
                  Curious about how to achieve a specific style or which AI tools to combine?
                  Describe your creative vision and get professional workflow advice.
                </p>
                <div className="relative">
                  <input
                    type="text"
                    value={adviceInput}
                    onChange={(e) => setAdviceInput(e.target.value)}
                    placeholder="e.g. 'How to get hyper-realistic lighting in Midjourney?'"
                    className="w-full rounded-2xl bg-white/5 border border-white/10 p-5 text-white focus:border-brand-500 focus:outline-none"
                  />
                  <button
                    onClick={handleGetAdvice}
                    disabled={loading}
                    className="absolute right-2 top-2 rounded-xl bg-brand-600 px-6 py-3 font-bold text-white transition-all hover:bg-brand-500 disabled:opacity-50"
                  >
                    {loading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Consult'}
                  </button>
                </div>
              </div>
              <div className="flex flex-col rounded-3xl bg-black/40 p-6 border border-white/5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    AI Response
                  </span>
                </div>
                <div className="flex-1 overflow-auto max-h-[200px] text-gray-300 leading-relaxed italic">
                  {adviceOutput || "Waiting for your creative query..."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
