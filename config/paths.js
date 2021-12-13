const path = require('path');

const ROOT = process.cwd();

module.exports = {
    config: path.join(ROOT, 'config'),
    build: path.join(ROOT, 'build'),
    source: path.join(ROOT, 'source'),
    fonts: path.join(ROOT, 'source/fonts'),
    media: path.join(ROOT, 'source/media'),
    styles: path.join(ROOT, 'source/styles')
};
