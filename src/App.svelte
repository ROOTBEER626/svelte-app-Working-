<script>
	//This will be the quickList tab (Today tab)
	import Header from "./quickList/header.svelte";
	import List from "./quickList/list.svelte";
	//import QuickList from "../quickList/QuickList.svelte"
</script>

<style>
  .container {
    width: 100%;
    background: #009579;
  }

  :global(.container *) {
    font-family: "Quicksand", sans-serif;
  }
</style>

<div class="container">
  <Header />
  <List />
	<!--<QuickList /> -->
</div>
