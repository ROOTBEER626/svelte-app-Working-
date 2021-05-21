<script>
  import { createEventDispatcher } from "svelte";
  import Do from "../Do.js";
  import NewDo from "./newDo.svelte";
  import ToDo from "./ToDo.svelte";

  export let id, name, description, complete, todos;

  $: doCount = todos.length;
  $: completedDoCount = todos.filter((project) => project.complete).length;

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
    const index = todos.findIndex((project)=> project.id === detail.id);
    todos.splice(index, 1);
    dispatch("update", { id, name, description, complete, todos });
  }

  function handleUpdateToDo({ detail} ) {
    const index = todos.findIndex((project) => project.id === detail.id);
    todos[index] = detail
    dispatch("update", { id, name, description, complete, todos });
  }

  function handleDoubleClick() {
    const yes = confirm("Are you sure you wish to delete this project?");

    if (yes) {
      dispatch("delete", { id });
    }
  }

  //will still change the checkbox value but on a reload will not have updated
  function checkComplete() {
    if (complete == true) if (doCount != completedDoCount) {
      const yes = confirm("This project still has uncomplete dos are you sure you want to complete it?");

      if (yes) {
        triggerUpdate();
      }
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

  .project {
    display: grid;
    border-style: solid;
    border-bottom: none;
    margin-bottom: 10px;
  }
  .project-view {
    display: block;
    align-items: center;
    padding: 15px;
    background: #83caa3;
    grid-column: 1;
    border-style: solid;
    border-width: 10px;
    border-top: none;
    margin-bottom: 50px;
    overflow-wrap: break-word;
  }

  .project:hover .project-view {
    transform: scale(1.025);
    border-width: 5px;
    margin-right: 5px;
  }

  .project:hover .description-input {
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

  .project-view.complete {
    background: #488c6d;
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
    border: none;
    border-top-style: dashed;
    border-top-style: 5px;
    border-top-color: black;
    display: none;
    flex-grow: 3;
    background: none;
    outline: none;
    font-weight: 500;
    font-size: 1em;
    width: 100%;
    height: 75%;
    min-height: 100px;
  }

  .todos-view {
    grid-column: 2;
    margin-right: none;
    border-style: solid;
    border-width: 5px;
    padding: none;
  }

  .todos-view {
    display: none;
  }

  .project:hover .todos-view {
    display: block;
  }

  .todos-view:hover {
    display: block;
    background: #83caa3;
  }

  .header {
    border: none;
    border-bottom-style: dashed;
    border-bottom-style: 5px;
    border-bottom-color: black;
    border-top-style: dashed;
    border-top-style: 5px;
    border-top-color: black;
    margin-left: 3px;
    margin-top: 3px;
    margin-bottom: 3px;
  }



</style>

<div class="project" >
  <div class="project-view" class:complete on:dblclick={handleDoubleClick} >
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
        on:change={() => checkComplete()} />
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
  <div class=todos-view  >
    <NewDo on:newToDo={handleNewToDo} />
    <div class="header"> {name}'s To-Do List</div>
    {#each ToDosSorted as todo (todo)}
      <ToDo {...todo} on:updateDo={handleUpdateToDo} on:deleteDo={handleDeleteToDo} />
    {:else}
      <p>Nothing to Do</p>
    {/each}
  </div>
</div>
