<script>

import createHuffTemplate from "$lib/createHuffTemplate.js";

let output = 'no abi yet';
let abi = '';

$: if (abi) {
	try {
		output = createHuffTemplate(abi);
	} catch (err) {
		console.error(err);

		output = `ABI NOT VALID: ${err}`;
	}
}



</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="container mx-auto px-4">
		<div class="flex flex-wrap">
			<div class="w-full md:w-4/12 ml-auto mr-auto px-4">
<textarea class="w-full h-96 p-4 bg-gray-100 rounded-lg shadow-inner focus:outline-none focus:shadow-outline font-mono text-left"
					placeholder="put you abi here!" bind:value={abi}></textarea>
					<br />
					<a href="https://gist.github.com/veox/8800debbf56e24718f9f483e1e40c35c" target="_blank" rel="noreferrer" class="underline text-blue-700 hover:font-bold">Example ERC20 ABI</a>
			</div>
			<div class="w-full md:w-8/12 ml-auto mr-auto px-4">
				<div class="md:pr-12">
					<textarea class="w-full h-96 p-4 bg-gray-100 rounded-lg shadow-inner focus:outline-none focus:shadow-outline font-mono text-left"
						readonly>{output}</textarea>
				</div>
			</div>
		</div>
	</div>


</section>