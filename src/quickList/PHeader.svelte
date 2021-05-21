<script>
  import todos from "./Item.svelte";
  import name from "./Item.svelte";

  $: doCount = todos.length;
  $: completedDoCount = 5;
</script>

<style>
  .PHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    color: #eeeeee;
    font-weight: bold;
    font-size: 1.5em;
    background: rgba(0, 0, 0, 0.1);
  }
</style>

<div class="PHeader">
  <div> {name} To-Do List</div>
  <span> {completedDoCount}/{doCount} </span>
</div>
