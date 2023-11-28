import fs from 'node:fs';
import { minify as htmlMinifier } from 'html-minifier-terser';
import { build as tailwindcssBuild } from 'tailwindcss/lib/cli/build/index.js';

if (fs.existsSync('dist')) {
    fs.rmSync('dist', {recursive: true});
}
fs.mkdirSync('dist');

fs.writeFileSync('dist/index.html', await htmlMinifier(fs.readFileSync('index.html', {encoding: 'utf-8'}), {
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    decodeEntities: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeEmptyAttributes: true,
    useShortDoctype: true,
    sortAttributes: true,
    sortClassName: true,
    processConditionalComments: true,
    minifyCSS: true,
    minifyJS: true,
}));

await tailwindcssBuild({
    '--input': 'input.css',
    '--output': 'dist/style.css',
    '--minify': true,
});

fs.cpSync('images', 'dist/images', {recursive: true});
