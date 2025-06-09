import { ReactElement } from "react";

export function Sidebaritem({
  title,
  icon,
  className = "",
}: {
  title: string;
  icon: ReactElement;
  className?: string;
}) {
  return (
    <div
      className={
        "flex items-center text-gray-400 py-2 cursor-pointer rounded max-w-48 pl-4 transition-all duration-150 ease-in-out " +
        "hover:bg-gray-700 hover:text-white hover:translate-x-2 " +
        className
      }
    >
      <div className="pr-2">{icon}</div>
      <div>{title}</div>
    </div>
  );
}
