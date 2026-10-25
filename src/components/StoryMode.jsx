import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ACTS = [
  { title: "The Problem", text: "Climate data is invisible to blind users." },
  { title: "The Data", text: "NASA collects millions of data points every day." },
  { title: "The Music", text: "We turn every color into a musical instrument." },
  { title: "The Impact", text: "Now everyone can hear the Earth." },
  { title: "The Future", text: "This is just the beginning." }
];

export default function StoryMode({ onClose }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0e27] flex flex-col">
      <button onClick={onClose} className="absolute top-4 right-4 z-50 px-4 py-2 bg-white/10 rounded">Close</button>
      
      <div ref={containerRef} className="flex-1 overflow-y-auto snap-y snap-mandatory">
        {ACTS.map((act, i) => (
          <section key={i} className="h-screen flex flex-col items-center justify-center snap-start p-8 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-cyan-400 mb-6 pixel-font">{act.title}</h2>
              <p className="text-xl md:text-3xl text-white/80">{act.text}</p>
            </motion.div>
          </section>
        ))}
      </div>
    </div>
  );
}