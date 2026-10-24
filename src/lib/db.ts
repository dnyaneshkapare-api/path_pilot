import { User, InterestAssessmentRecord, Consultation, ActivityLogItem, ExpertAvailabilitySlot } from "@/types";
import { INITIAL_EXPERT_SLOTS, VERIFIED_EXPERTS } from "@/data/experts";
import bcrypt from "bcryptjs";

// In-memory persistent database singleton for testing & local development
export class LocalDataStore {
  private static instance: LocalDataStore;

  public users: Map<string, User> = new Map();
  public assessments: Map<string, InterestAssessmentRecord[]> = new Map(); // userId -> list
  public consultations: Map<string, Consultation> = new Map();
  public activityLogs: Map<string, ActivityLogItem[]> = new Map(); // userId -> list
  public savedCareers: Map<string, Set<string>> = new Map(); // userId -> Set of careerIds
  public slots: Map<string, ExpertAvailabilitySlot> = new Map();

  private constructor() {
    this.seedInitialData();
  }

  public static getInstance(): LocalDataStore {
    if (!LocalDataStore.instance) {
      LocalDataStore.instance = new LocalDataStore();
    }
    return LocalDataStore.instance;
  }

  private seedInitialData() {
    // Seed Demo Users (1 Student, 1 Expert, 1 Admin)
    const salt = bcrypt.genSaltSync(10);
    const demoPasswordHash = bcrypt.hashSync("PathCopilot@2026", salt);

    // Demo Student
    const studentUser: User = {
      id: "u-student-01",
      email: "student@pathcopilot.org",
      name: "Aarav Sharma",
      role: "student",
      passwordHash: demoPasswordHash,
      isEmailVerified: true,
      educationLevel: "12th",
      ageBand: "14_17",
      hasParentalConsent: true,
      interests: ["Programming", "Mathematics", "Science & Research"],
      activities: ["Coding", "Robotics club", "Solving math puzzles"],
      learningStyle: "hands_on",
      budget: "moderate",
      location: "Pune, Maharashtra",
      careerGoals: ["Software Engineer", "AI Researcher"],
      createdAt: "2026-03-01T10:00:00.000Z",
      updatedAt: "2026-04-10T12:00:00.000Z"
    };
    this.users.set(studentUser.id, studentUser);

    // Demo Expert
    const expertUser: User = {
      id: "u-exp-01",
      email: "expert@pathcopilot.org",
      name: "Dr. Ananya Deshmukh",
      role: "expert",
      passwordHash: demoPasswordHash,
      isEmailVerified: true,
      educationLevel: "postgrad",
      ageBand: "25_plus",
      createdAt: "2026-01-15T08:00:00.000Z",
      updatedAt: "2026-04-01T08:00:00.000Z"
    };
    this.users.set(expertUser.id, expertUser);

    // Demo Admin
    const adminUser: User = {
      id: "u-admin-01",
      email: "admin@pathcopilot.org",
      name: "System Security Admin",
      role: "admin",
      passwordHash: demoPasswordHash,
      isEmailVerified: true,
      educationLevel: "postgrad",
      ageBand: "25_plus",
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-04-01T00:00:00.000Z"
    };
    this.users.set(adminUser.id, adminUser);

    // Seed Slots
    for (const slot of INITIAL_EXPERT_SLOTS) {
      this.slots.set(slot.id, { ...slot });
    }

    // Seed Initial Activity Log for Student
    this.activityLogs.set(studentUser.id, [
      {
        id: "act-01",
        userId: studentUser.id,
        type: "assessment",
        title: "Completed RIASEC Assessment",
        description: "Assessed primary interest code IRC (Investigative, Realistic, Conventional) with version 2.4.0",
        createdAt: "2026-04-02T14:30:00.000Z"
      },
      {
        id: "act-02",
        userId: studentUser.id,
        type: "career_save",
        title: "Saved Career",
        description: "Full Stack Software Engineer added to target pathways",
        refId: "car-01",
        createdAt: "2026-04-02T15:10:00.000Z"
      },
      {
        id: "act-03",
        userId: studentUser.id,
        type: "roadmap_start",
        title: "Started Learning Roadmap",
        description: "Enrolled in Level 0 of Full Stack Engineering: CS50x",
        refId: "rdm-01",
        createdAt: "2026-04-05T09:00:00.000Z"
      }
    ]);

    // Seed Saved Career
    this.savedCareers.set(studentUser.id, new Set(["car-01", "car-02"]));
  }

  public getUserByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find(u => u.email.toLowerCase() === email.toLowerCase());
  }
}

export const db = LocalDataStore.getInstance();
