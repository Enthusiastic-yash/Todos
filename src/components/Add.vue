<script setup>
import { CheckIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

const lists = ref([]);
const newTodoContent = ref("");

// firebase refs
const todoCollection = collection(db, "todos");
const todoCollectionQuery = query(todoCollection, orderBy("date"));

// Get all todo from server
onMounted(() => {
  onSnapshot(todoCollectionQuery, (querySnapshot) => {
    let fbTodo = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
      };
      fbTodo.push(todo);
    });
    lists.value = fbTodo;
  });
});

// Add Todo
const addTodo = () => {
  addDoc(todoCollection, {
    content: newTodoContent.value,
    done: false,
    date: Date.now(),
  });
  newTodoContent.value = "";
};

// Update toggle
const updateToggle = (id) => {
  const index = lists.value.findIndex((lists) => lists.id === id);
  // lists.value[index].done = !lists.value[index].done;

  updateDoc(doc(todoCollection, id), {
    done: !lists.value[index].done,
  });
};

// Delete todo
const deleteTodo = async (id) => {
  await deleteDoc(doc(db, "todos", id));
};
</script>
<template>
  <div
    class="text-center font-bold font-sans text-xl mt-10 text-gray-900 capitalize grid grid-cols-1"
  >
    <h1>Todo App</h1>
  </div>
  <div>
    <form @submit.prevent="addTodo" class="flex justify-center mt-10">
      <div>
        <input
          type="text"
          placeholder="Add a Todo"
          class="border border-gray-500 rounded-sm font-medium text-gray-900 p-2 outline-none md:w-96 rounded-l-lg"
          v-model="newTodoContent"
        />
      </div>

      <button
        :disabled="!newTodoContent"
        class="bg-indigo-500 border border-indigo-500 text-white font-medium px-4 py-0.5 leading-9 cursor-pointer rounded-r-lg"
        :class="{ 'bg-indigo-300': !newTodoContent }"
      >
        Add
      </button>
    </form>
  </div>

  <div class="mt-10 w-3/4 sm:max-w-sm md:max-w-md lg:max-w-lg m-auto">
    <ul v-for="list in lists" :key="list.id">
      <li
        class="border border-1 p-1 flex justify-between"
        :class="{ 'text-green-400 line-through': list.done }"
      >
        {{ list.content }}
        <div class="flex w-16">
          <CheckIcon
            class="bg-gray-200 rounded-md cursor-pointer"
            :class="{
              'bg-green-400  text-white': list.done,
            }"
            @click="updateToggle(list.id)"
          />
          <TrashIcon
            class="text-red-400 hover:text-600 cursor-pointer ml-2"
            @click="deleteTodo(list.id)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
