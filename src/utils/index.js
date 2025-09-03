import { jwtDecode } from "jwt-decode";

const STORAGE_KEY = "token";

export function getUser() {
  const token = localStorage.getItem(STORAGE_KEY)
  if (token === null)
    return null
  const decodedToken = jwtDecode(token)
  return decodedToken
}


/**
 * Security Scoring Utilities
 * Implements the security rating system for tokens based on client requirements
 */

// Wallet Age Scoring Constants
const WALLET_AGE_SCORING = {
  SIX_MONTHS_PLUS: { minDays: 180, score: 100 },
  THREE_TO_SIX_MONTHS: { minDays: 90, maxDays: 179, score: 70 },
  ONE_TO_THREE_MONTHS: { minDays: 30, maxDays: 89, score: 40 },
  LESS_THAN_ONE_MONTH: { maxDays: 29, minScore: 0, maxScore: 20 }
};

// Token Concentration Scoring Constants (Top 25 holders percentage)
const CONCENTRATION_SCORING = {
  LESS_THAN_20_PERCENT: { maxPercentage: 20, score: 100 },
  TWENTY_TO_FORTY_PERCENT: { minPercentage: 20, maxPercentage: 40, score: 70 },
  FORTY_TO_SIXTY_PERCENT: { minPercentage: 40, maxPercentage: 60, score: 40 },
  SIXTY_PLUS_PERCENT: { minPercentage: 60, minScore: 0, maxScore: 20 }
};

// Top 25 Holders Analysis Scoring Constants
const TOP_25_ANALYSIS_SCORING = {
  SEVENTY_PLUS_PERCENT_OLD: { minPercentage: 70, score: 100 },
  FORTY_TO_SEVENTY_PERCENT_OLD: { minPercentage: 40, maxPercentage: 69, score: 60 },
  LESS_THAN_FORTY_PERCENT_OLD: { maxPercentage: 39, score: 20 }
};

// VPN Detection Scoring Constants
const VPN_SCORING = {
  NO_VPN: { score: 100 },
  VPN_DETECTED: { minScore: 30, maxScore: 50 }
};

// Security Score Weights
const SECURITY_WEIGHTS = {
  WALLET_AGE: 0.25,      // 25%
  HOLDER_DISTRIBUTION: 0.35, // 35%
  TOP_25_ANALYSIS: 0.25, // 25%
  VPN_DETECTION: 0.15    // 15%
};

/**
* Calculate wallet age security score
* @param {number} ageInDays - Wallet age in days
* @returns {number} Score between 0-100
*/
export function calculateWalletAgeScore(ageInDays) {
  if (ageInDays >= WALLET_AGE_SCORING.SIX_MONTHS_PLUS.minDays) {
      return WALLET_AGE_SCORING.SIX_MONTHS_PLUS.score;
  }
  
  if (ageInDays >= WALLET_AGE_SCORING.THREE_TO_SIX_MONTHS.minDays && 
      ageInDays <= WALLET_AGE_SCORING.THREE_TO_SIX_MONTHS.maxDays) {
      return WALLET_AGE_SCORING.THREE_TO_SIX_MONTHS.score;
  }
  
  if (ageInDays >= WALLET_AGE_SCORING.ONE_TO_THREE_MONTHS.minDays && 
      ageInDays <= WALLET_AGE_SCORING.ONE_TO_THREE_MONTHS.maxDays) {
      return WALLET_AGE_SCORING.ONE_TO_THREE_MONTHS.score;
  }
  
  // Less than 1 month: linear interpolation between 0-20
  if (ageInDays <= WALLET_AGE_SCORING.LESS_THAN_ONE_MONTH.maxDays) {
      const maxDays = WALLET_AGE_SCORING.LESS_THAN_ONE_MONTH.maxDays;
      const minScore = WALLET_AGE_SCORING.LESS_THAN_ONE_MONTH.minScore;
      const maxScore = WALLET_AGE_SCORING.LESS_THAN_ONE_MONTH.maxScore;
      
      return Math.max(minScore, Math.min(maxScore, (ageInDays / maxDays) * maxScore));
  }
  
  return 0;
}

