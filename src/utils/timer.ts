import { TimerState } from '../types/birthday';

export const BIRTH_YEAR = 2007;
export const BIRTH_MONTH = 9; // 0-indexed: October is 9
export const BIRTH_DAY = 18;

/**
 * Calculates accurate timer information for Janjan's birthday (October 18, 2007)
 * Runs properly whether accessed before, during, or after her birthday.
 */
export function calculateBirthdayTimer(now = new Date()): TimerState {
  const currentYear = now.getFullYear();

  // Create Date for this year's birthday: October 18 00:00:00
  const thisYearBirthday = new Date(currentYear, BIRTH_MONTH, BIRTH_DAY, 0, 0, 0, 0);
  const thisYearBirthdayEnd = new Date(currentYear, BIRTH_MONTH, BIRTH_DAY, 23, 59, 59, 999);

  // Exact birth timestamp (Oct 18, 2007 00:00:00)
  const exactBirthDate = new Date(BIRTH_YEAR, BIRTH_MONTH, BIRTH_DAY, 0, 0, 0, 0);
  const diffFromBirth = Math.max(0, now.getTime() - exactBirthDate.getTime());
  const totalDaysLived = Math.floor(diffFromBirth / (1000 * 60 * 60 * 24));

  const isToday = now >= thisYearBirthday && now <= thisYearBirthdayEnd;

  let mode: 'countdown' | 'celebrating' | 'post-birthday';
  let targetDate: Date;
  let age: number;
  let nextBirthdayYear: number;

  if (isToday) {
    mode = 'celebrating';
    age = currentYear - BIRTH_YEAR;
    nextBirthdayYear = currentYear;
    targetDate = thisYearBirthdayEnd;
  } else if (now < thisYearBirthday) {
    // Before this year's birthday
    mode = 'countdown';
    age = currentYear - BIRTH_YEAR;
    nextBirthdayYear = currentYear;
    targetDate = thisYearBirthday;
  } else {
    // After this year's birthday
    mode = 'post-birthday';
    age = currentYear - BIRTH_YEAR;
    nextBirthdayYear = currentYear + 1;
    // Target is next year's birthday for the ongoing countdown
    targetDate = new Date(currentYear + 1, BIRTH_MONTH, BIRTH_DAY, 0, 0, 0, 0);
  }

  // Calculate delta
  let deltaMs: number;
  if (mode === 'celebrating') {
    // How much of the birthday has been celebrated
    deltaMs = Math.max(0, now.getTime() - thisYearBirthday.getTime());
  } else {
    // Countdown remaining to target date
    deltaMs = Math.max(0, targetDate.getTime() - now.getTime());
  }

  const seconds = Math.floor((deltaMs / 1000) % 60);
  const minutes = Math.floor((deltaMs / (1000 * 60)) % 60);
  const hours = Math.floor((deltaMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(deltaMs / (1000 * 60 * 60 * 24));

  const formattedTargetDate = `October 18, ${nextBirthdayYear}`;

  return {
    isBirthdayToday: isToday,
    age,
    nextBirthdayYear,
    days,
    hours,
    minutes,
    seconds,
    totalDaysLived,
    mode,
    formattedTargetDate,
  };
}
