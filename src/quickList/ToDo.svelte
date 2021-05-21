<script>
  import { createEventDispatcher } from "svelte";
  import Do from "../Do.js";




  export let id, name, description, complete;


  const dispatch = createEventDispatcher();

  function triggerUpdate() {
    if (name.length === 0) return;
    dispatch("updateDo", { id:id, name:name, description:description, complete:complete });
  }


  //don't just want this to
  function handleDeleteToDo() {
    const yes = confirm("Are you sure you wish to delete this todos?");

    if (yes) {
      console.log("starting a delete");
      dispatch("deleteDo", { id });
    }
  }

</script>

<style>
  .todo {
    display: block;
    align-items: center;
    padding: 15px;
    background: #83caa3;
  }

  .todo:focus-within {
    background: rgba(255, 255, 255, 0.8);
  }

  .todo-description:focus {
    box-shadow: 0px 0.2em 2.5em #c4c4c4;
    transform: scale(1.025);
  }

  .todo:hover .todo-description {
    display: flex;
  }

  .todo.complete {
    background: #dddddd;
  }

  .todo.complete .todo-name {
    color: #666666;
    text-decoration: line-through;
  }

  .todo-name {
    flex-grow: 1;
    background: none;
    border: none;
    outline: none;
    font-weight: 500;
    font-size: 1em;
    width: 100%;
  }

  .todo-complete {
    margin-left: 15px;
  }

  .todo-description {
    display: none;
    flex-grow: 3;
    background: none;
    border: none;
    outline: none;
    font-weight: 500;
    font-size: 1em;
    width: 100%;
  }

</style>

  <!--Should have header element right here as well and another layer of div above this one to contain both (hidden)-->
      <div class="todo" class:complete on:dblclick={handleDeleteToDo} >
        <div class="name" >
          <input
            class="todo-name"
            type="text"
            bind:value={name}
            readonly={complete}
            on:keyup={({ key, target }) => key === 'Enter' && target.blur()}
            on:blur={() => triggerUpdate()} />
        </div>
        <div class="complete" >
          <input
            class="todo-complete"
            type="checkbox"
            bind:checked={complete}
            on:change={() => triggerUpdate()} />
        </div>
        <br/>
        <div class="description" >
          <textarea
            class="todo-description"
            type ="text"
            bind:value={description}
            readonly={complete}
            on:keyup={({key, target}) => key === 'Enter' && target.blur()}
            on:blur={() => triggerUpdate()} />
        </div>
      </div> <!--todo-->
