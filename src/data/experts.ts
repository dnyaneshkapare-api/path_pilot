import { Expert, ExpertAvailabilitySlot } from "@/types";

export const VERIFIED_EXPERTS: Expert[] = [
  {
    id: "exp-01",
    userId: "u-exp-01",
    name: "Dr. Ananya Deshmukh",
    headline: "Principal Research Scientist & Ex-IIT Assistant Professor",
    qualifications: ["Ph.D. in Computer Science (IIT Bombay)", "M.Tech (IIT Delhi)", "Senior Member IEEE"],
    specialization: "Engineering & IT",
    languages: ["English", "Hindi", "Marathi"],
    experienceYears: 14,
    isVerifiedByAdmin: true,
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256",
    bio: "Passionate about mentoring high school students, engineering undergraduates, and career switchers navigating AI, computer science, and higher study options in India and abroad.",
    hourlyRateINR: 0, // Free pro-bono consultation for public welfare
    availableModes: ["video", "audio", "chat"],
    rating: 4.9,
    reviewsCount: 42
  },
  {
    id: "exp-02",
    userId: "u-exp-02",
    name: "Rajesh K. Verma, FCA",
    headline: "Chartered Accountant & Strategic Financial Controller",
    qualifications: ["FCA (Institute of Chartered Accountants of India)", "DISA (ICAI)", "B.Com (Hons, SRCC)"],
    specialization: "Commerce, Law & Finance",
    languages: ["English", "Hindi"],
    experienceYears: 16,
    isVerifiedByAdmin: true,
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256",
    bio: "Guided over 200+ students through the CA Foundation, Intermediate, and Articleship selection journey with real-world clarity on accounting, audit, and corporate finance paths.",
    hourlyRateINR: 0,
    availableModes: ["video", "chat"],
    rating: 4.8,
    reviewsCount: 38
  },
  {
    id: "exp-03",
    userId: "u-exp-03",
    name: "Pooja Hegde, M.Des",
    headline: "Lead Product Designer & Design Mentor",
    qualifications: ["M.Des in Interaction Design (National Institute of Design - NID)", "B.Arch"],
    specialization: "Design & Arts",
    languages: ["English", "Hindi", "Marathi"],
    experienceYears: 9,
    isVerifiedByAdmin: true,
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256",
    bio: "Demystifies creative careers in UX/UI, Industrial Design, and Digital Arts for 10th and 12th standard students. Portfolio review, entrance exam guidance, and career landscape.",
    hourlyRateINR: 0,
    availableModes: ["video", "audio"],
    rating: 5.0,
    reviewsCount: 29
  },
  {
    id: "exp-04",
    userId: "u-exp-04",
    name: "Dr. Vikramaditya Joshi, MBBS, MD",
    headline: "Public Health Consultant & Medical Educator",
    qualifications: ["MBBS (KEM Hospital Mumbai)", "MD Community Medicine (AIIMS New Delhi)"],
    specialization: "Medicine & Healthcare",
    languages: ["English", "Hindi", "Marathi"],
    experienceYears: 12,
    isVerifiedByAdmin: true,
    avatarUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256",
    bio: "Helping medical aspirants and nursing/allied health students understand NEET-UG expectations, college options, work-life realities, and alternative healthcare pathways.",
    hourlyRateINR: 0,
    availableModes: ["video", "chat"],
    rating: 4.9,
    reviewsCount: 51
  }
];

export const INITIAL_EXPERT_SLOTS: ExpertAvailabilitySlot[] = [
  { id: "slot-01", expertId: "exp-01", date: "2026-10-26", startTime: "16:00", endTime: "16:45", isBooked: false },
  { id: "slot-02", expertId: "exp-01", date: "2026-10-26", startTime: "17:00", endTime: "17:45", isBooked: false },
  { id: "slot-03", expertId: "exp-01", date: "2026-10-27", startTime: "11:00", endTime: "11:45", isBooked: false },
  { id: "slot-04", expertId: "exp-02", date: "2026-10-26", startTime: "15:00", endTime: "15:45", isBooked: false },
  { id: "slot-05", expertId: "exp-02", date: "2026-10-28", startTime: "18:00", endTime: "18:45", isBooked: false },
  { id: "slot-06", expertId: "exp-03", date: "2026-10-27", startTime: "14:00", endTime: "14:45", isBooked: false },
  { id: "slot-07", expertId: "exp-03", date: "2026-10-29", startTime: "16:30", endTime: "17:15", isBooked: false },
  { id: "slot-08", expertId: "exp-04", date: "2026-10-26", startTime: "19:00", endTime: "19:45", isBooked: false },
  { id: "slot-09", expertId: "exp-04", date: "2026-10-30", startTime: "10:30", endTime: "11:15", isBooked: false }
];
