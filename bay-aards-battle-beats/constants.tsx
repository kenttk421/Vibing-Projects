
import React from 'react';
import { Sound, SoundCategory, Intensity } from './types.ts';
import { Music, Zap, CloudRain, Wind, Waves, Footprints, Bird, Droplets, Mountain, Sword, Sparkles, Bomb, Beer, Castle, Sun, Leaf, Skull, HelpCircle, Flame, Rabbit } from 'lucide-react';

const iconClass = "w-10 h-10";

export const SOUND_LIBRARY: Sound[] = [
  // Music
  {
    id: 'music-combat',
    name: 'Combat',
    category: SoundCategory.Music,
    icon: <Sword className={iconClass} />,
    sources: [
        './audio/music-combat-v1.mp3',
        './audio/music-combat-v2.mp3',
        './audio/music-combat-v3.mp3'
    ],
  },
  {
    id: 'music-tavern',
    name: 'Tavern',
    category: SoundCategory.Music,
    icon: <Beer className={iconClass} />,
    sources: [
        './audio/music-tavern-v1.mp3',
        './audio/music-tavern-v2.mp3',
        './audio/music-tavern-v3.mp3'
    ],
  },
  {
    id: 'music-city',
    name: 'City Streets',
    category: SoundCategory.Music,
    icon: <Castle className={iconClass} />,
    sources: [
        './audio/music-city-v1.mp3',
        './audio/music-city-v2.mp3',
        './audio/music-city-v3.mp3'
    ],
  },
  {
    id: 'music-forest',
    name: 'Forest',
    category: SoundCategory.Music,
    icon: <Leaf className={iconClass} />,
    sources: [
        './audio/music-forest-v1.mp3',
        './audio/music-forest-v2.mp3',
        './audio/music-forest-v3.mp3'
    ],
  },
  {
    id: 'music-cave',
    name: 'Cave',
    category: SoundCategory.Music,
    icon: <Mountain className={iconClass} />,
    sources: [
        './audio/music-cave-v1.mp3',
        './audio/music-cave-v2.mp3',
        './audio/music-cave-v3.mp3'
    ],
  },
  {
    id: 'music-desert',
    name: 'Desert',
    category: SoundCategory.Music,
    icon: <Sun className={iconClass} />,
    sources: [
        './audio/music-desert-v1.mp3',
        './audio/music-desert-v2.mp3',
        './audio/music-desert-v3.mp3'
    ],
  },
   {
    id: 'music-ocean',
    name: 'Ocean',
    category: SoundCategory.Music,
    icon: <Waves className={iconClass} />,
    sources: [
        './audio/music-ocean-v1.mp3',
        './audio/music-ocean-v2.mp3',
        './audio/music-ocean-v3.mp3'
    ],
  },
  {
    id: 'music-peaceful',
    name: 'Peaceful',
    category: SoundCategory.Music,
    icon: <Music className={iconClass} />,
    sources: [
        './audio/music-peaceful-v1.mp3',
        './audio/music-peaceful-v2.mp3',
        './audio/music-peaceful-v3.mp3'
    ],
  },
  {
    id: 'music-mysterious',
    name: 'Mysterious',
    category: SoundCategory.Music,
    icon: <HelpCircle className={iconClass} />,
    sources: [
        './audio/music-mysterious-v1.mp3',
        './audio/music-mysterious-v2.mp3',
        './audio/music-mysterious-v3.mp3'
    ],
  },

  // Ambiance
  {
    id: 'ambiance-rain',
    name: 'Rain',
    category: SoundCategory.Ambiance,
    icon: <CloudRain className={iconClass} />,
    sources: {
      [Intensity.Low]: './audio/ambiance-rain-low.mp3',
      [Intensity.Medium]: './audio/ambiance-rain-medium.mp3',
      [Intensity.High]: './audio/ambiance-rain-high.mp3',
    },
  },
  {
    id: 'ambiance-wind',
    name: 'Wind',
    category: SoundCategory.Ambiance,
    icon: <Wind className={iconClass} />,
    sources: {
      [Intensity.Low]: './audio/ambiance-wind-low.mp3',
      [Intensity.Medium]: './audio/ambiance-wind-medium.mp3',
      [Intensity.High]: './audio/ambiance-wind-high.mp3',
    },
  },
  {
    id: 'ambiance-waves',
    name: 'Waves',
    category: SoundCategory.Ambiance,
    icon: <Waves className={iconClass} />,
    sources: {
      [Intensity.Low]: './audio/ambiance-waves-low.mp3',
      [Intensity.Medium]: './audio/ambiance-waves-medium.mp3',
      [Intensity.High]: './audio/ambiance-waves-high.mp3',
    },
  },
  {
    id: 'ambiance-fire',
    name: 'Fire',
    category: SoundCategory.Ambiance,
    icon: <Flame className={iconClass} />,
    sources: {
      [Intensity.Low]: './audio/ambiance-fire-low.mp3',
      [Intensity.Medium]: './audio/ambiance-fire-medium.mp3',
      [Intensity.High]: './audio/ambiance-fire-high.mp3',
    },
  },
  {
    id: 'ambiance-walking',
    name: 'Walking',
    category: SoundCategory.Ambiance,
    icon: <Footprints className={iconClass} />,
    sources: {
      [Intensity.Low]: './audio/ambiance-walking-low.mp3',
      [Intensity.Medium]: './audio/ambiance-walking-medium.mp3',
      [Intensity.High]: './audio/ambiance-walking-high.mp3',
    },
  },
  {
    id: 'ambiance-birds',
    name: 'Birds',
    category: SoundCategory.Ambiance,
    icon: <Bird className={iconClass} />,
    sources: {
      [Intensity.Low]: './audio/ambiance-birds-low.mp3',
      [Intensity.Medium]: './audio/ambiance-birds-medium.mp3',
      [Intensity.High]: './audio/ambiance-birds-high.mp3',
    },
  },
  {
    id: 'ambiance-wildlife',
    name: 'Wildlife',
    category: SoundCategory.Ambiance,
    icon: <Rabbit className={iconClass} />,
    sources: {
      [Intensity.Low]: './audio/ambiance-wildlife-low.mp3',
      [Intensity.Medium]: './audio/ambiance-wildlife-medium.mp3',
      [Intensity.High]: './audio/ambiance-wildlife-high.mp3',
    },
  },
  {
    id: 'ambiance-dripping',
    name: 'Dripping',
    category: SoundCategory.Ambiance,
    icon: <Droplets className={iconClass} />,
    sources: {
      [Intensity.Low]: './audio/ambiance-dripping-low.mp3',
      [Intensity.Medium]: './audio/ambiance-dripping-medium.mp3',
      [Intensity.High]: './audio/ambiance-dripping-high.mp3',
    },
  },
    {
    id: 'ambiance-screaming',
    name: 'Screaming',
    category: SoundCategory.Ambiance,
    icon: <Skull className={iconClass} />,
    sources: {
      [Intensity.Low]: './audio/ambiance-screaming-low.mp3',
      [Intensity.Medium]: './audio/ambiance-screaming-medium.mp3',
      [Intensity.High]: './audio/ambiance-screaming-high.mp3',
    },
  },

  // One-Shot FX
  {
    id: 'fx-clash',
    name: 'Weapon Clash',
    category: SoundCategory.FX,
    icon: <Sword className={iconClass} />,
    source: './audio/fx-clash.mp3',
  },
  {
    id: 'fx-spell',
    name: 'Spell',
    category: SoundCategory.FX,
    icon: <Sparkles className={iconClass} />,
    source: './audio/fx-spell.mp3',
  },
  {
    id: 'fx-explosion',
    name: 'Explosion',
    category: SoundCategory.FX,
    icon: <Bomb className={iconClass} />,
    source: './audio/fx-explosion.mp3',
  },
  {
    id: 'fx-rockfall',
    name: 'Rock Falling',
    category: SoundCategory.FX,
    icon: <Mountain className={iconClass} />,
    source: './audio/fx-rockfall.mp3',
  },
  {
    id: 'fx-scream',
    name: 'Scream',
    category: SoundCategory.FX,
    icon: <Skull className={iconClass} />,
    source: './audio/fx-scream.mp3',
  },
];