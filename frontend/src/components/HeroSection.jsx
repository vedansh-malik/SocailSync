// import React from 'react';
// import PulseBeamsButton from './PulseButton';

// const HeroSection = () => {
//   return (
//     <section className="w-full h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">
//       <div className="max-w-4xl text-center z-10">
//         <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
//           Create. Automate. Grow.
//         </h1>
//         <p className="text-lg md:text-xl text-gray-300 mb-10">
//           Elevate your content strategy with AI-generated posts and automatic scheduling tailored for influencers and content creators.
//         </p>
//         <PulseBeamsButton>Get Started</PulseBeamsButton>
//       </div>

//       {/* Optional gradient glow background */}
//       <div className="absolute top-[-200px] left-[50%] transform -translate-x-1/2 w-[600px] h-[600px] bg-purple-600 opacity-30 rounded-full blur-3xl z-0" />
//     </section>
//   );
// };

// export default HeroSection;

import React from 'react';
import PulseBeamsButton from './PulseButton';

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center px-6 relative overflow-hidden transition-colors duration-300">


      <div className="max-w-4xl text-center z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Create. Automate. Grow.
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10">
          Elevate your content strategy with AI-generated posts and automatic scheduling tailored for influencers and content creators.
        </p>
        <PulseBeamsButton>Get Started</PulseBeamsButton>
      </div>

      {/* Gradient glow (adjust color for dark/light mode) */}
      <div className="absolute top-[-200px] left-[50%] transform -translate-x-1/2 w-[600px] h-[600px] bg-purple-400 dark:bg-purple-600 opacity-30 rounded-full blur-3xl z-0 transition-colors duration-300" />
    </section>
  );
};

export default HeroSection;
