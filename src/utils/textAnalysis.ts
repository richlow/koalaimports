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
  
  // Find matching and missing keywords
  const matched = jobKeywords.filter(keyword => 
    resumeKeywords.some(rk => rk.toLowerCase().includes(keyword.toLowerCase()))
  );
  const missing = jobKeywords.filter(keyword => 
    !resumeKeywords.some(rk => rk.toLowerCase().includes(keyword.toLowerCase()))
  );

  // Calculate match score
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
  // Common technical skills and qualifications
  const commonKeywords = [
    'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node.js',
    'aws', 'docker', 'kubernetes', 'ci/cd', 'agile', 'scrum',
    'bachelor', 'master', 'phd', 'degree',
    'leadership', 'management', 'communication', 'teamwork',
    'analysis', 'design', 'development', 'testing', 'deployment'
  ];

  // Extract words from text
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2);

  // Find matching keywords
  return Array.from(new Set(
    commonKeywords.filter(keyword =>
      words.some(word => word.includes(keyword.toLowerCase()))
    )
  ));
};