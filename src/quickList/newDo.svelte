<script>
  import { createEventDispatcher } from "svelte";
  import { v4 as uuidv4 } from "uuid";

  const dispatch = createEventDispatcher();

  let name = "";
  let description = "";

  function createDo() {
    if (name.length === 0) return;
    dispatch("newToDo", { id:uuidv4(), name:name, description:description, complete:false })
    //console.log("dispatched a new Do")
    //console.log(name);
    //console.log(description);
    name ="";
    description="";
  }
</script>

<style>
  input {
    box-sizing: border-box;
    margin-bottom: 15px;
    padding: 15px;
    border: none;
    outline: none;
    width: 100%;
    background: rgba(0, 0, 0, 0.25);
    color: #ffffff;
    font-weight: bold;
    font-size: 1em;
    cursor: pointer;
  }

  input,
  input::placeholder {
    color: #ffffff;
  }
</style>
<!--
<input type="text" on:keyup={handleKeyUp} bind:value placeholder="+ Add item" />
-->
<form>
 <label for="Add">Create Do</label> <br/>
 <label for="Name">Name</label>
 <input type='text' bind:value={name} /> <br/>
 <label for="Description">Description</label>
 <input type='text' bind:value={description} /> <br/>
 <input type='button' value='Create Do' on:click="{createDo}" />
 </form>
