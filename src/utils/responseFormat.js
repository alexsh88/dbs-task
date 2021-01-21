const cheerio = require('cheerio');
const uuidv1 = require('uuid').v1;
const searchByConfig = require('config').api.searchBy;
const formatResponse = (response) => {

    if (response) {
        const searchBy = response[searchByConfig];
        if (searchBy.length > 0) {
            return searchBy.filter((result) => result.Result).map((result) => {
                const $ = cheerio.load(result.Result);
                const resultContent = $('a');

                return {
                    url: resultContent.attr('href'),
                    title: resultContent.text(),
                    id: uuidv1()
                }
            })
        }
    }
    return [];
}

exports.formatResponse = formatResponse
