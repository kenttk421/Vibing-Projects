import { Preset, CommunityPreset, Intensity, PresetMusicState, ActiveAmbianceSound, SectionState } from '../types.ts';

const COMMUNITY_PRESETS_KEY = 'bay-aards-community-presets';
const VOTED_PRESETS_KEY = 'bay-aards-voted-presets';
const SUBMISSION_TIMESTAMP_KEY = 'bay-aards-submission-timestamp';
const SUBMISSION_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour

// Default presets to seed the community list if it's empty
const defaultCommunityPresets: CommunityPreset[] = [
    {
        id: 'community-preset-1',
        name: 'Stormy Seas',
        author: 'Captain Alvyn',
        votes: 127,
        hotkey: null,
        music: { id: 'music-ocean', tag: 'Tension', volume: 1, isMuted: false },
        ambiance: {
            'ambiance-ship': { id: 'ambiance-ship', volume: 1, intensity: Intensity.High },
            'ambiance-wind': { id: 'ambiance-wind', volume: 0.8, intensity: Intensity.High },
            'ambiance-rain': { id: 'ambiance-rain', volume: 0.6, intensity: Intensity.Medium },
            'ambiance-waves': { id: 'ambiance-waves', volume: 0.75, intensity: Intensity.High }
        },
        ambianceSection: { volume: 0.9, isMuted: false },
        monsterFxSection: { volume: 1, isMuted: false },
        oneShotFxSection: { volume: 1, isMuted: false },
    },
    {
        id: 'community-preset-2',
        name: 'The Underdark',
        author: 'Drizzt',
        votes: 89,
        hotkey: null,
        music: { id: 'music-underdark', tag: 'Exploration', volume: 0.6, isMuted: false },
        ambiance: {
            'ambiance-dripping': { id: 'ambiance-dripping', volume: 0.5, intensity: Intensity.Medium },
            'ambiance-rats': { id: 'ambiance-rats', volume: 0.1, intensity: Intensity.Medium },
            'ambiance-dungeon': { id: 'ambiance-dungeon', volume: 0.4, intensity: Intensity.Low },
            'ambiance-wind': { id: 'ambiance-wind', volume: 0.1, intensity: Intensity.Low },
        },
        ambianceSection: { volume: 0.5, isMuted: false },
        monsterFxSection: { volume: 1, isMuted: false },
        oneShotFxSection: { volume: 1, isMuted: false },
    },
    {
        id: 'community-preset-3',
        name: 'Feywild Night',
        author: 'Willowisp',
        votes: 42,
        hotkey: null,
        music: { id: 'music-feywild', tag: 'Magical', volume: 0.8, isMuted: false },
        ambiance: {
            'ambiance-crickets': { id: 'ambiance-crickets', volume: 0.4, intensity: Intensity.Medium },
            'ambiance-wildlife': { id: 'ambiance-wildlife', volume: 0.2, intensity: Intensity.Low },
            'ambiance-frogs': { id: 'ambiance-frogs', volume: 0.15, intensity: Intensity.Low },
        },
        ambianceSection: { volume: 0.7, isMuted: false },
        monsterFxSection: { volume: 1, isMuted: false },
        oneShotFxSection: { volume: 1, isMuted: false },
    }
];

// --- API Functions ---

export const getCommunityPresets = async (): Promise<CommunityPreset[]> => {
    try {
        const storedPresets = localStorage.getItem(COMMUNITY_PRESETS_KEY);
        if (storedPresets) {
            return JSON.parse(storedPresets);
        } else {
            localStorage.setItem(COMMUNITY_PRESETS_KEY, JSON.stringify(defaultCommunityPresets));
            return defaultCommunityPresets;
        }
    } catch (error) {
        console.error("Failed to get community presets:", error);
        return defaultCommunityPresets; // Return defaults on error
    }
};

export const getVotedPresetIds = (): Set<string> => {
    try {
        const storedVotedIds = localStorage.getItem(VOTED_PRESETS_KEY);
        return storedVotedIds ? new Set(JSON.parse(storedVotedIds)) : new Set();
    } catch (error) {
        console.error("Failed to get voted preset IDs:", error);
        return new Set();
    }
};

