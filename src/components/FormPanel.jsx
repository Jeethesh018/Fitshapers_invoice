import { motion, AnimatePresence } from 'framer-motion';

const slide = {
  initial: { opacity: 0, y: 14, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -14, scale: 0.98 }
};

export default function FormPanel({ step, data, setData, setStep, onNextFromStep1, onNextFromStep2, onDownload, balanceAmount }) {
  const setField = (key, value) => setData((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="glass-card p-6 lg:p-8">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" {...slide} transition={{ duration: 0.35 }}>
            <h2 className="mb-4 font-pop text-2xl font-bold">Member Details</h2>
            <label className="label">Full Name</label>
            <input required className="input mb-4" value={data.name} onChange={(e) => setField('name', e.target.value)} placeholder="e.g. Riya Sharma" />
            <label className="label">Contact Number</label>
            <input required className="input mb-6" value={data.contact} onChange={(e) => setField('contact', e.target.value)} placeholder="e.g. +91 98765 43210" />
            <button onClick={onNextFromStep1} className="w-full rounded-xl bg-ember-gradient px-5 py-3 font-semibold text-white transition hover:scale-[1.01]">
              Continue to Package
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" {...slide} transition={{ duration: 0.35 }}>
            <h2 className="mb-4 font-pop text-2xl font-bold">Package & Payment</h2>
            <label className="label">Package Type</label>
            <input required className="input mb-4" value={data.packageType} onChange={(e) => setField('packageType', e.target.value)} placeholder="Personal Training - 3 Months" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Start Date</label>
                <input required type="date" className="input" value={data.startDate} onChange={(e) => setField('startDate', e.target.value)} />
              </div>
              <div>
                <label className="label">End Date</label>
                <input required type="date" className="input" value={data.endDate} onChange={(e) => setField('endDate', e.target.value)} />
              </div>
            </div>
            <label className="label mt-4">Amount (₹)</label>
            <input required min="1" type="number" className="input mb-4" value={data.amount} onChange={(e) => setField('amount', e.target.value)} placeholder="12000" />
            <label className="label">Advance Paid (₹)</label>
            <input required min="0" type="number" className="input mb-4" value={data.advancePaid} onChange={(e) => setField('advancePaid', e.target.value)} placeholder="5000" />
            <label className="label">Balance Amount (₹)</label>
            <input readOnly className="input mb-6 cursor-not-allowed opacity-80" value={Number.isFinite(balanceAmount) ? balanceAmount : 0} />
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="w-1/3 rounded-xl border border-zinc-600 px-4 py-3">Back</button>
              <button onClick={onNextFromStep2} className="w-2/3 rounded-xl bg-ember-gradient px-4 py-3 font-semibold text-white">Go to Preview</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" {...slide} transition={{ duration: 0.35 }}>
            <h2 className="mb-2 font-pop text-2xl font-bold">Invoice Actions</h2>
            <p className="mb-6 text-sm text-zinc-400">Review your receipt and download the final PDF invoice.</p>
            <div className="space-y-3">
              <button onClick={onDownload} className="w-full rounded-xl bg-ember-gradient px-5 py-3 font-semibold text-white">Download PDF</button>
              <button onClick={() => setStep(2)} className="w-full rounded-xl border border-zinc-600 px-5 py-3">Edit Details</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
