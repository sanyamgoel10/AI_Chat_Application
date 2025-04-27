const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: 3000,
    geminiConfig: {
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=`,
        key: process.env.GEMINI_CONFIG_KEY,
    },
    claudeConfig: {
        url: `https://api.anthropic.com/v1/messages`,
        key: process.env.CLAUDE_CONFIG_KEY,
    },
    openaiConfig: {
        url: `https://api.openai.com/v1/chat/completions`,
        key: process.env.OPENAI_CONFIG_KEY,
    }
}