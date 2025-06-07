import { FC } from 'react';

interface clProps {
  placeholder: string;
  ref1: any;
  type?: string;
}

const Input: FC<clProps> = ({ ref1, placeholder, type = 'text' }) => {
  return (
    <input
      ref={ref1}
      placeholder={placeholder}
      type={type}
      className="w-full px-4 py-3 bg-[#1e1e1e] border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 placeholder-gray-400"
    />
  );
};

export default Input;
