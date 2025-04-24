class HomepageController{
    async homepage(req, res){
        return res.render('homepage');
    }

    async startChat(req, res){
        if((req.method).toUpperCase() == 'POST'){
            if('undefined' != typeof req.body.modelName && ['gemini', 'claude', 'openai'].includes(req.body.modelName)){
                let modelName = '';
                if(req.body.modelName == 'gemini'){
                    modelName = 'Google Gemini';
                }else if(req.body.modelName == 'claude'){
                    modelName = 'Anthropic Claude';
                }else{
                    modelName = 'OpenAI';
                }
                return res.render('startchat', { modelName });
            }else{
                return res.render('error');
            }
        }else{
            return res.render('error');
        }
    }
}

module.exports = new HomepageController();