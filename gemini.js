// gemini.js
const axios = require('axios');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const dotenv = require('dotenv');

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const processText = async (text) => {
  // Example: Call Gemini API with the text
  try {
    const response = await axios.post('https://api.gemini.com/v1/endpoint', {
      api_key: GEMINI_API_KEY,
      text: text,
    });
    return response.data.result;
  } catch (error) {
    console.error('Error processing text with Gemini API:', error);
    return 'Sorry, there was an error.';
  }
};

const processPDF = async (filePath) => {
  // Read PDF and extract text
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  return data.text;
};

module.exports = { processText, processPDF };