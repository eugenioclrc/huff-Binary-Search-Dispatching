<script>
	import "../app.postcss";
</script>

<div class="app">
	<main>
		<div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
			<div class="py-12">
				<h1 class=" font-semibold text-5xl">Huff Binary Function Dispatching</h1>
				<p class="mt-4 text-lg text-gray-700">This is a simple example of a Landing Page you can build using Tailwind
					Starter Kit. It features multiple CSS components based on the Tailwindcss design system.<br />
				<a href="https://docs.huff.sh/tutorial/function-dispatching/#binary-search-dispatching" 
					target="_blank" rel="noreferrer" class="underline text-blue-700 hover:font-bold">Sorce</a>
				</p>
			</div>
		</div>

		<slot></slot>
	</main>

</div>