import { motion } from "framer-motion";

export function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.97, 1.03, 0.97] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary/30"
      >
        <span className="text-white font-black text-3xl" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>Q</span>
      </motion.div>
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary/40 rounded-full"
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -5, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}
