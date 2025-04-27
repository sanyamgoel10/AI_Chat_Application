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

async function claudeQuery(query) {
    return "claudeQuery response";
}

async function openAiQuery(query) {
    return "openAiQuery response";
}

module.exports = { googleGeminiQuery, claudeQuery, openAiQuery };