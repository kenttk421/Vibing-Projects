
import React from 'react';
import { Sound } from '../types';

interface SoundButtonProps {
  sound: Sound;
  onClick: () => void;
  isActive: boolean;
}

const SoundButton: React.FC<SoundButtonProps> = ({ sound, onClick, isActive }) => {
  const baseClasses = "flex flex-col items-center justify-center p-4 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 cursor-pointer border-2";
  const activeClasses = "bg-orange-500/80 border-orange-400 text-white shadow-lg";
  const inactiveClasses = "bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-700/70 hover:border-gray-600";
  
  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      role="button"
      aria-pressed={isActive}
      aria-label={`Play ${sound.name}`}
    >
      <div className="mb-2">{sound.icon}</div>
      <span className="text-sm font-medium text-center">{sound.name}</span>
    </div>
  );
};

export default SoundButton;
