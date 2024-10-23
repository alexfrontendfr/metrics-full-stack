export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface User {
  id: number;
  email: string;
}

export interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
  performance?: number;
  start_date: string;
  top_skills?: Array<{
    name: string;
    level: SkillLevel;
  }>;
}

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
    department: string;
    role: string;
  };
}

export interface ApiResponse<T> {
  data: T;
  status: {
    code: number;
    message: string;
  };
}

export interface AuthResponse {
  data: {
    user: User;
    token: string;
  };
  status: {
    code: number;
    message: string;
  };
}

export interface MetricsResponse {
  metrics: Metric[];
  meta: {
    total_count: number;
    total_pages: number;
    current_page: number;
  };
}

export interface DateRange {
  start: Date;
  end: Date;
}
