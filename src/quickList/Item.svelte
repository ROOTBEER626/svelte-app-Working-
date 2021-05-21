<script>
  import { createEventDispatcher } from "svelte";
  import Do from "../Do.js";
  import NewDo from "./newDo.svelte";
  import ToDo from "./ToDo.svelte";

  export let id, name, description, complete, todos;

  const dispatch = createEventDispatcher();


  function triggerUpdate() {
    //dispatch("update", { id, name, description, complete });
    if (name.length === 0) return;
    //console.log("triggering update");
    //console.log(todos[0]);
    dispatch("update", { id, name, description, complete, todos });
  }

  function handleNewToDo({ detail }) {
    if (detail.name.length === 0) return;
    todos.push({ id: detail.id, name: detail.name, description: detail.description, complete: detail.complete })
    //dispatch("update", { id:id, name:name, description:description, complete:complete, todos:todos });
    dispatch("update", { id, name, description, complete, todos });
  }

  function handleDeleteToDo({ detail }) {
    //if (todos.length < 2) {todos.length = 0;}
    //else {
    const index = todos.findIndex((item)=> item.id === detail.id);
    console.log(index);
    todos.splice(index, index);
    //dispatch("updateToDo", { id:id, name:name, description:description, complete:complete, todos:todos });
    dispatch("update", { id, name, description, complete, todos });
  }

  function handleUpdateToDo({ detail} ) {
    const index = todos.findIndex((item) => item.id === detail.id);
    //console.log(index);//index is found correctly
    todos[index] = detail
    console.log(todos[index].name); //is equal to the entire detial for some reason //its undefined
    //dispatch("updateToDo", { id:id, name:name, description:description, complete:complete, todos:todos });
    dispatch("update", { id, name, description, complete, todos });
  }

  function handleDoubleClick() {
    const yes = confirm("Are you sure you wish to delete this item?");

    if (yes) {
      dispatch("delete", { id });
    }
  }

  /*let ToDosSorted = [];

  $: {
    ToDosSorted = [...todos];
    //console.log(ToDosSorted);
    ToDosSorted.sort((a, b) => {
      if (a.complete && b.complete) return 0;
      if (a.complete) return 1;
      if (b.complete) return -1;
    });
  }
  */

</script>

<style>

  .item {
    display: grid;
    grid-auto-rows: 1;
    grid-auto-columns: 2;
    border-style: dashed;
    border: 10px;
  }
  .project {
    display: block;
    align-items: center;
    padding: 15px;
    background: #ffffff;
    grid-column: 1;
    border-style: dashed;
    border: 10px;
    margin-bottom: 50px;
    overflow-inline: 150px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .project:focus-within {
    background: rgba(255, 255, 255, 0.8);
  }

  .description-input:focus {
    box-shadow: 0px 0.2em 2.5em #c4c4c4;
    transform: scale(1.025);
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
  }

  .todos {
    display: none;
  }

  .item:hover .todos {
    display: block;
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
    {#each todos as todo (todo)}
      <ToDo {...todo} on:updateDo={handleUpdateToDo} on:deleteDo={handleDeleteToDo} />
    {:else}
      <p>Nothing to Do</p>
    {/each}
  </div>
</div>

<!-- div to hold below
  for each here (todo in todos)
    ToDo on:update{updateDo} on:dblclikc={deleteDo} on:newDo={createDo}
  -->
