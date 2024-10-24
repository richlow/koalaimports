import { skillsDatabase } from './skillsDatabase';

interface Finding {
  type: 'positive' | 'negative';
  text: string;
}

interface AnalysisResults {
  matchScore: number;
  findings: Finding[];
  missingKeywords: string[];
  matchedKeywords: string[];
  suggestions: string[];
}

export const analyzeText = (resumeText: string, jobDescription: string): AnalysisResults => {
  // Extract keywords from job description
  const jobKeywords = extractKeywords(jobDescription);
  const resumeKeywords = extractKeywords(resumeText);
  
  // Find matching and missing keywords with fuzzy matching
  const matched = jobKeywords.filter(keyword => 
    resumeKeywords.some(rk => 
      rk.toLowerCase().includes(keyword.toLowerCase()) ||
      keyword.toLowerCase().includes(rk.toLowerCase()) ||
      calculateSimilarity(rk.toLowerCase(), keyword.toLowerCase()) > 0.85
    )
  );

  const missing = jobKeywords.filter(keyword => 
    !resumeKeywords.some(rk => 
      rk.toLowerCase().includes(keyword.toLowerCase()) ||
      keyword.toLowerCase().includes(rk.toLowerCase()) ||
      calculateSimilarity(rk.toLowerCase(), keyword.toLowerCase()) > 0.85
    )
  );

  // Calculate match score with weighted importance
  const matchScore = jobKeywords.length > 0 
    ? Math.round((matched.length / jobKeywords.length) * 100)
    : 0;

  // Generate findings
  const findings: Finding[] = [];
  
  if (matchScore >= 80) {
    findings.push({
      type: 'positive',
      text: 'Strong keyword match with job requirements'
    });
  }

  if (matched.length > 0) {
    findings.push({
      type: 'positive',
      text: `Successfully matched ${matched.length} key skills/requirements`
    });
  }

  if (missing.length > 0) {
    findings.push({
      type: 'negative',
      text: `Missing ${missing.length} important keywords from job description`
    });
  }

  // Generate suggestions
  const suggestions = [];
  
  if (missing.length > 0) {
    suggestions.push(
      'Consider adding the missing keywords to your resume where applicable',
      'Customise your resume to better match the job requirements',
      'Use similar terminology as found in the job description'
    );
  }

  if (matchScore < 60) {
    suggestions.push(
      'Your resume might need significant revision to match this job\'s requirements',
      'Review the job description carefully and highlight relevant experience'
    );
  }

  return {
    matchScore,
    findings,
    missingKeywords: missing,
    matchedKeywords: matched,
    suggestions
  };
};

const extractKeywords = (text: string): string[] => {
  const cleanText = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = cleanText.split(' ');
  const phrases = extractPhrases(words);
  
  // Combine individual words and phrases
  const potentialKeywords = new Set([
    ...words,
    ...phrases,
    ...extractSkillsFromDatabase(cleanText)
  ]);

  return Array.from(potentialKeywords)
    .filter(keyword => 
      keyword.length > 2 && // Ignore very short words
      !isStopWord(keyword) && // Filter out common stop words
      isRelevantKeyword(keyword) // Check if it's a relevant skill or qualification
    );
};

const extractPhrases = (words: string[]): string[] => {
  const phrases: string[] = [];
  const maxPhraseLength = 4;

  for (let i = 0; i < words.length; i++) {
    for (let j = 2; j <= maxPhraseLength && i + j <= words.length; j++) {
      const phrase = words.slice(i, i + j).join(' ');
      if (isRelevantPhrase(phrase)) {
        phrases.push(phrase);
      }
    }
  }

  return phrases;
};

const extractSkillsFromDatabase = (text: string): string[] => {
  return skillsDatabase.filter(skill => 
    text.includes(skill.toLowerCase())
  );
};

const isStopWord = (word: string): boolean => {
  const stopWords = new Set([
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her',
    'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there',
    'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get',
    'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no',
    'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your',
    'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then',
    'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
    'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first',
    'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these',
    'give', 'day', 'most', 'us'
  ]);

  return stopWords.has(word.toLowerCase());
};

const isRelevantKeyword = (keyword: string): boolean => {
  // Check if the keyword is in our skills database
  if (skillsDatabase.some(skill => 
    skill.toLowerCase() === keyword.toLowerCase() ||
    calculateSimilarity(skill.toLowerCase(), keyword.toLowerCase()) > 0.85
  )) {
    return true;
  }

  // Check for common job-related patterns
  const relevantPatterns = [
    /years?/,
    /experience/,
    /degree/,
    /certification/,
    /qualified/,
    /skills?/,
    /knowledge/,
    /proficient/,
    /expert/,
    /specialist/,
    /senior/,
    /junior/,
    /lead/,
    /manager/,
    /director/,
    /coordinator/,
    /analyst/,
    /developer/,
    /engineer/,
    /architect/,
    /consultant/,
    /professional/,
    /responsible/,
    /education/,
    /training/,
    /bachelor/,
    /master/,
    /phd/,
    /certified/,
    /license/
  ];

  return relevantPatterns.some(pattern => pattern.test(keyword));
};

const isRelevantPhrase = (phrase: string): boolean => {
  // Common technical and professional multi-word terms
  const relevantPhrases = [
    'machine learning',
    'data science',
    'artificial intelligence',
    'project management',
    'team leader',
    'full stack',
    'front end',
    'back end',
    'software development',
    'business intelligence',
    'quality assurance',
    'user experience',
    'user interface',
    'customer service',
    'problem solving',
    'critical thinking',
    'decision making',
    'time management',
    'communication skills',
    'leadership skills',
    'analytical skills',
    'technical skills',
    'soft skills',
    'years of experience',
    'best practices',
    'continuous improvement',
    'agile methodology',
    'scrum master',
    'product owner',
    'business analyst',
    'system administrator',
    'network security',
    'cloud computing',
    'database management',
    'web development',
    'mobile development',
    'cross functional',
    'team player',
    'self motivated',
    'detail oriented',
    'results driven'
  ];

  return relevantPhrases.includes(phrase.toLowerCase());
};

const calculateSimilarity = (str1: string, str2: string): number => {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) matrix[i][0] = i;
  for (let j = 0; j <= len2; j++) matrix[0][j] = j;

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const maxLen = Math.max(len1, len2);
  return maxLen === 0 ? 1 : 1 - matrix[len1][len2] / maxLen;
};