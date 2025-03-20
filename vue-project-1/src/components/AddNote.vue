<script setup>
import {reactive,ref} from "vue"
import { onMounted } from "vue"
import { RouterLink } from "vue-router"
import router from '@/router';
import { useToast } from "vue-toastification"
import PulseLoader from "vue-spinner/src/PulseLoader.vue"
import axios from "axios"
const categories = ref([])

const form = reactive({
    isLoading : true,
    note : {
        title : "",
        note : "",
        category : ""
    }
})

const Toast = useToast()

onMounted(async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`)
        const notes = await response.json()
        let categoriesData = []

        notes.data.map(note => {
            if(categoriesData.indexOf(note.category.category) === -1){
                categoriesData.push(note.category.category)
            }
        })

        categories.value = categoriesData
    } catch (error) {
        console.log(error)
    }
    finally{
        form.isLoading = false
    }
})

function AddNote(){
    try {
        const data = {
            title : form.note.title,
            note : form.note.note,
            category : form.note.category
        }

        axios.post( `${import.meta.env.VITE_API_URL}/notes/add`,data
        ).then(response => {
            if(response.status == 200){
                Toast.success("Note added successfully")
            }
            router.push("/")
        })
    } catch (error) {
        Toast.error("job not added")
        console.log(error)
    }
}
</script>

<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <PulseLoader v-if="form.isLoading"></PulseLoader>  
      <form v-else class="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <label for="note" class="block text-gray-700 text-sm font-bold mb-2">Note</label>
        <input
          id="note"
          type="text"
          class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          v-model="form.note.note"
          placeholder="Enter your note..."
        />
        <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input id="title" type="text" v-model="form.note.title" placeholder="Enter yout note title.."
        class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <label for="category" class="block text-gray-700 text-sm font-bold mb-2">Category</label>
        <select id="category" v-model="form.note.category" class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
            <option value="" disabled>Select a category</option>
            <option 
            v-for="category in categories" 
            :key="category.id" 
            :value="category"
            >
            {{ category }}
            </option>
        </select>

        <button @click.prevent="AddNote" class="button w-[20%] bg-green-500 p-3 mt-4 rounded-md cursor-pointer hover:bg-green-400">Add</button>
      </form>
    </div>
  </template>