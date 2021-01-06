<script lang="ts">
	import { onMount } from "svelte";
	import { Game } from "$game/main";

	let game: Game;

	onMount(() => {
		const div = document.getElementById("worldmap");
		game = new Game(div);
		game.start();
	});
</script>

<style>
	#worldmap {
		height: 100vh;
		width: 100vw;
		background-color: red;
	}
</style>

<div id="worldmap" />

<svelte:window on:resize={() => game.onResize()} />
