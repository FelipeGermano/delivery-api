const express = require('express')
const consign = require('consign')
const path = require('path')
const fs = require('fs');

module.exports = () => {
    const app = express()

    const directoryPath = path.join(__dirname, "../routes");

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.log('Erro ao listar as rotas: ' + err)
        }

        files.forEach((file) => {
            consign({cwd: 'routes'}).include(`${file}`).into(app)
        });
    });

    return app
}