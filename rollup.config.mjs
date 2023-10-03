import nodeResolve from '@rollup/plugin-node-resolve';
// import replace from '@rollup/plugin-replace';
// import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import copy from "rollup-plugin-copy";
import { minify as minifyHTML } from 'html-minifier';
import postcss from 'postcss';
import minifyCSS from 'cssnano';
// import serve from "rollup-plugin-serve";
// import livereload from "rollup-plugin-livereload";

const config = {
	input: [
		// 'src/static/js/entrypoints/404.js',
		'src/static/js/entrypoints/index.js'
	],
	output: {
		dir: 'dist/static/js/entrypoints',
		format: 'esm'
	},
	plugins: [
		nodeResolve(),
		// replace({
		// 	preventAssignment: true,
		// 	'process.env.NODE_ENV': JSON.stringify('production')
		// }),
		// typescript(),
		terser(),
		copy({
			targets: [
				{
					src: ['src/*.html'],
					dest: 'dist',
					transform: async (contents, filename) => {
						return minifyHTML(contents.toString(), {
							includeAutoGeneratedTags: true,
							removeAttributeQuotes: true,
							removeComments: true,
							removeRedundantAttributes: true,
							removeScriptTypeAttributes: true,
							removeStyleLinkTypeAttributes: true,
							sortClassName: true,
							useShortDoctype: true,
							collapseInlineTagWhitespace: true,
							// collapseWhitespace: true,
							minifyCSS: true,
						});

						// everything else
						return contents;
					},
				},
				{
					src: ['src/static/audio/*'],
					dest: 'dist/static/audio',
				},
				{
					src: ['src/static/css/*'],
					dest: 'dist/static/css',
					transform: async (contents, filename) => {
						return (await postcss([minifyCSS()]).process(contents)).css;

						// everything else
						return contents;
					},
				},
				{
					src: ['src/static/img/*'],
					dest: 'dist/static/img',
				},
			],
		}),
	]
};

export default config;