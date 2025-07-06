
import React, { useState, useRef, useEffect } from 'react';
import { Sound } from '../types.ts';
import SoundButton from './SoundButton.tsx';
import { Music, Volume2 } from 'lucide-react';

interface MusicPlayerProps {
  sounds: Sound[];
  masterVolume: number;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ sounds, masterVolume }) => {
  const [activeMusicId, setActiveMusicId] = useState<string | null>(null);
  const [activeVersion, setActiveVersion] = useState<number>(1);
  const [sectionVolume, setSectionVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = (id: string) => {
    setActiveMusicId(prevId => {
      if (prevId === id) {
        return null; // Turn off current music
      } else {
        setActiveVersion(1); // Default to version 1 for new music
        return id;
      }
    });
  };

  useEffect(() => {
    if (activeMusicId) {
      const sound = sounds.find(s => s.id === activeMusicId);
      if (sound?.sources && Array.isArray(sound.sources) && sound.sources.length >= activeVersion) {
        const sourceUrl = sound.sources[activeVersion - 1];
        
        if (!audioRef.current) {
          audioRef.current = new Audio();
          audioRef.current.loop = true;
        }

        if (audioRef.current.src !== sourceUrl) {
          audioRef.current.src = sourceUrl;
          audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        }
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    }
  }, [activeMusicId, activeVersion, sounds]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = masterVolume * sectionVolume;
    }
  }, [masterVolume, sectionVolume]);

  const VersionToggle = () => {
    if (!activeMusicId) return null;

    const sound = sounds.find(s => s.id === activeMusicId);
    if (!sound?.sources || !Array.isArray(sound.sources)) return null;

    const numVersions = sound.sources.length;

    return (
      <div className="flex items-center bg-gray-900/50 rounded-md p-0.5">
        {Array.from({ length: numVersions }, (_, i) => i + 1).map(version => (
          <button
            key={version}
            onClick={() => setActiveVersion(version)}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
              activeVersion === version ? 'bg-orange-500 text-white' : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            V{version}
          </button>
        ))}
      </div>
    );
  };

  return (
    <section className="bg-gray-800/40 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-orange-300 flex items-center"><Music className="mr-3"/>Music</h2>
        <div className="flex items-center space-x-4">
          <VersionToggle />
          <div className="flex items-center space-x-2 w-40">
            <Volume2 size={20} className="text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={sectionVolume}
              onChange={e => setSectionVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              aria-label="Music volume"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {sounds.map(sound => (
          <SoundButton
            key={sound.id}
            sound={sound}
            onClick={() => toggleMusic(sound.id)}
            isActive={activeMusicId === sound.id}
          />
        ))}
      </div>
    </section>
  );
};

export default MusicPlayer;