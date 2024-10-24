interface ParsedSection {
  title: string;
  content: string;
  confidence: number;
  issues: string[];
}

interface ATSParseResult {
  sections: ParsedSection[];
  overallScore: number;
  formatIssues: string[];
  structureScore: number;
  readabilityScore: number;
  recommendations: string[];
}

export const simulateATSParsing = (text: string): ATSParseResult => {
  const sections: ParsedSection[] = [];
  const formatIssues: string[] = [];
  let structureScore = 100;
  let readabilityScore = 100;

  // Check for common formatting issues
  if (text.includes('│') || text.includes('║') || text.includes('█')) {
    formatIssues.push('Detected special characters or text boxes that may not parse correctly');
    structureScore -= 20;
  }

  if (text.includes('  ')) {
    formatIssues.push('Multiple spaces detected - may cause parsing issues');
    structureScore -= 10;
  }

  // Attempt to identify sections
  const possibleSections = [
    'experience',
    'education',
    'skills',
    'summary',
    'objective',
    'certifications',
    'projects'
  ];

  let lastIndex = 0;
  possibleSections.forEach(sectionName => {
    const regex = new RegExp(`\\b${sectionName}\\b`, 'i');
    const match = text.match(regex);
    
    if (match) {
      const startIndex = match.index!;
      if (startIndex > lastIndex) {
        const content = text.substring(startIndex, text.indexOf('\n', startIndex) || text.length);
        const confidence = calculateSectionConfidence(content);
        
        sections.push({
          title: sectionName,
          content: content.trim(),
          confidence,
          issues: getSectionIssues(content)
        });

        lastIndex = startIndex;
      }
    }
  });

  // Check readability
  const words = text.split(/\s+/);
  if (words.some(word => word.length > 30)) {
    readabilityScore -= 15;
    formatIssues.push('Found extremely long words or unbroken strings');
  }

  const recommendations = generateRecommendations(formatIssues, sections);
  const overallScore = Math.round((structureScore + readabilityScore) / 2);

  return {
    sections,
    overallScore,
    formatIssues,
    structureScore,
    readabilityScore,
    recommendations
  };
};

const calculateSectionConfidence = (content: string): number => {
  let confidence = 100;
  
  // Check for potential issues that reduce confidence
  if (content.length < 10) confidence -= 30;
  if (content.split('\n').length < 2) confidence -= 20;
  if (!/[A-Za-z]/.test(content)) confidence -= 50;
  
  return Math.max(0, confidence);
};

const getSectionIssues = (content: string): string[] => {
  const issues: string[] = [];
  
  if (content.includes('•')) {
    issues.push('Bullet points may not parse correctly in some ATS systems');
  }
  
  if (/[│║█]/.test(content)) {
    issues.push('Decorative characters detected');
  }
  
  if (content.length > 1000) {
    issues.push('Section may be too long for effective parsing');
  }
  
  return issues;
};

const generateRecommendations = (formatIssues: string[], sections: ParsedSection[]): string[] => {
  const recommendations: string[] = [];

  if (formatIssues.length > 0) {
    recommendations.push('Consider using a simpler format with standard characters');
    recommendations.push('Avoid using text boxes, tables, or columns');
  }

  if (sections.length < 4) {
    recommendations.push('Add clear section headers for Experience, Education, and Skills');
  }

  if (sections.some(s => s.confidence < 70)) {
    recommendations.push('Ensure each section has clear content and proper formatting');
  }

  recommendations.push(
    'Use a single-column layout for better ATS compatibility',
    'Stick to standard section headings',
    'Use common fonts like Arial or Calibri'
  );

  return recommendations;
};