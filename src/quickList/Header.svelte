<script>
  import { projects } from "../stores";

  $: projectCount = $projects.length;
  $: completedProjectCount = $projects.filter((project) => project.complete).length;
</script>

<style>
  .header {
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

<div class="header">
  <div>Vinny's To-Do List</div>
  <span> {completedProjectCount}/{projectCount} </span>
</div>
