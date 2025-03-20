<script setup>
import { onMounted,reactive,ref } from 'vue';
import PulseLoader from "vue-spinner/src/PulseLoader.vue"
import { useToast } from 'vue-toastification';
import axios from 'axios';
import router from "@/router"

const users = ref([])
const notes = ref([])
const isLoading = ref(true)
const Toast = useToast()

onMounted(async () => {
  try {
    const users_response = await fetch(`${import.meta.env.VITE_API_URL}/users`)
    const usersData = await users_response.json()
    users.value =  usersData.data

    const notes_response = await fetch(`${import.meta.env.VITE_API_URL}/notes`)
    const notesData = await notes_response.json()
    notes.value = notesData.data
  } catch (error) {
    console.log(error)
  }
  finally{
    isLoading.value = false
  }
})

function DeleteNote(id){
  try {
    axios.delete(`${import.meta.env.VITE_API_URL}/notes/${id}`).then(response => {
      if(response.status === 200){
        notes.value = notes.value.filter(note => note.id !== id)
        Toast.success("Note Deleted Successfully")
      }
    })
  } catch (error) {
    Toast.error("Note not deleted")
    console.log(error)
  }
}

</script>


<template>
  <div class="flex flex-col items-center justify-center min-w-full p-4 mt-20">
    <PulseLoader v-if="isLoading.value"/>
    <table v-else class="mx-auto border-collapse border border-gray-300 sm-min-w-[100%] w-full md:w-[50%] text-center">
      <thead>
        <tr class="odd:bg-gray-100">
          <th class="border border-gray-300 p-4">Username</th>
          <th class="border border-gray-300 p-4">Email</th>
          <th class="border border-gray-300 p-4">Title</th>
          <th class="border border-gray-300 p-4">Note</th>
          <th class="border border-gray-300 p-4">Category</th>
          <th class="border border-gray-300 p-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="user in users">
          <tr v-for="note in notes.filter(note => note.userId === user.id)" :key="note.id" class="even:bg-gray-100">
            <td class="border border-gray-300 p-4">{{ user.FirstName + " " +  user.LastName }} </td>
            <td class="border border-gray-300 p-4">{{ user.email }}</td>
            <td class="border border-gray-300 p-4">{{ note.title }}</td>
            <td class="border border-gray-300 p-4">{{ note.note }}</td>
            <td class="border border-gray-300 p-4">{{ note.category.category }}</td>
            <td class="border border-gray-300 p-4">
              <div class="flex items-center justify-center">
                <button class="button cursor-pointer hover:bg-green-400 bg-green-500 mr-2 p-2 rounded-sm">
                  <RouterLink :to="`/notes/edit/${note.id}`">Edit</RouterLink>
                </button>
                <button @click="DeleteNote(note.id)" class="button cursor-pointer hover:bg-red-400 bg-red-500 p-2 rounded-sm">Delete</button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>