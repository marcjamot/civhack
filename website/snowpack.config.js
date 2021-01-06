// Consult https://www.snowpack.dev to learn about these options
module.exports = {
	extends: '@sveltejs/snowpack-config',
	plugins: require('@sveltejs/snowpack-config').plugins.concat(
		'@snowpack/plugin-typescript'
	),
	mount: {
		'src/components': '/_components',
		'src/game': '/_game'
	},
	alias: {
		$components: './src/components',
		$game: './src/game'
	}
};
