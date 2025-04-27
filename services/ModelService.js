const config = require("../config/config.js");
const { postRequest } = require('./PostRequest.js');

async function googleGeminiQuery(contextWindow) {
    let requestUrl = config['geminiConfig']['url'] + config['geminiConfig']['key'];
    let requestHeaders = {
        'Content-Type': 'application/json'
    }
    let requestBody = {contents: []};
    for(let i = 0; i < contextWindow.length; i++){
        let role;
        if(i == 0 || i%2 == 0){
            role = 'user';
        }else{
            role = 'model';
        }
        requestBody['contents'].push({
            role,
            parts: [
                {
                    text: contextWindow[i]
                }
            ]
        });
    }
    let apiResp = await postRequest(requestUrl, requestHeaders, requestBody);
    if('string' == typeof apiResp){
        apiResp = JSON.parse(apiResp);
    }
    if(apiResp['candidates'] && apiResp['candidates'].length > 0 && apiResp['candidates'][0]['content'] && apiResp['candidates'][0]['content']['parts'] && apiResp['candidates'][0]['content']['parts'].length > 0 && apiResp['candidates'][0]['content']['parts'][0]['text']){
        return apiResp['candidates'][0]['content']['parts'][0]['text'];
    }
    return 'Something went wrong in gemini response, Please try again';
}

async function claudeQuery(contextWindow) {
    let requestUrl = config['claudeConfig']['url'];
    let requestHeaders = {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'x-api-key': config['claudeConfig']['key']
    }
    let requestBody = {
        model: "claude-3-opus-20240229",
        max_tokens: 1024,
        messages: []
    };
    for(let i = 0; i < contextWindow.length; i++){
        let role;
        if(i == 0 || i%2 == 0){
            role = 'user';
        }else{
            role = 'assistant';
        }
        requestBody['messages'].push({
            role,
            "content": contextWindow[i]
        });
    }
    let apiResp = await postRequest(requestUrl, requestHeaders, requestBody);
    if('string' == typeof apiResp){
        apiResp = JSON.parse(apiResp);
    }
    if(apiResp['content'] && apiResp['content'].length > 0 && apiResp['content'][0]['text']){
        return apiResp['content'][0]['text'];
    }
    return "Something went wrong in claude response, Please try again";
}

async function openAiQuery(contextWindow) {
    let requestUrl = config['openaiConfig']['url'];
    let requestHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config['openaiConfig']['key']}`
    }
    let requestBody = {
        model: "gpt-3.5-turbo",
        max_tokens: 1024,
        messages: []
    };
    for(let i = 0; i < contextWindow.length; i++){
        let role;
        if(i == 0 || i%2 == 0){
            role = 'user';
        }else{
            role = 'assistant';
        }
        requestBody['messages'].push({
            role,
            content: contextWindow[i]
        });
    }
    let apiResp = await postRequest(requestUrl, requestHeaders, requestBody);
    if('string' == typeof apiResp){
        apiResp = JSON.parse(apiResp);
    }
    if(apiResp['choices'] && apiResp['choices'].length > 0 && apiResp['choices'][0]['message'] && apiResp['choices'][0]['message']['content']){
        return apiResp['choices'][0]['message']['content'];
    }
    return "Something went wrong in OpenAI response, Please try again";
}

module.exports = { googleGeminiQuery, claudeQuery, openAiQuery };