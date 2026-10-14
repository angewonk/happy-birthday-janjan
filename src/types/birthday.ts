export interface TimerState {
  isBirthdayToday: boolean;
  age: number;
  nextBirthdayYear: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDaysLived: number;
  mode: 'countdown' | 'celebrating' | 'post-birthday';
  formattedTargetDate: string;
}

export interface WishCapsule {
  id: string;
  title: string;
  subtitle: string;
  message: string;
  tag: string;
}

export interface MemoryMoment {
  id: string;
  title: string;
  caption: string;
  dateTag: string;
  reflection: string;
}

export interface SkyLantern {
  id: string;
  text: string;
  sender: string;
  x: number; // percentage across screen
  speed: number;
  scale: number;
}
