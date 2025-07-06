
import React, { useState, useMemo } from 'react';
import { SOUND_LIBRARY } from './constants.tsx';
import { SoundCategory } from './types.ts';
import MusicPlayer from './components/MusicPlayer.tsx';
import MixerSection from './components/MixerSection.tsx';
import OneShotPlayer from './components/OneShotPlayer.tsx';
import { Volume2, VolumeX, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [masterVolume, setMasterVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setMasterVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const effectiveVolume = isMuted ? 0 : masterVolume;

  const music = useMemo(() => SOUND_LIBRARY.filter(s => s.category === SoundCategory.Music), []);
  const ambiance = useMemo(() => SOUND_LIBRARY.filter(s => s.category === SoundCategory.Ambiance), []);
  const fx = useMemo(() => SOUND_LIBRARY.filter(s => s.category === SoundCategory.FX), []);

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 border-b-2 border-gray-700 pb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-400 tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
            Bay Aard's Battle Beats
          </h1>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors">
              {isMuted || masterVolume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={effectiveVolume}
              onChange={handleVolumeChange}
              className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>
        </header>

        <main className="space-y-10">
          <MusicPlayer sounds={music} masterVolume={effectiveVolume} />
          <MixerSection sounds={ambiance} masterVolume={effectiveVolume} title="Ambiance" />
          <OneShotPlayer sounds={fx} masterVolume={effectiveVolume} />
        </main>
        
        <footer className="text-center mt-12 pt-6 border-t border-gray-800">
            <p className="text-gray-500 flex items-center justify-center space-x-2">
                <Heart size={16} className="text-red-500"/>
                <span>Enjoying the tool? Consider supporting its development.</span>
            </p>
            <div className="flex justify-center space-x-4 mt-2">
                <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">PayPal</a>
                <span className="text-gray-600">|</span>
                <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">Venmo</a>
            </div>
            <p className="text-xs text-gray-600 mt-4">Project "Bay Aard's Battle Beats" v1.0</p>
        </footer>
      </div>
    </div>
  );
};

export default App;