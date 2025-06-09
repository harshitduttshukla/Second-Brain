import { Sidebaritem } from "./Sidebaritem";
import Twitter from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import BrainIcon from "../icons/BrainIcon";
import { useEffect, useState } from "react";

export function Sidebar() {
  const [mounted, setMounted] = useState(false);

  // Trigger animation on mount
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
     <div className="flex text-2xl pt-8 items-center text-white font-semibold cursor-default select-none">
  <div className="pr-4 text-purple-600 transition-transform duration-300 ease-in-out hover:scale-110">
    <BrainIcon />
  </div>
  <span className="transition-colors duration-300 ease-in-out hover:text-purple-500 animate-pulseGlow">
    Second Brain
  </span>
</div>


      <div className="pt-8 pl-4 space-y-4">
        <Sidebaritem
          title="Twitter"
          icon={<Twitter />}
          className="transition-transform duration-300 ease-in-out hover:translate-x-2 hover:text-white cursor-pointer"
        />
        <Sidebaritem
          title="Youtube"
          icon={<YoutubeIcon />}
          className="transition-transform duration-300 ease-in-out hover:translate-x-2 hover:text-white cursor-pointer"
        />
      </div>
    </div>
  );
}
