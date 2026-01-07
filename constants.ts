import { DailyGrowContent } from "./types";

export const APP_NAME = "GROW";

export const STREAK_MESSAGES = {
  START: "Every return is growth.",
  BUILDING: "Quiet consistency builds foundations.",
  STRONG: "You are showing up with trust.",
  PAUSED: "The path is still here. Step back on."
};

export const MOMENT_TRIGGERS = [
  { id: 'BODY', label: 'Body', description: 'Tension or fatigue' },
  { id: 'THOUGHT', label: 'Thought', description: 'Worry or noise' },
  { id: 'EMOTION', label: 'Emotion', description: 'Fear or overwhelm' },
  { id: 'SITUATION', label: 'Situation', description: 'Waiting or conflict' }
];

export const MOMENT_ACTIONS = [
  { id: 'PAUSE', label: 'Pause' },
  { id: 'WAIT', label: 'Wait' },
  { id: 'SPEAK_GENTLY', label: 'Speak Gently' },
  { id: 'LET_GO', label: 'Let Go' },
  { id: 'CONTINUE', label: 'Continue' }
];

export const DEFAULT_DAILY_GROW: DailyGrowContent = {
  theme: "The Shore and the Sea",
  source: "Bitachon Fundamentals",
  recognize: "Feel the ground beneath your feet. It is steady. Hashem made it for you.",
  yearn: "What is the one thing your heart is holding tightly today?",
  trust: "I trust You, Hashem. You are in the details of this moment.",
  grow: "Walk into your next conversation with one extra breath."
};

export const TEFILLAH_STEPS = [
  {
    title: "Pause",
    content: "Hashem is here, in this breath.",
    mode: "REFLECT",
    prompt: ""
  },
  {
    title: "Speak",
    content: "Tell Hashem one thing that feels heavy right now.",
    mode: "JOURNAL",
    prompt: "I am feeling..."
  },
  {
    title: "Connect",
    content: "He hears every whisper of the heart.",
    mode: "READ",
    prompt: ""
  }
];
