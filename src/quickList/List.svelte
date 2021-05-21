<script>
  import { onMount } from "svelte";
  import { v4 as uuidv4 } from "uuid";

  import { projects } from "../stores";

  import TodoApi from "../TodoApi";
  import Project from "./Project.svelte";
  import NewProject from "./NewProject.svelte";


  function handleNewProject({ detail }) {
    $projects = [
      {
        id: uuidv4(),
        name:detail.name,
        description:detail.description,
        complete: false,
        todos: []
      },
      ...$projects,
    ];
    TodoApi.save($projects);
  }

  function handleUpdateToDo({ detail }) {
    const index =$projects.findIndex((project) => project.id === detail.id);
    $projects[index].todos = detail.todos;
    TodoApi.save($projects);
  }

  function handleUpdate({ detail }) {
    const index = $projects.findIndex((project) => project.id === detail.id);
    $projects[index] = detail;
    TodoApi.save($projects);
  }

  function handleDelete({ detail }) {
    //console.log("We handling delete")
    $projects = $projects.filter((project) => project.id !== detail.id);
    TodoApi.save($projects);
  }

  let projectsSorted = [];

  $: {
    projectsSorted = [...$projects];
    projectsSorted.sort((a, b) => {
      if (a.complete && b.complete) return 0;
      if (a.complete) return 1;
      if (b.complete) return -1;
    });
  }

  onMount(async () => {
    $projects = await TodoApi.getAll();
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

  .working-on {
    margin: 0;
    margin-bottom: 3px;
    text-align: center;
    color: #ffffff;
    font-weight: bold;
    font-size: 1.1em;
  }

</style>

<div class="list">
  <NewProject on:newProject={handleNewProject} />
  <br/>
  <p class="working-on"> Current Projects </p>
  {#each projectsSorted as project (project)}
    <Project {...project} on:update={handleUpdate} on:delete={handleDelete}  />
  {:else}
    <p class="list-status">No Projects Exist</p>
  {/each}
</div>
