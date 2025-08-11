// components/PulseBeamsButton.jsx
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

const PulseBeamsButton = ({ children, onClick }) => {
  const controls = useAnimation();
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    controls.start({
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.3, 1],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    controls.stop();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-black text-white font-semibold text-lg px-8 py-4 rounded-full shadow-xl border border-gray-700 hover:border-blue-500 transition-colors duration-300"
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>

      {/* Glowing Pulse on Hover */}
      <motion.div
        animate={controls}
        className="absolute inset-0 rounded-full bg-blue-500 blur-xl opacity-30"
      />
    </motion.button>
  );
};

export default PulseBeamsButton;


