// src/routes/api.js
const express = require('express');
const multer = require('multer');
const { extractTextFromImage, getAmountFromAI } = require('../services/extractionService.js');
const validateRequest = require('../middlewares/validator.js');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/extract_amounts', upload.single('document'),validateRequest, async (req, res) => {
    try {
        let rawText = '';

        if (req.file) {
            rawText = await extractTextFromImage(req.file.path);
        } else if (req.body.text) {
            //processing or raw text 
            rawText = req.body.text;
        } else {
            return res.status(400).json({ status: 'error', reason: 'No image file or text data was provided.' });
        }

        if (!rawText || rawText.trim().length < 5) {
            return res.status(400).json({ status: "no_amounts_found", reason: "Document is empty or text could not be extracted." });
        }

        const structuredData = await getAmountFromAI(rawText);

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