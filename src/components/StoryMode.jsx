import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ACTS = [
  { 
    title: "The Problem", 
    text: "Imagine a girl named Mia. She has been blind since birth, but she loves science. Yet, climate change data—graphs, maps, and red heat zones—is completely invisible to her. How can she understand the urgency of a warming planet if she cannot see the data?" 
  },
  { 
    title: "The Data", 
    text: "Every day, NASA satellites capture millions of data points about our Earth's atmosphere. This data is beautiful and terrifying. But for millions of blind and low-vision people, this crucial information is locked away behind a wall of visual charts." 
  },
  { 
    title: "The Music", 
    text: "Earth Jukebox breaks down that wall. We convert the colors of NASA's visualizations into sounds. Red becomes the deep roar of a bass. Blue becomes the sorrowful cry of a cello. Mia doesn't need to see the map; she can hear the Earth's heartbeat." 
  },
  { 
    title: "The Impact", 
    text: "When Mia listens to the Carbon Monoxide data, she hears a heavy, suffocating bass. She understands that the air over the Amazon is thick with pollution. For the first time, climate data is not just a graph—it is a story she can feel and hear." 
  },
  { 
    title: "The Future", 
    text: "This is only the beginning. With Earth Jukebox, we can make all of NASA's data accessible. We are building a future where science belongs to everyone, regardless of how they perceive the world." 
  }
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