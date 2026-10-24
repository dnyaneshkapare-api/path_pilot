import { Career, CareerScoreBreakdown, RIASECScore, User } from "@/types";
import { VERIFIED_CAREERS } from "@/data/careers";

export interface RecommendationEngineWeights {
  I: number; // Interest RIASEC alignment (default 0.35)
  A: number; // Activity/skills match (default 0.20)
  G: number; // Goal alignment (default 0.15)
  P: number; // Practical constraints (budget/education/style) (default 0.15)
  F: number; // Future scope and demand (default 0.15)
}

export const DEFAULT_WEIGHTS: RecommendationEngineWeights = {
  I: 0.35,
  A: 0.20,
  G: 0.15,
  P: 0.15,
  F: 0.15,
};

export const MODEL_VERSION = "rec-v2.1-hybrid-riasec";

/**
 * Calculates interest alignment (0 - 100) between user RIASEC vector and career RIASEC code
 */
function calculateInterestScore(userRiasec: RIASECScore, careerCode: string): number {
  if (!userRiasec) return 50;

  // Primary letter of career gets weight 0.5, secondary 0.3, tertiary 0.2
  const primaryChar = careerCode[0] as keyof RIASECScore;
  const secondaryChar = (careerCode[1] || primaryChar) as keyof RIASECScore;
  const tertiaryChar = (careerCode[2] || secondaryChar) as keyof RIASECScore;

  const userP = userRiasec[primaryChar] || 0;
  const userS = userRiasec[secondaryChar] || 0;
  const userT = userRiasec[tertiaryChar] || 0;

  // Weighted normalized alignment
  const score = (userP * 0.5 + userS * 0.3 + userT * 0.2) * 10; // since scores are 0-10
  return Math.min(100, Math.max(0, Math.round(score)));
}

/**
 * Calculates activity & skill overlap (0 - 100)
 */
function calculateActivityScore(user: Partial<User>, career: Career): number {
  const userActivities = user.activities || [];
  const userInterests = user.interests || [];
  const combined = [...userActivities, ...userInterests].map(s => s.toLowerCase());

  if (combined.length === 0) return 60; // neutral prior

  let matches = 0;
  const careerKeywords = [...career.keySkills, ...career.typicalWorkWeek, career.cluster].map(s => s.toLowerCase());

  for (const item of combined) {
    if (careerKeywords.some(kw => kw.includes(item) || item.includes(kw))) {
      matches += 1;
    }
  }

  const ratio = matches / Math.max(2, combined.length);
  return Math.min(100, Math.max(20, Math.round(ratio * 100) + 30));
}

/**
 * Calculates goal alignment (0 - 100)
 */
function calculateGoalScore(user: Partial<User>, career: Career): number {
  const goals = user.careerGoals || [];
  if (goals.length === 0) return 65;

  const careerText = `${career.title} ${career.cluster} ${career.sectors.join(" ")}`.toLowerCase();
  let hits = 0;

  for (const g of goals) {
    if (careerText.includes(g.toLowerCase())) {
      hits += 1;
    }
  }

  const score = hits > 0 ? 85 : 55;
  return score;
}

/**
 * Calculates practical constraint fit (budget, education feasibility, learning style) (0 - 100)
 */
function calculatePracticalScore(user: Partial<User>, career: Career): number {
  let score = 70;

  // Budget comparison
  if (user.budget === "free" || user.budget === "low") {
    if (career.estimatedCostRange.subsidizedAlternativeAvailable) {
      score += 15;
    } else if (career.estimatedCostRange.minINR > 300000) {
      score -= 20;
    }
  } else if (user.budget === "high") {
    score += 10;
  }

  // Flexibility
  if (career.flexibility === "High") score += 10;

  return Math.min(100, Math.max(10, score));
}

/**
 * Calculates future scope & demand score (0 - 100)
 */
function calculateFutureScopeScore(career: Career): number {
  switch (career.demandLevel) {
    case "Very High":
      return 95;
    case "High":
      return 85;
    case "Growing":
      return 78;
    case "Moderate":
    default:
      return 65;
  }
}

/**
 * Performs separate eligibility check without excluding the career
 */