export const toggleVoteForPreset = async (presetId: string): Promise<CommunityPreset> => {
    const votedIds = getVotedPresetIds();
    const presets = await getCommunityPresets();
    const presetIndex = presets.findIndex(p => p.id === presetId);

    if (presetIndex === -1) {
        throw new Error("Preset not found.");
    }

    const hasVoted = votedIds.has(presetId);

    if (hasVoted) {
        // User is taking back their vote
        presets[presetIndex].votes -= 1;
        votedIds.delete(presetId);
    } else {
        // User is casting a new vote
        presets[presetIndex].votes += 1;
        votedIds.add(presetId);
    }

    try {
        localStorage.setItem(COMMUNITY_PRESETS_KEY, JSON.stringify(presets));
        localStorage.setItem(VOTED_PRESETS_KEY, JSON.stringify(Array.from(votedIds)));
    } catch (error) {
        console.error("Failed to save vote toggle:", error);
        // Revert optimistic update on failure
        if (hasVoted) {
            presets[presetIndex].votes += 1; // Add back the vote
        } else {
            presets[presetIndex].votes -= 1; // Remove the vote
        }
        throw new Error("Failed to save vote.");
    }
    
    return presets[presetIndex];
};


interface CurrentState {
  music: PresetMusicState;
  ambiance: { [id: string]: ActiveAmbianceSound };
  ambianceSection: SectionState;
  monsterFxSection: SectionState;
  oneShotFxSection: SectionState;
}

interface SubmissionData {
    name: string;
    author: string;
    state: CurrentState;
}

export const submitPreset = async ({ name, author, state }: SubmissionData): Promise<CommunityPreset> => {
    const { canSubmit, remainingTime } = checkSubmissionCooldown();
    if (!canSubmit) {
      throw new Error(`Please wait ${remainingTime} before submitting another preset.`);
    }

    const presets = await getCommunityPresets();
    const ambianceState = Object.fromEntries(
        Object.values(state.ambiance).map(({ name, ...rest }) => [rest.id, rest])
    );

    const newPreset: CommunityPreset = {
        id: `community-${crypto.randomUUID()}`,
        name,
        author: author || 'Anonymous Bard',
        votes: 1, // Start with 1 vote from the creator
        hotkey: null,
        music: state.music,
        ambiance: ambianceState,
        ambianceSection: state.ambianceSection,
        monsterFxSection: state.monsterFxSection,
        oneShotFxSection: state.oneShotFxSection,
    };
    
    const updatedPresets = [...presets, newPreset];
    const votedIds = getVotedPresetIds();
    votedIds.add(newPreset.id); // Creator can't vote for their own submission

    try {
        localStorage.setItem(COMMUNITY_PRESETS_KEY, JSON.stringify(updatedPresets));
        localStorage.setItem(VOTED_PRESETS_KEY, JSON.stringify(Array.from(votedIds)));
        localStorage.setItem(SUBMISSION_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
        console.error("Failed to save submitted preset:", error);
        throw new Error("Failed to save submission.");
    }

    return newPreset;
};

export const checkSubmissionCooldown = (): { canSubmit: boolean, remainingTime: string } => {
    const lastSubmissionTimestamp = localStorage.getItem(SUBMISSION_TIMESTAMP_KEY);
    if (!lastSubmissionTimestamp) {
        return { canSubmit: true, remainingTime: '' };
    }

    const elapsedTime = Date.now() - parseInt(lastSubmissionTimestamp, 10);
    if (elapsedTime < SUBMISSION_COOLDOWN_MS) {
        const remainingMs = SUBMISSION_COOLDOWN_MS - elapsedTime;
        const remainingMinutes = Math.ceil(remainingMs / (1000 * 60));
        return { canSubmit: false, remainingTime: `${remainingMinutes} minutes` };
    }

    return { canSubmit: true, remainingTime: '' };
};
