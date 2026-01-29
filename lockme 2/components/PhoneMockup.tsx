import React from 'react';

interface PhoneMockupProps {
  screenContent: React.ReactNode;
  className?: string;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ screenContent, className = '' }) => {
  return (
    <div className={`relative w-[300px] h-[600px] bg-gray-900 rounded-[55px] shadow-2xl border-[8px] border-gray-900 ring-1 ring-gray-900/50 ${className}`}>
      {/* Dynamic Island */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-b-[18px] z-20 flex justify-center items-center">
        <div className="w-[60px] h-[20px] bg-black rounded-full" />
      </div>

      {/* Screen */}
      <div className="w-full h-full bg-white dark:bg-brand-dark overflow-hidden rounded-[48px] relative z-10 flex flex-col">
        {screenContent}
      </div>

      {/* Buttons */}
      <div className="absolute top-[120px] -left-[10px] w-[4px] h-[35px] bg-gray-800 rounded-l-md" />
      <div className="absolute top-[170px] -left-[10px] w-[4px] h-[60px] bg-gray-800 rounded-l-md" />
      <div className="absolute top-[170px] -right-[10px] w-[4px] h-[90px] bg-gray-800 rounded-r-md" />
    </div>
  );
};
