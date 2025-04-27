const config = require("../config/config.js");

async function googleGeminiQuery(query){
    return "Google Gemini Response";
}

async function claudeQuery(query){
    return "claudeQuery response";
}

async function openAiQuery(query){
    return "openAiQuery response";
}

module.exports = { googleGeminiQuery, claudeQuery, openAiQuery };