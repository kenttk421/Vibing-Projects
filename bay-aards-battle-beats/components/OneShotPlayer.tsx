
import React, { useRef, useEffect } from 'react';
import { Sound } from '../types.ts';
import SoundButton from './SoundButton.tsx';
import { Zap } from 'lucide-react';

interface OneShotPlayerProps {
  sounds: Sound[];
  masterVolume: number;
}

const OneShotPlayer: React.FC<OneShotPlayerProps> = ({ sounds, masterVolume }) => {
  const audioPool = useRef<HTMLAudioElement[]>([]);
  const currentAudioIndex = useRef(0);
  const POOL_SIZE = 5; // Allow up to 5 overlapping sounds

  useEffect(() => {
    // Initialize the audio pool
    audioPool.current = Array.from({ length: POOL_SIZE }, () => new Audio());

    return () => {
      // Cleanup
      audioPool.current.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      audioPool.current = [];
    };
  }, []);

  const playSound = (sound: Sound) => {
    if (!sound.source) return;

    // Get the next available audio element from the pool
    const audio = audioPool.current[currentAudioIndex.current];
    currentAudioIndex.current = (currentAudioIndex.current + 1) % POOL_SIZE;
    
    audio.src = sound.source;
    audio.volume = masterVolume;
    audio.currentTime = 0;
    audio.play().catch(e => console.error("One-shot audio play failed:", e));
  };

  return (
    <section className="bg-gray-800/40 p-4 rounded-lg">
      <h2 className="text-2xl font-bold text-orange-300 mb-4 flex items-center"><Zap className="mr-3"/>One-Shot FX</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {sounds.map(sound => (
          <SoundButton
            key={sound.id}
            sound={sound}
            onClick={() => playSound(sound)}
            isActive={false} // One-shots don't have a persistent active state
          />
        ))}
      </div>
    </section>
  );
};

export default OneShotPlayer;