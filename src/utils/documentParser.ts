import * as mammoth from 'mammoth';
import * as PDFJS from 'pdfjs-dist';

// Configure PDF.js worker
PDFJS.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

export async function parseDocument(file: File): Promise<string> {
  const fileType = file.name.toLowerCase().split('.').pop();

  switch (fileType) {
    case 'pdf':
      return await parsePDF(file);
    case 'docx':
      return await parseWord(file);
    case 'txt':
      return await parseText(file);
    default:
      throw new Error('Unsupported file format');
  }
}

async function parsePDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFJS.getDocument({ data: arrayBuffer }).promise;
    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items
        .map((item: any) => item.str)
        .join(' ') + '\n';
    }

    return text.trim();
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to parse PDF file. Please try again or paste the text manually.');
  }
}

async function parseWord(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.trim();
  } catch (error) {
    console.error('Word parsing error:', error);
    throw new Error('Failed to parse Word file. Please try again or paste the text manually.');
  }
}

async function parseText(file: File): Promise<string> {
  try {
    return await file.text();
  } catch (error) {
    console.error('Text file parsing error:', error);
    throw new Error('Failed to parse text file. Please try again or paste the text manually.');
  }
}