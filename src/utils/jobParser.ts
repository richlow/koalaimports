import { JSDOM } from 'jsdom';

interface ParsedJob {
  description: string;
  error?: string;
}

export async function parseJobUrl(url: string): Promise<ParsedJob> {
  try {
    // Validate URL
    const jobUrl = new URL(url);
    
    // Only allow specific domains
    if (!isAllowedDomain(jobUrl.hostname)) {
      return {
        description: '',
        error: 'Currently only LinkedIn job postings are supported'
      };
    }

    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    if (jobUrl.hostname.includes('linkedin.com')) {
      return parseLinkedInJob(document);
    }

    return {
      description: '',
      error: 'Unable to parse job description from this website'
    };
  } catch (error) {
    console.error('Error parsing job URL:', error);
    return {
      description: '',
      error: 'Invalid URL or unable to fetch job description'
    };
  }
}

function parseLinkedInJob(document: Document): ParsedJob {
  // LinkedIn specific selectors
  const jobDescription = document.querySelector('.description__text');
  
  if (!jobDescription) {
    return {
      description: '',
      error: 'Could not find job description on the page'
    };
  }

  return {
    description: jobDescription.textContent?.trim() || ''
  };
}

function isAllowedDomain(hostname: string): boolean {
  const allowedDomains = [
    'linkedin.com',
    'www.linkedin.com'
  ];
  
  return allowedDomains.some(domain => hostname.includes(domain));
}