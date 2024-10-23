export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface Metric {
  id: number;
  name: string;
  value: number;
  timestamp: string;
  level: SkillLevel;
  evidence?: string;
  employee: {
    id: number;
    name: string;
  };
}

export const SKILL_LEVELS: SkillLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];
export const METRIC_NAMES = [
  "Performance",
  "Productivity",
  "Quality",
  "Communication",
];
