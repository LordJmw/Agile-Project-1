<script setup>
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
const isOpen = ref(false);

const isActiveLink = (routePath) => {
  const route = useRoute()
  return route.path === routePath
}
</script>

<template>
  <nav class="bg-green-600 p-4">
    <div class="container mx-auto flex justify-center items-center">
      
      <button @click="isOpen = !isOpen" class="md:hidden text-white text-2xl">
        &#9776;
      </button>
      
      <ul :class="{'block': isOpen, 'hidden': !isOpen}" 
          class="absolute md:relative md:flex bg-green-600 md:bg-transparent w-full left-0 md:w-auto top-16 md:top-0 text-white space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">

          <li :class='[isActiveLink("/")? "bg-green-900" : "","hover:bg-green-400", "rounded-md"]'>
          <RouterLink to="/" class="px-4 py-2 block no-underline" style="text-decoration: none;">Home</RouterLink>
        </li>
        <li :class='[isActiveLink("/notes/add")? "bg-green-900" : "","hover:bg-green-400", "rounded-md"]'>
          <RouterLink to="/notes/add" class="px-4 py-2 block no-underline" style="text-decoration: none;">Add Notes</RouterLink>
        </li>

        <!--  -->
      </ul>
    </div>
  </nav>
</template>
