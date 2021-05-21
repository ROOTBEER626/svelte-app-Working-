import { writable } from "svelte/store";

//currently this stores the do but I am going to want it to store my users which in turn will contain thier projects and dos
// Stores each To-Do list item
export const items = writable([]);
