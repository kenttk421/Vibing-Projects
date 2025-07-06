import React from 'react';

export enum SoundCategory {
  Music = 'Music',
  Ambiance = 'Ambiance',
  FX = 'FX',
}

export enum Intensity {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface Sound {
  id: string;
  name: string;
  category: SoundCategory;
  icon: React.ReactNode;
  // For one-shot FX
  source?: string; 
  // For Music (array of versions) or Ambiance (intensity-keyed object)
  sources?: string[] | {
    [Intensity.Low]: string;
    [Intensity.Medium]: string;
    [Intensity.High]: string;
  };
}

export interface ActiveMixerSound {
    id: string;
    volume: number;
    intensity: Intensity;
}