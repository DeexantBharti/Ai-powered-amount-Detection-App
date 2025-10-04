const Tesseract = require('tesseract.js');
const {GoogleGenerativeAI} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({model:"gemini-pro"});
async function extractTextFromImage(filePath){
console.log(`Processing OCR for iamge: ${filePath}`);
const result = await Tesseract.recognize(filePath,'eng');
return result.data.text;
}

async function getAmountFromAI(text){
if(!text || text.trim().length == 0){
throw new Error("Input text is empty");
}
const prompt = `You are  an expert financial data extraction system from medical documents. Analyze the following text. Extract all monetary amounts, identify the currency (default to INR if not specified), and classify each amount.
        For each amount, provide its type (e.g., 'total_bill', 'paid', 'due', 'discount', 'tax', 'other'), the numeric value, and the exact source text snippet.
        Provide the output ONLY in the specified JSON format. Do not add explanations or markdown.
Text to analyze: 
"""
${text}
"""
JSON Output Format: 
{
"currency":"...",
"amounts":[
{"type":"...","value":1200,"source":"..."},
{"type":"...","Value":1000,"source":"..."}
]
}`;

console.log("Sending prompt to AI...");
const result await model.generateContent(prompt);
const responseText = result.response.text();
const jsonResponse = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, ''));
    return jsonResponse;

}
module.exports  = {extractTextFromImage,getAmountFromAI};
