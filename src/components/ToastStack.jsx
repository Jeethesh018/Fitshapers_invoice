import { AnimatePresence, motion } from 'framer-motion';

export default function ToastStack({ items }) {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[80] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            className={`rounded-xl border px-4 py-3 text-sm font-medium shadow-2xl backdrop-blur-lg ${
              item.type === 'error'
                ? 'border-red-500/40 bg-red-500/15 text-red-100'
                : 'border-orange-500/40 bg-zinc-900/90 text-zinc-100'
            }`}
          >
            {item.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
