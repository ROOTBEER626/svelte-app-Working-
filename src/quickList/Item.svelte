<script>
  import { createEventDispatcher } from "svelte";
  import Do from "../Do.js";
  import NewDo from "./newDo.svelte";
  import ToDo from "./ToDo.svelte";
  import PHeader from "./PHeader.svelte"

  export let id, name, description, complete, todos;

  $: doCount = todos.length;
  $: completedDoCount = todos.filter((item) => item.complete).length;

  const dispatch = createEventDispatcher();


  function triggerUpdate() {
    if (name.length === 0) return;
    dispatch("update", { id, name, description, complete, todos });
  }

  function handleNewToDo({ detail }) {
    if (detail.name.length === 0) return;
    todos.push({ id: detail.id, name: detail.name, description: detail.description, complete: detail.complete })
    dispatch("update", { id, name, description, complete, todos });
  }

  function handleDeleteToDo({ detail }) {
    const index = todos.findIndex((item)=> item.id === detail.id);
    todos.splice(index, 1);
    dispatch("update", { id, name, description, complete, todos });
  }

  function handleUpdateToDo({ detail} ) {
    const index = todos.findIndex((item) => item.id === detail.id);
    todos[index] = detail
    dispatch("update", { id, name, description, complete, todos });
  }

  function handleDoubleClick() {
    const yes = confirm("Are you sure you wish to delete this item?");

    if (yes) {
      dispatch("delete", { id });
    }
  }

  let ToDosSorted = [];

  $: {
    ToDosSorted = [...todos];
    //console.log(ToDosSorted);
    ToDosSorted.sort((a, b) => {
      if (a.complete && b.complete) return 0;
      if (a.complete) return 1;
      if (b.complete) return -1;
    });
  }

</script>

<style>

  .item {
    display: grid;
    border-style: solid;
    margin-bottom: 10px;
  }
  .project {
    display: block;
    align-items: center;
    padding: 15px;
    background: #83caa3;
    grid-column: 1;
    border-style: dashed;
    border: 10px;
    margin-bottom: 50px;
    overflow-wrap: break-word;
    border-style: dotted;
    border-width: 1px;
  }

  .item:hover .project {
    transform: scale(1.025);
    border-width: 5px;
    margin-right: 5px;
  }

  .item:hover .description-input {
    display: block;
  }


  .description-input:focus {
    box-shadow: 0px 0.2em 2.5em #c4c4c4;
    transform: scale(1.025);
  }

  .project:hover {
    border-width: 5px;
  }

  .project:hover .description-input {
    display: block;
  }

  .project.complete {
    background: #dddddd;
  }

  .project.complete .name-input {
    color: #666666;
    text-decoration: line-through;
  }

  .name-input {
    flex-grow: 1;
    background: none;
    border: none;
    outline: none;
    font-weight: 500;
    font-size: 1em;
    width: 100%;
  }

  .complete-checkbox {
    margin-left: 15px;
  }

  .description-input {
    display: none;
    flex-grow: 3;
    background: none;
    border: none;
    outline: none;
    font-weight: 500;
    font-size: 1em;
    width: 100%;
    height: 75%;
    min-height: 100px;
  }

  .todos {
    grid-column: 2;
    margin-right: 10px;
  }

  .todos {
    display: none;
  }

  .item:hover .todos {
    display: block;
  }

  .todos:hover {
    display: block;
    background: #83caa3;
  }



</style>

<div class="item" >
  <div class="project" class:complete on:dblclick={handleDoubleClick} >
    <div class="name" >
      <input
        class="name-input"
        type="text"
        bind:value={name}
        readonly={complete}
        on:keyup={({ key, target }) => key === 'Enter' && target.blur()}
        on:blur={() => triggerUpdate()} />
    </div>
    <div class="complete" >
      <input
        class="complete-checkbox"
        type="checkbox"
        bind:checked={complete}
        on:change={() => triggerUpdate()} />
    </div>
    <div class="howMany" >
      <span> {completedDoCount}/{doCount} </span>
    </div>
    <br/>
    <div class="description" >
      <textarea
        class="description-input"
        type ="text"
        bind:value={description}
        on:keyup={({key, target}) => key === 'Enter' && target.blur()}
        on:blur={() => triggerUpdate()} />
    </div>
  </div>
  <div class=todos  >
    <NewDo on:newToDo={handleNewToDo} />
    <div> {name} To-Do List</div>
    {#each ToDosSorted as todo (todo)}
      <ToDo {...todo} on:updateDo={handleUpdateToDo} on:deleteDo={handleDeleteToDo} />
    {:else}
      <p>Nothing to Do</p>
    {/each}
  </div>
</div>
