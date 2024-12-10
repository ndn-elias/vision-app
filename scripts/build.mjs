import { sassPlugin } from 'esbuild-sass-plugin';
import esbuild from 'esbuild';
import * as dotenv from 'dotenv';
import path from 'path';
import { PUBLISH_FOLDER } from './constants.mjs';

dotenv.config();

/* Constants */
const PATH_ROOT = '.';
const PATH_BUILD = `./${PUBLISH_FOLDER}/build`;
const MODE_PRODUCTION = process.env.NODE_ENV === 'production';

/* Entrypoints */
const entryPoints = {
    'app.bundle': path.resolve(PATH_ROOT, './src/index.jsx')
};
console.log(`entries:\n${Object.keys(entryPoints).map(name => `- ${name}`).join('\n')}\n`);

/* Esbuild config */
const options = {
    minify: Boolean(MODE_PRODUCTION),
    sourcemap: !MODE_PRODUCTION,
    entryPoints,
    bundle: true,
    outdir: path.resolve(PATH_ROOT, PATH_BUILD),
    target: ['es2020'],
    plugins: [
        sassPlugin({
            type: 'style'
        }),
        {
            name: 'start/end',
            setup(build) {
                let alive = false;
                build.onEnd(({ errors }) => {
                    if(errors[0]) {
                        alive = false;
                        return;
                    }
                    if (!alive) console.log('[ESBUILD] Success ✨');
                    alive = true;
                });
            }
        }
    ],
    loader: {
        '.jpg': 'file',
        '.png': 'file',
        '.svg': 'file',
        '.tjson': 'file',
        '.csv': 'file',
        '.txt': 'text',
        '.md': 'text',
        '.ipynb': 'text'
    }
};

/* Build */
if(MODE_PRODUCTION) {
    await esbuild.build(options);
} else {
    esbuild.context(options)
        .then(ctx => {
            ctx.watch();
            console.log('Watching...');
            return ctx;
        })
        .catch(() => process.exit());
}