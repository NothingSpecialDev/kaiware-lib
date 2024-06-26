import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

/** @type {import('rollup').RollupOptions} */
export default {
	input: [
		'src/index.ts',
		'src/enums/index.ts',
		'src/lib/index.ts',
		'src/types/index.ts',
		'src/utils/index.ts'
	],
	output: [
		{
			dir: 'build',
			format: 'esm',
			preserveModules: true,
			exports: 'named',
			entryFileNames: '[name].mjs'
		},
		{
			dir: 'build',
			format: 'cjs',
			preserveModules: true,
			exports: 'named',
			entryFileNames: '[name].cjs'
		}
	],
	preserveEntrySignatures: 'strict',
	plugins: [
		nodeResolve({}),
		typescript({
			outDir: 'build/src'
		}),
		babel({
			extensions: ['.js', '.ts', '.mjs', '.cjs', '.html'],
			babelHelpers: 'runtime',
			exclude: ['node_modules/@babel/**'],
			presets: [
				[
					'@babel/preset-env',
					{
						targets: { firefox: '48' },
						exclude: ['@babel/plugin-transform-regenerator']
					}
				]
			],
			plugins: [
				'@babel/plugin-syntax-dynamic-import',
				[
					'@babel/plugin-transform-runtime',
					{
						useESModules: true,
						regenerator: false
					}
				]
			]
		})
	]
};
