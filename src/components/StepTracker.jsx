import { motion } from 'framer-motion';

const steps = ['Basic Details', 'Package', 'Preview'];

export default function StepTracker({ current }) {
  return (
    <div className="mb-6 flex items-center gap-2 overflow-x-auto">
      {steps.map((step, i) => {
        const active = i + 1 <= current;
        return (
          <div key={step} className="flex items-center gap-2">
            <motion.div
              animate={{ scale: active ? 1.05 : 1 }}
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${
                active ? 'border-orange-300 bg-ember-gradient text-white' : 'border-zinc-600 text-zinc-400'
              }`}
            >
              {i + 1}
            </motion.div>
            <span className={`text-sm ${active ? 'text-zinc-100' : 'text-zinc-500'}`}>{step}</span>
            {i !== steps.length - 1 && <div className="h-px w-5 bg-zinc-600" />}
          </div>
        );
      })}
    </div>
  );
}
