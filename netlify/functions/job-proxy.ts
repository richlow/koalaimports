import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const handler: Handler = async (event) => {
  // Only allow POST requests
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

    // Fetch the job page
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ResumeKoala/1.0)',
      },
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract job description
    const description = $('.description__text')
      .text()
      .trim();

    if (!description) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Job description not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ description }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch job description' }),
    };
  }
};

export { handler };