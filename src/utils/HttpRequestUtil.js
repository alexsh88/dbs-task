const axios = require('axios');

const sendRequest = async (input) => {
    try {
        const response = await axios.get('https://api.duckduckgo.com/', {
            params:{
                q: input.query,
                format: 'json'
            }
        });
        return response;
    } catch (error) {
        console.log('ERROR ', error);
    }
}

exports.sendRequest = sendRequest
