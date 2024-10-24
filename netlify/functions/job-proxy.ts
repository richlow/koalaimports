import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { url } = JSON.parse(event.body || '{}');

    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'URL is required' }),
      };
    }

    // Validate URL
    const jobUrl = new URL(url);
    if (!jobUrl.hostname.includes('linkedin.com')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Only LinkedIn URLs are supported' }),
      };
    }

    // Fetch the job page with headers that mimic a real browser
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': 'https://www.linkedin.com/',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Cache-Control': 'max-age=0'
      }
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    // Try multiple possible selectors where job description might be
    const selectors = [
      '.description__text',
      '.show-more-less-html__markup',
      '[data-job-description]',
      '#job-details',
      '.jobs-description__content',
      '.jobs-box__html-content',
      '.jobs-description-content__text'
    ];

    let description = '';
    for (const selector of selectors) {
      const element = $(selector);
      if (element.length) {
        description = element.text().trim();
        break;
      }
    }

    if (!description) {
      // If we still can't find the description, try to get any text content from common job description containers
      const jobContainer = $('.job-view-layout, .jobs-details, .job-details-container');
      if (jobContainer.length) {
        description = jobContainer.text().trim();
      }
    }

    if (!description) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Unable to extract job description. Please copy and paste the job description manually.',
          details: 'LinkedIn prevents automated access to their job listings. For best results, please copy the job description directly from LinkedIn.'
        }),
      };
    }

    // Clean up the description
    description = description
      .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
      .replace(/\\n/g, '\n') // Replace literal \n with newlines
      .trim();

    return {
      statusCode: 200,
      body: JSON.stringify({ description }),
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Unable to fetch job description',
        details: 'Please copy and paste the job description manually.'
      }),
    };
  }
};

export { handler };