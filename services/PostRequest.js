const https = require('https');
const { URL } = require('url');

async function postRequest(reqUrl, reqHeaders, reqBody) {
    reqBody = JSON.stringify(reqBody);
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(reqUrl);
        const options = {
            hostname: parsedUrl.hostname,
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'POST',
            headers: {
                ...reqHeaders,
                'Content-Length': Buffer.byteLength(reqBody),
            }
        };
        const req = https.request(options, res => {
            const chunks = [];
            res.on('data', data => chunks.push(data))
            res.on('end', () => {
                let resBody = (Buffer.concat(chunks)).toString();
                switch (res.headers['content-type']) {
                    case 'application/json':
                        resBody = JSON.parse(resBody);
                        break;
                }
                resolve(resBody)
            })
        })
        req.on('error', reject);
        if (reqBody) {
            req.write(reqBody);
        }
        req.end();
    })
}

module.exports = { postRequest };