import React, { useState, useRef, useEffect } from 'react';
import { Sound, Intensity } from '../types';
import SoundButton from './SoundButton';
import { Layers, SlidersHorizontal, Volume2 } from 'lucide-react';

interface MixerSectionProps {
  sounds: Sound[];
  masterVolume: number;
  title: string;
}

interface ActiveSound {
  id: string;
  volume: number;
  intensity: Intensity;
  name: string;
}

const IntensityToggle: React.FC<{
  intensity: Intensity;
  onChange: (newIntensity: Intensity) => void;
}> = ({ intensity, onChange }) => {
  const intensities = [Intensity.Low, Intensity.Medium, Intensity.High];
  const intensityLabels: { [key in Intensity]: string } = {
    [Intensity.Low]: 'Low',
    [Intensity.Medium]: 'Med',
    [Intensity.High]: 'High',
  };

  return (
    <div className="flex bg-gray-900/50 rounded-md p-0.5">
      {intensities.map(i => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`px-2 py-1 text-xs font-semibold rounded transition-colors w-12 ${
            intensity === i ? 'bg-orange-500 text-white' : 'text-gray-400 hover:bg-gray-700'
          }`}
        >
          {intensityLabels[i]}
        </button>
      ))}
    </div>
  );
};

const MixerSection: React.FC<MixerSectionProps> = ({ sounds, masterVolume, title }) => {
  const [activeSounds, setActiveSounds] = useState<{ [id: string]: ActiveSound }>({});
  const audioRefs = useRef<{ [id: string]: HTMLAudioElement }>({});
  const lastPlayTime = useRef<{ [id: string]: number }>({});

  useEffect(() => {
    // Sync audio elements with active sounds state
    Object.keys(activeSounds).forEach(id => {
      const soundState = activeSounds[id];
      const soundDef = sounds.find(s => s.id === id);
      if (!soundDef || !soundDef.sources) return;

      const newSrc = soundDef.sources[soundState.intensity];
      let audio = audioRefs.current[id];

      if (!audio) {
        audio = new Audio(newSrc);
        audio.loop = true;
        audioRefs.current[id] = audio;
        if (lastPlayTime.current[id]) {
            audio.currentTime = lastPlayTime.current[id];
        }
        audio.play().catch(e => console.error(`Error playing ${id}:`, e));
      } else if (audio.src !== newSrc) {
        lastPlayTime.current[id] = audio.currentTime;
        audio.src = newSrc;
        audio.load();
        audio.addEventListener('canplaythrough', () => {
            if(lastPlayTime.current[id]) {
                audio.currentTime = lastPlayTime.current[id];
            }
            audio.play().catch(e => console.error(`Error playing ${id} after src change:`, e));
        }, { once: true });
      }
      
      audio.volume = masterVolume * soundState.volume;
    });

    // Pause and remove audio elements for inactive sounds
    Object.keys(audioRefs.current).forEach(id => {
      if (!activeSounds[id]) {
        const audio = audioRefs.current[id];
        if (audio) {
          audio.pause();
          lastPlayTime.current[id] = audio.currentTime;
          delete audioRefs.current[id];
        }
      }
    });
    
    // Cleanup on unmount
    return () => {
        Object.values(audioRefs.current).forEach(audio => audio.pause());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSounds, masterVolume, sounds]);
  

  const toggleSound = (sound: Sound) => {
    setActiveSounds(prev => {
      const newActive = { ...prev };
      if (newActive[sound.id]) {
        delete newActive[sound.id];
      } else {
        newActive[sound.id] = { id: sound.id, name: sound.name, volume: 0, intensity: Intensity.Medium };
      }
      return newActive;
    });
  };

  const updateSound = (id: string, newProps: Partial<ActiveSound>) => {
    setActiveSounds(prev => ({
      ...prev,
      [id]: { ...prev[id], ...newProps },
    }));
  };

  return (
    <section className="bg-gray-800/40 p-4 rounded-lg">
      <h2 className="text-2xl font-bold text-orange-300 mb-4 flex items-center"><Layers className="mr-3"/>{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {sounds.map(sound => (
          <SoundButton
            key={sound.id}
            sound={sound}
            onClick={() => toggleSound(sound)}
            isActive={!!activeSounds[sound.id]}
          />
        ))}
      </div>
      {Object.keys(activeSounds).length > 0 && (
        <div className="mt-6 pt-4 border-t-2 border-gray-700">
            <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center"><SlidersHorizontal className="mr-2"/>Active Layers</h3>
            <div className="space-y-3">
            {Object.values(activeSounds).map(sound => (
              <div key={sound.id} className="grid grid-cols-3 md:grid-cols-4 items-center gap-4 bg-gray-900/30 p-2 rounded-md">
                <span className="font-medium text-gray-200 col-span-1">{sound.name}</span>
                <div className="flex items-center space-x-2 col-span-2 md:col-span-1">
                  <Volume2 size={18} className="text-gray-400" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={sound.volume}
                    onChange={e => updateSound(sound.id, { volume: parseFloat(e.target.value) })}
                    className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    aria-label={`${sound.name} volume`}
                  />
                </div>
                <div className="col-span-3 md:col-span-2 flex md:justify-end">
                    <IntensityToggle intensity={sound.intensity} onChange={i => updateSound(sound.id, { intensity: i })} />
                </div>
              </div>
            ))}
            </div>
        </div>
      )}
    </section>
  );
};

export default MixerSection;