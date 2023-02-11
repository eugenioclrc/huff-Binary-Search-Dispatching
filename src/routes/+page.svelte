<script>

import createHuffTemplate from "$lib/createHuffTemplate.js";

let output = 'no abi yet';
let abi = '';
let template = 'binary';

$: if (abi) {
	try {
		output = createHuffTemplate(abi, template);
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
					<fieldset>
						<legend>Dispatcher type</legend>

						<input id="binary" class="peer/binary" type="radio" bind:group={template} value="binary" name="template" />
						<label for="binary" class="peer-checked/binary:text-sky-500">Binary</label>

						<input id="linear" class="peer/linear" type="radio" bind:group={template} value="linear" name="template" />
						<label for="linear" class="peer-checked/linear:text-sky-500">Linear</label>

						<div class="hidden peer-checked/binary:block">A binary search to find the correct selector. This is great for contracts with lots and lots of functions as it makes the dispatching cost more predictable
							Drafts are only visible to administrators.</div>
						<div class="hidden peer-checked/linear:block">
							Simplest way. This method will extract the function selector from the calldata message, then brute force compare it to every other function in the contract.
						</div>
					</fieldset>
				</div>
			</div>
		</div>
	</div>


</section>