function checkEligibility(user: Partial<User>, career: Career) {
  const userEdu = user.educationLevel;
  const minReq = career.eligibility.minEducation;

  const eduLevels = ["10th", "12th", "diploma", "degree", "postgrad"];
  const userIndex = userEdu ? eduLevels.indexOf(userEdu) : 0;
  const minIndex = eduLevels.indexOf(minReq);

  const missingQualifications: string[] = [];

  if (userIndex < minIndex) {
    missingQualifications.push(
      `Requires ${minReq.toUpperCase()} or equivalent (Your current stage: ${userEdu || "Not specified"}).`
    );
  }

  if (career.eligibility.requiredStreams && career.eligibility.requiredStreams.length > 0) {
    missingQualifications.push(`Stream guidance: ${career.eligibility.requiredStreams.join(" OR ")}`);
  }

  return {
    isQualified: userIndex >= minIndex,
    missingQualifications,
    notice: userIndex < minIndex
      ? `This career requires foundational bridge stages (${minReq.toUpperCase()}), but you can explore preparatory steps right now.`
      : "You meet or are progressing toward the primary academic criteria for this pathway."
  };
}

/**
 * Synthesizes grounded AI explanation without hallucinating stats
 */
function generateEvidenceExplanation(
  user: Partial<User>,
  career: Career,
  score: number,
  components: { I: number; A: number; G: number; P: number; F: number },
  alternatives: Career[]
) {
  const whyItFits = `Matches your assessed RIASEC traits with an interest score of ${components.I}/100 and a future industry demand rating of ${components.F}/100. Key skills in ${career.keySkills.slice(0, 3).join(", ")} align with your stated curiosity and problem-solving goals.`;

  const caveatsAndUncertainty = `Score reflects the S(c) algorithmic formula assumptions and verified official data from ${career.sourceCitation.sourceName} (Verified: ${career.lastVerifiedDate}). Market hiring dynamics vary by geographic location and portfolio mastery.`;

  const suggestedAlternatives = alternatives
    .filter(a => a.id !== career.id && a.cluster === career.cluster)
    .slice(0, 3)
    .map(a => a.title);

  if (suggestedAlternatives.length === 0) {
    suggestedAlternatives.push(
      ...alternatives.filter(a => a.id !== career.id).slice(0, 2).map(a => a.title)
    );
  }

  return {
    whyItFits,
    caveatsAndUncertainty,
    suggestedAlternatives
  };
}

/**
 * Core Pipeline: Profile -> Features -> Candidate Retrieval -> Ranking -> Evidence -> Output
 */
export function generateCareerRecommendations(
  user: Partial<User>,
  userRiasec: RIASECScore,
  customWeights: Partial<RecommendationEngineWeights> = {}
): CareerScoreBreakdown[] {
  const weights: RecommendationEngineWeights = {
    ...DEFAULT_WEIGHTS,
    ...customWeights,
  };

  const results: CareerScoreBreakdown[] = VERIFIED_CAREERS.map(career => {
    const I = calculateInterestScore(userRiasec, career.riasecCode);
    const A = calculateActivityScore(user, career);
    const G = calculateGoalScore(user, career);
    const P = calculatePracticalScore(user, career);
    const F = calculateFutureScopeScore(career);

    // S(c) = 0.35I + 0.20A + 0.15G + 0.15P + 0.15F
    const totalScore = Math.round(
      weights.I * I +
      weights.A * A +
      weights.G * G +
      weights.P * P +
      weights.F * F
    );

    const eligibilityCheck = checkEligibility(user, career);

    const aiExplanation = generateEvidenceExplanation(
      user,
      career,
      totalScore,
      { I, A, G, P, F },
      VERIFIED_CAREERS
    );

    return {
      careerId: career.id,
      careerTitle: career.title,
      totalScore,
      formula: `S(c) = ${weights.I.toFixed(2)}I + ${weights.A.toFixed(2)}A + ${weights.G.toFixed(2)}G + ${weights.P.toFixed(2)}P + ${weights.F.toFixed(2)}F`,
      components: { I, A, G, P, F },
      weights,
      eligibilityCheck,
      aiExplanation,
      modelVersion: MODEL_VERSION
    };
  });

  // Sort descending by totalScore
  return results.sort((a, b) => b.totalScore - a.totalScore);
}
