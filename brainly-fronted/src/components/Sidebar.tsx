// import { Sidebaritem } from "./Sidebaritem";
// import Twitter from "../icons/TwitterIcon";
// import YoutubeIcon from "../icons/YoutubeIcon";
// import BrainIcon from "../icons/BrainIcon";
// import { useEffect, useState } from "react";
// import { usePlatform } from "../context/PlatformContext";

// export function Sidebar() {
//   const [mounted, setMounted] = useState(false);
//   const { activePlatform, setActivePlatform } = usePlatform();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <div
//       className={`h-screen bg-[#141414] border-r border-white/10 w-72 fixed left-0 top-0 pl-6 text-gray-300
//       transform transition-transform duration-700 ease-in-out
//       ${mounted ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}
//       `}
//     >
//       <div className="flex text-2xl pt-8 items-center text-white font-semibold cursor-default select-none">
//         <div className="pr-4 text-purple-600 transition-transform duration-300 ease-in-out hover:scale-110">
//           <BrainIcon />
//         </div>
//         <span className="transition-colors duration-300 ease-in-out hover:text-purple-500 animate-pulseGlow">
//           Second Brain
//         </span>
//       </div>

//       <div className="pt-8 pl-4 space-y-4">
//         <Sidebaritem
//           title="Twitter"
//           icon={<Twitter />}
//           onClick={() => setActivePlatform("twitter")}
//           className={`transition-transform duration-300 ease-in-out hover:translate-x-2 cursor-pointer ${
//             activePlatform === "twitter" ? "text-white" : "text-gray-400"
//           }`}
//         />
//         <Sidebaritem
//           title="Youtube"
//           icon={<YoutubeIcon />}
//           onClick={() => setActivePlatform("youtube")}
//           className={`transition-transform duration-300 ease-in-out hover:translate-x-2 cursor-pointer ${
//             activePlatform === "youtube" ? "text-white" : "text-gray-400"
//           }`}
//         />
//       </div>
//     </div>
//   );
// }

import { Sidebaritem } from "./Sidebaritem";
import Twitter from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import BrainIcon from "../icons/BrainIcon";
import { useEffect, useState } from "react";
import { usePlatform } from "../context/PlatformContext";
import { motion } from "framer-motion";

export function Sidebar() {
  const [mounted, setMounted] = useState(false);
  const { activePlatform, setActivePlatform } = usePlatform();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`h-screen bg-[#141414] border-r border-white/10 w-72 fixed left-0 top-0 pl-6 text-gray-300
        transform transition-transform duration-700 ease-in-out
        ${mounted ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}
      `}
    >
      {/* Continuous Marquee Animation */}
      <div className="relative overflow-hidden h-12 mt-8 w-full">
        <motion.div
          className="flex absolute gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Repeat several items to make it continuous */}
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center text-2xl text-white font-semibold gap-3 min-w-fit"
            >
              <div className="text-purple-600">
                <BrainIcon />
              </div>
              <span>Second Brain</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Sidebar Items */}
      <div className="pt-8 pl-4 space-y-4">
        <Sidebaritem
          title="Twitter"
          icon={<Twitter />}
          onClick={() => setActivePlatform("twitter")}
          className={`transition-transform duration-300 ease-in-out hover:translate-x-2 cursor-pointer ${
            activePlatform === "twitter" ? "text-white" : "text-gray-400"
          }`}
        />
        <Sidebaritem
          title="Youtube"
          icon={<YoutubeIcon />}
          onClick={() => setActivePlatform("youtube")}
          className={`transition-transform duration-300 ease-in-out hover:translate-x-2 cursor-pointer ${
            activePlatform === "youtube" ? "text-white" : "text-gray-400"
          }`}
        />



        <br />
        <br />
        <br />
       
      </div>
    </div>
  );
}
