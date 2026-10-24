import { LearningRoadmap } from "@/types";

export const VERIFIED_ROADMAPS: LearningRoadmap[] = [
  {
    id: "rdm-01",
    careerId: "car-01",
    careerTitle: "Full Stack Software Engineer",
    overview: "A comprehensive, 4-tier structured learning path from algorithmic foundations to microservice architectures with verified free & certified options.",
    steps: [
      {
        stepNumber: 0,
        level: "Level 0 Explore",
        title: "Digital Systems & Computational Thinking",
        description: "Understand how the Internet, browsers, operating systems, and computer memory work together.",
        prerequisites: ["Curiosity and basic computer literacy"],
        courses: [
          {
            id: "c-001",
            title: "CS50x: Introduction to Computer Science",
            provider: "Harvard University / edX",
            isFree: true,
            costINR: 0,
            durationWeeks: 10,
            language: "English",
            hasCertificate: true,
            url: "https://pll.harvard.edu/course/cs50-introduction-computer-science",
            verifiedDate: "2026-03-01"
          },
          {
            id: "c-002",
            title: "Joy of Computing using Python",
            provider: "NPTEL / IIT Ropar (Swayam)",
            isFree: true,
            costINR: 0,
            durationWeeks: 12,
            language: "English / Hindi Subtitles",
            hasCertificate: true,
            url: "https://nptel.ac.in/courses/106106182",
            verifiedDate: "2026-02-15"
          }
        ],
        practicalProject: {
          title: "Interactive Terminal Portfolio & Command-line Game",
          deliverable: "A multi-choice text adventure game and profile builder in Python with Git tracking",
          estimatedHours: 12
        }
      },
      {
        stepNumber: 1,
        level: "Level 1 Foundations",
        title: "Web Standards & Semantic Engineering",
        description: "Master semantic HTML5, modern CSS grid/flexbox, TypeScript syntax, and modular functions.",
        prerequisites: ["Basic logic and variables from Level 0"],
        courses: [
          {
            id: "c-003",
            title: "Responsive Web Design Certification",
            provider: "freeCodeCamp",
            isFree: true,
            costINR: 0,
            durationWeeks: 6,
            language: "English",
            hasCertificate: true,
            url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
            verifiedDate: "2026-03-20"
          },
          {
            id: "c-004",
            title: "Programming, Data Structures and Algorithms Using Python",
            provider: "NPTEL / IIT Madras",
            isFree: true,
            costINR: 0,
            durationWeeks: 8,
            language: "English",
            hasCertificate: true,
            url: "https://nptel.ac.in",
            verifiedDate: "2026-01-10"
          }
        ],
        practicalProject: {
          title: "Accessible Community Event Portal",
          deliverable: "A fully responsive, keyboard-navigable landing page with CSS themes and client-side form validation",
          estimatedHours: 20
        }
      },
      {
        stepNumber: 2,
        level: "Level 2 Practical Skills",
        title: "Full-Stack Application Development & Relational Databases",
        description: "Construct scalable REST APIs, manage database transactions in PostgreSQL, and build interactive React interfaces.",
        prerequisites: ["Level 1 HTML/CSS/JavaScript"],
        courses: [
          {
            id: "c-005",
            title: "Full Stack Open (React, Node, GraphQL, TypeScript)",
            provider: "University of Helsinki",
            isFree: true,
            costINR: 0,
            durationWeeks: 12,
            language: "English",
            hasCertificate: true,
            url: "https://fullstackopen.com/en/",
            verifiedDate: "2026-03-15"
          },
          {
            id: "c-006",
            title: "Database Management System (DBMS)",
            provider: "NPTEL / IIT Kharagpur",
            isFree: true,
            costINR: 0,
            durationWeeks: 8,
            language: "English",
            hasCertificate: true,
            url: "https://nptel.ac.in",
            verifiedDate: "2026-02-18"
          }
        ],
        practicalProject: {
          title: "Multi-User Task Management & Analytics Engine",
          deliverable: "Next.js + Node/FastAPI app with JWT authentication, role access control, and PostgreSQL backend",
          estimatedHours: 35
        }
      },
      {
        stepNumber: 3,
        level: "Level 3 Specialize",
        title: "Cloud Infrastructure, System Design & Security Hardening",
        description: "Deploy microservices on Docker/Kubernetes, configure CI/CD pipelines, and harden applications against OWASP Top 10 vulnerabilities.",
        prerequisites: ["Level 2 Full-Stack proficiency"],
        courses: [
          {
            id: "c-007",
            title: "Introduction to DevOps and Cloud Computing",
            provider: "IBM / Coursera (Audit Free)",
            isFree: true,
            costINR: 0,
            durationWeeks: 6,
            language: "English",
            hasCertificate: false,
            url: "https://www.coursera.org",
            verifiedDate: "2026-02-28"
          }
        ],
        practicalProject: {
          title: "Production Distributed Microservice with Auto-Scaling & CI/CD",
          deliverable: "Containerized application with Docker compose, GitHub Actions automated testing, and CDN caching",
          estimatedHours: 45
        }
      }
    ]
  },
  {
    id: "rdm-02",
    careerId: "car-02",
    careerTitle: "Data Scientist & AI Practitioner",
    overview: "Mathematical rigor to production model evaluation: statistics, feature engineering, and neural network fundamentals.",
    steps: [
      {
        stepNumber: 0,
        level: "Level 0 Explore",
        title: "Mathematical Foundations & Visual Curiosity",
        description: "Revitalize essential linear algebra vectors, matrix operations, and probabilistic distributions.",
        prerequisites: ["High school algebra"],
        courses: [
          {
            id: "c-008",
            title: "Mathematics for Machine Learning: Linear Algebra",
            provider: "Imperial College London / Coursera (Free Audit)",
            isFree: true,
            costINR: 0,
            durationWeeks: 5,
            language: "English",
            hasCertificate: false,
            url: "https://www.coursera.org",
            verifiedDate: "2026-03-10"
          }
        ],
        practicalProject: {
          title: "Exploratory Data Analysis Notebook on Public Datasets",
          deliverable: "Jupyter notebook exploring India Census or weather data with Pandas and Seaborn charts",
          estimatedHours: 15
        }
      },
      {
        stepNumber: 1,
        level: "Level 1 Foundations",
        title: "Scientific Python & Statistical Inference",
        description: "Formulate statistical hypotheses, calculate p-values, and clean multivariate real-world tables.",
        prerequisites: ["Level 0 Mathematics"],
        courses: [
          {
            id: "c-009",
            title: "Python for Data Science",
            provider: "NPTEL / IIT Madras",
            isFree: true,
            costINR: 0,
            durationWeeks: 8,
            language: "English",
            hasCertificate: true,
            url: "https://nptel.ac.in",
            verifiedDate: "2026-01-25"
          }
        ],
        practicalProject: {
          title: "Automated Data Cleaning & Outlier Detection Pipeline",
          deliverable: "Reusable Python script handling null imputations, one-hot encoding, and feature scaling",
          estimatedHours: 22
        }
      },
      {
        stepNumber: 2,
        level: "Level 2 Practical Skills",
        title: "Supervised & Unsupervised Machine Learning",
        description: "Train regressions, decision trees, random forests, and k-means clustering with scikit-learn.",
        prerequisites: ["Level 1 Python and Statistics"],
        courses: [
          {
            id: "c-010",
            title: "Machine Learning Specialization",
            provider: "DeepLearning.AI & Stanford / Coursera",
            isFree: true,
            costINR: 0,
            durationWeeks: 10,
            language: "English",
            hasCertificate: false,
            url: "https://www.coursera.org",
            verifiedDate: "2026-02-12"
          }
        ],
        practicalProject: {
          title: "Predictive Real Estate or Credit Risk Model with Scikit-Learn",
          deliverable: "Model evaluation report with cross-validation, confusion matrices, ROC-AUC, and feature importance",
          estimatedHours: 30
        }
      },
      {
        stepNumber: 3,
        level: "Level 3 Specialize",
        title: "Deep Learning, NLP & Responsible AI Auditing",
        description: "Fine-tune transformer models, implement retrieval-augmented generation (RAG), and audit models for ethical bias.",
        prerequisites: ["Level 2 Machine Learning"],
        courses: [
          {
            id: "c-011",
            title: "Practical Deep Learning for Coders",
            provider: "fast.ai",
            isFree: true,
            costINR: 0,
            durationWeeks: 8,
            language: "English",
            hasCertificate: false,
            url: "https://course.fast.ai/",
            verifiedDate: "2026-03-05"
          }
        ],
        practicalProject: {
          title: "End-to-End Verified Document Question Answering System",
          deliverable: "FastAPI inference backend serving a lightweight vector database with citation extraction",
          estimatedHours: 40
        }
      }
    ]
  }
];

export function getRoadmapByCareerId(careerId: string): LearningRoadmap | undefined {
  return VERIFIED_ROADMAPS.find(r => r.careerId === careerId);
}
