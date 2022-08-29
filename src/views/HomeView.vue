

<template>
  <div>
    <div class="container">
      <div class="tasks">

        <form action="">
          <input @focus="togglePlaceholder(true)" @blur="togglePlaceholder(false)" type="text" placeholder="Type Task"
            class="type-input" v-model="text">
          <button @click.prevent="addTask">Add Task</button>
        </form>
        <div class="items">
          <div class="item" v-for="task, index in tasks">
            <!-- <input type="checkbox"> -->
            <span :class='{ done: task.done }' @click="doneTask(task)" v-if="!task.isEditing">{{  task.text  }}</span>
            <input v-if="task.isEditing" type="text" v-model="task.text">
            <div v-if="!task.isEditing" class="edit">
              <!-- <button @click="deleteTask(index)">Delete</button> -->
              <DeleteIcon @click="deleteTask(index)" class="delete" />
              <!-- <button @click="editTask(task)" class="edit-btn">Edit</button> -->
              <PencilIcon @click="editTask(task)" class="edit-btn" />
            </div>
            <button v-else @click="save(task)">Save</button>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import { useTasksStore } from '@/stores/tasks'
import PencilIcon from 'vue-material-design-icons/Pencil.vue';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
export default {
  components: {
    PencilIcon,
    DeleteIcon
  },
  setup() {
    const store = useTasksStore()
    const tasks = ref(store.tasks)
    const text = ref('')

    const addTask = () => {
      if (text.value) {
        store.tasks.push({
          text: text.value,
          done: false,
          isEditing: false
        })
        store.save()
      }
    }
    const deleteTask = (index) => {
      store.delete(index)
    }
    const doneTask = (task) => {
      store.done(task)
    }
    const editTask = (task) => {
      store.editTask(task)
    }
    const save = (task) => {
      store.saved(task)
    }
    const togglePlaceholder = (bool) => {
      if (bool == true) {
        let input = document.querySelector('.type-input')
        input.setAttribute('placeholder', '')
      } else {
        let input = document.querySelector('.type-input')
        input.setAttribute('placeholder', 'Type Task')
      }
    }
    return {
      text,
      tasks,
      addTask,
      deleteTask,
      doneTask,
      editTask,
      save,
      togglePlaceholder
    }
  }
}
</script>