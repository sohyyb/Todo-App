import { defineStore } from "pinia";

export const useTasksStore = defineStore({
  id: "tasks",
  state: () => ({
    tasks: JSON.parse(localStorage.getItem("task")) || [],
  }),
  getters: {},
  actions: {
    save() {
      localStorage.setItem("task", JSON.stringify(this.tasks));
    },
    delete(index) {
      this.tasks.splice(index, 1);
      this.save();
    },
    done(task) {
      task.done = !task.done;
      this.save();
    },
    editTask(task) {
      task.isEditing = !task.isEditing;
      this.save();
    },
    saved(task) {
      task.text = task.text;
      task.isEditing = false;
      this.save();
    },
  },
});
