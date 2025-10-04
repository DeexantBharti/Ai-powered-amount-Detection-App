// src/routes/api.js
const express = require('express');
const multer = require('multer');
const { extractTextFromImage, getAmountFromAI } = require('../services/extractionService.js');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/extract_amounts', upload.single('document'), async (req, res) => {
    try {
        let rawText = '';

        if (req.file) {
            // Process uploaded image file
            rawText = await extractTextFromImage(req.file.path);
        } else if (req.body.text) {
            // Process raw text from JSON body
            rawText = req.body.text;
        } else {
            return res.status(400).json({ status: 'error', reason: 'No image file or text data was provided.' });
        }

        // Guardrail: check for empty or noisy OCR result
        if (!rawText || rawText.trim().length < 5) {
            return res.status(400).json({ status: "no_amounts_found", reason: "Document is empty or text could not be extracted." });
        }

        // Get structured data from the AI service
        const structuredData = await getAmountFromAI(rawText);

        // Final successful output
        const finalOutput = {
            ...structuredData,
            status: "ok"
        };

        res.status(200).json(finalOutput);

    } catch (error) {
        console.error('An error occurred in the extraction process:', error);
        res.status(500).json({ status: 'error', reason: 'An internal server error occurred.', details: error.message });
    }
});

module.exports = router;