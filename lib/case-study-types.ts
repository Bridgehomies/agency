export interface CaseStudySummaryRow {
  label: string
  value: string
}

export interface CaseStudyFeature {
  title: string
  description: string
}

export interface CaseStudyChallenge {
  title: string
  points: string[]
}

export interface CaseStudyData {
  slug: string
  name: string
  category: string
  tagline: string
  targetUsers: string
  status: string
  liveUrl?: string
  heroSummary: string
  challengeIntro: string
  challengePoints: string[]
  solutionIntro: string
  solutionPoints: string[]
  features: CaseStudyFeature[]
  techStack: { label: string; value: string }[]
  engineeringChallenges: CaseStudyFeature[]
  resultIntro: string
  resultPoints: string[]
  businessValue: string[]
  summaryTable: CaseStudySummaryRow[]
  finalOutcome: string
}