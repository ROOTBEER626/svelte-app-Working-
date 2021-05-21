<script>
  import { onMount } from "svelte";
  import { v4 as uuidv4 } from "uuid";

  import { items } from "../stores";

  import TodoApi from "../TodoApi";
  import Item from "./Item.svelte";
  import NewItem from "./NewItem.svelte";


  function handleNewItem({ detail }) {
    $items = [
      {
        id: uuidv4(),
        name:detail.name,
        description:detail.description,
        complete: false,
        todos: []
      },
      ...$items,
    ];
    TodoApi.save($items);
  }

  function handleUpdateToDo({ detail }) {
    const index =$items.findIndex((item) => item.id === detail.id);
    $items[index].todos = detail.todos;
    TodoApi.save($items);
  }

  function handleUpdate({ detail }) {
    const index = $items.findIndex((item) => item.id === detail.id);
    $items[index] = detail;
    TodoApi.save($items);
  }

  function handleDelete({ detail }) {
    //console.log("We handling delete")
    $items = $items.filter((item) => item.id !== detail.id);
    TodoApi.save($items);
  }

  let itemsSorted = [];

  $: {
    itemsSorted = [...$items];
    itemsSorted.sort((a, b) => {
      if (a.complete && b.complete) return 0;
      if (a.complete) return 1;
      if (b.complete) return -1;
    });
  }

  onMount(async () => {
    $items = await TodoApi.getAll();
    //ToDoApi.save($items);
  });
</script>

<style>
  .list {
    padding: 15px;
  }

  .list-status {
    margin: 0;
    text-align: center;
    color: #ffffff;
    font-weight: bold;
    font-size: 1.1em;
  }

</style>

<div class="list">
  <NewItem on:newitem={handleNewItem} />
  <br/>
  {#each itemsSorted as item (item)}
    <Item {...item} on:update={handleUpdate} on:delete={handleDelete}  />
  {:else}
    <p class="list-status">No Items Exist</p>
  {/each}
</div>
