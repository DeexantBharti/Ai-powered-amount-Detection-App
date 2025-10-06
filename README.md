# AI-Powered Medical Amount Extractor (Problem Statement 8)

This is a backend service built for the **PLUM SDE Intern Assignment**.  
It extracts and classifies financial amounts from **medical bills**, supporting both **image and text inputs**.

**🟢 Live Demo Link:** [https://ai-powered-amount-detection-app.onrender.com/](https://ai-powered-amount-detection-app.onrender.com/)  
*(Note: The first request may take 20–30 seconds to respond due to the free hosting plan's "cold start.")*

**📦 GitHub Repository Link:** [https://github.com/DeexantBharti/Ai-powered-amount-Detection-App](https://github.com/DeexantBharti/Ai-powered-amount-Detection-App)

---

## 1. 🧩 Architecture Explanation & Data Handling

The application follows a **modular, 3-tier architecture** commonly used in Node.js/Express apps:

- **Routes (`/src/routes`):**  
  Defines API endpoints such as `POST /v1/extract_amounts`.  
  Handles incoming HTTP requests and passes them to the appropriate controllers or services after validation.

- **Middleware (`/src/middleware`):**  
  Functions that run before the main route logic.  
  Uses `multer` for file handling and a custom validator (with **Joi**) to ensure all incoming requests are valid, making the API robust.

- **Services (`/src/services`):**  
  The core business logic layer.  
  `extractionService.js` contains the OCR and AI logic — using **Tesseract.js** for text extraction and **Google Gemini API** for intelligent classification.

**Data Handling Philosophy:**  
The system is **stateless** — each request is processed independently without storing any data on the server.  
This approach improves scalability, resilience, and simplifies deployment on distributed systems.

---

## 2. 🧠 Prompts Used and Refinements Made

The AI prompt was carefully engineered to ensure **structured, accurate, and reliable** extraction.

### 🧾 Final Prompt

```text
You are an expert financial data extraction system from medical documents. Analyze the following text. Extract all monetary amounts, identify the currency (default to INR if not specified), and classify each amount.
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
{"type":"...","value":1000,"source":"..."}
]
}
🧩 Prompt Refinements
Initial Version: Basic “extract all amounts” instruction.

Refinement 1: Enforced strict JSON-only output for machine-readability.

Refinement 2: Added "source" to ground results in the input text, reducing hallucinations.

Refinement 3: Added flexibility for identifying multiple categories (tax, discount, etc.) and defaulting currency to INR.

3. ⚙️ Setup Instructions and API Usage
🔧 Setup Instructions
Clone the repository

bash
Copy code
git clone <your-repo-url>
cd sde-intern-project
Install dependencies

bash
Copy code
npm install
Configure environment variables
Create a .env file in the root directory and add:

bash
Copy code
GEMINI_API_KEY="YOUR_API_KEY_HERE"
Run the server

bash
Copy code
node index.js
The API will be available at http://localhost:3000

🌐 API Endpoint
Endpoint:
POST /v1/extract_amounts

Supports both image and text input.

4. 🧪 Sample curl/Postman Requests
📤 For Image Upload
bash
Copy code
curl -X POST -F "document=@/path/to/your/bill.png" https://your-service-name.onrender.com/v1/extract_amounts
📝 For Raw Text
bash
Copy code
curl -X POST -H "Content-Type: application/json" \
-d '{"text": "total kharcha hua Rs. 65OO. maine 6k de diya. abhi 500 bal hai."}' \
https://your-service-name.onrender.com/v1/extract_amounts
🧰 Testing with Postman
🔹 Raw Text Mode
Method: POST

Body → raw → JSON

Example Payload:

json
Copy code
{
  "text": "Total amount 2000. Paid 1500. Balance 500."
}
🔹 Image Upload Mode
Method: POST

Body → form-data

Key: document → Type: File

Upload your image and send the request.

5. 🚧 Known Issues and Potential Improvements
⚠️ Known Issues
Handwriting OCR:
Tesseract.js works best for printed text — it struggles with handwritten documents.

Complex Layouts:
Bills with multi-column or small fonts may cause jumbled OCR output.

💡 Potential Improvements
Upgrade OCR Engine:
Integrate cloud-based OCR services like Google Cloud Vision API or Amazon Textract for better accuracy.

Add Database Storage:
Store results in MongoDB/PostgreSQL to track history and analyze accuracy.

Frontend Dashboard:
Add a simple UI for uploading bills and viewing parsed results visually.

🧾 License
This project is submitted as part of the PLUM SDE Intern Assignment and intended for evaluation purposes only.

