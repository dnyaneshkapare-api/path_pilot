// User Roles
export type UserRole = "student" | "expert" | "admin";

// User Profile
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  passwordHash?: string;
  isEmailVerified: boolean;
  educationLevel?: "10th" | "12th" | "college" | "working" | "exploring";
  ageBand?: "under_14" | "14_17" | "18_24" | "25_plus";
  hasParentalConsent?: boolean;
  interests?: string[];
  activities?: string[];
  learningStyle?: "visual" | "hands_on" | "reading" | "collaborative";
  budget?: "free" | "low" | "moderate" | "high";
  location?: string;
  careerGoals?: string[];
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// RIASEC Interest Assessment Types
export interface RIASECScore {
  R: number; // Realistic
  I: number; // Investigative
  A: number; // Artistic
  S: number; // Social
  E: number; // Enterprising
  C: number; // Conventional
}

export interface AssessmentQuestion {
  id: string;
  textEn: string;
  textHi: string;
  textMr: string;
  dimension: keyof RIASECScore;
  category: string;
}

export interface InterestAssessmentRecord {
  id: string;
  userId: string;
  version: string;
  scores: RIASECScore;
  primaryCode: string; // e.g. "IRC", "SEC"
  answers: Record<string, number>; // questionId -> 1..5 scale
  completedAt: string;
}

// Career Entity
export interface Career {
  id: string;
  title: string;
  titleHi?: string;
  titleMr?: string;
  slug: string;
  cluster: string;
  overview: string;
  riasecCode: string; // e.g. "IRC"
  eligibility: {
    minEducation: "10th" | "12th" | "diploma" | "degree" | "postgrad";
    requiredStreams?: string[]; // e.g., ["Science PCM", "Commerce", "Any"]
    entranceExams?: string[];
    isEligibleDefaultMessage?: string;
  };
  durationYears: string;
  estimatedCostRange: {
    minINR: number;
    maxINR: number;
    subsidizedAlternativeAvailable: boolean;
  };
  flexibility: "Low" | "Medium" | "High"; // remote/hybrid/shifts
  demandLevel: "Very High" | "High" | "Moderate" | "Growing";
  salaryRangeINR: {
    startingPerAnnum: number;
    midCareerPerAnnum: number;
    seniorPerAnnum: number;
    source: string;
    verifiedDate: string;
    region: string;
  };
  typicalWorkWeek: string[];
  keySkills: string[];
  sectors: string[];
  entryRoutes: string[];
  evidenceLevel: "strong" | "mixed" | "limited" | "uncertain";
  sourceCitation: {
    sourceName: string;
    publishedDate: string;
    verifiedDate: string;
    url?: string;
  };
  lastVerifiedDate: string;
}

// Scoring & Recommendation Model
export interface CareerScoreBreakdown {
  careerId: string;
  careerTitle: string;
  totalScore: number; // 0 - 100
  formula: string; // "S(c) = 0.35I + 0.20A + 0.15G + 0.15P + 0.15F"
  components: {
    I: number; // Interest RIASEC alignment (0-100)
    A: number; // Activity/skills match (0-100)
    G: number; // Goal alignment (0-100)
    P: number; // Practical constraints (budget/time/style) (0-100)
    F: number; // Future scope & demand (0-100)
  };
  weights: {
    I: number;
    A: number;
    G: number;
    P: number;
    F: number;
  };
  eligibilityCheck: {
    isQualified: boolean;
    missingQualifications: string[];
    notice: string;
  };
  aiExplanation: {
    whyItFits: string;
    caveatsAndUncertainty: string;
    suggestedAlternatives: string[];
  };
  modelVersion: string;
}

// Learning Roadmap
export interface RoadmapStepCourse {
  id: string;
  title: string;
  provider: string; // NPTEL, Coursera, FreeCodeCamp, Swayam, YouTube, MIT OCW
  isFree: boolean;
  costINR: number;
  durationWeeks: number;
  language: string;
  hasCertificate: boolean;
  url: string;
  verifiedDate: string;
}

export interface RoadmapStep {
  stepNumber: number;
  level: "Level 0 Explore" | "Level 1 Foundations" | "Level 2 Practical Skills" | "Level 3 Specialize";
  title: string;
  description: string;
  prerequisites: string[];
  courses: RoadmapStepCourse[];
  practicalProject: {
    title: string;
    deliverable: string;
    estimatedHours: number;
  };
}

export interface LearningRoadmap {
  id: string;
  careerId: string;
  careerTitle: string;
  overview: string;
  steps: RoadmapStep[];
}

// Expert Profile & Consultations
export interface Expert {
  id: string;
  userId: string;
  name: string;
  headline: string;
  qualifications: string[];
  specialization: "Engineering & IT" | "Medicine & Healthcare" | "Design & Arts" | "Commerce, Law & Finance" | "Civil Services & Research";
  languages: string[];
  experienceYears: number;
  isVerifiedByAdmin: boolean;
  avatarUrl: string;
  bio: string;
  hourlyRateINR: number; // 0 for free sessions
  availableModes: ("video" | "audio" | "chat")[];
  rating: number;
  reviewsCount: number;
}

export interface ExpertAvailabilitySlot {
  id: string;
  expertId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  isBooked: boolean;
}

export interface Consultation {
  id: string;
  studentId: string;
  expertId: string;
  expertName: string;
  slotId: string;
  date: string;
  time: string;
  mode: "video" | "audio" | "chat";
  status: "confirmed" | "completed" | "cancelled" | "rescheduled";
  studentNotes?: string;
  shareAssessmentConsent: boolean;
  parentalConsentAcknowledged: boolean;
  sessionRoomUrl: string;
  expertNotes?: string;
  expertRecommendedSteps?: string[];
  rating?: number;
  reviewComment?: string;
  createdAt: string;
}

// Activity Log & History
export interface ActivityLogItem {
  id: string;
  userId: string;
  type: "assessment" | "recommendation" | "career_view" | "career_save" | "career_compare" | "roadmap_start" | "mentor_chat" | "consultation";
  title: string;
  description: string;
  refId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

// Mentor Chat Message
export interface MentorMessage {
  id: string;
  sender: "user" | "mentor";
  content: string;
  groundedCareers?: string[];
  timestamp: string;
}

export interface MentorChatSession {
  id: string;
  userId: string;
  title: string;
  messages: MentorMessage[];
  createdAt: string;
  updatedAt: string;
}
