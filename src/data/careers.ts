import { Career } from "@/types";

export const VERIFIED_CAREERS: Career[] = [
  {
    id: "car-01",
    title: "Full Stack Software Engineer",
    titleHi: "फुल स्टैक सॉफ्टवेयर इंजीनियर",
    titleMr: "फुल स्टॅक सॉफ्टवेअर इंजिनिअर",
    slug: "full-stack-software-engineer",
    cluster: "Information Technology & Software",
    overview: "Architects, develops, tests, and deploys scalable web, cloud, and mobile software applications spanning user interfaces, backend APIs, and distributed database services.",
    riasecCode: "IRC",
    eligibility: {
      minEducation: "degree",
      requiredStreams: ["Science (PCM) preferred for B.Tech/B.E", "Any stream for BCA/B.Sc IT or accredited bootcamp"],
      entranceExams: ["JEE Main", "State CETs", "Direct College Entrance"],
      isEligibleDefaultMessage: "Degrees like B.Tech (CS/IT), BCA, or B.Sc Comp Sci are common, though skilled portfolio projects can also provide entry."
    },
    durationYears: "3 - 4 years",
    estimatedCostRange: {
      minINR: 80000,
      maxINR: 1200000,
      subsidizedAlternativeAvailable: true
    },
    flexibility: "High",
    demandLevel: "Very High",
    salaryRangeINR: {
      startingPerAnnum: 450000,
      midCareerPerAnnum: 1400000,
      seniorPerAnnum: 3200000,
      source: "NASSCOM Tech Talent Report & Ministry of Labour (NCS)",
      verifiedDate: "2026-03-15",
      region: "India (Pan-India Metro/Hybrid Average)"
    },
    typicalWorkWeek: [
      "Translating user requirements into responsive front-end and secure back-end code",
      "Designing database schemas, queries, and REST/GraphQL APIs",
      "Code reviews, performance profiling, and continuous deployment pipeline monitoring",
      "Collaborating in agile sprint planning, architectural standups, and documentation"
    ],
    keySkills: ["TypeScript / JavaScript", "Python / Go / Java", "React / Next.js", "SQL & NoSQL Databases", "Cloud Platforms (GCP/AWS)", "Git & CI/CD"],
    sectors: ["SaaS & Cloud Software", "FinTech & Banking", "E-Commerce", "HealthTech", "Global Capability Centers (GCCs)"],
    entryRoutes: [
      "10th → 12th (PCM) → B.Tech in Computer Science / IT",
      "10th → 12th (Any) → BCA → MCA",
      "10th → Polytechnic Diploma in CS → Lateral Entry to 2nd year B.Tech",
      "Open Courseware + Verified Open Source Contributions"
    ],
    evidenceLevel: "strong",
    sourceCitation: {
      sourceName: "National Career Service (NCS) & NASSCOM Industry Intelligence",
      publishedDate: "2026-01-10",
      verifiedDate: "2026-04-01",
      url: "https://www.ncs.gov.in"
    },
    lastVerifiedDate: "2026-04-01"
  },
  {
    id: "car-02",
    title: "Data Scientist & AI Practitioner",
    titleHi: "डेटा साइंटिस्ट और एआई विशेषज्ञ",
    titleMr: "डेटा सायंटिस्ट आणि एआय तज्ज्ञ",
    slug: "data-scientist-ai-practitioner",
    cluster: "Data Analytics & Artificial Intelligence",
    overview: "Extracts actionable insights from massive datasets, builds predictive statistical models, fine-tunes specialized machine learning pipelines, and evaluates algorithmic decisions.",
    riasecCode: "IRA",
    eligibility: {
      minEducation: "degree",
      requiredStreams: ["Mathematics, Statistics, Computer Science, or Engineering background"],
      entranceExams: ["JEE Main/Advanced", "GATE", "CUET PG"],
      isEligibleDefaultMessage: "Solid foundational grounding in calculus, linear algebra, and programming is indispensable."
    },
    durationYears: "3 - 4 years",
    estimatedCostRange: {
      minINR: 100000,
      maxINR: 1500000,
      subsidizedAlternativeAvailable: true
    },
    flexibility: "High",
    demandLevel: "Very High",
    salaryRangeINR: {
      startingPerAnnum: 550000,
      midCareerPerAnnum: 1650000,
      seniorPerAnnum: 3800000,
      source: "India AI Mission Workforce Survey & NITI Aayog AI Taskforce",
      verifiedDate: "2026-02-20",
      region: "India (Tech Hubs & Remote)"
    },
    typicalWorkWeek: [
      "Cleaning, normalizing, and feature engineering real-world messy datasets",
      "Training, validating, and benchmarking scikit-learn, PyTorch, and NLP models",
      "Monitoring data drift, model latency, and statistical fairness metrics",
      "Presenting evidence-grounded visual summaries to cross-functional stakeholders"
    ],
    keySkills: ["Python", "SQL", "Linear Algebra & Statistics", "Machine Learning & Scikit-learn", "Data Visualization (Pandas, Plotly)", "Responsible AI Practices"],
    sectors: ["Healthcare Diagnostics", "Algorithmic Finance & Risk", "Automotive & Robotics", "Consumer Tech", "Public Policy Analytics"],
    entryRoutes: [
      "10th → 12th (PCM with Statistics) → B.Sc Statistics / Data Science or B.Tech CS",
      "B.Tech / B.Sc → Specialized M.Sc or Data Science Certification",
      "Self-directed pathway via NPTEL / Swayam and Kaggle competition benchmarks"
    ],
    evidenceLevel: "strong",
    sourceCitation: {
      sourceName: "Ministry of Electronics and Information Technology (MeitY) - AI Capacity Blueprint",
      publishedDate: "2025-11-15",
      verifiedDate: "2026-03-12"
    },
    lastVerifiedDate: "2026-03-12"
  },
  {
    id: "car-03",
    title: "UI/UX & Product Designer",
    titleHi: "यूआई/यूएक्स और उत्पाद डिज़ाइनर",
    titleMr: "यूआय/यूएक्स आणि प्रॉडक्ट डिझायनर",
    slug: "ui-ux-product-designer",
    cluster: "Design, Media & Creative Arts",
    overview: "Researches user behavior, conceptualizes accessible user journeys, creates interactive design systems, and transforms complex technological flows into delightful digital products.",
    riasecCode: "AES",
    eligibility: {
      minEducation: "degree",
      requiredStreams: ["Open to any stream (Arts, Science, Commerce)"],
      entranceExams: ["UCEED", "NID DAT", "CEED (for PG)"],
      isEligibleDefaultMessage: "Degrees in Design (B.Des) or a portfolio of verified design case studies with user testing."
    },
    durationYears: "3 - 4 years",
    estimatedCostRange: {
      minINR: 60000,
      maxINR: 1400000,
      subsidizedAlternativeAvailable: true
    },
    flexibility: "High",
    demandLevel: "High",
    salaryRangeINR: {
      startingPerAnnum: 400000,
      midCareerPerAnnum: 1250000,
      seniorPerAnnum: 2800000,
      source: "Design in Tech National Census & Association of Designers of India",
      verifiedDate: "2026-01-30",
      region: "India (Pan-India)"
    },
    typicalWorkWeek: [
      "Conducting contextual user interviews, usability testing, and accessibility audits",
      "Designing wireframes, interactive prototypes, and production design tokens in Figma",
      "Handing off design specs and micro-interaction guidelines to engineering teams",
      "Iterating layouts based on user conversion metrics and behavioral telemetry"
    ],
    keySkills: ["User Research", "Wireframing & Prototyping (Figma)", "Information Architecture", "Design Systems", "Web Accessibility (WCAG 2.2)", "Design Thinking"],
    sectors: ["Digital Consumer Apps", "Enterprise SaaS", "E-Commerce", "FinTech", "Creative Studios & Agencies"],
    entryRoutes: [
      "10th → 12th (Any Stream) → B.Des / B.Sc in Interaction Design",
      "10th → 12th → Graduation in any field + Professional UI/UX Diploma & Portfolio",
      "Self-taught with real redesign briefs, open-source product audits, and design community mentorship"
    ],
    evidenceLevel: "strong",
    sourceCitation: {
      sourceName: "India Design Council & Department for Promotion of Industry and Internal Trade",
      publishedDate: "2025-10-18",
      verifiedDate: "2026-03-25"
    },
    lastVerifiedDate: "2026-03-25"
  },
  {
    id: "car-04",
    title: "Clinical Nurse Specialist & Healthcare Coordinator",
    titleHi: "क्लिनिकल नर्स स्पेशलिस्ट और हेल्थकेयर समन्वयक",
    titleMr: "क्लिनिकल नर्स स्पेशालिस्ट आणि आरोग्य समन्वयक",
    slug: "clinical-nurse-specialist",
    cluster: "Healthcare & Life Sciences",
    overview: "Delivers direct clinical patient care, monitors vital health trajectories, administers physician-prescribed therapeutics, and educates patients and families on post-treatment health protocols.",
    riasecCode: "SIR",
    eligibility: {
      minEducation: "degree",
      requiredStreams: ["Science with Physics, Chemistry & Biology (PCB) compulsory"],
      entranceExams: ["NEET-UG (for selected universities)", "State Nursing Entrance Tests"],
      isEligibleDefaultMessage: "B.Sc Nursing (4 years) or GNM diploma registered with Indian Nursing Council."
    },
    durationYears: "3 - 4 years",
    estimatedCostRange: {
      minINR: 50000,
      maxINR: 600000,
      subsidizedAlternativeAvailable: true
    },
    flexibility: "Low",
    demandLevel: "Very High",
    salaryRangeINR: {
      startingPerAnnum: 320000,
      midCareerPerAnnum: 750000,
      seniorPerAnnum: 1600000,
      source: "National Health Systems Resource Centre (NHSRC) & Indian Nursing Council",
      verifiedDate: "2026-03-01",
      region: "India (Hospital Networks & Global Opportunities)"
    },
    typicalWorkWeek: [
      "Assessing clinical patient health statuses and documenting vitals in EHR systems",
      "Administering intravenous medications, emergency support, and wound dressings",
      "Coordinating multi-specialty care rounds with attending doctors and diagnostics labs",
      "Counseling patient families on chronic disease self-management and diet protocols"
    ],
    keySkills: ["Clinical Patient Care", "Emergency Triage", "Pharmacology Awareness", "Patient Advocacy & Empathy", "Infection Control Protocols", "Medical Record Systems"],
    sectors: ["Tertiary Care Hospitals", "Specialty Surgical Centers", "Community Health Centers", "Clinical Research Organizations", "Home Healthcare Networks"],
    entryRoutes: [
      "10th → 12th (PCB with 50%+) → B.Sc Nursing (4 Years)",
      "10th → 12th → General Nursing and Midwifery (GNM 3.5 Years) → Post Basic B.Sc Nursing",
      "B.Sc Nursing → State Council Registration → Specialized Critical Care Certifications"
    ],
    evidenceLevel: "strong",
    sourceCitation: {
      sourceName: "Ministry of Health & Family Welfare - Human Resources for Health",
      publishedDate: "2025-12-05",
      verifiedDate: "2026-03-30"
    },
    lastVerifiedDate: "2026-03-30"
  },
  {
    id: "car-05",
    title: "Chartered Accountant & Financial Strategist",
    titleHi: "चार्टर्ड एकाउंटेंट और वित्तीय रणनीतिकार",
    titleMr: "चार्टर्ड अकाउंटंट आणि आर्थिक रणनीतीकार",
    slug: "chartered-accountant",
    cluster: "Finance, Banking & Accounting",
    overview: "Audits company accounts, advises on corporate tax compliance, prepares transparent balance sheets, conducts forensic fraud audits, and steers strategic corporate investments.",
    riasecCode: "CEI",
    eligibility: {
      minEducation: "degree",
      requiredStreams: ["Any stream eligible; Commerce (with Mathematics/Accountancy) highly advantageous"],
      entranceExams: ["CA Foundation Exam (conducted by ICAI)"],
      isEligibleDefaultMessage: "Pass 10+2, register with ICAI, clear Foundation, Intermediate, Articleship (2-3 yrs), and Final Exam."
    },
    durationYears: "4.5 - 5 years",
    estimatedCostRange: {
      minINR: 75000,
      maxINR: 350000,
      subsidizedAlternativeAvailable: true
    },
    flexibility: "Medium",
    demandLevel: "Very High",
    salaryRangeINR: {
      startingPerAnnum: 750000,
      midCareerPerAnnum: 1800000,
      seniorPerAnnum: 4500000,
      source: "Institute of Chartered Accountants of India (ICAI) Placement Cell",
      verifiedDate: "2026-03-10",
      region: "India (Pan-India Corporate & Independent Practice)"
    },
    typicalWorkWeek: [
      "Auditing statutory financial statements in compliance with Ind AS and IFRS",
      "Structuring tax filing documentation and representing clients in tax evaluations",
      "Performing budget variance analysis, cash flow forecasting, and cost rationalization",
      "Advising executive leadership on debt financing, M&A risk, and statutory compliance"
    ],
    keySkills: ["Auditing Standards", "Direct & Indirect Taxation (GST)", "Financial Modeling", "Corporate Law", "Analytical Problem Solving", "ERP Software (SAP/Tally Prime)"],
    sectors: ["Public Accounting Firms (Big 4 & Mid-tier)", "Multinational Corporations", "Banking & Financial Services", "Government Revenue Departments", "Independent Practice"],
    entryRoutes: [
      "10th → 12th → ICAI Foundation → Intermediate → 2-year Mandatory Articleship → Final",
      "Graduation (Commerce 55%+ / Non-Commerce 60%+) → Direct Entry to CA Intermediate → Articleship → Final",
      "Complement with B.Com or BBA simultaneously through distance or open universities"
    ],
    evidenceLevel: "strong",
    sourceCitation: {
      sourceName: "ICAI Annual Report & Placement Summary",
      publishedDate: "2026-02-14",
      verifiedDate: "2026-04-05"
    },
    lastVerifiedDate: "2026-04-05"
  },
  {
    id: "car-06",
    title: "Renewable Energy & Solar Systems Engineer",
    titleHi: "नवीकरणीय ऊर्जा और सौर प्रणाली इंजीनियर",
    titleMr: "अक्षय ऊर्जा आणि सौर ऊर्जा प्रणाली अभियंता",
    slug: "renewable-energy-solar-engineer",
    cluster: "Engineering & Green Technology",
    overview: "Designs rooftop and utility-scale solar photovoltaic plants, optimizes power grid distribution interfaces, simulates solar irradiance patterns, and oversees sustainable energy deployments.",
    riasecCode: "RIE",
    eligibility: {
      minEducation: "degree",
      requiredStreams: ["Science (PCM) compulsory"],
      entranceExams: ["JEE Main", "State Engineering Entrance Exams (MHT-CET, KCET, WBJEE)"],
      isEligibleDefaultMessage: "B.Tech/B.E in Electrical, Mechanical, Energy, or Environmental Engineering."
    },
    durationYears: "4 years",
    estimatedCostRange: {
      minINR: 90000,
      maxINR: 1100000,
      subsidizedAlternativeAvailable: true
    },
    flexibility: "Medium",
    demandLevel: "Very High",
    salaryRangeINR: {
      startingPerAnnum: 420000,
      midCareerPerAnnum: 1200000,
      seniorPerAnnum: 2600000,
      source: "Ministry of New and Renewable Energy (MNRE) & Skill Council for Green Jobs",
      verifiedDate: "2026-02-18",
      region: "India (Industrial, Solar Parks & Urban Commercial)"
    },
    typicalWorkWeek: [
      "Running photovoltaic plant capacity simulations using PVsyst and AutoCAD",
      "Assessing electrical grid synchronization, transformer sizing, and battery storage viability",
      "Conducting on-site structural and civil inspections for mounting safety",
      "Auditing energy efficiency metrics and regulatory net-metering approvals"
    ],
    keySkills: ["Solar PV System Design", "PVsyst & Helioscope", "Electrical Grid Engineering", "Energy Storage & Inverters", "AutoCAD", "Environmental Impact Assessment"],
    sectors: ["Solar EPC Companies", "Government Renewable Agencies (SECI)", "Industrial Green Energy Independent Power Producers", "EV Charging Infrastructure", "Smart Grid Utilities"],
    entryRoutes: [
      "10th → 12th (PCM) → B.Tech in Electrical / Energy Engineering",
      "10th → 3-year Diploma in Electrical Engineering → Lateral Entry B.Tech",
      "B.Tech Electrical → Certified Solar PV Design Professional (Suryamitra scheme)"
    ],
    evidenceLevel: "strong",
    sourceCitation: {
      sourceName: "Skill Council for Green Jobs (SCGJ) & MNRE India",
      publishedDate: "2025-11-20",
      verifiedDate: "2026-03-18"
    },
    lastVerifiedDate: "2026-03-18"
  },
  {
    id: "car-07",
    title: "Digital Marketing Strategist & Growth Analyst",
    titleHi: "डिजिटल मार्केटिंग रणनीतिकार",
    titleMr: "डिजिटल मार्केटिंग स्ट्रॅटेजिस्ट",
    slug: "digital-marketing-strategist",
    cluster: "Marketing, Media & Communication",
    overview: "Crafts data-driven audience acquisition strategies, runs search and social media campaigns, manages brand narrative across digital channels, and optimizes customer journey conversions.",
    riasecCode: "EAS",
    eligibility: {
      minEducation: "degree",
      requiredStreams: ["Open to any stream (Arts, Commerce, Science)"],
      entranceExams: ["College merit or general entrance (CUET-UG)"],
      isEligibleDefaultMessage: "Degrees in Mass Comm, BBA, B.Com, or hands-on certified skills in digital analytics."
    },
    durationYears: "3 years",
    estimatedCostRange: {
      minINR: 40000,
      maxINR: 800000,
      subsidizedAlternativeAvailable: true
    },
    flexibility: "High",
    demandLevel: "High",
    salaryRangeINR: {
      startingPerAnnum: 350000,
      midCareerPerAnnum: 950000,
      seniorPerAnnum: 2200000,
      source: "Internet and Mobile Association of India (IAMAI) Industry Report",
      verifiedDate: "2026-01-22",
      region: "India (Pan-India)"
    },
    typicalWorkWeek: [
      "Analyzing user search intent, competitive keywords, and organic search indexing",
      "Allocating paid campaign budgets across search engines and social platforms",
      "Running A/B tests on landing pages, ad copy, and email sequences",
      "Synthesizing Google Analytics, attribution funnels, and customer retention metrics"
    ],
    keySkills: ["SEO & Content Strategy", "Performance Advertising (Google Ads, Meta)", "Web Analytics (GA4)", "Copywriting & Storytelling", "Conversion Rate Optimization", "Marketing Automation"],
    sectors: ["D2C Consumer Brands", "B2B SaaS Companies", "Digital Advertising Agencies", "EdTech & FinTech", "Freelance & Creator Economy"],
    entryRoutes: [
      "10th → 12th (Any) → BBA / B.A Media Communication",
      "10th → 12th → Any Graduation + Practical certifications (Google, HubSpot, Meta)",
      "Portfolio route: Building and scaling a self-hosted content portal or niche e-commerce store"
    ],
    evidenceLevel: "strong",
    sourceCitation: {
      sourceName: "IAMAI & Federation of Indian Chambers of Commerce (FICCI)",
      publishedDate: "2025-10-15",
      verifiedDate: "2026-02-28"
    },
    lastVerifiedDate: "2026-02-28"
  },
  {
    id: "car-08",
    title: "Clinical Psychologist & Mental Health Counselor",
    titleHi: "क्लिनिकल मनोवैज्ञानिक और मानसिक स्वास्थ्य परामर्शदाता",
    titleMr: "क्लिनिकल मानसशास्त्रज्ञ आणि समुपदेशक",
    slug: "clinical-psychologist-counselor",
    cluster: "Healthcare & Mental Wellness",
    overview: "Conducts psychometric evaluations, provides evidence-based psychotherapy (CBT, DBT), counsels adolescents and adults through cognitive and emotional distress, and promotes mental hygiene.",
    riasecCode: "SIA",
    eligibility: {
      minEducation: "postgrad",
      requiredStreams: ["Any stream in 12th; Psychology/Biology preferred"],
      entranceExams: ["CUET-PG (M.A/M.Sc Psychology)", "National M.Phil/Psy.D Entrance Tests"],
      isEligibleDefaultMessage: "B.A/B.Sc Psychology (3-4 yrs) → M.A/M.Sc Clinical Psychology → RCI-recognized M.Phil or Psy.D for clinical license."
    },
    durationYears: "5 - 6 years",
    estimatedCostRange: {
      minINR: 60000,
      maxINR: 900000,
      subsidizedAlternativeAvailable: true
    },
    flexibility: "Medium",
    demandLevel: "Very High",
    salaryRangeINR: {
      startingPerAnnum: 360000,
      midCareerPerAnnum: 900000,
      seniorPerAnnum: 2000000,
      source: "Rehabilitation Council of India (RCI) & National Mental Health Survey",
      verifiedDate: "2026-02-11",
      region: "India (Hospitals, Clinics, Schools & Telehealth)"
    },
    typicalWorkWeek: [
      "Administering standardized psychometric tests and cognitive diagnostic batteries",
      "Conducting structured individual, family, and group cognitive counseling sessions",
      "Drafting clinical assessment reports and collaborating with psychiatric physicians",
      "Running stress-coping, mindfulness, and neurodiversity workshops in academic institutions"
    ],
    keySkills: ["Psychotherapy (CBT, ACT)", "Psychological Assessment Tools", "Active Listening & Empathy", "Crisis Intervention", "Ethical Confidentiality Compliance", "Case Formulation"],
    sectors: ["Multi-Specialty Hospitals", "Private Mental Health Practices", "Schools & Higher Education Campuses", "Employee Assistance Programs (EAPs)", "NGOs & Child Welfare Centers"],
    entryRoutes: [
      "10th → 12th (Any) → B.A / B.Sc in Psychology (3-4 years)",
      "Graduation → M.A / M.Sc in Clinical or Counseling Psychology",
      "Post-graduation → RCI Recognized M.Phil in Clinical Psychology (or approved 2-year Clinical Psy.D) for license"
    ],
    evidenceLevel: "strong",
    sourceCitation: {
      sourceName: "Rehabilitation Council of India & NIMHANS Clinical Guidelines",
      publishedDate: "2025-09-30",
      verifiedDate: "2026-03-15"
    },
    lastVerifiedDate: "2026-03-15"
  },
  {
    id: "car-09",
    title: "Robotics & Automation Specialist",
    titleHi: "रोबोटिक्स और ऑटोमेशन विशेषज्ञ",
    titleMr: "रोबोटिक्स आणि ऑटोमेशन तज्ज्ञ",
    slug: "robotics-automation-specialist",
    cluster: "Engineering & Advanced Manufacturing",
    overview: "Integrates mechanical arms, actuators, sensors, and real-time embedded computing to automate industrial manufacturing cells, logistics warehouses, and surgical assistance equipment.",
    riasecCode: "RIC",
    eligibility: {
      minEducation: "degree",
      requiredStreams: ["Science (PCM) compulsory"],
      entranceExams: ["JEE Main", "State Engineering Entrance Exams"],
      isEligibleDefaultMessage: "B.Tech in Mechatronics, Mechanical, Electronics, or Robotics Engineering."
    },
    durationYears: "4 years",
    estimatedCostRange: {
      minINR: 90000,
      maxINR: 1300000,
      subsidizedAlternativeAvailable: true
    },
    flexibility: "Low",
    demandLevel: "High",
    salaryRangeINR: {
      startingPerAnnum: 480000,
      midCareerPerAnnum: 1350000,
      seniorPerAnnum: 3000000,
      source: "Automotive Component Manufacturers Association (ACMA) & Robotics Society of India",
      verifiedDate: "2026-02-25",
      region: "India (Manufacturing Hubs & Robotics R&D)"
    },
    typicalWorkWeek: [
      "Programming Programmable Logic Controllers (PLCs), robotic arms, and ROS nodes",
      "Designing kinematic simulations and electrical sensor feedback circuits",
      "Deploying computer vision cameras for automated defect detection on factory lines",
      "Troubleshooting mechanical vibrations, pneumatic lines, and motor torque profiles"
    ],
    keySkills: ["Robot Operating System (ROS)", "PLC & SCADA Programming", "C++ / Python", "Embedded C & Microcontrollers", "Kinematics & Control Systems", "Industrial Computer Vision"],
    sectors: ["Automotive Assembly", "Electronics Hardware Manufacturing", "Warehousing & Supply Chain Automation", "Aerospace & Defense", "Agricultural Automation"],
    entryRoutes: [
      "10th → 12th (PCM) → B.Tech in Mechatronics / Robotics / Mechanical / Electronics",
      "10th → Polytechnic Diploma in Mechanical/Electrical → Lateral Entry B.Tech",
      "B.Tech → Hands-on participation in robotics student competitions (e-Yantra, Robocon)"
    ],
    evidenceLevel: "strong",
    sourceCitation: {
      sourceName: "Robotics Society of India (RSI) & Department of Heavy Industry",
      publishedDate: "2025-12-10",
      verifiedDate: "2026-03-20"
    },
    lastVerifiedDate: "2026-03-20"
  },
  {
    id: "car-10",
    title: "Corporate Law & Cyber Legal Consultant",
    titleHi: "कॉर्पोरेट कानून और साइबर कानूनी सलाहकार",
    titleMr: "कॉर्पोरेट विधी आणि सायबर कायदा सल्लागार",
    slug: "corporate-law-cyber-legal-consultant",
    cluster: "Law, Governance & Public Policy",
    overview: "Drafts and negotiates software service agreements, ensures data protection compliance (DPDP Act, GDPR), guides mergers, and counsels tech organizations during cybersecurity breaches.",
    riasecCode: "ECI",
    eligibility: {
      minEducation: "degree",
      requiredStreams: ["Open to any stream (Science, Commerce, Arts)"],
      entranceExams: ["CLAT (Common Law Admission Test)", "AILET", "LSAT-India", "State CET Law"],
      isEligibleDefaultMessage: "5-Year Integrated Law (B.A. LL.B / B.B.A. LL.B) after 12th or 3-Year LL.B after any graduation."
    },
    durationYears: "3 - 5 years",
    estimatedCostRange: {
      minINR: 80000,
      maxINR: 1500000,
      subsidizedAlternativeAvailable: true
    },
    flexibility: "Medium",
    demandLevel: "Very High",
    salaryRangeINR: {
      startingPerAnnum: 500000,
      midCareerPerAnnum: 1500000,
      seniorPerAnnum: 3600000,
      source: "Bar Council of India (BCI) Law Placement Trends & Tech Law Review",
      verifiedDate: "2026-03-05",
      region: "India (Metros & Corporate Hubs)"
    },
    typicalWorkWeek: [
      "Reviewing data privacy terms, service level contracts, and non-disclosure clauses",
      "Advising engineering teams on regulatory data compliance under India's DPDP Act",
      "Drafting legal notices, compliance dossiers, and intellectual property trademarks",
      "Conducting due diligence for venture capital financing rounds and acquisitions"
    ],
    keySkills: ["Corporate Contract Drafting", "Data Privacy & DPDP Compliance", "Intellectual Property Rights", "Legal Research & Statutory Analysis", "Negotiation", "Risk Mitigation"],
    sectors: ["Tech Enterprises & Startups", "Corporate Law Firms", "Investment Funds & Private Equity", "E-Commerce & Digital Marketplaces", "Independent Legal Counsel"],
    entryRoutes: [
      "10th → 12th (Any Stream) → CLAT Exam → 5-Year Integrated B.A. LL.B / B.B.A. LL.B",
      "Graduation (Any Stream) → 3-Year LL.B Degree",
      "LL.B → Bar Council of India Enrollment (AIBE Exam) → Specialization in Cyber & Tech Law"
    ],
    evidenceLevel: "strong",
    sourceCitation: {
      sourceName: "Bar Council of India & National Law University Placement Reports",
      publishedDate: "2026-01-18",
      verifiedDate: "2026-03-28"
    },
    lastVerifiedDate: "2026-03-28"
  },
  {
    id: "car-11",
    title: "Civil Services & Public Administration Officer (IAS / IPS / State PSC)",
    titleHi: "प्रशासनिक सेवा अधिकारी (आईएएस / आईपीएस)",
    titleMr: "प्रशासकीय सेवा अधिकारी (आयएएस / आयपीएस)",
    slug: "civil-services-public-administration",
    cluster: "Governance, Public Administration & Policy",
    overview: "Formulates and implements government welfare policies, oversees district revenue administration, enforces public law and order, and manages district-scale disaster response operations.",
    riasecCode: "ESC",
    eligibility: {
      minEducation: "degree",
      requiredStreams: ["Graduation in any discipline from a recognized university"],
      entranceExams: ["UPSC Civil Services Examination (CSE)", "State Public Service Commission Exams"],
      isEligibleDefaultMessage: "Age 21-32 (with category relaxations). Must clear Prelims, Mains (9 descriptive papers), and Personality Interview."
    },
    durationYears: "3 - 5 years (Degree + Exam Preparation)",
    estimatedCostRange: {
      minINR: 25000,
      maxINR: 350000,
      subsidizedAlternativeAvailable: true
    },
    flexibility: "Low",
    demandLevel: "Very High",
    salaryRangeINR: {
      startingPerAnnum: 672000,
      midCareerPerAnnum: 1400000,
      seniorPerAnnum: 2700000,
      source: "7th Central Pay Commission & Department of Personnel and Training (DoPT)",
      verifiedDate: "2026-01-15",
      region: "India (Pan-India Posting - Central / State cadres)"
    },
    typicalWorkWeek: [
      "Reviewing district development programs, public health clinics, and civic infrastructure",
      "Conducting public grievance redressal hearings and field inspections",
      "Coordinating multi-departmental emergency drills, law enforcement, and elections",
      "Drafting policy briefs, welfare budget allocations, and inter-agency reports"
    ],
    keySkills: ["Public Policy Analysis", "Crisis Decision Making", "Constitutional Law & Governance", "Administrative Leadership", "Ethical Integrity", "Multi-lingual Communication"],
    sectors: ["Central Government Ministries", "State Government Secretariats", "District Collectorates", "Public Sector Undertakings", "Diplomatic Services"],
    entryRoutes: [
      "10th → 12th (Any) → Graduation (B.A, B.Sc, B.Tech, B.Com, MBBS, etc.)",
      "Graduation Final Year → UPSC CSE Notification Registration → Prelims → Mains → Interview",
      "Alternative route: State Public Service Commissions (MPSC, UPPSC, KPSC, etc.)"
    ],
    evidenceLevel: "strong",
    sourceCitation: {
      sourceName: "Union Public Service Commission (UPSC) Annual Report & DoPT Gazettes",
      publishedDate: "2025-11-01",
      verifiedDate: "2026-03-10"
    },
    lastVerifiedDate: "2026-03-10"
  },
  {
    id: "car-12",
    title: "Bioinformatics & Computational Biologist",
    titleHi: "बायोइन्फॉर्मेटिक्स और कम्प्यूटेशनल जीवविज्ञानी",
    titleMr: "बायोइन्फॉर्मेटिक्स आणि संगणकीय जीवशास्त्रज्ञ",
    slug: "bioinformatics-computational-biologist",
    cluster: "Biotechnology, Genetics & Life Sciences",
    overview: "Applies computer science algorithms, statistical modeling, and database technologies to decode genomic sequences, predict protein folding structures, and accelerate targeted drug discovery.",
    riasecCode: "IRS",
    eligibility: {
      minEducation: "degree",
      requiredStreams: ["Science (PCB or PCM) with 50%+ in 12th"],
      entranceExams: ["NEET / CUET-UG / University Specific Tests"],
      isEligibleDefaultMessage: "B.Sc or B.Tech in Bioinformatics, Biotechnology, or Comp Sci with biological sciences bridge."
    },
    durationYears: "3 - 4 years",
    estimatedCostRange: {
      minINR: 70000,
      maxINR: 1000000,
      subsidizedAlternativeAvailable: true
    },
    flexibility: "High",
    demandLevel: "Growing",
    salaryRangeINR: {
      startingPerAnnum: 420000,
      midCareerPerAnnum: 1250000,
      seniorPerAnnum: 2700000,
      source: "Department of Biotechnology (DBT) India & BioSpectrum Industry Survey",
      verifiedDate: "2026-02-14",
      region: "India (Pharma Hubs & Research Institutes)"
    },
    typicalWorkWeek: [
      "Processing Next-Generation Sequencing (NGS) FASTQ/BAM genomic read outputs",
      "Running molecular dynamics simulations and ligand-receptor docking assays",
      "Writing reproducible Python and R statistical pipelines for biological experiments",
      "Curating genetic variant annotations against global reference databases (NCBI/UniProt)"
    ],
    keySkills: ["Python / R", "Genomic Sequence Alignment (BLAST, BWA)", "Structural Biology & AlphaFold", "Molecular Docking Tools", "Linux / High Performance Computing", "Biostatistics"],
    sectors: ["Pharmaceutical & Vaccine Manufacturers", "Agricultural Crop Genetics", "Clinical Genomics Diagnostic Labs", "Academic Research Institutes (IISc, IITs, CSIR)", "Biotech Startups"],
    entryRoutes: [
      "10th → 12th (PCB/PCM) → B.Sc/B.Tech in Bioinformatics or Biotechnology",
      "Graduation → M.Sc Bioinformatics / Computational Biology (via GAT-B exam)",
      "B.Tech Computer Science → M.S in Computational Life Sciences"
    ],
    evidenceLevel: "strong",
    sourceCitation: {
      sourceName: "Department of Biotechnology, Ministry of Science and Technology",
      publishedDate: "2025-10-25",
      verifiedDate: "2026-03-14"
    },
    lastVerifiedDate: "2026-03-14"
  }
];

// Helper to look up career by slug or id
export function getCareerByIdOrSlug(idOrSlug: string): Career | undefined {
  return VERIFIED_CAREERS.find(c => c.id === idOrSlug || c.slug === idOrSlug);
}