/**
* Calculate token concentration security score (top 25 holders percentage)
* @param {number} top25Percentage - Percentage held by top 25 wallets
* @returns {number} Score between 0-100
*/
export function calculateConcentrationScore(top25Percentage) {
  if (top25Percentage <= CONCENTRATION_SCORING.LESS_THAN_20_PERCENT.maxPercentage) {
      return CONCENTRATION_SCORING.LESS_THAN_20_PERCENT.score;
  }
  
  if (top25Percentage <= CONCENTRATION_SCORING.TWENTY_TO_FORTY_PERCENT.maxPercentage) {
      return CONCENTRATION_SCORING.TWENTY_TO_FORTY_PERCENT.score;
  }
  
  if (top25Percentage <= CONCENTRATION_SCORING.FORTY_TO_SIXTY_PERCENT.maxPercentage) {
      return CONCENTRATION_SCORING.FORTY_TO_SIXTY_PERCENT.score;
  }
  
  // 60%+: linear interpolation between 0-20 (more concentration = lower score)
  if (top25Percentage >= CONCENTRATION_SCORING.SIXTY_PLUS_PERCENT.minPercentage) {
      const minScore = CONCENTRATION_SCORING.SIXTY_PLUS_PERCENT.minScore;
      const maxScore = CONCENTRATION_SCORING.SIXTY_PLUS_PERCENT.maxScore;
      const maxConcentration = 100; // 100% is worst case
      
      // Inverse relationship: higher percentage = lower score
      const score = maxScore - ((top25Percentage - 60) / (maxConcentration - 60)) * (maxScore - minScore);
      return Math.max(minScore, Math.min(maxScore, score));
  }
  
  return 0;
}

/**
* Calculate top 25 holders analysis security score
* @param {number} percentageOldWallets - Percentage of top 25 wallets older than 3 months
* @returns {number} Score between 0-100
*/
export function calculateTop25AnalysisScore(percentageOldWallets) {
  if (percentageOldWallets >= TOP_25_ANALYSIS_SCORING.SEVENTY_PLUS_PERCENT_OLD.minPercentage) {
      return TOP_25_ANALYSIS_SCORING.SEVENTY_PLUS_PERCENT_OLD.score;
  }
  
  if (percentageOldWallets >= TOP_25_ANALYSIS_SCORING.FORTY_TO_SEVENTY_PERCENT_OLD.minPercentage) {
      return TOP_25_ANALYSIS_SCORING.FORTY_TO_SEVENTY_PERCENT_OLD.score;
  }
  
  if (percentageOldWallets <= TOP_25_ANALYSIS_SCORING.LESS_THAN_FORTY_PERCENT_OLD.maxPercentage) {
      return TOP_25_ANALYSIS_SCORING.LESS_THAN_FORTY_PERCENT_OLD.score;
  }
  
  return 0;
}

/**
* Calculate VPN detection security score
* @param {boolean} isVPN - Whether VPN was detected
* @param {number} vpnScore - VPN probability score (0-1)
* @returns {number} Score between 0-100
*/
export function calculateVPNScore(isVPN, vpnScore) {
  if (!isVPN) {
      return VPN_SCORING.NO_VPN.score;
  }
  
  // VPN detected: score between 30-50 based on VPN probability
  const minScore = VPN_SCORING.VPN_DETECTED.minScore;
  const maxScore = VPN_SCORING.VPN_DETECTED.maxScore;
  
  // Higher VPN probability = slightly lower score within the 30-50 range
  const score = maxScore - (vpnScore * (maxScore - minScore));
  return Math.max(minScore, Math.min(maxScore, score));
}

/**
* Calculate overall security score with weighted average
* @param {Object} scores - Individual component scores
* @param {number} scores.walletAge - Wallet age score
* @param {number} scores.concentration - Concentration score
* @param {number} scores.top25Analysis - Top 25 analysis score
* @param {number} scores.vpn - VPN score
* @returns {number} Overall security score between 0-100
*/
export function calculateOverallSecurityScore(scores) {
  const weightedSum = 
      (scores.walletAge * SECURITY_WEIGHTS.WALLET_AGE) +
      (scores.concentration * SECURITY_WEIGHTS.HOLDER_DISTRIBUTION) +
      (scores.top25Analysis * SECURITY_WEIGHTS.TOP_25_ANALYSIS) +
      (scores.vpn * SECURITY_WEIGHTS.VPN_DETECTION);
  
  return Math.round(weightedSum * 100) / 100; // Round to 2 decimal places
}

/**
* Get security rating interpretation (Green/Yellow/Red)
* @param {number} overallScore - Overall security score (0-100)
* @returns {Object} Interpretation object with color and message
*/
export function getSecurityRating(overallScore) {
  if (overallScore >= 80) {
      return {
          color: 'green',
          level: 'safe',
          message: 'Likely safe, decentralized, older wallets'
      };
  } else if (overallScore >= 50) {
      return {
          color: 'yellow', 
          level: 'medium',
          message: 'Medium risk — investigate further'
      };
  } else {
      return {
          color: 'red',
          level: 'high',
          message: 'High risk — new wallets, concentrated supply, VPN detected'
      };
  }
}
