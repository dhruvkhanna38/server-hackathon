"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});
app.post('/sendHTML', (req, res) => {
    const { html, prompt } = req.body; // Extracting HTML and prompt from the request body
    console.log('Received HTML:', html);
    console.log('Received prompt:', prompt);
    // Process the HTML and prompt as needed
    // For demonstration, just sending a confirmation back
    res.send('HTML and prompt received successfully!');
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
