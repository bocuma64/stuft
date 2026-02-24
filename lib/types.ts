export type ContentType = "story" | "paper";
export type SerendipityLevel = "low" | "med" | "high";

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  author: string;
  year: number;
  url: string;
  tags: string[];
  readingTimeMinutes: number;
  blurb: string;
  difficulty?: number;
  domain?: string;
  source?: string;
}

export interface NightEntry {
  id: string;
  date: string;
  storyId: string;
  paperId: string;
  bonusId?: string;
  storyRead: boolean;
  paperRead: boolean;
  noteText: string;
  noteTags: string[];
  xpEarned: number;
}

export interface UserPrefs {
  interestTags: string[];
  serendipityLevel: SerendipityLevel;
  readingTimeTarget: string;
  onboardingDone: boolean;
}

export interface TonightState {
  date: string;
  storyId: string;
  paperId: string;
  bonusId?: string;
  explanation: string;
  shuffleCount: number;
}

export interface DbShape {
  contentItems: ContentItem[];
  nightEntries: NightEntry[];
  userPrefs: UserPrefs;
  tonight: TonightState | null;
}
