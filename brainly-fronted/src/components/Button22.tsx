import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onclick?: () => void;
  fullWidth?: boolean;
  Loading?: boolean;
}

const variantClasses = {
  primary:
    "bg-[#7c3aed] hover:bg-[#6d28d9] text-white", // purple button matching input focus ring
  secondary:
    "bg-[#1e1e1e] border border-white/10 text-white hover:bg-white/10",
};



const defaultStyle =
  "px-5 py-3 rounded-lg font-semibold flex items-center justify-center transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500";

export default function Button22({
  variant,
  text,
  startIcon,
  onclick,
  fullWidth,
  Loading,
}: ButtonProps) {
  return (
    <button
      onClick={onclick}
      disabled={Loading}
      className={`${variantClasses[variant]} ${defaultStyle} ${
        fullWidth ? "w-full" : ""
      } ${Loading ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {Loading ? (
        <svg
          className="animate-spin h-5 w-5 text-white mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z"
          ></path>
        </svg>
      ) : (
        startIcon && <div className="mr-2">{startIcon}</div>
      )}
      {Loading ? "Processing..." : text}
    </button>
  );
}
