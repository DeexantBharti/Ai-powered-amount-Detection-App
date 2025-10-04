require('dotenv').config();
const express = require('express');
const apiRoutes = require('./src/routes/api');

const app = express(); const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/v1',apiRoutes);

app.get('/',(req,res) => {
res.status(200).send('AI Amount extractor service is running.');});

app.listen(PORT,()=>{
console.log(`server is live on http://localhost:${PORT}`);
});

