const fs = require('fs');
const path = require('path');
const filePath = require('config').api.outputFile;
const resovledFilePath = path.resolve(filePath);
const writeToFile = async (response, query) => {
    const formattedResponse = response.join('\n');

    if (!fs.existsSync(resovledFilePath)) {
            writeLine(query);

    } else {
            appendLine(query);
    }
    return response;

}

const writeLine = (res) => {
    fs.writeFile(resovledFilePath, `${JSON.stringify(res)}\n`,
        (err) => {
            if (err) console.log(err)
        })
}

const appendLine = (res) => {
    fs.appendFile(resovledFilePath, `${JSON.stringify(res)}\n`,
        (err) => {
            if (err) console.log(err)
        });
}


const readFromFile = () => {
    return new Promise(((resolve, reject) => {
        return fs.readFile(resovledFilePath, (err, data)=> {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    }))

}

exports.readFromFile = readFromFile;
exports.writeToFile = writeToFile;
