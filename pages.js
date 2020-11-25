//const pages = [
//    'index',
//    'test'
//];

let pages = [];
const PATHS = require('./config/paths');
const rootPagesFolderName = 'pug/pages';
const fs = require('fs');

const viewsFolder = PATHS.source + `/${rootPagesFolderName}/`;

fs.readdirSync(viewsFolder).forEach(view => {
    pages.push(view);
});

module.exports = pages;
