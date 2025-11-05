import ejs from 'ejs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const renderTemplate = async (
  templateName: string,
  context: Record<string, any>
): Promise<string> => {
  try {
    const templatePath = join(__dirname, '..', 'templates', `${templateName}.ejs`);
    const html = await ejs.renderFile(templatePath, context);
    return html;
  } catch (error) {
    console.error(`Error rendering template ${templateName}:`, error);
    throw error;
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sanitizeEmailContent = (content: string): string => {
  return content
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};
