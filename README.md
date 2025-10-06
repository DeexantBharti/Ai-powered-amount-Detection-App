# AI-Powered Medical Amount Extractor

This is a backend service built for the SDE Intern Assignment. It extracts and classifies financial amounts from medical bills, supporting both image and text inputs.

## Features
- Extracts financial data from both image files (PNG, JPG) and raw text.
- Uses Tesseract.js for OCR to digitize document images.
- Leverages Google's Gemini Pro for contextual analysis and data classification.
- Returns a structured JSON object with classified amounts, currency, and provenance.
- Built with a modular and scalable architecture (routes, services).

## Tech Stack
- **Backend:** Node.js, Express.js
- **OCR:** Tesseract.js
- **AI/LLM:** Google Gemini Pro via `@google/generative-ai` SDK
- **File Handling:** Multer

---

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd sde-intern-project
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add your API key:
    ```
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```

4.  **Start the server:**
    ```bash
    node index.js
    ```
    The server will be running at `http://localhost:3000`.

---

## API Usage

The service exposes one main endpoint for data extraction.

**Endpoint:** `POST /v1/extract_amounts`

### Option 1: Submit an Image File

Use `form-data` to upload an image with the key `document`.

**Sample `curl` request:**
```bash
curl -X POST -F "document=@/path/to/your/bill.png" http://localhost:3000/v1/extract_amounts
```

### Option 2: Submit Raw Text

Send a JSON payload with a `text` key.

**Sample `curl` request:**
```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"text": "Total: INR 1200 | Paid: 1000 | Due: 200"}' \
http://localhost:3000/v1/extract_amounts
```

### Sample Success Response
```json
{
    "currency": "INR",
    "amounts": [
        {
            "type": "total_bill",
            "value": 1200,
            "source": "Total: INR 1200"
        },
        {
            "type": "paid",
            "value": 1000,
            "source": "Paid: 1000"
        },
        {
            "type": "due",
            "value": 200,
            "source": "Due: 200"
        }
    ],
    "status": "ok"
}
```